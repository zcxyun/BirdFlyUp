import { DataStore } from "../base/DataStore.js";
import { Sprite } from "../base/Sprite.js";
import { Director } from "../Director.js";

/**
 * 计分器图片类
 */
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
        // 得分
        this.scoreNumber = 0;
        // canvas 刷新很快， 判断是否能够加分
        this.isScore = true;
        // 判断是否有新的记录
        this.hasNewScore = false;
    }
    draw() {
        if (Director.getInstance().isGameOver) {
            // 游戏结束计分板上显示本次得分信息
            this.drawScore(
                this.scoreNumber,
                (this.dataStore.canvas.width - this.width) / 2 + 100,
                (this.dataStore.canvas.height - this.height) / 2 - 7,
                this.width / 1.5, this.height / 1.6
            );
            // 游戏结束计分板上显示最高得分信息
            this.drawScore(
                wx.getStorageSync('maxScore') || 0,
                (this.dataStore.canvas.width - this.width) / 2 + 100,
                (this.dataStore.canvas.height - this.height) / 2 + 40,
                this.width / 1.5, this.height / 1.6,
            );
        } else {
            this.drawScore(this.scoreNumber, this.x, this.y, this.width, this.height);
        }
    }
    /**
     * 按一定条件画出计分器数字图片
     * @param {int} score
     * @param {int} desX
     * @param {int} desY
     * @param {int} width
     * @param {int} height
     */
    drawScore(score, desX, desY, width, height) {
        let imageArr = this.numToPic(score);
        for (let i = 0; i < imageArr.length; i++) {
            // 所有数字图片的宽度之和
            let imgWidthSum = imageArr.length * width;
            // 根据游戏是否结束设置起始数字图片 x 坐标
            let x = Director.getInstance().isGameOver ? desX - imgWidthSum : desX - imgWidthSum / 2;
            super.draw(
                imageArr[i],
                this.srcX, this.srcY,
                this.srcW, this.srcH,
                x + i * width, desY,
                width, height
            );
        }
    }
    /**
     * 数字转数字图片
     */
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
