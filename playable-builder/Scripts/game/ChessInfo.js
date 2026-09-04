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
     * @date 2023/11/02 14:02:42
     */
    var ChessInfo = /** @class */ (function (_super) {
        __extends(ChessInfo, _super);
        function ChessInfo(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            /** 序列化 */
            _this.serializableFields = {
                type: qc.Serializer.NUMBER,
                row: qc.Serializer.NUMBER,
                col: qc.Serializer.NUMBER
            };
            return _this;
        }
        Object.defineProperty(ChessInfo.prototype, "Store", {
            get: function () {
                return main.sceneNodes[0].getScript('ps.Store');
            },
            enumerable: false,
            configurable: true
        });
        /** 组件被激活后执行 */
        ChessInfo.prototype.awake = function () {
            // console.info("[info] ChessInfo.awake");
        };
        ChessInfo.prototype.deploy = function (type, row, col) {
            this.type = type;
            this.row = row;
            this.col = col;
            this.gameObject.interactive = true;
        };
        ChessInfo.prototype.setType = function (type) {
            this.type = type;
        };
        ChessInfo.prototype.setPos = function (row, col) {
            this.row = row;
            this.col = col;
        };
        ChessInfo.prototype.onDown = function (event) {
            if (!this.Store.isMc)
                return;
            var choseItem = this.Store.checkerboardArr[this.row][this.col];
            // console.log(choseItem.type)
            if (choseItem.active && !choseItem.isObstacle && choseItem.type !== 0) { //如果格子未启用，没有有效的元素，或者为障碍的时候，就会判断为无效的操作
                this.Store.nowDownChess = this.gameObject;
                if (ps.GuideHand.instance.isShowHand) {
                    ps.GuideHand.instance.hideGuide();
                }
            }
            else {
                this.Store.isMc = true;
                this.Store.nowDownChess = null;
            }
        };
        ChessInfo.prototype.onDrag = function (event) {
            //   console.log(this.Store.isMc,'能否拖动')
            if (!this.Store.isMc)
                return;
            if (!this.Store.nowDownChess)
                return;
            var source = event.source;
            var isInChecker = this.gameObject.rectContains(new qc.Point(source.x, source.y));
            if (isInChecker)
                return;
            if (this.Store.isFirstDownSuc) { //第一次按下——任一方向滑动
                // ps.sendAction(1)
                this.Store.isFirstDownSuc = false;
            }
            this.Store.dragNum++;
            var moveDirection = this.checkMoveDirection(source);
            this.gameObject.parent.parent.getScript('ps.chessEliminationJudgment').moveChecker(this.Store.nowDownChess, moveDirection);
        };
        ChessInfo.prototype.checkMoveDirection = function (source) {
            var moveDirection;
            var nowCheckerPos = this.gameObject.getWorldPosition();
            var angle = Math.round(ps.Mathf.getAngle(nowCheckerPos.x, nowCheckerPos.y, source.x, source.y)) + 180;
            switch ('normal') {
                case 'normal':
                    if (Math.abs(source.distanceX) > Math.abs(source.distanceY)) {
                        moveDirection = source.distanceX > 0 ? 'moveRight' : 'moveLeft';
                    }
                    else {
                        moveDirection = source.distanceY > 0 ? 'moveBottom' : 'moveTop';
                    }
                    break;
            }
            return moveDirection;
        };
        ChessInfo.prototype.onUp = function () {
            // console.log(this.Store.isMc)
            this.Store.nowDownChess = null;
            if (!this.Store.isMc)
                return;
            if (!ps.GuideHand.instance.isShowHand) {
                ps.GuideHand.instance.handTimer && ps.timer.remove(ps.GuideHand.instance.handTimer);
                if (GAME_CFG.guide_time) {
                    ps.GuideHand.instance.handTimer = ps.timer.once(GAME_CFG.guide_time * 1000, function () {
                        ps.GuideHand.instance.showGuideHand();
                    });
                }
            }
        };
        /** 试玩初始化的处理 */
        ChessInfo.prototype.onInit = function () {
            // console.info("[info] ChessInfo.onInit");
        };
        /** 试玩开始时的处理 */
        ChessInfo.prototype.onStart = function () {
            // console.info("[info] ChessInfo.onStart");
        };
        /** 当脚本被移除时，会自动调用 */
        ChessInfo.prototype.onDestroy = function () {
            // console.info("[info] ChessInfo.onDestroy");
        };
        return ChessInfo;
    }(ps.Behaviour));
    ps.ChessInfo = ChessInfo;
    qc.registerBehaviour("ps.ChessInfo", ChessInfo);
    ChessInfo["__menu"] = "玩法模板/玩法/（ChessInfo）";
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
//# sourceMappingURL=ChessInfo.js.map