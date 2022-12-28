let palabraType;
let puntaje = { jugador: 0 };
let reloj = document.getElementById('tiempo');
let progreso = document.getElementById('barra');
let marcador = document.getElementById('puntaje');
let reiniciar = document.getElementById('refresh');
let tituloJuego = document.getElementById('titulo');
let comenzar = document.getElementById('iniciar-cronometro');
let palabraRandom = document.getElementById('palabra-generada');
let usuarioInput = document.getElementById('respuesta-usuario');
let animacionInicial = document.getElementById('cuenta-1');

const palabrasPreFormato = 'rock thoughtful knot empty minister rabbit related jewel perpetual celery trees health overconfident damaged awake disagree farm improve sick low ladybug friendly room redundant white dry picayune elfin thinkable tempt black and white sponge joke window drum uptight available petite huge lavish rightful doubtful next tenuous question complain accessible travel offbeat dashing coordinated please furry plate confuse bless crayon tested spray repeat smile noise famous overrated sleep aromatic unique marry replace grey bewildered whisper card tip discover canvas rhythm quill face blue eyed story combative unlock abhorrent market absent reject meaty public magnificent soggy ambitious fireman grandfather mess up blushing unkempt belief toothsome green peaceful son wink fog vivacious entertain wipe help dusty fascinated sense cherry hesitant statement angle queen underwear brash zesty income hydrant stiff prepare appreciate structure dime silk curved rub flag dispensable fierce tiresome crown curtain donkey hurt conscious letter zipper snake oranges haircut fear fearless repair physical ban grotesque big run permit plantation early anger grip obsequious moan cable road future string swift bed sad drop fish selection grate force weigh shaggy trousers pleasant hop fretful death cure crow cherries rough rejoice pedal homely money hungry correct testy bottle fruit old aberrant steer stranger scary change achiever knowing push average government star key doll iny industrious reach direction risk need return behavior half machine flowery cheerful festive irritate seashore delight sea program drain blood godly ear insect zip mark chunky offend eyes recondite flesh fuzzy milky paltry deer hapless play succeed marble approve kiss order doctor fax stormy form workable slim songs blind super bright attend marked alert economic humor floor cannon point skin groovy table cheer squash general obtainable beam sturdy longing raise sweltering jellyfish kind ultra disturbed dress bone care event gusty unite switch crowded salt fabulous lame friends terrible release paper desk melt shivering loss unfasten winter plain lacking flash snail examine mushy hill bow spoil cycle scale handsomely bear broad onerous mitten second hand malicious hulking cabbage ruddy spiky extend disgusting zephyr free faulty way wretched rings yard cool polish craven alike serve moor chase stretch cat earthy tawdry third bait obeisant record club tasteful';

let palabras = palabrasPreFormato.split(' ');
let cantidad = palabras.length;

// generar palabras random // 

function generarPalabra() {
    let aleatoria = Math.floor(Math.random() * cantidad);
    let palabraGenerada = palabras[aleatoria]
    palabraType = palabraGenerada;
    mostrarData(palabraRandom, palabraGenerada)
}

// gestionar puntos //

function comprobarPalabra() {
    let respuestaUsuario = usuarioInput.value.toLowerCase();
    let palabraCorrecta = (respuestaUsuario === palabraType);
    return (palabraCorrecta ? siguientePalabraAcertada() : palabraCorrecta);
}

// resetear input, sumar puntos, mostrarlos y generar siguientePalabra //

function siguientePalabraAcertada() {
    usuarioInput.value = ''
    puntaje.jugador++
    animarMarcador()
    mostrarData(marcador, puntaje.jugador)
    generarPalabra()
}

// animacion marcador //

function animarMarcador() {
    marcador.classList.add('animate-ping');
    setTimeout(() => {
        marcador.classList.remove('animate-ping');
    }, 1000);
}

// animacion reloj //

function animarReloj() {
    reiniciar.classList.add('animate-ping');
    setTimeout(() => {
        reiniciar.classList.remove('animate-ping');
    }, 5000);
}

// cronometro + barra superior con el tiempo restante //

function cronometro() {
    animacionCuentaA1()
    comenzar.disabled = true;
    setTimeout(() => {
        usuarioInput.disabled = false;
        agregarBarraTiempo()
        correrTiempo()
    }, 4000);
}

// mostrar y esconder la cuenta inicial // 

function animacionCuentaA1() {
    animacionInicial.classList.remove('invisible');
    cuentaA1()
    setTimeout(() => {
        animacionInicial.classList.add('invisible');
    }, 4000);
}

// cuenta inicial antes del comienzo del juego //

function cuentaA1() {
    let segundos = 4;
    let conteo = setInterval(() => {
        segundos--
        mostrarData(animacionInicial, segundos)
        return (segundos === 0 ? (clearInterval(conteo), mostrarData(animacionInicial, '')) : segundos);
    }, 1000);
}


// tiempo para responder //

function correrTiempo() {
    let segundos = 0;
    let conteo = setInterval(() => {
        segundos++
        let formatoSegundos = '00:' + `${formatoNumero(segundos)}`;
        mostrarData(reloj, formatoSegundos)
        return (segundos === 60 ? (clearInterval(conteo), timesUp()) : segundos);
    }, 1000);

    reiniciar.addEventListener('click', function () {
        let puntajeReseteado = (puntaje.jugador = 0);
        comenzar.disabled = false;
        usuarioInput.disabled = true;
        clearInterval(conteo)
        removerbarraTiempo()
        generarPalabra()
        mostrarData(reloj, `00:00`)
        mostrarData(marcador, puntajeReseteado)
        mostrarData(tituloJuego, 'Fast Typing!')
    })
}

// al momento de cumplirse 1 minuto, mostrar el tiempo final, evitar que se pueda escribir, modificar titulo y animar reloj //

function timesUp() {
    animarReloj()
    deshabilitarInput()
    mostrarData(reloj, `01:00`)
    mostrarData(tituloJuego, `Time's Up!`)
}

// function para no escribir mas //

function deshabilitarInput() {
    usuarioInput.disabled = true;
}

// barra con el tiempo restante para responder //

function agregarBarraTiempo() {
    progreso.classList.add('barraCronometro');
}

function removerbarraTiempo() {
    progreso.classList.remove('barraCronometro');
}
// formatear el tiempo cuando tiene un digito //

function formatoNumero(numero) {
    return (numero < 10 ? numero.toString().padStart(2, 0) : numero);
}

// funcion generica para mostrar datos //

function mostrarData(a, b) {
    a.innerHTML = b;
}

document.addEventListener('DOMContentLoaded', generarPalabra)
usuarioInput.addEventListener('input', comprobarPalabra)
comenzar.addEventListener('click', cronometro)