export class Dino{
    constructor(gameWidth,gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.offset = 20;
        this.r = 50;
        this.width = this.r*2;
        this.height = this.r*3;
        this.position = {
            x:60,
            y:this.gameHeight-this.offset-this.height
        };
        this.speed = 0;
        this.gravity = 0.5;
        this.lift = -12;
        this.jumpFlag = true;
        this.downFlag = true;
        this.audio = new Audio();   
    
        this.frame = 0;
    
        this.spriteWidth = 800; 
        this.spriteHeight = 300; 

        this.rows = 2;
        this.cols = 8;

        this.curFrame = 0; 
        this.frameCount = 8; 

        this.srcX = 0; 
        this.srcY = 0; 
        
        this.characterImg = new Image(); 
        this.characterImg.src = 'images/player.png';
    }
    up(){

        

        if(this.jumpFlag){
            
            this.characterImg.src ="images/jump.png";
            this.speed = this.lift;
            this.frame = 0;
            this.jumpFlag = false;
            this.frameCount = 1; 
            this.audio.play();　//ジャンプをしたときに「bubble-burst1.mp3」音声をplay
        }   
       
    }


    down(){

        

        if(this.downFlag){
            
            this.characterImg.src ="images/syagami.png";
            this.speed = this.lift;
            this.frame = 0;
            this.downFlag = false;
            this.frameCount = 1; 
            this.audio.play();　//しゃがみをしたときに「bubble-burst2.mp3」音声をplay
        }   
       
    }

    

    update(detlaTime){
       
        this.frame++;
        
        this.position.y += this.speed;
        this.speed += this.gravity;

        if (this.frame % 8 === 0) { 
            this.curFrame = ++this.curFrame % this.frameCount; 
            this.srcX = this.curFrame * this.width;
        }

        /*もし恐竜の位置が初期位置（this.gameHeight-this.offset-this.height）より大きい場合、
        位置を初期位置にする*/
        // if(this.position.y >= this.gameHeight-this.offset-this.height){
        //     this.position.y = this.gameHeight-this.offset-this.height;
        //     this.speed = 0;
        //     this.frameCount = 8;
        //     this.jumpFlag = true;
        //     this.downFlag = true;
        //     this.characterImg.src = 'images/player.png';
        //}

        if(
            this.downFlag && this.position.y >=this.gameHeight - this.offset - this.height){
                this.position.y=this.gameHeight - this.offset - this.height;
                this.speed=0;
                this.frameCount = 8;
                this.junpFlag = true;
                this.characterImg.src = 'images/player.png';
            }else{
                this.position.y=this.gameHeight - this.offset - this.height;
                
                if(this.frame>240){
                    this.downFlag = true;
                }
            }
        



    }

    

    


    draw(ctx){
        /*ctx.beginPath();
        ctx.arc(this.position.x+this.r,this.position.y+this.r,this.r,0,2*Math.PI);
        ctx.stroke();*/
        ctx.drawImage(
            this.characterImg,
            this.srcX,
            this.srcY,
            this.width,
            this.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
          );
    }
}