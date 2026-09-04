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
    var ShelvesComponent = /** @class */ (function (_super) {
        __extends(ShelvesComponent, _super);
        function ShelvesComponent(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.psConfig = null;
            _this.gridConfig = null;
            /** 序列化 */
            _this.serializableFields = {
                psConfig: qc.Serializer.MAPPING,
                gridConfig: qc.Serializer.MAPPING,
            };
            return _this;
        }
        /**
         *
         * @param img 需要生成发光图片的物品
         * @param parent 发光图片父节点
         * @param color  发光图片颜色
         * @param glowSize 发光图片发光大小
         * @returns
         */
        ShelvesComponent.prototype.drawImageWithGlow = function (img, parent, color, glowSize) {
            var width = img.width + glowSize * 2;
            var height = img.height + glowSize * 2;
            var glowImg = qc_game.add.image(parent);
            glowImg.width = img.width;
            glowImg.height = img.height;
            var bmd = game.make.bitmapData(width, height);
            glowImg["phaser"].loadTexture(bmd);
            bmd.context.clearRect(0, 0, img.width, img.height);
            bmd.context.globalCompositeOperation = 'source-over';
            for (var i = 0; i < 3; i++) {
                bmd.context.shadowColor = color;
                bmd.context.shadowBlur = (i + 1) * (glowSize / 3);
                bmd.context.drawImage(img.texture.atlas.img, glowSize, glowSize, img.width, img.height);
            }
            bmd.context.shadowColor = 'transparent';
            bmd.context.shadowBlur = 0;
            bmd.context.globalCompositeOperation = "destination-out";
            bmd.context.drawImage(img.texture.atlas.img, glowSize, glowSize, img.width, img.height);
            bmd.dirty = true;
            return { glowImg: glowImg, bmd: bmd };
        };
        return ShelvesComponent;
    }(ps.Behaviour));
    ps.ShelvesComponent = ShelvesComponent;
    qc.registerBehaviour("ps.ShelvesComponent", ShelvesComponent);
})(ps || (ps = {}));
//# sourceMappingURL=ShelvesComponent.js.map