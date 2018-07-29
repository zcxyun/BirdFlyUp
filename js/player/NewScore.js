import { Sprite } from "../base/Sprite.js";

/**
 * 新记录图片类
 */
export class NewScore extends Sprite {
    constructor() {
        let image = Sprite.getImage('new');
        super(
            image,
            0, 0,
            image.width, image.height,
            0, 0,
            image.width, image.height
        );
        this.x = (this.dataStore.canvas.width - this.img.width) / 2 + 35;
        this.y = (this.dataStore.canvas.height - this.img.height) / 2 + 7;
    }
}
