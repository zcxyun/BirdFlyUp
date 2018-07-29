import {Resources} from './Resources.js';

/**
 * 资源文件加载器，确保 canvas 在图片资源加载完成后才进行渲染
 */
export class ResourceLoader {
    /**
     * 初始化时使自身 map 加载所有图片 image 对象
     */
    constructor() {
        this.map = new Map(Resources);
        for (const [key, value] of this.map) {
            let image = wx.createImage();
            image.src = value;
            this.map.set(key, image);
        }
    }
    /**
     * 当自身map中所有图片 image 对象加载完成时，返回自身 map
     * @param {function}} callback
     */
    onLoaded(callback) {
        let loadedCount = 0;
        for (const value of this.map.values()) {
            value.onload = () => {
                loadedCount++;
                if (loadedCount >= this.map.size) {
                    callback(this.map);
                }
            }
        }
    }
    /**
     * 静态工厂方法，返回自身实例
     */
    static create() {
        return new ResourceLoader();
    }
}
