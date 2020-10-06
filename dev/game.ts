class Game {
    constructor() {
        if ('ontouchstart' in window) {
            Settings.enableTouch()
        }

        // robots
        let positions = [{x:100, y:0, img:"robota.png"},
            { x: 20, y: 140, img: "robotb.png" },
            { x: 100, y: 290, img: "robotc.png" },
            { x: 100, y: 390, img: "robotd.png" },
            { x: 20, y: 520, img: "robote.png" },
            { x: 100, y: 690, img: "robotf.png" }]

        for(let p of positions) {
            new DraggableDomObject(p.x, p.y, p.img, 0, 0)
        }
    }
}

window.addEventListener("load", function() {
    new Game()
});