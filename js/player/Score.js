import { DataStore } from "../base/DataStore.js";

// 计分器类
export class Score {
    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        this.scoreNumber = 0;
        // canvas 刷新很快， 判断是否能够加分
        this.isScore = true;
    }
    draw() {
        this.ctx.font = '40px Arial';
        this.ctx.strokeText(this.scoreNumber,
            DataStore.getInstance().canvas.width / 2,
            DataStore.getInstance().canvas.height / 15, 1000);
        this.ctx.fillStyle = '#fff';
    }
}
