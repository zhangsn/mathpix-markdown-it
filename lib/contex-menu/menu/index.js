"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleMenuOff = exports.toggleMenuOn = exports.dropContextMenu = exports.createContextMenu = void 0;
var menu_items_1 = require("./menu-items");
var menu_item_actions_1 = require("./menu-item-actions");
var helper_1 = require("./helper");
var consts_1 = require("./consts");
var handleClickMenuItem = function (e) {
    var el = helper_1.clickInsideElement(e, consts_1.classNameMenuItem);
    if (el) {
        e.preventDefault();
        menu_item_actions_1.clearActiveItem();
        menu_item_actions_1.chooseItem(el);
    }
};
var handleKeyDownMenuItem = function (e) {
    switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
            menu_item_actions_1.chooseNextItem();
            break;
        case 'ArrowUp':
        case 'ArrowLeft':
            menu_item_actions_1.choosePreviousItem();
            break;
    }
};
var addEventListenerToMenu = function (elMenu) {
    elMenu.addEventListener("click", handleClickMenuItem);
    elMenu.addEventListener('keydown', handleKeyDownMenuItem);
};
var removeEventListenerFromMenu = function () {
    var elMenu = document.querySelector("." + consts_1.classNameMenu);
    if (!elMenu) {
        return;
    }
    elMenu.removeEventListener("click", handleClickMenuItem);
    elMenu.removeEventListener('keydown', handleKeyDownMenuItem);
};
var findContextMenuElement = function () {
    return document.querySelector("." + consts_1.classNameContextMenu);
};
exports.createContextMenu = function (el) {
    try {
        var items = menu_items_1.mathMenuItems(el);
        if (!items || !items.length) {
            return;
        }
        var elCtxtMenu = document.createElement('div');
        elCtxtMenu.setAttribute('class', consts_1.classNameContextMenu);
        elCtxtMenu.setAttribute('style', 'position: absolute; left: 0px; top: 0px; z-index: 200; width: 100%; height: 100%; border: 0px; padding: 0px; margin: 0px;');
        var elPosition = document.createElement('div');
        elPosition.setAttribute('style', 'position: fixed; left: 0px; top: 0px; z-index: 200; width: 100%; height: 100%; border: 0px; padding: 0px; margin: 0px;');
        elCtxtMenu.appendChild(elPosition);
        var elMenu = document.createElement('div');
        elMenu.setAttribute('class', consts_1.classNameMenu);
        elMenu.setAttribute('role', 'menu');
        elMenu.setAttribute('tabindex', '0');
        for (var i = 0; i < items.length; i++) {
            elMenu.appendChild(items[i]);
        }
        addEventListenerToMenu(elMenu);
        elCtxtMenu.appendChild(elMenu);
        document.body.appendChild(elCtxtMenu);
        elMenu.focus();
    }
    catch (err) {
        console.error(err);
    }
};
exports.dropContextMenu = function (elContextMenu) {
    try {
        if (!elContextMenu) {
            elContextMenu = findContextMenuElement();
        }
        if (elContextMenu) {
            removeEventListenerFromMenu();
            document.body.removeChild(elContextMenu);
        }
    }
    catch (err) {
        console.error(err);
    }
};
exports.toggleMenuOn = function (el) {
    var elContextMenu = findContextMenuElement();
    if (!elContextMenu) {
        exports.createContextMenu(el);
    }
    else {
        exports.dropContextMenu(elContextMenu);
        exports.createContextMenu(el);
    }
};
exports.toggleMenuOff = function () {
    exports.dropContextMenu();
};
//# sourceMappingURL=index.js.map