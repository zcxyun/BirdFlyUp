import { Pencil } from "./Pencil.js";
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

// 下半部分的铅笔
export class DownPencil extends Pencil{
    constructor(top) {
        let image = Sprite.getImage('pencilDown');
        super(image, top);
    }
    draw(){
        let gap = DataStore.getInstance().canvas.height / 5;
        this.y = this.top + gap;
        super.draw();
    }
}
