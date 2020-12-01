// ==UserScript==
// @name         ScratchMod
// @namespace    http://tampermonkey.net/
// @version      0.2.4
// @description  Enhance the Scratch website with aesthetic and QoL changes.
// @author       MiniCoder11
// @match        https://*.scratch.mit.edu/*
// @grant        GM_addStyle
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    function formatLog(type, message) { console.log("[ScratchMod / " + type + "] " + message) } // Write a nicely formatted message to the console

    if ($ != "") {formatLog("Info", "jQuery check successful.")} // Check if jQuery was imported successfully
    formatLog("Info", "Loaded successfully!");
    //document.addEventListener('keyup', function (event) { console.log(event.key); });

    document.addEventListener('keyup', function (event) { if (event.ctrlKey && event.key === '`') {
        applyStyles();
        formatLog("Info", "Styles reloaded");
    }});

    var oldURL = window.location.href;
    setInterval(function() {if (oldURL != window.location.href) {applyStyles(); oldURL = window.location.href;}}, 500); //Reapply styling on URL change in case the page doesn't reload (from project page to editor)

    // Define default styling and color palettes
    document.documentElement.style.setProperty('--background', '#1c1c28');
    document.documentElement.style.setProperty('--background-accent', '#28293d');
    document.documentElement.style.setProperty('--primary', '#3e7bfa');
    document.documentElement.style.setProperty('--secondary', '#6698ff');
    document.documentElement.style.setProperty('--text', '#f2f2f5');
    document.documentElement.style.setProperty('--gray-text', '#555770');

    document.documentElement.style.setProperty('--panel-shadow', '#161620 0px 0px 20px 1px');

    // Define colors
    document.documentElement.style.setProperty('--red', '#ff5c5c');
    document.documentElement.style.setProperty('--orange', '#fdac42');
    document.documentElement.style.setProperty('--yellow', '#fddd48');
    document.documentElement.style.setProperty('--green', '#39d98a');
    document.documentElement.style.setProperty('--blue', '#5b8def');
    document.documentElement.style.setProperty('--teal', '#73dfe7');
    document.documentElement.style.setProperty('--purple', '#ac5dd9');

    document.documentElement.style.setProperty('--editor-accent', '#1f1f2d');

    // Load fonts
    var linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('type', 'text/css');
    linkElement.setAttribute('href', 'https://fonts.googleapis.com/css?family=Rubik');
    document.head.appendChild(linkElement); // Check out "Inter" and "Questrial"

    applyStyles(); // Reapply/apply styles in one line

    // Create page CSS and apply it
    function applyStyles() {

        GM_addStyle(`
    /* General Site Styling */

    * {font-family: "Rubik" !important;}
    a {transition: background-color 0.25s;}

    body, body > #pagewrapper {background: var(--background);}
    #view {background: var(--background) !important;}
    #projectBox {background: var(--background) !important;}
    .sub-nav {background: var(--background);}
    .tab-background, .tabs {background: var(--background) !important}
    .grid .thumbnail {background: var(--background-accent) !important; border-radius: 10px; box-shadow: var(--panel-shadow) !important;}
    .tabs li.active:hover, .tabs li:hover {background-color: #21212f !important;}

    .title-banner {background: var(--background-accent) !important; saturation: 0.8;}

    #navigation {background: var(--background-accent) !important;}
    .dropdown {background: var(--background-accent) !important;}

    .box, .box-header, .box-content {background: var(--background-accent) !important; border-radius: 14px !important; border: none !important;}
    span {color: var(--text) !important;}
    h4, a * {color: var(--blue) !important;}
    p {color: var(--text) !important;} /* Order is important here */
    .box-header {padding-top: 16px !important;}
    .thumbnail.project .thumbnail-image img, .thumbnail.gallery img {border-radius: 8px; border: none !important;}
    .splash .splash-header .box, .box {box-shadow: var(--panel-shadow);}

    #footer {background-color: var(--background-accent) !important; opacity: 0.9; backdrop-filter: blur(12px);}
    #donor {background: var(--editor-accent) !important;}

    .preview .project-lower-container {background-color: #161620 !important;}
    .comment-text, .comment .comment-body .comment-bubble, .preview .guiPlayer .project-info-alert, .comment .comment-body .comment-bubble::before {background-color: var(--background) !important;}
    .inplace-textarea {background-color: var(--background) !important; color: var(--text) !important;}
    `);
        if (window.location.href.includes("editor")) {
            GM_addStyle(`
        /* Editor Styles Start Here */
    .scratchCategoryMenuItemLabel, .blocklyFlyoutLabelText {color: var(--text)}
    .loader_background_2DPrW, .blocklyToolboxDiv, .scratchCategoryMenuItem, .sprite-selector_sprite-selector_2KgCX, .selector_wrapper_8_BHs {background: var(--background) !important;} /* Loading screen backdrop */
    .scratchCategoryMenuItem.categorySelected {background: #171720 !important}
    .menu-bar_menu-bar_JcuHF, .stage-selector_header_2GVr1, .sprite-info_sprite-info_3EyZh, .backpack_backpack-header_6ltCS, .menu_menu_3k7QT, .asset-panel_detail-area_2KQhH {background: var(--editor-accent) !important;} /* Headers and topbar */
    .blocklyWidgetDiv .goog-menu {background: var(--background-accent);} /* Right-click scripting-area popup */
    .blocklySvg {background: var(--background);}
    .blocklyFlyoutBackground {fill: var(--background-accent);}
    .blocks_blocks_C530M .blocklyFlyout {backdrop-filter: blur(4px);}
    .gui_stage-and-target-wrapper_69KBf, .stage-selector_stage-selector_3oWOr, .gui_tabs_AgmuP, .backpack_backpack-container_2_wGr {background: var(--background-accent) !important;} /* Slim border around most editor components (not outline) */
    .blocklyFlyoutCheckbox {fill: #1e1e2d; stroke: none;} /* Checkboxes */
    .blocklyFlyoutCheckboxPath {stroke: var(--background)}
    .input_input-form_l9eYg, .sound-editor_button_1_6Li, .monitor_default-monitor_2vCcZ, .monitor_list-header_-cp0o, .monitor_list-footer_2HyG8, .monitor_list-monitor_1FdIjc {background: #1c1c28 !important; color: var(--text) !important} /* Variable and list monitor coloring */
    .input_input-form_1Y0wX, .input_input-form_l9eYg {border-color: #272738 !important; color: var(--text) !important}
    input {background: #2e2e42 !important}
    #s3devDDOut, .monitor_list-row_okCNn {background: var(--background-accent);}
    .s3devDD > li {border-radius: 4px;}
    .gui_tab_27Unf, .paper-canvas_paper-canvas_1y588 {background: var(--background) !important;} /* Paint editor styles */
    .asset-panel_wrapper_366X0, .paint-editor_canvas-container_x2D0a, .paint-editor_button-group-button_1I1tm, .monitor_default-monitor_2vCcZ, .monitor_monitor-container_2J9gl {border-color: #191923 !important} /* Get rid of white borders */
    .selector_new-buttons_2qHDd::before {background: linear-gradient(#1c1c2800,#1c1c28) !important;} /* Fix paint editor gradient */
    .backpack_backpack-item_hwqzQ > div, .sprite-selector-item_sprite-selector-item_kQm-i.sprite-selector-item_is-selected_24tQj {background: #1f1f2d00 !important;}
    .gui_body-wrapper_-N0sA * {scrollbar-color: #28293d #1c1c28 !important;}
    .prompt_body_18Z-I {background: var(--editor-accent) !important; opacity: 1 !important;} /* Variable/list creation popup */
    [dir="ltr"] .modal_header-item-title_tLOU5, .custom-procedures_body_SQBv6 {background: var(--background);}
    .modal_modal-overlay_1Lcbx {background-color: #1c1c28d6 !important; backdrop-filter: blur(4px) !important;}
    `);}

        if (window.location.href.includes("mystuff")) {
            GM_addStyle(`
        /* Mystuff Page */
    * {border: none !important; text-shadow: none;}
    #footer {box-shadow: none;}
    a[href] {color: var(--blue) !important;}
    `);}

        if (window.location.href.includes("messages")) {
            GM_addStyle(`
            .social-message, .messages-social-list {border: none !important; background-color: var(--editor-accent) !important;}
        `)
        }

        // ========================================= ScratchMod Experimental Features =========================================
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
            window.vm = vm; // Exposes the VM to the console for experimentation

            //scratchVM.setVariableValue(scratchVM.runtime.getSpriteTargetByName("scratchModCompat").id,scratchVM.runtime.getSpriteTargetByName("scratchModCompat").lookupVariableByNameAndType("scratchModEnabled").id,"True");

            document.addEventListener('keydown', function (event) {
                var key = event.key || event.keyCode;
                scratchVM.setVariableValue(scratchVM.runtime.getSpriteTargetByName("scratchModCompat").id,scratchVM.runtime.getSpriteTargetByName("scratchModCompat").lookupVariableByNameAndType("lastKeyPressed").id,key);
            });

            formatLog("Info", "Styling complete.");

        }
                     )}})();
