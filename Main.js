import { ResourceLoader } from './js/base/ResourceLoader.js';
import { Director } from './js/Director.js';
import { BackGround } from './js/runtime/BackGround.js';
import { DataStore } from './js/base/DataStore.js';
import { Land } from './js/runtime/Land.js';
import { Birds } from './js/player/Birds.js';
import { StartButton } from './js/player/StartButton.js';
import { Score } from './js/player/Score.js';
import { GameOver } from './js/player/GameOver.js';
import { HelpInfo } from './js/player/HelpInfo.js';

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
    // 创建小鸟移动音效
    createMoveSoundEffect() {
        this.moveSound = wx.createInnerAudioContext();
        this.moveSound.src = 'audios/move.mp3';
    }
    // 创建撞击音效
    createCrashSoundEffect() {
        this.crashSound = wx.createInnerAudioContext();
        this.crashSound.src = 'audios/crash.mp3';
    }
    // 创建坠落音效
    createDieSoundEffect() {
        this.dieSound = wx.createInnerAudioContext();
        this.dieSound.src = 'audios/die.mp3';
    }
    // 创建得分音效
    createPointSoundEffect() {
        this.pointSound = wx.createInnerAudioContext();
        this.pointSound.src = 'audios/point.mp3';
    }

    onResourceFirstLoaded(map) {
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        // this.createBackgroundMusic();
        this.createMoveSoundEffect();
        this.createCrashSoundEffect();
        this.createDieSoundEffect();
        this.createPointSoundEffect();

        this.init();
    }

    init() {
        wx.offTouchStart();
        this.director.isGameOver = false;
        this.director.gameStart = false;
        this.dataStore.put('background', BackGround)
            .put('land', Land)
            .put('pencils', [])
            .put('birds', Birds)
            .put('startButton', StartButton)
            .put('score', Score)
            .put('gameOver', GameOver)
            .put('helpInfo', HelpInfo)
            .put('crashSound', this.crashSound)
            .put('dieSound', this.dieSound)
            .put('pointSound', this.pointSound);
        this.director.createPencil();
        this.registerEvent();
        this.director.run();
    }

    registerEvent() {
        wx.onTouchStart(() => {
            this.director.gameStart = true;
            if (this.director.isGameOver) {
                console.log('游戏开始');
                this.init();
            } else {
                if (!this.dataStore.get('birds').willCrash) {
                    this.moveSound.play();
                    this.director.birdsEvent();
                }
            }
        });
    }
}
