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

    var VPComponent_8569e684 = /** @class */ (function (_super) {
        __extends(VPComponent_8569e684, _super);
        function VPComponent_8569e684(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.deviceRotate = ps.ScrFix.isP ? 'p' : 'l';
            // ## temp variable ##

             
      // temp var 2krCG3yzMP5T040
      _this._2krCG3yzMP5T040 = true
      // temp var 2krCG3yzMP5T040
        
      // temp var Wsyz7JajdAic154
      _this._Wsyz7JajdAic154 = true
      // temp var Wsyz7JajdAic154
        
      // temp var SxFAXbPm7J4B587
      _this._SxFAXbPm7J4B587 = true
      // temp var SxFAXbPm7J4B587
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

        VPComponent_8569e684.prototype.awake = function () {
            var _this = this

            // ## awake ##

             
  // 2krCG3yzMP5T040
  
        ps.mainState.add("scenechange", async function(uuid, uniqueName){
          if(!0&&this._2krCG3yzMP5T040&&this.gameObject.uuid === uuid) {
            await qc_game.nodePool.find('8569e684-a85f-494d-9108-21d2ec8b624a').vpWaitTime({"ms":0,"timerId":"timer_1"})
 qc_game.nodePool.find('4d59aa37-d685-4963-8984-f3980e199057').getScript('ps.AudioNode').vpReplaySound({"loop":false,"loopNumber":1})
 qc_game.nodePool.find('5ecffa30-3de4-417c-9ffc-f98e2f3ae294').getScript('ps.AudioNode').vpReplaySound({"loop":false,"loopNumber":1})
await qc_game.nodePool.find('8569e684-a85f-494d-9108-21d2ec8b624a').vpWaitTime({"ms":"1.5","timerId":"timer_12"})
 qc_game.nodePool.find('2f87341c-ee3c-411c-b9a0-ef7790b23318').getScript('ps.AudioNode').vpReplaySound({"loop":false,"loopNumber":1})
 qc_game.nodePool.find('d709f97b-9d44-4262-8b22-936f13b35a11').vpPlayParticle({})
await qc_game.nodePool.find('8569e684-a85f-494d-9108-21d2ec8b624a').vpWaitTime({"ms":"0.5","timerId":"timer_13"})
 qc_game.nodePool.find('7fb3bb02-a244-4821-a14a-632d0306f3ee').vpPlayParticle({})
 qc_game.nodePool.find('846a1148-017f-4fd3-bceb-4b21f66ad513').vpPlayParticle({})
 qc_game.nodePool.find('64cf0c1b-3984-4017-9856-292160fc9322').vpPlayParticle({})
 qc_game.nodePool.find('bf29c176-65a9-445b-b9bd-67b4375f4ef3').vpPlayParticle({})

          }
        }, this)
        
  // 2krCG3yzMP5T040
    
  // Wsyz7JajdAic154
  
        ps.mainState.add("DOWN", async function(uuid, uniqueName){
          if(!0&&this._Wsyz7JajdAic154&&('9d4a9429-6ce6-4233-a580-0e0b8a36fa7c' === uuid || '9d4a9429-6ce6-4233-a580-0e0b8a36fa7c' === uniqueName)) {
             qc_game.nodePool.find('9d4a9429-6ce6-4233-a580-0e0b8a36fa7c').vpInstall({})

          }
        }, this)
        
  // Wsyz7JajdAic154
    
  // SxFAXbPm7J4B587
  this.gameObject.interactive = true

        ps.mainState.add("DOWN", async function(uuid, uniqueName){
          if(!0&&this._SxFAXbPm7J4B587&&('8569e684-a85f-494d-9108-21d2ec8b624a' === uuid || '8569e684-a85f-494d-9108-21d2ec8b624a' === uniqueName)) {
             qc_game.nodePool.find('8569e684-a85f-494d-9108-21d2ec8b624a').vpInstall({})
 qc_game.nodePool.find('8569e684-a85f-494d-9108-21d2ec8b624a').vpGameEnd({})

          }
        }, this)
        
  // SxFAXbPm7J4B587
   // ## awake ##

        };

        VPComponent_8569e684.prototype.update = async function () {
            var _this = this

            // ## update ##

            // ## update ##

        };

        VPComponent_8569e684.prototype.onResize = function () {
            var _this = this;
            if (ps.ScrFix.isP && this.deviceRotate === 'l') {
                this.deviceRotate = 'p';
                ps.mainState.dispatch('DEVICE_ROTATE_P');
            } else if (ps.ScrFix.isL && this.deviceRotate === 'p') {
                this.deviceRotate = 'l';
                ps.mainState.dispatch('DEVICE_ROTATE_L');
            }
        };

        return VPComponent_8569e684;
    }(ps.Behaviour));
    ps.VPComponent_8569e684 = VPComponent_8569e684;

    // ## register behaviour ##
    qc.registerBehaviour('ps.VPComponent_8569e684', VPComponent_8569e684);
    // ## register behaviour ##
})(ps || (ps = {}));
