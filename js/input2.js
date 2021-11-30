export class InputHandler{
  setup() {
  // // Create an Audio input
    // mic = new p5.AudioIn();
   
  //   // start the Audio Input.
  //  // By default, it does not .connect() (to the computer speakers)
    //  mic.start();
   }

  speech() {
    // 音声認識バージョン
    // 音声認識を利用するのに SpeechRecognition を利用します
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    const speechRecognition = new webkitSpeechRecognition();

    speechRecognition.lang = "ja-JP";
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;

    // 音声認識が成功した時の処理を登録します
    speechRecognition.addEventListener("result", (event) => {
      const results = event.results;
      for (let i = event.resultIndex; i < results.length; i++) {
        if (results[i].isFinal) {
          document.getElementById("result_text").innerHTML =
            results[i][0].transcript;
          this.speech();
        } else {
          document.getElementById("result_text").innerHTML =
            results[i][0].transcript;
          // flag_speech = 1;
        }
      }

      const transcript = event.results[event.results.length - 1][0].transcript;

      if (
        transcript === "上。" ||
        transcript === "うえ。" ||
        transcript === "上" ||
        transcript === "うえ"
      ) {
        this.dino.up();
      }

      if (
        transcript === "した。" ||
        transcript === "下。" ||
        transcript === "した" ||
        transcript === "下"
      ) {
        this.dino.down();
      }
    });

    // 音声認識を開始する
    speechRecognition.start();
  }

     constructor(dino){

       this.initilized = false;
       this.mic;
       this.vol = 0;
       this.dino = dino;
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