var PuzzlePieceDrawBorder;
(function (PuzzlePieceDrawBorder) {
    PuzzlePieceDrawBorder.initDrawBorderStyle = function (pContext, pieceComponentData) {
        var pieceBorderStyle = {
            isEnable: true,
            strokeStyle: null,
            lineWidth: null,
            dashLine: null,
            innerShadow: null,
            relief: null,
        };
        pieceBorderStyle = PuzzlePieceDrawBorder.defaultBorderStyle(pieceBorderStyle, pieceComponentData);
        if (pieceComponentData.borderAdvancedSet) {
            for (var key in pieceComponentData.borderAdvancedSet) {
                if (pieceComponentData.borderAdvancedSet.hasOwnProperty(key) && pieceComponentData.borderAdvancedSet[key] !== null)
                    pieceBorderStyle[key] = pieceComponentData.borderAdvancedSet[key];
            }
        }
        return pieceBorderStyle;
    };
    PuzzlePieceDrawBorder.drawBorderStyle = function (pContext, pieceBorderStyle) {
        if (!pieceBorderStyle)
            return;
        if (pieceBorderStyle.isEnable) {
            if (pieceBorderStyle.dashLine)
                pContext.setLineDash([pieceBorderStyle.dashLine.solidSegment, pieceBorderStyle.dashLine.blankSegment]);
            pContext.strokeStyle = pieceBorderStyle.strokeStyle;
            pContext.lineWidth = pieceBorderStyle.lineWidth;
            pContext.stroke();
            if (pieceBorderStyle.innerShadow)
                PuzzlePieceDrawBorder.advancedSet_innerShadow(pContext, pieceBorderStyle);
            if (pieceBorderStyle.relief)
                PuzzlePieceDrawBorder.advancedSet_relief(pContext, pieceBorderStyle);
        }
    };
    PuzzlePieceDrawBorder.defaultBorderStyle = function (pieceBorderStyle, pieceComponentData) {
        switch (pieceComponentData.borderStyle) {
            case 0:
                pieceBorderStyle.strokeStyle = "#000";
                pieceBorderStyle.lineWidth = 1;
                break;
            case 1:
                pieceBorderStyle.strokeStyle = "rgba(0,0,0,.3)";
                pieceBorderStyle.lineWidth = 1;
                pieceBorderStyle.relief = {
                    topShadow: {
                        shadowColor: "#fff",
                        shadowBlur: 2,
                        shadowOffsetX: 1,
                        shadowOffsetY: 1,
                    },
                    bottomShadow: {
                        shadowColor: "#000",
                        shadowBlur: 2,
                        shadowOffsetX: 1,
                        shadowOffsetY: 1,
                    }
                };
                break;
            case 2:
                pieceBorderStyle.strokeStyle = "rgba(0,0,0,.5)";
                pieceBorderStyle.lineWidth = 1;
                pieceBorderStyle.relief = {
                    topShadow: {
                        shadowColor: "#fff",
                        shadowBlur: 2,
                        shadowOffsetX: 1,
                        shadowOffsetY: 1,
                    },
                    bottomShadow: {
                        shadowColor: "#000",
                        shadowBlur: 2,
                        shadowOffsetX: 1,
                        shadowOffsetY: 1,
                    }
                };
                break;
            case 3:
                pieceBorderStyle.strokeStyle = "#000";
                pieceBorderStyle.lineWidth = 3;
                break;
            case 4:
                pieceBorderStyle.strokeStyle = "#fff";
                pieceBorderStyle.lineWidth = 2;
                break;
            case 5:
                pieceBorderStyle.dashLine = {
                    solidSegment: 8,
                    blankSegment: 8,
                };
                pieceBorderStyle.strokeStyle = "#000";
                pieceBorderStyle.lineWidth = 2;
                break;
            case 6:
                pieceBorderStyle.strokeStyle = "#fff";
                pieceBorderStyle.lineWidth = 0.5;
                break;
        }
        return pieceBorderStyle;
    };
    PuzzlePieceDrawBorder.advancedSet_innerShadow = function (pContext, pieceBorderStyle) {
        var _a = pieceBorderStyle.innerShadow, shadowColor = _a.shadowColor, shadowBlur = _a.shadowBlur, shadowOffsetX = _a.shadowOffsetX, shadowOffsetY = _a.shadowOffsetY;
        pContext.shadowColor = shadowColor;
        pContext.shadowOffsetX = shadowOffsetX;
        pContext.shadowOffsetY = shadowOffsetY;
        pContext.shadowBlur = shadowBlur;
        pContext.stroke();
        pContext.shadowColor = shadowColor;
        pContext.shadowOffsetX = -shadowOffsetX;
        pContext.shadowOffsetY = -shadowOffsetY;
        pContext.shadowBlur = shadowBlur;
        pContext.stroke();
    };
    PuzzlePieceDrawBorder.advancedSet_relief = function (pContext, pieceBorderStyle) {
        var _a = pieceBorderStyle.relief, topShadow = _a.topShadow, bottomShadow = _a.bottomShadow;
        pContext.shadowColor = topShadow.shadowColor;
        pContext.shadowOffsetX = topShadow.shadowOffsetX;
        pContext.shadowOffsetY = topShadow.shadowOffsetY;
        pContext.shadowBlur = topShadow.shadowBlur;
        pContext.stroke();
        pContext.shadowColor = bottomShadow.shadowColor;
        pContext.shadowOffsetX = -bottomShadow.shadowOffsetX;
        pContext.shadowOffsetY = -bottomShadow.shadowOffsetY;
        pContext.shadowBlur = bottomShadow.shadowBlur;
        pContext.stroke();
    };
})(PuzzlePieceDrawBorder || (PuzzlePieceDrawBorder = {}));
//# sourceMappingURL=PuzzlePieceDrawBorder.js.map