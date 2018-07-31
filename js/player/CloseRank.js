import { Sprite } from "../base/Sprite.js";

export class CloseRank extends Sprite {
    constructor() {
        let image = Sprite.getImage('return');
        super(
            image,
            0, 0,
            image.width, image.height,
            0, 0,
            image.width, image.height
        );
        let scale = this.dataStore.canvas.width / 750;
        this.x = 80 * scale;
        this.y = 1120 * scale;
        this.width = 180 * scale - 80 * scale;
        this.height = 1220 * scale - 1120 * scale;
    }
}
