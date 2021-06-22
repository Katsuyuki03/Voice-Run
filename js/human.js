export class Dino{
    constructor(gameWidth,gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
  
        this.offset = 20;
        this.r = 60;
        this.width = this.r*2;
        this.height = this.r*2;
        this.position = {
            x:60,
            y:this.gameHeight-this.offset-this.height
        };
        this.speed = 0;
        this.gravity = 0.5;
        this.lift = -12;
        this.jumpFlag = true;
        this.audio = new Audio("./bubble-burst1.mp3");  
         

        var canvasWidth = 650; 
        var canvasHeight = 500;
        
        var spriteWidth = 800; 
        var spriteHeight = 300; 
        
        var rows = 2; 
        var cols = 8; 
        
        var width = spriteWidth/cols; 
        var height = spriteHeight/rows; 
        
        var curFrame = 0; 
        var frameCount = 8; 
        
        var x=100;
        var y=310; 
        
        var srcX=0; 
        var srcY=0; 

        var speed = 12; 
        
        var canvas = document.getElementById('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight; 
        
        var ctx = canvas.getContext("2d");
        
        var character = new Image(); 
        character.src = "images/player.png";
        
       

    }
    
    up(){

        

        if(this.jumpFlag){
            this.image = document.getElementById("img_jump");
            this.speed = this.lift;
            this.jumpFlag = false;
            
            this.audio.play();　//ジャンプをしたときに「bubble-burst1.mp3」音声をplay
        }   
       
    }
    




    
    update(detlaTime){
       
        
        this.position.y += this.speed;
        this.speed += this.gravity;

        curFrame = ++curFrame % frameCount; 
        srcX = curFrame * width; 
        ctx.clearRect(x,y,width,height);


        /*もし恐竜の位置が初期位置（this.gameHeight-this.offset-this.height）より大きい場合、
        位置を初期位置にする*/
        if(this.position.y >= this.gameHeight-this.offset-this.height){
            this.position.y = this.gameHeight-this.offset-this.height;
            this.speed = 0;
            this.jumpFlag = true;
            this.image = document.getElementById("img_hito");
        }
    }
    draw(ctx){
        /*ctx.beginPath();
        ctx.arc(this.position.x+this.r,this.position.y+this.r,this.r,0,2*Math.PI);
        ctx.stroke();*/
        ctx.drawImage(character,this.position.x,this.position.y,this.width,this.height);

    }

    

}