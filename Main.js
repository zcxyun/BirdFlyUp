import { ResourceLoader } from './js/base/ResourceLoader.js';
import { Director } from './js/Director.js';
import { BackGround } from './js/runtime/BackGround.js';
import { DataStore } from './js/base/DataStore.js';
import { Land } from './js/runtime/Land.js';
import { Birds } from './js/player/Birds.js';
import { StartButton } from './js/player/StartButton.js';
import { Score } from './js/player/Score.js';

// 初始化整个游戏的精灵，作为游戏开始的入口
export class Main {
    constructor() {
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
    }

    // 创建背景音乐
    createBackgroundMusic() {
        const bgm = wx.createInnerAudioContext();
        bgm.autoplay = true;
        bgm.loop = true;
        bgm.src = 'audios/bgm.mp3';
    }
    // 创建点击屏幕音效
    createClickSoundEffect() {
        this.clickSound = wx.createInnerAudioContext();
        this.clickSound.src = 'audios/move.mp3';
    }
    // 创建撞击音效
    createCrashSoundEffect() {
        this.crashSound = wx.createInnerAudioContext();
        this.crashSound.src = 'audios/crash.mp3';
    }
    onResourceFirstLoaded(map) {
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        // this.createBackgroundMusic();
        this.createClickSoundEffect();
        this.createCrashSoundEffect();

        this.init();
    }

    init() {
        wx.offTouchStart();
        this.director.isGameOver = false;
        this.dataStore.put('background', BackGround)
            .put('land', Land)
            .put('pencils', [])
            .put('birds', Birds)
            .put('startButton', StartButton)
            .put('score', Score)
            .put('crashSound', this.crashSound);
        this.director.createPencil();
        this.registerEvent();
        this.director.run();
    }

    registerEvent() {
        wx.onTouchStart(() => {
            this.clickSound.play();
            if (this.director.isGameOver) {
                console.log('游戏开始');
                this.init();
            } else {
                this.director.birdsEvent();
            }
        });
    }
}
