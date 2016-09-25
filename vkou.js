"use strict";
var title = "VK Old-unread";
var v = localStorage.extversion;

var optionList = {};

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
        addcss_file(localStorage.newbg_css, "vk_ou_bg");
    }
};

optionList.oldlogo = {
    flag: false,
    title: "Старый логотип",
    positive: function () {
        addcss('.top_home_link .top_home_logo {\
            background: url("http://savepic.ru/10965643.png") no-repeat !important;\
            height: 25px !important;\
            width: 124px !important;\
            margin: 8px 10px 0 0 !important;\
            }', "old_logo");
    },
    negative: function () {
        delcss("old_logo");
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

optionList.answers = {
    flag: false,
    title: "Кнопка ответов",
    positive: function () {
        if (!document.getElementById("l_ans")) {
            var leftMenu = document.getElementById("side_bar_inner").getElementsByTagName('ol')[0];
            var msgLink = document.getElementById("l_msg");
            var btn = document.createElement("li");
            btn.setAttribute("class", "");
            btn.setAttribute("id", "l_ans");
            btn.innerHTML = '<a href="/feed?section=notifications" onclick="return nav.go(this, event, {noback: true, params: {_ref: \'left_nav\'}});" class="left_row" wotsearchprocessed="true">\
            <span class="left_fixer">\
              <span class="left_icon fl_l"></span>\
              <span class="left_label inl_bl">Ответы</span>\
            </span>\
          </a>\
          <div class="left_settings" onclick="menuSettings(0)">\
          <div class="left_settings_inner"></div>\
        </div>';
            leftMenu.insertBefore(btn, msgLink);
        }
    },
    negative: function () {
        if (document.getElementById("l_ans") !== null) {
            document.getElementById("side_bar_inner").getElementsByTagName('ol')[0].removeChild(document.getElementById("l_ans"));
        }
            
    }
};

var vkou = {
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
        console.log("vkou flags of options have saved");
    },
    load: function() {
        var oldOpt = JSON.parse(localStorage.vkou_opt);
        for (var key in optionList) {
            optionList[key].flag = oldOpt[key];
        }
    },
    update: function() {
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
    }
};

function onLoadVKnew() {
    vkou.load();
    vkou.update();
}
