// кнопка сменить фон
var topMenu = document.getElementById("top_profile_menu");
var settingLink = document.getElementById("top_settings_link");
var swapBackgroundButton = document.createElement("a");
swapBackgroundButton.setAttribute("class", "top_profile_mrow");
swapBackgroundButton.setAttribute("id", "top_swapbg_link");
swapBackgroundButton.setAttribute("onclick", "swapBg()");
swapBackgroundButton.innerHTML = 'Сменить фон';
swapBackgroundButton.setAttribute("wotsearchprocessed", "true");
topMenu.insertBefore(swapBackgroundButton, settingLink);

// кнопка сменить логотип
var topMenu = document.getElementById("top_profile_menu");
var settingLink = document.getElementById("top_settings_link");
var swapBackgroundButton = document.createElement("a");
swapBackgroundButton.setAttribute("class", "top_profile_mrow");
swapBackgroundButton.setAttribute("id", "top_swaplogo_link");
swapBackgroundButton.setAttribute("onclick", "swapLogo()");
swapBackgroundButton.innerHTML = 'Сменить логотип';
swapBackgroundButton.setAttribute("wotsearchprocessed", "true");
topMenu.insertBefore(swapBackgroundButton, settingLink);

// кнопка НАСТРОЙКИ
var topMenu = document.getElementById("top_profile_menu");
var settingLink = document.getElementById("top_settings_link");
var swapBackgroundButton = document.createElement("a");
swapBackgroundButton.setAttribute("class", "top_profile_mrow");
swapBackgroundButton.setAttribute("id", "top_vkou_link");
swapBackgroundButton.setAttribute("onclick", "showSettings()");
swapBackgroundButton.innerHTML = 'Настройки VKOU';
swapBackgroundButton.setAttribute("wotsearchprocessed", "true");
topMenu.insertBefore(swapBackgroundButton, settingLink);

// определяем переменные
localStorage["newbg_css"] = chrome.extension.getURL('/newbg.css');
localStorage["oldbg_css"] = chrome.extension.getURL('/oldbg.css');
document.getElementsByTagName("body")[0].setAttribute("onload","onLoadVKnew()");

// подгружаем скрипт
var script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.setAttribute("charset", "UTF-8");
script.setAttribute("src", chrome.extension.getURL('/vkou.js'));
document.getElementsByTagName("head")[0].appendChild(script);
