const EventEmitter = require('events');

class MyEmitter extends EventEmitter{

}

const myEmitter = new MyEmitter();
const myEvent = 'user:click';


myEmitter.on(myEvent, function(click){
    console.log("user clicked on", click);
})

myEmitter.emit(myEvent, 'on OK');
myEmitter.emit(myEvent, 'on Cancel Button');

let count = 1;
setInterval(()=>{
myEmitter.emit(myEvent, `button Ok ${count++}`)
},1000)