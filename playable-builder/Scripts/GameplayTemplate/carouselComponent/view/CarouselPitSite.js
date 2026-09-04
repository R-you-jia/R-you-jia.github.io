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
    /**轮播坑位 */
    var CarouselPitSite = /** @class */ (function (_super) {
        __extends(CarouselPitSite, _super);
        function CarouselPitSite(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.serializableFields = {};
            _this._carouselPitSiteId = 0;
            _this.carouselPitSiteImg = null;
            _this.carouselGroupBeh = null;
            return _this;
        }
        Object.defineProperty(CarouselPitSite.prototype, "carouselPitSiteId", {
            get: function () {
                return this._carouselPitSiteId;
            },
            set: function (value) {
                this._carouselPitSiteId = value;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 设置展示位图片的点击事件等等
         * @param imgCarouselNode 展示位资源
         * @param carouselGroupBeh 轮播组脚本
         */
        CarouselPitSite.prototype.setCarouselPitSiteImg = function (imgCarouselNode, carouselGroupBeh) {
            this.carouselGroupBeh = carouselGroupBeh;
            this.carouselPitSiteImg = imgCarouselNode;
            this.carouselPitSiteImg.interactive = true;
            // this.carouselPitSiteImg.onClick.add(() => {
            //     let imgPitsite = this.gameObject.children[0];
            //     this.carouselGroupBeh.deleteCarouselImg(imgPitsite, this.carouselPitSiteId);
            // }, this)
        };
        /**检查展示位的资源信息 */
        CarouselPitSite.prototype.checkDisplayPosImg = function (direction) {
            var cardPos = 0;
            cardPos = this.gameObject.x;
            switch (direction) {
                case ps.Direction.horizontal: //水平
                    cardPos = this.gameObject.x;
                    break;
                case ps.Direction.vertical: //垂直
                    cardPos = this.gameObject.y;
                    break;
                default:
                    break;
            }
            if (cardPos < 0.1 && cardPos > -0.1) {
                var imgPisite = this.gameObject.children[0]; //坑位上的资源
                this.carouselGroupBeh.centerImgUniqueName = imgPisite.uniqueName;
            }
        };
        /**是否禁止轮播图片操作 */
        CarouselPitSite.prototype.isEnableCarouselImg = function (enable) {
            var imgPisite = this.gameObject.children[0];
            imgPisite.interactive = enable;
        };
        /**获得坑位上的图片 */
        CarouselPitSite.prototype.getPitSiteImg = function () {
            var imgPisite = this.gameObject.children[0];
            return imgPisite;
        };
        return CarouselPitSite;
    }(ps.Behaviour));
    ps.CarouselPitSite = CarouselPitSite;
    qc.registerBehaviour("ps.CarouselPitSite", CarouselPitSite);
    CarouselPitSite["__menu"] = "玩法模板/轮播组件/CarouselPitSite";
})(ps || (ps = {}));
//# sourceMappingURL=CarouselPitSite.js.map