import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

/**
 * 铅笔基类
 */

export class Pencil extends Sprite {
    constructor(image, top) {
        super(
            image,
            0, 0,
            image.width, image.height,
            0, 0,
            image.width, image.height
        );
        this.top = top;
        this.moveSpeed = 2;
        this.offset = 0.5;
    }

    draw() {
        this.y = this.y + this.moveSpeed;

        super.draw(
            this.img,
            0, 0,
            this.img.width, this.img.height,
            this.x, this.y,
            this.img.width, this.img.height
        )
    }
}
