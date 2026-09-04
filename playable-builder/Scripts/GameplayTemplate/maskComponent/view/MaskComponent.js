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
     * @author jiong
     * @date 2024/04/18 17:57:27
     */
    var MaskShapeType;
    (function (MaskShapeType) {
        MaskShapeType["rect"] = "rect";
        MaskShapeType["circular"] = "circular";
    })(MaskShapeType = ps.MaskShapeType || (ps.MaskShapeType = {}));
    var MaskComponent = /** @class */ (function (_super) {
        __extends(MaskComponent, _super);
        function MaskComponent(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.maskGroupNodeArr = [];
            _this.maskGroupArr = [];
            _this._isEnable = true;
            _this.vpActionConfig = {
                vpEnableMaskComponent: {
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
                vpEnableMaskGroupComponent: {
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
                        var options = _this.getGroupOptions();
                        param.properties.actionGroup.field.options = options;
                    },
                },
                vpShowMaskGroup: {
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
                        var options = _this.getGroupOptions();
                        param.properties.actionGroup.field.options = options;
                    },
                },
                vpShowMaskSubGroup: {
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
                        var options = _this.getSubGroupOptions();
                        param.properties.actionGroup.field.options = options;
                    },
                },
                vpEnableMaskShape: {
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
                        var options = _this.getGroupOptions();
                        param.properties.actionGroup.field.options = options;
                    },
                },
            };
            _this.vpAction = {
                vpEnableMaskComponent: {
                    label: '启用/禁用遮罩组件',
                    method: 'vpEnableMaskComponent',
                    category: '遮罩组件',
                    target: false,
                    paramLabel: 'none',
                },
                vpEnableMaskGroupComponent: {
                    label: '启用/禁用遮罩组',
                    method: 'vpEnableMaskGroupComponent',
                    category: '遮罩组件',
                    target: false,
                    paramLabel: ['actionGroup'],
                    paramParseFunc: function (paramInstance) {
                        var uuid = paramInstance.actionGroup;
                        return uuid;
                    }
                },
                vpShowMaskGroup: {
                    label: '显示/隐藏遮罩组',
                    method: 'vpShowMaskGroup',
                    category: '遮罩组件',
                    target: false,
                    paramLabel: ['actionGroup'],
                    paramParseFunc: function (paramInstance) {
                        var uuid = paramInstance.actionGroup;
                        return uuid;
                    }
                },
                vpShowMaskSubGroup: {
                    label: '显示/隐藏遮罩分组',
                    method: 'vpShowMaskSubGroup',
                    category: '遮罩组件',
                    target: false,
                    paramLabel: ['actionGroup'],
                    paramParseFunc: function (paramInstance) {
                        var uuid = paramInstance.actionGroup;
                        return uuid;
                    }
                },
                vpEnableMaskShape: {
                    label: '启用/禁用遮罩效果',
                    method: 'vpEnableMaskShape',
                    category: '遮罩组件',
                    target: false,
                    paramLabel: ['actionGroup'],
                    paramParseFunc: function (paramInstance) {
                        var uuid = paramInstance.actionGroup;
                        return uuid;
                    }
                },
            };
            /** 序列化 */
            _this.serializableFields = {
                isEnable: qc.Serializer.BOOLEAN,
            };
            return _this;
        }
        Object.defineProperty(MaskComponent.prototype, "isEnable", {
            get: function () {
                return this._isEnable;
            },
            set: function (value) {
                this._isEnable = value;
            },
            enumerable: false,
            configurable: true
        });
        MaskComponent.prototype.onInit = function () {
            var _this = this;
            this.gameObject.children.forEach(function (node) {
                var maskGroup = node.getScript("ps.MaskGroup");
                _this.maskGroupNodeArr.push(node);
                _this.maskGroupArr.push(maskGroup);
            });
        };
        MaskComponent.prototype.getNodeName = function (uuid) {
            var node = qc_game.nodePool.find(uuid);
            if (node) {
                return node.name;
            }
            return '';
        };
        MaskComponent.prototype.getGroupOptions = function () {
            var options = [];
            this.gameObject.children.forEach(function (node) {
                options.push({
                    label: node.name,
                    value: node.uuid
                });
            });
            return options;
        };
        MaskComponent.prototype.getSubGroupOptions = function () {
            var options = [];
            this.gameObject.children.forEach(function (node) {
                var mg = node.getScript(ps.MaskGroup);
                var uuids = [];
                uuids.push(mg.maskGroupLayer.uuid);
                mg.customSubGroup.forEach(function (subGroup) {
                    uuids.push(subGroup.uuid);
                });
                node.children.forEach(function (child) {
                    if (uuids.indexOf(child.uuid) > -1) {
                        options.push({
                            label: node.name + '-' + child.name,
                            value: child.uuid
                        });
                    }
                });
            });
            return options;
        };
        MaskComponent.prototype.getSubGroupName = function (uuid) {
            var node = qc_game.nodePool.find(uuid);
            if (node) {
                return node.parent.name + '-' + node.name;
            }
            return '';
        };
        MaskComponent.prototype.DFS = function (node, callback) {
            if (callback) {
                callback(node);
            }
            var children = node.children;
            if (node.children.length === 0) {
                return;
            }
            for (var i in children) {
                var item = children[i];
                this.DFS(item, callback);
            }
        };
        MaskComponent.prototype.updateInteractive = function () {
            var _this = this;
            this.gameObject.children.forEach(function (child) {
                var mg = child.getScript(ps.MaskGroup);
                var interactive = false;
                if (mg.isEnable && _this.isEnable) {
                    interactive = true;
                }
                _this.DFS(child, function (node) {
                    if (interactive) {
                        if (node.getScript('ps.VPHand') || node.getScript('ps.Drager')) {
                            node.interactive = true;
                        }
                    }
                    else {
                        node.interactive = false;
                    }
                });
            });
        };
        MaskComponent.prototype.vpEnableMaskComponent = function (param) {
            this.isEnable = param.isEnable;
            this.updateInteractive();
        };
        MaskComponent.prototype.vpEnableMaskGroupComponent = function (param) {
            var node = this.game.nodePool.find(param.actionGroup);
            var mg = node.getScript(ps.MaskGroup);
            mg.isEnable = param.isEnable;
            mg.isEnableMaskShape = param.isEnable;
            this.updateInteractive();
        };
        MaskComponent.prototype.vpShowMaskGroup = function (param) {
            var node = this.game.nodePool.find(param.actionGroup);
            node.visible = param.isShow;
        };
        MaskComponent.prototype.vpShowMaskSubGroup = function (param) {
            var node = this.game.nodePool.find(param.actionGroup);
            node.visible = param.isShow;
            node.children.forEach(function (child) {
                child.visible = param.isShow;
            });
        };
        MaskComponent.prototype.vpEnableMaskShape = function (param) {
            var node = this.game.nodePool.find(param.actionGroup);
            var mg = node.getScript(ps.MaskGroup);
            mg.isEnableMaskShape = param.isEnable;
        };
        return MaskComponent;
    }(ps.Behaviour));
    ps.MaskComponent = MaskComponent;
    qc.registerBehaviour("ps.MaskComponent", MaskComponent);
    MaskComponent["__menu"] = "Custom/MaskComponent";
})(ps || (ps = {}));
//# sourceMappingURL=MaskComponent.js.map