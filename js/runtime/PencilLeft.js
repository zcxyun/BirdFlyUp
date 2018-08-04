import { Pencil } from "./Pencil.js";
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

/**
 * 左半部分的管道图片类
 */
export class PencilLeft extends Pencil {
    constructor(left) {
        let image = Sprite.getImage('pencilLeft');
        super(image, left);
        this.x = this.left - this.img.width;
    }
}
