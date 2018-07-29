import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";
import { Director } from "../Director.js";

/**
 * 小鸟图片类
 */
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
        // 小鸟原始图片的裁剪 x 坐标
        this.clippingX = [
            9,
            9 + 34 + 18,
            9 + 34 + 18 + 34 + 18
        ];
        // 小鸟原始图片的裁剪 y 坐标
        this.clippingY = [10, 10, 10];
        // 小鸟原始图片的裁剪宽度
        this.clippingWidth = [34, 34, 34];
        // 小鸟原始图片的裁剪高度
        this.clippingHeight = [24, 24, 24];
        // 小鸟 x 坐标
        const birdX = (DataStore.getInstance().canvas.width - 34) / 2;
        this.birdsX = [birdX, birdX, birdX];
        // 小鸟 y 坐标
        const birdY = DataStore.getInstance().canvas.height / 2 - 70;
        this.birdsY = [birdY, birdY, birdY];
        // 小鸟要显示的宽度
        const birdWidth = 34;
        this.birdsWidth = [birdWidth, birdWidth, birdWidth];
        // 小鸟要显示的高度
        const birdHeight = 24;
        this.birdsHeight = [birdHeight, birdHeight, birdHeight];
        // 小鸟加速度起始位置
        this.x = [birdX, birdX, birdX];
        // 小鸟坠落高度
        const birdCrashY = DataStore.getInstance().canvas.height - Sprite.getImage('land').height - 24;
        this.y = [birdCrashY, birdCrashY, birdCrashY];
        // 小鸟图片切换时的索引
        this.index = 0;
        // 累加器， 累加到整数（例如0，1，2）赋值给小鸟图片的索引
        this.count = 0;
        // 小鸟下落时所用的时间
        this.time = 0;
        // 改变向上飞的方向
        this.changeDirection = false;
        // 小鸟是否将要下坠
        this.willCrash = false;
        // 小鸟在首页左右移动的速度
        this.moveSpeed = 2;
    }

    draw() {
        this.toggleBird();
        // 小鸟在首页渲染的情况
        if (Director.getInstance().gameHome) {
            this.birdsHome();
        // 小鸟在准备页面渲染的情况
        } else if (Director.getInstance().gameReady) {
            for (let i = 0; i <= 2; i++) {
                this.birdsY[i] = DataStore.getInstance().canvas.height - Sprite.getImage('land').height - 24;
                // this.birdsX[i] = (DataStore.getInstance().canvas.width - 34) / 2;
            }
        // 小鸟在游戏开始时渲染的情况
        } else if (Director.getInstance().gameStart) {
            this.birdsMove();
        // 小鸟将要坠落时渲染的情况
        } else if (this.willCrash) {
            this.birdsCrashDown();
        }
        super.draw(
            this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index],
            this.birdsX[this.index], this.birdsY[this.index],
            this.birdsWidth[this.index], this.birdsHeight[this.index]
        );
    }
    /**
     * 按一定速度切换三只小鸟的图片，使其看起来像扇动翅膀
     */
    toggleBird() {
        // 切换三只小鸟的速度
        const speed = 0.1;
        this.count = this.count + speed;
        // 0, 1, 2
        if (this.index >= 2) {
            this.count = 0;
        }
        // 减速器的作用，控制小鸟扇动翅膀的速度
        this.index = Math.floor(this.count);
    }
    /**
     * 首页小鸟左右移动
     */
    birdsHome() {
        if (this.birdsX[0] < 150 - this.birdsWidth[0]/2) {
            this.moveSpeed = 2;
        }
        if (this.birdsX[0] > (DataStore.getInstance().canvas.width - 150 - this.birdsWidth[0]/2)) {
            this.moveSpeed = -2;
        }
        for (let i = 0; i <= 2; i++) {
            this.birdsX[i] = this.birdsX[i] + this.moveSpeed;
        }
        this.img = this.moveSpeed < 0 ? Sprite.getImage('birdsToLeft') : Sprite.getImage('birdsToRight');
    }
    /**
     * 小鸟左右移动带惯性
     */
    birdsMove() {
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
    }
    /**
     * 小鸟坠落
     */
    birdsCrashDown() {
        // 模拟重力加速度
        const g = 0.98 / 2;
        //小鸟的位移
        let offsetY = (g * this.time * this.time) / 2;
        for (let i = 0; i <= 2; i++) {
            this.birdsY[i] = this.y[i] + offsetY;
        }
        this.time++;
    }
}
