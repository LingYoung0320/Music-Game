// 画布和画笔
const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

// 游戏开始函数
function gameStart(){
    // 音符出现
    NoteAer(note[0]);
    let order=1;
    let timerId = setInterval(()=>{
        if(order<melodyTol){
        NoteAer(note[order]);
        order++;
        }
    },1000);
    setTimeout(() => { 
        clearInterval(timerId);
        alert("Total Scores="+score);
    }, 15000);  // 最佳总时长=音符个数*1000 + 3000

    // 音符判定
    let judgeOrder=0;
    document.onkeydown=function(event){
        do{
            NoteJudge(note[judgeOrder],event);
            judgeOrder++;
        }while(note[judgeOrder-1]==true && judgeOrder < melodyTol)
    }

    // 分数显示
    scoreView();
}

// 定义乐谱（音符出现顺序）
// 音符数组名为note
// 1-左键 2-右键 3-上键 4-下键
let melody=[1,2,2,4,3,1,1,3,4,3,4];

// 绘制游戏背景
context.rect(0, 0, canvas.width, canvas.height);
context.fillStyle = "#f4ddbe";
context.fill();
// 游戏画面主框
// ps.每帧更新框位置及大小(410,330,880,400)
shadowDraw(5,5,5,0.25);
context.strokeStyle = "#ffffff";
rounderRectangle(400,250,900,500,15);
context.stroke();
context.fillStyle = "#ffffff";
context.fill();
// 分数显示框
// ps.每帧更新框位置及大小(510,160,130,130)
shadowDraw(5,5,5,0.15);
context.strokeStyle = "#c8e3de";
rounderRectangle(500,150,150,150,15);
context.stroke();
context.fillStyle = "#c8e3de";
context.fill();
// 判断线绘制
JudgeLineDraw();
// 判定显示框
// ps.每帧更新框位置及大小(970,220,260,60)
shadowDraw(5,5,5,0.15);
context.strokeStyle = "#fab984";
rounderRectangle(960,210,280,80,15);
context.stroke();
context.fillStyle = "#fab984";
context.fill();

// 阴影绘制函数
function shadowDraw(x,y,b,c){
    context.shadowOffsetX = x;
    context.shadowOffsetY = y;
    context.shadowBlur = b;
    context.shadowColor = "rgba(0, 0, 0,"+ c +")";
}

// 圆角矩形绘制函数
function rounderRectangle(a,b,w,h,r){
    context.beginPath();
    context.moveTo(a+r,b);
    context.arcTo(a+w,b,a+w,b+h,r);
    context.arcTo(a+w,b+h,a,b+h,r);
    context.arcTo(a,b+h,a,b,r);
    context.arcTo(a,b,a+w,b,r);    
    context.closePath();
    return this;
}

// 音符判断线绘制函数
function JudgeLineDraw(){
    shadowDraw(0,0,0,0);
    // context.strokeStyle = "#1c1c1c";
    context.moveTo(1050,310);
    context.lineTo(1050,730);
    context.stroke();
}

// 加载图片
let img = [], 
    flag = 0,
    mulitImg = [
    './pic/icon.jpg',
    './pic/note01.png',
    './pic/note02.png',
    './pic/note03.png',
    './pic/note04.png',
    './pic/judge01.png',
    './pic/judge02.png',
    './pic/judge03.png',
    './pic/judge04.png',
    './pic/judge05.png'
 ];

 let imgTotal = mulitImg.length;
 for(let i = 0 ; i <= imgTotal ; i++){
    img[i] = new Image()
    img[i].src = mulitImg[i]
    img[i].onload = function(){
       flag++;
       if( flag == imgTotal ){
        gameStart();
     }
    }
 }

// 生成音符
// 首先定义音符多维数组
let note=new Array();
let melodyTol=melody.length;
for(let i=0;i<melodyTol;i++)
note[i] = new Array();
// 逐个定义
for(let i = 0 ; i < melodyTol ; i++){
    if(melody[i]==1){
        note[i][0] = 1;         // TYPE
        note[i][1] = false;     // JudegeOrNot
        note[i][2] = 410;       // X
        note[i][3] = 330;       // Y
        note[i][4] = true;       // ClearOrNot
    }
    if(melody[i]==2){
        note[i][0] = 2;
        note[i][1] = false;
        note[i][2] = 410;
        note[i][3] = 430;
        note[i][4] = true;
    }
    if(melody[i]==3){
        note[i][0] = 3;
        note[i][1] = false;
        note[i][2] = 410;
        note[i][3] = 530;
        note[i][4] = true;
    }
    if(melody[i]==4){
        note[i][0] = 4;
        note[i][1] = false;
        note[i][2] = 410;
        note[i][3] = 630;
        note[i][4] = true;
    }
    if(i==0)
    note[i][4]=false;
}

 // 音符图标移动函数
 // image：音符信息
 function NoteAer(image){
    let jon = 0;
    function render() {
        if(jon==0&&image[2]==1100){
            jon=1;
            image[1]=true;
        }
        if(image[4]==false){
            context.clearRect(410,330,880,400);
            JudgeLineDraw();
        }
        if(image[2]<1200){
            image[2]++;
            context.drawImage(img[image[0]], image[2], image[3]);
        }
        if(image[2]==1200){
            context.clearRect(image[2],image[3],100,100);
            image[2]++;
        }
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

// 音符判断
function NoteJudge(image,event){
    switch(image[0]){
        case 1:
            if(event.key=='ArrowLeft'&&image[1]==false){
                image[1]=true;
                Judge(image[2]);
            }else{
                NoteJudge(image,event);
            }
            break;
        case 2:
            if(event.key=='ArrowRight'&&image[1]==false){
                image[1]=true;
                Judge(image[2]);
            }else{
                NoteJudge(image,event);
            }
            break;
        case 3:
            if(event.key=='ArrowUp'&&image[1]==false){
                image[1]=true;
                Judge(image[2]);
            }else{
                NoteJudge(image,event);
            }
            break;   
        case 4:
            if(event.key=='ArrowDown'&&image[1]==false){
                image[1]=true;
                Judge(image[2]);
            }else{
                NoteJudge(image,event);
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
            JudView(spot_x+5);
            score+=100;
            ReScore();
            break;
        case 1:
            JudView(spot_x+5);
            score+=75;
            ReScore();
            break;
        case 2:
            JudView(spot_x+5);
            score+=50;
            ReScore();
            break;
        case 3:
            JudView(spot_x+5);
            score+=25;
            ReScore();
            break;
        default:
            JudView(9);
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
    context.drawImage(img[num], 950, 200);
    BeJudging = true;
    if(BeJudging==true)
            setTimeout(DeleJud,500);
}

// 分数显示
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