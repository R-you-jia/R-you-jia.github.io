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
     * @author jiong
     * @date 2024/03/06 10:42:05
     */
    ps.EraseComponentTestSwitch = false;
    /**
     * 笔触类型
     */
    var EraseBrushType;
    (function (EraseBrushType) {
        /** 圆形 */
        EraseBrushType[EraseBrushType["CIRCLE"] = 1] = "CIRCLE";
        /** 矩形 */
        EraseBrushType[EraseBrushType["RECTANGLE"] = 2] = "RECTANGLE";
        /** 自定义图片 */
        EraseBrushType[EraseBrushType["CUSTOM_IMAGES"] = 3] = "CUSTOM_IMAGES";
    })(EraseBrushType = ps.EraseBrushType || (ps.EraseBrushType = {}));
    /**
     * 笔触类型对应的节点命名
     */
    var EraseBrushTypeName;
    (function (EraseBrushTypeName) {
        /** 圆形节点命名 */
        EraseBrushTypeName["CIRCLE"] = "round";
        /** 矩形节点命名 */
        EraseBrushTypeName["RECTANGLE"] = "rect";
        /** 自定义图片节点命名 */
        EraseBrushTypeName["CUSTOM_IMAGES"] = "pic";
    })(EraseBrushTypeName = ps.EraseBrushTypeName || (ps.EraseBrushTypeName = {}));
    /**
     * 擦除图层类型
     */
    var EraseLayerType;
    (function (EraseLayerType) {
        /** 蒙层 */
        EraseLayerType[EraseLayerType["MONGOLIAN_LAYER"] = 0] = "MONGOLIAN_LAYER";
        /** 自定义图层 */
        EraseLayerType[EraseLayerType["CUSTOM_LAYER"] = 1] = "CUSTOM_LAYER";
        /** 自定义判断区域 */
        EraseLayerType[EraseLayerType["CUSTOM_JUDGMENT_AREA"] = 2] = "CUSTOM_JUDGMENT_AREA";
        /** 底层 */
        EraseLayerType[EraseLayerType["BOTTOM_LAYER"] = 3] = "BOTTOM_LAYER";
        /** 整合自定义判定区域 */
        EraseLayerType[EraseLayerType["INTEGRATE_CUSTOM_JUDGMENT_AREAS"] = 10] = "INTEGRATE_CUSTOM_JUDGMENT_AREAS";
    })(EraseLayerType = ps.EraseLayerType || (ps.EraseLayerType = {}));
    /**
     * 判定时机类型
     */
    var UpdateBMDType;
    (function (UpdateBMDType) {
        /** 抬手判定 */
        UpdateBMDType[UpdateBMDType["RAISE_HAND_JUDGMENT"] = 1] = "RAISE_HAND_JUDGMENT";
        /** 实时判断 */
        UpdateBMDType[UpdateBMDType["REAL_TIME_JUDGMENT"] = 2] = "REAL_TIME_JUDGMENT";
    })(UpdateBMDType = ps.UpdateBMDType || (ps.UpdateBMDType = {}));
    /**
     * 擦除事件名称
     */
    var EraseEventName;
    (function (EraseEventName) {
        /** 开始擦除 */
        EraseEventName["eraseStart"] = "eraseStart";
        /** 抬手 */
        EraseEventName["eraseUp"] = "eraseUp";
        /** 到达某一阶段 */
        EraseEventName["eraseReachStep"] = "eraseReachStep";
        /** 未到达某一阶段 */
        EraseEventName["eraseUnReachStep"] = "eraseUnReachStep";
        /* 检测是否可见 */
        EraseEventName["worldVisibleChanged"] = "worldVisibleChanged";
    })(EraseEventName = ps.EraseEventName || (ps.EraseEventName = {}));
    var EraseComponent = /** @class */ (function (_super) {
        __extends(EraseComponent, _super);
        function EraseComponent(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this._event = new ps.EventDispatcher();
            _this._isDown = false;
            /** 允许擦除 */
            _this._isEnable = true;
            // 自定义图层
            _this.customLayerGroup = [];
            // private brushPivot: qc.Point = new qc.Point(0.5, 0.5);
            // 判定时机
            _this.triggerWhen = UpdateBMDType.RAISE_HAND_JUDGMENT;
            // 选中的笔触样式
            _this.brushSelected = EraseBrushType.CIRCLE;
            // 自定义判定事件
            _this.customEvents = {};
            // 自定义判定事件
            _this.customEventArr = [];
            _this.customJudgmentIntegrationAreaArr = [];
            _this.mlEliArr = [];
            _this.updateBMDRefrshTime = 0;
            _this.updateBMDRefrshInterval = 100;
            /* 是否画到可擦除图层 */
            _this.isDrawCross = false;
            _this.vpActionConfig = {
                vpEnableEraseComponent: {
                    type: "object",
                    properties: {
                        isEnable: {
                            title: '启用/禁用',
                        },
                    },
                    initData: {
                        isEnable: true,
                    },
                    initFunc: function () { },
                },
                vpEraseTrace: {
                    type: "object",
                    properties: {},
                    initData: {},
                    initFunc: function () { },
                },
                vpShowGroup: {
                    type: "object",
                    properties: {
                        actionGroup: {
                            title: '响应对象',
                            component: "select",
                            field: {
                                options: []
                            }
                        },
                        isShow: {
                            title: '显示/隐藏',
                        },
                    },
                    initData: {
                        actionGroup: null,
                        isShow: true,
                    },
                    initFunc: function (target, param) {
                        var options = _this.getLayerGroupOptions();
                        param.properties.actionGroup.field.options = options;
                    },
                },
                vpEnableEraseableGroup: {
                    type: "object",
                    properties: {
                        actionGroup: {
                            title: '响应对象',
                            component: "select",
                            field: {
                                options: []
                            }
                        },
                        isEnable: {
                            title: '启用/禁用',
                        },
                    },
                    initData: {
                        actionGroup: null,
                        isEnable: true,
                    },
                    initFunc: function (target, param) {
                        var options = [];
                        var canEraseGroup = _this.customLayerGroup.filter(function (child) {
                            var eg = child.getScript(ps.EraseGroup);
                            return eg.canErase;
                        });
                        var eg = _this.maskImages.getScript(ps.EraseGroup);
                        if (eg.canErase) {
                            canEraseGroup.unshift(_this.maskImages);
                        }
                        canEraseGroup.forEach(function (group) {
                            options.push({
                                label: group.name,
                                value: group.uuid
                            });
                        });
                        param.properties.actionGroup.field.options = options;
                    },
                },
                vpPlayAllMovieClipForGroup: {
                    type: "object",
                    properties: {
                        actionGroup: {
                            title: '响应对象',
                            component: "select",
                            field: {
                                options: []
                            }
                        },
                    },
                    initData: {
                        actionGroup: null,
                    },
                    initFunc: function (target, param) {
                        var options = _this.getLayerGroupOptions();
                        param.properties.actionGroup.field.options = options;
                    },
                },
                vpPauseAllMovieClipForGroup: {
                    type: "object",
                    properties: {
                        actionGroup: {
                            title: '响应对象',
                            component: "select",
                            field: {
                                options: []
                            }
                        },
                    },
                    initData: {
                        actionGroup: null,
                    },
                    initFunc: function (target, param) {
                        var options = _this.getLayerGroupOptions();
                        param.properties.actionGroup.field.options = options;
                    },
                },
                vpPlayTweenForGroup: {
                    type: "object",
                    properties: {
                        actionGroup: {
                            title: '响应对象',
                            component: "select",
                            field: {
                                options: []
                            }
                        },
                        vpTweenUuid: {
                            title: '选择动画',
                            component: "select",
                            field: {
                                options: []
                            }
                        }
                    },
                    initData: {
                        actionGroup: null,
                        vpTweenUuid: null
                    },
                    initFunc: function (target, param) {
                        var options = _this.getLayerGroupOptions();
                        param.properties.actionGroup.field.options = options;
                    },
                },
                vpPauseTweenForGroup: {
                    type: "object",
                    properties: {
                        actionGroup: {
                            title: '响应对象',
                            component: "select",
                            field: {
                                options: []
                            }
                        },
                        vpTweenUuid: {
                            title: '选择动画',
                            component: "select",
                            field: {
                                options: []
                            }
                        }
                    },
                    initData: {
                        actionGroup: null,
                        vpTweenUuid: null
                    },
                    initFunc: function (target, param) {
                        var options = _this.getLayerGroupOptions();
                        param.properties.actionGroup.field.options = options;
                    },
                },
                vpPlayTweenGoOnForGroup: {
                    type: "object",
                    properties: {
                        actionGroup: {
                            title: '响应对象',
                            component: "select",
                            field: {
                                options: []
                            }
                        },
                        vpTweenUuid: {
                            title: '选择动画',
                            component: "select",
                            field: {
                                options: []
                            }
                        }
                    },
                    initData: {
                        actionGroup: null,
                        vpTweenUuid: null
                    },
                    initFunc: function (target, param) {
                        var options = _this.getLayerGroupOptions();
                        param.properties.actionGroup.field.options = options;
                    },
                },
                vpPlayAllTweenForGroup: {
                    type: "object",
                    properties: {
                        actionGroup: {
                            title: '响应对象',
                            component: "select",
                            field: {
                                options: []
                            }
                        },
                    },
                    initData: {
                        actionGroup: null,
                    },
                    initFunc: function (target, param) {
                        var options = _this.getLayerGroupOptions();
                        param.properties.actionGroup.field.options = options;
                    },
                },
                vpPauseAllTweenForGroup: {
                    type: "object",
                    properties: {
                        actionGroup: {
                            title: '响应对象',
                            component: "select",
                            field: {
                                options: []
                            }
                        },
                    },
                    initData: {
                        actionGroup: null,
                    },
                    initFunc: function (target, param) {
                        var options = _this.getLayerGroupOptions();
                        param.properties.actionGroup.field.options = options;
                    },
                },
                vpPlayAllTweenGoOnForGroup: {
                    type: "object",
                    properties: {
                        actionGroup: {
                            title: '响应对象',
                            component: "select",
                            field: {
                                options: []
                            }
                        },
                    },
                    initData: {
                        actionGroup: null,
                    },
                    initFunc: function (target, param) {
                        var options = _this.getLayerGroupOptions();
                        param.properties.actionGroup.field.options = options;
                    },
                },
                vpReplaceHandImage: {
                    type: "object",
                    properties: {
                        handImage: {
                            title: '跟手图片',
                        },
                    },
                    initData: {
                        handImage: null,
                    },
                    initFunc: function (target, param) {
                    },
                },
            };
            _this.vpAction = {
                vpEnableEraseComponent: {
                    label: '启用/禁用擦除组件',
                    method: 'vpEnableEraseComponent',
                    category: '擦除组件',
                    target: false,
                    paramLabel: 'none',
                },
                vpEraseTrace: {
                    label: '清除擦除痕迹',
                    method: 'vpEraseTrace',
                    category: '擦除组件',
                    target: false,
                    paramLabel: 'none',
                },
                vpShowGroup: {
                    label: '显示/隐藏分组',
                    method: 'vpShowGroup',
                    category: '擦除组件',
                    target: false,
                    paramLabel: ['actionGroup'],
                    paramParseFunc: function (paramInstance) {
                        var uuid = paramInstance.actionGroup;
                        return _this.getNodeName(uuid);
                    }
                },
                vpEnableEraseableGroup: {
                    label: '启用/禁用可被擦除分组',
                    method: 'vpEnableEraseableGroup',
                    category: '擦除组件',
                    target: false,
                    paramLabel: ['actionGroup'],
                    paramParseFunc: function (paramInstance) {
                        var uuid = paramInstance.actionGroup;
                        return _this.getNodeName(uuid);
                    }
                },
                vpPlayAllMovieClipForGroup: {
                    label: '显示并播放分组的全部序列帧',
                    method: 'vpPlayAllMovieClipForGroup',
                    category: '擦除组件',
                    target: false,
                    paramLabel: ['actionGroup'],
                    paramParseFunc: function (paramInstance) {
                        var uuid = paramInstance.actionGroup;
                        return _this.getNodeName(uuid);
                    }
                },
                vpPauseAllMovieClipForGroup: {
                    label: '暂停播放分组的全部序列帧',
                    method: 'vpPauseAllMovieClipForGroup',
                    category: '擦除组件',
                    target: false,
                    paramLabel: ['actionGroup'],
                    paramParseFunc: function (paramInstance) {
                        var uuid = paramInstance.actionGroup;
                        return _this.getNodeName(uuid);
                    }
                },
                vpPlayTweenForGroup: {
                    label: '播放分组的单个动画',
                    method: 'vpPlayTweenForGroup',
                    category: '擦除组件',
                    target: false,
                    paramLabel: ['actionGroup', 'vpTweenUuid'],
                    paramParseFunc: function (paramInstance, actionI18nConfig, sceneNode, lang) {
                        return _this.getTweenParam(paramInstance, lang);
                    }
                },
                vpPauseTweenForGroup: {
                    label: '暂停播放分组的单个动画',
                    method: 'vpPauseTweenForGroup',
                    category: '擦除组件',
                    target: false,
                    paramLabel: ['actionGroup', 'vpTweenUuid'],
                    paramParseFunc: function (paramInstance, actionI18nConfig, sceneNode, lang) {
                        return _this.getTweenParam(paramInstance, lang);
                    }
                },
                vpPlayTweenGoOnForGroup: {
                    label: '继续播放分组单个动画',
                    method: 'vpPlayTweenGoOnForGroup',
                    category: '擦除组件',
                    target: false,
                    paramLabel: ['actionGroup', 'vpTweenUuid'],
                    paramParseFunc: function (paramInstance, actionI18nConfig, sceneNode, lang) {
                        return _this.getTweenParam(paramInstance, lang);
                    }
                },
                vpPlayAllTweenForGroup: {
                    label: '播放分组的全部动画',
                    method: 'vpPlayAllTweenForGroup',
                    category: '擦除组件',
                    target: false,
                    paramLabel: ['actionGroup'],
                    paramParseFunc: function (paramInstance) {
                        var uuid = paramInstance.actionGroup;
                        return _this.getNodeName(uuid);
                    }
                },
                vpPauseAllTweenForGroup: {
                    label: '暂停播放分组的全部动画',
                    method: 'vpPauseAllTweenForGroup',
                    category: '擦除组件',
                    target: false,
                    paramLabel: ['actionGroup'],
                    paramParseFunc: function (paramInstance) {
                        var uuid = paramInstance.actionGroup;
                        return _this.getNodeName(uuid);
                    }
                },
                vpPlayAllTweenGoOnForGroup: {
                    label: '继续播放分组的全部动画',
                    method: 'vpPlayAllTweenGoOnForGroup',
                    category: '擦除组件',
                    target: false,
                    paramLabel: ['actionGroup'],
                    paramParseFunc: function (paramInstance) {
                        var uuid = paramInstance.actionGroup;
                        return _this.getNodeName(uuid);
                    }
                },
                vpReplaceHandImage: {
                    label: '替换跟手图片',
                    method: 'vpReplaceHandImage',
                    category: '擦除组件',
                    target: false,
                    paramLabel: ['handImage'],
                    paramParseFunc: function (paramInstance) {
                        var uuid = paramInstance.handImage;
                        return _this.getNodeName(uuid);
                    }
                }
            };
            /** 序列化 */
            _this.serializableFields = {
                isEnable: qc.Serializer.BOOLEAN,
                brushCategory: qc.Serializer.NODE,
                brushImages: qc.Serializer.NODE,
                bottomImages: qc.Serializer.NODE,
                maskImages: qc.Serializer.NODE,
                customLayerGroup: qc.Serializer.NODES,
                customJudgeAreas: qc.Serializer.NODE,
                brushImageSelected: qc.Serializer.NODE,
                // brushPivot: qc.Serializer.POINT,
                triggerWhen: qc.Serializer.AUTO,
                brushSelected: qc.Serializer.AUTO,
                customEvents: qc.Serializer.MAPPING,
            };
            _this.followUpPictures = null;
            return _this;
        }
        Object.defineProperty(EraseComponent.prototype, "event", {
            get: function () {
                return this._event;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EraseComponent.prototype, "isEnable", {
            get: function () {
                return this._isEnable;
            },
            set: function (value) {
                this._isEnable = value;
            },
            enumerable: false,
            configurable: true
        });
        /** 初始化笔触 */
        EraseComponent.prototype.initBrush = function () {
            this.brushCategoryNode = {
                circle: this.brushCategory.getChild(EraseBrushTypeName.CIRCLE),
                rect: this.brushCategory.getChild(EraseBrushTypeName.RECTANGLE),
                customImages: this.brushCategory.getChild(EraseBrushTypeName.CUSTOM_IMAGES),
            };
            // 兼容选了图片识别但是又没有上传图片
            if (this.brushSelected === EraseBrushType.CUSTOM_IMAGES && !this.brushCategoryNode.customImages) {
                this.brushSelected = EraseBrushType.CIRCLE;
            }
            var nowBrushNode;
            switch (this.brushSelected) {
                case EraseBrushType.CIRCLE:
                    nowBrushNode = this.brushCategoryNode.circle;
                    break;
                case EraseBrushType.RECTANGLE:
                    nowBrushNode = this.brushCategoryNode.rect;
                    break;
                case EraseBrushType.CUSTOM_IMAGES:
                    nowBrushNode = this.brushCategoryNode.customImages;
                    break;
            }
            this.eraseBrushInfo = {
                globalPoint: new qc.Point(),
                brushType: this.brushSelected,
                customImg: nowBrushNode,
            };
        };
        /** 初始化图层 */
        EraseComponent.prototype.initLayer = function () {
            var _this = this;
            var layerArr = [];
            // 加入蒙层
            layerArr.push.apply(layerArr, __spreadArray([], __read(this.maskImages.children), false));
            // 自定义图层
            this.customLayerGroup.forEach(function (customLayerGroup) {
                layerArr.push.apply(layerArr, __spreadArray([], __read(customLayerGroup.children), false));
            });
            layerArr.forEach(function (layer) {
                if (ps.EraseComponentTestSwitch) {
                    var eli = layer.addScript("ps.EraseLayer");
                    eli.deploy([eli]);
                    _this.mlEliArr.push(eli);
                }
                else {
                    var eli = layer.getScript("ps.EraseLayer");
                    _this.mlEliArr.push(eli);
                }
            });
            // 自定义判定区域
            this.customJudgeAreas.visible = true;
            this.customJudgeAreas.children.forEach(function (customJudgeArea) {
                customJudgeArea.visible = true;
                if (ps.EraseComponentTestSwitch) {
                    var eli = customJudgeArea.addScript("ps.EraseLayer");
                    eli.eraseLayerType = EraseLayerType.CUSTOM_JUDGMENT_AREA;
                }
            });
        };
        /** 初始化整合自定义判定区域 */
        EraseComponent.prototype.initIntegrateCustomJudgmentArea = function () {
            if (ps.EraseComponentTestSwitch) {
                this.customEvents = {
                    0: {
                        "id": "1",
                        "name": "判定区域1",
                        "nameEn": "判定区域1",
                        "area": [this.maskImages.children[0].uuid, this.maskImages.children[3].uuid],
                        "step": [20, 80, 100]
                    },
                    1: {
                        "id": "1",
                        "name": "判定区域1",
                        "nameEn": "判定区域2",
                        "area": [this.maskImages.children[1].uuid, this.customJudgeAreas.children[0].uuid],
                        "step": [10, 50, 80, 100]
                    },
                    2: {
                        "id": "1",
                        "name": "判定区域1",
                        "nameEn": "判定区域3",
                        "area": [this.customJudgeAreas.children[1].uuid, this.customJudgeAreas.children[2].uuid],
                        "step": [30, 60]
                    },
                };
            }
            this.customEventArr = Object.values(this.customEvents);
            var testJudgeLayerParent = this.game.add.node(this.gameObject);
            this.gameObject.setChildIndex(testJudgeLayerParent, 0);
            testJudgeLayerParent.name = "\u6574\u5408\u81EA\u5B9A\u4E49\u5224\u5B9A\u533A\u57DF\u7EC4";
            testJudgeLayerParent.x = testJudgeLayerParent.y = 0;
            testJudgeLayerParent.width = this.gameObject.width;
            testJudgeLayerParent.height = this.gameObject.height;
            for (var i = 0; i < this.customEventArr.length; i++) {
                var element = this.customEventArr[i];
                var integrationArea = this.game.add.image(testJudgeLayerParent);
                integrationArea.name = "\u6574\u5408\u81EA\u5B9A\u4E49\u5224\u5B9A\u533A\u57DF".concat(i + 1);
                integrationArea.x = integrationArea.y = 0;
                integrationArea.width = this.gameObject.width;
                integrationArea.height = this.gameObject.height;
                var eli = integrationArea.addScript("ps.EraseLayer");
                eli.eraseLayerType = EraseLayerType.INTEGRATE_CUSTOM_JUDGMENT_AREAS;
                var eliArr = [];
                for (var j = 0; j < element.area.length; j++) {
                    var areaNode = qc_game.nodePool.find(element.area[j]);
                    eliArr.push(areaNode.getScript("ps.EraseLayer"));
                }
                eli.deploy(eliArr);
                element.integrationArea = eli;
                eli.isUpdateBMD = true;
                this.mlEliArr.push(eli);
            }
            // console.log(this.customEventArr)
        };
        /** 试玩初始化的处理 */
        EraseComponent.prototype.onInit = function () {
            var _this = this;
            this.initLayer();
            this.initIntegrateCustomJudgmentArea();
            this.initBrush();
            this.changeFollowUpPictures();
            [this.brushImages, this.brushCategory].forEach(function (node) {
                var layout = node.getScript("ps.Layout");
                if (layout)
                    layout.enable = false;
                node.visible = false;
            });
            this.game.input.onPointerDown.add(this.onPointerDown, this);
            this.event.on(EraseEventName.eraseStart, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                console.log.apply(console, __spreadArray(["开始擦除"], __read(args), false));
            });
            this.event.on(EraseEventName.eraseUp, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                console.log.apply(console, __spreadArray(["抬手"], __read(args), false));
            });
            this.event.on(EraseEventName.eraseReachStep, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                console.log.apply(console, __spreadArray(["到达某一阶段"], __read(args), false));
            });
            this.event.on(EraseEventName.eraseUnReachStep, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                console.log.apply(console, __spreadArray(["未到达某一阶段"], __read(args), false));
            });
            this._checkWorldVisibleTimer = ps.timer.frameLoop(this.checkWorldVisible, this);
            this.event.on(EraseEventName.worldVisibleChanged, function (worldVisible) {
                if (!worldVisible && _this._isDown) {
                    _this.onPointerUp(_this._pointerInfo.id, _this._pointerInfo.x, _this._pointerInfo.y);
                }
            });
        };
        /** 试玩开始时的处理 */
        EraseComponent.prototype.onStart = function () {
            // console.info("[info] EraseComponenet.onStart");
        };
        /**
         * 鼠标按下，触摸开始事件
         * @param id {number} - 设备/触控 id
         * @param x {number} - 事件发生时的 x 轴坐标
         * @param y {number} - 事件发生时的 y 轴坐标
         */
        EraseComponent.prototype.onPointerDown = function (id, x, y) {
            if (!this.isEnable)
                return;
            if (!this.gameObject.worldVisible)
                return;
            if (!this.equalId(id))
                return;
            var globalPoint = new qc.Point(x, y);
            this.showFollowUpPictures();
            this.eraseController(globalPoint);
            if (this.triggerWhen === UpdateBMDType.REAL_TIME_JUDGMENT)
                this.checkFilledPercentage();
            this._isDown = true;
            this._pointerInfo = { id: id, x: x, y: y };
            this.game.input.onPointerMove.add(this.onPointerMove, this);
            this.game.input.onPointerUp.add(this.onPointerUp, this);
        };
        /**
          * 鼠标按下移动，触摸移动等事件
          * @param id {number} - 设备/触控 id
          * @param x {number} - 事件发生时的 x 轴坐标
          * @param y {number} - 事件发生时的 y 轴坐标
          */
        EraseComponent.prototype.onPointerMove = function (id, x, y) {
            if (!this.gameObject.worldVisible)
                return;
            if (!this.equalId(id))
                return;
            var globalPoint = new qc.Point(x, y);
            this.eraseController(globalPoint);
            this._pointerInfo = { id: id, x: x, y: y };
            if (this.triggerWhen === UpdateBMDType.REAL_TIME_JUDGMENT) {
                this.updateBMDRefrshTime += this.game.time.deltaTime;
                if (this.updateBMDRefrshTime > this.updateBMDRefrshInterval) {
                    this.updateBMDRefrshTime = 0;
                    this.checkFilledPercentage();
                }
            }
        };
        /**
         * 鼠标弹起，触摸结束等事件
         * @param id {number} - 设备/触控 id
         * @param x {number} - 事件发生时的 x 轴坐标
         * @param y {number} - 事件发生时的 y 轴坐标
         */
        EraseComponent.prototype.onPointerUp = function (id, x, y) {
            if (!this.equalId(id))
                return;
            this._pointerInfo = null;
            this._isDown = false;
            var globalPoint = new qc.Point(x, y);
            this.checkFilledPercentage();
            this.hideFollowUpPictures();
            if (this.isDrawCross) {
                this.isDrawCross = false;
                this.event.dispatch(EraseEventName.eraseUp, this.gameObject.uuid);
                main.gameEvent.dispatch(EraseEventName.eraseUp, this.gameObject.uuid);
            }
        };
        /** 擦除控制 */
        EraseComponent.prototype.eraseController = function (globalPoint) {
            var _this = this;
            var isDrawCross = false;
            if (this.followUpPictures) {
                var fup = this.followUpPictures;
                var fupEHI = fup.getScript("ps.EraseHandImage");
                var brushPivot = new qc.Point(0.5, 0.5);
                if (fupEHI) {
                    brushPivot.x = fupEHI.brushPivot.x;
                    brushPivot.y = fupEHI.brushPivot.y;
                }
                this.updateFollowUpPictures(globalPoint);
                var fuplpX = (brushPivot.x - fup.pivotX) * fup.width * fup.scaleX;
                var fuplpY = (brushPivot.y - fup.pivotY) * fup.height * fup.scaleY;
                var fuplp = new qc.Point(fuplpX, fuplpY);
                globalPoint = fup.toGlobal(fuplp);
            }
            this.eraseBrushInfo.globalPoint = globalPoint;
            this.mlEliArr.forEach(function (eli) {
                var isDraw = eli.eraseImg(_this.eraseBrushInfo);
                if (isDraw)
                    isDrawCross = true;
            });
            if (this.isDrawCross === isDrawCross)
                return;
            this.isDrawCross = isDrawCross;
            if (this.isDrawCross) {
                this.event.dispatch(EraseEventName.eraseStart, this.gameObject.uuid);
                main.gameEvent.dispatch(EraseEventName.eraseStart, this.gameObject.uuid);
            }
            else {
                this.event.dispatch(EraseEventName.eraseUp, this.gameObject.uuid);
                main.gameEvent.dispatch(EraseEventName.eraseUp, this.gameObject.uuid);
            }
        };
        /** 清除擦除痕迹 */
        EraseComponent.prototype.clearEraseTraces = function () {
            this.mlEliArr.forEach(function (eli) {
                eli.clearEraseTraces();
            });
        };
        /** 检查填充百分比 */
        EraseComponent.prototype.checkFilledPercentage = function () {
            var _this = this;
            this.customEventArr.forEach(function (customEventInfo) {
                customEventInfo.integrationArea.updateBMD();
                var fpNum = customEventInfo.integrationArea.filledPercentage;
                var result = _this.findLeftRightValues(customEventInfo.step, fpNum);
                var leftStepNum = result[0];
                var rightStepNum = result[1];
                if (leftStepNum) {
                    _this.event.dispatch(EraseEventName.eraseReachStep, _this.gameObject.uuid, customEventInfo.id, leftStepNum);
                    main.gameEvent.dispatch(EraseEventName.eraseReachStep, _this.gameObject.uuid, customEventInfo.id, leftStepNum);
                }
                if (rightStepNum) {
                    _this.event.dispatch(EraseEventName.eraseUnReachStep, _this.gameObject.uuid, customEventInfo.id, rightStepNum);
                    main.gameEvent.dispatch(EraseEventName.eraseUnReachStep, _this.gameObject.uuid, customEventInfo.id, rightStepNum);
                }
            });
        };
        /** 跟手图片设置 */
        EraseComponent.prototype.changeFollowUpPictures = function () {
            var img = this.brushImageSelected;
            if (!img)
                return;
            if (this.followUpPictures) {
                this.followUpPictures.destroy();
                this.followUpPictures = null;
            }
            this.followUpPictures = this.game.add.clone(img, UIRoot);
            this.followUpPictures.visible = false;
        };
        EraseComponent.prototype.updateFollowUpPictures = function (globalPoint) {
            if (!this.followUpPictures)
                return;
            var pos = this.followUpPictures.parent.toLocal(globalPoint);
            var scale = this.followUpPictures.parent.toLocal(this.followUpPictures.getWorldScale());
            this.followUpPictures.x = pos.x;
            this.followUpPictures.y = pos.y;
            this.followUpPictures.scaleX = scale.x;
            this.followUpPictures.scaleY = scale.y;
        };
        EraseComponent.prototype.showFollowUpPictures = function () {
            if (!this.followUpPictures)
                return;
            this.followUpPictures.visible = true;
        };
        EraseComponent.prototype.hideFollowUpPictures = function () {
            if (!this.followUpPictures)
                return;
            this.followUpPictures.visible = false;
        };
        /** 限制多指交互 */
        EraseComponent.prototype.equalId = function (id) {
            if (this._touchId == void 0)
                this._touchId = id;
            return this._touchId === id;
        };
        /** 检查填充百分比左右的两个值 */
        EraseComponent.prototype.findLeftRightValues = function (sortedArray, target) {
            if (target < sortedArray[0])
                return [null, sortedArray[0]];
            if (target > sortedArray[sortedArray.length - 1])
                return [sortedArray[sortedArray.length - 1], null];
            var left = 0;
            var right = sortedArray.length - 1;
            while (left <= right) {
                var mid = Math.floor((left + right) / 2);
                var currentValue = sortedArray[mid];
                if (currentValue === target) {
                    return [sortedArray[mid], sortedArray[mid + 1]];
                }
                else if (currentValue < target) {
                    left = mid + 1;
                }
                else {
                    right = mid - 1;
                }
            }
            return [sortedArray[right], sortedArray[left]];
        };
        EraseComponent.prototype.checkWorldVisible = function () {
            var worldVisible = this.gameObject.worldVisible;
            if (this._worldVisible != worldVisible) {
                this._worldVisible = worldVisible;
                this.event.dispatch(EraseEventName.worldVisibleChanged, this.gameObject.worldVisible);
            }
        };
        /** 当脚本被移除时，会自动调用 */
        EraseComponent.prototype.onDestroy = function () {
            // console.info("[info] EraseComponenet.onDestroy");
            this.game.input.onPointerDown.remove(this.onPointerDown, this);
            this.game.input.onPointerMove.remove(this.onPointerMove, this);
            this.game.input.onPointerUp.remove(this.onPointerUp, this);
        };
        EraseComponent.prototype.getLayerGroupOptions = function () {
            var options = [];
            options.push({
                label: this.bottomImages.name,
                value: this.bottomImages.uuid
            });
            options.push({
                label: this.maskImages.name,
                value: this.maskImages.uuid
            });
            this.customLayerGroup.forEach(function (group) {
                options.push({
                    label: group.name,
                    value: group.uuid
                });
            });
            return options;
        };
        EraseComponent.prototype.getNodeName = function (uuid) {
            var node = qc_game.nodePool.find(uuid);
            if (node) {
                return node.name;
            }
            return '';
        };
        EraseComponent.prototype.getTweenParam = function (paramInstance, lang) {
            var uuid = paramInstance.actionGroup;
            var node = qc_game.nodePool.find(uuid);
            if (node) {
                var tweenName_1 = '';
                node.children.forEach(function (child) {
                    var tweens = child.getScripts(qc.Tween);
                    if (tweens.length === 0)
                        return;
                    tweens.forEach(function (tween) {
                        if (/^group:/.test(paramInstance.vpTweenUuid) && tween.builtinGroup) {
                            var groupId = paramInstance.vpTweenUuid.replace('group:', '');
                            if (tween.builtinGroup == groupId) {
                                tweenName_1 = tween.animationName;
                                var info = JSON.parse(tweenName_1);
                                tweenName_1 = info[lang];
                            }
                        }
                        else if (/^tween:/.test(paramInstance.vpTweenUuid) && !tween.builtinGroup) {
                            var tweenClass = paramInstance.vpTweenUuid.replace('tween:', '');
                            if (tween.class === tweenClass) {
                                tweenName_1 = tween.animationName;
                                var info = JSON.parse(tweenName_1);
                                tweenName_1 = info[lang];
                            }
                        }
                    });
                });
                return node.name + '-' + tweenName_1;
            }
            return '';
        };
        EraseComponent.prototype.vpEnableEraseComponent = function (param) {
            this.isEnable = param.isEnable;
        };
        EraseComponent.prototype.vpEraseTrace = function (param) {
            this.clearEraseTraces();
        };
        EraseComponent.prototype.vpShowGroup = function (param) {
            var node = this.game.nodePool.find(param.actionGroup);
            node.visible = param.isShow;
        };
        EraseComponent.prototype.vpEnableEraseableGroup = function (param) {
            var node = this.game.nodePool.find(param.actionGroup);
            var eg = node.getScript(ps.EraseGroup);
            eg.isEnableEraseable = param.isEnable;
        };
        EraseComponent.prototype.vpPlayAllMovieClipForGroup = function (param) {
            var node = this.game.nodePool.find(param.actionGroup);
            node.children.forEach(function (child) {
                var mc = child.getScript(ps.MovieClip);
                if (!mc)
                    return;
                child.visible = true;
                mc.gotoAndPlay(mc.defActionName, mc.playTime, undefined, undefined, mc.pingpong);
            });
        };
        EraseComponent.prototype.vpPauseAllMovieClipForGroup = function (param) {
            var node = this.game.nodePool.find(param.actionGroup);
            node.children.forEach(function (child) {
                var mc = child.getScript(ps.MovieClip);
                if (!mc)
                    return;
                mc.stop();
            });
        };
        EraseComponent.prototype.vpPlayTweenForGroup = function (param) {
            var node = this.game.nodePool.find(param.actionGroup);
            node.children.forEach(function (child) {
                var tweens = child.getScripts(qc.Tween);
                if (tweens.length === 0)
                    return;
                tweens.forEach(function (tween) {
                    if (/^group:/.test(param.vpTweenUuid) && tween.builtinGroup) {
                        var groupId = param.vpTweenUuid.replace('group:', '');
                        if (tween.builtinGroup == groupId) {
                            tween.stop();
                            tween.resetToBeginning();
                            tween.playForward();
                        }
                    }
                    else if (/^tween:/.test(param.vpTweenUuid) && !tween.builtinGroup) {
                        var tweenClass = param.vpTweenUuid.replace('tween:', '');
                        if (tween.class === tweenClass) {
                            tween.stop();
                            tween.resetToBeginning();
                            tween.playForward();
                        }
                    }
                });
            });
        };
        EraseComponent.prototype.vpPauseTweenForGroup = function (param) {
            var node = this.game.nodePool.find(param.actionGroup);
            node.children.forEach(function (child) {
                var tweens = child.getScripts(qc.Tween);
                if (tweens.length === 0)
                    return;
                tweens.forEach(function (tween) {
                    if (/^group:/.test(param.vpTweenUuid) && tween.builtinGroup) {
                        var groupId = param.vpTweenUuid.replace('group:', '');
                        if (tween.builtinGroup == groupId) {
                            tween.stop();
                        }
                    }
                    else if (/^tween:/.test(param.vpTweenUuid) && !tween.builtinGroup) {
                        var tweenClass = param.vpTweenUuid.replace('tween:', '');
                        if (tween.class === tweenClass) {
                            tween.stop();
                        }
                    }
                });
            });
        };
        EraseComponent.prototype.vpPlayTweenGoOnForGroup = function (param) {
            var node = this.game.nodePool.find(param.actionGroup);
            node.children.forEach(function (child) {
                var tweens = child.getScripts(qc.Tween);
                if (tweens.length === 0)
                    return;
                tweens.forEach(function (tween) {
                    if (/^group:/.test(param.vpTweenUuid) && tween.builtinGroup) {
                        var groupId = param.vpTweenUuid.replace('group:', '');
                        if (tween.builtinGroup == groupId) {
                            tween.playForward(false);
                        }
                    }
                    else if (/^tween:/.test(param.vpTweenUuid) && !tween.builtinGroup) {
                        var tweenClass = param.vpTweenUuid.replace('tween:', '');
                        if (tween.class === tweenClass) {
                            tween.playForward(false);
                        }
                    }
                });
            });
        };
        EraseComponent.prototype.vpPlayAllTweenForGroup = function (param) {
            var node = this.game.nodePool.find(param.actionGroup);
            node.children.forEach(function (child) {
                var tweens = child.getScripts(qc.Tween);
                if (tweens.length === 0)
                    return;
                tweens.forEach(function (tween) {
                    tween.stop();
                    tween.resetToBeginning();
                    tween.playForward();
                });
            });
        };
        EraseComponent.prototype.vpPauseAllTweenForGroup = function (param) {
            var node = this.game.nodePool.find(param.actionGroup);
            node.children.forEach(function (child) {
                var tweens = child.getScripts(qc.Tween);
                if (tweens.length === 0)
                    return;
                tweens.forEach(function (tween) {
                    tween.stop();
                });
            });
        };
        EraseComponent.prototype.vpPlayAllTweenGoOnForGroup = function (param) {
            var node = this.game.nodePool.find(param.actionGroup);
            node.children.forEach(function (child) {
                var tweens = child.getScripts(qc.Tween);
                if (tweens.length === 0)
                    return;
                tweens.forEach(function (tween) {
                    tween.stop();
                    tween.playForward(false);
                });
            });
        };
        EraseComponent.prototype.vpReplaceHandImage = function (param) {
            var node = this.game.nodePool.find(param.handImage);
            this.brushImageSelected = node;
            this.changeFollowUpPictures();
        };
        return EraseComponent;
    }(ps.Behaviour));
    ps.EraseComponent = EraseComponent;
    qc.registerBehaviour("ps.EraseComponent", EraseComponent);
    EraseComponent["__menu"] = "Custom/EraseComponent";
})(ps || (ps = {}));
//# sourceMappingURL=EraseComponent.js.map