var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ps;
(function (ps) {
    /**
     *
     * @description
     * @author jiong
     * @date 2024/03/06 10:43:14
     */
    var EraseLayer = /** @class */ (function (_super) {
        __extends(EraseLayer, _super);
        function EraseLayer(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this._filledPercentage = 0;
            _this._isUpdateBMD = false;
            _this._canErase = true;
            _this._isEnableEraseable = true;
            _this._imageDataArr = [];
            /** 序列化 */
            _this.serializableFields = {};
            return _this;
        }
        Object.defineProperty(EraseLayer.prototype, "filledPercentage", {
            get: function () {
                return this._filledPercentage;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EraseLayer.prototype, "isUpdateBMD", {
            set: function (v) {
                this._isUpdateBMD = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EraseLayer.prototype, "eraseLayerType", {
            get: function () {
                var eraseGroup = this.gameObject.parent.getScript("ps.EraseGroup");
                return eraseGroup ? eraseGroup.eraseGroupType : this._eraseLaserType;
            },
            set: function (v) {
                this._eraseLaserType = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EraseLayer.prototype, "canErase", {
            get: function () {
                var eraseGroup = this.gameObject.parent.getScript("ps.EraseGroup");
                return eraseGroup ? eraseGroup.canErase : this._isEnableEraseable;
            },
            set: function (v) {
                this._canErase = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EraseLayer.prototype, "isEnableEraseable", {
            get: function () {
                var eraseGroup = this.gameObject.parent.getScript("ps.EraseGroup");
                return eraseGroup ? eraseGroup.isEnableEraseable : this._isEnableEraseable;
            },
            set: function (v) {
                this._isEnableEraseable = v;
            },
            enumerable: false,
            configurable: true
        });
        EraseLayer.prototype.onInit = function () {
            if (ps.EraseComponentTestSwitch)
                return;
            if (this.eraseLayerType == void 0
                || this.eraseLayerType === ps.EraseLayerType.CUSTOM_JUDGMENT_AREA
                || this.eraseLayerType === ps.EraseLayerType.BOTTOM_LAYER)
                return;
            this.deploy([this]);
        };
        /**
         * 初始化图层BitmapData信息
         * @param eliArr {number} - 设备/触控 id
         */
        EraseLayer.prototype.deploy = function (eliArr) {
            var _this = this;
            this._bmd = game.make.bitmapData(this.gameObject.width, this.gameObject.height);
            this.gameObject["phaser"].loadTexture(this._bmd);
            eliArr.forEach(function (eli) {
                _this.draw(eli);
            });
            if (this.eraseLayerType === ps.EraseLayerType.INTEGRATE_CUSTOM_JUDGMENT_AREAS)
                this.gameObject.alpha = 0;
            this._bmd.dirty = true;
            this._bmd.update();
            this.initPixelsData();
            this._imageDataArr[0] = this._bmd.context.getImageData(0, 0, this.gameObject.width, this.gameObject.height);
            this._bmd.context.globalCompositeOperation = "destination-out";
        };
        EraseLayer.prototype.clearEraseTraces = function () {
            this._bmd.clear();
            this._bmd.context.putImageData(this._imageDataArr[0], 0, 0);
            this.updateBMD();
        };
        /** 绘制图层 */
        EraseLayer.prototype.draw = function (eli) {
            var _this = this;
            switch (eli.eraseLayerType) {
                case ps.EraseLayerType.MONGOLIAN_LAYER:
                case ps.EraseLayerType.CUSTOM_LAYER:
                    var img = eli.gameObject;
                    var localPoint = this.gameObject.toLocal(img.getWorldPosition());
                    var bmdPoint = new qc.Point(localPoint.x + this.gameObject.width * this.gameObject.pivotX, localPoint.y + this.gameObject.height * this.gameObject.pivotY);
                    var drawRect = new Phaser.Rectangle(bmdPoint.x, bmdPoint.y, img.width, img.height);
                    drawRect.x -= drawRect.width * img.pivotX;
                    drawRect.y -= drawRect.height * img.pivotX;
                    if (this.eraseLayerType === ps.EraseLayerType.INTEGRATE_CUSTOM_JUDGMENT_AREAS) {
                        var centerX = this._bmd.width / 2;
                        var centerY = this._bmd.height / 2;
                        var rotationBmd = game.make.bitmapData(this._bmd.width, this._bmd.height);
                        rotationBmd.context.save();
                        rotationBmd.context.translate(centerX, centerY);
                        rotationBmd.context.rotate(img.rotation);
                        rotationBmd.context.drawImage(game.cache.getImage(img.texture.atlas.url), -drawRect.width / 2, -drawRect.height / 2, drawRect.width, drawRect.height);
                        rotationBmd.context.restore();
                        this._bmd.draw(rotationBmd, localPoint.x, localPoint.y);
                    }
                    else {
                        this._bmd.draw(img.texture.atlas.url, drawRect.x, drawRect.y, drawRect.width, drawRect.height);
                    }
                    break;
                case ps.EraseLayerType.CUSTOM_JUDGMENT_AREA:
                    eli.gameObject.children.forEach(function (area) {
                        var localPoint = _this.gameObject.toLocal(area.getWorldPosition());
                        var bmd = game.make.bitmapData(_this.gameObject.width, _this.gameObject.height);
                        bmd.context.fillStyle = "#000000";
                        var centerX = _this._bmd.width / 2;
                        var centerY = _this._bmd.height / 2;
                        bmd.context.save();
                        bmd.context.translate(centerX, centerY);
                        bmd.context.rotate(area.rotation);
                        bmd.context.beginPath();
                        bmd.context.rect(-area.width / 2, -area.height / 2, area.width, area.height);
                        bmd.context.closePath();
                        bmd.context.fill();
                        bmd.context.restore();
                        _this._bmd.draw(bmd, localPoint.x, localPoint.y);
                    });
                    break;
                default:
                    break;
            }
        };
        /** 计算实际像素 */
        EraseLayer.prototype.initPixelsData = function () {
            var bmdDatalength = this._bmd.data.length;
            this.totalPixels = bmdDatalength / 4;
            var transPixels = [];
            for (var i = 0; i < bmdDatalength; i += 4) {
                var alphaNumber = this._bmd.data[i + 3];
                if (alphaNumber === 0)
                    transPixels.push(alphaNumber);
            }
            this.transparentPixels = transPixels.length;
            this.actualPixel = this.totalPixels - this.transparentPixels;
        };
        /** 擦除图层 */
        EraseLayer.prototype.eraseImg = function (ebi) {
            if (!this.isEnableEraseable)
                return false;
            if (this.eraseLayerType === ps.EraseLayerType.CUSTOM_JUDGMENT_AREA)
                return false;
            /* 屏蔽可以擦除但是还没显示的 */
            if (this.eraseLayerType !== ps.EraseLayerType.INTEGRATE_CUSTOM_JUDGMENT_AREAS && !this.gameObject.worldVisible)
                return false;
            var localPoint = this.gameObject.toLocal(ebi.globalPoint);
            var bmdPos = new qc.Point(localPoint.x + this.gameObject.width * this.gameObject.pivotX, localPoint.y + this.gameObject.height * this.gameObject.pivotY);
            var drawRect = new Phaser.Rectangle(bmdPos.x, bmdPos.y, ebi.customImg.width, ebi.customImg.height);
            switch (ebi.brushType) {
                case ps.EraseBrushType.CIRCLE:
                    break;
                case ps.EraseBrushType.RECTANGLE:
                    drawRect.x -= drawRect.width / 2;
                    drawRect.y -= drawRect.height / 2;
                    break;
                case ps.EraseBrushType.CUSTOM_IMAGES:
                    drawRect.width = ebi.customImg.width * ebi.customImg.scaleX / this.gameObject.scaleX;
                    drawRect.height = ebi.customImg.height * ebi.customImg.scaleY / this.gameObject.scaleY;
                    drawRect.x -= drawRect.width * ebi.customImg.pivotX;
                    drawRect.y -= drawRect.height * ebi.customImg.pivotX;
                    break;
            }
            /* 检查是否在可擦除图层内 */
            // const worldRect1: Phaser.Rectangle = this.localRectangleToWorldRectangle(drawRect);
            // const worldRect2: Phaser.Rectangle = this.localRectangleToWorldRectangle(this._bmd.texture.crop);
            // const isDrawCross = this.areRectanglesIntersecting(worldRect1, worldRect2);
            // if (!isDrawCross) return false;
            if (ebi.brushType === ps.EraseBrushType.CIRCLE) {
                /* 检查是否在可擦除图层内 */
                var isDrawCross = this.areRectanglesIntersecting(this._bmd.texture.crop, drawRect);
                if (!isDrawCross)
                    return false;
                this._bmd.context.beginPath();
                this._bmd.context.ellipse(drawRect.x, drawRect.y, drawRect.width, drawRect.height, 0, 0, Math.PI * 2, false);
                this._bmd.context.closePath();
                this._bmd.context.fill();
            }
            else {
                var maxWH = Math.sqrt(Math.pow(drawRect.width, 2) + Math.pow(drawRect.height, 2));
                var rotationBmd = game.make.bitmapData(maxWH, maxWH);
                rotationBmd.context.save();
                rotationBmd.context.translate(maxWH / 2, maxWH / 2);
                rotationBmd.context.rotate(-this.gameObject.rotation);
                switch (ebi.brushType) {
                    case ps.EraseBrushType.RECTANGLE:
                        rotationBmd.context.beginPath();
                        rotationBmd.context.rect(-drawRect.width / 2, -drawRect.height / 2, drawRect.width, drawRect.height);
                        rotationBmd.context.closePath();
                        rotationBmd.context.fill();
                        break;
                    case ps.EraseBrushType.CUSTOM_IMAGES:
                        rotationBmd.context.drawImage(game.cache.getImage(ebi.customImg.texture.atlas.url), -drawRect.width / 2, -drawRect.height / 2, drawRect.width, drawRect.height);
                        break;
                }
                rotationBmd.context.restore();
                var rotationRectPointX = localPoint.x + (this._bmd.width - maxWH) / 2;
                var rotationRectPointY = localPoint.y + (this._bmd.height - maxWH) / 2;
                var rotationRect = new Phaser.Rectangle(rotationRectPointX, rotationRectPointY, maxWH, maxWH);
                /* 检查是否在可擦除图层内 */
                var isDrawCross = this.areRectanglesIntersecting(this._bmd.texture.crop, rotationRect);
                if (!isDrawCross)
                    return false;
                this._bmd.draw(rotationBmd, rotationRect.x, rotationRect.y);
            }
            this._bmd.dirty = true;
            // console.log(this.eraseLayerType);
            return this.eraseLayerType !== ps.EraseLayerType.INTEGRATE_CUSTOM_JUDGMENT_AREAS;
        };
        /** 更新像素数据 */
        EraseLayer.prototype.updateBMD = function () {
            if (!this._isUpdateBMD)
                return;
            if (this._filledPercentage >= 100)
                return;
            this._bmd.update();
            this._filledPercentage = this.getFilledPercentage();
        };
        /** 计算百分比 */
        EraseLayer.prototype.getFilledPercentage = function () {
            var pixels = this._bmd.data;
            var transPixels = [];
            for (var i = 0; i < pixels.length; i += 4) {
                // 严格上来说，判断像素点是否透明需要判断该像素点的a值是否等于0，
                // 为了提高计算效率，这儿也可以设置当a值小于128，也就是半透明状态时就可以了
                if (pixels[i + 3] === 0 /* pixels[i + 3] < 128 */) {
                    transPixels.push(pixels[i + 3]);
                }
            }
            return ((transPixels.length - this.transparentPixels) / this.actualPixel) * 100;
        };
        /** 检查是否在可擦除图层内 */
        EraseLayer.prototype.areRectanglesIntersecting = function (rect1, rect2) {
            if (rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.y + rect1.height > rect2.y)
                return true;
            return false;
        };
        EraseLayer.prototype.localRectangleToWorldRectangle = function (rect) {
            var worldPoint = this.gameObject.toGlobal(new Phaser.Point(rect.x, rect.y));
            var worldScale = this.gameObject.getWorldPosition();
            return new Phaser.Rectangle(worldPoint.x, worldPoint.y, rect.width * worldScale.x, rect.height * worldScale.y);
        };
        return EraseLayer;
    }(ps.Behaviour));
    ps.EraseLayer = EraseLayer;
    qc.registerBehaviour("ps.EraseLayer", EraseLayer);
    EraseLayer["__menu"] = "Custom/EraseLayer";
})(ps || (ps = {}));
//# sourceMappingURL=EraseLayer.js.map