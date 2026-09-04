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
     * @date 2024/04/29 14:44:30
     */
    var MaskGroup = /** @class */ (function (_super) {
        __extends(MaskGroup, _super);
        function MaskGroup(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.customSubGroup = [];
            _this.customSubGroupBlankProject = []; // 用于区分pt模版和空白模板添加的自定义分组，空白模板新增分组时才记录，pt模版新增分组时不记录
            _this.isCreatedByBlankProject = true; // 是否从空白模板的项目中创建
            _this._maskShapeType = ps.MaskShapeType.rect;
            _this._followElementPivot = { pivotX: 0.5, pivotY: 0.5 };
            _this._isEnable = true;
            _this._isEnableMaskShape = true;
            /** 序列化 */
            _this.serializableFields = {
                isEnable: qc.Serializer.BOOLEAN,
                isEnableMaskShape: qc.Serializer.BOOLEAN,
                baseMapLayer: qc.Serializer.NODE,
                maskGroupLayer: qc.Serializer.NODE,
                maskShapeLayer: qc.Serializer.NODE,
                maskShape: qc.Serializer.NODE,
                maskShapeType: qc.Serializer.STRING,
                followElement: qc.Serializer.NODE,
                followElementPivotMapping: qc.Serializer.MAPPING,
                customSubGroup: qc.Serializer.NODES,
                customSubGroupBlankProject: qc.Serializer.NODES,
                isCreatedByBlankProject: qc.Serializer.BOOLEAN,
            };
            if (_this.gameObject.onRestoreNodeRef) {
                _this.gameObject.onRestoreNodeRef.remove(_this.initMask, _this);
                _this.gameObject.onRestoreNodeRef.add(_this.initMask, _this);
            }
            return _this;
        }
        Object.defineProperty(MaskGroup.prototype, "maskShapeType", {
            get: function () {
                return this._maskShapeType;
            },
            set: function (v) {
                this._maskShapeType = v;
                this.maskShapeOnRelayoutEvent();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MaskGroup.prototype, "maskComponent", {
            get: function () {
                return this._maskComponent ? this.maskComponent : this.gameObject.parent.getScript("ps.MaskComponent");
            },
            set: function (v) {
                this._maskComponent = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MaskGroup.prototype, "followElementPivot", {
            get: function () {
                return this._followElementPivot;
            },
            set: function (v) {
                this._followElementPivot = v;
                this.changeFollowElement();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MaskGroup.prototype, "isEnable", {
            get: function () {
                return this._isEnable;
            },
            set: function (value) {
                this._isEnable = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MaskGroup.prototype, "isEnableMaskShape", {
            get: function () {
                return this._isEnableMaskShape;
            },
            set: function (value) {
                this._isEnableMaskShape = value;
                if (value) {
                    this.enableMask();
                }
                else {
                    this.disabledMask();
                }
                if (this.followElement) {
                    this.followElement.visible = value;
                }
                if (this.maskShape) {
                    this.maskShape.visible = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        /** 试玩初始化的处理 */
        MaskGroup.prototype.onInit = function () {
            this.gameObject.onRestoreNodeRef.remove(this.initMask, this);
            this.initMask();
        };
        /** 试玩开始时的处理 */
        MaskGroup.prototype.onStart = function () {
            var _this = this;
            qc_game.world.onSizeChange.add(this.onSizeChangeEvent, this);
            setTimeout(function () {
                var mc = _this.gameObject.parent.getScript(ps.MaskComponent);
                var interactive = false;
                if (mc.isEnable && _this.isEnable) {
                    interactive = true;
                }
                if (!interactive) {
                    _this.DFS(_this.gameObject, function (node) {
                        node.interactive = interactive;
                    });
                }
            }, 20);
        };
        /** 世界尺寸变化时的事件 */
        MaskGroup.prototype.onSizeChangeEvent = function () {
            this.setFollowElementPivot();
            this.changeFollowElement();
        };
        /** 初始化遮罩 */
        MaskGroup.prototype.initMask = function () {
            this.setFollowElementPivot();
            this.maskShape.children.forEach(function (node) {
                if (node instanceof qc.Graphics)
                    node.destroy();
            });
            this.maskGraphics = new qc.Graphics(qc_game, this.maskShape)["phaser"];
            this.maskGraphics.maskShapeType = this._maskShapeType;
            this.maskGraphics.alpha = 0;
            this.maskShapeOnRelayoutEvent();
            this.isEnableMaskShape = this.isEnableMaskShape;
            this.maskShape.onRelayout.remove(this.maskShapeOnRelayoutEvent, this);
            this.maskShape.onRelayout.add(this.maskShapeOnRelayoutEvent, this);
            this.maskShape.onTransformChanged.remove(this.changeFollowElement, this);
            this.maskShape.onTransformChanged.add(this.changeFollowElement, this);
        };
        /** 启用遮罩 */
        MaskGroup.prototype.enableMask = function () {
            if (!this.maskGroupLayer || !this.maskGraphics)
                return;
            this.maskGroupLayer["phaser"].mask = this.maskGraphics;
        };
        /** 禁用遮罩 */
        MaskGroup.prototype.disabledMask = function () {
            if (!this.maskGroupLayer)
                return;
            this.maskGroupLayer["phaser"].mask = null;
        };
        /** 展示跟随元素 */
        MaskGroup.prototype.showFollowElement = function () {
            this.followElement.visible = true;
        };
        /** 隐藏跟随元素 */
        MaskGroup.prototype.hideFollowElement = function () {
            this.followElement.visible = false;
        };
        /** 遮罩形状大小发生变化时调用事件 */
        MaskGroup.prototype.maskShapeOnRelayoutEvent = function () {
            this.changeGraphice();
            this.changeFollowElement();
        };
        /** 改变跟随元素位置 */
        MaskGroup.prototype.changeFollowElement = function () {
            if (!this.maskShape || !this.followElement)
                return;
            var maskShapelocalPosX = this.maskShape.width * (this.followElementPivot.pivotX - this.maskShape.pivotX);
            var maskShapelocalPosY = this.maskShape.height * (this.followElementPivot.pivotY - this.maskShape.pivotY);
            var maskShapeLocalPosToGlobal = this.maskShape.toGlobal(new qc.Point(maskShapelocalPosX, maskShapelocalPosY));
            var followElementLocalPos = this.followElement.parent.toLocal(maskShapeLocalPosToGlobal);
            this.followElement.x = followElementLocalPos.x;
            this.followElement.y = followElementLocalPos.y;
            if (qici.config.editor) {
                this.refreshLayout(this.followElement, { x: this.followElement.x, y: this.followElement.y });
            }
        };
        /** 改变遮罩形状 */
        MaskGroup.prototype.changeGraphice = function () {
            if (!this.maskShape || !this.maskGraphics)
                return;
            this.maskGraphics.clear();
            this.maskGraphics.beginFill(new qc.Color("#000000").toNumber());
            var vertexes = [];
            if (this._maskShapeType === ps.MaskShapeType.rect) {
                vertexes.push(new Phaser.Point(-this.maskShape.width / 2, -this.maskShape.height / 2), new Phaser.Point(-this.maskShape.width / 2 + this.maskShape.width, -this.maskShape.height / 2), new Phaser.Point(-this.maskShape.width / 2 + this.maskShape.width, -this.maskShape.height / 2 + this.maskShape.height), new Phaser.Point(-this.maskShape.width / 2, -this.maskShape.height / 2 + this.maskShape.height));
                this.maskGraphics.drawPolygon(vertexes);
            }
            else {
                this.maskGraphics.drawEllipse(0, 0, this.maskShape.width / 2, this.maskShape.height / 2);
            }
            this.maskGraphics.endFill();
        };
        /** 设置跟随元素跟随锚点 */
        MaskGroup.prototype.setFollowElementPivot = function () {
            if (!this.followElementPivotMapping)
                return;
            var pivotX = ps.ScrFix.isL ? this.followElementPivotMapping.ldef.pivotX : this.followElementPivotMapping.pdef.pivotX;
            var pivotY = ps.ScrFix.isL ? this.followElementPivotMapping.ldef.pivotY : this.followElementPivotMapping.pdef.pivotY;
            this.followElementPivot = { pivotX: pivotX, pivotY: pivotY };
        };
        // 遍历子节点
        MaskGroup.prototype.DFS = function (node, callback) {
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
        MaskGroup.prototype.refreshLayout = function (node, style) {
            var layoutScriptData = node.getScript(ps.Layout);
            if (!layoutScriptData)
                return;
            var layoutData = layoutScriptData.layoutData;
            var layout = layoutScriptData.layout;
            if (ps.ScrFix.isP) {
                if (!layoutData.pdef) {
                    layoutData.pdef = {};
                }
            }
            else {
                if (!layoutData.ldef) {
                    layoutData.ldef = {};
                }
            }
            for (var i in style) {
                if (ps.ScrFix.isP) {
                    layoutData.pdef[i] = style[i];
                }
                else {
                    layoutData.ldef[i] = style[i];
                }
            }
            var keyList = Object.keys(style);
            function parseLayout(str) {
                if (str === '') {
                    var arr_1 = [];
                    for (var i in style) {
                        arr_1.push("".concat(i, ":").concat(style[i]));
                    }
                    return arr_1.join(',');
                }
                var arr = str.split(',');
                var obj = {};
                arr.forEach(function (item) {
                    var tarr = item.split(':');
                    var key = tarr[0];
                    obj[key] = tarr[1];
                });
                keyList.forEach(function (item) {
                    obj[item] = style[item];
                });
                arr = [];
                for (var i in obj) {
                    if (i === 'visible')
                        continue;
                    arr.push("".concat(i, ":").concat(obj[i]));
                }
                return arr.join(',');
            }
            if (ps.ScrFix.isP) {
                layout.pdef = parseLayout(layout.pdef);
            }
            else {
                layout.ldef = parseLayout(layout.ldef);
            }
            layoutScriptData.refresh();
        };
        /** 销毁脚本时 */
        MaskGroup.prototype.onDestroy = function () {
            qc_game.world.onSizeChange.remove(this.onSizeChangeEvent, this);
            this.maskShape.onRelayout.remove(this.maskShapeOnRelayoutEvent, this);
            this.gameObject.onRestoreNodeRef.remove(this.initMask, this);
        };
        return MaskGroup;
    }(ps.Behaviour));
    ps.MaskGroup = MaskGroup;
    qc.registerBehaviour("ps.MaskGroup", MaskGroup);
    MaskGroup["__menu"] = "Custom/MaskGroup";
})(ps || (ps = {}));
//# sourceMappingURL=MaskGroup.js.map