var PuzzlePieceDrawPath;
(function (PuzzlePieceDrawPath) {
    /**
     * 提取拼图碎块
     * @param col x坐标
     * @param row y坐标
     * @param pieceComponentData 拼图组件的拼图信息
     * @returns
     */
    PuzzlePieceDrawPath.extractPuzzlePiece = function (col, row, pieceComponentData) {
        var pieceNode = pieceComponentData.pieceNode, pieceCanvasSize = pieceComponentData.pieceCanvasSize;
        var puzzleNode = qc_game.add.node(pieceNode);
        puzzleNode.width = puzzleNode.height = pieceCanvasSize;
        puzzleNode.name = "piece_".concat(row, "_").concat(col);
        var puzzleImg = qc_game.add.image(puzzleNode);
        var bmd = game.make.bitmapData(pieceCanvasSize, pieceCanvasSize);
        puzzleImg.width = puzzleImg.height = pieceCanvasSize;
        puzzleImg["phaser"].loadTexture(bmd);
        var pContext = bmd.context;
        var dx = -(col + .5) * pieceComponentData.pieceSize + pieceCanvasSize / 2;
        var dy = -(row + .5) * pieceComponentData.pieceSize + pieceCanvasSize / 2;
        pContext.translate(dx, dy);
        if ((pieceComponentData.shape > 5) && (pieceComponentData.shape < 19)) {
            PuzzlePieceDrawPath.flashDrawPath(pContext, col, row, pieceComponentData);
        }
        else if (pieceComponentData.shape == 19) {
            PuzzlePieceDrawPath.drawSquarePath(pContext, col, row, pieceComponentData);
        }
        else {
            PuzzlePieceDrawPath.drawPath(pContext, col, row, pieceComponentData);
        }
        pContext.lineJoin = "round";
        pContext.clip();
        pContext.drawImage(pieceComponentData.imgNode.texture.atlas.img, -pieceComponentData.imageOffsetH, -pieceComponentData.imageOffsetV, pieceComponentData.imgNode.width, pieceComponentData.imgNode.height);
        PuzzlePieceDrawBorder.drawBorderStyle(pContext, PuzzlePieceDrawBorder.initDrawBorderStyle(pContext, pieceComponentData));
        return { piece: puzzleNode, img: puzzleImg, bmd: bmd };
    };
    PuzzlePieceDrawPath.getPieceShadow = function (color, col, row, pieceBorderStyle, pieceComponentData) {
        var pieceSize = pieceComponentData.pieceSize, pieceCanvasSize = pieceComponentData.pieceCanvasSize, shape = pieceComponentData.shape;
        var shadow = qc_game.add.image();
        shadow.width = shadow.height = pieceCanvasSize + 10;
        var bmd = game.make.bitmapData(pieceCanvasSize, pieceCanvasSize);
        shadow.width = shadow.height = pieceCanvasSize;
        shadow["phaser"].loadTexture(bmd);
        var pContext = bmd.context;
        var dx = -(col + .5) * pieceSize + pieceCanvasSize / 2;
        var dy = -(row + .5) * pieceSize + pieceCanvasSize / 2;
        // pContext.save();
        pContext.translate(dx, dy);
        if ((shape > 5) && (shape < 19)) {
            PuzzlePieceDrawPath.flashDrawPath(pContext, col, row, pieceComponentData);
        }
        else if (shape == 19) {
            PuzzlePieceDrawPath.drawSquarePath(pContext, col, row, pieceComponentData);
        }
        else {
            PuzzlePieceDrawPath.drawPath(pContext, col, row, pieceComponentData);
        }
        pContext.fillStyle = color;
        pContext.fill();
        PuzzlePieceDrawBorder.drawBorderStyle(pContext, pieceBorderStyle);
        return { shadow: shadow, bmd: bmd };
    };
    PuzzlePieceDrawPath.drawPath = function (ctx, col, row, pieceComponentData) {
        ctx.beginPath();
        var pieceSize = pieceComponentData.pieceSize;
        var middlex = (col + .5) * pieceSize;
        var middley = (row + .5) * pieceSize;
        var middle = .5 * pieceSize;
        var left = middlex - pieceSize / 2;
        var topp = middley - pieceSize / 2;
        var right = middlex + pieceSize / 2;
        var bottom = middley + pieceSize / 2;
        if ((col + row) % 2 == 0) {
            PuzzlePieceDrawPath.drawPieceSide(ctx, col, row, "top", "out", 1, pieceComponentData);
            PuzzlePieceDrawPath.drawPieceSide(ctx, col + 1, row, "right", "in", void 0, pieceComponentData);
            PuzzlePieceDrawPath.drawPieceSide(ctx, col, row + 1, "bottom", "out", void 0, pieceComponentData);
            PuzzlePieceDrawPath.drawPieceSide(ctx, col, row, "left", "in", void 0, pieceComponentData);
        }
        else {
            PuzzlePieceDrawPath.drawPieceSide(ctx, col, row, "top", "in", 1, pieceComponentData);
            PuzzlePieceDrawPath.drawPieceSide(ctx, col + 1, row, "right", "out", void 0, pieceComponentData);
            PuzzlePieceDrawPath.drawPieceSide(ctx, col, row + 1, "bottom", "in", void 0, pieceComponentData);
            PuzzlePieceDrawPath.drawPieceSide(ctx, col, row, "left", "out", void 0, pieceComponentData);
        }
    };
    PuzzlePieceDrawPath.drawPieceSide = function (ctx, col, row, side, type, start, pieceComponentData) {
        var piecesH = pieceComponentData.piecesH, piecesV = pieceComponentData.piecesV, shape = pieceComponentData.shape, pieceSize = pieceComponentData.pieceSize, connectorSizeRatio = pieceComponentData.connectorSizeRatio;
        var left = col * pieceSize;
        var topp = row * pieceSize;
        var middle = .5 * pieceSize;
        var sideType = side + type;
        var inout = 1;
        if (sideType == "bottomout" || sideType == "leftin" || sideType == "topin" || sideType == "rightout")
            inout = -1;
        var dir = 1;
        if (sideType == "bottomout" || sideType == "leftin" || sideType == "bottomin" || sideType == "leftout")
            dir = -1;
        var hv = 0;
        if (sideType == "rightin" || sideType == "leftin" || sideType == "rightout" || sideType == "leftout")
            hv = 1;
        var corner = shape * pieceSize / 32;
        var shift = shape * (PuzzlePieceDrawPath.ranNum(col * 7.2 + row * 3.71) * 16 - 8) * pieceSize / 400;
        var bulb1 = (8 + PuzzlePieceDrawPath.ranNum(col * 23 + row * 57 + hv * 9) * 4) * pieceSize / 100;
        var bulb2 = pieceSize * connectorSizeRatio;
        var depth1 = shape * pieceSize / 80;
        var depth2 = shape * pieceSize / 80;
        var depth3 = shape * pieceSize / 80;
        var depth4 = shape * pieceSize / 80;
        var ep0 = [0, 0];
        var cp1a = [depth1, depth2 * inout];
        var cp1b = [middle + depth3, depth4 * inout];
        var ep1 = [middle - bulb1 + shift, 0];
        var cp2a = [middle - bulb2 + shift, -bulb2 * inout];
        var cp2b = [middle + bulb2 + shift, -bulb2 * inout];
        var ep2 = [middle + bulb1 + shift, 0];
        var cp3a = [middle - depth3, depth4 * inout];
        var cp3b = [pieceSize - depth1, depth2 * inout];
        var ep3 = [pieceSize, 0];
        if (hv == 1) {
            cp1a = cp1a.reverse();
            cp1b = cp1b.reverse();
            ep1 = ep1.reverse();
            cp2a = cp2a.reverse();
            cp2b = cp2b.reverse();
            ep2 = ep2.reverse();
            cp3a = cp3a.reverse();
            cp3b = cp3b.reverse();
            ep3 = ep3.reverse();
        }
        ep0[0] += PuzzlePieceDrawPath.ranNum(col * 67 + row * 41) * corner * 2 - corner;
        if ((side == "right" || side == "left"))
            ep3[0] += PuzzlePieceDrawPath.ranNum(col * 67 + (row + 1) * 41) * corner * 2 - corner;
        if ((side == "bottom" || side == "top"))
            ep3[0] += PuzzlePieceDrawPath.ranNum((col + 1) * 67 + row * 41) * corner * 2 - corner;
        if (col == 0 && side == "left")
            ep0[0] = 0;
        if (col == 0 && (side == "bottom" || side == "top"))
            ep0[0] = 0;
        if (col == piecesH && side == "right")
            ep3[0] = pieceSize;
        if (col == piecesH - 1 && (side == "bottom" || side == "top"))
            ep3[0] = pieceSize;
        ep0[1] += PuzzlePieceDrawPath.ranNum(col * 67 + row * 41) * corner * 2 - corner;
        if ((side == "right" || side == "left"))
            ep3[1] += PuzzlePieceDrawPath.ranNum(col * 67 + (row + 1) * 41) * corner * 2 - corner;
        if ((side == "bottom" || side == "top"))
            ep3[1] += PuzzlePieceDrawPath.ranNum((col + 1) * 67 + row * 41) * corner * 2 - corner;
        if (row == 0 && side == "top")
            ep0[1] = 0;
        if (row == 0 && (side == "left" || side == "right"))
            ep0[1] = 0;
        if (row == piecesV && side == "bottom")
            ep3[1] = pieceSize;
        if (row == piecesV - 1 && (side == "left" || side == "right"))
            ep3[1] = pieceSize;
        if (start && dir == 1)
            ctx.moveTo(left + ep0[0], topp + ep0[1]);
        if (start && dir == -1)
            ctx.moveTo(left + ep3[0], topp + ep3[1]);
        if (row == 0 && side == "top") {
            ctx.lineTo(left + ep3[0], topp);
            return;
        }
        if (col == 0 && side == "left") {
            ctx.lineTo(left, topp + ep0[1]);
            return;
        }
        if (row == piecesV && side == "bottom") {
            ctx.lineTo(left + ep0[0], topp);
            return;
        }
        if (col == piecesH && side == "right") {
            ctx.lineTo(left, topp + ep3[1]);
            return;
        }
        if (dir == 1) {
            ctx.bezierCurveTo(left + cp1a[0], topp + cp1a[1], left + cp1b[0], topp + cp1b[1], left + ep1[0], topp + ep1[1]);
            ctx.bezierCurveTo(left + cp2a[0], topp + cp2a[1], left + cp2b[0], topp + cp2b[1], left + ep2[0], topp + ep2[1]);
            ctx.bezierCurveTo(left + cp3a[0], topp + cp3a[1], left + cp3b[0], topp + cp3b[1], left + ep3[0], topp + ep3[1]);
        }
        else if (dir == -1) {
            ctx.bezierCurveTo(left + cp3b[0], topp + cp3b[1], left + cp3a[0], topp + cp3a[1], left + ep2[0], topp + ep2[1]);
            ctx.bezierCurveTo(left + cp2b[0], topp + cp2b[1], left + cp2a[0], topp + cp2a[1], left + ep1[0], topp + ep1[1]);
            ctx.bezierCurveTo(left + cp1b[0], topp + cp1b[1], left + cp1a[0], topp + cp1a[1], left + ep0[0], topp + ep0[1]);
        }
    };
    /**
     * 根据轮廓点数据画出拼图边缘
     * @param ctx cavans的context
     * @param pieceComponentData 拼图组件的拼图信息
     */
    PuzzlePieceDrawPath.flashMakeShapes = function (shapeNum, pieceComponentData) {
        pieceComponentData.corners = [];
        pieceComponentData.horizConnectors = {};
        pieceComponentData.vertConnectors = {};
        var linkRadius;
        var linkOffset;
        /* 拐角的点，如果shape为0则方方正正 */
        for (var y = 0; y <= pieceComponentData.piecesV; y++) {
            for (var x = 0; x <= pieceComponentData.piecesH; x++) {
                var pt = { x: 0, y: 0 };
                if ((x > 0) && (x < pieceComponentData.piecesH)) {
                    pt.x += (PuzzlePieceDrawPath.getRandom(pieceComponentData) * shapeNum * 2 - shapeNum) * (pieceComponentData.pieceSize / 50);
                }
                if ((y > 0) && (y < pieceComponentData.piecesV)) {
                    pt.y += (PuzzlePieceDrawPath.getRandom(pieceComponentData) * shapeNum * 2 - shapeNum) * (pieceComponentData.pieceSize / 50);
                }
                pieceComponentData.corners[x + "," + y] = pt;
            }
        }
        for (var y = 0; y < pieceComponentData.piecesV; y++) {
            for (var x = 0; x < pieceComponentData.piecesH; x++) {
                linkRadius = (PuzzlePieceDrawPath.getRandom(pieceComponentData) - .5) * shapeNum * .02 + .4;
                if (shapeNum == 0)
                    linkRadius = .4;
                linkOffset = 1.0 - linkRadius;
                var yoff = PuzzlePieceDrawPath.getRandom(pieceComponentData) * shapeNum * .03;
                var pts = [];
                pts.push({ x: 0, y: -linkRadius / 2 + yoff });
                for (var i = Math.PI * 20; i <= Math.PI * 180; i += 10) {
                    var px = Math.cos(i * .01) * linkRadius - linkOffset;
                    var py = -Math.sin(i * .01) * linkRadius;
                    pts.push({ x: px, y: py + yoff });
                }
                pts.push({ x: 0, y: linkRadius / 2 + yoff });
                pts.push({ x: 0, y: 0 + yoff });
                pieceComponentData.horizConnectors[x + "," + y] = pts;
            }
        }
        for (var y = 0; y < pieceComponentData.piecesV; y++) {
            for (var x = 0; x < pieceComponentData.piecesH; x++) {
                linkRadius = (PuzzlePieceDrawPath.getRandom(pieceComponentData) - .5) * shapeNum * .02 + .4;
                linkOffset = 1.0 - linkRadius;
                if (shapeNum == 0)
                    linkRadius = .4;
                var xoff = PuzzlePieceDrawPath.getRandom(pieceComponentData) * shapeNum * .03;
                var pts = [];
                pts.push({ x: linkRadius / 2 + xoff, y: 0 });
                for (var i = Math.PI * 20; i <= Math.PI * 180; i += 10) {
                    var py = -Math.cos(i * .01) * linkRadius + linkOffset;
                    var px = Math.sin(i * .01) * linkRadius;
                    pts.push({ x: px + xoff, y: py });
                }
                pts.push({ x: -linkRadius / 2 + xoff, y: 0 });
                pts.push({ x: 0 + xoff, y: 0 });
                pieceComponentData.vertConnectors[x + "," + y] = pts;
            }
        }
        // console.log("testSAAA", pieceComponentData.corners, pieceComponentData.horizConnectors, pieceComponentData.vertConnectors);
    };
    /**
     * 根据轮廓点数据画出拼图边缘
     * @param ctx cavans的context
     * @param x x坐标
     * @param y y坐标
     * @param pieceComponentData 拼图组件的拼图信息
     */
    PuzzlePieceDrawPath.flashDrawPath = function (ctx, x, y, pieceComponentData) {
        var pieceSize = pieceComponentData.pieceSize, piecesH = pieceComponentData.piecesH, piecesV = pieceComponentData.piecesV, corners = pieceComponentData.corners, vertConnectors = pieceComponentData.vertConnectors, horizConnectors = pieceComponentData.horizConnectors, connectorSizeRatio = pieceComponentData.connectorSizeRatio;
        ctx.beginPath();
        var linkSize = pieceSize * connectorSizeRatio; //定义连接部分大小的变量
        var xoff = x * pieceSize;
        var yoff = y * pieceSize;
        var topConnectorInfo = { x: x, y: y - 1, connectors: vertConnectors["".concat(x, ",").concat(y - 1)] };
        var bottomConnectorInfo = { x: x, y: y, connectors: vertConnectors["".concat(x, ",").concat(y)] };
        var rightConnectorInfo = { x: x, y: y, connectors: horizConnectors["".concat(x, ",").concat(y)] };
        var leftConnectorInfo = { x: x - 1, y: y, connectors: horizConnectors["".concat(x - 1, ",").concat(y)] };
        // /* 拐点坐标，以左上角为准 */
        // const corners = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }];
        ctx.moveTo(corners[x + "," + y].x + xoff, corners[x + "," + y].y + yoff);
        /* 上面 */
        if (y > 0) {
            for (var i = topConnectorInfo.connectors.length - 2; i >= 0; i--) {
                var xx = topConnectorInfo.connectors[i].x * linkSize;
                var yy = topConnectorInfo.connectors[i].y * linkSize;
                if ((topConnectorInfo.x % 2) == 1) {
                    yy = -yy;
                }
                if ((topConnectorInfo.y % 2) == 1) {
                    yy = -yy;
                }
                ctx.lineTo(xx + pieceSize / 2 + xoff, yy + yoff);
            }
        }
        ctx.lineTo(corners[(x + 1) + "," + y].x + pieceSize + xoff, corners[(x + 1) + "," + y].y + yoff);
        /* 右边 */
        if (x < piecesH - 1) {
            for (var i = 0; i < rightConnectorInfo.connectors.length - 1; i++) {
                var xx = rightConnectorInfo.connectors[i].x * linkSize;
                var yy = rightConnectorInfo.connectors[i].y * linkSize;
                if ((rightConnectorInfo.y % 2) == 0) {
                    xx = -xx;
                }
                if ((rightConnectorInfo.x % 2) == 0) {
                    xx = -xx;
                }
                ctx.lineTo(xx + pieceSize + xoff, yy + pieceSize / 2 + yoff);
            }
        }
        ctx.lineTo(corners[(x + 1) + "," + (y + 1)].x + pieceSize + xoff, corners[(x + 1) + "," + (y + 1)].y + pieceSize + yoff);
        /* 下面 */
        if (y < piecesV - 1) {
            for (var i = 0; i < bottomConnectorInfo.connectors.length - 1; i++) {
                var xx = bottomConnectorInfo.connectors[i].x * linkSize;
                var yy = bottomConnectorInfo.connectors[i].y * linkSize;
                if ((bottomConnectorInfo.x % 2) == 0) {
                    yy = -yy;
                }
                if ((bottomConnectorInfo.y % 2) == 0) {
                    yy = -yy;
                }
                ctx.lineTo(xx + pieceSize / 2 + xoff, yy + pieceSize + yoff);
            }
        }
        ctx.lineTo(corners[x + "," + (y + 1)].x + xoff, corners[x + "," + (y + 1)].y + pieceSize + yoff);
        /* 左边 */
        if (x > 0) {
            for (var i = leftConnectorInfo.connectors.length - 2; i >= 0; i--) {
                var xx = leftConnectorInfo.connectors[i].x * linkSize;
                var yy = leftConnectorInfo.connectors[i].y * linkSize;
                if ((leftConnectorInfo.y % 2) == 1) {
                    xx = -xx;
                }
                if ((leftConnectorInfo.x % 2) == 1) {
                    xx = -xx;
                }
                ctx.lineTo(xx + xoff, yy + pieceSize / 2 + yoff);
            }
        }
        ctx.lineTo(corners[x + "," + y].x + xoff, corners[x + "," + y].y + yoff);
    };
    /**
     *
     * @param ctx cavans的context
     * @param x x坐标
     * @param y y坐标
     * @param pieceComponentData 拼图组件的拼图信息
     */
    PuzzlePieceDrawPath.drawSquarePath = function (ctx, x, y, pieceComponentData) {
        ctx.beginPath();
        var pieceSize = pieceComponentData.pieceSize;
        var middlex = (x + .5) * pieceSize;
        var middley = (y + .5) * pieceSize;
        var middle = .5 * pieceSize;
        var left = middlex - pieceSize / 2;
        var topp = middley - pieceSize / 2;
        var right = middlex + pieceSize / 2;
        var bottom = middley + pieceSize / 2;
        ctx.moveTo(left, topp);
        ctx.lineTo(right, topp);
        ctx.lineTo(right, bottom);
        ctx.lineTo(left, bottom);
        ctx.lineTo(left, topp);
    };
    /**
     * 获取随机数
     * @param pieceComponentData 拼图组件的拼图信息
     * @returns
     */
    PuzzlePieceDrawPath.getRandom = function (pieceComponentData) {
        if (pieceComponentData.shape == 0) {
            return .5;
        }
        else {
            var newSeed = Math.floor((((pieceComponentData.seed * 7 + 12) * 89) / 3 + 43) * 41) % 1000000;
            pieceComponentData.seed = newSeed;
            return Number(pieceComponentData.seed * .000001);
        }
    };
    PuzzlePieceDrawPath.ranNum = function (newSeed) {
        return (newSeed * 9301 + 49297) % 233280 / 233280;
    };
})(PuzzlePieceDrawPath || (PuzzlePieceDrawPath = {}));
//# sourceMappingURL=PuzzlePieceDrawPath.js.map