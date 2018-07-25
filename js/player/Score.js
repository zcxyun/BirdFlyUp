import { DataStore } from "../base/DataStore.js";
import { Sprite } from "../base/Sprite.js";

// 计分器类
export class Score extends Sprite {
    constructor() {
        let image = Sprite.getImage('zero');
        super(
            image,
            0, 0,
            image.width, image.height,
            0, 0,
            image.width, image.height
        );
        this.x = this.dataStore.canvas.width / 2;
        this.y = this.dataStore.canvas.height / 18;
        this.scoreNumber = 0;
        // canvas 刷新很快， 判断是否能够加分
        this.isScore = true;
    }
    draw() {
        let imageArr = this.numToPic(this.scoreNumber);
        for (let i = 0; i < imageArr.length; i++) {
            // 数字图片居中
            let x = this.x - imageArr.length * this.img.width / 2;
            super.draw(
                imageArr[i],
                this.srcX, this.srcY,
                this.srcW, this.srcH,
                x + i * this.img.width, this.y,
                this.width, this.height
            );
        }

    }
    // 数字转数字图片
    numToPic(num) {
        const numPicArr = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        let strNums = num.toString().split('');
        let imageArr = [];
        for (let value of strNums) {
            imageArr.push(Sprite.getImage(numPicArr[Number(value)]));
        }
        return imageArr;
    }
}
