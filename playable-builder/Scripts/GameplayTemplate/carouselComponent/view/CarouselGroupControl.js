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
    var CarouselDirection;
    (function (CarouselDirection) {
        CarouselDirection[CarouselDirection["NEXT"] = 0] = "NEXT";
        CarouselDirection[CarouselDirection["LAST"] = 1] = "LAST";
    })(CarouselDirection = ps.CarouselDirection || (ps.CarouselDirection = {}));
    /**轮播组 */
    var CarouselGroupControl = /** @class */ (function (_super) {
        __extends(CarouselGroupControl, _super);
        function CarouselGroupControl(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.serializableFields = {};
            _this._scrollX = 0;
            _this.pointerData = { id: null };
            _this.startX = 0; //开始位置
            _this.nextX = 0; //下一帧位置
            _this.deltaX = 0; //距离差值
            //轮播控制脚本
            _this.carouselControlBeh = null;
            _this.ceneralCarouselUiBeh = null;
            _this.carouselGroupBeh = null;
            _this.playMode = [];
            _this.triggerManual = [];
            _this.carouselType = ps.CarouselType.NormalCarousel;
            _this.pitSiteNumber = 0; //坑位数量
            _this.pitSiteinterval = 0; //坑位间距
            _this.pitSiteLlist = []; //坑位列表 12345 展示坑位3 为了区分删除资源的左右坑位
            _this.pitSiteImgScale = []; //坑位资源缩放值
            _this.pitSiteImgAlpha = []; //坑位资源透明值
            _this.pitSiteSingleNumber = 0; //左右对称的坑位数
            _this.autoPlayerCarouselInterVal = 0; //自动轮播的间隔
            _this.nextBth = null; //下一张按钮
            _this.lastBth = null; //上一张按钮
            _this.piteSiteAllBox = null; //坑位总节点
            _this.imgCarouselList = []; //资源列表
            _this.pitSiteWidth = 0; //坑位尺寸
            _this.pitSiteHeight = 0; //坑位尺寸
            _this.carouselProcessAniTimer = 0; //轮播过程时长 一定要比自动轮播的间隔值小
            _this.carouselGroupAniData = [];
            _this.carouselGroupsDatas = null;
            _this.carouselId = "轮播组一"; //轮播组的id
            _this.centerImgUniqueName = null; //轮播组的展示位资源标识
            _this.carouselGroupShowData = { carouselId: "", uniqueName: '' };
            //是否可点击轮播
            _this.isCanClickCarousel = false;
            //是否可拖拽击轮播
            _this.isCanDragCarousel = false;
            //是否可自动轮播
            _this.isCanAutoCarousel = false;
            //是否暂停轮播
            _this.isPauseCarousel = false;
            //间隔缩放值
            _this.scaleDecrease = 0;
            //间隔投透明值
            _this.alphaDecrease = 0;
            _this.enableGroup = false;
            /**返回当前轮播组的展示位信息 carouselId轮播组id uniqueName展示资源唯一名  */
            _this.switchDoneTimes = 0; //派发次数
            /**
             * 启用/禁用轮播组件
             */
            _this.isEnableAllCarousel = true;
            /**
             * 处理轮播左右边界过渡效果
             * @param carouselType 轮播风格
             * @param direction 方向
             * @param nextLast 上一张下一张
             * @param currentImgId 当前图片ID
             * @param carouselPitSiteBeh 当前坑位
             * @param carouselProcessAniTimer 动画时间
             */
            _this.deleteAllImg = false;
            return _this;
        }
        Object.defineProperty(CarouselGroupControl.prototype, "scrollX", {
            get: function () {
                return this._scrollX;
            },
            set: function (value) {
                this._scrollX = value;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @param carouselGroupsDatas 平台所给的单个轮播组里面参数列表
         * @param carouselGroupSetData 轮播组的设置参数列表
         * @param carouselGroupAniData 轮播切换动画相关参数
         */
        CarouselGroupControl.prototype.createCarouselPitSite = function (isEditor, carouselGroupsDatas, carouselGroupSetData, carouselGroupAniData, isResetOneCarousel) {
            var e_1, _a;
            var _this = this;
            if (isResetOneCarousel === void 0) { isResetOneCarousel = false; }
            this.gameObject.interactive = true;
            this.playMode = carouselGroupSetData.playMode;
            this.triggerManual = carouselGroupSetData.triggerManual;
            this.carouselType = carouselGroupSetData.playStyle;
            this.direction = carouselGroupSetData.direction;
            this.pitSiteNumber = carouselGroupSetData.displayNum;
            this.pitSiteSingleNumber = Math.floor(this.pitSiteNumber / 2);
            this.autoPlayerCarouselInterVal = carouselGroupSetData.stayTime * 1000;
            this.carouselProcessAniTimer = carouselGroupSetData.animationDuration * 1000;
            if (this.carouselProcessAniTimer <= 0) {
                this.carouselProcessAniTimer = 0.001;
            }
            this.carouselGroupsDatas = carouselGroupsDatas;
            // pt平台节点联动缩放，轮播组内坑位配置需要根据父节点宽高比例缩放宽高值
            // 父节点默认尺寸100x100
            var transDisplaySizeByParentNode = function (key, value) {
                var parentPite = qc_game.nodePool.find(_this.carouselGroupsDatas.piteSite);
                var percent = {
                    'displayWidth': parentPite.width / 100,
                    'displayHeight': parentPite.height / 100,
                    'displaySpace': carouselGroupSetData.direction === ps.Direction.vertical ? parentPite.height / 100 : parentPite.width / 100
                };
                return percent[key] * value;
            };
            this.pitSiteinterval = transDisplaySizeByParentNode('displaySpace', this.carouselGroupsDatas.displaySpace);
            this.pitSiteWidth = transDisplaySizeByParentNode('displayWidth', this.carouselGroupsDatas.displayWidth);
            this.pitSiteHeight = transDisplaySizeByParentNode('displayHeight', this.carouselGroupsDatas.displayHeight);
            this.enableGroup = this.carouselGroupsDatas.enable;
            //克隆坑位父节点
            this.piteSiteAllBox = qc_game.nodePool.find(this.carouselGroupsDatas.piteSite);
            ////////////////////////////
            // this.piteSiteAllBox.scaleX = this.piteSiteAllBox.scaleY = 1.5;
            //轮播组动画数据
            this.carouselGroupAniData = carouselGroupAniData;
            this.carouselId = this.carouselGroupsDatas.carouselId;
            this.carouselControlBeh = this.gameObject.parent.getScript("ps.CarouselComponent");
            this.ceneralCarouselUiBeh = this.gameObject.parent.getScript("ps.GeneralCarouselUi");
            this.carouselGroupBeh = this.gameObject.getScript("ps.CarouselGroupControl");
            this.pitSiteImgScale = [];
            this.pitSiteImgAlpha = [];
            this.pitSiteLlist = [];
            if (!isResetOneCarousel) { //运行时重新轮播 不需要刷新数据
                var items = this.carouselGroupsDatas.items;
                this.imgCarouselList = [];
                try {
                    for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                        var imgUuid = items_1_1.value;
                        var img = qc_game.nodePool.find(imgUuid);
                        var layout = img.getScript("ps.Layout");
                        if (layout) {
                            layout.enable = false;
                            layout.destroy();
                        }
                        var editorBeh = img.getScript("playsmart.editor.data");
                        if (editorBeh) {
                            editorBeh.enable = false;
                            editorBeh.destroy();
                        }
                        this.imgCarouselList.push(img);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (!isEditor) { //非平台才添加操作逻辑
                this.pauseAutoPlayerCarousel();
                this.checkCarouselGroupsData();
                this.initCarouselGroup();
                // this.isEnableCarouselComponent(this.carouselGroupsDatas.enable);
            }
            if (this.pitSiteSingleNumber == 0) { //只有一个坑位情况
                this.alphaDecrease = Number(this.carouselGroupAniData[0].min);
                this.scaleDecrease = Number(this.carouselGroupAniData[1].min);
            }
            else {
                this.alphaDecrease = (Number(this.carouselGroupAniData[0].max) - Number(this.carouselGroupAniData[0].min)) / this.pitSiteSingleNumber;
                this.scaleDecrease = (Number(this.carouselGroupAniData[1].max) - Number(this.carouselGroupAniData[1].min)) / this.pitSiteSingleNumber;
            }
            this.createCarouselAppearance();
        };
        CarouselGroupControl.prototype.checkCarouselGroupsData = function () {
            for (var i = 0; i < this.playMode.length; i++) {
                var playMode = this.playMode[i];
                switch (playMode) {
                    case "auto":
                        console.log('自动轮播');
                        this.isCanAutoCarousel = true;
                        this.startAutoPlayerCarousel();
                        break;
                    case "manual":
                        console.log('手动轮播');
                        for (var i_1 = 0; i_1 < this.triggerManual.length; i_1++) {
                            var triggerManual = this.triggerManual[i_1];
                            switch (triggerManual) {
                                case "click": //点击
                                    this.isCanClickCarousel = true;
                                    break;
                                case "drag": //拖拽
                                    this.isCanDragCarousel = true;
                                    break;
                                default: break;
                            }
                        }
                        break;
                    default: break;
                }
            }
        };
        CarouselGroupControl.prototype.getOneCarouselGroupDisplayImg = function () {
            var _this = this;
            this.carouselGroupShowData.carouselId = this.carouselId;
            for (var i = 0; i < this.pitSiteLlist.length; i++) {
                var card = this.pitSiteLlist[i];
                card.checkDisplayPosImg(this.direction); //判断展示位资源信息
            }
            this.switchDoneTimes++;
            this.carouselGroupShowData.carouselId = this.carouselId;
            this.carouselGroupShowData.uniqueName = this.centerImgUniqueName;
            if (this.switchDoneTimes == this.pitSiteNumber) {
                this.carouselControlBeh.getAllCarouselGroupDisplayImg(this.carouselId);
                ps.timer.once(1, function () {
                    _this.switchDoneTimes = 0;
                });
            }
        };
        /**初始化轮播组 */
        CarouselGroupControl.prototype.initCarouselGroup = function () {
            var _this = this;
            this.carouselControlBeh = this.gameObject.parent.getScript("ps.CarouselComponent");
            this.ceneralCarouselUiBeh = this.gameObject.parent.getScript("ps.GeneralCarouselUi");
            this.carouselGroupBeh = this.gameObject.getScript("ps.CarouselGroupControl");
            this.centerImgUniqueName = this.imgCarouselList[0].uniqueName; //默认展示位为第一张资源
            //上报给平台的轮播的展示位置信息数据
            this.carouselGroupShowData = { carouselId: this.carouselId, uniqueName: this.centerImgUniqueName };
            if (this.isCanClickCarousel) {
                this.nextBth = qc_game.nodePool.find(this.carouselGroupsDatas.next);
                this.lastBth = qc_game.nodePool.find(this.carouselGroupsDatas.prev);
                this.nextBth.interactive = this.lastBth.interactive = true;
                this.nextBth.onClick.add(function () {
                    _this.pauseAutoPlayerCarousel();
                    _this.nextBth.interactive = false;
                    _this.playCarouselNext();
                });
                this.lastBth.onClick.add(function () {
                    _this.pauseAutoPlayerCarousel();
                    _this.lastBth.interactive = false;
                    _this.playCarouselLast();
                });
            }
            if (this.isCanDragCarousel) {
                qc_game.input.onPointerDown.add(function (id, x, y) {
                    if (_this.deleteAllImg)
                        return;
                    if (!_this.isEnableAllCarousel)
                        return;
                    var globalPoint = new qc.Point(x, y);
                    if (_this.gameObject.rectContains(globalPoint)) {
                        if (_this.isCanClickCarousel) {
                            if (!_this.nextBth.rectContains(globalPoint) && !_this.lastBth.rectContains(globalPoint)) {
                                _this.onDownFun(id, x, y);
                            }
                        }
                        else {
                            _this.onDownFun(id, x, y);
                        }
                    }
                });
                qc_game.input.onPointerMove.add(function (id, x, y) {
                    if (_this.deleteAllImg)
                        return;
                    if (!_this.isEnableAllCarousel)
                        return;
                    var globalPoint = new qc.Point(x, y);
                    // if (this.gameObject.rectContains(globalPoint)) {
                    if (_this.isCanClickCarousel) {
                        // if (!this.nextBth.rectContains(globalPoint) && !this.lastBth.rectContains(globalPoint)) {
                        _this.onDragFun(id, x, y);
                        // }
                    }
                    else {
                        _this.onDragFun(id, x, y);
                    }
                    // }
                });
                qc_game.input.onPointerUp.add(function (id, x, y) {
                    if (_this.deleteAllImg)
                        return;
                    if (!_this.isEnableAllCarousel)
                        return;
                    var globalPoint = new qc.Point(x, y);
                    // if (this.gameObject.rectContains(globalPoint)) {
                    if (_this.isCanClickCarousel) {
                        // if (!this.nextBth.rectContains(globalPoint) && !this.lastBth.rectContains(globalPoint)) {
                        _this.onDragEndFun(id, x, y);
                        // }
                    }
                    else {
                        _this.onDragEndFun(id, x, y);
                    }
                    // }
                });
            }
        };
        CarouselGroupControl.prototype.isEnableCarouselComponent = function (enable) {
            this.gameObject.interactive = enable;
            this.isEnableAllCarousel = enable;
            if (!enable) {
                this.pauseAutoPlayerCarousel();
            }
            if (enable && this.isCanAutoCarousel) {
                this.startAutoPlayerCarousel();
            }
            if (this.isCanClickCarousel) {
                this.nextBth.interactive = enable;
                this.lastBth.interactive = enable;
            }
            //坑位资源都一起处理
            this.isEnableCarouselImg(enable);
        };
        CarouselGroupControl.prototype.isEnableCarouselImg = function (enable) {
            for (var i = 0; i < this.pitSiteLlist.length; i++) {
                var pitSite = this.pitSiteLlist[i];
                pitSite.isEnableCarouselImg(enable);
            }
        };
        CarouselGroupControl.prototype.changeSetStayTime = function (stayTime) {
            this.autoPlayerCarouselInterVal = stayTime * 1000;
        };
        /**轮播外观类型 */
        CarouselGroupControl.prototype.createCarouselAppearance = function () {
            switch (this.carouselType) {
                case ps.CarouselType.NormalCarousel:
                    this.ceneralCarouselUiBeh.normalCarouselUi(this.carouselGroupBeh, this.piteSiteAllBox, this.pitSiteSingleNumber, this.pitSiteinterval, this.direction, this.imgCarouselList, this.scaleDecrease, this.alphaDecrease);
                    // console.log('常规轮播');
                    break;
                case ps.CarouselType.PulseScaleCarousel:
                    // console.log('原地缩放轮播');
                    this.ceneralCarouselUiBeh.PulseScaleCarousel(this.carouselGroupBeh, this.piteSiteAllBox, this.pitSiteSingleNumber, this.pitSiteinterval, this.direction, this.imgCarouselList, this.scaleDecrease, this.alphaDecrease);
                    break;
                case ps.CarouselType.RollScaleCarousel:
                    // console.log('滚动缩放轮播--重叠轮播');
                    this.ceneralCarouselUiBeh.rollScaleCarousel(this.carouselGroupBeh, this.piteSiteAllBox, this.pitSiteSingleNumber, this.pitSiteinterval, this.direction, this.imgCarouselList, this.scaleDecrease, this.alphaDecrease);
                    break;
                case ps.CarouselType.OpacityCarousel:
                    // console.log('透明度轮播');
                    this.ceneralCarouselUiBeh.opacityCarousel(this.carouselGroupBeh, this.piteSiteAllBox, this.pitSiteSingleNumber, this.pitSiteinterval, this.direction, this.imgCarouselList, this.scaleDecrease, this.alphaDecrease);
                    break;
                case ps.CarouselType.OpacitScaleyCarousel:
                    // console.log('渐隐缩放轮播');
                    this.ceneralCarouselUiBeh.opacitScaleyCarousel(this.carouselGroupBeh, this.piteSiteAllBox, this.pitSiteSingleNumber, this.pitSiteinterval, this.direction, this.imgCarouselList, this.scaleDecrease, this.alphaDecrease);
                    break;
                default:
                    break;
            }
            var rightListTemp = [];
            var leftListTemp = [];
            for (var i = 0; i < this.pitSiteLlist.length; i++) {
                var pitSite = this.pitSiteLlist[i];
                if (i <= this.pitSiteSingleNumber) {
                    rightListTemp.push(pitSite);
                }
                else {
                    leftListTemp.push(pitSite);
                }
            }
            this.pitSiteLlist = leftListTemp.concat(rightListTemp);
            for (var i = 0; i < this.pitSiteLlist.length; i++) {
                var pitSite = this.pitSiteLlist[i];
                pitSite.carouselPitSiteId = i;
                this.pitSiteImgScale.push(pitSite.getPitSiteImg().scaleX);
                this.pitSiteImgAlpha.push(pitSite.getPitSiteImg().alpha);
            }
        };
        /**自动轮播 */
        CarouselGroupControl.prototype.startAutoPlayerCarousel = function () {
            var _this = this;
            if (this.autoPlayerCarouselTimer) {
                ps.timer.remove(this.autoPlayerCarouselTimer);
            }
            //仅有自动轮播功能时
            if (this.isCanAutoCarousel) {
                this.autoPlayerCarouselTimer = ps.timer.loop(this.autoPlayerCarouselInterVal, function () {
                    _this.playCarouselNext();
                }, this);
            }
        };
        /**暂停自动轮播 */
        CarouselGroupControl.prototype.pauseAutoPlayerCarousel = function () {
            if (this.autoPlayerCarouselTimer) {
                ps.timer.remove(this.autoPlayerCarouselTimer);
            }
        };
        /**
         * 删除资源后，当前坑位的左边进行补位
         * @param deletePisteId 当前删除的坑位id 创建时为45123 实际坑位顺序为12345
         * @returns
         */
        CarouselGroupControl.prototype.deleteCarouselImg = function (_imgPitsite, deletePisteId) {
            var _this = this;
            if (this.imgCarouselList.length <= 1) {
                return;
            }
            this.pauseAutoPlayerCarousel();
            this.isEnableCarouselImg(false);
            _imgPitsite.visible = false;
            var _currentImgId = 0;
            _currentImgId = ps.CarouselTools.searchimgCarouselIndex(_imgPitsite, this.imgCarouselList);
            var index = ps.CarouselTools.searchimgCarouselIndex(_imgPitsite, this.imgCarouselList);
            if (index != -1) {
                this.imgCarouselList.splice(index, 1);
            }
            var _loop_1 = function (i) {
                if (i >= deletePisteId) {
                    var carouselPitSiteBeh_1 = this_1.pitSiteLlist[i];
                    var imgPitsite = carouselPitSiteBeh_1.gameObject.children[0]; //坑位上的资源
                    var _startScale_1 = imgPitsite.scaleX;
                    var _startAlpha_1 = imgPitsite.alpha;
                    var nextPisite = this_1.pitSiteLlist[i - 1]; //往左边一个
                    var _scale = 1;
                    var _alpha = 1;
                    if (nextPisite) {
                        _scale = nextPisite.getPitSiteImg().scaleX;
                        _alpha = nextPisite.getPitSiteImg().alpha;
                    }
                    else {
                        _scale = 0;
                        _alpha = 0;
                    }
                    var switchAniTween = void 0;
                    switch (this_1.direction) {
                        case ps.Direction.horizontal: //水平
                            switchAniTween = ps.Tween.to(imgPitsite, {
                                alpha: _alpha,
                                scaleX: _scale,
                                scaleY: _scale,
                                x: imgPitsite.x - this_1.pitSiteinterval
                            }, this_1.carouselProcessAniTimer);
                            break;
                        case ps.Direction.vertical: //垂直
                            switchAniTween = ps.Tween.to(imgPitsite, {
                                alpha: _alpha,
                                scaleX: _scale,
                                scaleY: _scale,
                                y: imgPitsite.y - this_1.pitSiteinterval
                            }, this_1.carouselProcessAniTimer);
                            break;
                        default:
                            break;
                    }
                    var currentImgId_1 = 0;
                    currentImgId_1 = ps.CarouselTools.searchimgCarouselIndex(imgPitsite, this_1.imgCarouselList);
                    if (currentImgId_1 === undefined) { //NaN
                        currentImgId_1 = _currentImgId;
                    }
                    else {
                        currentImgId_1 += 1;
                    }
                    if (currentImgId_1 > this_1.imgCarouselList.length - 1) {
                        currentImgId_1 = 0;
                    }
                    switchAniTween.onComplete.addOnce(function () {
                        _this.resetCarouselPitSiteImg(carouselPitSiteBeh_1, currentImgId_1, _startScale_1, _startAlpha_1);
                    }, this_1);
                }
            };
            var this_1 = this;
            // 运行时的时候 删除的资源要从资源列表中删除
            for (var i = 0; i < this.pitSiteLlist.length; i++) {
                _loop_1(i);
            }
        };
        /**
     * 重置坑位上的图片
     * @param carouselPitSiteBeh 轮播坑位
     * @param currentImgId 当前坑位资源id
     * @param btnNode 按钮
     * @returns
     */
        CarouselGroupControl.prototype.resetCarouselPitSiteImg = function (carouselPitSiteBeh, currentImgId, _startScale, _startAlpha) {
            var e_2, _a;
            var _this = this;
            if (this.imgCarouselList.length <= 0) {
                // console.log('资源列表为0了！！！');
                this.pauseAutoPlayerCarousel();
                this.deleteAllImg = true;
                this.piteSiteAllBox.visible = false;
                this.piteSiteAllBox.removeChildren();
                return;
            }
            try {
                for (var _b = __values(carouselPitSiteBeh.gameObject.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    ps.Tween.clearAll(child);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            carouselPitSiteBeh.gameObject.removeChildren();
            var imgCarouselNode = qc_game.add.clone(this.imgCarouselList[currentImgId], carouselPitSiteBeh.gameObject);
            imgCarouselNode.x = 0;
            imgCarouselNode.y = 0;
            if (this.pitSiteNumber == 1) {
                imgCarouselNode.scaleX = imgCarouselNode.scaleY = Number(this.carouselGroupAniData[1].min);
                imgCarouselNode.alpha = Number(this.carouselGroupAniData[0].min);
                var switchAniTween = void 0;
                ps.Tween.clear(switchAniTween);
                switchAniTween = ps.Tween.to(imgCarouselNode, {
                    alpha: _startAlpha,
                    scaleX: _startScale,
                    scaleY: _startScale,
                }, this.carouselProcessAniTimer / 2);
                switchAniTween.onComplete.add(function () {
                    if (_this.isCanClickCarousel) {
                        _this.nextBth.interactive = _this.lastBth.interactive = true;
                    }
                    // if (btnNode) { btnNode.interactive = true; }
                });
            }
            else {
                if (this.isCanClickCarousel) {
                    this.nextBth.interactive = this.lastBth.interactive = true;
                }
                // if (btnNode) { btnNode.interactive = true; }
                imgCarouselNode.scaleX = imgCarouselNode.scaleY = _startScale;
                imgCarouselNode.alpha = _startAlpha;
            }
            carouselPitSiteBeh.setCarouselPitSiteImg(imgCarouselNode, this.carouselGroupBeh);
            var adjustedImgData = ps.CarouselTools.adjustedImgWH(imgCarouselNode, carouselPitSiteBeh.gameObject);
            imgCarouselNode.width = adjustedImgData.adjustedWidth;
            imgCarouselNode.height = adjustedImgData.adjustedHeight;
            //获得展示位的信息
            this.getOneCarouselGroupDisplayImg();
            if (this.isCanAutoCarousel && !this.isPauseCarousel) {
                this.startAutoPlayerCarousel();
            }
        };
        /**
         * 左右轮播数据处理
         * @param _nextPisite 下一坑位
         * @returns
         */
        CarouselGroupControl.prototype.comRightLeftData = function (_nextPisite, imgPsite) {
            var nextPisite = _nextPisite;
            var pitSiteinterval = 0;
            var carouselProcessAniTimer = 0;
            if (this.pitSiteLlist.length == 1) { //坑位数等于1时
                pitSiteinterval = 0;
                carouselProcessAniTimer = this.carouselProcessAniTimer / 2;
            }
            else {
                pitSiteinterval = this.pitSiteinterval;
                carouselProcessAniTimer = this.carouselProcessAniTimer;
            }
            var _scale = 1;
            var _alpha = 1;
            if (nextPisite) { //有下一个坑位情况
                _scale = nextPisite.getPitSiteImg().scaleX;
                _alpha = nextPisite.getPitSiteImg().alpha;
            }
            else { //无下一个坑位情况
                _scale = Number(this.carouselGroupAniData[1].min);
                if (this.pitSiteLlist.length == 1) {
                    _alpha = Number(this.carouselGroupAniData[0].min);
                }
                else {
                    _alpha = 0;
                }
                //特殊处理滚动缩放轮播边界过渡效果
                if (this.carouselType == ps.CarouselType.RollScaleCarousel) {
                    if (this.pitSiteLlist.length != 1) { //坑位数大于1才会有位移
                        pitSiteinterval = -this.pitSiteinterval / 2; //处理重叠轮播类型边界
                    }
                }
            }
            return { _alpha: _alpha, _scale: _scale, pitSiteinterval: pitSiteinterval, carouselProcessAniTimer: carouselProcessAniTimer };
        };
        CarouselGroupControl.prototype.comRightLeftCloneBorder = function (carouselType, direction, nextLast, currentImgId, carouselPitSiteBeh, carouselProcessAniTimer) {
            var _this = this;
            if (this.imgCarouselList.length <= 0) {
                // console.log('资源列表为0了！！！');
                this.pauseAutoPlayerCarousel();
                this.deleteAllImg = true;
                this.piteSiteAllBox.visible = false;
                this.piteSiteAllBox.removeChildren();
                return;
            }
            var imgPsite = carouselPitSiteBeh.gameObject.children[0];
            // let imgCarouselNode = qc_game.add.clone(this.imgCarouselList[currentImgId], this.piteSiteAllBox);
            var imgCarouselNode = qc_game.add.clone(this.imgCarouselList[currentImgId], this.gameObject);
            this.gameObject.setChildIndex(imgCarouselNode, -99);
            // this.piteSiteAllBox.setChildIndex(imgCarouselNode, -99);
            var itemTarget = ps.Tools.transPos(carouselPitSiteBeh.gameObject, imgCarouselNode);
            imgCarouselNode.x = itemTarget.x;
            imgCarouselNode.y = itemTarget.y;
            // imgCarouselNode.x = carouselPitSiteBeh.gameObject.x;
            // imgCarouselNode.y = carouselPitSiteBeh.gameObject.y;
            var adjustedImgData = ps.CarouselTools.adjustedImgWH(imgCarouselNode, carouselPitSiteBeh.gameObject);
            imgCarouselNode.width = adjustedImgData.adjustedWidth;
            imgCarouselNode.height = adjustedImgData.adjustedHeight;
            // imgCarouselNode.alpha = imgPsite.alpha;
            imgCarouselNode.alpha = 0;
            ////////////////////////////
            imgCarouselNode.scaleX = imgCarouselNode.scaleY = imgPsite.scaleX;
            var startAlpha = imgPsite.alpha; //记录坑位的图片开始透明值
            var startX = 0; //记录克隆的图片开始位置
            var switchAniTweenBorder;
            var leftTorightMoveX = this.pitSiteinterval / 4;
            switch (direction) {
                case ps.Direction.horizontal: //水平
                    startX = imgCarouselNode.x;
                    if (nextLast == CarouselDirection.NEXT) {
                        if (carouselType == ps.CarouselType.RollScaleCarousel) {
                            imgCarouselNode.x -= leftTorightMoveX;
                        }
                        else {
                            imgCarouselNode.x += leftTorightMoveX * 4;
                        }
                    }
                    else {
                        if (carouselType == ps.CarouselType.RollScaleCarousel) {
                            imgCarouselNode.x += leftTorightMoveX;
                        }
                        else {
                            imgCarouselNode.x -= leftTorightMoveX * 4;
                        }
                    }
                    switchAniTweenBorder = ps.Tween.to(imgCarouselNode, {
                        x: startX, alpha: startAlpha
                    }, carouselProcessAniTimer, Phaser.Easing.Sinusoidal.InOut);
                    break;
                case ps.Direction.vertical: //垂直
                    startX = imgCarouselNode.y;
                    if (nextLast == CarouselDirection.NEXT) {
                        if (carouselType == ps.CarouselType.RollScaleCarousel) {
                            imgCarouselNode.y -= leftTorightMoveX;
                        }
                        else {
                            imgCarouselNode.y += leftTorightMoveX * 4;
                        }
                    }
                    else {
                        if (carouselType == ps.CarouselType.RollScaleCarousel) {
                            imgCarouselNode.y += leftTorightMoveX;
                        }
                        else {
                            imgCarouselNode.y -= leftTorightMoveX * 4;
                        }
                    }
                    switchAniTweenBorder = ps.Tween.to(imgCarouselNode, {
                        y: startX, alpha: startAlpha
                    }, carouselProcessAniTimer, Phaser.Easing.Sinusoidal.InOut);
                    break;
                default:
                    break;
            }
            switchAniTweenBorder.onComplete.addOnce(function () {
                // this.piteSiteAllBox.removeChild(imgCarouselNode);
                _this.gameObject.removeChild(imgCarouselNode);
            });
        };
        /**
         * 下一张 是正方向
         */
        CarouselGroupControl.prototype.playCarouselNext = function () {
            var _this = this;
            if (this.deleteAllImg)
                return;
            var _loop_2 = function (i) {
                var carouselPitSiteBeh = this_2.pitSiteLlist[i];
                var imgPsite = carouselPitSiteBeh.gameObject.children[0];
                imgPsite.interactive = false;
                //寻找下标
                var currentImgId = 0;
                currentImgId = ps.CarouselTools.searchimgCarouselIndex(imgPsite, this_2.imgCarouselList);
                currentImgId += 1;
                if (currentImgId > this_2.imgCarouselList.length - 1) {
                    currentImgId = 0;
                }
                var _startScale = imgPsite.scaleX;
                var _startAlpha = imgPsite.alpha;
                var nextPisite = this_2.pitSiteLlist[i - 1]; //往左边一个
                var data = this_2.comRightLeftData(nextPisite, imgPsite);
                //只有滚动缩放类型有边界处理其余类型用默认动画
                if (i == this_2.pitSiteLlist.length - 1) { //最右边图片 克隆出来 然后做左到右动画
                    if (this_2.pitSiteNumber != 1) {
                        this_2.comRightLeftCloneBorder(this_2.carouselType, this_2.direction, CarouselDirection.NEXT, currentImgId, carouselPitSiteBeh, data.carouselProcessAniTimer);
                    }
                }
                var switchAniTween = void 0;
                switch (this_2.direction) {
                    case ps.Direction.horizontal: //水平
                        switchAniTween = ps.Tween.to(imgPsite, {
                            alpha: data._alpha,
                            scaleX: data._scale,
                            scaleY: data._scale,
                            x: imgPsite.x - data.pitSiteinterval
                        }, data.carouselProcessAniTimer, Phaser.Easing.Sinusoidal.InOut);
                        break;
                    case ps.Direction.vertical: //垂直
                        switchAniTween = ps.Tween.to(imgPsite, {
                            alpha: data._alpha,
                            scaleX: data._scale,
                            scaleY: data._scale,
                            y: imgPsite.y - data.pitSiteinterval
                        }, data.carouselProcessAniTimer, Phaser.Easing.Sinusoidal.InOut);
                        break;
                    default:
                        break;
                }
                switchAniTween.onComplete.addOnce(function () {
                    imgPsite.interactive = true;
                    _this.resetCarouselPitSiteImg(carouselPitSiteBeh, currentImgId, _startScale, _startAlpha);
                });
            };
            var this_2 = this;
            for (var i = 0; i < this.pitSiteLlist.length; i++) {
                _loop_2(i);
            }
        };
        /**
         * 上一张
         */
        CarouselGroupControl.prototype.playCarouselLast = function () {
            var _this = this;
            if (this.deleteAllImg)
                return;
            var _loop_3 = function (i) {
                var carouselPitSiteBeh = this_3.pitSiteLlist[i];
                var imgPsite = carouselPitSiteBeh.gameObject.children[0]; //坑位上的资源
                imgPsite.interactive = false;
                //寻找当前坑位的图片下标
                var currentImgId = 0;
                currentImgId = ps.CarouselTools.searchimgCarouselIndex(imgPsite, this_3.imgCarouselList);
                currentImgId -= 1;
                if (currentImgId < 0) {
                    currentImgId = this_3.imgCarouselList.length - 1;
                }
                var _startScale = imgPsite.scaleX;
                var _startAlpha = imgPsite.alpha;
                var nextPisite = this_3.pitSiteLlist[i + 1]; //往右边一个
                var data = this_3.comRightLeftData(nextPisite, imgPsite);
                //只有滚动缩放类型有边界处理 其余类型用默认动画
                if (i == 0) { //最左边图片 克隆出来 然后做右到左动画
                    if (this_3.pitSiteNumber != 1) { //坑位不为1时 才有边界处理，不然就是原地一张图片做动画
                        this_3.comRightLeftCloneBorder(this_3.carouselType, this_3.direction, CarouselDirection.LAST, currentImgId, carouselPitSiteBeh, data.carouselProcessAniTimer);
                    }
                }
                var switchAniTween = void 0;
                switch (this_3.direction) {
                    case ps.Direction.horizontal: //水平
                        switchAniTween = ps.Tween.to(imgPsite, {
                            alpha: data._alpha,
                            scaleX: data._scale,
                            scaleY: data._scale,
                            x: imgPsite.x + data.pitSiteinterval
                        }, data.carouselProcessAniTimer, Phaser.Easing.Sinusoidal.InOut);
                        break;
                    case ps.Direction.vertical: //垂直
                        switchAniTween = ps.Tween.to(imgPsite, {
                            alpha: data._alpha,
                            scaleX: data._scale,
                            scaleY: data._scale,
                            y: imgPsite.y + data.pitSiteinterval
                        }, data.carouselProcessAniTimer, Phaser.Easing.Sinusoidal.InOut);
                        break;
                    default:
                        break;
                }
                switchAniTween.onComplete.addOnce(function () {
                    imgPsite.interactive = true;
                    _this.resetCarouselPitSiteImg(carouselPitSiteBeh, currentImgId, _startScale, _startAlpha);
                });
            };
            var this_3 = this;
            for (var i = 0; i < this.pitSiteLlist.length; i++) {
                _loop_3(i);
            }
        };
        CarouselGroupControl.prototype.onDownFun = function (id, x, y) {
            if (this.pointerData.id != null)
                return;
            this.pauseAutoPlayerCarousel();
            this.pointerData.id = id;
            switch (this.direction) {
                case ps.Direction.horizontal: //水平
                    this.startX = x;
                    break;
                case ps.Direction.vertical: //垂直
                    this.startX = y;
                    break;
                default:
                    break;
            }
        };
        CarouselGroupControl.prototype.onDragFun = function (id, x, y) {
            if (id != this.pointerData.id)
                return; //禁止双指操作
            this.pauseAutoPlayerCarousel();
            switch (this.direction) {
                case ps.Direction.horizontal: //水平
                    this.nextX = x;
                    this.deltaX = this.nextX - this.startX;
                    this.startX = x;
                    break;
                case ps.Direction.vertical: //垂直
                    this.nextX = y;
                    this.deltaX = this.nextX - this.startX;
                    this.startX = y;
                    break;
                default:
                    break;
            }
            this.scrollX += this.deltaX / UIRoot.scaleX;
            this.fixScrollXInterval();
            this.updatePisiteImgPos();
            if (Math.abs(this.scrollX) > 0) {
                this.isEnableCarouselImg(false);
            }
        };
        /**处理滚动距离大于小于间隔值时 */
        CarouselGroupControl.prototype.fixScrollXInterval = function () {
            if (this.scrollX >= this.pitSiteinterval) {
                this.scrollX -= this.pitSiteinterval;
            }
            else if (this.scrollX < -(this.pitSiteinterval)) {
                this.scrollX += this.pitSiteinterval;
            }
        };
        /**
         * 帧动画调整每张资源效果
         * @param i 坑位id
         * @param imgPsite 坑位资源
         * @param startScale_HV 资源开始缩放值
         * @param _scaleChange_H 递减缩放值
         * @param startAlpha_HV 资源开始透明值值
         * @param _alphaDecrease_H 递减透明值
         */
        CarouselGroupControl.prototype.comChangeScaleAlphaUpdate = function (i, imgPsite, startScale_HV, _scaleChange_H, startAlpha_HV, _alphaDecrease_H) {
            if (i < this.pitSiteSingleNumber) { //左边坑位
                imgPsite.scaleX = startScale_HV + _scaleChange_H;
                imgPsite.scaleY = startScale_HV + _scaleChange_H;
                imgPsite.alpha = startAlpha_HV + _alphaDecrease_H;
            }
            else if (i == this.pitSiteSingleNumber) { //中间坑位
                switch (this.direction) {
                    case ps.Direction.horizontal: //水平
                        if (imgPsite.x > 0) { //区分左右
                            imgPsite.scaleX = startScale_HV - _scaleChange_H;
                            imgPsite.scaleY = startScale_HV - _scaleChange_H;
                            imgPsite.alpha = startAlpha_HV - _alphaDecrease_H;
                        }
                        else {
                            imgPsite.scaleX = startScale_HV + _scaleChange_H;
                            imgPsite.scaleY = startScale_HV + _scaleChange_H;
                            imgPsite.alpha = startAlpha_HV + _alphaDecrease_H;
                        }
                        break;
                    case ps.Direction.vertical: //垂直
                        if (imgPsite.y > 0) { //区分上下
                            imgPsite.scaleX = startScale_HV - _scaleChange_H;
                            imgPsite.scaleY = startScale_HV - _scaleChange_H;
                            imgPsite.alpha = startAlpha_HV - _alphaDecrease_H;
                        }
                        else {
                            imgPsite.scaleX = startScale_HV + _scaleChange_H;
                            imgPsite.scaleY = startScale_HV + _scaleChange_H;
                            imgPsite.alpha = startAlpha_HV + _alphaDecrease_H;
                        }
                        break;
                    default: break;
                }
            }
            else { //右边坑位
                imgPsite.scaleX = startScale_HV - _scaleChange_H;
                imgPsite.scaleY = startScale_HV - _scaleChange_H;
                imgPsite.alpha = startAlpha_HV - _alphaDecrease_H;
            }
            //确保临界值
            if (imgPsite.alpha >= 1) {
                imgPsite.alpha = 1;
            }
            if (imgPsite.scaleX >= 1) {
                imgPsite.scaleX = imgPsite.scaleY = 1;
            }
            if (imgPsite.alpha <= 0) {
                imgPsite.alpha = 0;
            }
            if (imgPsite.scaleX <= 0) {
                imgPsite.scaleX = imgPsite.scaleY = 0;
            }
        };
        CarouselGroupControl.prototype.updatePisiteImgPos = function () {
            for (var i = 0; i < this.pitSiteLlist.length; i++) {
                var carouselPitSiteBeh = this.pitSiteLlist[i];
                var imgPsite = carouselPitSiteBeh.gameObject.children[0]; //坑位上的资源
                imgPsite.interactive = false;
                var currentImgId = 0;
                currentImgId = ps.CarouselTools.searchimgCarouselIndex(imgPsite, this.imgCarouselList);
                switch (this.direction) {
                    case ps.Direction.horizontal: //水平
                        imgPsite.x += this.deltaX;
                        imgPsite.y = 0;
                        var startScale_H = this.pitSiteImgScale[i];
                        var _scaleChange_H = (imgPsite.x / this.pitSiteinterval) * this.scaleDecrease;
                        var startAlpha_H = this.pitSiteImgAlpha[i];
                        var _alphaDecrease_H = (imgPsite.x / this.pitSiteinterval) * this.alphaDecrease;
                        this.comChangeScaleAlphaUpdate(i, imgPsite, startScale_H, _scaleChange_H, startAlpha_H, _alphaDecrease_H);
                        if (imgPsite.x >= this.pitSiteinterval) {
                            currentImgId -= 1;
                            if (currentImgId < 0) {
                                currentImgId = this.imgCarouselList.length - 1;
                            }
                            var _startScale = startScale_H;
                            var _startAlpha = startAlpha_H;
                            this.resetCarouselPitSiteImg(carouselPitSiteBeh, currentImgId, _startScale, _startAlpha);
                        }
                        else if (imgPsite.x < -this.pitSiteinterval) {
                            currentImgId += 1;
                            if (currentImgId > this.imgCarouselList.length - 1) {
                                currentImgId = 0;
                            }
                            var _startScale = startScale_H;
                            var _startAlpha = startAlpha_H;
                            this.resetCarouselPitSiteImg(carouselPitSiteBeh, currentImgId, _startScale, _startAlpha);
                        }
                        break;
                    case ps.Direction.vertical: //垂直
                        imgPsite.y += this.deltaX;
                        imgPsite.x = 0;
                        var startScale_V = this.pitSiteImgScale[i];
                        var _scaleChange_V = (imgPsite.y / this.pitSiteinterval) * this.scaleDecrease;
                        var startAlpha_V = this.pitSiteImgAlpha[i];
                        var _alphaDecrease_V = (imgPsite.y / this.pitSiteinterval) * this.alphaDecrease;
                        this.comChangeScaleAlphaUpdate(i, imgPsite, startScale_V, _scaleChange_V, startAlpha_V, _alphaDecrease_V);
                        if (imgPsite.y >= this.pitSiteinterval) {
                            currentImgId -= 1;
                            if (currentImgId < 0) {
                                currentImgId = this.imgCarouselList.length - 1;
                            }
                            var _startScale = startScale_V;
                            var _startAlpha = startAlpha_V;
                            this.resetCarouselPitSiteImg(carouselPitSiteBeh, currentImgId, _startScale, _startAlpha);
                        }
                        else if (imgPsite.y < -this.pitSiteinterval) {
                            currentImgId += 1;
                            if (currentImgId > this.imgCarouselList.length - 1) {
                                currentImgId = 0;
                            }
                            var _startScale = startScale_V;
                            var _startAlpha = startAlpha_V;
                            this.resetCarouselPitSiteImg(carouselPitSiteBeh, currentImgId, _startScale, _startAlpha);
                        }
                        break;
                    default:
                        break;
                }
            }
        };
        CarouselGroupControl.prototype.onDragEndFun = function (id, x, y) {
            var _this = this;
            if (id != this.pointerData.id)
                return;
            //未滑动就抬起 则禁止
            this.pointerData.id = null;
            if (Math.abs(this.scrollX) > 0) { //是有效拖拽结束后抬起，才处理
                this.fixOldCenterPos();
            }
            else {
                if (this.isCanAutoCarousel) {
                    this.startAutoPlayerCarousel();
                }
            }
            this.startX = this.nextX = this.deltaX = this.scrollX = 0;
            var t;
            if (t) {
                ps.timer.remove(t);
            }
            t = ps.timer.once(this.carouselProcessAniTimer, function () {
                _this.isEnableCarouselImg(_this.isEnableAllCarousel);
            });
        };
        /**
         * 小于间隔值，返回原位，不切换图片
         * @param direction 方向
         * @param imgPsite 坑位资源
         * @param moveSpd 轮播速度
         * @param carouselPitSiteBeh 坑位
         * @param currentImgId 坑位资源id
         */
        CarouselGroupControl.prototype.comFixPos = function (direction, imgPsite, moveSpd, carouselPitSiteBeh, currentImgId, _startScale, _startAlpha, _scale, _alpha) {
            var _this = this;
            if (_startScale === void 0) { _startScale = 1; }
            if (_startAlpha === void 0) { _startAlpha = 1; }
            if (_scale === void 0) { _scale = 1; }
            if (_alpha === void 0) { _alpha = 1; }
            var switchAniTween;
            switch (this.direction) {
                case ps.Direction.horizontal: //水平
                    switchAniTween = ps.Tween.to(imgPsite, {
                        alpha: _alpha,
                        scaleX: _scale,
                        scaleY: _scale,
                        x: direction * this.pitSiteinterval
                    }, moveSpd, Phaser.Easing.Sinusoidal.InOut);
                    break;
                case ps.Direction.vertical: //垂直
                    switchAniTween = ps.Tween.to(imgPsite, {
                        alpha: _alpha,
                        scaleX: _scale,
                        scaleY: _scale,
                        y: direction * this.pitSiteinterval
                    }, moveSpd, Phaser.Easing.Sinusoidal.InOut);
                    break;
                default:
                    break;
            }
            switchAniTween.onComplete.addOnce(function () {
                imgPsite.interactive = true;
                _this.resetCarouselPitSiteImg(carouselPitSiteBeh, currentImgId, _startScale, _startAlpha);
            });
        };
        CarouselGroupControl.prototype.fixOldCenterPos = function () {
            var _this = this;
            //根据剩余距离 修改移动速度
            var moveSpd = this.carouselProcessAniTimer * (Math.abs(this.scrollX) / this.pitSiteinterval);
            if (this.scrollX > this.pitSiteinterval * 0.3) {
                // console.log('右移成功！');
                for (var i = 0; i < this.pitSiteLlist.length; i++) {
                    var carouselPitSiteBeh = this.pitSiteLlist[i];
                    var imgPsite = carouselPitSiteBeh.gameObject.children[0]; //坑位上的资源
                    if (!imgPsite)
                        return;
                    imgPsite.interactive = false;
                    //寻找当前坑位的图片下标
                    var currentImgId = 0;
                    currentImgId = ps.CarouselTools.searchimgCarouselIndex(imgPsite, this.imgCarouselList);
                    currentImgId -= 1;
                    if (currentImgId < 0) {
                        currentImgId = this.imgCarouselList.length - 1;
                    }
                    var _startScale = this.pitSiteImgScale[i];
                    var _startAlpha = this.pitSiteImgAlpha[i];
                    var nextPisiteScale = this.pitSiteImgScale[i + 1]; //往左边一个
                    var nextPisiteAlpha = this.pitSiteImgAlpha[i + 1]; //往左边一个
                    var _scale = 1;
                    var _alpha = 1;
                    if (nextPisiteScale) {
                        _scale = nextPisiteScale;
                        _alpha = nextPisiteAlpha;
                    }
                    else {
                        _scale = 0;
                        _alpha = 0;
                    }
                    this.comFixPos(1, imgPsite, moveSpd, carouselPitSiteBeh, currentImgId, _startScale, _startAlpha, _scale, _alpha);
                }
            }
            else if (this.scrollX < -this.pitSiteinterval * 0.3) {
                // console.log('左移成功！');
                for (var i = 0; i < this.pitSiteLlist.length; i++) {
                    var carouselPitSiteBeh = this.pitSiteLlist[i];
                    var imgPsite = carouselPitSiteBeh.gameObject.children[0];
                    if (!imgPsite)
                        return;
                    imgPsite.interactive = false;
                    //寻找下标
                    var currentImgId = 0;
                    currentImgId = ps.CarouselTools.searchimgCarouselIndex(imgPsite, this.imgCarouselList);
                    currentImgId += 1;
                    if (currentImgId > this.imgCarouselList.length - 1) {
                        currentImgId = 0;
                    }
                    var _startScale = this.pitSiteImgScale[i];
                    var _startAlpha = this.pitSiteImgAlpha[i];
                    var nextPisiteScale = this.pitSiteImgScale[i - 1]; //往左边一个
                    var nextPisiteAlpha = this.pitSiteImgAlpha[i - 1]; //往左边一个
                    var _scale = 1;
                    var _alpha = 1;
                    if (nextPisiteScale) {
                        _scale = nextPisiteScale;
                        _alpha = nextPisiteAlpha;
                    }
                    else {
                        _scale = 0;
                        _alpha = 0;
                    }
                    this.comFixPos(-1, imgPsite, moveSpd, carouselPitSiteBeh, currentImgId, _startScale, _startAlpha, _scale, _alpha);
                }
            }
            else {
                var _loop_4 = function (i) {
                    var carouselPitSiteBeh = this_4.pitSiteLlist[i];
                    var imgPsite = carouselPitSiteBeh.gameObject.children[0];
                    if (!imgPsite)
                        return { value: void 0 };
                    imgPsite.interactive = false;
                    var startScale = this_4.pitSiteImgScale[i];
                    var startAlpha = this_4.pitSiteImgAlpha[i];
                    var switchAniTween = void 0;
                    switch (this_4.direction) {
                        case ps.Direction.horizontal: //水平
                            switchAniTween = ps.Tween.to(imgPsite, {
                                x: 0,
                                scaleX: startScale, scaleY: startScale,
                                alpha: startAlpha
                            }, this_4.carouselProcessAniTimer, Phaser.Easing.Sinusoidal.InOut);
                            break;
                        case ps.Direction.vertical: //垂直
                            switchAniTween = ps.Tween.to(imgPsite, {
                                y: 0,
                                scaleX: startScale, scaleY: startScale,
                                alpha: startAlpha
                            }, this_4.carouselProcessAniTimer, Phaser.Easing.Sinusoidal.InOut);
                            break;
                        default:
                            break;
                    }
                    switchAniTween.onComplete.addOnce(function () {
                        imgPsite.interactive = true;
                        if (_this.isCanAutoCarousel && !_this.isPauseCarousel) {
                            _this.startAutoPlayerCarousel();
                        }
                        if (_this.isCanClickCarousel) {
                            _this.nextBth.interactive = _this.lastBth.interactive = true;
                        }
                    });
                };
                var this_4 = this;
                // console.log("返回到中间！");
                for (var i = 0; i < this.pitSiteLlist.length; i++) {
                    var state_1 = _loop_4(i);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            }
        };
        /**
         * 按照资源列表顺序，将图片依次嵌入轮播坑位
         * @param imgId 轮播图片id
         * @param pitSiteNode 轮播坑位
         * @param carouselGroup 轮播组节点
         */
        CarouselGroupControl.prototype.setPitSiteImg = function (imgId, pitSiteNode) {
            pitSiteNode.width = this.pitSiteWidth;
            pitSiteNode.height = this.pitSiteHeight;
            var carouselPitSiteBeh = pitSiteNode.addScript("ps.CarouselPitSite");
            this.pitSiteLlist.push(carouselPitSiteBeh);
            if (imgId >= this.imgCarouselList.length || imgId < 0) {
                imgId = 0;
            }
            var imgCarouselNode = qc_game.add.clone(this.imgCarouselList[imgId], pitSiteNode);
            imgCarouselNode.x = imgCarouselNode.y = 0;
            // 避免平台节点尺寸影响组件消费图片资源 By 莫愁
            imgCarouselNode.width = imgCarouselNode.texture.atlas.img.width;
            imgCarouselNode.height = imgCarouselNode.texture.atlas.img.height;
            var adjustedImgData = ps.CarouselTools.adjustedImgWH(imgCarouselNode, pitSiteNode);
            imgCarouselNode.width = adjustedImgData.adjustedWidth;
            imgCarouselNode.height = adjustedImgData.adjustedHeight;
            carouselPitSiteBeh.setCarouselPitSiteImg(imgCarouselNode, this.carouselGroupBeh);
            //调整坑位层级
            ps.CarouselTools.sortPitSiteLayer(this.piteSiteAllBox, this.direction);
            return carouselPitSiteBeh;
        };
        return CarouselGroupControl;
    }(ps.Behaviour));
    ps.CarouselGroupControl = CarouselGroupControl;
    qc.registerBehaviour("ps.CarouselGroupControl", CarouselGroupControl);
    CarouselGroupControl["__menu"] = "玩法模板/轮播组件/CarouselGroupControl";
})(ps || (ps = {}));
//# sourceMappingURL=CarouselGroupControl.js.map