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
     * @date 2024/03/06 10:43:43
     */
    var EraseGroup = /** @class */ (function (_super) {
        __extends(EraseGroup, _super);
        function EraseGroup(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.eraseGroupType = ps.EraseLayerType.MONGOLIAN_LAYER;
            /** 序列化 */
            _this.serializableFields = {
                eraseGroupType: qc.Serializer.AUTO,
                canErase: qc.Serializer.BOOLEAN,
                isEnableEraseable: qc.Serializer.BOOLEAN,
            };
            return _this;
        }
        return EraseGroup;
    }(ps.Behaviour));
    ps.EraseGroup = EraseGroup;
    qc.registerBehaviour("ps.EraseGroup", EraseGroup);
    EraseGroup["__menu"] = "Custom/EraseGroup";
})(ps || (ps = {}));
//# sourceMappingURL=EraseGroup.js.map