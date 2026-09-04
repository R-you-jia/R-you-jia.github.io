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
    /**常规轮播 */
    var GeneralCarouselUi = /** @class */ (function (_super) {
        __extends(GeneralCarouselUi, _super);
        function GeneralCarouselUi(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            /** 序列化 */
            _this.serializableFields = {};
            return _this;
        }
        /**
         * 常规轮播外表ui
         * @param piteSiteAllBox 坑位父节点节点
         * @param carouselGroupBeh 轮播组脚本
         * @param pitSiteSingleNumber 单边坑位数
         * @param pitSiteinterval  坑位间隔值
         * @param direction 排列方向
         * @param imgCarouselList 资源列表
         */
        GeneralCarouselUi.prototype.normalCarouselUi = function (carouselGroupBeh, piteSiteAllBox, pitSiteSingleNumber, pitSiteinterval, direction, imgCarouselList, _scaleDecrease, _alphaDecrease) {
            var scaleDecrease = _scaleDecrease;
            var alphaDecrease = _alphaDecrease;
            if (Number.isNaN(scaleDecrease)) {
                scaleDecrease = 0;
            }
            if (Number.isNaN(alphaDecrease)) {
                alphaDecrease = 0;
            }
            for (var i = 0; i <= pitSiteSingleNumber; i++) {
                var offsetX = pitSiteinterval * i;
                var rightPitSiteX = offsetX;
                if (i == 0) { //中间坑位
                    var pitSiteMiddleNode = ps.CarouselTools.createEmptNode(piteSiteAllBox);
                    carouselGroupBeh.setPitSiteImg(i, pitSiteMiddleNode);
                    pitSiteMiddleNode.x = 0;
                    pitSiteMiddleNode.y = 0;
                    pitSiteMiddleNode.name = ' pitSiteMiddle';
                }
                else { //右边坑位
                    var pitSiteRightNode = ps.CarouselTools.createEmptNode(piteSiteAllBox);
                    switch (direction) {
                        case ps.Direction.horizontal: //水平
                            pitSiteRightNode.y = 0 + 0.1;
                            pitSiteRightNode.x = rightPitSiteX + 0.1;
                            break;
                        case ps.Direction.vertical: //垂直
                            pitSiteRightNode.x = 0 + 0.1;
                            pitSiteRightNode.y = rightPitSiteX + 0.1;
                            ;
                            break;
                        default:
                            break;
                    }
                    var carouselPitSiteBeh = carouselGroupBeh.setPitSiteImg(i, pitSiteRightNode);
                    var img = carouselPitSiteBeh.getPitSiteImg();
                    img.scaleX = img.scaleY = 1 - scaleDecrease * i;
                    img.alpha = 1 - alphaDecrease * i;
                    pitSiteRightNode.name = ' pitSiteRightNode' + i;
                }
            }
            for (var i = pitSiteSingleNumber; i > 0; i--) { // 左边坑位
                var offsetX = pitSiteinterval * i;
                var leftPitSiteX = -offsetX;
                var pitSiteLeftNode = ps.CarouselTools.createEmptNode(piteSiteAllBox);
                switch (direction) {
                    case ps.Direction.horizontal: //水平
                        pitSiteLeftNode.y = 0 + 0.1;
                        pitSiteLeftNode.x = leftPitSiteX + 0.1;
                        break;
                    case ps.Direction.vertical: //垂直
                        pitSiteLeftNode.x = 0 + 0.1;
                        pitSiteLeftNode.y = leftPitSiteX + 0.1;
                        break;
                    default:
                        break;
                }
                var carouselPitSiteBeh = carouselGroupBeh.setPitSiteImg(imgCarouselList.length - i, pitSiteLeftNode);
                var img = carouselPitSiteBeh.getPitSiteImg();
                img.scaleX = img.scaleY = 1 - scaleDecrease * i;
                img.alpha = 1 - alphaDecrease * i;
                pitSiteLeftNode.name = ' pitSiteLeftNode' + i;
            }
        };
        /**
      * 原地缩放轮播ui
      * @param piteSiteAllBox 坑位父节点节点
      * @param carouselGroupBeh 轮播组脚本
      * @param pitSiteSingleNumber 单边坑位数
      * @param pitSiteinterval  坑位间隔值
      * @param direction 排列方向
      * @param imgCarouselList 资源列表
      */
        GeneralCarouselUi.prototype.PulseScaleCarousel = function (carouselGroupBeh, piteSiteAllBox, pitSiteSingleNumber, pitSiteinterval, direction, imgCarouselList, _scaleDecrease, _alphaDecrease) {
            var scaleDecrease = _scaleDecrease;
            var alphaDecrease = _alphaDecrease;
            if (Number.isNaN(scaleDecrease)) {
                scaleDecrease = 0;
            }
            if (Number.isNaN(alphaDecrease)) {
                alphaDecrease = 0;
            }
            for (var i = 0; i <= pitSiteSingleNumber; i++) {
                var offsetX = pitSiteinterval * i;
                var rightPitSiteX = offsetX;
                if (i == 0) { //中间坑位
                    var pitSiteMiddleNode = ps.CarouselTools.createEmptNode(piteSiteAllBox);
                    carouselGroupBeh.setPitSiteImg(i, pitSiteMiddleNode);
                    pitSiteMiddleNode.x = 0;
                    pitSiteMiddleNode.y = 0;
                    pitSiteMiddleNode.name = ' pitSiteMiddle';
                }
                else { //右边坑位
                    var pitSiteRightNode = ps.CarouselTools.createEmptNode(piteSiteAllBox);
                    switch (direction) {
                        case ps.Direction.horizontal: //水平
                            pitSiteRightNode.y = 0 + 0.1;
                            pitSiteRightNode.x = rightPitSiteX + 0.1;
                            break;
                        case ps.Direction.vertical: //垂直
                            pitSiteRightNode.x = 0 + 0.1;
                            pitSiteRightNode.y = rightPitSiteX + 0.1;
                            break;
                        default:
                            break;
                    }
                    var carouselPitSiteBeh = carouselGroupBeh.setPitSiteImg(i, pitSiteRightNode);
                    var img = carouselPitSiteBeh.getPitSiteImg();
                    img.scaleX = img.scaleY = 1 - scaleDecrease * i;
                    img.alpha = 1 - alphaDecrease * i;
                    pitSiteRightNode.name = ' pitSiteRightNode' + i;
                }
            }
            for (var i = pitSiteSingleNumber; i > 0; i--) { // 左边坑位
                var offsetX = pitSiteinterval * i;
                var leftPitSiteX = -offsetX;
                var pitSiteLeftNode = ps.CarouselTools.createEmptNode(piteSiteAllBox);
                switch (direction) {
                    case ps.Direction.horizontal: //水平
                        pitSiteLeftNode.y = 0 + 0.1;
                        pitSiteLeftNode.x = leftPitSiteX + 0.1;
                        break;
                    case ps.Direction.vertical: //垂直
                        pitSiteLeftNode.x = 0 + 0.1;
                        pitSiteLeftNode.y = leftPitSiteX + 0.1;
                        break;
                    default:
                        break;
                }
                var carouselPitSiteBeh = carouselGroupBeh.setPitSiteImg(imgCarouselList.length - i, pitSiteLeftNode);
                var img = carouselPitSiteBeh.getPitSiteImg();
                img.scaleX = img.scaleY = 1 - scaleDecrease * i;
                img.alpha = 1 - alphaDecrease * i;
                pitSiteLeftNode.name = ' pitSiteLeftNode' + i;
            }
        };
        /**
         * 滚动缩放轮播
         * @param piteSiteAllBox
         * @param pitSiteSingleNumber
         * @param pitSiteinterval
         * @param direction
         * @param imgCarouselList
         */
        GeneralCarouselUi.prototype.rollScaleCarousel = function (carouselGroupBeh, piteSiteAllBox, pitSiteSingleNumber, pitSiteinterval, direction, imgCarouselList, _scaleDecrease, _alphaDecrease) {
            var scaleDecrease = _scaleDecrease;
            var alphaDecrease = _alphaDecrease;
            if (Number.isNaN(scaleDecrease)) {
                scaleDecrease = 0;
            }
            if (Number.isNaN(alphaDecrease)) {
                alphaDecrease = 0;
            }
            for (var i = 0; i <= pitSiteSingleNumber; i++) {
                var offsetX = pitSiteinterval * i;
                var rightPitSiteX = offsetX;
                if (i == 0) { //中间坑位
                    var pitSiteMiddleNode = ps.CarouselTools.createEmptNode(piteSiteAllBox);
                    carouselGroupBeh.setPitSiteImg(i, pitSiteMiddleNode);
                    pitSiteMiddleNode.x = 0;
                    pitSiteMiddleNode.y = 0;
                    pitSiteMiddleNode.name = ' pitSiteMiddle';
                }
                else { //右边坑位
                    var pitSiteRightNode = ps.CarouselTools.createEmptNode(piteSiteAllBox);
                    switch (direction) {
                        case ps.Direction.horizontal: //水平
                            pitSiteRightNode.y = 0 + 0.1;
                            pitSiteRightNode.x = rightPitSiteX + 0.1;
                            break;
                        case ps.Direction.vertical: //垂直
                            pitSiteRightNode.x = 0 + 0.1;
                            pitSiteRightNode.y = rightPitSiteX + 0.1;
                            break;
                        default:
                            break;
                    }
                    var carouselPitSiteBeh = carouselGroupBeh.setPitSiteImg(i, pitSiteRightNode);
                    var img = carouselPitSiteBeh.getPitSiteImg();
                    img.scaleX = img.scaleY = 1 - scaleDecrease * i;
                    img.alpha = 1 - alphaDecrease * i;
                    pitSiteRightNode.name = ' pitSiteRightNode' + i;
                }
            }
            for (var i = pitSiteSingleNumber; i > 0; i--) { // 左边坑位
                var offsetX = pitSiteinterval * i;
                var leftPitSiteX = -offsetX;
                var pitSiteLeftNode = ps.CarouselTools.createEmptNode(piteSiteAllBox);
                switch (direction) {
                    case ps.Direction.horizontal: //水平
                        pitSiteLeftNode.y = 0 + 0.1;
                        pitSiteLeftNode.x = leftPitSiteX + 0.1;
                        break;
                    case ps.Direction.vertical: //垂直
                        pitSiteLeftNode.x = 0 + 0.1;
                        pitSiteLeftNode.y = leftPitSiteX + 0.1;
                        break;
                    default:
                        break;
                }
                var carouselPitSiteBeh = carouselGroupBeh.setPitSiteImg(imgCarouselList.length - i, pitSiteLeftNode);
                var img = carouselPitSiteBeh.getPitSiteImg();
                img.scaleX = img.scaleY = 1 - scaleDecrease * i;
                img.alpha = 1 - alphaDecrease * i;
                pitSiteLeftNode.name = ' pitSiteLeftNode' + i;
            }
        };
        /**
       * 透明度轮播
       * @param piteSiteAllBox
       * @param pitSiteSingleNumber
       * @param pitSiteinterval
       * @param direction
       * @param imgCarouselList
       */
        GeneralCarouselUi.prototype.opacityCarousel = function (carouselGroupBeh, piteSiteAllBox, pitSiteSingleNumber, pitSiteinterval, direction, imgCarouselList, _scaleDecrease, _alphaDecrease) {
            var scaleDecrease = _scaleDecrease;
            var alphaDecrease = _alphaDecrease;
            if (Number.isNaN(alphaDecrease)) {
                alphaDecrease = 0;
            }
            if (Number.isNaN(alphaDecrease)) {
                alphaDecrease = 0;
            }
            for (var i = 0; i <= pitSiteSingleNumber; i++) {
                var offsetX = pitSiteinterval * i;
                var rightPitSiteX = offsetX;
                if (i == 0) { //中间坑位
                    var pitSiteMiddleNode = ps.CarouselTools.createEmptNode(piteSiteAllBox);
                    carouselGroupBeh.setPitSiteImg(i, pitSiteMiddleNode);
                    pitSiteMiddleNode.x = 0;
                    pitSiteMiddleNode.y = 0;
                    pitSiteMiddleNode.name = ' pitSiteMiddle';
                }
                else { //右边坑位
                    var pitSiteRightNode = ps.CarouselTools.createEmptNode(piteSiteAllBox);
                    switch (direction) {
                        case ps.Direction.horizontal: //水平
                            pitSiteRightNode.y = 0 + 0.1;
                            pitSiteRightNode.x = rightPitSiteX + 0.1;
                            break;
                        case ps.Direction.vertical: //垂直
                            pitSiteRightNode.x = 0 + 0.1;
                            pitSiteRightNode.y = rightPitSiteX + 0.1;
                            break;
                        default:
                            break;
                    }
                    var carouselPitSiteBeh = carouselGroupBeh.setPitSiteImg(i, pitSiteRightNode);
                    var img = carouselPitSiteBeh.getPitSiteImg();
                    img.scaleX = img.scaleY = 1 - scaleDecrease * i;
                    img.alpha = 1 - alphaDecrease * i;
                    pitSiteRightNode.name = ' pitSiteRightNode' + i;
                }
            }
            for (var i = pitSiteSingleNumber; i > 0; i--) { // 左边坑位
                var offsetX = pitSiteinterval * i;
                var leftPitSiteX = -offsetX;
                var pitSiteLeftNode = ps.CarouselTools.createEmptNode(piteSiteAllBox);
                switch (direction) {
                    case ps.Direction.horizontal: //水平
                        pitSiteLeftNode.y = 0 + 0.1;
                        pitSiteLeftNode.x = leftPitSiteX + 0.1;
                        break;
                    case ps.Direction.vertical: //垂直
                        pitSiteLeftNode.x = 0 + 0.1;
                        pitSiteLeftNode.y = leftPitSiteX + 0.1;
                        break;
                    default:
                        break;
                }
                var carouselPitSiteBeh = carouselGroupBeh.setPitSiteImg(imgCarouselList.length - i, pitSiteLeftNode);
                var img = carouselPitSiteBeh.getPitSiteImg();
                img.scaleX = img.scaleY = 1 - scaleDecrease * i;
                img.alpha = 1 - alphaDecrease * i;
                pitSiteLeftNode.name = ' pitSiteLeftNode' + i;
            }
        };
        /**
         * 渐隐缩放轮播
         * @param piteSiteAllBox
         * @param pitSiteSingleNumber
         * @param pitSiteinterval
         * @param direction
         * @param imgCarouselList
         * @param alphaMaxMin_OpacitScale
         * @param scaleMaxMin_OpacitScale
         */
        GeneralCarouselUi.prototype.opacitScaleyCarousel = function (carouselGroupBeh, piteSiteAllBox, pitSiteSingleNumber, pitSiteinterval, direction, imgCarouselList, _scaleDecrease, _alphaDecrease) {
            var scaleDecrease = _scaleDecrease;
            var alphaDecrease = _alphaDecrease;
            if (Number.isNaN(alphaDecrease)) {
                alphaDecrease = 0;
            }
            if (Number.isNaN(scaleDecrease)) {
                scaleDecrease = 0;
            }
            for (var i = 0; i <= pitSiteSingleNumber; i++) {
                var offsetX = pitSiteinterval * i;
                var rightPitSiteX = offsetX;
                if (i == 0) { //中间坑位
                    var pitSiteMiddleNode = ps.CarouselTools.createEmptNode(piteSiteAllBox);
                    pitSiteMiddleNode.x = 0;
                    pitSiteMiddleNode.y = 0;
                    carouselGroupBeh.setPitSiteImg(i, pitSiteMiddleNode);
                    pitSiteMiddleNode.name = ' pitSiteMiddle';
                }
                else { //右边坑位
                    var pitSiteRightNode = ps.CarouselTools.createEmptNode(piteSiteAllBox);
                    switch (direction) {
                        case ps.Direction.horizontal: //水平
                            pitSiteRightNode.y = 0 + 0.1;
                            pitSiteRightNode.x = rightPitSiteX + 0.1;
                            break;
                        case ps.Direction.vertical: //垂直
                            pitSiteRightNode.x = 0 + 0.1;
                            pitSiteRightNode.y = rightPitSiteX + 0.1;
                            break;
                        default:
                            break;
                    }
                    var carouselPitSiteBeh = carouselGroupBeh.setPitSiteImg(i, pitSiteRightNode);
                    var img = carouselPitSiteBeh.getPitSiteImg();
                    img.scaleX = img.scaleY = 1 - scaleDecrease * i;
                    img.alpha = 1 - alphaDecrease * i;
                    pitSiteRightNode.name = ' pitSiteRightNode' + i;
                }
            }
            for (var i = pitSiteSingleNumber; i > 0; i--) { // 左边坑位
                var offsetX = pitSiteinterval * i;
                var leftPitSiteX = -offsetX;
                var pitSiteLeftNode = ps.CarouselTools.createEmptNode(piteSiteAllBox);
                switch (direction) {
                    case ps.Direction.horizontal: //水平
                        pitSiteLeftNode.y = 0 + 0.1;
                        pitSiteLeftNode.x = leftPitSiteX + 0.1;
                        break;
                    case ps.Direction.vertical: //垂直
                        pitSiteLeftNode.x = 0 + 0.1;
                        pitSiteLeftNode.y = leftPitSiteX + 0.1;
                        break;
                    default:
                        break;
                }
                var carouselPitSiteBeh = carouselGroupBeh.setPitSiteImg(imgCarouselList.length - i, pitSiteLeftNode);
                var img = carouselPitSiteBeh.getPitSiteImg();
                img.scaleX = img.scaleY = 1 - scaleDecrease * i;
                img.alpha = 1 - alphaDecrease * i;
                pitSiteLeftNode.name = ' pitSiteLeftNode' + i;
            }
        };
        return GeneralCarouselUi;
    }(ps.Behaviour));
    ps.GeneralCarouselUi = GeneralCarouselUi;
    qc.registerBehaviour("ps.GeneralCarouselUi", GeneralCarouselUi);
    GeneralCarouselUi["__menu"] = "玩法模板/轮播组件/GeneralCarouselUi";
})(ps || (ps = {}));
//# sourceMappingURL=GeneralCarouselUi.js.map