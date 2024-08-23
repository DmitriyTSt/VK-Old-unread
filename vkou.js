"use strict";
const title = "VK Old-unread";
const v = localStorage.vkou_version;

const optionList = {};

/**
 VK OU v1.3.1
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
        addCssFile(localStorage.vkou_oldbg_css, "vk_ou_bg");
    },
    negative: function () {
        delCssFile("vk_ou_bg");
    }
};

optionList.adsdel = {
    flag: false,
    title: "Удаление рекламы",
    positive: function () {
        addCss('#ads_left {\
	           position: absolute !important;\
	           left: -5000px !important;\
            }', "adsdel");
    },
    negative: function () {
        delCss("adsdel");
    }
};

optionList.nativeAdsDel = {
    flag: false,
    title: "Удаление нативной рекламы в ленте",
    observer: undefined,
    positive: function () {
        if (this.observer) {
            unregisterMutationObserver(this.observer);
        }
        this.observer = registerMutationObserver(() => {
            this.processNativeAds("none");
        });
        console.log("vkou nativeAdsDel enabled");
        this.processNativeAds("none");
    },
    negative: function () {
        if (this.observer) {
            unregisterMutationObserver(this.observer);
        }
        console.log("vkou nativeAdsDel disabled");
        this.processNativeAds("");
    },
    processNativeAds: function (displayValue) {
        [
            ".ads_light_container.post",
            ".post_top_info_ads_group_members",
            ".post.adaptive_ad",
            "._ads_block_data_w"
        ].forEach((selectors) => {
            document.querySelectorAll(selectors)
                .forEach((item) => this.processAdInnerNode(item, displayValue));
        })
    },
    processAdInnerNode: function (node, displayValue) {
        let rowItem = node;
        while (rowItem && !rowItem.classList.contains("feed_row")) {
            rowItem = rowItem.parentElement;
        }
        if (rowItem && rowItem.style.display !== displayValue) {
            console.log(`vkou nativeAdsDel row current ${displayValue}`);
            rowItem.style.display = displayValue;
        }
    }
}

const vkou = {
    showOpt: function () {
        const box = new MessageBox({title: title + " " + v, width: 660, hideButtons: true});
        let html = "";
        for (const optionKey in optionList) {
            html += buildVkOuSettingCheckbox(optionKey, optionList[optionKey].flag, optionList[optionKey].title);
        }
        box.content(html);
        box.show();
    },
    save: function () {
        const optionFlag = {};
        for (const optionKey in optionList) {
            optionFlag[optionKey] = optionList[optionKey].flag;
        }
        localStorage.vkou_opt = JSON.stringify(optionFlag);
        //console.log("vkou flags of options have saved");
    },
    update: function () {
        for (const optionKey in optionList) {
            if (optionList[optionKey].flag) optionList[optionKey].positive();
            else optionList[optionKey].negative();
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
        const oldOpt = JSON.parse(localStorage.vkou_opt);
        for (const optionKey in optionList) {
            optionList[optionKey].flag = oldOpt[optionKey];
        }
        // upd
        for (const optionKey in optionList) {
            if (optionList[optionKey].flag) optionList[optionKey].positive();
            else optionList[optionKey].negative();
        }
        console.log("init vkou");
    }
};

vkou.init();
