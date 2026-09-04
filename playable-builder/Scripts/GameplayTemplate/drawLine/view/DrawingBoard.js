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
    /** 画线方式 */
    var DrawLineType;
    (function (DrawLineType) {
        /** 连线 */
        DrawLineType["CONNECT_LINE"] = "connectLine";
        /** 自由画线 */
        DrawLineType["FREE_LINE"] = "freeLine";
    })(DrawLineType = ps.DrawLineType || (ps.DrawLineType = {}));
    /** 配对方向 */
    var PairingDirection;
    (function (PairingDirection) {
        /** 单向 */
        PairingDirection["ONE_WAY"] = "oneWay";
        /** 双向 */
        PairingDirection["BOTH_WAY"] = "bothWay";
    })(PairingDirection = ps.PairingDirection || (ps.PairingDirection = {}));
    /** 线条类型 */
    var LineType;
    (function (LineType) {
        /** 轨迹线 */
        LineType["PATH_LINE"] = "pathLine";
        /** 直线 */
        LineType["STRAIGHT_LINE"] = "straightLine";
    })(LineType = ps.LineType || (ps.LineType = {}));
    /** 画板事件 */
    var DrawingBoardEvent;
    (function (DrawingBoardEvent) {
        /** 画线开始 */
        DrawingBoardEvent["DRAW_START"] = "drawStart";
        /** 画线结束 */
        DrawingBoardEvent["DRAW_END"] = "drawEnd";
        /** 画一条线 */
        DrawingBoardEvent["DRAW_LINE"] = "drawLine";
        /** 通过节点 uuid 画一条线 */
        DrawingBoardEvent["DRAW_LINE_BY_UUID"] = "drawLineByUuid";
        /** 清除画板内容 */
        DrawingBoardEvent["CLEAR"] = "clear";
    })(DrawingBoardEvent = ps.DrawingBoardEvent || (ps.DrawingBoardEvent = {}));
    /**
     * 画板
     * @description 提供画线能力
     * @author bin
     * @date 2023/10/07 14:45:54
     */
    var DrawingBoard = /** @class */ (function (_super) {
        __extends(DrawingBoard, _super);
        function DrawingBoard(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            /** 画线方式 */
            _this._drawLineType = DrawLineType.CONNECT_LINE;
            /** 画笔颜色 */
            _this._brushColor = new qc.Color("#FFFFFF");
            /** 画笔粗细 */
            _this._brushSize = 10;
            /** 配对方向 */
            _this._pairingDirection = PairingDirection.ONE_WAY;
            /** 线条类型 */
            _this._lineType = LineType.PATH_LINE;
            _this._event = new ps.EventDispatcher();
            /** 画线数据 */
            _this._drawLineData = [];
            _this.vpActionConfig = {
                vpEraseLine: {
                    type: "object",
                    properties: {
                        pair: {
                            title: '抹除对象',
                        },
                    },
                    initData: {
                        pair: [],
                    },
                    initFunc: function () { },
                },
                vpModifyLineStyle: {
                    type: "object",
                    properties: {
                        area: {
                            title: '起止区域',
                        },
                        lineColor: {
                            title: '线条颜色',
                        },
                        lineStyle: {
                            title: '线条粗细',
                        },
                    },
                    initData: {
                        area: [],
                        lineColor: 'rgba(0,0,0,1)',
                        lineStyle: 10
                    },
                    initFunc: function () { },
                },
                vpEnablePair: {
                    type: "object",
                    properties: {
                        pair: {
                            title: '配对关系',
                        },
                        enableBan: {
                            title: '启用/禁用',
                        },
                    },
                    initData: {
                        pair: [],
                        enableBan: true
                    },
                    initFunc: function () { },
                },
            };
            _this.vpAction = {
                vpEraseLine: {
                    label: '抹除连线线条',
                    method: 'vpEraseLine',
                    category: '连线组件',
                    target: false,
                    paramLabel: 'none'
                },
                vpModifyLineStyle: {
                    label: '修改连线线条样式',
                    method: 'vpModifyLineStyle',
                    category: '连线组件',
                    target: false,
                    paramLabel: 'none'
                },
                vpEnablePair: {
                    label: '启用/禁用配对关系',
                    method: 'vpEnablePair',
                    category: '连线组件',
                    target: false,
                    paramLabel: 'none'
                },
            };
            /** 序列化 */
            _this.serializableFields = {
                drawLineType: qc.Serializer.STRING,
                brushColor: qc.Serializer.AUTO,
                brushSize: qc.Serializer.AUTO,
                pairingDirection: qc.Serializer.STRING,
                lineType: qc.Serializer.STRING,
            };
            _this.vpEnablePair = function (param) {
                var _this = this;
                var ped = this.gameObject.getScript('playsmart.editor.data');
                var data = JSON.parse(ped.$data.drawLineData);
                param.pair.forEach(function (item) {
                    var pair = data.find(function (d) { return d.uuid === item; });
                    var startAreaNode = _this.gameObject.getChild(pair.startArea);
                    var ssa = startAreaNode.getScript(ps.StartStopArea);
                    if (param.enableBan) {
                        pair.endArea.forEach(function (area) {
                            var endAreaNode = _this.gameObject.getChild(area);
                            ssa.addMatchNode(endAreaNode);
                            if (_this.pairingDirection === PairingDirection.BOTH_WAY) {
                                var ssaEnd = endAreaNode.getScript(ps.StartStopArea);
                                ssaEnd.addMatchNode(startAreaNode);
                            }
                        });
                    }
                    else {
                        pair.endArea.forEach(function (area) {
                            var endAreaNode = _this.gameObject.getChild(area);
                            ssa.deleteMatchNode(endAreaNode);
                            if (_this.pairingDirection === PairingDirection.BOTH_WAY) {
                                var ssaEnd = endAreaNode.getScript(ps.StartStopArea);
                                ssaEnd.deleteMatchNode(startAreaNode);
                            }
                        });
                    }
                });
            };
            if (qici.config.editor) {
                if (!_this.gameObject.texture) {
                    var res = qc_game.assets.find('__builtin_resource__');
                    var emptyTexture = res.getTexture('empty.png');
                    _this.gameObject.texture = emptyTexture;
                }
                _this.gameObject.colorTint = new qc.Color('rgb(82, 196, 26)');
                _this.gameObject.alpha = 0.3;
            }
            else {
                _this.gameObject.colorTint = new qc.Color('rgba(255, 255, 255, 1)');
                _this.gameObject.alpha = 1;
            }
            return _this;
        }
        Object.defineProperty(DrawingBoard.prototype, "drawLineType", {
            get: function () {
                return this._drawLineType;
            },
            set: function (value) {
                this._drawLineType = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawingBoard.prototype, "isConnectLine", {
            /** 是否为连线方式 */
            get: function () {
                return this._drawLineType === DrawLineType.CONNECT_LINE;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawingBoard.prototype, "isFreeLine", {
            /** 是否为自由画线方式 */
            get: function () {
                return this._drawLineType === DrawLineType.FREE_LINE;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawingBoard.prototype, "brushColor", {
            get: function () {
                return this._brushColor;
            },
            set: function (value) {
                this._brushColor = value;
                if (this._bitmapData) {
                    this._bitmapData.context.strokeStyle = this._brushColor.toString();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawingBoard.prototype, "brushSize", {
            get: function () {
                return this._brushSize;
            },
            set: function (value) {
                this._brushSize = value;
                if (this._bitmapData) {
                    this._bitmapData.context.lineWidth = this._brushSize;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawingBoard.prototype, "pairingDirection", {
            get: function () {
                return this._pairingDirection;
            },
            set: function (value) {
                this._pairingDirection = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawingBoard.prototype, "isOneWay", {
            /** 是否为单向配对 */
            get: function () {
                return this._pairingDirection === PairingDirection.ONE_WAY;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawingBoard.prototype, "isBothWay", {
            /** 是否为双向配对 */
            get: function () {
                return this._pairingDirection === PairingDirection.BOTH_WAY;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawingBoard.prototype, "lineType", {
            get: function () {
                return this._lineType;
            },
            set: function (value) {
                this._lineType = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawingBoard.prototype, "isStraightLine", {
            /** 是否为直线 */
            get: function () {
                return this._lineType === LineType.STRAIGHT_LINE;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawingBoard.prototype, "isPathLine", {
            /** 是否为轨迹线 */
            get: function () {
                return this._lineType === LineType.PATH_LINE;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DrawingBoard.prototype, "event", {
            get: function () {
                return this._event;
            },
            enumerable: false,
            configurable: true
        });
        DrawingBoard.prototype.createGui = function () {
            return {
                drawLineType: {
                    title: "画线方式",
                    component: "select",
                    field: {
                        options: [
                            {
                                value: DrawLineType.CONNECT_LINE,
                                label: "连线"
                            },
                            {
                                value: DrawLineType.FREE_LINE,
                                label: "自由画线"
                            }
                        ]
                    }
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
                pairingDirection: {
                    title: "配对方向",
                    component: "select",
                    field: {
                        options: [
                            {
                                value: PairingDirection.ONE_WAY,
                                label: "单向"
                            },
                            {
                                value: PairingDirection.BOTH_WAY,
                                label: "双向"
                            }
                        ]
                    }
                },
                lineType: {
                    title: "线条类型",
                    component: "select",
                    field: {
                        options: [
                            {
                                value: LineType.PATH_LINE,
                                label: "轨迹线"
                            },
                            {
                                value: LineType.STRAIGHT_LINE,
                                label: "直线"
                            }
                        ]
                    }
                }
            };
        };
        /** 试玩初始化的处理 */
        DrawingBoard.prototype.onInit = function () {
            // console.info("[info] DrawingBoard.onInit");
            this._bitmapData = game.make.bitmapData(this.gameObject.width, this.gameObject.height);
            this.gameObject["phaser"].loadTexture(this._bitmapData);
            this.initContext();
            this.game.input.onPointerDown.add(this.onPointerDown, this);
            this.gameObject.onRelayout.add(this.onRelayout, this);
            this.event.add(DrawingBoardEvent.DRAW_LINE, this.drawLine, this);
            this.event.add(DrawingBoardEvent.DRAW_LINE_BY_UUID, this.drawLineByUuid, this);
            this.event.add(DrawingBoardEvent.CLEAR, this.clear, this);
        };
        /**
         * 画一条线
         * @param param.from 画线起点
         * @param param.to 画线终点
         * @param param.strokeStyle 画笔样式
         * @param param.lineWidth 画笔粗细
         * @returns 当前画板位图数据
         */
        DrawingBoard.prototype.drawLine = function (param) {
            if (!this._bitmapData) {
                return;
            }
            if (param.strokeStyle) {
                this._bitmapData.context.strokeStyle = param.strokeStyle;
            }
            if (param.lineWidth != void 0) {
                this._bitmapData.context.lineWidth = param.lineWidth;
            }
            this._bitmapData.context.beginPath();
            this._bitmapData.context.moveTo(param.from.x, param.from.y);
            this._bitmapData.context.lineTo(param.to.x, param.to.y);
            this._bitmapData.context.stroke();
            this._bitmapData.dirty = true;
            this._bitmapData.context.closePath();
            this.saveImageData();
            return this._bitmapData;
        };
        /**
         * 通过节点 uuid 画一条线
         * @param data 线条数据
         * @returns  当前画板位图数据
         */
        DrawingBoard.prototype.drawLineByUuid = function (data) {
            data = this.checkLineDataStyle(data);
            return this.drawLine({
                from: this.getBitmapPointByUuid(data.fromUuid),
                to: this.getBitmapPointByUuid(data.toUuid),
                strokeStyle: data.strokeStyle,
                lineWidth: data.lineWidth
            });
        };
        /**
         * 通过节点 uuid 获取位图数据上的坐标
         * @param uuid 节点 uuid
         * @returns 位图数据上的坐标
         */
        DrawingBoard.prototype.getBitmapPointByUuid = function (uuid) {
            var node = this.game.nodePool.find(uuid);
            var p = new qc.Point(node.x, node.y);
            p.x += this.gameObject.width * this.gameObject.pivotX;
            p.y += this.gameObject.height * this.gameObject.pivotY;
            return p;
        };
        /**
         * 清除画板内容
         * @returns 当前画板位图数据
         */
        DrawingBoard.prototype.clear = function () {
            if (!this._bitmapData) {
                return;
            }
            return this._bitmapData.clear();
        };
        DrawingBoard.prototype.initContext = function () {
            this._bitmapData.context.lineCap = "round";
            this._bitmapData.context.lineJoin = "round";
            this._bitmapData.context.strokeStyle = this._brushColor.toString();
            this._bitmapData.context.lineWidth = this._brushSize;
        };
        DrawingBoard.prototype.saveImageData = function () {
            this._lastImageData = this._bitmapData.context.getImageData(0, 0, this.gameObject.width, this.gameObject.height);
        };
        DrawingBoard.prototype.equalId = function (id) {
            if (this._touchId == void 0) {
                this._touchId = id;
            }
            return this._touchId === id;
        };
        DrawingBoard.prototype.clearThisOnce = function () {
            if (!this._bitmapData) {
                return;
            }
            this._bitmapData.clear();
            if (this._lastImageData) {
                this._bitmapData.context.putImageData(this._lastImageData, 0, 0);
            }
        };
        /**
         * 检测当前世界坐标点是否碰撞到区域节点
         * @param globalPoint 检测世界坐标点
         * @returns 碰撞到区域节点
         */
        DrawingBoard.prototype.checkHitArea = function (globalPoint) {
            for (var i = 0; i < this.gameObject.children.length; i++) {
                var area = this.gameObject.getChildAt(i);
                if (area.rectContains(globalPoint)) {
                    return area;
                }
            }
        };
        /**
         * 检查线条数据样式
         * @param data 线条数据
         * @returns 线条数据
         */
        DrawingBoard.prototype.checkLineDataStyle = function (data) {
            if (!data.strokeStyle || data.lineWidth == void 0) {
                var fromNode = this.game.nodePool.find(data.fromUuid);
                var fromArea = fromNode.getScript(ps.StartStopArea);
                data.strokeStyle = data.strokeStyle || fromArea.brushColor.toString();
                data.lineWidth = data.lineWidth != void 0 ? data.lineWidth : fromArea.brushSize;
            }
            return data;
        };
        /**
         * 新增线条数据
         * @param data 线条数据
         * @param idRedraw 是否重绘画板
         * @returns 最新画线数据
         */
        DrawingBoard.prototype.addLineData = function (data, idRedraw) {
            data = this.checkLineDataStyle(data);
            if (this.hasLineData(data.fromUuid, data.toUuid)) {
                this.deleteLineData(data, false);
            }
            this._drawLineData.push(data);
            if (idRedraw) {
                this.clear();
                this.drawLineData();
            }
            return this._drawLineData;
        };
        /**
         * 获取线条数据
         * @param fromUuid 画线起点 uuid
         * @param toUuid 画线终点 uuid
         * @returns 返回线条数据
         */
        DrawingBoard.prototype.getLineData = function (fromUuid, toUuid) {
            return this._drawLineData.find(function (d) { return d.fromUuid === fromUuid && d.toUuid === toUuid; });
        };
        /**
         * 获取线条数据索引值
         * @param fromUuid 画线起点 uuid
         * @param toUuid 画线终点 uuid
         * @returns 返回线条数据索引值
         */
        DrawingBoard.prototype.getLineDataIndex = function (fromUuid, toUuid) {
            return this._drawLineData.findIndex(function (d) { return d.fromUuid === fromUuid && d.toUuid === toUuid; });
        };
        /**
         * 判断是否存在指定线条
         * @param fromUuid 画线起点 uuid
         * @param toUuid 画线终点 uuid
         * @returns 是否存在指定线条
         */
        DrawingBoard.prototype.hasLineData = function (fromUuid, toUuid) {
            return this.getLineData(fromUuid, toUuid) != void 0;
        };
        /**
         * 删除线条数据
         * @param data 线条数据
         * @param idRedraw 是否重绘画板
         * @returns 最新画线数据
         */
        DrawingBoard.prototype.deleteLineData = function (data, idRedraw) {
            var i = this.getLineDataIndex(data.fromUuid, data.toUuid);
            if (i >= 0) {
                this._drawLineData.splice(i, 1);
                if (idRedraw) {
                    this.clear();
                    this.drawLineData();
                }
            }
            return this._drawLineData;
        };
        /**
         * 改变线条数据
         * @param data 线条数据
         * @param idRedraw 是否重绘画板
         * @returns 最新画线数据
         */
        DrawingBoard.prototype.changeLineData = function (data, idRedraw) {
            var lineData = this.getLineData(data.fromUuid, data.toUuid);
            if (!lineData) {
                return this._drawLineData;
            }
            for (var key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    lineData[key] = data[key];
                }
            }
            if (idRedraw) {
                this.clear();
                this.drawLineData();
            }
            return this._drawLineData;
        };
        /** 绘制画线数据所有线条 */
        DrawingBoard.prototype.drawLineData = function () {
            var _this = this;
            if (!this._bitmapData) {
                return;
            }
            this._drawLineData.forEach(function (lineData) {
                _this.drawLineByUuid(lineData);
            });
            this.saveImageData();
        };
        /**
         * 鼠标按下，触摸开始事件
         * @param id {number} - 设备/触控 id
         * @param x {number} - 事件发生时的 x 轴坐标
         * @param y {number} - 事件发生时的 y 轴坐标
         */
        DrawingBoard.prototype.onPointerDown = function (id, x, y) {
            if (!this.gameObject.worldVisible) {
                return;
            }
            if (!this.equalId(id)) {
                return;
            }
            var globalPoint = new qc.Point(x, y);
            var p;
            if (this.isConnectLine) {
                var hitAreaNode = this._startAreaNode = this.checkHitArea(globalPoint);
                if (!hitAreaNode) {
                    return;
                }
                var hitArea = hitAreaNode.getScript(ps.StartStopArea);
                if (!hitArea.enableDraw) {
                    return;
                }
                this._event.dispatch(DrawingBoardEvent.DRAW_START, this._startAreaNode.uuid);
                main.gameEvent.dispatch(DrawingBoardEvent.DRAW_START, this._startAreaNode.uuid);
                this._bitmapData.context.strokeStyle = hitArea.brushColor.toString();
                this._bitmapData.context.lineWidth = hitArea.brushSize;
                this._bitmapData.context.beginPath();
                p = this.gameObject.toLocal(this.isStraightLine ? hitAreaNode.getWorldPosition() : globalPoint);
            }
            else {
                this._event.dispatch(DrawingBoardEvent.DRAW_START);
                main.gameEvent.dispatch(DrawingBoardEvent.DRAW_START);
                this._bitmapData.context.beginPath();
                p = this.gameObject.toLocal(globalPoint);
            }
            p.x += this.gameObject.width * this.gameObject.pivotX;
            p.y += this.gameObject.height * this.gameObject.pivotY;
            this._onDownPoint = p;
            this._bitmapData.context.moveTo(p.x, p.y);
            this.game.input.onPointerMove.add(this.onPointerMove, this);
            this.game.input.onPointerUp.addOnce(this.onPointerUp, this);
        };
        /**
         * 鼠标按下移动，触摸移动等事件
         * @param id {number} - 设备/触控 id
         * @param x {number} - 事件发生时的 x 轴坐标
         * @param y {number} - 事件发生时的 y 轴坐标
         */
        DrawingBoard.prototype.onPointerMove = function (id, x, y) {
            if (!this.equalId(id)) {
                return;
            }
            var p = this.gameObject.toLocal(new qc.Point(x, y));
            p.x += this.gameObject.width * this.gameObject.pivotX;
            p.y += this.gameObject.height * this.gameObject.pivotY;
            if (this.isConnectLine && this.isStraightLine) {
                this.clearThisOnce();
                this._bitmapData.context.beginPath();
                this._bitmapData.context.moveTo(this._onDownPoint.x, this._onDownPoint.y);
                this._bitmapData.context.lineTo(p.x, p.y);
            }
            else {
                this._bitmapData.context.lineTo(p.x, p.y);
            }
            this._bitmapData.context.stroke();
            this._bitmapData.dirty = true;
        };
        /**
         * 鼠标弹起，触摸结束等事件
         * @param id {number} - 设备/触控 id
         * @param x {number} - 事件发生时的 x 轴坐标
         * @param y {number} - 事件发生时的 y 轴坐标
         */
        DrawingBoard.prototype.onPointerUp = function (id, x, y) {
            if (!this.equalId(id)) {
                return;
            }
            var globalPoint = new qc.Point(x, y);
            if (this.isConnectLine) {
                var hitAreaNode = this.checkHitArea(globalPoint);
                var startArea = this._startAreaNode.getScript(ps.StartStopArea);
                if (!hitAreaNode || !startArea.isMatch(hitAreaNode)) {
                    this.clearThisOnce();
                    this._event.dispatch(DrawingBoardEvent.DRAW_END, this._startAreaNode.uuid);
                    main.gameEvent.dispatch(DrawingBoardEvent.DRAW_END, this._startAreaNode.uuid);
                }
                else {
                    if (this.isStraightLine) {
                        var lineData = {
                            fromUuid: this._startAreaNode.uuid,
                            toUuid: hitAreaNode.uuid,
                            strokeStyle: this._bitmapData.context.strokeStyle,
                            lineWidth: this._bitmapData.context.lineWidth
                        };
                        if (this.hasLineData(this._startAreaNode.uuid, hitAreaNode.uuid)) {
                            this._bitmapData.context.closePath();
                            this.addLineData(lineData, true);
                        }
                        else {
                            this.clearThisOnce();
                            this._bitmapData.context.beginPath();
                            this._bitmapData.context.moveTo(this._onDownPoint.x, this._onDownPoint.y);
                            var p = new qc.Point(hitAreaNode.x, hitAreaNode.y);
                            p.x += this.gameObject.width * this.gameObject.pivotX;
                            p.y += this.gameObject.height * this.gameObject.pivotY;
                            this._bitmapData.context.lineTo(p.x, p.y);
                            this._bitmapData.context.stroke();
                            this._bitmapData.dirty = true;
                            this.addLineData(lineData, false);
                            this._bitmapData.context.closePath();
                            this.saveImageData();
                        }
                    }
                    else {
                        this._bitmapData.context.closePath();
                        this.saveImageData();
                    }
                    if (startArea.disableDrawAgain) {
                        startArea.enableDraw = false;
                    }
                    if (this.isBothWay) {
                        var hitArea = hitAreaNode.getScript(ps.StartStopArea);
                        if (hitArea.disableDrawAgain) {
                            hitArea.enableDraw = false;
                        }
                    }
                    this._event.dispatch(DrawingBoardEvent.DRAW_END, this._startAreaNode.uuid, hitAreaNode.uuid);
                    main.gameEvent.dispatch(DrawingBoardEvent.DRAW_END, this._startAreaNode.uuid, hitAreaNode.uuid);
                }
            }
            else {
                this._bitmapData.context.closePath();
                this.saveImageData();
                this._event.dispatch(DrawingBoardEvent.DRAW_END);
                main.gameEvent.dispatch(DrawingBoardEvent.DRAW_END);
            }
            this.game.input.onPointerMove.remove(this.onPointerMove, this);
            this._startAreaNode = null;
        };
        DrawingBoard.prototype.onRelayout = function () {
            // console.log("onRelayout");
            this._bitmapData.resize(this.gameObject.width, this.gameObject.height);
            this.initContext();
            if (this._lastImageData) {
                var x = (this.gameObject.width - this._lastImageData.width) * this.gameObject.pivotX;
                var y = (this.gameObject.height - this._lastImageData.height) * this.gameObject.pivotY;
                this._bitmapData.context.putImageData(this._lastImageData, x, y);
            }
        };
        /** 当脚本被移除时，会自动调用 */
        DrawingBoard.prototype.onDestroy = function () {
            // console.info("[info] DrawingBoard.onDestroy");
            this.game.input.onPointerDown.remove(this.onPointerDown, this);
            this.game.input.onPointerMove.remove(this.onPointerMove, this);
            this.game.input.onPointerUp.remove(this.onPointerUp, this);
            this.gameObject.onRelayout.remove(this.onRelayout, this);
            this.event.remove(DrawingBoardEvent.DRAW_LINE, this.drawLine, this);
            this.event.remove(DrawingBoardEvent.DRAW_LINE_BY_UUID, this.drawLineByUuid, this);
            this.event.remove(DrawingBoardEvent.CLEAR, this.clear, this);
        };
        DrawingBoard.prototype.vpEraseLine = function (param) {
            var _this = this;
            var ped = this.gameObject.getScript('playsmart.editor.data');
            var data = JSON.parse(ped.$data.drawLineData);
            param.pair.forEach(function (item) {
                var pair = data.find(function (d) { return d.uuid === item; });
                var fromUuid = _this.gameObject.getChild(pair.startArea).uuid;
                pair.endArea.forEach(function (area) {
                    var areaNode = _this.gameObject.getChild(area);
                    var toUuid = areaNode.uuid;
                    _this.deleteLineData({ fromUuid: fromUuid, toUuid: toUuid }, true);
                    if (_this.isBothWay) {
                        _this.deleteLineData({ fromUuid: toUuid, toUuid: fromUuid }, true);
                    }
                });
            });
        };
        DrawingBoard.prototype.vpModifyLineStyle = function (param) {
            var _this = this;
            var ped = this.gameObject.getScript('playsmart.editor.data');
            var pairData = JSON.parse(ped.$data.drawLineData);
            param.area.forEach(function (areaName) {
                var node = _this.gameObject.getChild(areaName);
                var ssa = node.getScript(ps.StartStopArea);
                ssa.brushColor = param.lineColor;
                ssa.brushSize = param.lineStyle;
                pairData.forEach(function (pair) {
                    if (pair.startArea === areaName) {
                        var fromUuid_1 = node.uuid;
                        pair.endArea.forEach(function (endArea) {
                            var toUuid = _this.gameObject.getChild(endArea).uuid;
                            var lineData = {
                                fromUuid: fromUuid_1,
                                toUuid: toUuid,
                                strokeStyle: param.lineColor,
                                lineWidth: param.lineStyle,
                            };
                            _this.changeLineData(lineData, true);
                        });
                    }
                    if (pair.endArea.indexOf(areaName) > -1 && pair.startArea !== '' && _this.isBothWay) {
                        var toUuid = _this.gameObject.getChild(pair.startArea).uuid;
                        var lineData = {
                            fromUuid: node.uuid,
                            toUuid: toUuid,
                            strokeStyle: param.lineColor,
                            lineWidth: param.lineStyle,
                        };
                        _this.changeLineData(lineData, true);
                    }
                });
            });
        };
        return DrawingBoard;
    }(ps.Behaviour));
    ps.DrawingBoard = DrawingBoard;
    qc.registerBehaviour("ps.DrawingBoard", DrawingBoard);
    DrawingBoard["__menu"] = "玩法模板/画线玩法/画板（DrawingBoard）";
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
//# sourceMappingURL=DrawingBoard.js.map