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
     * @date 2024/07/05 11:18:26
     */
    var PuzzlePieceInfo = /** @class */ (function (_super) {
        __extends(PuzzlePieceInfo, _super);
        function PuzzlePieceInfo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PuzzlePieceInfo.prototype.deploy = function ($img, $bmd, $col, $row, $isEdge, $active, $pieceComponentData) {
            this._img = $img;
            this._bmd = $bmd;
            this._col = $col;
            this._row = $row;
            this._isEdge = $isEdge;
            this._active = $active;
            this._pieceComponentData = $pieceComponentData;
            // this.gameObject.onTransformChanged.add(this.changeFollowElement, this)
        };
        PuzzlePieceInfo.prototype.changeFollowElement = function () {
            if (this._topShadow) {
                this.followPostion(this._topShadow.img, this._topShadowInfo);
            }
            if (this._topBorder) {
                this.followPostion(this._topBorder.img, this.topBorderInfo);
            }
            if (this._bottomShadow) {
                this.followPostion(this._bottomShadow.img, this.bottomShadowInfo);
            }
        };
        PuzzlePieceInfo.prototype.followPostion = function (node, shadowInfo) {
            var globalPoint = this.gameObject.toGlobal(new qc.Point(0, 0));
            var localPoint = node.parent.toLocal(globalPoint);
            node.x = localPoint.x;
            node.y = localPoint.y;
            node.rotation = this._img.getWorldRotation();
        };
        Object.defineProperty(PuzzlePieceInfo.prototype, "bmdCenterPoint", {
            get: function () {
                if (!this._pieceComponentData)
                    return null;
                var pieceSize = this._pieceComponentData.pieceSize;
                var bmdCenterPointX = (this._col + 0.5) * pieceSize;
                var bmdCenterPointY = (this._row + 0.5) * pieceSize;
                return new qc.Point(bmdCenterPointX, bmdCenterPointY);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzlePieceInfo.prototype, "canvasCenterPoint", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzlePieceInfo.prototype, "pieceComponentData", {
            get: function () {
                return this._pieceComponentData;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzlePieceInfo.prototype, "img", {
            get: function () {
                return this._img;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzlePieceInfo.prototype, "bmd", {
            get: function () {
                return this._bmd;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzlePieceInfo.prototype, "context", {
            get: function () {
                return this._bmd.context;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzlePieceInfo.prototype, "topShadowInfo", {
            get: function () {
                return this._topShadowInfo;
            },
            set: function (v) {
                var _a, _b, _c;
                this._topShadowInfo = v;
                if (this._topShadowInfo) {
                    var topShadowNode = this._pieceComponentData.topShadowNode;
                    if (this._topShadow) {
                        (_a = this._topShadow.img) === null || _a === void 0 ? void 0 : _a.destroy();
                        this._topShadow = null;
                    }
                    var shadow = PuzzlePieceDrawPath.getPieceShadow(this._topShadowInfo.color, this._col, this._row, this._topShadowInfo.borderStyle, this._pieceComponentData);
                    this._topShadow = { img: shadow.shadow, bmd: shadow.bmd };
                    topShadowNode.addChild(this._topShadow.img);
                    this.followPostion(this._topShadow.img, this._topShadowInfo);
                }
                else {
                    (_c = (_b = this._topShadow) === null || _b === void 0 ? void 0 : _b.img) === null || _c === void 0 ? void 0 : _c.destroy();
                    this._topShadow = null;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzlePieceInfo.prototype, "topBorderInfo", {
            get: function () {
                return this._topBorderInfo;
            },
            set: function (v) {
                var _a, _b, _c;
                this._topBorderInfo = v;
                if (this._topBorderInfo) {
                    var topBorderNode = this._pieceComponentData.topBorderNode;
                    if (this._topBorder) {
                        (_a = this._topBorder.img) === null || _a === void 0 ? void 0 : _a.destroy();
                        this._topBorder = null;
                    }
                    var shadow = PuzzlePieceDrawPath.getPieceShadow(this._topBorderInfo.color, this._col, this._row, this._topBorderInfo.borderStyle, this._pieceComponentData);
                    this._topBorder = { img: shadow.shadow, bmd: shadow.bmd };
                    topBorderNode.addChild(this._topBorder.img);
                    this.followPostion(this._topBorder.img, this._topBorderInfo);
                }
                else {
                    (_c = (_b = this._topBorder) === null || _b === void 0 ? void 0 : _b.img) === null || _c === void 0 ? void 0 : _c.destroy();
                    this._topBorder = null;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzlePieceInfo.prototype, "bottomShadowInfo", {
            get: function () {
                return this._bottomShadowInfo;
            },
            set: function (v) {
                var _a, _b, _c;
                this._bottomShadowInfo = v;
                if (this._bottomShadowInfo) {
                    var bottomShadowNode = this._pieceComponentData.bottomShadowNode;
                    if (this._bottomShadow) {
                        (_a = this._bottomShadow.img) === null || _a === void 0 ? void 0 : _a.destroy();
                        this._bottomShadow = null;
                    }
                    var shadow = PuzzlePieceDrawPath.getPieceShadow(this._bottomShadowInfo.color, this._col, this._row, this._bottomShadowInfo.borderStyle, this._pieceComponentData);
                    ;
                    this._bottomShadow = { img: shadow.shadow, bmd: shadow.bmd };
                    bottomShadowNode.addChild(this._bottomShadow.img);
                    this.followPostion(this._bottomShadow.img, this._bottomShadowInfo);
                }
                else {
                    (_c = (_b = this._bottomShadow) === null || _b === void 0 ? void 0 : _b.img) === null || _c === void 0 ? void 0 : _c.destroy();
                    this._bottomShadow = null;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzlePieceInfo.prototype, "topShadow", {
            get: function () {
                return this._topShadow;
            },
            set: function (v) {
                this._topShadow = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzlePieceInfo.prototype, "topBorder", {
            get: function () {
                return this._topBorder;
            },
            set: function (v) {
                this._topBorder = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzlePieceInfo.prototype, "bottomShadow", {
            get: function () {
                return this._bottomShadow;
            },
            set: function (v) {
                this._bottomShadow = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzlePieceInfo.prototype, "col", {
            get: function () {
                return this._col;
            },
            set: function (v) {
                this._col = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzlePieceInfo.prototype, "row", {
            get: function () {
                return this._row;
            },
            set: function (v) {
                this._row = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzlePieceInfo.prototype, "isEdge", {
            get: function () {
                return this._isEdge;
            },
            set: function (v) {
                this._isEdge = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzlePieceInfo.prototype, "active", {
            get: function () {
                return this._active;
            },
            set: function (v) {
                this._active = v;
            },
            enumerable: false,
            configurable: true
        });
        return PuzzlePieceInfo;
    }(ps.Behaviour));
    ps.PuzzlePieceInfo = PuzzlePieceInfo;
})(ps || (ps = {}));
//# sourceMappingURL=PuzzlePieceInfo.js.map