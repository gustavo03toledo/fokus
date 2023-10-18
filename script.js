const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const pauseBt = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const somPlay = new Audio('./sons/play.wav');
const somPause = new Audio('./sons/pause.mp3');
const somFim = new Audio('./sons/beep.mp3')
const startPauseBt = document.querySelector('#start-pause')

let tempoDecorridoEmSedundos = 1500
let intervaloId = null

musica.loop = true


//function

function alterarContexto(contexto) { // função onde o contexto é substituido em cada evento mudando assim oque sera alterado.
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade, <br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

//funçoes do temporizador
const contagemRegressiva = () => {
    if (tempoDecorridoEmSedundos <= 0) {

        somFim.play()
        alert('Tempo finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSedundos -= 1
    mostrarTempo()
}

function iniciarOuPausar() {
    if (intervaloId) {
        zerar()
        somPause.play()
        return
    }
    somPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000); // set interval recebe dois falores oque voce quer contar em qual intervalo em milisegundos
    iniciarOuPausarBt.textContent = "Pausar"
    pauseBt.setAttribute('src', `./imagens/pause.png`)
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    pauseBt.setAttribute('src', `./imagens/play_arrow.png`)
    intervaloId = null
}

// função tempo na tela 
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSedundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`
}


//eventos

//evento de começar o temposizador
startPauseBt.addEventListener('click', iniciarOuPausar)



focoBt.addEventListener('click', () => {
    tempoDecorridoEmSedundos = 1500
    alterarContexto('foco');
    focoBt.classList.add('active')

});

curtoBt.addEventListener('click', () => { //evento do click no botão de curto
    tempoDecorridoEmSedundos = 300
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', () => { //evento do click no botão de curto
    tempoDecorridoEmSedundos = 900
    alterarContexto('descanso-longo');
    longoBt.classList.add('active')
});

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

mostrarTempo()
