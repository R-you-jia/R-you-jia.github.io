var ps;
(function (ps) {
    /** 格子消除后状态 */
    var ShelfEliminateState;
    (function (ShelfEliminateState) {
        /** 保持货柜 */
        ShelfEliminateState[ShelfEliminateState["RetainShelf"] = 0] = "RetainShelf";
        /** 关闭货柜 */
        ShelfEliminateState[ShelfEliminateState["CloseShelf"] = 1] = "CloseShelf";
        /** 销毁货柜 不掉落 */
        ShelfEliminateState[ShelfEliminateState["DestroyShelfDisableFall"] = 2] = "DestroyShelfDisableFall";
        /** 销毁货柜 掉落 （备注:横竖屏布局不一致时不支持掉落玩法）*/
        ShelfEliminateState[ShelfEliminateState["DestroyShelfEnableFall"] = 3] = "DestroyShelfEnableFall";
    })(ShelfEliminateState = ps.ShelfEliminateState || (ps.ShelfEliminateState = {}));
})(ps || (ps = {}));
//# sourceMappingURL=GridConfig.js.map