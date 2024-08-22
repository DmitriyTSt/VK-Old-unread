"use strict"

// кнопка НАСТРОЙКИ
const settingLink = document.getElementById("top_settings_link");
const topMenu = settingLink.parentElement;
const swapBackgroundButton = document.createElement("a");
swapBackgroundButton.setAttribute(
    "class",
    "vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__resetLinkStyle vkuiClickable__host " +
    "vkuiClickable__realClickable vkui-focus-visible vkuiSimpleCell vkuiSimpleCell--sizeY-compact EcoPlate_item__pFaRt"
);
const buttonId = "top_vkou_link"
swapBackgroundButton.setAttribute("id", buttonId);
swapBackgroundButton.setAttribute("onclick", "vkou.showOpt()");
swapBackgroundButton.innerHTML = "<div class=\"vkuiSimpleCell__before\">" +
    "<span class=\"EcoPlate_itemIcon__Gryt6\">" +
    "<svg aria-hidden=\"true\" display=\"block\" class=\"vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--gear_outline_20\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\" style=\"width: 20px; height: 20px;\">" +
    "<use xlink:href=\"#gear_outline_20\" style=\"fill: currentcolor;\"></use>" +
    "</svg>" +
    "</span>" +
    "</div>" +
    "<div class=\"vkuiSimpleCell__middle\">" +
    "<div class=\"vkuiSimpleCell__content\">" +
    "<span class=\"vkuiTypography vkuiTypography--normalize vkuiTypography--weight-3 vkuiSimpleCell__children " +
    "vkuiHeadline--sizeY-compact vkuiHeadline--level-1\">" +
    "<span class=\"vkuiTypography vkuiTypography--normalize vkuiText vkuiText--sizeY-compact\">Vk Old-unread</span>" +
    "</span>" +
    "</div>" +
    "</div>" +
    "<span aria-hidden=\"true\" class=\"vkuiTappable__stateLayer vkuiTappable__ripple\"></span>";
topMenu.insertBefore(swapBackgroundButton, settingLink);
swapBackgroundButton.addEventListener("mouseenter", () => {
    swapBackgroundButton.classList.add("vkuiTappable--hovered-background");
});
swapBackgroundButton.addEventListener("mouseleave", () => {
    swapBackgroundButton.classList.remove("vkuiTappable--hovered-background");
});

// определяем переменные
localStorage.newbg_css = chrome.runtime.getURL('/newbg.css');
localStorage.oldbg_css = chrome.runtime.getURL('/oldbg.css');
localStorage.extversion = chrome.runtime.getManifest().version;

// подгружаем функции
let scriptOuLib = document.createElement("script");
scriptOuLib.setAttribute("type", "text/javascript");
scriptOuLib.setAttribute("charset", "UTF-8");
scriptOuLib.setAttribute("src", chrome.runtime.getURL('/vkou_lib.js'));
document.getElementsByTagName("head")[0].appendChild(scriptOuLib);
// подружаем скрипт
let scriptOu = document.createElement("script");
scriptOu.setAttribute("type", "text/javascript");
scriptOu.setAttribute("charset", "UTF-8");
scriptOu.setAttribute("src", chrome.runtime.getURL('/vkou.js'));
document.getElementsByTagName("head")[0].appendChild(scriptOu);

