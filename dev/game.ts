class Game {
    constructor() {
        if ('ontouchstart' in window) {
            Settings.enableTouch()
        }

        // robots
        // let positions = [{x:100, y:0, img:"robota.png"},
        //     { x: 20, y: 140, img: "robotb.png" },
        //     { x: 100, y: 290, img: "robotc.png" },
        //     { x: 100, y: 390, img: "robotd.png" },
        //     { x: 20, y: 520, img: "robote.png" },
        //     { x: 100, y: 690, img: "robotf.png" }]

        let positions = [
            { x: 10, y: 10, img:"robotbdb.png"}, // 1
            { x: 10, y: 90, img: "robotbdb.png" }, // 2
            { x: 10, y: 175, img: "robotbdb.png" }, // 3
            { x: 10, y: 425, img: "robotbdb.png" }, // 4
            { x: 10, y: 510, img: "robotbdb.png" }, // 5
            { x: 510, y: 10, img: "robotbdb.png" }, // 6
            { x: 510, y: 90, img: "robotbdb.png" }, // 7
            { x: 510, y: 340, img: "robotbdb.png" }, // 8
            { x: 510, y: 425, img: "robotbdb.png" }, // 9
            { x: 510, y: 510, img: "robotbdb.png" }, // 10
        ]

        // for(let p of positions) {
        //     new DraggableDomObject(p.x, p.y, p.img, 0, 0)
        // }

        for(let p = 0; p < positions.length; p++){
            let temp = new DraggableDomObject(positions[p].x, positions[p].y, positions[p].img, 0, 0);
            temp.getDiv().style.filter = "hue-rotate("+((p + 1) * (360 / positions.length))+"deg)";
            temp.getDiv().setAttribute("number", ""+(p + 1));
        }
    }
}

window.addEventListener("load", function() {
    new Game()
});