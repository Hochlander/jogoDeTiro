var jog, dirxJ, diryJ, velJ, pjx, pjy, veltj;
var velB;
var jogo = true;
var frames;
var tamTelaW, tamTelaH;
var freqCriaBomba;
var vidaPlaneta, barraPlaneta;
var contBombas, painelContBombas;
var tmpCriaIni;
var telaMsg;

function teclaDw(tecla) {
    if (tecla == 38) {
        diryJ = -1;
    }
    else if (tecla == 40) {
        diryJ = 1;
    }
    else if (tecla == 39) {
        dirxJ = 1;
    }
    else if (tecla == 37) {
        dirxJ = -1;
    }
    else if (tecla == 32) {
        atiraJ(pjx + 10, pjy);
    }
}

function teclaUp(tecla) {
    if ((tecla == 38) || (tecla == 40)) {
        diryJ = 0;
    }
    if ((tecla == 37) || (tecla == 39)) {
        dirxJ = 0;
    }
}

function criaBomba() {
    if (jogo) {
        var x = Math.random() * tamTelaW;
        var y = 0;
        document.getElementById('objetos').innerHTML+="<div class=bomba style='top:" + y + "px; left:" + x + "px;'></div>";
        contBombas--;
        painelContBombas.innerHTML = "Contagem de Bombas: " + contBombas;
    }
}

function controlaBomba() {
    var bombas = document.getElementsByClassName("bomba");
    var tam = bombas.length;
    for (var i = 0; i < tam; i++) {
        if (bombas[i]) {
            var pi = bombas[i].offsetTop;
            pi += velB;
            bombas[i].style.top = pi + "px";
            if (pi > tamTelaH) {
                vidaPlaneta -= 10;
                bombas[i].remove();
            }
        }
    }
}

function atiraJ(x, y) {
    document.getElementById('objetos').innerHTML+="<div class=tiroJog style='top:" + y + "px; left:" + x + "px;'></div>";
}

function controlaJogador() {
    pjy += diryJ * velJ;
    pjx += dirxJ * velJ;
    jog.style.top = pjy + "px";
    jog.style.left = pjx + "px";
}

function controlaTirosJogador() {
    var tiros = document.getElementsByClassName("tiroJog");
    var tam = tiros.length;
    for (var i = 0; i < tam; i++) {
        if (tiros[i]) {
            var pt = tiros[i].offsetTop;
            pt -= veltj;
            tiros[i].style.top = pt + "px";
            colisaoTirosBomba(tiros[i]);
            if (pt < 0) {
                tiros[i].remove();
            }
        }
    }
}

function colisaoTirosBomba(tiro) {
    var bombas = document.getElementsByClassName("bomba");
    var tam = bombas.length;
    for (var i = 0; i < tam; i++) {
        if (bombas[i]) {
            //testesde colisão
            if (
                (
                    (tiro.offsetTop <= (bombas[i].offsetTop + 40)) &&//cima tiro com baixo bomba
                    (tiro.offsetTop >= (bombas[i].offsetTop))//baixo tiro com cima bomba... ??? se tivesse como atirar de cima pra baixo...
                )
                &&
                (
                    (tiro.offsetLeft <= (bombas[i].offsetLeft + 24)) &&//esquerda tiro com direita bomba
                    (tiro.offsetLeft >= (bombas[i].offsetLeft - 24))//direita tiro com esquerda bomba
                )
            ) {
                bombas[i].remove();
                tiro.remove();
            }
        }
    }
}

function gerenciaGame() {
    barraPlaneta.style.width = vidaPlaneta + "px";
    if (contBombas <= 0) {
        jogo = false;
        clearInterval(tmpCriaIni);
        telaMsg.style.backgroundColor = "#454588";
        telaMsg.style.display = block;
    }
    if (vidaPlaneta <= 0) {
        jogo = false;
        clearInterval(tmpCriaIni);

        telaMsg.style.backgroundColor = "#767644";
        telaMsg.style.display = block;
    }
}

function gameLoop() {
    if (jogo) {
        controlaJogador();
        controlaTirosJogador();
        controlaBomba();
    }
    gerenciaGame();
    frames = requestAnimationFrame(gameLoop);
}

function reinicia() {
    //remover bombas restantes
    var bombas = document.getElementsByClassName("bomba");
    var tam = bombas.length;
    for (var i = 0; i < tam; i++) {
        if (bombas[i]) {
            bombas[i].remove();
        }
    }
    for (var i = 0; i < tam; i++) {
        if (bombas[i]) {
            bombas[i].remove();
        }
    }

    telaMsg.style.display="none";
    clearInterval(tmpCriaIni);
    cancelAnimationFrame(frames);
    vidaPlaneta=300;
    pjx=tamTelaW/2;
    pjy=tamTelaH/2;
    jog.style.top=pjy+"px";
    jog.style.left=pjx+"px";
    velB=3;
    contBombas=150;
    freqCriaBomba=1700;
    jogo=true;
    tmpCriaIni=setInterval(criaBomba,freqCriaBomba);
    gameLoop();
}

function inicia(){
    jogo=false;

    //inicializações do game
    tamTelaW=window.innerWidth;
    tamTelaH=window.innerHeight;
    vidaPlaneta=300;
    barraPlaneta=document.getElementById("barraPlaneta");
    barraPlaneta.style.width=vidaPlaneta+"px";
    painelContBombas=document.getElementById("contBombas");
    telaMsg=document.getElementById("telaMsg");
    document.getElementById("btnJogar").addEventListener("click", reinicia);
    telaMsg.style.display="block";

    //inicialização do jogador
    dirxJ=diryJ=0;
    pjx=tamTelaW/2;
    pjy=tamTelaH/2;
    velJ=tamTelaW/140;
    jog=document.getElementById("naveJog");
    jog.style.top=pjy+"px";
    jog.style.left=pjx+"px";

    //inicializações do tiro do jogador
    ptjx=ptjy=0;
    veltj=5;

    // inicializações das bombas
    velB=tamTelaH/140;
    contBombas=150;
    freqCriaBomba=1700;
    tmpCriaIni=setInterval(criaBomba,freqCriaBomba);
    painelContBombas.innerHTML="Contagem de Bombas: " + contBombas;
}

window.addEventListener("load", inicia);
