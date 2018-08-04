import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";
import { Director } from "../Director.js";

/**
 * 管道基类
 */
export class Pencil extends Sprite {
    constructor(image, left) {
        super(
            image,
            0, 0,
            image.width, image.height,
            0, 0,
            image.width, image.height
        );
        this.left = left;
        this.moveSpeed = 2;
        this.dataStore = DataStore.getInstance();
    }
    draw() {
        if (Director.getInstance().gameStart && !this.dataStore.get('birds').willCrash) {
            this.y = this.y + this.moveSpeed;
        }
        super.draw(
            this.img,
            0, 0,
            this.img.width, this.img.height,
            this.x, this.y,
            this.img.width, this.img.height
        )
    }
}
