var title = "VK Old-unread";
var v = localStorage.extversion;

var vkou = {
    options: {
        oldbg: false,
        oldlogo: false,
        adsdel: false,
		answers: false
    },
    optTitles: {
        oldbg: "Белый фон",
        oldlogo: "Старый логотип",
        adsdel: "Удаление рекламы",
		answers: "Кнопка ответов"
    },
    showOpt: function () {
        var box = new MessageBox({title: title + " " + v, width: 660, hideButtons: true});
        var html = "";
        var curopt;
        for (curopt in this.options) {
            html += buildCheckbox(curopt, this.options[curopt], this.optTitles[curopt]);
        }
        box.content(html);
        box.show();
    },
    save: function () {
        localStorage.vkou = JSON.stringify(this.options);
        console.log("vkou options saved");
    },
    load: function () {
        this.options = JSON.parse(localStorage.vkou);
        console.log("vkou options loaded");
    },
    run: function () {
        if (vkou.options.oldbg) {
            addcss_file(localStorage['oldbg_css'], "vk_ou_bg");
        }
        if (vkou.options.oldlogo) {
            addcss('.top_home_link .top_home_logo {\
            background: url("http://savepic.ru/10965643.png") no-repeat !important;\
            height: 25px !important;\
            width: 124px !important;\
            margin: 8px 10px 0 0 !important;\
            }', "old_logo"
                  );
        }
        if (vkou.options.adsdel) {
            addcss('#ads_left {\
	           position: absolute !important;\
	           left: -5000px !important;\
            }');
        }
		if (vkou.options.answers) {
			make_button_ans();
		}
        console.log("vkou is running");
    },
    update: function() {
        //
        if (vkou.options.oldbg) {
            addcss_file(localStorage['oldbg_css'], "vk_ou_bg");
        } else addcss_file(localStorage['newbg_css'], "vk_ou_bg");
        //
        if (vkou.options.oldlogo) {
            addcss('.top_home_link .top_home_logo {\
            background: url("http://savepic.ru/10965643.png") no-repeat !important;\
            height: 25px !important;\
            width: 124px !important;\
            margin: 8px 10px 0 0 !important;\
            }', "old_logo"
                  );
        } else delcss("old_logo");
        //
        if (vkou.options.adsdel) {
            addcss('#ads_left {\
	           position: absolute !important;\
	           left: -5000px !important;\
            }', "adsdel");
        } else delcss("adsdel");
		//
		if (vkou.options.answers) {
			make_button_ans();
		}
		else erase_button_ans();
        console.log("vkou updated");
    },
    setOpt: function (id, state) {
        console.log(id + " is " + state);
        this.options[id] = state;
        vkou.save();
        vkou.update();
    }
};

function buildCheckbox(id, state, text) {
    var code = '<div class="checkbox {on}" id="vkou_opt_{id}" style="padding: 5px;" onclick="checkbox(this); vkou.setOpt(\'{id}\', isChecked(this));"><div class="vk_checkbox_caption">{text}</div></div>\
    ';
    var onState = '';
    if (state) onState += 'on';
    console.log(id + " state = " + onState);
    code = code.replace(new RegExp("{on}",'g'), onState);
    code = code.replace(new RegExp("{text}",'g'), text);
    return code.replace(new RegExp("{id}",'g'), id);
}

function addcss(text,id) {
    var style = document.createElement("style");
    style.type = "text/css";
    if (id) style.setAttribute("id",id);
    style.appendChild(document.createTextNode(text));
    document.getElementsByTagName("head")[0].appendChild(style);
}
function addcss_file(filename, id){
    var bgCss;
    bgCss = document.getElementById(id);
    if (!bgCss) {
        bgCss = document.createElement("link");
        bgCss.setAttribute("id", id);
        bgCss.setAttribute("type", "text/css");
        bgCss.setAttribute("rel", "stylesheet");
        bgCss.setAttribute("href", filename);
        document.getElementsByTagName("head")[0].appendChild(bgCss);
    } else bgCss.setAttribute("href", filename);
}
function delcss_file(id) {
    document.getElementsByTagName("head")[0].removeChild(document.getElementById(id));
}
function delcss(id) {
    if (document.getElementById(id) === null) return;
    document.getElementsByTagName("head")[0].removeChild(document.getElementById(id));
}
function make_button_ans(){
	if (document.getElementById("l_ans")) return;
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
	leftMenu.insertBefore(btn,msgLink);
}

function erase_button_ans(){
	if (document.getElementById("l_ans") === null) return;
	document.getElementById("side_bar_inner").getElementsByTagName('ol')[0].removeChild(document.getElementById("l_ans"));
}

function onLoadVKnew() {
    //vkou.save();
	if (localStorage.isNewV) {
		//vkou.load();
		//vkou.save();
	}
    vkou.load();
    vkou.run();
}
