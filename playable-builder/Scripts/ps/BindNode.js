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
     * 用于协同流程制作的pt模板，记录各种场合下节点间的绑定关系
     * @author yaoquan.wu
     */
    var BindNode = /** @class */ (function (_super) {
        __extends(BindNode, _super);
        function BindNode(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            /** 记录父节点下绑定哪个图层作为刚体轮廓设置 */
            _this.groupSubRigidNode = null;
            /** 序列化 */
            _this.serializableFields = {
                groupSubRigidNode: qc.Serializer.NODE,
            };
            return _this;
        }
        return BindNode;
    }(ps.Behaviour));
    ps.BindNode = BindNode;
    qc.registerBehaviour('ps.BindNode', BindNode);
    BindNode['_menu'] = 'Custom/BindNode';
})(ps || (ps = {}));
//# sourceMappingURL=BindNode.js.map