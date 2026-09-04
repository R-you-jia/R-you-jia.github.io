var PuzzleDefs;
(function (PuzzleDefs) {
    // export const PiecesArr = [200, 150, 120, 100, 80, 50, 20];
    PuzzleDefs.PiecesArr = [10, 20, 50, 80, 120];
    var PuzzleComponentEvent;
    (function (PuzzleComponentEvent) {
        PuzzleComponentEvent["onDown"] = "onDown";
    })(PuzzleComponentEvent = PuzzleDefs.PuzzleComponentEvent || (PuzzleDefs.PuzzleComponentEvent = {}));
    PuzzleDefs.PieceComponentData = {
        imgNode: null,
        tableNode: null,
        pieceNode: null,
        topShadowNode: null,
        topBorderNode: null,
        bottomShadowNode: null,
        shape: 0,
        borderStyle: 0,
        borderAdvancedSet: null,
        piecesNum: 0,
        imageScale: 0,
        pieceSize: 1,
        linkSize: 10,
        piecesH: 0,
        piecesV: 0,
        seed: 42,
        pieceCanvasSize: 0,
        pieceSpacingSize: 0,
        imageOffsetH: 0,
        imageOffsetV: 0,
        connectorSizeRatio: 1 / 3,
        corners: {},
        horizConnectors: {},
        vertConnectors: {},
    };
})(PuzzleDefs || (PuzzleDefs = {}));
//# sourceMappingURL=PuzzleDefs.js.map