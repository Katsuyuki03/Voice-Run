export class InputHandler{

  setup() {
  // // Create an Audio input
    mic = new p5.AudioIn();
   
  //   // start the Audio Input.
  //  // By default, it does not .connect() (to the computer speakers)
     mic.start();
   }
 
     
     constructor(dino){
         
       this.initilized = false;
       this.mic;
       this.vol = 0;
       this.dino = dino;
 
   // 音声認識バージョン
   //   // 音声認識を利用するのに SpeechRecognition を利用します
     const speechRecognition = new webkitSpeechRecognition();
 
     speechRecognition.lang = "ja-JP";
     speechRecognition.continuous = true;
     speechRecognition.interimResults = false;
 
   //   // 音声認識を開始する
      speechRecognition.start();
 
   //   // 音声認識が成功した時の処理を登録します。
    speechRecognition.addEventListener("result", (event) => {
       const transcript = event.results[event.results.length - 1][0].transcript;
 
        console.log(event.results.length - 1);
 
       if (transcript === "上。" || transcript === "うえ。" || transcript === "上" || transcript === "うえ") {
         dino.up();
       }

    //  if (transcript === "した"　|| transcript === "下") {
    //      dino.down();
    //    }

     });
     
    }
 
   setup() {
      //  this.mic = new p5.AudioIn();
      //  this.mic.start();
      //  this.initilized = true;
   }
 
   update() {
      //  if (this.initilized) {
      //    this.vol = this.mic.getLevel();
      //    console.log(this.vol);
      //  }
 
      //  if (this.vol > 0.2) {
      //      this.dino.down();
      //  }
 
            
         
     }
 }