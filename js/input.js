
export class InputHandler{

 setup() {
    // Create an Audio input
    mic = new p5.AudioIn();
  
    // start the Audio Input.
    // By default, it does not .connect() (to the computer speakers)
    mic.start();
  }

    
    constructor(dino){
        document.addEventListener("keydown",event =>{
            switch(event.keyCode){

                case mic.getLevel(): //キーボードの上↑のボタンが押されたとき
                    dino.up();
                    break;
               
            }
        })
    }
}