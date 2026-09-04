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
     * @author dongtao.xiao
     * @date 2023/11/02 11:40:11
     */
    var GameView = /** @class */ (function (_super) {
        __extends(GameView, _super);
        function GameView(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.hideOnce = [];
            /** 序列化 */
            _this.serializableFields = {
                gridPanel: qc.Serializer.NODE
            };
            return _this;
        }
        Object.defineProperty(GameView.prototype, "Store", {
            get: function () {
                return main.sceneNodes[0].getScript('ps.Store');
            },
            enumerable: false,
            configurable: true
        });
        /** 组件被激活后执行 */
        GameView.prototype.awake = function () {
            // console.info("[info] GameView.awake");
        };
        /** 试玩初始化的处理 */
        GameView.prototype.onInit = function () {
            // console.info("[info] GameView.onInit");
        };
        /** 试玩开始时的处理 */
        GameView.prototype.onStart = function () {
            var _this = this;
            // console.info("[info] GameView.onStart");
            main.gameEvent.addOnce("firstElimte", function () {
                _this.hideOnce.forEach(function (item) {
                    item.children[0].visible = true;
                });
            });
            this.initGridView();
            this.initProbArr();
            var isExists = ps.chessEliminationJudgment.instance.checkExistErasableChess();
            //进行死局判断
            if (isExists) {
                this.Store.GuideHandMovePos = isExists;
                ps.GuideHand.instance.showGuideHand();
            }
            else {
                //console.log(GAME_CFG.autoTry)
                //console.log('死局')
                if (GAME_CFG.autoTry == 'Refresh') {
                    ps.chessEliminationJudgment.instance.resetChessboardInfo();
                }
                else {
                    // console.log('死局,-进入结束页')
                    ps.chessEliminationJudgment.instance.lockInteractive();
                    this.Store.canHandShow = false;
                    // ps.sendAction(6)
                    ps.xtween(null)
                        .delay(0)
                        .call(function () {
                        ps.triggerCustomEvent({
                            scene: main.sceneNodes[3],
                            eventName: '进入失败页'
                        });
                    })
                        .start();
                }
            }
        };
        GameView.prototype.initProbArr = function () {
            this.Store.renewProb = [];
            //   console.log(this.Store.totalChess,'总的元素')
            var itemsData = this.gameObject.getScript('ps.GridView').config.gridsConfig.items;
            var proStr = GAME_CFG.pro;
            var flag = /^(?:0|[1-9]\d*)[:：](?:0|[1-9]\d*)[:：](?:0|[1-9]\d*)[:：](?:0|[1-9]\d*)$/.test(proStr);
            var proArr;
            if (flag) {
                proArr = proStr.split(/[:：]/);
                // console.log(proArr,proStr.split(/[:：]/))
                if (proArr.length !== 4) {
                    proArr = [1, 1, 1, 1];
                }
                else if (proArr.every(function (item) { return item == 0; })) {
                    proArr = [1, 1, 1, 1];
                }
            }
            else {
                proArr = [1, 1, 1, 1];
            }
            // console.log(proArr)
            var sum1 = proArr.reduce(function (pre, next) { return Number(pre) + Number(next); }, 0);
            // console.log(itemsData,this.Store.totalChess,this.gameObject.getScript('ps.GridView').config.gridsConfig.items[2].typeId)
            var index = 0;
            for (var i = 0; i < itemsData.length; i++) {
                if (this.Store.totalChess.has(itemsData[i].typeId)) {
                    this.Store.renewProb.push(Number(proArr[index]) / sum1 * 100);
                    index++;
                }
            }
            this.Store.sumProb = [];
            this.Store.sumProb.push(this.Store.renewProb[0]);
            for (var i = 1; i < this.Store.renewProb.length; i++) {
                this.Store.sumProb[i] = this.Store.sumProb[i - 1] + this.Store.renewProb[i];
            }
            // console.log(this.Store.renewProb,this.Store.sumProb,proArr)
        };
        GameView.prototype.initGridView = function () {
            console.log(this.gameObject.getScript('ps.GridView').data, this.gameObject.getScript('ps.GridView').config.gridsConfig, '初始数据-设计给定');
            var initialData = this.gameObject.getScript('ps.GridView').data;
            this.Store.checkerboardArr = new Array(initialData.length).fill(undefined).map(function () { return new Array(initialData[0].length); });
            this.Store.checkboardPosArr = new Array(initialData.length).fill(undefined).map(function () { return new Array(initialData[0].length); });
            this.Store.totalChess = new Map(); //去掉障碍物的集合
            this.Store.totalResetChess = new Map(); //包括障碍物的集合
            var configs = this.gameObject.getScript('ps.GridView').config.gridsConfig;
            main.cellBackgroundActive = configs.cellBackgroundActive;
            this.Store.resource = "resource/".concat(configs.scene).concat(configs.group ? "/" + configs.group : "");
            var ObstacleID = this.gameObject.getScript('ps.GridView').config.gridsConfig.items[2].typeId; //固定为元素
            var cellsData = this.gameObject.getScript('ps.GridView').config.gridsConfig.cells;
            var itemsData = this.gameObject.getScript('ps.GridView').config.gridsConfig.items;
            for (var row = 0; row < initialData.length; row++) {
                for (var col = 0; col < initialData[row].length; col++) {
                    //  console.log(initialData[row][col])
                    var falg = main.cellBackgroundActive ? initialData[row][col].node.children.length > 1 : initialData[row][col].node.children.length > 0;
                    if (main.cellBackgroundActive && initialData[row][col].node.children.length == 1) {
                        (initialData[row][col].node.children[0]).visible = false;
                        this.hideOnce.push(initialData[row][col].node);
                    }
                    if (cellsData[row][col].active && (falg)) {
                        var item = {
                            active: cellsData[row][col].active,
                            isObstacle: initialData[row][col].typeId === ObstacleID,
                            type: initialData[row][col].typeId,
                            textTure: initialData[row][col].node.getChildByName("imgCell").texture
                        };
                        if (!this.Store.totalChess.has(initialData[row][col].typeId) && initialData[row][col].typeId !== ObstacleID) {
                            // console.log(initialData[row][col],(initialData[row][col].node.children[0] as qc.UIImage).texture)
                            this.Store.totalChess.set(initialData[row][col].typeId, item);
                        }
                        if (!this.Store.totalResetChess.has(initialData[row][col].typeId)) {
                            this.Store.totalResetChess.set(initialData[row][col].typeId, item);
                        }
                    }
                }
            }
            for (var row = 0; row < initialData.length; row++) {
                for (var col = 0; col < initialData[row].length; col++) {
                    var item = {
                        type: initialData[row][col].typeId,
                        row: row,
                        col: col,
                        node: initialData[row][col].node,
                        isObstacle: initialData[row][col].typeId === ObstacleID,
                        active: cellsData[row][col].active
                    };
                    initialData[row][col].node.addScript('ps.ChessInfo').deploy(item.type, item.row, item.col);
                    this.Store.checkerboardArr[row][col] = item;
                    var PosItem = {
                        row: row,
                        col: col,
                        x: initialData[row][col].node.x,
                        y: initialData[row][col].node.y
                    };
                    this.Store.checkboardPosArr[row][col] = PosItem;
                }
            }
            this.Store.rowCount = this.gameObject.getScript('ps.GridView').config.gridsConfig.rowCount;
            this.Store.colCount = this.gameObject.getScript('ps.GridView').config.gridsConfig.colCount;
            // console.log(this.Store.checkerboardArr,this.Store.totalChess)
        };
        /** 当脚本被移除时，会自动调用 */
        GameView.prototype.onDestroy = function () {
            // console.info("[info] GameView.onDestroy");
        };
        return GameView;
    }(ps.Behaviour));
    ps.GameView = GameView;
    qc.registerBehaviour("ps.GameView", GameView);
    GameView["__menu"] = "玩法模板/玩法/（GameView）";
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
//# sourceMappingURL=GameView.js.map