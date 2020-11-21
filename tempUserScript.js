// ==UserScript==
// @name         ScratchMod
// @namespace    http://tampermonkey.net/
// @version      1.2.0
// @description  Detect any key!
// @author       MiniCoder11
// @match        https://*.scratch.mit.edu/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

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

        document.addEventListener('keyup', function (event) {
            if (event.defaultPrevented) {
                return;
            }
            var key = event.key || event.keyCode;
            scratchVM.setVariableValue(scratchVM.runtime.getSpriteTargetByName("scratchModCompat").id,scratchVM.runtime.getSpriteTargetByName("scratchModCompat").lookupVariableByNameAndType("lastKeyPressed").id,key);
        });


    });
})();
