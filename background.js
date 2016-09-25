// кнопка НАСТРОЙКИ
var topMenu = document.getElementById("top_profile_menu");
var settingLink = document.getElementById("top_settings_link");
var swapBackgroundButton = document.createElement("a");
swapBackgroundButton.setAttribute("class", "top_profile_mrow");
swapBackgroundButton.setAttribute("id", "top_vkou_link");
swapBackgroundButton.setAttribute("onclick", "vkou.showOpt()");
swapBackgroundButton.innerHTML = 'VK Old-unread';
swapBackgroundButton.setAttribute("wotsearchprocessed", "true");
topMenu.insertBefore(swapBackgroundButton, settingLink);

// определяем переменные
localStorage["newbg_css"] = chrome.extension.getURL('/newbg.css');
localStorage["oldbg_css"] = chrome.extension.getURL('/oldbg.css');
localStorage["extversion"] = chrome.runtime.getManifest().version;
/*if (localStorage["extversion"] && localStorage["extversion"]<chrome.runtime.getManifest().version) {
	localStorage["isNewV"] = true;
	localStorage["extversion"] = chrome.runtime.getManifest().version;
}*/
document.getElementsByTagName("body")[0].setAttribute("onload","onLoadVKnew()");

// подгружаем скрипт
var script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.setAttribute("charset", "UTF-8");
script.setAttribute("src", chrome.extension.getURL('/vkou.js'));
document.getElementsByTagName("head")[0].appendChild(script);

var script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.setAttribute("charset", "UTF-8");
script.setAttribute("src", chrome.extension.getURL('/vkou_lib.js'));
document.getElementsByTagName("head")[0].appendChild(script);
