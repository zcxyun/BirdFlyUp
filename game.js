import { Main } from './Main.js';

new Main();


// let openDataContext = wx.getOpenDataContext();
// openDataContext.postMessage({
//     text: 'hello',
//     year: (new Date()).getFullYear()
// });

// let sharedCanvas = openDataContext.canvas;

// let canvas = wx.createCanvas();
// let context = canvas.getContext('2d');
// context.fillStyle = 'white';
// context.fillRect(0, 0, 100, 100);
// context.drawImage(sharedCanvas, 0, 0, sharedCanvas.width, sharedCanvas.height, 0, 0, sharedCanvas.width, sharedCanvas.height);

// wx.setUserCloudStorage({
//     KVDataList: [{ key: 'score', value: '3' }],
//     success: res => {
//         console.log(res);
//         // 让子域更新当前用户的最高分，因为主域无法得到getUserCloadStorage;
//         let openDataContext = wx.getOpenDataContext();
//         openDataContext.postMessage({
//             type: 'updateMaxScore',
//         });
//     },
//     fail: res => {
//         // console.log(res);
//     }
// });
// function loop() {
//     // 主域绘制
//     let openDataContext = wx.getOpenDataContext();
//     let sharedCanvas = openDataContext.canvas;
//     let canvas = wx.createCanvas();
//     // sharedCanvas.width = 400
//     // sharedCanvas.height = 200
//     // openDataContext.postMessage({
//     //     command: 'render'
//     // })

//     canvas.getContext('2d').drawImage(sharedCanvas, 0, 0);
//     // requestAnimationFrame(loop());
// }
// // loop();
// setTimeout(() => {
//     loop();
// }, 2000);
