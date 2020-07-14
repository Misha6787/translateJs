/* eslint-disable strict */
'use strict';

const rus = document.getElementById('rus'),
    eng = document.getElementById('eng'),
    translateBtn = document.getElementById('translateBtn'),
    clearInpRus = document.getElementById('clearInpRus'),
    clearInpEng = document.getElementById('clearInpEng');

const DBService = class {
    constructor() {
        this.SERVER = 'https://translate.yandex.net/api/v1.5';
        this.API_KEY = 'trnsl.1.1.20190225T091515Z.06bde7bd52a8c1a7.0749f827a8a0474bf52a18b3b47f827f339c781a';
    }

    getTranslationRU(text) {
        const url = `${this.SERVER}/tr.json/translate?key=${this.API_KEY}&text=${text}&lang=ru-en`;
        return fetch(url, {
            method: 'POST',
        });
    }
    getTranslationEN(text) {
        const url = `${this.SERVER}/tr.json/translate?key=${this.API_KEY}&text=${text}&lang=en-ru`;
        return fetch(url, {
            method: 'POST',
        });
    }
};
const dbservice = new DBService();

const translateToRus = () => {
    const text = rus.value;
    dbservice.getTranslationRU(text)
        .then(response => {
            if (response.status !== 200) {
                throw new Error(console.error('Ошибка'));
            }
            return (response.json());
        })
        .then(data => {
            data.text.forEach(item => {
                eng.value = item;
            });
        })
        .catch(error => {
            console.log(error);
        });
};
const translateToEng = () => {
    const text = eng.value;
    dbservice.getTranslationEN(text)
        .then(response => {
            if (response.status !== 200) {
                throw new Error(console.error('Ошибка'));
            }
            return (response.json());
        })
        .then(data => {
            data.text.forEach(item => {
                rus.value = item;
            });
        })
        .catch(error => {
            console.log(error);
        });
};

translateBtn.addEventListener('click', () => {
    if (rus.value === '') {
        translateToEng();
    } else if (eng.value === '') {
        translateToRus();
    } else {
        translateToRus();
    }
});


clearInpRus.addEventListener('click', () => {
    rus.value = '';
});
clearInpEng.addEventListener('click', () => {
    eng.value = '';
});

