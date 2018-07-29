/**
 * 变量缓存器，方便我们在不同的类中访问和修改变量
 */
export class DataStore {
    /**
     * 对象池单例
     */
    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore;
        }
        return DataStore.instance;
    }

    constructor() {
        this.map = new Map();
    }
    /**
     * 设置自身 map 中的值并返回自身
     * @param {string} key
     * @param {string} value
     */
    put(key, value) {
        if ( typeof value === 'function') {
            value = new value();
        }
        this.map.set(key, value);
        return this;
    }
    /**
     * 根据 key 获得自身 map 中相应的值
     * @param {string} key
     */
    get(key) {
        return this.map.get(key);
    }
    /**
     * 销毁自身 map 中的所有的值，使其为 null
     */
    destroy() {
        for (let value of this.map.values()) {
            value = null;
        }
    }
}
