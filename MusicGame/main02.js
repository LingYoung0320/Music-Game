// 画布和画笔
const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

// 游戏开始函数
function gameStart(){
    // 音符出现
    NoteAer(note[0]);
    let order = 1;
    let morder = 1;
    let timerId = setInterval(()=>{
        if(order < melodyTol && melody[morder] <= 4){
            NoteAer(note[order]);
            order++;
            morder++;
        }
        else if(order < melodyTol && melody[morder] > 4){
            NoteAer(note[order]);
            order++;
            NoteAer(note[order]);
            order++;
            morder++;
        }
    },2000);
    // 最佳总时长=melody.length*1000 + 4000
    setTimeout(() => { 
        clearInterval(timerId);
        alert("Total Scores="+score);
    }, melody.length*2000 + 4000);  

    // 音符判定
    let judgeOrder=0;
    let judMelOrder = 0;
    document.onkeydown=function(event){
        do{
            if(melody[judMelOrder] <= 4){
                NoteJudge(note[judgeOrder],melody[judMelOrder],event);
                judgeOrder++;
                judMelOrder++;
            }
            else if(melody[judMelOrder] > 4){
                NoteJudge(note[judgeOrder],melody[judMelOrder],event);
                note[judgeOrder+1][1]=true;
                judgeOrder+=2;
                judMelOrder++;
            }
        }while(note[judgeOrder-1][1]==true && judgeOrder < melodyTol)
    }

    // 分数显示
    scoreView();
}

