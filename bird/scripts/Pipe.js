// 新建一个水管水管对
// 宽固定，高不固定
// x坐标通过拿到游戏界面的宽度
const gameWidth = gameDom.clientWidth;

class Pipe extends Rectangle{
    constructor(height,top,xSpeed,dom) {
        super(52,height,gameWidth,top,xSpeed,0,dom);
    }
    onMove(){
        if(this.left<-this.width){
            this.dom.remove();
        }
    }
}
function RandHeight(min,max){
    return Math.floor(Math.random() * (max-min) + min)
}

class PipePare{
    // 创建水管对
    // 有上水管，下水管
    constructor(speed) {
        this.space = 150;
        this.minHeight = 80;/*定义一下水管的最小高度*/
        this.maxHeight = gameHeight - this.space- landHeight;
        const upHeight = RandHeight(this.minHeight, this.maxHeight);
        const upDom = document.createElement('div');
        upDom.className = `pipe up`;
        this.upPipe = new Pipe(upHeight, 0, speed, upDom);
        const downHeight = landTop - upHeight - this.space;
        const downTop = landTop - downHeight ;
        const downDom = document.createElement('div');
        downDom.className = `pipe down`;
        this.downPipe = new Pipe(downHeight, downTop, speed, downDom);
        gameDom.append(downDom);
        gameDom.append(upDom);
    }
    get useless(){
        return this.upPipe.left < -this.upPipe.left;
    }
    move(duration){
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }

}

class PipePareProducer{
    constructor(speed) {
        this.pipes = [];
        this.timer = null;
        this.tick = 1500;
        this.speed = speed;
    }
    startProducer(){
        if(this.timer){
            return
        }
        this.timer = setInterval(()=>{
             this.pipes.push(new PipePare(this.speed));
             for(let i = 0;i<this.pipes.length;i++){
                 if(this.pipes[i].useless){
                     this.pipes.splice(i,1);
                     i--;
                 }
             }
        },this.tick)
    }
    stopProducer(){
        clearInterval(this.timer);
        this.timer = null;
    }
}
