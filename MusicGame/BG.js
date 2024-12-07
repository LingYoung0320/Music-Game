// 界面美化
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