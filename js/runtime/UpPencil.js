import { Pencil } from "./Pencil.js";
import { Sprite } from "../base/Sprite.js";

// 上半部分的铅笔
export class UpPencil extends Pencil{
    constructor(top) {
        let image = Sprite.getImage('pencilUp');
        super(image, top);
    }

    draw() {
        this.y = this.top - this.img.height;
        super.draw();
    }
}
