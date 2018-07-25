import { Sprite } from "../base/Sprite.js";

export class HelpInfo extends Sprite {
    constructor(){
        let image = Sprite.getImage('info');
        super(
            image,
            0, 0,
            image.width, image.height,
            0, 0,
            image.width, image.height
        );
        this.x = (this.dataStore.canvas.width - this.img.width) / 2;
        this.y = (this.dataStore.canvas.height - this.img.height) / 1.5;
    }
}
