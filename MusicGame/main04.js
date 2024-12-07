// 画布和画笔
const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

// 图片容器
const imageCache = new Map();

// 图片资源加载函数
function loadImage(url){
    return new Promise((resolve,reject)=>{
        const image = new Image();
        image.onload = function(){
            imageCache.set(url,image);  
            resolve();
        };
        image.src = url;
    });
}

// 渲染对象父类
class DisplayObject {
    renderOrNot = false;
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    draw() {}
}
// 图片子类
class Bitmap extends DisplayObject {
    image;
    judgeOrNot = false;
    draw(context) {
        const texture = imageCache.get(this.image);
        if (texture) {
            context.drawImage(texture, this.x, this.y);
        }
    }
}
// 文字子类
class TextField extends DisplayObject {
    text = "";

    draw(context) {
        context.font = "30px Arial";
        context.fillText(this.text, this.x, this.y + 30);
    }
}


// 定义乐谱（音符出现顺序）
// 音符数组名为note
// 1-左键 2-右键 3-上键 4-下键
// 5-左键和右键 6-上键和下键
// 7-左键和上键 8-右键和上键
// 9-左键和下键 10-右键和下键
let melody=[1,3,5,2,4,6,3,1,7,4,8,5,2,9,6,10];
let note=new Array();

// 生成音符
// i为乐谱事件个数
// j为音符个数
let j=0;
for(let i=0;i<melody.length;i++){
    switch(melody[i]){
        case 1:
            note.push(new Bitmap(410,330));
            note[j].image = "./pic/note01.png";
            j++;
            break;
        case 2:
            note.push(new Bitmap(410,430));
            note[j].image = "./pic/note02.png";
            j++;
            break;
        case 3:
            note.push(new Bitmap(410,530));
            note[j].image = "./pic/note03.png";
            j++;
            break;
        case 4:
            note.push(new Bitmap(410,630));
            note[j].image = "./pic/note04.png";
            j++;
            break;
        case 5:
            note.push(new Bitmap(410,330));
            note[j].image = "./pic/note01.png";
            j++;
            note.push(new Bitmap(410,430));
            note[j].image = "./pic/note02.png";
            j++;
            break;
        case 6:
            note.push(new Bitmap(410,530));
            note[j].image = "./pic/note03.png";
            j++;
            note.push(new Bitmap(410,630));
            note[j].image = "./pic/note04.png";
            j++;
            break;
        case 7:
            note.push(new Bitmap(410,330));
            note[j].image = "./pic/note01.png";
            j++;
            note.push(new Bitmap(410,530));
            note[j].image = "./pic/note03.png";
            j++;
            break;
        case 8:
            note.push(new Bitmap(410,430));
            note[j].image = "./pic/note02.png";
            j++;
            note.push(new Bitmap(410,530));
            note[j].image = "./pic/note03.png";
            j++;
            break;
        case 9:
            note.push(new Bitmap(410,330));
            note[j].image = "./pic/note01.png";
            j++;
            note.push(new Bitmap(410,630));
            note[j].image = "./pic/note04.png";
            j++;
            break;
        case 10:
            note.push(new Bitmap(410,430));
            note[j].image = "./pic/note02.png";
            j++;
            note.push(new Bitmap(410,630));
            note[j].image = "./pic/note04.png";
            j++;
            break;        
    }
}

let displayObjectList=new Array();
for(let i=0;i<note.length;i++)
displayObjectList.push(note[i]);

 class GameEngine {
    onUpdate;

    // 载入图片资源
    async start() {
        const imageList = [
        './pic/icon.jpg',
        './pic/note01.png',
        './pic/note02.png',
        './pic/note03.png',
        './pic/note04.png'];
        for (const item of imageList) {
            await loadImage(item);
        }
        requestAnimationFrame(() => this.render());
    }

    // 开始动画
    render() {
        context.clearRect(410,330,880,400);
        JudgeLineDraw();
        this.onUpdate();
        for (const displayObject of displayObjectList) {
            if(displayObject.renderOrNot){
                shadowDraw(0,0,0,0);
                displayObject.draw(context);

            }
        }
        requestAnimationFrame(() => this.render());
    }
}