// 定义乐谱（音符出现顺序）
// 音符数组名为note
// 1-左键 2-右键 3-上键 4-下键
// 5-左键和右键 6-上键和下键
// 7-左键和上键 8-右键和上键
// 9-左键和下键 10-右键和下键
let melody=[1,3,5,2,4,6,3,1,7,4,8,5,2,9,6,10];

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
let img = []; 
let flag = 0;
let mulitImg = [
    './pic/icon.jpg',
    './pic/note01.png',
    './pic/note02.png',
    './pic/note03.png',
    './pic/note04.png'
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
// i为乐谱事件个数
// j为音符个数
let note=new Array();
let melodyTol=melody.length;
for(let i=0;i<melody.length;i++){
    if(melody[i]>4)
    melodyTol++;
}
for(let i=0;i<melodyTol;i++)
note[i] = new Array();
// 逐个定义
let j=0;
for(let i = 0 ; i < melody.length ; i++){
    if(melody[i]==1){
        note[j][0] = 1;         // TYPE
        note[j][1] = false;     // JudegeOrNot
        note[j][2] = 410;       // X
        note[j][3] = 330;       // Y
        note[j][4] = true;       // ClearOrNot
        j++;
    }
    else if(melody[i]==2){
        note[j][0] = 2;
        note[j][1] = false;
        note[j][2] = 410;
        note[j][3] = 430;
        note[j][4] = true;
        j++;
    }
    else if(melody[i]==3){
        note[j][0] = 3;
        note[j][1] = false;
        note[j][2] = 410;
        note[j][3] = 530;
        note[j][4] = true;
        j++;
    }
    else if(melody[i]==4){
        note[j][0] = 4;
        note[j][1] = false;
        note[j][2] = 410;
        note[j][3] = 630;
        note[j][4] = true;
        j++;
    }
    else if(melody[i]==5){
        note[j][0] = 1;
        note[j][1] = false;
        note[j][2] = 410;
        note[j][3] = 330;
        note[j][4] = true;
        j++;
        note[j][0] = 2;
        note[j][1] = false;
        note[j][2] = 410;
        note[j][3] = 430;
        note[j][4] = true;
        j++;
    }
    else if(melody[i]==6){
        note[j][0] = 3;
        note[j][1] = false;
        note[j][2] = 410;
        note[j][3] = 530;
        note[j][4] = true;
        j++;
        note[j][0] = 4;
        note[j][1] = false;
        note[j][2] = 410;
        note[j][3] = 630;
        note[j][4] = true;
        j++;
    }
    else if(melody[i]==7){
        note[j][0] = 1;
        note[j][1] = false;
        note[j][2] = 410;
        note[j][3] = 330;
        note[j][4] = true;
        j++;
        note[j][0] = 3;
        note[j][1] = false;
        note[j][2] = 410;
        note[j][3] = 530;
        note[j][4] = true;
        j++;
    }
    else if(melody[i]==8){
        note[j][0] = 2;
        note[j][1] = false;
        note[j][2] = 410;
        note[j][3] = 430;
        note[j][4] = true;
        j++;
        note[j][0] = 3;
        note[j][1] = false;
        note[j][2] = 410;
        note[j][3] = 530;
        note[j][4] = true;
        j++;
    }
    else if(melody[i]==9){
        note[j][0] = 1;
        note[j][1] = false;
        note[j][2] = 410;
        note[j][3] = 330;
        note[j][4] = true;
        j++;
        note[j][0] = 4;
        note[j][1] = false;
        note[j][2] = 410;
        note[j][3] = 630;
        note[j][4] = true;
        j++;
    }
    else if(melody[i]==10){
        note[j][0] = 2;
        note[j][1] = false;
        note[j][2] = 410;
        note[j][3] = 430;
        note[j][4] = true;
        j++;
        note[j][0] = 4;
        note[j][1] = false;
        note[j][2] = 410;
        note[j][3] = 630;
        note[j][4] = true;
        j++;
    }
    if(i==0)
    note[i][4]=false;
}

 // 音符图标移动函数
 // image：音符信息
 function NoteAer(image){
    let jon = 0;
    function render() {
        if(jon==0 && image[2]==1050){
            if(image[1]==false)
            JudView(9);
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
let a = 0;
let b = 0;
function NoteJudge(image,num,event){
    switch(num){
        case 1:
            if(event.key=='ArrowLeft'&&image[1]==false){
                image[1]=true;
                Judge(image[2]);
            }
            else if(image[1]==false){
                    NoteJudge(image,num,event);
            }
            break;
        case 2:
            if(event.key=='ArrowRight'&&image[1]==false){
                image[1]=true;
                Judge(image[2]);
            }
            else if(image[1]==false){
                NoteJudge(image,num,event);
            }
            break;
        case 3:
            if(event.key=='ArrowUp'&&image[1]==false){
                image[1]=true;
                Judge(image[2]);
            }
            else if(image[1]==false){
                NoteJudge(image,num,event);
            }
            break;   
        case 4:
            if(event.key=='ArrowDown'&&image[1]==false){
                image[1]=true;
                Judge(image[2]);
            }
            else if(image[1]==false){
                NoteJudge(image,num,event);
            }
            break; 
        case 5:
            if(event.key=='ArrowLeft')
            a = 1;
            if(event.key=='ArrowRight')
            b = 1;
            if(a==1&&b==1&&image[1]==false){
                image[1]=true;
                Judge(image[2]);
                a = 0;
                b = 0;
            }
            else if(image[1]==false){
                NoteJudge(image,num,event);
            }
            break;
        case 6:
            if(event.key=='ArrowUp')
            a = 1;
            if(event.key=='ArrowDown')
            b = 1;
            if(a==1&&b==1&&image[1]==false){
                image[1]=true;
                Judge(image[2]);
                a = 0;
                b = 0;
            }
            else if(image[1]==false){
                NoteJudge(image,num,event);
            }
            break;
        case 7:
            if(event.key=='ArrowUp')
            a = 1;
            if(event.key=='ArrowLeft')
            b = 1;
            if(a==1&&b==1&&image[1]==false){
                image[1]=true;
                Judge(image[2]);
                a = 0;
                b = 0;
            }
            else if(image[1]==false){
                NoteJudge(image,num,event);
            }
            break;
        case 8:
            if(event.key=='ArrowUp')
            a = 1;
            if(event.key=='ArrowRight')
            b = 1;
            if(a==1&&b==1&&image[1]==false){
                image[1]=true;
                Judge(image[2]);
                a = 0;
                b = 0;
            }
            else if(image[1]==false){
                NoteJudge(image,num,event);
            }
            break;
        case 9:
            if(event.key=='ArrowLeft')
            a = 1;
            if(event.key=='ArrowDown')
            b = 1;
            if(a==1&&b==1&&image[1]==false){
                image[1]=true;
                Judge(image[2]);
                a = 0;
                b = 0;
            }
            else if(image[1]==false){
                NoteJudge(image,num,event);
            }
            break;
        case 10:
            if(event.key=='ArrowRight')
            a = 1;
            if(event.key=='ArrowDown')
            b = 1;
            if(a==1&&b==1&&image[1]==false){
                image[1]=true;
                Judge(image[2]);
                a = 0;
                b = 0;
            }
            else if(image[1]==false){
                NoteJudge(image,num,event);
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