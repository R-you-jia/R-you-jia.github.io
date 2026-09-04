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

    var VPComponent_ca15ece3 = /** @class */ (function (_super) {
        __extends(VPComponent_ca15ece3, _super);
        function VPComponent_ca15ece3(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.deviceRotate = ps.ScrFix.isP ? 'p' : 'l';
            // ## temp variable ##

             
      // temp var C2tcn3pyw8RS368
      _this._C2tcn3pyw8RS368 = true
      // temp var C2tcn3pyw8RS368
        
      // temp var nkxmTWCBDjSW868
      _this._nkxmTWCBDjSW868 = true
      // temp var nkxmTWCBDjSW868
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

        VPComponent_ca15ece3.prototype.awake = function () {
            var _this = this

            // ## awake ##

             
  // C2tcn3pyw8RS368
  
        ps.mainState.add("scenechange", async function(uuid, uniqueName){
          if(!0&&this._C2tcn3pyw8RS368&&this.gameObject.uuid === uuid) {
            await qc_game.nodePool.find('ca15ece3-40eb-434e-b9dd-0f8a9fdd95ae').vpWaitTime({"ms":0,"timerId":"timer_0"})
 qc_game.nodePool.find('917d41f5-eafd-4c8d-9a34-0d3ae03b0426').getScript('qc.Tween').vpPlayTweenByUuid({"vpTweenUuid":"SGQ9@N2Wf___1"})
 qc_game.nodePool.find('7f925e00-9713-46d5-b242-7e6c2825e6f5').getScript('qc.Tween').vpPlayTweenByUuid({"vpTweenUuid":"HpaT5NuTx___3"})
 qc_game.nodePool.find('751a8664-b129-45e0-bf52-a703ccdf916a').getScript('qc.Tween').vpPlayTweenByUuid({"vpTweenUuid":"g9C2YGsxR___1"})
 qc_game.nodePool.find('110d66b9-50b3-446e-8d1b-831e5a7ce1c3').getScript('qc.Tween').vpPlayTweenByUuid({"vpTweenUuid":"NNDFNeQLC___1"})
 qc_game.nodePool.find('d2c71925-45af-48bf-b9de-263be9c3bd73').getScript('qc.Tween').vpPlayTweenByUuid({"vpTweenUuid":"RJneFNn4d___1"})
 qc_game.nodePool.find('d2c71925-45af-48bf-b9de-263be9c3bd73').getScript('qc.Tween').vpPlayTweenByUuid({"vpTweenUuid":"YaCRO@n5y___1"})
 qc_game.nodePool.find('83e98193-c389-4b33-bc03-43fd221407c5').getScript('ps.AudioNode').vpReplaySound({"loop":false,"loopNumber":1})
 qc_game.nodePool.find('722e4ab5-ab0b-4a04-b60b-0dd09212ff8b').getScript('ps.AudioNode').vpReplaySound({"loop":false,"loopNumber":1})
 qc_game.nodePool.find('31b5b5eb-91b1-44c4-9c91-a4f55ce2c357').vpPlayParticle({})

          }
        }, this)
        
  // C2tcn3pyw8RS368
    
  // nkxmTWCBDjSW868
  
        ps.mainState.add("DOWN", async function(uuid, uniqueName){
          if(!0&&this._nkxmTWCBDjSW868&&('7f925e00-9713-46d5-b242-7e6c2825e6f5' === uuid || '7f925e00-9713-46d5-b242-7e6c2825e6f5' === uniqueName)) {
             qc_game.nodePool.find('7f925e00-9713-46d5-b242-7e6c2825e6f5').vpInstall({})

          }
        }, this)
        
  // nkxmTWCBDjSW868
   // ## awake ##

        };

        VPComponent_ca15ece3.prototype.update = async function () {
            var _this = this

            // ## update ##

            // ## update ##

        };

        VPComponent_ca15ece3.prototype.onResize = function () {
            var _this = this;
            if (ps.ScrFix.isP && this.deviceRotate === 'l') {
                this.deviceRotate = 'p';
                ps.mainState.dispatch('DEVICE_ROTATE_P');
            } else if (ps.ScrFix.isL && this.deviceRotate === 'p') {
                this.deviceRotate = 'l';
                ps.mainState.dispatch('DEVICE_ROTATE_L');
            }
        };

        return VPComponent_ca15ece3;
    }(ps.Behaviour));
    ps.VPComponent_ca15ece3 = VPComponent_ca15ece3;

    // ## register behaviour ##
    qc.registerBehaviour('ps.VPComponent_ca15ece3', VPComponent_ca15ece3);
    // ## register behaviour ##
})(ps || (ps = {}));
