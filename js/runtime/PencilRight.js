import { Pencil } from "./Pencil.js";
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

// 下半部分的铅笔
export class PencilRight extends Pencil{
    constructor(top) {
        let image = Sprite.getImage('pencilRight');
        super(image, top);
    }
    draw(){
        let gap = DataStore.getInstance().canvas.width / 3;
        this.x = this.top + gap;
        super.draw();
    }
}
