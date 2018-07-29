import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

/**
 * 游戏结束开始按钮图片类
 */
export class StartButton extends Sprite{
    constructor() {
        let image = Sprite.getImage('start');
        super(
            image,
            0, 0,
            image.width, image.height,
            (DataStore.getInstance().canvas.width - image.width) / 2 - 60,
            (DataStore.getInstance().canvas.height - image.height) / 2 + 100,
            image.width, image.height
        )
    }
}
