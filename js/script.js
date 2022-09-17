// CHAMANDO TODOS AS TELAS DO JOGO
const START_GAME = document.getElementById('start-game');
const MODAL_CONTAINER = document.getElementById('start-modal-choose-phrases');
const IN_GAME = document.getElementById('in-game');
const LOSER_GAME = document.getElementById('finish-game');
const WIN_GAME = document.getElementById('win-game');
const CHOOSE_PHRASES = document.getElementById('start-button-phrases');
const RANDOM_PHRASES = document.getElementById('start-button-random');
let data;

// FUNÇÃO QUE CONTROLA A VISIBILIDADE DOS ELEMENTOS
function visibilyElements(element, status) {
    element.setAttribute('data-visibily', status);
}

// ESCOLHA DO JOGADOR 

function screenModal() {
    visibilyElements(MODAL_CONTAINER, 'on');
    visibilyElements(START_GAME, 'off');

    const GET_VALUE_INPUT_FORM = document.getElementById('start-dica-input');
    const GET_VALUE_TEXTAREA_FORM = document.getElementById('start-textarea-words');    
    const GET_BUTTON_FORM = document.getElementById('start-button-submit-modal');

    GET_BUTTON_FORM.addEventListener('click', (event) => {
        event.preventDefault();
        DataForm(GET_VALUE_INPUT_FORM, GET_VALUE_TEXTAREA_FORM);

        if(data.words.length <= 1) {
            alert('Ops...algo deu errado, informe duas palavras para jogar!')
        } else {
            closeModal();
        }
    });

    const CLOSE_MODAL = document.getElementById('start-button-close-modal');
    CLOSE_MODAL.addEventListener('click', closeModal);

}

function DataForm(GET_VALUE_INPUT_FORM, GET_VALUE_TEXTAREA_FORM) {
    const DATA_ARRAY = GET_VALUE_TEXTAREA_FORM.value.split(',')

    return data = {
        dica: GET_VALUE_INPUT_FORM.value,
        words: DATA_ARRAY,
    }
}

function closeModal(event) {
  

    if(event) {
        visibilyElements(IN_GAME, 'off');
        visibilyElements(MODAL_CONTAINER, 'off');
        visibilyElements(START_GAME, 'on');
    } else {    
        visibilyElements(IN_GAME, 'on');
        visibilyElements(MODAL_CONTAINER, 'off');
        interface();
    }

}

// PALAVRAS PADRÃO

function patternWords() {
    visibilyElements(START_GAME, 'off');
    visibilyElements(IN_GAME, 'on');

    data = {
        dica: 'Programação',
        words: ['html', 'css', 'javascript', 'java'],
    }

    interface();
}

// IN GAME 

function interface() {
    const CONTAINER_DICA = document.getElementById('in-game-dica-text');
    const CONTAINER_LETTERS = document.getElementById('in-game-letters-container');
    const BUTTON_BACK_HOME = document.querySelectorAll('.back-home');

    CONTAINER_LETTERS.innerText = ''

    const lifeGroup = {
        container: document.getElementById('in-game-life-count'),
        count: 5,
    }

    const ARRAYS = {
        correct: [],
        wrong: [],
    };

    CONTAINER_DICA.innerText = data.dica;
    let secretWord = generatorWord();

    BUTTON_BACK_HOME.forEach(element => {
        element.addEventListener('click', () => window.location.reload(true));
    });

    for(let loop =0; loop < secretWord.length; loop++) {
        createSpan(CONTAINER_LETTERS);
    }

    document.addEventListener('keydown', (event) => keyEvent(event, secretWord, CONTAINER_LETTERS, ARRAYS, lifeGroup));
}

function generatorWord() {
    const dataWord = data.words;
    const indice = Math.floor(Math.random() * dataWord.length);
    return dataWord[indice].trim().toLowerCase();
}

function createSpan(container) {
    const span = document.createElement('span');
    span.setAttribute('class', 'in-game-letters-span');
    return container.appendChild(span);
}

function keyEvent(event, secretWord, containerLetters, arrys, lifeGroup) {
    const KEY = event.key.toLowerCase();

    if(arrys.wrong.includes(KEY)) {
        alert('Essa letra já foi clicada antes, insira outra.');
    } else {
        if(secretWord.includes(KEY)) {
            arrys.correct.push(KEY);
        } else {
            lifeGroup.container.innerText = lifeGroup.count -= 1 
            arrys.wrong.push(KEY);
        }
    }

    verifyGame(secretWord, containerLetters, arrys.correct, arrys.wrong, lifeGroup);
}

function verifyGame(secretWord, containerLetters, correctArray, wrongArra, lifeGroup) {
    verifyCorrect(secretWord, correctArray);
    winner(secretWord, containerLetters);
    loser(lifeGroup);
}

function verifyCorrect(secretWord, correctArray) {
    const elementSpan = document.querySelectorAll(".in-game-letters-span");
    
    secretWord.split('').forEach((char, indice) => {
        if(correctArray.includes(char)) {
            elementSpan[indice].innerText = char
        } 
    })
}

function winner(secretWord, containerLetters) {
    const convertInJsonStringScretWord = JSON.stringify(secretWord);
    let convertInJsonContainerLetters = JSON.stringify(containerLetters.innerText.replaceAll('\n', ''))
    
    if(convertInJsonContainerLetters === convertInJsonStringScretWord) {
        setTimeout(() => {
            visibilyElements(IN_GAME, 'off');
            visibilyElements(WIN_GAME, 'on');
        }, 300);
    }
}

function loser(lifeGroup) {
    let count = parseInt(lifeGroup.count);

    if(count == 0) {
        visibilyElements(IN_GAME, 'off')
        visibilyElements(LOSER_GAME, 'on')
    }
}

CHOOSE_PHRASES.addEventListener('click', screenModal);
RANDOM_PHRASES.addEventListener('click', patternWords);