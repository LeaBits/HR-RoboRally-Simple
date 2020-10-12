"use strict";
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
var DOMObject = (function () {
    function DOMObject(x, y, img) {
        this.x = x;
        this.y = y;
        this.scale = 1;
        this.div = document.createElement("robot");
        this.div.style.backgroundImage = "url(./images/" + img + ")";
        document.body.appendChild(this.div);
        this.width = this.div.offsetWidth;
        this.height = this.div.offsetHeight;
        this.draw();
    }
    DOMObject.prototype.update = function () {
    };
    DOMObject.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.scale + ")";
    };
    DOMObject.prototype.getDiv = function () {
        return this.div;
    };
    return DOMObject;
}());
var DraggableDomObject = (function (_super) {
    __extends(DraggableDomObject, _super);
    function DraggableDomObject(x, y, img, offx, offy) {
        var _this = _super.call(this, x, y, img) || this;
        _this.offSetX = 0;
        _this.offSetY = 0;
        _this.offSetX = offx;
        _this.offSetY = offy;
        _this.moveCallback = function (e) { return _this.updatePosition(e); };
        _this.div.addEventListener(Settings.down, function (e) { return _this.initDrag(e); });
        _this.div.addEventListener(Settings.up, function (e) { return _this.stopDrag(e); });
        _this.draw();
        return _this;
    }
    DraggableDomObject.prototype.initDrag = function (e) {
        e.preventDefault();
        var event = new GameEvent(e);
        if (this.div.parentElement) {
            this.div.parentElement.appendChild(this.div);
        }
        this.offSetX = event.clientX - this.x;
        this.offSetY = event.clientY - this.y;
        window.addEventListener(Settings.move, this.moveCallback);
    };
    DraggableDomObject.prototype.updatePosition = function (e) {
        e.preventDefault();
        var event = new GameEvent(e);
        this.x = event.clientX - this.offSetX;
        this.y = event.clientY - this.offSetY;
        console.log('x', this.x);
        console.log('y', this.y);
        this.draw();
    };
    DraggableDomObject.prototype.stopDrag = function (e) {
        window.removeEventListener(Settings.move, this.moveCallback);
        e.preventDefault();
        var s = Settings.gridSize;
        if (Settings.snapping) {
            this.x = Math.round(this.x / s) * s;
            this.y = Math.round(this.y / s) * s;
            this.draw();
        }
    };
    return DraggableDomObject;
}(DOMObject));
var Game = (function () {
    function Game() {
        if ('ontouchstart' in window) {
            Settings.enableTouch();
        }
        var positions = [
            { x: 10, y: 10, img: "robotbdb.png" },
            { x: 10, y: 90, img: "robotbdb.png" },
            { x: 10, y: 175, img: "robotbdb.png" },
            { x: 10, y: 425, img: "robotbdb.png" },
            { x: 10, y: 510, img: "robotbdb.png" },
            { x: 510, y: 10, img: "robotbdb.png" },
            { x: 510, y: 90, img: "robotbdb.png" },
            { x: 510, y: 340, img: "robotbdb.png" },
            { x: 510, y: 425, img: "robotbdb.png" },
            { x: 510, y: 510, img: "robotbdb.png" },
        ];
        for (var p = 0; p < positions.length; p++) {
            var temp = new DraggableDomObject(positions[p].x, positions[p].y, positions[p].img, 0, 0);
            temp.getDiv().style.filter = "hue-rotate(" + ((p + 1) * (360 / positions.length)) + "deg)";
            temp.getDiv().setAttribute("number", "" + (p + 1));
        }
    }
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var GameEvent = (function () {
    function GameEvent(e) {
        this.clientX = 0;
        this.clientY = 0;
        this.altKey = false;
        switch (e.type) {
            case "mousedown":
            case "mouseup":
            case "mousemove":
                var m = e;
                this.clientX = m.clientX;
                this.clientY = m.clientY;
                this.altKey = m.altKey;
                break;
            case "touchcancel":
            case "touchstart":
            case "touchmove":
                var allTouches = e;
                var t = allTouches.targetTouches[0];
                this.clientX = t.clientX;
                this.clientY = t.clientY;
                break;
            case "touchend":
                break;
            default:
                console.log("Unknown: " + e.type);
        }
    }
    return GameEvent;
}());
var Settings = (function () {
    function Settings() {
    }
    Settings.enableTouch = function () {
        Settings.down = "touchstart";
        Settings.up = "touchend";
        Settings.move = "touchmove";
        Settings.eventType = "touchEvent";
    };
    Settings.gridSize = 80;
    Settings.snapping = false;
    Settings.down = "mousedown";
    Settings.up = "mouseup";
    Settings.move = "mousemove";
    Settings.eventType = "mouseEvent";
    return Settings;
}());
//# sourceMappingURL=main.js.map