import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

// 小鸟类
export class Birds extends Sprite {
    constructor() {
        let image = Sprite.getImage('birdsToRight');
        super(
            image,
            0, 0,
            image.width, image.height,
            0, 0,
            image.width, image.height
        )
        /**
         * 小鸟的三种状态需要一个数组去存储
         * 小鸟的宽是34， 高度是24， 上下边距是10，左右边距是9，
         */
        this.clippingX = [
            9,
            9 + 34 + 18,
            9 + 34 + 18 + 34 + 18
        ];
        this.clippingY = [10, 10, 10];
        this.clippingWidth = [34, 34, 34];
        this.clippingHeight = [24, 24, 24];
        const birdX = DataStore.getInstance().canvas.width / 2;
        this.birdsX = [birdX, birdX, birdX];
        const birdY = DataStore.getInstance().canvas.height - Sprite.getImage('land').height - 24;
        this.birdsY = [birdY, birdY, birdY];
        const birdWidth = 34;
        this.birdsWidth = [birdWidth, birdWidth, birdWidth];
        const birdHeight = 24;
        this.birdsHeight = [birdHeight, birdHeight, birdHeight];
        this.x = [birdX, birdX, birdX];
        this.index = 0;
        this.count = 0;
        this.time = 0;
        // 改变向上飞的方向
        this.changeDirection = false;
    }

    draw() {
        // 切换三只小鸟的速度
        const speed = 0.1;
        this.count = this.count + speed;
        // 0, 1, 2
        if (this.index >= 2) {
            this.count = 0;
        }
        // 减速器的作用
        this.index = Math.floor(this.count);

        // 模拟重力加速度
        const g = 0.98 / 10;
        // 增加一点惯性
        const offsetUp = 70;
        //小鸟的位移
        let offsetX = (g * this.time * (this.time - offsetUp)) / 2;
        // 根据向上飞的方向改变位移的方向，并获取位移的距离
        let offsetXChange = this.changeDirection ? -offsetX : offsetX;
        // 根据向上飞的方向改变小鸟的方向
        this.img = this.changeDirection ? Sprite.getImage('birdsToLeft') : Sprite.getImage('birdsToRight');

        for (let i = 0; i <= 2; i++) {
            this.birdsX[i] = this.x[i] + offsetXChange;
        }
        this.time++;
        super.draw(
            this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index],
            this.birdsX[this.index], this.birdsY[this.index],
            this.birdsWidth[this.index], this.birdsHeight[this.index]
        );
    }
}
