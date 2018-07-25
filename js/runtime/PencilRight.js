import { Pencil } from "./Pencil.js";
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

// 下半部分的铅笔
export class PencilRight extends Pencil{
    constructor(top) {
        let image = Sprite.getImage('pencilRight');
        super(image, top);
        this.gap = DataStore.getInstance().canvas.width / 4;
        this.x = this.top + this.gap;
    }
    draw(){
        const canvasWidth = DataStore.getInstance().canvas.width;
        if (this.x >= canvasWidth / 1.5 + this.gap) {
            this.offset = -0.5;
        }
        if (this.x <= canvasWidth / 6 + this.gap) {
            this.offset = 0.5;
        }
        this.x = this.x + this.offset;
        super.draw();
    }
}
