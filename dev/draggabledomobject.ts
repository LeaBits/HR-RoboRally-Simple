
/// <reference path="domobject.ts" />

class DraggableDomObject extends DOMObject{
    
    private moveCallback: EventListener;
    private offSetX: number = 0;
    private offSetY: number = 0;
    
    constructor(x: number, y: number, img: string, offx:number, offy:number) {
       super(x, y, img);

       this.offSetX = offx;
       this.offSetY = offy;
       
       // storing the reference allows us to use removeEventListener
       this.moveCallback = (e: Event) => this.updatePosition(e);

       this.div.addEventListener(Settings.down, (e) => this.initDrag(e));
       this.div.addEventListener(Settings.up  , (e) => this.stopDrag(e));  
       
       this.draw();
    }



    //
    // start drag
    //
    public initDrag(e: Event) : void {
        e.preventDefault();

        let event:GameEvent = new GameEvent(e);
        
        // drag and drop only works correctly if the item is on top in the DOM
        if(this.div.parentElement) {
            this.div.parentElement.appendChild(this.div);     
        }

        this.offSetX = event.clientX - this.x;
        this.offSetY = event.clientY - this.y;  
        
        // press the alt key to duplicate this object
        window.addEventListener(Settings.move, this.moveCallback);
    }
    
    //
    // dragging
    //
    private updatePosition(e: Event): void {
                
        e.preventDefault();

        let event:GameEvent = new GameEvent(e);

        this.x = event.clientX - this.offSetX;
        this.y = event.clientY - this.offSetY;

        console.log('x', this.x);
        console.log('y', this.y)
        
        this.draw();
    }
    
    //
    // stop drag, snap to grid
    //
    public stopDrag(e: Event) : void {
        window.removeEventListener(Settings.move, this.moveCallback);

        e.preventDefault();

        let s:number = Settings.gridSize;
        if(Settings.snapping){
            this.x = Math.round(this.x/s) * s;
            this.y = Math.round(this.y/s) * s;
            this.draw();
        }
    }
}