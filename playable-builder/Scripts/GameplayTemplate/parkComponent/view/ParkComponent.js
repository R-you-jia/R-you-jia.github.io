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
    /** 可行走实体对象的朝向方向 */
    var MoveOrientation;
    (function (MoveOrientation) {
        /** 上 */
        MoveOrientation[MoveOrientation["Up"] = 0] = "Up";
        /** 下 */
        MoveOrientation[MoveOrientation["Down"] = 1] = "Down";
        /** 左 */
        MoveOrientation[MoveOrientation["Left"] = 2] = "Left";
        /** 右 */
        MoveOrientation[MoveOrientation["Right"] = 3] = "Right";
    })(MoveOrientation = ps.MoveOrientation || (ps.MoveOrientation = {}));
    /** 可行走实体对象的行走方向 */
    var MovableDirection;
    (function (MovableDirection) {
        /** 前进 */
        MovableDirection[MovableDirection["Forward"] = 0] = "Forward";
        /** 左转 */
        MovableDirection[MovableDirection["Left"] = 1] = "Left";
        /** 右转 */
        MovableDirection[MovableDirection["Right"] = 2] = "Right";
        /** 左调头 */
        MovableDirection[MovableDirection["TurnLeft"] = 3] = "TurnLeft";
        /** 右调头 */
        MovableDirection[MovableDirection["TurnRight"] = 4] = "TurnRight";
    })(MovableDirection = ps.MovableDirection || (ps.MovableDirection = {}));
    //#region grid cell 网格信息
    /** 每个网格的格子类型 */
    var GridCellType;
    (function (GridCellType) {
        /** 障碍物 */
        GridCellType[GridCellType["Obstacle"] = 0] = "Obstacle";
        /** 可行走的格子，可装实体对象的格子 */
        GridCellType[GridCellType["Movable"] = 1] = "Movable";
        /** 自定义格子,根据策划需要做功能 */
        GridCellType[GridCellType["Custom"] = 2] = "Custom";
    })(GridCellType = ps.GridCellType || (ps.GridCellType = {}));
    //#region movable 可行走格子
    /** 扩展功能类型 */
    var MovableType;
    (function (MovableType) {
        /** 出口 */
        MovableType[MovableType["Exist"] = 0] = "Exist";
        /** 转到出口，也可以理解为是一个自动寻路 */
        MovableType[MovableType["TurnExist"] = 1] = "TurnExist";
    })(MovableType = ps.MovableType || (ps.MovableType = {}));
    //#endregion
    //#region entity 行走对象
    /** 移动实体对象 */
    var EntityType;
    (function (EntityType) {
        /** 可移动实体对象 */
        EntityType[EntityType["Entity"] = 0] = "Entity";
        /** 可移动实体对象占格 */
        EntityType[EntityType["Possess"] = 1] = "Possess";
    })(EntityType = ps.EntityType || (ps.EntityType = {}));
    var ParkComponent = /** @class */ (function (_super) {
        __extends(ParkComponent, _super);
        function ParkComponent(gameObject) {
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
        return ParkComponent;
    }(ps.Behaviour));
    ps.ParkComponent = ParkComponent;
    qc.registerBehaviour("ps.ParkComponent", ParkComponent);
})(ps || (ps = {}));
//# sourceMappingURL=ParkComponent.js.map