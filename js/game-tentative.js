import { Dino } from "./human.js";
import { InputHandler } from "./input.js";
import { Bomb } from "./bomb.js";

//minからmaxまでの範囲でランダムな整数を生成する関数
export function getRandomInt(min,max){
    return Math.floor(min+Math.random()*(max-min+1));
}

var gamestate = true; //もしfalseならゲーム描写が止まるようにする
var score = 0;

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let titleImg = document.getElementById("js-btn-list");

let backImg = document.getElementById("img_back"); //背景


let startButton = document.getElementById("js-btn-start");



let againButton = document.getElementById("js-btn-again");
 

const GAME_WIDTH = 800;　//ゲームキャンバスの幅
const GAME_HEIGHT = 500;　//ゲームキャンバスの高さ

let dino = new Dino(GAME_WIDTH,GAME_HEIGHT);

let bomb = [];


const inputHandler = new InputHandler(dino);


let lastTime = 0;
let counter = 0;
let interval = 0;　

function setup() {
       console.log("setup");
   inputHandler.setup();
   againButton.classList.add('btn-hidden');
  }
  
  window.setup = setup;

 // function mousePressed() {
 //   console.log('css/start.css');
 //   userStartAudio();
  //  requestAnimationFrame(gameLoop);

//}
//window.mousePressed = mousePressed;

startButton.addEventListener(`click`, () => {
    userStartAudio();
    inputHandler.mic.start();
    startButton.classList.add('btn-hidden');
    titleImg.classList.add('btn-list-hidden');
    requestAnimationFrame(gameLoop);
});

againButton.addEventListener(`click`, () => {
    score = 0;
    gamestate = true;
    lastTime = 0;
    counter = 0;
    interval = 0;
    bomb = [];
    againButton.classList.add('btn-list-hidden');
    titleImg.classList.add('btn-list-hidden');
    requestAnimationFrame(gameLoop);
});



function gameLoop(timestamp){
    let deltaTime = timestamp -lastTime;
    lastTime = timestamp;

    ctx.drawImage(backImg,0,0,GAME_WIDTH,GAME_HEIGHT); //背景の描写 

    inputHandler.update();


    dino.update(deltaTime); 
    dino.draw(ctx);

    counter += deltaTime;
    
    if(counter > interval){　//800ミリ秒から２秒間隔で爆弾を生成
        bomb.push(new Bomb(GAME_WIDTH,GAME_HEIGHT));
        counter = 0;
        interval = getRandomInt(800,2000); //インターバルを800ミリ秒から２秒までの乱数に設定
    }

    ctx.font = "40px sans-serif";　　　　　//スコアとして表示する文字の大きさとフォント
    ctx.fillText("Score:"+score,60,60);  //スコアを（60,60）の位置に表示する

    for(var i = bomb.length-1; i>= 0; i--){
        
        bomb[i].update(deltaTime);
        bomb[i].draw(ctx);

        //爆弾が恐竜と当たったかどうかの判定
        if(bomb[i].checkHit(dino.position.x,dino.position.y,dino.r,
            bomb[i].position.x,bomb[i].position.y,bomb[i].r)){

                //もし衝突したら爆弾クラスで読み込んだ音を出す
                var playbomb = bomb[i].audio.play();
                //ユーザー操作がなかった時に、DOMExceptionのエラーがおこるため
                if(playbomb !== undefined){
                    playbomb.then(_ =>{
                        
                    })
                    .catch(error =>{
                        console.log(error);
                    });
                }
                
                gamestate=false;　
                
                dino.audio.muted = true; //恐竜のジャンプ音をミュート
                
            }
        //爆弾の位置がゲーム画面外に出たら爆弾の配列を削除
        if(bomb[i].offScreen()){
            score++;
            bomb.shift();
        }
    }

    //ゲーム状態がfalseだったらゲームをストップ
    if(!gamestate){
        againButton.classList.remove('btn-hidden');
        titleImg.classList.remove('btn-list-hidden');
        return;
    }
    
            
    
    
    requestAnimationFrame(gameLoop);
}
