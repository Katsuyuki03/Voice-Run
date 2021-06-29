
export class InputHandler{

 setup() {
    // Create an Audio input
    mic = new p5.AudioIn();
  
    // start the Audio Input.
    // By default, it does not .connect() (to the computer speakers)
    mic.start();
  }

    
    constructor(dino){
        document.addEventListener("Voice",event =>{
           
            let vol = mic.getLevel();

            let h = map(vol, 0, 1, height, 0);
            dino.up();
        })
    }
}