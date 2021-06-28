function setup() {
    // Create an Audio input
    mic = new p5.AudioIn();
  
    // start the Audio Input.
    // By default, it does not .connect() (to the computer speakers)
    mic.start();
  }

export class InputHandler{

    constructor(dino){
        document.addEventListener("keydown",event =>{
            switch(event.keyCode){


                
                case 38: //キーボードの上↑のボタンが押されたとき
                    dino.up();
                    break;
               
            }
        })
    }
}