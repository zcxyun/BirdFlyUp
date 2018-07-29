import { Sprite } from "../base/Sprite.js";

/**
 * 游戏结束提示消息图片类
 */
export class Message extends Sprite {
    constructor() {
        let image = Sprite.getImage('message');
        super(
            image,
            0, 0,
            image.width, image.height,
            0, 0,
            image.width, image.height
        );
        this.x = (this.dataStore.canvas.width - this.img.width) / 2;
        this.y = (this.dataStore.canvas.height - this.img.height) / 2;
    }
}
