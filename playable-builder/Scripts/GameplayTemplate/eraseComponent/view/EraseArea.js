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
    var EraseArea = /** @class */ (function (_super) {
        __extends(EraseArea, _super);
        function EraseArea(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            /** 序列化 */
            _this.serializableFields = {};
            if (qici.config.editor) {
                gameObject.colorTint = new qc.Color('#FAC415');
                gameObject.alpha = 0.7;
            }
            else {
                gameObject.alpha = 0;
            }
            return _this;
        }
        return EraseArea;
    }(ps.Behaviour));
    ps.EraseArea = EraseArea;
    qc.registerBehaviour("ps.EraseArea", EraseArea);
    EraseArea["__menu"] = "Custom/EraseArea";
})(ps || (ps = {}));
//# sourceMappingURL=EraseArea.js.map