// 控制音符延迟依次出现
note[0].renderOrNot = true; // 第一个音符不需要等待1秒
let order = 1;
let morder = 1;
let timerId = setInterval(()=>{
    if(order < melody.length && melody[morder] <= 4){
        note[order].renderOrNot = true;
        order++;
        morder++;
    } 
    else if(order < melody.length && melody[morder] > 4){
        note[order].renderOrNot = true;
        order++;
        note[order].renderOrNot = true;
        order++;
        morder++;
    }
},1000);

setTimeout(() => { 
        clearInterval(timerId);
        alert("Total Scores="+score);
    }, melody.length*1000 + 5000);

// 运行引擎
const gameEngine = new GameEngine();

gameEngine.onUpdate = function () {
    let i=0;
    do{
        if(melody[i] <= 4){
            if(note[i].x < 1200){
                note[i].x +=1.5;
                i++;
            }else{
                note[i].renderOrNot = false;
                i++;
            }
        }else if(melody[i] > 4){
            if(note[i].x < 1200){
                note[i].x +=1.5;
                note[i+1].x +=1.5;
                i+=2;
            }else{
                note[i].renderOrNot = false;
                note[i+1].renderOrNot = false;
                i+=2;
            }
        }
    }while(i<morder);
};

gameEngine.start();

// 交互部分（音符判定）
let judgeOrder=0;
document.onkeydown=function(event){
    do{
        NoteJudge(judgeOrder,event);
        judgeOrder++;
    }while(note[judgeOrder-1].judgeOrNot==true && judgeOrder < melody.length)
}

// 音符判断
function NoteJudge(num,event){
    switch(melody[num]){
        case 1:
            if(event.key=='ArrowLeft'&&note[num].judgeOrNot==false){
                note[num].judgeOrNot=true;
                Judge(note[num].x);
            }else{
                NoteJudge(num,event);
            }
            break;
        case 2:
            if(event.key=='ArrowRight'&&note[num].judgeOrNot==false){
                note[num].judgeOrNot=true;
                Judge(note[num].x);
            }else{
                NoteJudge(num,event);
            }
            break;
        case 3:
            if(event.key=='ArrowUp'&&note[num].judgeOrNot==false){
                note[num].judgeOrNot=true;
                Judge(note[num].x);
            }else{
                NoteJudge(num,event);
            }
            break;   
        case 4:
            if(event.key=='ArrowDown'&&note[num].judgeOrNot==false){
                note[num].judgeOrNot=true;
                Judge(note[num].x);
            }else{
                NoteJudge(num,event);
            }
            break; 
    }
}

// 避免判断框打架设置一个是否在判定
let BeJudging = false;

function Judge(pos_x){
    let spot_x = 0;
    if(pos_x>1000){
    spot_x=(pos_x-1000)/10;
    }else{
    spot_x=(1000-pos_x)/10;
    }
    spot_x=Math.floor(spot_x);
    switch(spot_x){
        case 0:
            JudView(spot_x);
            score+=100;
            ReScore();
            break;
        case 1:
            JudView(spot_x);
            score+=75;
            ReScore();
            break;
        case 2:
            JudView(spot_x);
            score+=50;
            ReScore();
            break;
        case 3:
            JudView(spot_x);
            score+=25;
            ReScore();
            break;
        default:
            JudView(4);
            break;
    }
}

function DeleJud(){
    context.clearRect(970,220,260,60);
    context.fillStyle = "#fab984";
    context.fillRect(970,220,260,60);
    BeJudging = false;
}

function JudView(num){
    if(BeJudging==true)
    DeleJud();
    drawJudge(num);
    BeJudging = true;
    if(BeJudging==true)
            setTimeout(DeleJud,500);
}

let J=['PERFECT','GREAT','GOOD','BAD','MISS'];
function drawJudge(num){
    shadowDraw(0,0,0,0);
    context.font = '40px "黑体"';
	context.fillStyle = "#115f51";
	context.textAlign = "center";
	context.fillText(J[num], 1100, 270);
}

let score = 0;

function scoreView(){
    shadowDraw(0,0,0,0);
    context.font = '40px "黑体"';
	context.fillStyle = "#115f51";
	context.textAlign = "center";
	context.fillText(score, 575, 240);
}

function DeleScore(){
    context.clearRect(510,160,130,130);
    context.fillStyle = "#c8e3de";
    context.fillRect(510,160,130,130);
}

function ReScore(){
    DeleScore();
    scoreView();
}