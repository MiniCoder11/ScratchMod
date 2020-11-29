// ==UserScript==
// @name         ScratchMod
// @namespace    http://tampermonkey.net/
// @version      1.2.0
// @description  Detect any key!
// @author       MiniCoder11
// @match        https://*.scratch.mit.edu/*
// @match        https://*.turbowarp.org/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(".sprite-selector_sprite-wrapper_1C5Mq { width: 380px !important; max-width: none !important; min-height: 0px !important; }");

    const findVM = () => new Promise(resolve => {
        const oldBind = Function.prototype.bind;
        Function.prototype.bind = function(...args) {
            if (args[0] && args[0].hasOwnProperty('editingTarget') && args[0].hasOwnProperty('runtime')) {
                Function.prototype.bind = oldBind;
                resolve(args[0]);
            }
            return oldBind.apply(this, args);
        };
    });

    findVM().then(vm => {
        var scratchVM = vm;
        window.vm = vm; // This allows experimentation in the console with the VM

        document.addEventListener('keydown', function (event) {
            var key = event.key || event.keyCode;
            scratchVM.setVariableValue(scratchVM.runtime.getSpriteTargetByName("scratchModCompat").id,scratchVM.runtime.getSpriteTargetByName("scratchModCompat").lookupVariableByNameAndType("lastKeyPressed").id,key);
            console.log(key);
        });


    });
})();
