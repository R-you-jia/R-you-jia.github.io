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
    var EraseHandImage = /** @class */ (function (_super) {
        __extends(EraseHandImage, _super);
        function EraseHandImage(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this._brushPivot = new qc.Point(0.5, 0.5);
            /** 序列化 */
            _this.serializableFields = {
                brushPivot: qc.Serializer.POINT,
            };
            return _this;
        }
        Object.defineProperty(EraseHandImage.prototype, "brushPivot", {
            get: function () {
                return this._brushPivot;
            },
            set: function (v) {
                this._brushPivot = v;
            },
            enumerable: false,
            configurable: true
        });
        return EraseHandImage;
    }(ps.Behaviour));
    ps.EraseHandImage = EraseHandImage;
    qc.registerBehaviour("ps.EraseHandImage", EraseHandImage);
    EraseHandImage["__menu"] = "Custom/EraseHandImage";
})(ps || (ps = {}));
//# sourceMappingURL=EraseHandImage.js.map