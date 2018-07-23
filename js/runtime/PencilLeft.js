import { Pencil } from "./Pencil.js";
import { Sprite } from "../base/Sprite.js";

// 上半部分的铅笔
export class PencilLeft extends Pencil{
    constructor(top) {
        let image = Sprite.getImage('pencilLeft');
        super(image, top);
    }

    draw() {
        this.x = this.top - this.img.width;
        super.draw();
    }
}
