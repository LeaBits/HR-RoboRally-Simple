class DOMObject {

    public x      : number;
    public y      : number;
    public width  : number;
    public height : number;
    public scale  : number;
    public img : string;

    protected div: HTMLElement;

    constructor(x: number, y: number, img: string) {
        this.x = x;
        this.y = y;
        this.scale = 1;
                
        this.div = document.createElement("robot");
        this.div.style.backgroundImage = `url(./images/${img})`;
        document.body.appendChild(this.div);
        
        this.width = this.div.offsetWidth;
        this.height = this.div.offsetHeight;
        
        this.draw();
    }

    public update() : void {
        
    }

    public draw(): void {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
    }
}