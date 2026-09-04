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
     * 起止区域
     * @description 画线可连接的起止区域
     * @author bin
     * @date 2023/10/09 15:47:21
     */
    var StartStopArea = /** @class */ (function (_super) {
        __extends(StartStopArea, _super);
        function StartStopArea(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            /** 画笔颜色 */
            _this._brushColor = new qc.Color("#FFFFFF");
            /** 画笔粗细 */
            _this._brushSize = 10;
            /** 连线成功后不允许再次连线 */
            _this._disableDrawAgain = true;
            /** 允许连线 */
            _this._enableDraw = false;
            /** 序列化 */
            _this.serializableFields = {
                matchNodes: qc.Serializer.NODES,
                brushColor: qc.Serializer.AUTO,
                brushSize: qc.Serializer.AUTO,
                disableDrawAgain: qc.Serializer.AUTO,
                enableDraw: qc.Serializer.AUTO,
            };
            return _this;
        }
        Object.defineProperty(StartStopArea.prototype, "matchNodes", {
            get: function () {
                return this._matchNodes;
            },
            set: function (value) {
                this._matchNodes = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(StartStopArea.prototype, "brushColor", {
            get: function () {
                return this._brushColor;
            },
            set: function (value) {
                this._brushColor = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(StartStopArea.prototype, "brushSize", {
            get: function () {
                return this._brushSize;
            },
            set: function (value) {
                this._brushSize = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(StartStopArea.prototype, "disableDrawAgain", {
            get: function () {
                return this._disableDrawAgain;
            },
            set: function (value) {
                this._disableDrawAgain = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(StartStopArea.prototype, "enableDraw", {
            get: function () {
                return this._enableDraw;
            },
            set: function (value) {
                this._enableDraw = value;
            },
            enumerable: false,
            configurable: true
        });
        StartStopArea.prototype.createGui = function () {
            return {
                matchNodes: {
                    title: "允许配对的所有节点"
                },
                brushColor: {
                    title: "画笔颜色",
                    component: "color-picker"
                },
                brushSize: {
                    title: "画笔粗细",
                    component: "int",
                    field: {
                        min: 1,
                        max: 500
                    }
                },
                disableDrawAgain: {
                    title: "连线成功后不允许再次连线",
                    component: "switch"
                },
                enableDraw: {
                    title: "允许连线",
                    component: "switch"
                }
            };
        };
        /**
         * 与该区域是否配对
         * @param area 配对区域节点
         * @returns 配对结果
         */
        StartStopArea.prototype.isMatch = function (area) {
            var _a;
            return ((_a = this._matchNodes) === null || _a === void 0 ? void 0 : _a.indexOf(area)) >= 0;
        };
        /**
         * 新增配对区域节点
         * @param area 配对区域节点
         * @returns 允许配对的所有节点
         */
        StartStopArea.prototype.addMatchNode = function (area) {
            if (!this.isMatch(area)) {
                this._matchNodes.push(area);
            }
            return this._matchNodes;
        };
        /**
         * 删除配对区域节点
         * @param area 配对区域节点
         * @returns 允许配对的所有节点
         */
        StartStopArea.prototype.deleteMatchNode = function (area) {
            var i = this.getMatchNodeIndex(area);
            if (i >= 0) {
                this._matchNodes.splice(i, 1);
            }
            return this._matchNodes;
        };
        /**
         * 获取配对节点所属允许配对的所有节点里的索引值
         * @param area 配对区域节点
         * @returns 配对节点所属允许配对的所有节点里的索引值
         */
        StartStopArea.prototype.getMatchNodeIndex = function (area) {
            return this._matchNodes ? this._matchNodes.indexOf(area) : -1;
        };
        /** 当脚本被移除时，会自动调用 */
        StartStopArea.prototype.onDestroy = function () {
            // console.info("[info] StartStopArea.onDestroy");
        };
        return StartStopArea;
    }(ps.Behaviour));
    ps.StartStopArea = StartStopArea;
    qc.registerBehaviour("ps.StartStopArea", StartStopArea);
    StartStopArea["__menu"] = "玩法模板/画线玩法/起止区域（StartStopArea）";
    /**
    帧回调（preUpdate、update、postUpdate）
    如果实现了这几个函数，系统会自动每帧进行调度（当挂载的Node节点处于可见、并且本脚本的enable=true时）
    初始化（awake）
    如果实现了awake函数，系统会在Node节点构建完毕（反序列化完成后）自动调度
    脚本可用/不可用（onEnable、onDisable）
    当脚本的enable从false->true时，会自动调用onEnable函数；反之调用onDisable函数
    ps:在awake结束时,如果当前脚本的enable为true，会自动调用onEnable函数
    交互回调（onClick、onUp、onDown、onDrag、onDragStart、onDragEnd）
    当挂载的Node具备交互时，一旦捕获相应的输入事件，这些函数会自动被调用
    脚本析构（onDestroy）
    当脚本被移除时，会自动调用onDestroy函数，用户可以定义必要的资源回收代码
    //PlaySmart新增回调(继承ps.Behaviour)
    pl状态回调(onInit、onStart、onEnding、onRetry)
    如果实现了这几个函数，会在pl进行到相应状态的时候进行回调
    */
})(ps || (ps = {}));
//# sourceMappingURL=StartStopArea.js.map