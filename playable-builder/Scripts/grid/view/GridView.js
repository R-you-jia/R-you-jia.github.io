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
     * 网格组件
     * @description 网格组件
     * @author bin
     * @date 2022/08/24 14:10:42
     */
    var GridView = /** @class */ (function (_super) {
        __extends(GridView, _super);
        function GridView(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            /** 网格数据，包含所有单元格节点，通过二维数组方式体现横、纵轴关系 */
            _this._data = [];
            /** 序列化 */
            _this.serializableFields = {
                config: qc.Serializer.MAPPING,
            };
            return _this;
            // this.runInEditor = true;
        }
        Object.defineProperty(GridView.prototype, "config", {
            get: function () {
                return this._config;
            },
            set: function (value) {
                this._config = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GridView.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GridView.prototype, "resource", {
            get: function () {
                var gridsConfig = this.config.gridsConfig;
                return this._resource || (this._resource = "resource/".concat(gridsConfig.scene).concat(gridsConfig.group ? "/" + gridsConfig.group : ""));
            },
            enumerable: false,
            configurable: true
        });
        /** 组件被激活后执行 */
        GridView.prototype.awake = function () {
            // console.info("[info] GridView.awake");
            this.onPsRender();
        };
        /** 试玩初始化的处理 */
        GridView.prototype.onInit = function () {
            // console.info("[info] GridView.onInit");
        };
        /** 试玩开始时的处理 */
        GridView.prototype.onStart = function () {
            // console.info("[info] GridView.onStart");
        };
        /** PlaySmart平台渲染处理 */
        GridView.prototype.onPsRender = function () {
            // console.info("[info] GridView.onPsRender");
            this.resetRender();
        };
        /** 重新渲染 */
        GridView.prototype.resetRender = function () {
            var config = this.config.gridsConfig;
            this.gameObject.removeChildren();
            // 网格背景
            var imgGridBg = this.createCellBackground(config.background, this.gameObject);
            if (imgGridBg) {
                imgGridBg.name = "imgGridBg";
            }
            // 单元格节点
            var nodeCells = this.game.add.node(this.gameObject);
            nodeCells.name = "nodeCells";
            // 重置单元格父节点锚点居中及宽高
            this.setAnchorCenter(nodeCells);
            nodeCells.width = (config.cellWidth + config.colSpace) * config.colCount - config.colSpace;
            nodeCells.height = (config.cellHeight + config.rowSpace) * config.rowCount - config.rowSpace;
            // 重置网格节点锚点居中及宽高
            this.setAnchorCenter(this.gameObject);
            this.gameObject.width = nodeCells.width;
            this.gameObject.height = nodeCells.height;
            var isSetCellAnchorCenter = true;
            for (var row = 0; row < config.rowCount; row++) {
                this.data[row] = [];
                for (var col = 0; col < config.colCount; col++) {
                    var cell = config.cells[row][col];
                    var typeId = config.cells[row][col].typeId;
                    var node = this.createCellNode(cell, nodeCells, isSetCellAnchorCenter);
                    if (node) {
                        if (isSetCellAnchorCenter) {
                            node.anchoredX -= node.parent.pivotX * node.parent.width - node.pivotX * node.width;
                            node.anchoredY -= node.parent.pivotY * node.parent.height - node.pivotY * node.height;
                        }
                        this.data[row][col] = { typeId: typeId, node: node };
                    }
                }
            }
        };
        /**
         * 创建单元格节点
         * @param cellConfig 单元格配置
         * @param parent 单元格父节点
         * @param isSetAnchorCenter 是否设置为锚点居中
         * @returns 返回创建好的单元格节点
         */
        GridView.prototype.createCellNode = function (cellConfig, parent, isSetAnchorCenter) {
            if (isSetAnchorCenter === void 0) { isSetAnchorCenter = true; }
            var gridsConfig = this.config.gridsConfig;
            var nodeCell = this.game.add.node(parent);
            nodeCell.name = "nodeCell";
            // 单元格背景
            var imgCellBg = this.createCellBackground(cellConfig.background, nodeCell);
            if (imgCellBg) {
                imgCellBg.name = "imgCellBg";
            }
            nodeCell.width = gridsConfig.cellWidth;
            nodeCell.height = gridsConfig.cellHeight;
            if (isSetAnchorCenter) {
                this.setAnchorCenter(nodeCell);
            }
            nodeCell.anchoredX = cellConfig.x;
            nodeCell.anchoredY = cellConfig.y;
            // 当棋子配置无图片资源时不创建
            if (cellConfig.image && cellConfig.bin) {
                var imgCell = this.game.add.image(nodeCell);
                imgCell.name = "imgCell";
                var url = "".concat(this.resource, "/").concat(cellConfig.bin);
                this.setImgTexture(imgCell, url, void 0, void 0, cellConfig.width, cellConfig.height);
                imgCell.anchoredX = 0;
                imgCell.anchoredY = 0;
            }
            return nodeCell;
        };
        /**
         * 创建一个背景节点
         * @param cellBackground 背景配置
         * @param parent 背景父节点
         * @param isSetAnchorCenter 是否设置为锚点居中
         * @param isResetNativeSize 是否重置宽高为图片实际大小
         * @returns 返回创建好的背景节点
         */
        GridView.prototype.createCellBackground = function (cellBackground, parent, isSetAnchorCenter, isResetNativeSize) {
            if (isSetAnchorCenter === void 0) { isSetAnchorCenter = true; }
            if (isResetNativeSize === void 0) { isResetNativeSize = true; }
            if (!cellBackground || !cellBackground.image || !cellBackground.bin) {
                return;
            }
            var imgCellBg = this.game.add.image(parent);
            var url = "".concat(this.resource, "/").concat(cellBackground.bin);
            this.setImgTexture(imgCellBg, url, isSetAnchorCenter, isResetNativeSize, cellBackground.width, cellBackground.height);
            imgCellBg.alpha = cellBackground.alpha != void 0 ? cellBackground.alpha : 1;
            imgCellBg.anchoredX = cellBackground.x || 0;
            imgCellBg.anchoredY = cellBackground.y || 0;
            return imgCellBg;
        };
        /**
         * 设置图片节点资源路径、锚点居中、宽高
         * @param imgNode 图片节点
         * @param url 图片资源路径
         * @param isSetAnchorCenter 是否设置为锚点居中
         * @param isResetNativeSize 是否重置宽高为图片实际大小
         */
        GridView.prototype.setImgTexture = function (imgNode, url, isSetAnchorCenter, isResetNativeSize, width, height) {
            var _this = this;
            if (isSetAnchorCenter === void 0) { isSetAnchorCenter = true; }
            if (isResetNativeSize === void 0) { isResetNativeSize = true; }
            var setTexture = function () {
                imgNode.texture = texture;
                if (isResetNativeSize) {
                    imgNode.resetNativeSize();
                }
                if (width != void 0) {
                    imgNode.width = width;
                }
                if (height != void 0) {
                    imgNode.height = height;
                }
            };
            if (isSetAnchorCenter) {
                this.setAnchorCenter(imgNode);
            }
            var texture = this.game.assets.find(url);
            if (!texture) {
                this.game.assets.load(url, url, function () {
                    texture = _this.game.assets.find(url);
                    setTexture();
                });
            }
            else {
                setTexture();
            }
        };
        /**
         * 设置节点锚点居中
         * @param node 要设置的节点
         */
        GridView.prototype.setAnchorCenter = function (node) {
            node.setAnchor(new qc.Point(.5, .5), new qc.Point(.5, .5));
            node.pivotX = node.pivotY = .5;
        };
        /** 当脚本被移除时，会自动调用 */
        GridView.prototype.onDestroy = function () {
            // console.info("[info] GridView.onDestroy");
        };
        return GridView;
    }(ps.Behaviour));
    ps.GridView = GridView;
    qc.registerBehaviour("ps.GridView", GridView);
    GridView["__menu"] = "Custom/GridView";
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
//# sourceMappingURL=GridView.js.map