/**
 * 拓展工具模块
 */
var ps;
(function (ps) {
    var CarouselTools;
    (function (CarouselTools) {
        /**创建空节点 */
        function createEmptNode(piteSiteAllBox) {
            var pitSiteNode = qc_game.add.node(piteSiteAllBox);
            pitSiteNode.minAnchor.x = 0.5;
            pitSiteNode.minAnchor.y = 0.5;
            pitSiteNode.maxAnchor.x = 0.5;
            pitSiteNode.maxAnchor.y = 0.5;
            pitSiteNode.pivotX = 0.5;
            pitSiteNode.pivotY = 0.5;
            pitSiteNode.anchoredX = pitSiteNode.anchoredY = 0;
            return pitSiteNode;
        }
        CarouselTools.createEmptNode = createEmptNode;
        function sortPitSiteLayer(carouselGroup, direction) {
            var arr = carouselGroup.children.concat();
            switch (direction) {
                case ps.Direction.horizontal: //水平
                    arr.sort(function (a, b) { return Math.abs(b.x) - Math.abs(a.x); });
                    break;
                case ps.Direction.vertical: //垂直
                    arr.sort(function (a, b) { return Math.abs(b.y) - Math.abs(a.y); });
                    break;
                default:
                    break;
            }
            arr.forEach(function (c, i) { return c.parent.setChildIndex(c, i); });
        }
        CarouselTools.sortPitSiteLayer = sortPitSiteLayer;
        function searchimgCarouselIndex(imgPsite, imgCarouselList) {
            var currentImgId = 0;
            for (var i = 0; i < imgCarouselList.length; i++) {
                var img = imgCarouselList[i];
                if (imgPsite.uniqueName == img.uniqueName) {
                    currentImgId = imgCarouselList.indexOf(img);
                    return currentImgId;
                }
            }
        }
        CarouselTools.searchimgCarouselIndex = searchimgCarouselIndex;
        /**
           * 轮播图片以长边适配坑位
           * @param imgNode 轮播元素
           * @param pitSiteNode 坑位
           * @returns
           */
        function adjustedImgWH(imgNode, pitSiteNode) {
            var widthRatio = pitSiteNode.width / imgNode.width;
            var hegihtRatio = pitSiteNode.height / imgNode.height;
            var scaleFactor = Math.min(widthRatio, hegihtRatio);
            var adjustedWidth = imgNode.width * scaleFactor;
            var adjustedHeight = imgNode.height * scaleFactor;
            return { adjustedWidth: adjustedWidth, adjustedHeight: adjustedHeight };
        }
        CarouselTools.adjustedImgWH = adjustedImgWH;
    })(CarouselTools = ps.CarouselTools || (ps.CarouselTools = {}));
})(ps || (ps = {}));
//# sourceMappingURL=CarouselTools.js.map