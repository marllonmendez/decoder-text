function message(tagName) {
    const className = document.querySelector(tagName);
    return className;
}

const encryptMessage = message('.encrypt-message');
const decryptMessage = message('.decrypt-message');
const alertMessage = message('.warning-text');
const outputSection = message('.output-section');

const letters = [
    ['a', '@'],
    ['b', '*'],
    ['c', '!'],
    ['d', '^'],
    ['e', '#'],
    ['f', '('],
    ['g', ')'],
    ['h', '-'],
    ['i', '$'],
    ['j', '_'],
    ['k', '+'],
    ['l', '='],
    ['m', '{'],
    ['n', '}'],
    ['o', '%'],
    ['p', '['],
    ['q', ']'],
    ['r', ':'],
    ['s', ';'],
    ['t', ','],
    ['u', '&'],
    ['v', '<'],
    ['w', '>'],
    ['x', '/'],
    ['y', '?'],
    ['z', '.']
];

function handleEmptyField() {
    if (encryptMessage.value === '') {
        outputSection.innerHTML = `
            <div class='result-container'>
                 <img src='assets/img/girl.png' alt='Girl'>            
                 <h1 class='result-title'>Nenhuma mensagem encontrada</h>
                 <p class='result-paragraph'>Digite um texto que você deseja criptografar ou descriptografar.</p>
            </div>
        `;
    }
}

function updateOutputSection(text) {
    outputSection.innerHTML = `
        <div class='result-container'>
            <textarea class='decrypt-message' cols='20' rows='10'>${text}</textarea>
            <button class='copy-button' onclick='buttonCopy("${text}")'>Copiar</button>
        </div>
    `;
}

function validateText() {
    const isValid = encryptMessage.value === encryptMessage.value.toLowerCase() && encryptMessage.value.match(/^[a-z\s]+$/);

    if (!isValid) {
        encryptMessage.value = '';
        decryptMessage.value = '';
    }

    return isValid;
}

function invalidEntry() {
    alertMessage.style.color = 'red';
    setTimeout(() => {
        alertMessage.style.color = '#495057';
    }, 500);
}

function encrypt(stringEncrypt) {
    stringEncrypt = stringEncrypt.toLowerCase();

    for (let index = 0; index < letters.length; index++) {
        if (stringEncrypt.includes(letters[index][0])) {
            stringEncrypt = stringEncrypt.replaceAll(letters[index][0], letters[index][1]);
        }
    }

    return stringEncrypt;
}

function performsEncryption() {
    const textEncrypt = encrypt(encryptMessage.value);
    decryptMessage.innerText = textEncrypt;
    encryptMessage.value = '';
    updateOutputSection(textEncrypt);
}

function buttonEncrypt() {
    if (encryptMessage.value.trim() === '') {
        handleEmptyField();
        return;
    } else {
        if (validateText()) {
            performsEncryption();
        } else {
            invalidEntry();
        }
    }
}

function decrypt(stringDecrypt) {
    stringDecrypt = stringDecrypt.toLowerCase();

    for (let index = 0; index < letters.length ; index++) {
        if(stringDecrypt.includes(letters[index][1])) {
            stringDecrypt = stringDecrypt.replaceAll(letters[index][1], letters[index][0])
        }
    }

    return stringDecrypt;
}

function performsDecryption() {
    const textDecrypt = decrypt(encryptMessage.value);
    decryptMessage.value = textDecrypt;
    encryptMessage.value = '';
    updateOutputSection(textDecrypt);
}

function buttonDecrypt() {
    if (encryptMessage.value.trim() === '') {
        handleEmptyField();
        return;
    } else {
        performsDecryption();
    }
}

const buttonCopy = async () => {
    try {
        let textCopy = decryptMessage.value;
        await navigator.clipboard.writeText(textCopy);
        console.log('Conteúdo copiado');
    } catch (err) {
        console.error('Falha ao copiar: ', err);
    }
}
