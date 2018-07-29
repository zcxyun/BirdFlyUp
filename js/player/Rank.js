import { Sprite } from "../base/Sprite.js";

/**
 * 排行榜图片类
 */
export class Rank extends Sprite {
    constructor() {
        let image = Sprite.getImage('rank');
        super(
            image,
            0, 0,
            image.width, image.height,
            0, 0,
            image.width, image.height
        );
        this.x = (this.dataStore.canvas.width - this.img.width) / 2 + 60;
        this.y = (this.dataStore.canvas.height - this.img.height) / 2 + 100;
    }
}
