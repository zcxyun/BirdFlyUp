import { Sprite } from "../base/Sprite.js";

/**
 * 分享按钮图片类
 */
export class Share extends Sprite {
    constructor() {
        let image = Sprite.getImage('share');
        super(
            image,
            0, 0,
            image.width, image.height,
            0, 0,
            image.width, image.height
        );
        this.x = (this.dataStore.canvas.width - this.img.width) / 2;
        this.y = (this.dataStore.canvas.height - this.img.height) / 2 + 160;
    }
}
