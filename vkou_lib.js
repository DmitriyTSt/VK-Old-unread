/**
 VK Old-unread
 Set of functions
 **/
"use strict"

function buildCheckbox(id, state, text) {
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

function addcss(text, id) {
    const style = document.createElement("style");
    style.type = "text/css";
    if (id) {
        style.setAttribute("id", id);
    }
    style.appendChild(document.createTextNode(text));
    document.getElementsByTagName("head")[0].appendChild(style);
}

function addcss_file(filename, id) {
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

function delcss_file(id) {
    document.getElementsByTagName("head")[0].removeChild(document.getElementById(id));
}

function delcss(id) {
    if (document.getElementById(id) === null) {
        return;
    }
    document.getElementsByTagName("head")[0].removeChild(document.getElementById(id));
}