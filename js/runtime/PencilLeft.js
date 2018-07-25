import { Pencil } from "./Pencil.js";
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

// 上半部分的铅笔
export class PencilLeft extends Pencil {
    constructor(top) {
        let image = Sprite.getImage('pencilLeft');
        super(image, top);
        this.x = this.top - this.img.width;
    }

    draw() {
        const canvasWidth = DataStore.getInstance().canvas.width;
        if (this.x + this.width >= canvasWidth / 1.5) {
            this.offset = -0.5;
        }
        if (this.x + this.width <= canvasWidth / 6) {
            this.offset = 0.5;
        }
        this.x = this.x + this.offset;
        super.draw();
    }
}
