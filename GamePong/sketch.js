// variaveis de bolinha 
let xBolinha = 300; 
let yBolinha = 200; 
let diametro = 15; 
let raio = diametro/2; 

// variaveis da velocidade da bolinha 
let velocidadeXB = 6; 
let velocidadeYB = 6; 

// variaveis raquete 
let xraq = 5;
let yraq = 150;
let largraq = 10;
let comraq = 90;

// variaveis raquete oponente 
let xraqop = 585;
let yraqop = 150;
let yvelpo; // Para manipular o valor nao atribui nada a var

let colidiu = false; 

// Placar do jogo 
let ptsmeus =0;
let ptsop =0;

//Sons do jogo
let raquetada;
let ponto; 
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movBolinha();  
  verlimitesBolinha(); 
  mostraraq(xraq,yraq);  
  movraq();
  //vercolraq(); 
  mostraraq(xraqop, yraqop);
  velop();
  verificaColisaoRaq(xraq,yraq); 
  verificaColisaoRaq(xraqop,yraqop); 
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa(); 
}

function mostraBolinha (){
  circle (xBolinha,yBolinha,diametro);
}

function movBolinha (){
    xBolinha += velocidadeXB; 
    yBolinha += velocidadeYB; 
}

//Colisão com as margens da tela 
function verlimitesBolinha (){    // para usar OU utiliza '||'  
  if (xBolinha + raio > width || 
     xBolinha - raio < 0) {
    velocidadeXB *= -1; 
  }

  if (yBolinha + raio > height || 
     yBolinha - raio < 0) {
    velocidadeYB *= -1; 
  } 
}

function mostraraq (x,y){
  rect (x, y,largraq,comraq);
}

// Movimento da raquete do jogador 
function movraq(){  
  if (keyIsDown(UP_ARROW)) {
    yraq -= 10;    
  }
   if (keyIsDown(DOWN_ARROW)) {
    yraq += 10;    
  }
}

function vercolraq(){
  if ( xBolinha - raio < xraq + largraq 
      && yBolinha - raio < yraq + comraq
      && yBolinha + raio > yraq){
    velocidadeXB *= -1; 
    raquetada.play();
  }  
}

function verificaColisaoRaq(x,y){
   colidiu = collideRectCircle(x, y,largraq,comraq, xBolinha,yBolinha,raio);
  if (colidiu) {
    velocidadeXB *= -1; 
    raquetada.play();
  }
}

// Oponente 
function velop () {
  if (keyIsDown(87)) {
    yraqop -= 10;    
  }
   if (keyIsDown(83)) {
    yraqop += 10;    
  }
}

//Placar 
function incluiPlacar(){
  stroke(255);
  textSize (16); 
  textAlign (CENTER); 
  fill (color(255,69,0));
  rect (150,10,40,20); 
  fill (255);
  text (ptsmeus, 170, 26 );
  fill (color(255,69,0));
  rect (450,10,40,20);
  fill (255);
  text (ptsop, 470, 26 );
}

function marcaPonto(){
  if (xBolinha > 590){
    ptsmeus += 1; 
    ponto.play();
  }
  if (xBolinha < 10){
    ptsop += 1; 
    ponto.play();
  }
}

//Bug 
function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23;
    }
}

