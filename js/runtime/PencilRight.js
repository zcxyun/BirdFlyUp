import { Pencil } from "./Pencil.js";
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

// 下半部分的铅笔
export class PencilRight extends Pencil{
    constructor(left) {
        let image = Sprite.getImage('pencilRight');
        super(image, left);
        this.gap = DataStore.getInstance().canvas.width / 2;
        this.x = this.left + this.gap;
    }
}
