import { DataStore } from "./base/DataStore.js";
import { PencilLeft } from "./runtime/PencilLeft.js";
import { PencilRight } from "./runtime/PencilRight.js";
import { Sprite } from "./base/Sprite.js";

/**
 * 导演类 (控制游戏的逻辑)
 */
export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }
    /**
     * 创建管道
     */
    createPencil() {
        const minLeft = DataStore.getInstance().canvas.width / 10;
        const maxLeft = DataStore.getInstance().canvas.width / 2;
        const left = minLeft + Math.random() * (maxLeft - minLeft);
        this.dataStore.get('pencils').push(new PencilLeft(left));
        this.dataStore.get('pencils').push(new PencilRight(left));
    }
    /**
     * 小鸟左右移动
     */
    birdsEvent() {
        let birds = this.dataStore.get('birds');
        for (let i = 0; i <= 2; i++) {
            birds.x[i] = birds.birdsX[i];
        }
        birds.time = 0;
        birds.changeDirection = !birds.changeDirection;

    }

    /**
     * 判断小鸟是否和铅笔撞击
     */
    static isStrike(bird, pencil) {
        let s = true;
        // 返逻辑， 判断不撞的情况
        if (bird.top > pencil.bottom ||
            bird.bottom < pencil.top ||
            bird.right < pencil.left ||
            bird.left > pencil.right
        ) {
            s = false;
        }
        return s;
    }
    /**
     * 判断小鸟是否撞击地面和铅笔
     */
    check() {
        const birds = this.dataStore.get('birds');
        const pencils = this.dataStore.get('pencils');
        const score = this.dataStore.get('score');
        // 边缘的撞击判断
        if (birds.birdsX[0] + birds.birdsWidth[0] >= this.dataStore.canvas.width || birds.birdsX[0] <= 0) {
            this.dataStore.get('crashSound').play();
            birds.willCrash = true;
            this.gameStart = false;
            birds.time = 0;
            return;
        }
        // 小鸟的边框模型
        const birdsBorder = {
            top: birds.birdsY[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        };
        const length = pencils.length;
        for (let i = 0; i < length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };
            // 管道的撞击判断
            if (Director.isStrike(birdsBorder, pencilBorder)) {
                console.log('撞到铅笔啦');
                this.dataStore.get('crashSound').play();
                birds.willCrash = true;
                this.gameStart = false;
                birds.time = 0;
                return;
            }
        }
        // 加分
        if (birds.birdsY[0] + birds.birdsHeight[0] < pencils[0].y && score.isScore) {
            wx.vibrateShort({
                success: function () {

                }
            });
            this.dataStore.get('pointSound').play();
            score.isScore = false;
            score.scoreNumber += 2;
            if (wx.getStorageSync('scoreSum') < score.scoreNumber) {
                score.hasNewScore = true;
                wx.setStorageSync('scoreSum', score.scoreNumber);
                wx.setUserCloudStorage({
                    KVDataList: [{key: 'score', value: score.scoreNumber.toString()}],
                    success: (res) => {
                        console.log(res + '存往云端');
                        // 让子域更新当前用户的最高分，因为主域无法得到getUserCloadStorage;
                        let openDataContext = wx.getOpenDataContext();
                        openDataContext.postMessage({
                            type: 'updateMaxScore',
                        });
                    },
                    fail: (res) => {
                        console.log(res);
                    }
                });
            }
        }
    }
    /**
     * 从对象池获得管道数组，并按一定条件使其按队列形式从数组中删除和添加，最后依次画出数组中的管道
     */
    togglePencils() {
        const pencils = this.dataStore.get('pencils');
        const height = this.dataStore.canvas.height;
        if (pencils[0].y >= height && pencils.length === 4) {
            pencils.shift();
            pencils.shift();
            this.dataStore.get('score').isScore = true;
        }
        if (pencils[0].y >= (height - pencils[0].height) / 2 && pencils.length === 2) {
            this.createPencil();
        }
        this.dataStore.get('pencils').forEach(value => {
            value.draw();
        });
    }
    /**
     * 显示排行榜
     */
    showRankInfo() {
        if (this.showRank) {
            this.dataStore.ctx.drawImage(this.dataStore.sharedCanvas, 0, 0, this.dataStore.canvas.width, this.dataStore.canvas.height);
        }
        if (this.dataStore.shareTicket && !this.showGroupRank) {
            this.showGroupRank = true;
            this.messageSharecanvas('group', this.dataStore.shareTicket);
        }
    }
    /**
     * 游戏运行时
     */
    run() {
        // 碰撞检测
        let birds = this.dataStore.get('birds');
        // 判断小鸟是否将要下坠，如果不就检测碰撞
        if (!birds.willCrash && !this.isGameOver) {
            this.check();
        }
        // 如果小鸟下坠的 y 坐标大于屏幕画布的高度，游戏结束并显示游戏结束画面
        if (birds.birdsY[0] > this.dataStore.canvas.height && birds.willCrash) {
            this.isGameOver = true;
            // 播放坠落音效
            this.dataStore.get('dieSound').play();
        }
        // 如果isGameOver!==true，游戏没有结束，继续游戏循环动画，否则游戏结束，退出循环
        if (!this.isGameOver) {
            this.dataStore.get('background').draw();
            this.dataStore.get('land').draw();
            this.dataStore.get('birds').draw();
            // 游戏首页场景要显示的图片
            if (this.gameHome) {
                this.dataStore.get('title').draw();
                this.dataStore.get('startButton').draw();
                this.dataStore.get('rank').draw();
                this.dataStore.get('share').draw();
                this.showRankInfo();
                // 游戏准备页面场景要显示图片
            } else if (this.gameReady) {
                this.dataStore.get('helpInfo').draw();
                this.dataStore.get('ready').draw();
            }
            // 游戏准备页面场景或游戏开始运行页面的图片
            if (this.gameReady || this.gameStart) {
                this.togglePencils();
                this.dataStore.get('score').draw();
            }
            // 游戏结束要显示的图片
        } else {
            birds.willCrash = false;
            this.dataStore.get('background').draw();
            const score = this.dataStore.get('score');
            this.dataStore.get('gameOver').draw();
            this.dataStore.get('message').draw();
            this.dataStore.get('medal').draw();
            score.draw();
            // 判断是否有新的记录，如果有就显示 new
            if (score.hasNewScore) {
                this.dataStore.get('newScore').draw();
            }
            this.dataStore.get('startButton').draw();
            this.dataStore.get('rank').draw();
            this.dataStore.get('share').draw();
            this.showRankInfo();
        }
        // 游戏开始循环运行（在下次进行重绘时执行。）
        let timer = requestAnimationFrame(() => {
            this.run();
        });
        // 将游戏循环运行请求ID存入对象池
        this.dataStore.put('timer', timer);
    }
}
