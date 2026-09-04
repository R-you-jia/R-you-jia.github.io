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
     * @date 2023/11/06 17:17:34
     */
    var GuideHand = /** @class */ (function (_super) {
        __extends(GuideHand, _super);
        function GuideHand(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.isShowHand = false;
            _this.handTimer = null;
            /** 序列化 */
            _this.serializableFields = {
                hand: qc.Serializer.NODE
            };
            return _this;
        }
        Object.defineProperty(GuideHand, "instance", {
            get: function () {
                return GuideHand._instance;
            },
            set: function (value) {
                GuideHand._instance = value;
            },
            enumerable: false,
            configurable: true
        });
        /** 组件被激活后执行 */
        GuideHand.prototype.awake = function () {
            // console.info("[info] PlayGame.awake");
            GuideHand._instance = this;
        };
        Object.defineProperty(GuideHand.prototype, "Store", {
            get: function () {
                return main.sceneNodes[0].getScript('ps.Store');
            },
            enumerable: false,
            configurable: true
        });
        /** 试玩初始化的处理 */
        GuideHand.prototype.onInit = function () {
            // console.info("[info] GuideHand.onInit");
            this.hand.setPropertyIgnoreLayout({ prop: 'visible' });
        };
        /** 试玩开始时的处理 */
        GuideHand.prototype.onStart = function () {
            // console.info("[info] GuideHand.onStart");
            this.hand.visible = false;
        };
        GuideHand.prototype.showGuideHand = function () {
            var _this = this;
            if (this.isShowHand)
                return;
            if (!this.Store.canHandShow)
                return;
            this.isShowHand = true;
            this.handTimer && ps.timer.remove(this.handTimer);
            this.handTimer = null;
            this.PosInfo = this.Store.GuideHandMovePos;
            //  console.log('11', this.PosInfo)
            var startNode = this.Store.checkerboardArr[this.PosInfo[0].row][this.PosInfo[0].col].node;
            //  console.log(startNode)
            var startPos = this.gameObject.parent.toLocal(startNode.getWorldPosition());
            var endNode = this.Store.checkerboardArr[this.PosInfo[1].row][this.PosInfo[1].col].node;
            var endPos = this.gameObject.parent.toLocal(endNode.getWorldPosition());
            ps.triggerCustomEvent({
                scene: main.sceneNodes[3],
                eventName: '指引入场反馈'
            });
            ps.xtween(this.hand)
                .set({ x: startPos.x, y: startPos.y, visible: true, rotation: ps.Mathf.angleToRadian(-45), alpha: 0, scaleX: 1, scaleY: 1 })
                .call(function () {
                ps.XTween.repeatForever(false, ps.xtween(_this.hand)
                    .set({ x: startPos.x, y: startPos.y, visible: true, rotation: ps.Mathf.angleToRadian(-45), alpha: 0, scaleX: 1, scaleY: 1 })
                    // .call(() => {
                    //     this.cloneNode = ps.Instantiate(startNode, this.gameObject.parent)
                    //     this.cloneNode.interactive = false
                    //     this.gameObject.parent.setChildIndex(this.cloneNode, this.gameObject.parent.children.length - 2)
                    //     this.cloneNode.x = startPos.x
                    //     this.cloneNode.y = startPos.y
                    //     this.cloneNode.alpha = 0.5
                    // })
                    .to(400, { alpha: 1, scaleX: 0.95, scaleY: 0.95 })
                    .to(400, { scaleX: 1, scaleY: 1 })
                    // .call(() => {
                    //     ps.xtween(this.cloneNode)
                    //         .to(1000, { x: endPos.x, y: endPos.y }, { easing: ps.XTween.Easing.Quadratic.InOut })
                    //         .call(() => {
                    //             this.gameObject.parent.removeChild(this.cloneNode)
                    //             this.cloneNode.alpha = 0
                    //         }).start()
                    // })
                    .to(1000, { x: endPos.x, y: endPos.y, alpha: 1 }, { easing: ps.XTween.Easing.Quadratic.InOut })).start();
            }).start();
        };
        GuideHand.prototype.hideGuide = function () {
            this.handTimer && ps.timer.remove(this.handTimer);
            if (!this.isShowHand)
                return;
            if (this.cloneNode) {
                this.gameObject.parent.removeChild(this.cloneNode);
            }
            this.cloneNode = null;
            this.handTimer = null;
            this.hand.alpha = 0;
            this.isShowHand = false;
            ps.triggerCustomEvent({
                scene: main.sceneNodes[3],
                eventName: '指引退场反馈'
            });
            ps.XTween.removeAllTweens();
            // ps.XTween.removeTargetTweens(this.hand)
        };
        /** 当脚本被移除时，会自动调用 */
        GuideHand.prototype.onDestroy = function () {
            // console.info("[info] GuideHand.onDestroy");
        };
        GuideHand.prototype.onResize = function () {
            if (this.isShowHand) {
                this.hideGuide();
                this.showGuideHand();
            }
        };
        return GuideHand;
    }(ps.Behaviour));
    ps.GuideHand = GuideHand;
    qc.registerBehaviour("ps.GuideHand", GuideHand);
    GuideHand["__menu"] = "玩法模板/玩法/（GuideHand）";
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
//# sourceMappingURL=GuideHand.js.map