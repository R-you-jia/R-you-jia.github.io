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
     * @date 2024/06/11 15:11:05
     */
    var PuzzleComponent = /** @class */ (function (_super) {
        __extends(PuzzleComponent, _super);
        function PuzzleComponent(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this._isTest = false;
            _this._event = new ps.EventDispatcher();
            _this._piecesNum = 0;
            _this._shapeType = 0;
            _this._borderType = 0;
            _this._borderAdvancedSet = null;
            _this._puzzlePiecesGroupSet = [];
            _this._pieceComponentData = JSON.parse(JSON.stringify(PuzzleDefs.PieceComponentData));
            _this._pieceArr = [];
            _this._pieces = [];
            _this.psConfig = null;
            /** 序列化 */
            _this.serializableFields = {
                puzzleImg: qc.Serializer.NODE,
                piecesNum: qc.Serializer.NUMBER,
                shapeType: qc.Serializer.NUMBER,
                borderType: qc.Serializer.NUMBER,
                borderAdvancedSet: qc.Serializer.MAPPING,
                puzzlePiecesGroupSet: qc.Serializer.MAPPING,
                psConfig: qc.Serializer.MAPPING,
            };
            _this.runInEditor = true;
            return _this;
        }
        Object.defineProperty(PuzzleComponent.prototype, "event", {
            get: function () {
                return this._event;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzleComponent.prototype, "piecesNum", {
            get: function () {
                return this._piecesNum;
            },
            set: function (v) {
                this._piecesNum = v;
                this._pieceComponentData.pieceSize = PuzzleDefs.PieceComponentData.pieceSize;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzleComponent.prototype, "shapeType", {
            get: function () {
                return this._shapeType;
            },
            set: function (v) {
                this._shapeType = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzleComponent.prototype, "borderType", {
            get: function () {
                return this._borderType;
            },
            set: function (v) {
                this._borderType = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzleComponent.prototype, "borderAdvancedSet", {
            get: function () {
                return this._borderAdvancedSet;
            },
            set: function (v) {
                this._borderAdvancedSet = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PuzzleComponent.prototype, "puzzlePiecesGroupSet", {
            get: function () {
                return this._puzzlePiecesGroupSet;
            },
            set: function (v) {
                this._puzzlePiecesGroupSet = v;
            },
            enumerable: false,
            configurable: true
        });
        PuzzleComponent.prototype.awake = function () {
            if (!this.puzzleImg || !this.puzzleImg.texture)
                return;
            this.puzzleImg.visible = false;
            this.deploy();
        };
        PuzzleComponent.prototype.onStart = function () {
            this.puzzleImg.visible = false;
            this.deploy();
        };
        PuzzleComponent.prototype.deploy = function () {
            if (this._isTest) {
                /* 测试数据 */
                this._piecesNum = 0;
                this._shapeType = 2;
                this._borderType = 0;
                this._borderAdvancedSet = {
                    isEnable: true,
                    strokeStyle: null,
                    lineWidth: null,
                    dashLine: null,
                    innerShadow: null,
                    relief: {
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
                    }
                };
                this._puzzlePiecesGroupSet = [
                    {
                        name: "挖空块",
                        nameEn: "挖空块",
                        id: "不知道",
                        posArr: [{ col: 0, row: 0 }],
                        topColor: "$000",
                        bottomColor: "#fff",
                        borderStyle: {
                            isEnable: true,
                            strokeStyle: null,
                            lineWidth: null,
                            dashLine: null,
                            innerShadow: null,
                            relief: {
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
                            }
                        }
                    }
                ];
            }
            this._pieceComponentData.tableNode = this.gameObject.getChild("tableNode");
            if (this._pieceComponentData.tableNode) {
                this._pieceComponentData.tableNode.removeChildren();
            }
            else {
                this._pieceComponentData.tableNode = qc_game.add.node(this.gameObject);
            }
            this._pieceComponentData.bottomShadowNode = qc_game.add.node(this._pieceComponentData.tableNode);
            this._pieceComponentData.pieceNode = qc_game.add.node(this._pieceComponentData.tableNode);
            this._pieceComponentData.topShadowNode = qc_game.add.node(this._pieceComponentData.tableNode);
            this._pieceComponentData.topBorderNode = qc_game.add.node(this._pieceComponentData.tableNode);
            this._pieceComponentData.imgNode = this.puzzleImg;
            this._pieceComponentData.tableNode.name = "tableNode";
            this._pieceComponentData.bottomShadowNode.name = "bottomShadowNode";
            this._pieceComponentData.pieceNode.name = "pieceNode";
            this._pieceComponentData.topShadowNode.name = "topShadowNode";
            this._pieceComponentData.topBorderNode.name = "topBorderNode";
            this._pieceComponentData.borderAdvancedSet = this._borderAdvancedSet;
            this._pieceComponentData.piecesNum = this._piecesNum;
            var maxPieces = PuzzleDefs.PiecesArr[this._pieceComponentData.piecesNum];
            this._pieceComponentData.pieceSize = 1;
            while (true) {
                this._pieceComponentData.piecesH = Math.floor(this.puzzleImg.width / this._pieceComponentData.pieceSize);
                this._pieceComponentData.piecesV = Math.floor(this.puzzleImg.height / this._pieceComponentData.pieceSize);
                if (this._pieceComponentData.piecesH * this._pieceComponentData.piecesV < maxPieces)
                    break;
                this._pieceComponentData.pieceSize++;
            }
            this._pieceComponentData.pieceSize = Math.floor(Math.min(this.puzzleImg.width / this._pieceComponentData.piecesH, this.puzzleImg.height / this._pieceComponentData.piecesV));
            this._pieceComponentData.pieceCanvasSize = this._pieceComponentData.pieceSize * 1.7;
            this._pieceComponentData.pieceSpacingSize = this._pieceComponentData.pieceSize * 1.32;
            this._pieceComponentData.imageOffsetH = (this.puzzleImg.width - this._pieceComponentData.piecesH * this._pieceComponentData.pieceSize) / 2;
            this._pieceComponentData.imageOffsetV = (this.puzzleImg.height - this._pieceComponentData.piecesV * this._pieceComponentData.pieceSize) / 2;
            // console.log("pieceCanvasSize:", this._pieceComponentData.pieceCanvasSize, this._pieceComponentData.imageOffsetH, this._pieceComponentData.imageOffsetV)
            switch (this._shapeType) {
                case 0:
                    this._pieceComponentData.shape = 0;
                    break;
                case 1:
                    this._pieceComponentData.shape = 5;
                    break;
                case 2:
                    this._pieceComponentData.shape = 6;
                    PuzzlePieceDrawPath.flashMakeShapes(this._pieceComponentData.shape - 6, this._pieceComponentData);
                    break;
                case 3:
                    this._pieceComponentData.shape = 18;
                    PuzzlePieceDrawPath.flashMakeShapes(this._pieceComponentData.shape - 6, this._pieceComponentData);
                    break;
                case 4:
                    this._pieceComponentData.shape = 19;
                    break;
            }
            this._pieceComponentData.borderStyle = this._borderType;
            for (var row = 0; row < this._pieceComponentData.piecesV; row++) {
                this._pieceArr[row] = [];
                for (var col = 0; col < this._pieceComponentData.piecesH; col++) {
                    var puzzlePieceInfo = this.getPuzzlePiece(col, row, this._pieceComponentData);
                    this._pieceArr[row][col] = puzzlePieceInfo;
                }
            }
            this.game.input.onPointerDown.add(this.onPointerDown, this);
            // this._event.add(PuzzleDefs.PuzzleComponentEvent.onDown, (lobalPoint: qc.Point, puzzlePieceInfo: ps.PuzzlePieceInfo) => {
            //     if (!puzzlePieceInfo) return;
            //     if (!puzzlePieceInfo.topShadowInfo) {
            //         puzzlePieceInfo.topShadowInfo = { color: "#fff", offset: new qc.Point(0, 0) };
            //     } else {
            //         puzzlePieceInfo.topShadowInfo = null;
            //     }
            // })
        };
        PuzzleComponent.prototype.onPointerDown = function (id, x, y) {
            var globalPoint = new qc.Point(x, y);
            var puzzlePieceInfo = this.checkPuzzlePiecePixel(globalPoint);
            this._event.dispatch(PuzzleDefs.PuzzleComponentEvent.onDown, globalPoint, puzzlePieceInfo);
        };
        PuzzleComponent.prototype.getPuzzlePiece = function (col, row, pieceComponentData) {
            var imgNode = pieceComponentData.imgNode, pieceNode = pieceComponentData.pieceNode, pieceSize = pieceComponentData.pieceSize, piecesH = pieceComponentData.piecesH, piecesV = pieceComponentData.piecesV, imageOffsetH = pieceComponentData.imageOffsetH, imageOffsetV = pieceComponentData.imageOffsetV;
            var puzzlePiece = PuzzlePieceDrawPath.extractPuzzlePiece(col, row, pieceComponentData);
            var piece = puzzlePiece.piece;
            var posX = col * pieceSize - (imgNode.width - pieceSize) / 2 + imageOffsetH;
            var posY = row * pieceSize - (imgNode.height - pieceSize) / 2 + imageOffsetV;
            piece.x = posX;
            piece.y = posY;
            ps.Tools.setNodeStyle(piece, { x: posX, y: posY });
            pieceNode.addChild(piece);
            var isedge = (col == 0) || (col == piecesH - 1) || (row == 0) || (row == piecesV - 1);
            var puzzlePieceInfo = piece.addScript("ps.PuzzlePieceInfo");
            piece.addScript("ps.DraggableItem");
            puzzlePieceInfo.deploy(puzzlePiece.img, puzzlePiece.bmd, col, row, isedge, true, pieceComponentData);
            // if (!qici.config.editor) {
            //     const piecesGroupSet = this.checkPiecesGroupSet(col, row);
            //     if (piecesGroupSet) {
            //         puzzlePieceInfo.bottomShadowInfo = { color: piecesGroupSet.bottomColor, borderStyle: null };
            //         // puzzlePieceInfo.topShadowInfo = { color: piecesGroupSet.topColor, borderStyle: null }
            //         puzzlePieceInfo.topBorderInfo = { color: "rgba(0,0,0,0)", borderStyle: piecesGroupSet.borderStyle }
            //     }
            // }
            this._pieces.unshift([puzzlePieceInfo]);
            return puzzlePieceInfo;
        };
        ;
        PuzzleComponent.prototype.showPiecesGroupSet = function () {
            var _a = this._pieceComponentData, piecesV = _a.piecesV, piecesH = _a.piecesH;
            for (var row = 0; row < piecesV; row++) {
                for (var col = 0; col < piecesH; col++) {
                    var puzzlePieceInfo = this._pieceArr[row][col];
                    var piecesGroupSet = this.checkPiecesGroupSet(col, row);
                    if (piecesGroupSet) {
                        puzzlePieceInfo.bottomShadowInfo = { color: piecesGroupSet.bottomColor, borderStyle: null };
                        // puzzlePieceInfo.topShadowInfo = { color: piecesGroupSet.topColor, borderStyle: null }
                        puzzlePieceInfo.topBorderInfo = { color: "rgba(0,0,0,0)", borderStyle: piecesGroupSet.borderStyle };
                    }
                }
            }
        };
        PuzzleComponent.prototype.checkPiecesGroupSet = function (row, col) {
            if (!this._puzzlePiecesGroupSet)
                return null;
            var puzzlePiecesGroupSet = Object.values(this._puzzlePiecesGroupSet);
            return puzzlePiecesGroupSet.find(function (piecesGroupSet) {
                var index = piecesGroupSet.posArr.findIndex(function (pos) { return pos.col === row && pos.row === col; });
                return index !== -1;
            }) || null;
        };
        PuzzleComponent.prototype.checkPuzzlePiecePixel = function (globalPoint) {
            for (var i = 0; i < this._pieces.length; i++) {
                for (var j = 0; j < this._pieces[i].length; j++) {
                    var puzzlePieceInfo = this._pieces[i][j];
                    if (puzzlePieceInfo.active == false)
                        continue;
                    var pieceCanvasSize = puzzlePieceInfo.pieceComponentData.pieceCanvasSize;
                    var localPoint = puzzlePieceInfo.img.toLocal(globalPoint);
                    var data = puzzlePieceInfo.context.getImageData(localPoint.x + pieceCanvasSize / 2, localPoint.y + pieceCanvasSize / 2, 1, 1).data;
                    if (data[3] != 0)
                        return puzzlePieceInfo;
                }
            }
            return null;
        };
        PuzzleComponent.prototype.resetPuzzle = function () {
            this._pieceComponentData.tableNode = this.gameObject.getChild("tableNode");
            if (this._pieceComponentData.tableNode)
                this._pieceComponentData.tableNode.destroy();
            this._pieceComponentData = JSON.parse(JSON.stringify(PuzzleDefs.PieceComponentData));
            this._pieces = [];
        };
        return PuzzleComponent;
    }(ps.Behaviour));
    ps.PuzzleComponent = PuzzleComponent;
    qc.registerBehaviour("ps.PuzzleComponent", PuzzleComponent);
    PuzzleComponent["__menu"] = "Custom/PuzzleComponent";
})(ps || (ps = {}));
//# sourceMappingURL=PuzzleComponent.js.map