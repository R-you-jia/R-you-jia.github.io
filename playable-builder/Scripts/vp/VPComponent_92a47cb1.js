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

    var VPComponent_92a47cb1 = /** @class */ (function (_super) {
        __extends(VPComponent_92a47cb1, _super);
        function VPComponent_92a47cb1(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.deviceRotate = ps.ScrFix.isP ? 'p' : 'l';
            // ## temp variable ##

             
      // temp var trfj6c3ZByxN423
      _this._trfj6c3ZByxN423 = true
      // temp var trfj6c3ZByxN423
       // ## temp variable ##

            // ## scope variable ##

            // ## scope variable ##

            /** 序列化 */
            _this.serializableFields = {

                // ## serialize ##

                // ## serialize ##
            };
            return _this;
        }

        VPComponent_92a47cb1.prototype.awake = function () {
            var _this = this

            // ## awake ##

             
  // trfj6c3ZByxN423
  
        ps.mainState.add("CLICK", async function(uuid, uniqueName){
          if(!0&&this._trfj6c3ZByxN423&&('82a02b3d-e168-4a0f-a440-248c98d7499d' === uuid || '82a02b3d-e168-4a0f-a440-248c98d7499d' === uniqueName)) {
             qc_game.nodePool.find('82a02b3d-e168-4a0f-a440-248c98d7499d').vpInstall({})

          }
        }, this)
        
  // trfj6c3ZByxN423
   // ## awake ##

        };

        VPComponent_92a47cb1.prototype.update = async function () {
            var _this = this

            // ## update ##

            // ## update ##

        };

        VPComponent_92a47cb1.prototype.onResize = function () {
            var _this = this;
            if (ps.ScrFix.isP && this.deviceRotate === 'l') {
                this.deviceRotate = 'p';
                ps.mainState.dispatch('DEVICE_ROTATE_P');
            } else if (ps.ScrFix.isL && this.deviceRotate === 'p') {
                this.deviceRotate = 'l';
                ps.mainState.dispatch('DEVICE_ROTATE_L');
            }
        };

        return VPComponent_92a47cb1;
    }(ps.Behaviour));
    ps.VPComponent_92a47cb1 = VPComponent_92a47cb1;

    // ## register behaviour ##
    qc.registerBehaviour('ps.VPComponent_92a47cb1', VPComponent_92a47cb1);
    // ## register behaviour ##
})(ps || (ps = {}));
