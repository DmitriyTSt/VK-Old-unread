"use strict";
const title = "VK Old-unread";
const v = localStorage.extversion;

const optionList = {};

/**
 VK OU v1.2.0
 Добавление опций

 optionList.%option_name% = {
 flag -- параметр опции по-умолчанию
 title -- имя, отображаемое в настройках
 positive -- функция, выполняемая при включенной опции
 negatie -- функция, выполняемая при отключенной опции
 }
 **/

optionList.oldbg = {
    flag: false,
    title: "Белый фон",
    positive: function () {
        addcss_file(localStorage.oldbg_css, "vk_ou_bg");
    },
    negative: function () {
        delcss_file("vk_ou_bg");
    }
};

optionList.adsdel = {
    flag: false,
    title: "Удаление рекламы",
    positive: function () {
        addcss('#ads_left {\
	           position: absolute !important;\
	           left: -5000px !important;\
            }', "adsdel");
    },
    negative: function () {
        delcss("adsdel");
    }
};

const vkou = {
    showOpt: function () {
        var curopt;
        var box = new MessageBox({title: title + " " + v, width: 660, hideButtons: true});
        var html = "";
        for (curopt in optionList) {
            html += buildCheckbox(curopt, optionList[curopt].flag, optionList[curopt].title);
        }
        box.content(html);
        box.show();
    },
    save: function () {
        var opt_flag = {};
        for (var curopt in optionList) {
            opt_flag[curopt] = optionList[curopt].flag;
        }
        localStorage.vkou_opt = JSON.stringify(opt_flag);
        //console.log("vkou flags of options have saved");
    },
    update: function () {
        for (var curopt in optionList) {
            if (optionList[curopt].flag) optionList[curopt].positive();
            else optionList[curopt].negative();
        }
        console.log("vkou updated");
    },
    setOpt: function (id, state) {
        console.log(id + " is " + state);
        optionList[id].flag = state;
        vkou.save();
        vkou.update();
    },
    init: function () {
        // load
        var oldOpt = JSON.parse(localStorage.vkou_opt);
        for (var key in optionList) {
            optionList[key].flag = oldOpt[key];
        }
        // upd
        for (var curopt in optionList) {
            if (optionList[curopt].flag) optionList[curopt].positive();
            else optionList[curopt].negative();
        }
        console.log("init vkou");
    }
};

vkou.init();
