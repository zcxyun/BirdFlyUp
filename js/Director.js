import { DataStore } from "./base/DataStore.js";
import { PencilLeft } from "./runtime/PencilLeft.js";
import { PencilRight } from "./runtime/PencilRight.js";

// 导演类 (控制游戏的逻辑)
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

    createPencil() {
        const minTop = DataStore.getInstance().canvas.width / 8;
        const maxTop = DataStore.getInstance().canvas.width / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new PencilLeft(top));
        this.dataStore.get('pencils').push(new PencilRight(top));
    }

    // 屏幕点击事件
    birdsEvent() {
        let birds = this.dataStore.get('birds');
        for (let i = 0; i <= 2; i++) {
            birds.x[i] = birds.birdsX[i];
        }
        birds.time = 0;
        birds.changeDirection = !birds.changeDirection;
    }

    // 判断小鸟是否和铅笔撞击
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
    // 判断小鸟是否撞击地面和铅笔
    check() {
        const birds = this.dataStore.get('birds');
        const pencils = this.dataStore.get('pencils');
        const score = this.dataStore.get('score');
        // 边缘的撞击判断
        if (birds.birdsX[0] + birds.birdsWidth[0] >= this.dataStore.canvas.width || birds.birdsX[0] <= 0) {
            this.isGameOver = true;
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
            if (Director.isStrike(birdsBorder, pencilBorder)) {
                console.log('撞到铅笔啦');
                this.isGameOver = true;
                return;
            }
        }
        // 加分
        if (birds.birdsY[0] + birds.birdsHeight[0] < pencils[0].y && score.isScore) {
            wx.vibrateShort({
              success: function(){

              }
            });
            score.isScore = false;
            score.scoreNumber++;
        }
    }

    run() {
        this.check();
        if (!this.isGameOver) {
            this.dataStore.get('background').draw();
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
            this.dataStore.get('land').draw();
            this.dataStore.get('score').draw();
            this.dataStore.get('birds').draw();
            let timer = requestAnimationFrame(() => {
                this.run();
            });
            this.dataStore.put('timer', timer);
        } else {
            console.log('游戏结束');
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(this.dataStore.timer);
            this.dataStore.destroy();
            // 触发微信小游戏垃圾回收
            wx.triggerGC();
        }
    }
}
