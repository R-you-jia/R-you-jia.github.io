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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var ps;
(function (ps) {
    /**
     *
     * @description
     * @author dongtao.xiao
     * @date 2023/11/02 15:17:24
     */
    var chessEliminationJudgment = /** @class */ (function (_super) {
        __extends(chessEliminationJudgment, _super);
        function chessEliminationJudgment(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            /** 序列化 */
            _this.serializableFields = {};
            return _this;
        }
        Object.defineProperty(chessEliminationJudgment.prototype, "Store", {
            get: function () {
                return main.sceneNodes[0].getScript('ps.Store');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(chessEliminationJudgment, "instance", {
            get: function () {
                return chessEliminationJudgment._instance;
            },
            set: function (value) {
                chessEliminationJudgment._instance = value;
            },
            enumerable: false,
            configurable: true
        });
        /** 组件被激活后执行 */
        chessEliminationJudgment.prototype.awake = function () {
            // console.info("[info] PlayGame.awake");
            chessEliminationJudgment._instance = this;
        };
        /** 试玩初始化的处理 */
        chessEliminationJudgment.prototype.onInit = function () {
            // console.info("[info] chessEliminationJudgment.onInit");
        };
        /** 试玩开始时的处理 */
        chessEliminationJudgment.prototype.onStart = function () {
            // console.info("[info] chessEliminationJudgment.onStart");
        };
        chessEliminationJudgment.prototype.moveChecker = function (nowChecker, direction) {
            var _this = this;
            if (!this.Store.isMc)
                return;
            this.Store.isMc = false;
            //   console.log('检查',this.Store.checkerboardArr,'当前的局势')
            var nowCheckerInfo = nowChecker.getScript('ps.ChessInfo');
            var moveTargetNode = this.checkMoveTarget(nowCheckerInfo, direction);
            // console.log(nowCheckerInfo, this.Store.checkerboardArr, moveTargetNode, '目标棋子')
            if (!moveTargetNode) {
                this.Store.nowDownChess = null;
                this.Store.isMc = true;
                return;
            }
            this.changeCheckerInfo(nowChecker, moveTargetNode);
            ps.xtween(null)
                .delay(150)
                .call(function () {
                var checkArr1 = _this.checkSameTypeChess(nowChecker); //判断交换是否有效
                var checkArr2 = _this.checkSameTypeChess(moveTargetNode);
                // console.log(checkArr1, checkArr2, '集合')
                var checkerArr = __spreadArray(__spreadArray([], __read(checkArr1), false), __read(checkArr2), false);
                if (checkerArr.length <= 0) {
                    _this.changeCheckerInfo(moveTargetNode, nowChecker);
                    if (_this.Store.isFirstFailMove && _this.Store.dragNum === 1) { //第一次滑动——未触发消除
                        // ps.sendAction(3)
                        _this.Store.isFirstFailMove = false;
                    }
                    ps.xtween(null)
                        .delay(200)
                        .call(function () {
                        _this.Store.nowDownChess = null;
                        _this.Store.isMc = true;
                        //   console.log('-=-=-=-=-=')
                        if (!ps.GuideHand.instance.isShowHand) {
                            ps.GuideHand.instance.handTimer && ps.timer.remove(ps.GuideHand.instance.handTimer);
                            if (GAME_CFG.guide_time) {
                                ps.GuideHand.instance.handTimer = ps.timer.once(GAME_CFG.guide_time * 1000, function () {
                                    ps.GuideHand.instance.showGuideHand();
                                });
                            }
                        }
                    }).start();
                }
                else {
                    _this.deleteAddObstacle(checkerArr);
                }
            })
                .start();
        };
        chessEliminationJudgment.prototype.deleteAddObstacle = function (checkerArr) {
            //  console.log(checkerArr,'需要消除的棋子集合')
            //可以消除
            //  console.log(this.Store.checkerboardArr, '消除前的棋盘')
            //还要根据checkerArr得出上下左右的所有的障碍元素
            var obStacleShouldMove = [];
            for (var i = 0; i < checkerArr.length; i++) {
                var item = checkerArr[i];
                var curNodeArr = this.collectObstacleChess(item);
                obStacleShouldMove.push.apply(obStacleShouldMove, __spreadArray([], __read(curNodeArr), false));
            }
            this.Store.curMoveSuccess++;
            if (GAME_CFG.extraConfig !== 0 && this.Store.curMoveSuccess === GAME_CFG.extraConfig) {
                ps.install(ps.InstallType.None);
            }
            main.moveNode.text = "x".concat(GAME_CFG.maxSuccess - this.Store.curMoveSuccess);
            if (this.Store.curMoveSuccess === 1 && this.Store.dragNum === 1) { //第一次滑动成功消除
            }
            // ps.sendAction(2)
            var name = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
            ps.triggerCustomEvent({
                scene: main.sceneNodes[3],
                eventName: "\u7B2C".concat(name[this.Store.curMoveSuccess - 1], "\u6B21\u6210\u529F\u6D88\u9664"),
            });
            this.deleteNodeProcess(checkerArr, obStacleShouldMove); //消除元素以及相关联的障碍物
            this.upDownFillChessboard(false);
        };
        chessEliminationJudgment.prototype.collectObstacleChess = function (curNode) {
            // console.log(curNode, '检查')
            var item1 = (curNode.row - 1 >= 0) && this.Store.checkerboardArr[curNode.row - 1][curNode.col].isObstacle ? this.Store.checkerboardArr[curNode.row - 1][curNode.col] : null; //上
            var item2 = (curNode.col + 1) < this.Store.colCount && this.Store.checkerboardArr[curNode.row][curNode.col + 1].isObstacle ? this.Store.checkerboardArr[curNode.row][curNode.col + 1] : null; //右
            var item3 = (curNode.row + 1) < this.Store.rowCount && this.Store.checkerboardArr[curNode.row + 1][curNode.col].isObstacle ? this.Store.checkerboardArr[curNode.row + 1][curNode.col] : null; //下】
            var item4 = (curNode.col - 1) >= 0 && this.Store.checkerboardArr[curNode.row][curNode.col - 1].isObstacle ? this.Store.checkerboardArr[curNode.row][curNode.col - 1] : null; //左
            // console.log(item1, item2, item3, item4)
            return [item1, item2, item3, item4].filter(function (item) { return item !== null; });
        };
        chessEliminationJudgment.prototype.checkMoveTarget = function (nowCheckerInfo, direction) {
            var target;
            var directionNow = direction.split('move')[1];
            var directionArr = this.Store.directionNormal;
            var targetRow, targetCol;
            //  console.log(direction,nowCheckerInfo,'方向与目前棋子信息')
            directionArr.forEach(function (item) {
                if (item.direction === directionNow) {
                    targetRow = nowCheckerInfo.row + item.row;
                    targetCol = nowCheckerInfo.col + item.col;
                }
            });
            if (targetCol >= this.Store.colCount || targetCol < 0 || targetRow >= this.Store.rowCount || targetRow < 0) {
                return null;
            }
            else {
                var targetNode = this.Store.checkerboardArr[targetRow][targetCol];
                if (!targetNode.isObstacle && targetNode.active && targetNode.type !== 0) {
                    target = this.Store.checkerboardArr[targetRow][targetCol];
                    //  console.log(targetRow,targetCol,target)
                    return target.node;
                }
                else {
                    return null;
                }
            }
        };
        chessEliminationJudgment.prototype.changeCheckerInfo = function (nowChecker, targetChecker) {
            var _this = this;
            // console.log(nowChecker,targetChecker,'目前的棋子---目标棋子')
            var nowCheckerInfo = nowChecker.getScript('ps.ChessInfo');
            var targetCheckerInfo = targetChecker.getScript('ps.ChessInfo');
            var nowType = {
                type: nowCheckerInfo.type,
                row: nowCheckerInfo.row,
                col: nowCheckerInfo.col,
                x: nowChecker.x,
                y: nowChecker.y
            };
            var moveType = {
                type: targetCheckerInfo.type,
                row: targetCheckerInfo.row,
                col: targetCheckerInfo.col,
                x: targetChecker.x,
                y: targetChecker.y
            };
            // console.log(nowType, moveType)
            ps.XTween.parallel(ps.xtween(nowChecker)
                .to(100, { x: moveType.x, y: moveType.y }), ps.xtween(targetChecker)
                .to(100, { x: nowType.x, y: nowType.y }))
                .call(function () {
                var temp1 = _this.Store.checkerboardArr[nowType.row][nowType.col];
                var temp2 = _this.Store.checkerboardArr[moveType.row][moveType.col];
                //   console.log((this.Store.checkerboardArr[nowType.row][nowType.col].node.getScript('ps.ChessInfo') as ChessInfo));
                _this.Store.checkerboardArr[nowType.row][nowType.col] = temp2;
                _this.Store.checkerboardArr[nowType.row][nowType.col].row = nowType.row;
                _this.Store.checkerboardArr[nowType.row][nowType.col].col = nowType.col;
                _this.Store.checkerboardArr[moveType.row][moveType.col] = temp1;
                _this.Store.checkerboardArr[moveType.row][moveType.col].row = moveType.row;
                _this.Store.checkerboardArr[moveType.row][moveType.col].col = moveType.col;
                _this.Store.checkerboardArr[nowType.row][nowType.col].node.getScript('ps.ChessInfo').setPos(nowType.row, nowType.col);
                _this.Store.checkerboardArr[moveType.row][moveType.col].node.getScript('ps.ChessInfo').setPos(moveType.row, moveType.col);
                //     console.log(this.Store.checkerboardArr, '交换后的棋盘局势')
            })
                .start();
        };
        chessEliminationJudgment.prototype.checkSameTypeChess = function (nowChecker) {
            //     console.log(this.Store.checkerboardArr, '交换后的棋盘局势')
            var nowCheckerInfo = nowChecker.getScript('ps.ChessInfo');
            var rowCheckerArr = [this.Store.checkerboardArr[nowCheckerInfo.row][nowCheckerInfo.col]];
            var row2CheckerArr = [this.Store.checkerboardArr[nowCheckerInfo.row][nowCheckerInfo.col]];
            var colCheckerArr = [this.Store.checkerboardArr[nowCheckerInfo.row][nowCheckerInfo.col]];
            //     console.log(nowChecker, '需要判断的源棋子')
            switch ('normal') {
                case 'normal':
                    //Top
                    for (var row = nowCheckerInfo.row - 1; row >= 0; row--) {
                        var nextChess = this.Store.checkerboardArr[row][nowCheckerInfo.col];
                        if (!nextChess.active || nextChess.isObstacle || nextChess.type === 0 || nextChess.type !== nowCheckerInfo.type)
                            break;
                        rowCheckerArr.push(nextChess);
                    }
                    //Bottom
                    for (var row = nowCheckerInfo.row + 1; row < this.Store.rowCount; row++) {
                        var nextChess = this.Store.checkerboardArr[row][nowCheckerInfo.col];
                        if (!nextChess.active || nextChess.isObstacle || nextChess.type === 0 || nextChess.type !== nowCheckerInfo.type)
                            break;
                        rowCheckerArr.push(nextChess);
                    }
                    break;
            }
            //Left
            for (var col = nowCheckerInfo.col - 1; col >= 0; col--) {
                var nextChess = this.Store.checkerboardArr[nowCheckerInfo.row][col];
                if (!nextChess.active || nextChess.isObstacle || nextChess.type === 0 || nextChess.type !== nowCheckerInfo.type)
                    break;
                colCheckerArr.push(nextChess);
            }
            //Right
            for (var col = nowCheckerInfo.col + 1; col < this.Store.colCount; col++) {
                var nextChess = this.Store.checkerboardArr[nowCheckerInfo.row][col];
                if (!nextChess.active || nextChess.isObstacle || nextChess.type === 0 || nextChess.type !== nowCheckerInfo.type)
                    break;
                colCheckerArr.push(nextChess);
            }
            var sameTypeCheckerArr = [];
            if (rowCheckerArr.length >= 3) {
                sameTypeCheckerArr.push.apply(sameTypeCheckerArr, __spreadArray([], __read(rowCheckerArr), false));
            }
            if (colCheckerArr.length >= 3) {
                sameTypeCheckerArr.push.apply(sameTypeCheckerArr, __spreadArray([], __read(colCheckerArr), false));
            }
            var filterMap = new Map();
            for (var i = 0; i < sameTypeCheckerArr.length; i++) {
                var key = "".concat(sameTypeCheckerArr[i].type).concat(sameTypeCheckerArr[i].row).concat(sameTypeCheckerArr[i].col);
                if (!filterMap.has(key)) {
                    filterMap.set(key, sameTypeCheckerArr[i]);
                }
            }
            /// console.log(filterMap, sameTypeCheckerArr, '需要消除的元素集合')
            var filterCheckerArr = Array.from(filterMap.values());
            //  console.log(filterCheckerArr, '去重后真正需要消除的元素集合')
            return filterCheckerArr;
        };
        // upDownFillChessboard(isResetChess)  ---参数--表示是否是重新刷新棋盘
        chessEliminationJudgment.prototype.upDownFillChessboard = function (isResetChess) {
            var _this = this;
            if (ps.GuideHand.instance.isShowHand) {
                ps.GuideHand.instance.hideGuide();
            }
            ps.GuideHand.instance.handTimer && ps.timer.remove(ps.GuideHand.instance.handTimer);
            this.Store.isMc = false;
            // console.log(this.Store.checkerboardArr, '消除后-目前棋盘的局势')
            var emptyCountArr = [];
            for (var col = 0; col < this.Store.colCount; col++) {
                var count = 0;
                for (var row = this.Store.rowCount - 1; row >= 0; row--) {
                    var item = this.Store.checkerboardArr[row][col];
                    if (item.type === 0) {
                        count++;
                    }
                    if (!item.active) {
                        count = 0;
                    }
                }
                emptyCountArr.push(count);
            }
            var curMoveColArr = [];
            for (var col = 0; col < this.Store.colCount; col++) {
                // if(emptyCountArr[col]== 0) continue
                var arrItem = [];
                for (var row = this.Store.rowCount - 1; row >= 0; row--) {
                    var item = this.Store.checkerboardArr[row][col];
                    arrItem.push(item);
                }
                if (emptyCountArr[col] !== 0) {
                    var choseInfo 
                    // console.log(emptyCountArr,'每一列需要生成的元素个数的集合数组')
                    = void 0; //新生成元素的信息
                    // console.log(emptyCountArr,'每一列需要生成的元素个数的集合数组')
                    for (var i = 0; i < emptyCountArr[col]; i++) { //先生成需要补的节点
                        var parent_1 = this.gameObject.getScript('ps.GameView').gridPanel.children[0];
                        //  let item=ps.Instantiate(this.Store.checkerboardArr[0][0],parent)
                        //    console.log(this.Store.totalChess,'可供选择的所有棋子种类--将会随机生成')
                        var choseArr = Array.from(this.Store.totalChess.values());
                        var number = Math.floor(Math.random() * 99); //后面还要增加概率生成
                        //      console.log(choseArr)
                        var choseIndex = 0;
                        if (number >= 0 && number < this.Store.sumProb[0]) {
                            choseIndex = 0;
                        }
                        else if (number >= this.Store.sumProb[0] && number < this.Store.sumProb[1]) {
                            choseIndex = 1;
                        }
                        else if (number >= this.Store.sumProb[1] && number < this.Store.sumProb[2]) {
                            choseIndex = 2;
                        }
                        else if (number >= this.Store.sumProb[2] && number < this.Store.sumProb[3]) {
                            choseIndex = 3;
                        }
                        if (choseIndex >= choseArr.length) {
                            choseIndex = Math.floor(Math.random() * choseArr.length);
                        }
                        //   console.log(number,'生成的值')
                        choseInfo = choseArr[choseIndex];
                        var cloneItem = void 0;
                        for (var row = 0; row < this.Store.rowCount; row++) {
                            for (var col_1 = 0; col_1 < this.Store.colCount; col_1++) {
                                if (this.Store.checkerboardArr[row][col_1].node.children.length > 0) {
                                    cloneItem = this.Store.checkerboardArr[row][col_1].node;
                                    break;
                                }
                            }
                        }
                        var item = ps.Instantiate(cloneItem, parent_1);
                        var startX = this.Store.checkboardPosArr[0][col].x;
                        var starty = this.Store.checkboardPosArr[0][col].y;
                        var height = item.height;
                        //    console.log(curMoveColArr, '新生成的元素节点', item, starty, startX)
                        item.x = startX;
                        item.y = starty - height * i - height;
                        var itemInfo = {
                            active: choseInfo.active,
                            row: -i - 1,
                            col: col,
                            node: item,
                            type: choseInfo.type,
                            isObstacle: choseInfo.isObstacle
                        };
                        item.getScript('ps.ChessInfo').setPos(itemInfo.row, itemInfo.col);
                        item.getScript('ps.ChessInfo').setType(itemInfo.type);
                        itemInfo.node.getChildByName("imgCell").texture =
                            choseInfo.textTure;
                        // const url=`${this.Store.resource}/${choseInfo.bin}`;
                        // (itemInfo.node.children[0] as qc.UIImage).texture = this.game.assets.find(url)
                        // console.log(url,'jupjopijiopj',itemInfo,this.game.assets.find('resource/common/grid/image_92a5e32dae.bin'),this.game);
                        arrItem.push(itemInfo);
                    }
                }
                curMoveColArr.push(arrItem);
            }
            //  console.log(curMoveColArr,'列数组开始')
            for (var i = 0; i < curMoveColArr.length; i++) {
                //   console.log('[][]')
                var emptyCount = 0;
                for (var j = 0; j < curMoveColArr[i].length; j++) {
                    if (curMoveColArr[i][j].type === 0 && curMoveColArr[i][j].active) {
                        emptyCount++;
                    }
                    else if (curMoveColArr[i][j].type !== 0 && curMoveColArr[i][j].active && emptyCount !== 0) {
                        curMoveColArr[i][j].row = curMoveColArr[i][j].row + emptyCount;
                    }
                    else if (!curMoveColArr[i][j].active) {
                        emptyCount = 0;
                    }
                }
                emptyCount = 0;
            }
            //   console.log(curMoveColArr,'列遍历全部节点需要移动的节点集合',this.Store.checkerboardArr,'当前的局势',this.Store.checkboardPosArr,'与行列对应的位置')
            for (var i = 0; i < curMoveColArr.length; i++) {
                var _loop_1 = function (j) {
                    var item = curMoveColArr[i][j];
                    var itemNode = curMoveColArr[i][j].node;
                    if (item.type !== 0 && item.active) {
                        ps.xtween(itemNode)
                            .to(400, { x: this_1.Store.checkboardPosArr[item.row][item.col].x, y: this_1.Store.checkboardPosArr[item.row][item.col].y }, { easing: ps.XTween.Easing.Quadratic.In })
                            .call(function () {
                            itemNode.getScript('ps.ChessInfo').setPos(item.row, item.col);
                            //          console.log(item.type,'7890798789',item,this.Store.checkerboardArr[item.row][item.col].type)
                            //     this.Store.checkerboardArr[item.row][item.col].node.interactive=false
                            var itemInfo = item.node.getScript('ps.ChessInfo');
                            var newItem = {
                                type: itemInfo.type,
                                row: itemInfo.row,
                                col: itemInfo.col,
                                node: item.node,
                                isObstacle: item.isObstacle,
                                active: true
                            };
                            _this.Store.checkerboardArr[item.row][item.col].type = item.type;
                            _this.Store.checkerboardArr[item.row][item.col].node.interactive = false;
                            //         console.log(item.row,item.col,'行和列----',item)
                            newItem.node.interactive = true;
                            _this.Store.checkerboardArr[item.row][item.col] = newItem;
                            // console.log(this.Store.checkerboardArr,'当前的局势')
                        })
                            .start();
                    }
                };
                var this_1 = this;
                for (var j = 0; j < curMoveColArr[i].length; j++) {
                    _loop_1(j);
                }
            }
            ps.xtween(null)
                .delay(600)
                .call(function () {
                for (var row = 0; row < _this.Store.rowCount; row++) {
                    for (var col = 0; col < _this.Store.colCount; col++) {
                        var item = _this.Store.checkerboardArr[row][col];
                        if (item.row !== row || item.col !== col) {
                            item.type = 0;
                        }
                    }
                }
                //自动棋盘消除
                var isAutoArr = _this.autoDelete();
                if (isAutoArr.length >= 3) {
                    //   console.log(isAutoArr, '-=-=-=-')
                    _this.Store.curAutoDeNum++;
                    if (_this.Store.curAutoDeNum > GAME_CFG.autoDeleteNum) { //自动消除的次数大于设定的最大连续自动消除次数
                        _this.lockInteractive();
                        _this.Store.canHandShow = false;
                        // ps.sendAction(4)
                        ps.triggerCustomEvent({
                            scene: main.sceneNodes[3],
                            eventName: '进入胜利页'
                        });
                        return;
                    }
                    //    console.log(this.Store.curAutoDeNum,'---------')
                    var obStacleShouldMove = [];
                    for (var i = 0; i < isAutoArr.length; i++) {
                        var item = isAutoArr[i];
                        var curNodeArr = _this.collectObstacleChess(item);
                        obStacleShouldMove.push.apply(obStacleShouldMove, __spreadArray([], __read(curNodeArr), false));
                    }
                    //   console.log(isAutoArr, '-=-=-=-')
                    _this.deleteNodeProcess(isAutoArr, obStacleShouldMove); ////消除元素以及相关联的障碍物
                    _this.deleteExtraNode(); //移除没有用的元素节点，防止程序卡死
                    //     console.log(this.Store.checkerboardArr, '消除后-目前棋盘的局势1467464165468')
                    _this.upDownFillChessboard(false);
                }
                else { //棋盘稳定的时候
                    // console.log(this.Store.curDeObstacleNum,this.Store.curMoveSuccess,'-=-=-=-=-=-=-')
                    _this.Store.curAutoDeNum = 0;
                    if (GAME_CFG.totalObstacle == 0) {
                        if (_this.Store.curMoveSuccess >= GAME_CFG.maxSuccess) {
                            _this.lockInteractive();
                            _this.Store.canHandShow = false;
                            // ps.sendAction(4)
                            ps.triggerCustomEvent({
                                scene: main.sceneNodes[3],
                                eventName: '进入胜利页'
                            });
                        }
                    }
                    else {
                        if (_this.Store.curDeObstacleNum >= GAME_CFG.totalObstacle) { //玩家达成目标，进入胜利结束页
                            _this.lockInteractive();
                            _this.Store.canHandShow = false;
                            // ps.sendAction(4)
                            ps.triggerCustomEvent({
                                scene: main.sceneNodes[3],
                                eventName: '进入胜利页'
                            });
                        }
                        if (_this.Store.curMoveSuccess >= GAME_CFG.maxSuccess && _this.Store.curDeObstacleNum < GAME_CFG.totalObstacle) { //玩家步数用完，且未达成目标
                            _this.lockInteractive();
                            _this.Store.canHandShow = false;
                            // ps.sendAction(6)
                            ps.triggerCustomEvent({
                                scene: main.sceneNodes[3],
                                eventName: '进入失败页'
                            });
                        }
                    }
                    //     console.log('没有可以自动消除的连续元素了')
                    // this.Store.isMc=true
                    //死局判断
                    _this.canMoreMove();
                }
            }).start();
        };
        chessEliminationJudgment.prototype.deleteNodeProcess = function (traditionNodeArr, ObstacleNodeArr) {
            var _this = this;
            var isAutoArr = traditionNodeArr;
            var obStacleShouldMove = ObstacleNodeArr;
            //        console.log(obStacleShouldMove, '总的障碍物元素')
            isAutoArr.forEach(function (item) {
                var itemRow = item.row;
                var itemCol = item.col;
                var deleteNode = _this.Store.checkerboardArr[itemRow][itemCol];
                deleteNode.type = 0;
                var itemInfo = deleteNode.node.getScript('ps.ChessInfo');
                itemInfo.setType(0);
                deleteNode.node.getChildByName("imgCell").texture =
                    null;
                if (main.cellBackgroundActive)
                    deleteNode.node.getChildByName("imgCellBg").texture =
                        null;
                CustomEventsTools.cloneEvent(deleteNode.node.parent.parent.toLocal(deleteNode.node.getWorldPosition()), _this.gameObject, {
                    scene: main.sceneNodes[3],
                    eventName: '成功消除反馈',
                });
            });
            obStacleShouldMove.forEach(function (item) {
                var itemRow = item.row;
                var itemCol = item.col;
                var deleteNode = _this.Store.checkerboardArr[itemRow][itemCol];
                deleteNode.type = 0;
                var itemInfo = deleteNode.node.getScript('ps.ChessInfo');
                itemInfo.setType(0);
                deleteNode.node.getChildByName("imgCell").texture = null;
                if (main.cellBackgroundActive)
                    deleteNode.node.getChildByName("imgCellBg").texture =
                        null;
                CustomEventsTools.cloneEvent(deleteNode.node.parent.parent.toLocal(deleteNode.node.getWorldPosition()), _this.gameObject, {
                    scene: main.sceneNodes[3],
                    eventName: '障碍消除反馈',
                });
            });
            this.Store.curDeObstacleNum += obStacleShouldMove.length;
            var number = Math.max(0, GAME_CFG.totalObstacle - this.Store.curDeObstacleNum);
            main.targetNode.text = "x".concat(number);
            ps.triggerCustomEvent({
                scene: main.sceneNodes[3],
                eventName: '消除角色反馈'
            });
        };
        chessEliminationJudgment.prototype.deleteExtraNode = function () {
            var items = this.gameObject.getScript('ps.GameView').gridPanel.children[0].children;
            for (var i = 0; i < items.length; i++) {
                //  console.log(items[i].interactive,(items[i].getScript('ps.ChessInfo') as ChessInfo).type)
                if (!items[i].interactive && items[i].getScript('ps.ChessInfo').type === 0) {
                    this.gameObject.getScript('ps.GameView').gridPanel.children[0].removeChild(items[i]);
                }
            }
        };
        chessEliminationJudgment.prototype.autoDelete = function () {
            //     console.log(this.Store.checkerboardArr,'目前的局势')
            var arr = [];
            for (var row = 0; row < this.Store.rowCount; row++) {
                for (var col = 0; col < this.Store.colCount; col++) {
                    var curNode = this.Store.checkerboardArr[row][col].node;
                    var checkArrNew = this.checkSameTypeChess(curNode);
                    arr.push.apply(arr, __spreadArray([], __read(checkArrNew), false));
                }
            }
            var mapArr = new Map();
            for (var i = 0; i < arr.length; i++) {
                var str = "".concat(arr[i].type).concat(arr[i].row).concat(arr[i].col);
                if (!mapArr.has(str)) {
                    mapArr.set(str, arr[i]);
                }
            }
            //       console.log(arr,Array.from(mapArr.values()))
            return Array.from(mapArr.values());
        };
        chessEliminationJudgment.prototype.canMoreMove = function () {
            var _this = this;
            //  console.log(this.Store.checkerboardArr, '目前的局势')
            var isExists = this.checkExistErasableChess();
            if (isExists) {
                this.Store.nowDownChess = null;
                //    console.log(isExists, '可以交换的位置指引')
                this.Store.GuideHandMovePos = isExists;
                //   console.log(this.Store.isMc, '----棋盘稳定后')
                if (!ps.GuideHand.instance.isShowHand) {
                    ps.GuideHand.instance.handTimer && ps.timer.remove(ps.GuideHand.instance.handTimer);
                    if (GAME_CFG.guide_time) {
                        ps.GuideHand.instance.handTimer = ps.timer.once(GAME_CFG.guide_time * 1000, function () {
                            ps.GuideHand.instance.showGuideHand();
                        });
                    }
                }
                ps.timer.once(0, function () {
                    _this.Store.isMc = true;
                });
            }
            else {
                // 重新洗牌
                //进入到结束页面
                //console.log('死局')
                if (GAME_CFG.autoTry == 'Refresh') {
                    this.resetChessboardInfo();
                }
                else {
                    this.Store.canHandShow = false;
                    ps.timer.once(3000, function () {
                        ps.triggerCustomEvent({
                            scene: main.sceneNodes[3],
                            eventName: '进入失败页'
                        });
                    });
                    this.lockInteractive();
                }
            }
        };
        chessEliminationJudgment.prototype.checkExistErasableChess = function () {
            var _this = this;
            var chessArr = new Array(this.Store.rowCount).fill(undefined).map(function (item) { return new Array(_this.Store.colCount); });
            for (var row = 0; row < this.Store.rowCount; row++) {
                for (var col = 0; col < this.Store.colCount; col++) {
                    var itemInfo = this.Store.checkerboardArr[row][col];
                    var item = {
                        type: itemInfo.type,
                        active: itemInfo.active,
                        isObstacle: itemInfo.isObstacle,
                        row: row,
                        col: col
                    };
                    chessArr[row][col] = item;
                }
            }
            //  console.log(chessArr, '当前的信息---进行手指指引的获取')
            for (var row = this.Store.rowCount - 1; row >= 1; row--) {
                for (var col = this.Store.colCount - 1; col >= 1; col--) {
                    var itemInfo = Object.assign(chessArr[row][col]);
                    var nextItem = Object.assign(chessArr[row - 1][col]);
                    if (itemInfo.type !== 0 && itemInfo.active && !itemInfo.isObstacle && nextItem.type !== 0 && nextItem.active && !nextItem.isObstacle) { //左右交换的时候判断
                        chessArr[row][col] = nextItem;
                        chessArr[row - 1][col] = itemInfo;
                        chessArr[row][col].row = row;
                        chessArr[row][col].col = col;
                        chessArr[row - 1][col].row = row - 1;
                        chessArr[row - 1][col].col = col;
                        var arr1 = this.canSuccess(chessArr, itemInfo);
                        var arr2 = this.canSuccess(chessArr, nextItem);
                        if (arr1.length >= 3 || arr2.length >= 3) {
                            return [{ row: row, col: col }, { row: row - 1, col: col }];
                        }
                        else {
                            chessArr[row][col] = itemInfo;
                            chessArr[row - 1][col] = nextItem;
                            chessArr[row][col].row = row;
                            chessArr[row][col].col = col;
                            chessArr[row - 1][col].row = row - 1;
                            chessArr[row - 1][col].col = col;
                        }
                    }
                    var nextItem2 = Object.assign(chessArr[row][col - 1]);
                    if (itemInfo.type !== 0 && itemInfo.active && !itemInfo.isObstacle && nextItem2.type !== 0 && nextItem2.active && !nextItem2.isObstacle) { //左右交换的时候判断
                        chessArr[row][col] = nextItem2;
                        chessArr[row][col - 1] = itemInfo;
                        chessArr[row][col].row = row;
                        chessArr[row][col].col = col;
                        chessArr[row][col - 1].row = row;
                        chessArr[row][col - 1].col = col - 1;
                        var arr1 = this.canSuccess(chessArr, itemInfo);
                        var arr2 = this.canSuccess(chessArr, nextItem2);
                        if (arr1.length >= 3 || arr2.length >= 3) {
                            return [{ row: row, col: col }, { row: row, col: col - 1 }];
                        }
                        else {
                            chessArr[row][col] = itemInfo;
                            chessArr[row][col - 1] = nextItem2;
                            chessArr[row][col].row = row;
                            chessArr[row][col].col = col;
                            chessArr[row][col - 1].row = row;
                            chessArr[row][col - 1].col = col - 1;
                        }
                    }
                }
            }
            return false;
        };
        chessEliminationJudgment.prototype.canSuccess = function (standArr, cur) {
            var rowCheckerInfo = [cur];
            var colCheckerInfo = [cur];
            switch ('normal') {
                case 'normal':
                    //Top
                    for (var row = cur.row - 1; row >= 0; row--) {
                        var nextChessInfo = standArr[row][cur.col];
                        if (!nextChessInfo.active || nextChessInfo.isObstacle || nextChessInfo.type === 0 || nextChessInfo.type !== cur.type) {
                            break;
                        }
                        rowCheckerInfo.push(nextChessInfo);
                    }
                    //Buttom
                    for (var row = cur.row + 1; row < this.Store.rowCount; row++) {
                        var nextChessInfo = standArr[row][cur.col];
                        if (!nextChessInfo.active || nextChessInfo.isObstacle || nextChessInfo.type === 0 || nextChessInfo.type !== cur.type) {
                            break;
                        }
                        rowCheckerInfo.push(nextChessInfo);
                    }
                    break;
            }
            //Left
            for (var col = cur.col - 1; col >= 0; col--) {
                var nextChessInfo = standArr[cur.row][col];
                if (!nextChessInfo.active || nextChessInfo.isObstacle || nextChessInfo.type === 0 || nextChessInfo.type !== cur.type) {
                    break;
                }
                colCheckerInfo.push(nextChessInfo);
            }
            //Right
            for (var col = cur.col + 1; col < this.Store.colCount; col++) {
                var nextChessInfo = standArr[cur.row][col];
                if (!nextChessInfo.active || nextChessInfo.isObstacle || nextChessInfo.type === 0 || nextChessInfo.type !== cur.type) {
                    break;
                }
                colCheckerInfo.push(nextChessInfo);
            }
            var sameTypeCheckerArr = [];
            if (rowCheckerInfo.length >= 3) {
                sameTypeCheckerArr.push.apply(sameTypeCheckerArr, __spreadArray([], __read(rowCheckerInfo), false));
            }
            if (colCheckerInfo.length >= 3) {
                sameTypeCheckerArr.push.apply(sameTypeCheckerArr, __spreadArray([], __read(colCheckerInfo), false));
            }
            var filterMap = new Map();
            for (var i = 0; i < sameTypeCheckerArr.length; i++) {
                var key = "".concat(sameTypeCheckerArr[i].type).concat(sameTypeCheckerArr[i].row).concat(sameTypeCheckerArr[i].col);
                if (!filterMap.has(key)) {
                    filterMap.set(key, sameTypeCheckerArr[i]);
                }
            }
            // console.log(rowCheckerInfo, colCheckerInfo, sameTypeCheckerArr, '-=-=-=-')
            var filterCheckerArr = Array.from(filterMap.values());
            return filterCheckerArr;
        };
        //刷新棋盘
        chessEliminationJudgment.prototype.resetChessboardInfo = function () {
            //  console.log('刷新棋盘')
            for (var row = 0; row < this.Store.rowCount; row++) {
                for (var col = 0; col < this.Store.colCount; col++) {
                    var item = this.Store.checkerboardArr[row][col];
                    // console.log(item,'棋盘上的元素')
                    if (item.active && item.type !== 0 && !item.isObstacle) {
                        var itemInfo = item.node.getScript('ps.ChessInfo');
                        itemInfo.setType(0);
                        item.type = 0;
                        item.node.getChildByName("imgCell").texture = null;
                        if (main.cellBackgroundActive) {
                            item.node.getChildByName("imgCellBg").texture =
                                null;
                        }
                    }
                }
            }
            this.upDownFillChessboard(true);
        };
        /** 当脚本被移除时，会自动调用 */
        chessEliminationJudgment.prototype.onDestroy = function () {
            // console.info("[info] chessEliminationJudgment.onDestroy");
        };
        chessEliminationJudgment.prototype.lockInteractive = function () {
            for (var row = 0; row < this.Store.rowCount; row++) {
                for (var col = 0; col < this.Store.colCount; col++) {
                    this.Store.checkerboardArr[row][col].node.interactive = false;
                }
            }
            //main.downLoadBtn.interactive = false;
        };
        return chessEliminationJudgment;
    }(ps.Behaviour));
    ps.chessEliminationJudgment = chessEliminationJudgment;
    qc.registerBehaviour("ps.chessEliminationJudgment", chessEliminationJudgment);
    chessEliminationJudgment["__menu"] = "玩法模板/玩法/（chessEliminationJudgment）";
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
//# sourceMappingURL=chessEliminationJudgment.js.map