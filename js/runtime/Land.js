import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";
import { Director } from "../Director.js";

// 路地类 (不断移动的路地)
export class Land extends Sprite{
    constructor() {
        let image = Sprite.getImage('land');
        super(
            image,
            0, 0,
            image.width, image.height,
            0, DataStore.getInstance().canvas.height - image.height,
            image.width, image.height
        );
        // 地板的水平变化坐标
        this.landY = DataStore.getInstance().canvas.height - image.height;
        // 地板的水平移动速度
        this.landSpeed = 2;
    }

    draw() {
        if (Director.getInstance().gameStart) {
            this.landY = this.landY + this.landSpeed;
        }
        // if (this.landX >= (this.img.width - DataStore.getInstance().canvas.width)) {

        //     this.landX = 0;
        // }
        super.draw(
            this.img,
            this.srcX, this.srcY,
            this.srcW, this.srcH,
            this.x, this.landY,
            this.width, this.height
        );
    }
}
