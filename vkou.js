var vkou = {
    options: {
        oldbg: false,
        oldlogo: false
    },
    save: function () {
        localStorage['vkou'] = JSON.stringify(this.options);
        console.log("vkou options saved");
    },
    load: function () {
        this.options = JSON.parse(localStorage.vkou);
        console.log("vkou options loaded");
    },
    run: function () {
        // фон
        if (vkou.options.oldbg) {
            addcss_file(localStorage['oldbg_css'], "vk_ou_bg");
        }
        if (vkou.options.oldlogo) {
            addcss('.top_home_link .top_home_logo {\
            background: url("http://savepic.ru/10965643.png") no-repeat !important;\
            height: 25px !important;\
            width: 124px !important;\
            margin: 8px 10px 0 0 !important;\
            }', "old_logo");
        }
        console.log("vkou is running");
    },
    update: function() {
        if (vkou.options.oldbg) {
            addcss_file(localStorage['oldbg_css'], "vk_ou_bg");
        }
        else addcss_file(localStorage['newbg_css'], "vk_ou_bg");
        if (vkou.options.oldlogo) {
            addcss('.top_home_link .top_home_logo {\
            background: url("http://savepic.ru/10965643.png") no-repeat !important;\
            height: 25px !important;\
            width: 124px !important;\
            margin: 8px 10px 0 0 !important;\
            }', "old_logo");
        }
        else delcss("old_logo");
        console.log("vkou updated");
    }
};

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
    }
    else bgCss.setAttribute("href", filename);
}
function delcss_file(id) {
    document.getElementsByTagName("head")[0].removeChild(document.getElementById(id));
}
function delcss(id) {
    document.getElementsByTagName("head")[0].removeChild(document.getElementById(id));
}

function onLoadVKnew() {
    vkou.load();
    vkou.run();
}
function swapBg() {
    vkou.options.oldbg = !vkou.options.oldbg;
    vkou.save();
    vkou.update();
}
function swapLogo() {
    vkou.options.oldlogo = !vkou.options.oldlogo;
    vkou.save();
    vkou.update();
}
