/**
 VK Old-unread
 Set of functions
 **/
"use strict"

/**
 * Собирает чекбокс настроек
 * @param id идентификатор опции
 * @param state состояние включенности
 * @param text название опции
 * @returns {string} html с чекбоксом
 */
function buildVkOuSettingCheckbox(id, state, text) {
    let code = '<div class="checkbox {on}" id="vkou_opt_{id}" style="padding: 5px;" onclick="checkbox(this); vkou.setOpt(\'{id}\', isChecked(this));"><div class="vk_checkbox_caption">{text}</div></div>\
    ';
    let onState = '';
    if (state) {
        onState += 'on';
    }
    //console.log(id + " state = " + onState);
    code = code.replace(new RegExp("{on}", 'g'), onState);
    code = code.replace(new RegExp("{text}", 'g'), text);
    return code.replace(new RegExp("{id}", 'g'), id);
}

/**
 * Добавление css кода к странице
 * @param text css, который подключится к странице
 * @param id айди элемента для добавления
 */
function addCss(text, id) {
    const style = document.createElement("style");
    style.type = "text/css";
    if (id) {
        style.setAttribute("id", id);
    }
    style.appendChild(document.createTextNode(text));
    document.getElementsByTagName("head")[0].appendChild(style);
}

/**
 * Добавление css файла к странице
 * @param filename имя css файлы, который подключится к странице
 * @param id айди элемента для добавления
 */
function addCssFile(filename, id) {
    let bgCss;
    bgCss = document.getElementById(id);
    if (!bgCss) {
        bgCss = document.createElement("link");
        bgCss.setAttribute("id", id);
        bgCss.setAttribute("type", "text/css");
        bgCss.setAttribute("rel", "stylesheet");
        bgCss.setAttribute("href", filename);
        document.getElementsByTagName("head")[0].appendChild(bgCss);
    } else {
        bgCss.setAttribute("href", filename);
    }
}

/**
 * Удаление css файла у страницы по айди элемента
 * @param id айди элемента для удаления
 */
function delCssFile(id) {
    document.getElementsByTagName("head")[0].removeChild(document.getElementById(id));
}

/**
 * Удаление css кода у страницы по айди элемента
 * @param id айди элемента для удаления
 */
function delCss(id) {
    if (document.getElementById(id) === null) {
        return;
    }
    document.getElementsByTagName("head")[0].removeChild(document.getElementById(id));
}

/**
 * Регистрация колбэка на изменение элементов на странице
 * @param onChanged колбэк, который будет вызван при изменении на странице
 * @returns {MutationObserver} обсервер, который следит за изменениями, нужен для остановки работы слежения
 */
function registerMutationObserver(onChanged) {
    const observerConfig = {attributes: false, childList: true, subtree: true};
    const callback = (mutationList, _) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                onChanged();
            }
        }
    }
    const observer = new MutationObserver(callback);
    observer.observe(document, observerConfig);
    return observer
}

/**
 * Остановка слежения
 * @param observer обсервер, который нужно выключить
 */
function unregisterMutationObserver(observer) {
    observer.disconnect();
}