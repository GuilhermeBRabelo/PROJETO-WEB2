let horas = 0;
let minutos = 0;
let segundos = 0;
let cronometroAtivo = false;
let intervalo;

const horasElement = document.querySelector('#horas');
const minutosElement = document.querySelector('#minutos');
const segundosElement = document.querySelector('#segundos');

const btnIniciar = document.querySelector('#iniciar');
const btnParar = document.querySelector('#parar');
const btnResetar = document.querySelector('#resetar');

// Carregar o estado do cronômetro do localStorage
function carregarEstadoCronometro() {
    if (localStorage.getItem('horas') !== null) {
        horas = parseInt(localStorage.getItem('horas'));
        minutos = parseInt(localStorage.getItem('minutos'));
        segundos = parseInt(localStorage.getItem('segundos'));
    }
    atualizarTela();
}

// Atualizar a tela com os valores de horas, minutos e segundos
function atualizarTela() {
    horasElement.textContent = horas < 10 ? '0' + horas : horas;
    minutosElement.textContent = minutos < 10 ? '0' + minutos : minutos;
    segundosElement.textContent = segundos < 10 ? '0' + segundos : segundos;
}

// Salvar o estado do cronômetro no localStorage
function salvarEstadoCronometro() {
    localStorage.setItem('horas', horas);
    localStorage.setItem('minutos', minutos);
    localStorage.setItem('segundos', segundos);
}

// Iniciar o cronômetro
function iniciarCronometro() {
    intervalo = setInterval(function () {
        segundos++;
        if (segundos === 60) {
            segundos = 0;
            minutos++;
        }
        if (minutos === 60) {
            minutos = 0;
            horas++;
        }
        atualizarTela();
        salvarEstadoCronometro();  // Salvar o estado a cada segundo
    }, 1000);
}

// Parar o cronômetro
function pararCronometro() {
    clearInterval(intervalo);
    cronometroAtivo = false;
    btnIniciar.disabled = false;
    btnParar.disabled = true;
}

// Resetar o cronômetro
function resetarCronometro() {
    clearInterval(intervalo);

    horas = 0;
    minutos = 0;
    segundos = 0;
    atualizarTela();
    salvarEstadoCronometro();  // Salvar o estado após resetar
    cronometroAtivo = false;
    btnIniciar.disabled = false;
    btnParar.disabled = true;
}

// Event listeners
btnIniciar.addEventListener('click', function () {
    if (!cronometroAtivo) {
        cronometroAtivo = true;
        btnIniciar.disabled = true;
        btnParar.disabled = false;
        iniciarCronometro();
    }
});

btnParar.addEventListener('click', function () {
    pararCronometro();
});

btnResetar.addEventListener('click', function () {
    resetarCronometro();
});

// Carregar o estado do cronômetro ao iniciar a página
carregarEstadoCronometro();
