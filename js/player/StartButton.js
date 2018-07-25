import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

// 开始按钮类
export class StartButton extends Sprite{
    constructor() {
        let image = Sprite.getImage('start');
        super(
            image,
            0, 0,
            image.width, image.height,
            (DataStore.getInstance().canvas.width - image.width) / 2,
            (DataStore.getInstance().canvas.height - image.height) / 1.3,
            image.width, image.height
        )
    }
}
