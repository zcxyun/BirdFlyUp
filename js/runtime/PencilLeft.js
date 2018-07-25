import { Pencil } from "./Pencil.js";
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

// 上半部分的铅笔
export class PencilLeft extends Pencil {
    constructor(left) {
        let image = Sprite.getImage('pencilLeft');
        super(image, left);
        this.x = this.left - this.img.width;
    }

    draw() {
        super.draw();
    }
}
