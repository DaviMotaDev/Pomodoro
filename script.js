const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const playPauseBt = document.querySelector('.app__card-primary-button img')
const tempoNaTela = document.querySelector('#timer')

const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioBeep = new Audio('./sons/beep.mp3')
const audioPlay = new Audio('./sons/Play.wav')
const audioPause = new Audio('./sons/pause.mp3')

let tempoDecorridoEmSegundos = 15
let intervalorId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    }
    else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <br>
                 <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície <br>
                 <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        zerar()
        audioBeep.play()
        alert('tempo finalizado!')
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervalorId){
        audioPlay.play()
        zerar()
        return
    }
    audioPause.play()
    intervalorId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    playPauseBt.setAttribute('src','./imagens/pause.png')
}

function zerar() {
    clearInterval(intervalorId)
    iniciarOuPausarBt.textContent = "Começar"
    playPauseBt.setAttribute('src','./imagens/play_arrow.png')
    intervalorId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}