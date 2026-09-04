var __extends = (this && this.__extends) || (function () {
  var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };
  return function (d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var ps;
(function (ps) {
  var DragBound = /** @class */ (function (_super) {
      __extends(DragBound, _super);
      function DragBound(gameObject) {
          var _this = _super.call(this, gameObject) || this;
          _this.serializableFields = {};
          this.gameObject.alpha = 0;
          return _this;
      }
      DragBound.prototype.awake = function () {
      };
      return DragBound;
  }(ps.Behaviour));
  ps.DragBound = DragBound;
  qc.registerBehaviour('ps.DragBound', DragBound);
})(ps || (ps = {}));
//# sourceMappingURL=DragBound.js.map
