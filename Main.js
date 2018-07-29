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
import { Message } from './js/player/Message.js';
import { Title } from './js/player/Title.js';
import { Medal } from './js/player/Medal.js';
import { Rank } from './js/player/Rank.js';
import { NewScore } from './js/player/NewScore.js';
import { Ready } from './js/player/Ready.js';
import { Share } from './js/player/Share.js';

/**
 * 初始化整个游戏的精灵，作为游戏开始的入口
 */
export class Main {
    constructor() {
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
    }
    /**
     * 创建背景音乐
     */
    createBackgroundMusic() {
        const bgm = wx.createInnerAudioContext();
        bgm.autoplay = true;
        bgm.loop = true;
        bgm.src = 'audios/bgm.mp3';
    }
    /**
     * 创建小鸟移动音效
     */
    createMoveSoundEffect() {
        this.moveSound = wx.createInnerAudioContext();
        this.moveSound.src = 'audios/move.mp3';
    }
    /**
     * 创建撞击音效
     */
    createCrashSoundEffect() {
        this.crashSound = wx.createInnerAudioContext();
        this.crashSound.src = 'audios/crash.mp3';
    }
    /**
     * 创建坠落音效
     */
    createDieSoundEffect() {
        this.dieSound = wx.createInnerAudioContext();
        this.dieSound.src = 'audios/die.mp3';
    }
    /**
     * 创建得分音效
     */
    createPointSoundEffect() {
        this.pointSound = wx.createInnerAudioContext();
        this.pointSound.src = 'audios/point.mp3';
    }
    /**
     * 切换菜单音效
     */
    createSwooshSoundEffect() {
        this.swooshSound = wx.createInnerAudioContext();
        this.swooshSound.src = 'audios/swoosh.mp3';
    }
    /**
     * 游戏初次打开时加载所有需要运行一次的基础资源
     */
    onResourceFirstLoaded(map) {
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        // this.createBackgroundMusic();
        this.createMoveSoundEffect();
        this.createCrashSoundEffect();
        this.createDieSoundEffect();
        this.createPointSoundEffect();
        this.createSwooshSoundEffect();
        // 创建朋友圈按钮
        let button = wx.createGameClubButton({
            icon: 'green',
            style: {
                left: 10,
                top: 76,
                width: 40,
                height: 40
            }
        });
        // 注册游戏第一次加载时所有的事件
        this.registerEvent();
        this.init();
    }
    /**
     * 游戏所有运行时数据初始化
     */
    init() {
        // 判断游戏是不是第一次进，如果 isGameOver===true 说明不是第一次进，直接进入准备页面
        if (this.director.isGameOver) {
            this.director.gameHome = false;
            this.director.gameReady = true;
        } else {
            this.director.gameHome = true;
            this.director.gameReady = false;
        }
        this.director.isGameOver = false;
        this.director.gameStart = false;
        //
        this.dataStore.put('background', BackGround)
            .put('land', Land)
            .put('pencils', [])
            .put('birds', Birds)
            .put('title', Title)
            .put('ready', Ready)
            .put('score', Score)
            .put('helpInfo', HelpInfo)
            .put('gameOver', GameOver)
            .put('message', Message)
            .put('medal', Medal)
            .put('newScore', NewScore)
            .put('startButton', StartButton)
            .put('rank', Rank)
            .put('share', Share)
            .put('crashSound', this.crashSound)
            .put('dieSound', this.dieSound)
            .put('pointSound', this.pointSound)
            .put('swooshSound', this.swooshSound);
        this.director.createPencil();
        this.director.run();
    }
    /**
     * 游戏第一次加载时注册所有事件
     */
    registerEvent() {
        wx.showShareMenu({ withShareTicket: true });
        wx.onShareAppMessage(() => {
            // 用户点击了“转发”按钮
            return {
                title: 'FlappyBirdUp',
                imageUrl: this.canvas.toTempFilePathSync({
                    destWidth: 500,
                    destHeight: 400
                })
            }
        });
        wx.onTouchStart((res) => {
            const touchX = res.touches[0].clientX;
            const touchY = res.touches[0].clientY;
            const startButton = this.dataStore.get('startButton');
            const share = this.dataStore.get('share');
            // 判断是否已经进入主页，如果是点击屏幕后就进入游戏准备页
            if (this.director.gameHome === true) {
                if (this.checkClickArea(
                    touchX, touchY,
                    startButton.x, startButton.y,
                    startButton.width, startButton.height
                )) {
                    console.log('游戏准备');
                    this.director.gameHome = false;
                    this.director.gameReady = true;
                    this.swooshSound.play();
                }
                // 点击分享按钮
                if (this.checkClickArea(
                    touchX, touchY,
                    share.x, share.y,
                    share.width, share.height
                )) {
                    this.swooshSound.play();
                    this.forward('FlappyBirdUp');
                }
            }
            // 判断是否已经进入游戏准备页面，如果是点击屏幕后开始游戏
            else if (this.director.gameReady === true) {
                console.log('游戏开始');
                this.director.gameReady = false;
                this.director.gameStart = true;
                this.moveSound.play();
            }
            // 判断游戏是否开始，如果是就激活小鸟移动
            else if (this.director.gameStart && !this.dataStore.get('birds').willCrash) {
                this.moveSound.play();
                this.director.birdsEvent();
            }
            // 判断游戏是否结束，如果是就重启游戏
            else if (this.director.isGameOver) {
                // 判断点击的坐标是否在 startButton 图片坐标内，如果在就开始游戏
                if (this.checkClickArea(
                    touchX, touchY,
                    startButton.x, startButton.y,
                    startButton.width, startButton.height
                )) {
                    console.log('游戏准备');
                    this.swooshSound.play();
                    // 取消一个先前通过调用 requestAnimationFrame 方法添加到计划中的动画帧请求
                    cancelAnimationFrame(this.dataStore.get('timer'));
                    this.dataStore.destroy();
                    // 触发微信小游戏垃圾回收
                    wx.triggerGC();
                    this.init();
                }
                // 点击分享按钮
                if (this.checkClickArea(
                    touchX, touchY,
                    share.x, share.y,
                    share.width, share.height
                )) {
                    this.swooshSound.play();
                    this.forward('FlappyBirdUp');
                }
            }
        });
    }
    /**
     * 检查屏幕点击区域是否在按钮区域内
     */
    checkClickArea(touchX, touchY, areaX, areaY, width, height) {
        return touchX > areaX && touchX < (areaX + width) && touchY > areaY && touchY < (areaY + height);
    }
    /**
     *  分享小游戏
     */
    forward(title) {
        wx.shareAppMessage({
            title: title,
            imageUrl: this.canvas.toTempFilePathSync({
                destWidth: 500,
                destHeight: 400
            })
        });
    }
}
