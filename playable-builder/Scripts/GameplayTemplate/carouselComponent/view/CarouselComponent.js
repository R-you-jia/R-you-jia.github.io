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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var ps;
(function (ps) {
    /**轮播最外层节点控制脚本 */
    /**轮播风格预设类型 */
    var CarouselType;
    (function (CarouselType) {
        CarouselType[CarouselType["NormalCarousel"] = 0] = "NormalCarousel";
        CarouselType[CarouselType["PulseScaleCarousel"] = 1] = "PulseScaleCarousel";
        CarouselType[CarouselType["RollScaleCarousel"] = 2] = "RollScaleCarousel";
        CarouselType[CarouselType["OpacityCarousel"] = 3] = "OpacityCarousel";
        CarouselType[CarouselType["OpacitScaleyCarousel"] = 4] = "OpacitScaleyCarousel";
    })(CarouselType = ps.CarouselType || (ps.CarouselType = {}));
    var Direction;
    (function (Direction) {
        Direction[Direction["vertical"] = 0] = "vertical";
        Direction[Direction["horizontal"] = 1] = "horizontal";
    })(Direction = ps.Direction || (ps.Direction = {}));
    // 轮播响应事件
    ps.VpCarouselMethods = {
        vpCarouselComponentEnable: 'vpCarouselComponentEnable',
        vpCarouselEnable: 'vpCarouselEnable',
        vpCarouselPause: 'vpCarouselPause',
        vpCarouselRestart: 'vpCarouselRestart',
        vpCarouselDeleteResource: 'vpCarouselDeleteResource',
        vpCarouselSetStayTime: 'vpCarouselSetStayTime',
    };
    /**
     * 轮播事件名称
     */
    var CarouselEventName;
    (function (CarouselEventName) {
        /** 切换完成 */
        CarouselEventName["switchDone"] = "switchDone";
    })(CarouselEventName = ps.CarouselEventName || (ps.CarouselEventName = {}));
    var CarouselComponent = /** @class */ (function (_super) {
        __extends(CarouselComponent, _super);
        function CarouselComponent(gameObject) {
            var _a, _b;
            var _this = _super.call(this, gameObject) || this;
            _this._event = new ps.EventDispatcher();
            /** 序列化 */
            _this.playMode = []; //字符串数组['auto'， 'manual']，取值范围auto，manual 自动 手动
            _this.triggerManual = []; //字符串数组['click'，'drag']，取值范围click（点击），drag（拖动）。 手动操作类型
            _this.playStyle = 0; //轮播预设类型
            _this.stayTime = 0; //自动轮播间隔
            _this.enableScaleMask = false; //是否开启遮罩
            _this.displayNum = 0; //坑位数量,正奇数
            _this.animationDuration = 0; //动画播放时长
            _this.enableComponent = true; //组件是否开启
            _this.direction = ""; //排列方式   horizontal （水平） vertical (垂直) 默认值horizontal
            _this.carouselGroups = {}; //轮播组列表，类型为CarouselGroup
            _this.carouselGroupsDatas = []; //每个轮播组的数据
            _this.itemNodes = [];
            _this.prevNodes = [];
            _this.nextNodes = [];
            _this.piteSite = [];
            _this.carouselOpacity = { max: 1, min: 1 }; // { Max: number, Min: number } = { Max: 1, Min: 0.8 }轮播透明度设置
            _this.carouselScale = { max: 1, min: 1 }; // { Max: number, Min: number } = { Max: 1, Min: 1 }轮播缩放设置
            _this.sliderGroups = []; //轮播组节点列表
            _this.carouselGroupAniData = [];
            _this.isHaveTestData = false;
            _this.serializableFields = {
                isHaveTestData: qc.Serializer.BOOLEAN,
                playMode: qc.Serializer.STRINGS,
                triggerManual: qc.Serializer.STRINGS,
                playStyle: qc.Serializer.NUMBER,
                stayTime: qc.Serializer.NUMBER,
                enableScaleMask: qc.Serializer.BOOLEAN,
                displayNum: qc.Serializer.NUMBER,
                direction: qc.Serializer.STRING,
                animationDuration: qc.Serializer.NUMBER,
                enableComponent: qc.Serializer.BOOLEAN,
                itemNodes: qc.Serializer.NODES,
                prevNodes: qc.Serializer.NODES,
                nextNodes: qc.Serializer.NODES,
                piteSite: qc.Serializer.NODES,
                carouselGroups: qc.Serializer.MAPPING,
                carouselOpacity: qc.Serializer.MAPPING,
                carouselScale: qc.Serializer.MAPPING
            };
            _this.vpActionConfig = (_a = {},
                _a[ps.VpCarouselMethods.vpCarouselComponentEnable] = {
                    type: "object",
                    properties: {
                        isEnable: {
                            title: '启用/禁用',
                        },
                    },
                    initData: {
                        isEnable: true,
                    },
                    initFunc: function (target, param) {
                    },
                },
                _a[ps.VpCarouselMethods.vpCarouselEnable] = {
                    type: "object",
                    properties: {
                        carouselId: {
                            title: '轮播组',
                        },
                        isEnable: {
                            title: '启用/禁用',
                        },
                    },
                    initData: {
                        carouselId: null,
                        isEnable: true,
                    },
                    initFunc: function (target, param) {
                        var options = _this.getGroupOptions();
                        param.properties.carouselId.field.options = options;
                    },
                },
                _a[ps.VpCarouselMethods.vpCarouselPause] = {
                    type: "object",
                    properties: {
                        carouselId: {
                            title: '响应对象',
                        },
                        isPause: {
                            title: '暂停/播放',
                        },
                    },
                    initData: {
                        carouselId: null,
                        isPause: true,
                    },
                    initFunc: function (target, param) {
                        var options = _this.getGroupOptions();
                        param.properties.carouselId.field.options = options;
                    },
                },
                _a[ps.VpCarouselMethods.vpCarouselRestart] = {
                    type: "object",
                    properties: {
                        carouselId: {
                            title: '响应对象',
                        },
                    },
                    initData: {
                        carouselId: null,
                    },
                    initFunc: function (target, param) {
                        var options = _this.getGroupOptions();
                        param.properties.carouselId.field.options = options;
                    },
                },
                _a[ps.VpCarouselMethods.vpCarouselDeleteResource] = {
                    type: "object",
                    properties: {
                        resourceIds: {
                            title: '删除资源'
                        }
                    },
                    initData: {
                        resourceIds: null
                    },
                    initFunc: function (target, param) {
                        var options = _this.getResourceGroupOptions();
                        param.properties.resourceIds.field.options = options;
                    },
                },
                _a[ps.VpCarouselMethods.vpCarouselSetStayTime] = {
                    type: "object",
                    properties: {
                        stayTime: {
                            title: '停留时间'
                        }
                    },
                    initData: {
                        stayTime: 3
                    },
                    initFunc: function (target, param) {
                    },
                },
                _a);
            _this.vpAction = (_b = {},
                _b[ps.VpCarouselMethods.vpCarouselComponentEnable] = {
                    label: '启用/禁用轮播组件',
                    method: ps.VpCarouselMethods.vpCarouselComponentEnable,
                    category: '轮播组件',
                    target: false,
                    paramLabel: 'none',
                },
                _b[ps.VpCarouselMethods.vpCarouselEnable] = {
                    label: '启动/禁用轮播组',
                    method: ps.VpCarouselMethods.vpCarouselEnable,
                    category: '轮播组件',
                    target: false,
                    paramLabel: ['carouselId'],
                    paramParseFunc: function (paramInstance) {
                        var uuid = paramInstance.carouselId;
                        return _this.getNodeName(uuid);
                    }
                },
                _b[ps.VpCarouselMethods.vpCarouselPause] = {
                    label: '暂停/继续轮播',
                    method: ps.VpCarouselMethods.vpCarouselPause,
                    category: '轮播组件',
                    target: false,
                    paramLabel: ['carouselId'],
                    paramParseFunc: function (paramInstance) {
                        var uuid = paramInstance.carouselId;
                        return _this.getNodeName(uuid);
                    }
                },
                _b[ps.VpCarouselMethods.vpCarouselRestart] = {
                    label: '重新轮播',
                    method: ps.VpCarouselMethods.vpCarouselRestart,
                    category: '轮播组件',
                    target: false,
                    paramLabel: ['carouselId'],
                    paramParseFunc: function (paramInstance) {
                        var uuid = paramInstance.carouselId;
                        return _this.getNodeName(uuid);
                    }
                },
                _b[ps.VpCarouselMethods.vpCarouselDeleteResource] = {
                    label: '删除轮播资源',
                    method: ps.VpCarouselMethods.vpCarouselDeleteResource,
                    category: '轮播组件',
                    target: false,
                    paramLabel: ['resourceIds'],
                    paramParseFunc: function (paramInstance) {
                        var uuid = paramInstance.resourceIds;
                        return _this.getNodeName(uuid);
                    }
                },
                _b[ps.VpCarouselMethods.vpCarouselSetStayTime] = {
                    label: '设置轮播间隔',
                    method: ps.VpCarouselMethods.vpCarouselSetStayTime,
                    category: '轮播组件',
                    target: false,
                    paramLabel: ['stayTime'],
                    paramParseFunc: function (paramInstance) {
                        return "".concat(paramInstance.stayTime, "s");
                    }
                },
                _b);
            /**返回全部轮播组的展示位信息 */
            _this.carouselGroupBehList = []; //所有轮播组脚本列表
            return _this;
        }
        Object.defineProperty(CarouselComponent.prototype, "event", {
            get: function () {
                return this._event;
            },
            enumerable: false,
            configurable: true
        });
        CarouselComponent.prototype.getGroupOptions = function () {
            var options = [];
            this.carouselGroupsDatas.forEach(function (group) {
                var groupNode = qc_game.nodePool.find(group.carouselId);
                options.push({
                    label: groupNode.name,
                    value: groupNode.uuid
                });
            });
            return options;
        };
        CarouselComponent.prototype.getNodeName = function (uuid) {
            var node = qc_game.nodePool.find(uuid);
            if (node) {
                return node.name;
            }
            return '';
        };
        CarouselComponent.prototype.getResourceGroupOptions = function () {
            var options = [];
            this.carouselGroupsDatas.forEach(function (group) {
                var groupNode = qc_game.nodePool.find(group.carouselId);
                var items = [];
                if (group.items.length) {
                    var groupTemp_1 = {
                        label: groupNode.name,
                        options: []
                    };
                    group.items.forEach(function (resourceUuid) {
                        var node = qc_game.nodePool.find(resourceUuid);
                        groupTemp_1.options.push({
                            label: node.name,
                            value: node.uniqueName
                        });
                    });
                    options.push(groupTemp_1);
                }
            });
            return options;
        };
        // 启用/禁用轮播组件
        CarouselComponent.prototype.vpCarouselComponentEnable = function (param) {
            this.carouselComponentEnable(param.isEnable);
        };
        // 启用/禁用轮播组
        CarouselComponent.prototype.vpCarouselEnable = function (param) {
            this.carouselEnable(param.carouselId, param.isEnable);
        };
        // 暂停/播放轮播组
        CarouselComponent.prototype.vpCarouselPause = function (param) {
            this.carouselIsPause(param.carouselId, param.isPause);
        };
        // 重新轮播
        CarouselComponent.prototype.vpCarouselRestart = function (param) {
            this.carouselRestart(param.carouselId);
        };
        // 删除轮播资源
        CarouselComponent.prototype.vpCarouselDeleteResource = function (param) {
            var _this = this;
            this.carouselGroupsDatas.forEach(function (group) {
                if (group.items.indexOf(param.resourceIds) > -1) {
                    // 删除轮播组对应资源
                    _this.carouselDeleteResource(group.carouselId, param.resourceIds);
                }
            });
        };
        // 设置停留时间
        CarouselComponent.prototype.vpCarouselSetStayTime = function (param) {
            this.carouselSetStayTime(param.stayTime);
        };
        /** 试玩初始化的处理 */
        CarouselComponent.prototype.onInit = function () {
            //测试数据
            if (this.isHaveTestData && !qici.config.editor) {
                this.carouselGroups = [
                    {
                        carouselId: "轮播组一",
                        items: this.getArrNodeUuid(this.itemNodes[0]),
                        prev: this.prevNodes[0]["uuid"],
                        next: this.nextNodes[0]["uuid"],
                        piteSite: this.piteSite[0]["uuid"],
                        displaySpace: 200,
                        displayWidth: 150,
                        displayHeight: 250,
                        enable: true
                    },
                    {
                        carouselId: "轮播组二",
                        items: this.getArrNodeUuid(this.itemNodes[1]),
                        prev: this.prevNodes[1]["uuid"],
                        next: this.nextNodes[1]["uuid"],
                        piteSite: this.piteSite[1]["uuid"],
                        displaySpace: 200,
                        displayWidth: 150,
                        displayHeight: 250,
                        enable: true
                    }
                ];
                this.carouselOpacity = { min: 0.7, max: 1 };
                this.carouselScale = { min: 0.7, max: 1 };
            }
            this.carouselGroupsDatas = Object.values(this.carouselGroups);
            var generalCarouselUiBeh = this.gameObject.getScript("ps.GeneralCarouselUi");
            if (generalCarouselUiBeh) {
                generalCarouselUiBeh.destroy();
            }
            this.gameObject.addScript("ps.GeneralCarouselUi");
            //轮播风格动画参数
            this.carouselGroupAniData = [this.carouselOpacity, this.carouselScale];
        };
        //测试函数
        CarouselComponent.prototype.getArrNodeUuid = function (items) {
            var e_1, _a;
            var arr = [];
            try {
                for (var _b = __values(items.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    var uuid = item["uuid"];
                    arr.push(uuid);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return arr;
        };
        CarouselComponent.prototype.onResize = function () {
            this.vpInitCarousel();
        };
        CarouselComponent.prototype.onStart = function () {
            var isEditor = false;
            this.createCarouselGroup(isEditor);
        };
        /**获得轮播组数据 */
        CarouselComponent.prototype.getCarouselGroupData = function () {
            var direction;
            switch (this.direction) {
                case "horizontal": //（水平）
                    direction = Direction.horizontal;
                    break;
                case "vertical": //(垂直)
                    direction = Direction.vertical;
                    break;
                default:
                    break;
            }
            var carouselGroupSetData = {
                playMode: this.playMode,
                triggerManual: this.triggerManual,
                playStyle: this.playStyle,
                stayTime: this.stayTime,
                displayNum: this.displayNum,
                direction: direction,
                animationDuration: this.animationDuration,
                enableComponent: this.enableComponent,
            };
            return carouselGroupSetData;
        };
        /**
         * 初始化所有的轮播组
         * @param isEditor 是否在编辑器环境下
         */
        CarouselComponent.prototype.createCarouselGroup = function (isEditor) {
            this.sliderGroups = this.gameObject.children;
            this.setMask();
            var carouselGroupSetData = this.getCarouselGroupData();
            this.carouselGroupBehList = [];
            for (var i = 0; i < this.sliderGroups.length; i++) {
                var carouselGroup = this.sliderGroups[i];
                var carouselGroupBeh = void 0;
                if (carouselGroup.getScript("ps.CarouselGroupControl")) {
                    carouselGroupBeh = carouselGroup.getScript("ps.CarouselGroupControl");
                    var piteSiteAllBox = qc_game.nodePool.find(this.carouselGroupsDatas[i].piteSite);
                    piteSiteAllBox.removeChildren();
                }
                else {
                    carouselGroupBeh = carouselGroup.addScript("ps.CarouselGroupControl");
                }
                carouselGroupBeh.createCarouselPitSite(isEditor, this.carouselGroupsDatas[i], carouselGroupSetData, this.carouselGroupAniData);
                this.carouselGroupBehList.push(carouselGroupBeh);
            }
            this.carouselComponentEnable(this.enableComponent);
            if (this.enableComponent) {
                for (var i = 0; i < this.carouselGroupBehList.length; i++) {
                    var CarouselGroupControlBeh = this.carouselGroupBehList[i];
                    CarouselGroupControlBeh.isEnableCarouselComponent(CarouselGroupControlBeh.enableGroup);
                }
            }
        };
        /**
         * 重新轮播单个轮播组
         */
        CarouselComponent.prototype.resetOneCarouselGroup = function (carouselGroup, id) {
            this.sliderGroups = this.gameObject.children;
            this.setMask();
            var carouselGroupSetData = this.getCarouselGroupData();
            var carouselGroupBeh = carouselGroup;
            var piteSiteAllBox = carouselGroupBeh.piteSiteAllBox;
            for (var i = 0; i < carouselGroupBeh.pitSiteLlist.length; i++) {
                var pitSite = carouselGroupBeh.pitSiteLlist[i];
                piteSiteAllBox.removeChild(pitSite.gameObject);
            }
            var isResetOneCarousel = true;
            carouselGroupBeh.createCarouselPitSite(false, this.carouselGroupsDatas[id], carouselGroupSetData, this.carouselGroupAniData, isResetOneCarousel);
        };
        /**设置遮罩 */
        CarouselComponent.prototype.setMask = function () {
            if (this.enableScaleMask) {
                this.gameObject.addScript("qc.NodeMask");
            }
            else {
                var nodeMaskBeh = this.gameObject.getScript("qc.NodeMask");
                if (nodeMaskBeh) {
                    nodeMaskBeh.destroy();
                }
            }
        };
        CarouselComponent.prototype.getAllCarouselGroupDisplayImg = function (currentCarouselId) {
            var carouselGroupDataArr = [];
            for (var i = 0; i < this.carouselGroupBehList.length; i++) {
                var CarouselGroupControlBeh = this.carouselGroupBehList[i];
                carouselGroupDataArr.push(__assign(__assign({}, CarouselGroupControlBeh.carouselGroupShowData), { current: currentCarouselId === CarouselGroupControlBeh.carouselGroupShowData.carouselId }));
            }
            main.gameEvent.dispatch(CarouselEventName.switchDone, carouselGroupDataArr, this.gameObject["uuid"]);
        };
        ///////////////////刷新重置静态坑位展示///////////////////
        /**
         * 组件初始化、在修改坑位数量或在制作过程删除资源等等时
         */
        CarouselComponent.prototype.vpInitCarousel = function () {
            var isEditor = true;
            this.onInit();
            this.createCarouselGroup(isEditor);
        };
        //////////////////轮播组件//////////////////////////////
        /**
         * 轮播组件
         * 启用/禁用轮播组件 控制所有的轮播组
         */
        CarouselComponent.prototype.carouselComponentEnable = function (enable) {
            for (var i = 0; i < this.carouselGroupBehList.length; i++) {
                var CarouselGroupControlBeh = this.carouselGroupBehList[i];
                CarouselGroupControlBeh.isEnableCarouselComponent(enable);
            }
        };
        /**
         * 轮播组件 修改所有的轮播组轮播间隔
         * @param stayTime 轮播间隔
         */
        CarouselComponent.prototype.carouselSetStayTime = function (stayTime) {
            for (var i = 0; i < this.carouselGroupBehList.length; i++) {
                var CarouselGroupControlBeh = this.carouselGroupBehList[i];
                CarouselGroupControlBeh.changeSetStayTime(stayTime);
            }
        };
        ////////////////////轮播组////////////////////////////
        /**轮播组
         * 启用/禁用轮播组件 控制单个的轮播组
         * @param carouselId
         */
        CarouselComponent.prototype.carouselEnable = function (carouselId, enable) {
            if (!this.enableComponent)
                return;
            for (var i = 0; i < this.carouselGroupBehList.length; i++) {
                var CarouselGroupControlBeh = this.carouselGroupBehList[i];
                var _carouselId = CarouselGroupControlBeh.carouselId;
                if (_carouselId == carouselId) {
                    CarouselGroupControlBeh.isEnableCarouselComponent(enable);
                }
            }
        };
        /**
         * 暂停或继续单个轮播组
         * @param carouselId
         */
        CarouselComponent.prototype.carouselIsPause = function (carouselId, isPause) {
            for (var i = 0; i < this.carouselGroupBehList.length; i++) {
                var CarouselGroupControlBeh = this.carouselGroupBehList[i];
                var _carouselId = CarouselGroupControlBeh.carouselId;
                if (_carouselId == carouselId) {
                    if (isPause) {
                        CarouselGroupControlBeh.isPauseCarousel = true;
                        CarouselGroupControlBeh.pauseAutoPlayerCarousel();
                    }
                    else {
                        CarouselGroupControlBeh.isPauseCarousel = false;
                        CarouselGroupControlBeh.startAutoPlayerCarousel();
                    }
                }
            }
        };
        /**
         * 继续单个轮播组
         * @param carouselId
         */
        CarouselComponent.prototype.carouselContinue = function (carouselId) {
            for (var i = 0; i < this.carouselGroupBehList.length; i++) {
                var CarouselGroupControlBeh = this.carouselGroupBehList[i];
                var _carouselId = CarouselGroupControlBeh.carouselId;
                if (_carouselId == carouselId) {
                    CarouselGroupControlBeh.isPauseCarousel = false;
                    CarouselGroupControlBeh.startAutoPlayerCarousel();
                }
            }
        };
        /**
         * 重新轮播单个轮播组
         * @param carouselId
         */
        CarouselComponent.prototype.carouselRestart = function (carouselId) {
            for (var i = 0; i < this.carouselGroupBehList.length; i++) {
                var carouselGroupControlBeh = this.carouselGroupBehList[i];
                var _carouselId = carouselGroupControlBeh.carouselId;
                if (_carouselId == carouselId) {
                    this.resetOneCarouselGroup(carouselGroupControlBeh, i);
                    if (carouselGroupControlBeh.isCanAutoCarousel) {
                        carouselGroupControlBeh.isPauseCarousel = false;
                        carouselGroupControlBeh.pauseAutoPlayerCarousel();
                        carouselGroupControlBeh.startAutoPlayerCarousel();
                    }
                }
            }
        };
        /**
         * 删除单个轮播组资源（运行时）
         * @param carouselId 轮播组id
         * @param imgUniqueName 删除资源
         */
        CarouselComponent.prototype.carouselDeleteResource = function (carouselId, imgUniqueName) {
            for (var i = 0; i < this.carouselGroupBehList.length; i++) {
                var CarouselGroupControlBeh = this.carouselGroupBehList[i];
                var _carouselId = CarouselGroupControlBeh.carouselId;
                if (_carouselId == carouselId) {
                    for (var i_1 = 0; i_1 < CarouselGroupControlBeh.pitSiteLlist.length; i_1++) {
                        var carouselPitSiteBeh = CarouselGroupControlBeh.pitSiteLlist[i_1];
                        var imgPitsite = carouselPitSiteBeh.gameObject.children[0]; //坑位上的资源
                        if (imgUniqueName == imgPitsite.uniqueName) {
                            if (imgPitsite.interactive) {
                                CarouselGroupControlBeh.deleteCarouselImg(imgPitsite, carouselPitSiteBeh.carouselPitSiteId);
                            }
                        }
                    }
                }
            }
        };
        return CarouselComponent;
    }(ps.Behaviour));
    ps.CarouselComponent = CarouselComponent;
    qc.registerBehaviour("ps.CarouselComponent", CarouselComponent);
    CarouselComponent["__menu"] = "玩法模板/轮播组件/CarouselComponent";
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
//# sourceMappingURL=CarouselComponent.js.map