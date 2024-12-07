//画布和文本
const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

let img = [], 
    flag = 0,
    mulitImg = [
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

 function gameStart(){
    let note=new NOTE(500,400);
    note.NoteAer();
    if(note.imageX==550)
    alert("ok");
    // note.NoteAer_2();
    // note.NoteAer_3();
 }

 class NOTE{
    imageX;
    imageY;
    constructor(imageX,imageY){
        this.imageX=imageX;
        this.imageY=imageY;
    }

    NoteAer(){
        requestAnimationFrame(()=>this.render());
    }

    render() {
        context.clearRect(this.imageX, this.imageY, this.imageX+100, this.imageY+100);
        this.imageX++;
        context.drawImage(img[1], this.imageX, this.imageY);
        requestAnimationFrame(()=>this.render());
    }

    NoteAer_2(){
        let imageX = 500;
        let imageY = 200;
        function render() {
            context.clearRect(imageX, imageY, imageX+100, imageY+100);
            imageX++;
            context.drawImage(img[1], imageX, imageY);
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }

    NoteAer_3(){
        let x=this.imageX;
        let y=this.imageY;
        function render() {
            context.clearRect(x, y, x+100, y+100);
            x++;
            context.drawImage(img[1], x, y);
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }
 }