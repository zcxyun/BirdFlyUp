import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

/**
 * 游戏结束后信息板上的奖牌图片类
 */
export class Medal extends Sprite {
    constructor() {
        let image = Sprite.getImage('medal3');
        super(
            image,
            0, 0,
            image.width, image.height,
            0, 0,
            image.width, image.height
        );
        this.x = (this.dataStore.canvas.width - this.img.width) / 2 - 65;
        this.y = (this.dataStore.canvas.height - this.img.height) / 2 + 9;
    }
    draw() {
        let score = DataStore.getInstance().get('score').scoreNumber;
        this.useWhichMedal(score);
        super.draw();
    }
    /**
     * 根据score的大小使用相应的奖牌图片
     * @param {int} score
     */
    useWhichMedal(score) {
        if (score >= 0 && score < 20) {
            this.img = Sprite.getImage('medal3');
        } else if (score >= 20 && score < 50) {
            this.img = Sprite.getImage('medal2');
        } else if (score >= 50 && score < 100) {
            this.img = Sprite.getImage('medal1');
        } else if (score >= 100) {
            this.img = Sprite.getImage('medal0');
        } else {
            this.img = Sprite.getImage('medal3');
        }
    }
}
