/*
 * @Author: bin
 * @Date:   2016-08-09 08:16:37
 * @Last Modified by:   bin
 * @Last Modified time: 2016-08-31 20:03:33
 */

'use strict';
var oLoading = $("loading");
var oContainer = $("container");
showLoading();

function showLoading() {

    var oSpan = oLoading.getElementsByTagName("span")[0];
    var aDiv = oLoading.getElementsByTagName("div");

    var arr = ["slider5.jpg", "slider2.jpg", "hrb_before.jpg"];
    var iNow = 0;
    for (var i = 0; i < arr.length; i++) {

        var objImg = new Image();
        objImg.src = 'img/' + arr[i];
        objImg.onload = function() {
            iNow++;
            oSpan.style.width = iNow / arr.length * 100 + '%';
        };

    }
    oSpan.addEventListener('webkitTransitionend', spanChange, false);
    oSpan.addEventListener('transitionend', spanChange, false);

    function spanChange() {

        if (oSpan.style.width == '100%') {
            oSpan.style.display = 'none';
            aDiv[0].style.height = 0;
            aDiv[1].style.height = 0;
        }
    }
    aDiv[0].addEventListener('webkitTransitionend', divChange, false);
    aDiv[0].addEventListener('transitionend', divChange, false);

    function divChange() {
        oLoading.parentNode.removeChild(oLoading);
        oContainer.style.display = "block";
        var box1 = "bannerSlider";

        var box3 = "ten-famous";

        var oFocusExpress = $("focus-express");
        var aFocusControl = getByClass(oFocusExpress, "change");
        var aDown = getByClass(oFocusExpress, "down");
        var aDescContent = getByClass(oFocusExpress, "desc-content");
        var aDescContent2 = getByClass(oFocusExpress, "desc-content2");
        var oSmogPepole = $("smog-pepole");
        var aTypeNav = getByClass(oSmogPepole, "type-nav");
        var oSelecter1 = $("selecter");
        var oSelecter2 = $("selecter1");
        var oSlide = $("slide");
        var oMain = $("bin-main");

        var oSmogActivity = $("smog-activity");

        var aFirstLevel = getByClass(oSmogActivity, "first-level");


        var aTypeNavLi = aTypeNav[0].getElementsByTagName("li");
        oSlide.style.left = oMain.offsetLeft / 2 - 57 + "px";
        aTypeNavLi[0].onclick = function() {
            if (!aTypeNavLi[0].classList.contains('list-hover')) {
                aTypeNavLi[0].classList.add('list-hover');
                aTypeNavLi[1].classList.remove('list-hover')
                oSelecter1.classList.remove("xxk");
                oSelecter1.classList.add("selected");
                oSelecter2.classList.add("xxk");
                oSelecter2.classList.remove("selected");
            }
        }
        aTypeNavLi[1].onclick = function() {
            if (!aTypeNavLi[1].classList.contains('list-hover')) {
                aTypeNavLi[1].classList.add('list-hover');
                aTypeNavLi[0].classList.remove('list-hover')
                oSelecter2.classList.remove("xxk");
                oSelecter2.classList.add("selected");
                oSelecter1.classList.add("xxk");
                oSelecter1.classList.remove("selected");

            }
        }


        slider(box2);
        slider(box3);

        bindNav();
        sliderMix();
        sliderMix1();

        function bindNav() {
            for (var i = 0; i < aFocusControl.length; i++) {
                aFocusControl[i].index = i;
                aFocusControl[i].toDown = 1;
                aFocusControl[i].onclick = function() {
                    change(this.index, this.toDown);
                }
            }
        }

        function sliderMix() {
            var oPrev = $("ctrl-slider-moye-3-prev");
            var oNext = $("ctrl-slider-moye-3-next");

            var ul = oFocusExpress.children[0];
            var ol = oFocusExpress.children[1];
            var ulLis = ul.children;
            var imgWidth = oFocusExpress.offsetWidth;


            var olLis = ol.children;
            olLis[0].className = "ui-slider-pager-selected";

            for (var j = 0; j < olLis.length; j++) {
                olLis[j].index = j;

                olLis[j].onmouseover = function() {

                    for (var k = 0; k < olLis.length; k++) {
                        olLis[k].className = "";
                    }

                    this.className = "ui-slider-pager-selected";

                    var target = -this.index * imgWidth;

                    animate(ul, target);

                    pic = this.index;
                    square = this.index;
                }
            }


            var pic = 0;
            var square = 0;
            var timer = null;
            timer = setInterval(autoplay, 2500);

            oFocusExpress.onmouseover = function() {
                clearInterval(timer);
            }
            oFocusExpress.onmouseout = function() {
                timer = setInterval(autoplay, 2500);
            }
            oPrev.onclick = function() {
                contPlay(-1)
            }
            oNext.onclick = function() {
                contPlay(1);
            }

            function contPlay(a) {
                if (a > 0) {
                    autoplay()
                } else {
                    if (pic > 0) {
                        pic--;
                    } else {
                        pic = ulLis.length - 1;
                        ul.style.left = 2940;
                    }
                    if (square > 0) {
                        square--;
                    } else {
                        square = olLis.length - 1;
                    }
                    var target = -pic * imgWidth;
                    animate(ul, target);
                    for (var i = 0; i < olLis.length; i++) {
                        olLis[i].className = "";
                    }
                    //亮起当前的
                    olLis[square].className = "ui-slider-pager-selected";

                }
            }

            function autoplay() {
                if (pic < ulLis.length - 1) {
                    pic++;
                } else {
                    pic = 0;
                    ul.style.left = 0;
                }

                //分析 target 和 pic imgWidth
                var target = -pic * imgWidth;
                animate(ul, target);


                //如果square 小于 最后的按钮的索引号
                if (square < olLis.length - 1) {
                    square++;
                } else {
                    square = 0;
                }


                //干掉所有人
                for (var i = 0; i < olLis.length; i++) {
                    olLis[i].className = "";
                }
                //亮起当前的
                olLis[square].className = "ui-slider-pager-selected";

            }

            function animate(obj, target) {
                clearInterval(obj.timer);
                obj.timer = setInterval(function() {
                    var step = 20;
                    step = obj.offsetLeft < target ? step : -step;

                    if (Math.abs(obj.offsetLeft - target) > Math.abs(step)) {
                        obj.style.left = obj.offsetLeft + step + "px";
                    } else {
                        obj.style.left = target + "px";
                        clearInterval(obj.timer);
                    }
                }, 5)
            }
        }

        function sliderMix1() {
            var oPrev = $("ctrl-slider-moye-2-prev");
            var oNext = $("ctrl-slider-moye-2-next");
            var ul = aFirstLevel[0].children[0];
            var ulLis = ul.children;
            var imgWidth = aFirstLevel[0].offsetWidth;

            var pic = 0;

            var timer = null;
            timer = setInterval(autoplay, 2500);

            aFirstLevel[0].onmouseover = function() {
                clearInterval(timer);
            }
            aFirstLevel[0].onmouseout = function() {
                timer = setInterval(autoplay, 2500);
            }
            oPrev.onclick = function() {
                contPlay(-1)
            }
            oNext.onclick = function() {
                contPlay(1);
            }

            function contPlay(a) {
                if (a > 0) {
                    autoplay()
                } else {
                    if (pic > 0) {
                        pic--;
                    } else {
                        pic = ulLis.length - 1;
                        ul.style.left = 980;
                    }
                    var target = -pic * imgWidth;
                    animate(ul, target);


                }
            }

            function autoplay() {
                if (pic < ulLis.length - 1) {
                    pic++;
                } else {
                    pic = 0;
                    ul.style.left = 0;
                }

                //分析 target 和 pic imgWidth
                var target = -pic * imgWidth;
                animate(ul, target);

            }

            function animate(obj, target) {
                clearInterval(obj.timer);
                obj.timer = setInterval(function() {
                    var step = 20;
                    step = obj.offsetLeft < target ? step : -step;

                    if (Math.abs(obj.offsetLeft - target) > Math.abs(step)) {
                        obj.style.left = obj.offsetLeft + step + "px";
                    } else {
                        obj.style.left = target + "px";
                        clearInterval(obj.timer);
                    }
                }, 5)
            }
        }

        function change(index, toDown) {
            if (toDown == 1) {
                aDown[index].style.width = "100%";
                aFocusControl[index].toDown = 0;


            } else {
                aDown[index].style.width = "0%";
                aFocusControl[index].toDown = 1;


            }
            var aDescP = aDescContent[index].getElementsByTagName("p");
            var aDescP2 = aDescContent2[index].getElementsByTagName("p");
            aDescP[0].classList.toggle("change-select");
            aDescP2[0].classList.toggle("change-select");
        }
    }
}


function bindNav() {
    for (var i = 0; i < aFocusControl.length; i++) {
        aFocusControl[i].index = i;
        aFocusControl[i].toDown = 1;
        aFocusControl[i].onclick = function() {
            change(this.index, this.toDown);
        }
    }
}



function slider(boxId) {
    var obox = $(boxId);

    var ul = obox.children[0];
    var ol = obox.children[1];
    var ulLis = ul.children;
    var imgWidth = obox.offsetWidth;


    var olLis = ol.children;
    olLis[0].className = "ui-slider-pager-selected";

    for (var j = 0; j < olLis.length; j++) {
        olLis[j].index = j;

        olLis[j].onmouseover = function() {

            for (var k = 0; k < olLis.length; k++) {
                olLis[k].className = "";
            }

            this.className = "ui-slider-pager-selected";

            var target = -this.index * imgWidth;

            animate(ul, target);

            pic = this.index;
            square = this.index;
        }
    }
    ul.appendChild(ulLis[0].cloneNode(true));

    var pic = 0;
    var square = 0;
    var timer = null;
    timer = setInterval(autoplay, 2500);

    obox.onmouseover = function() {
        clearInterval(timer);
    }
    obox.onmouseout = function() {
        timer = setInterval(autoplay, 2500);
    }


    function autoplay() {
        if (pic < ulLis.length - 1) {
            pic++;
        } else {
            pic = 1;
            ul.style.left = 0;
        }

        //分析 target 和 pic imgWidth
        var target = -pic * imgWidth;
        animate(ul, target);


        //如果square 小于 最后的按钮的索引号
        if (square < olLis.length - 1) {
            square++;
        } else {
            square = 0;
        }


        //干掉所有人
        for (var i = 0; i < olLis.length; i++) {
            olLis[i].className = "";
        }
        //亮起当前的
        olLis[square].className = "ui-slider-pager-selected";

    }

    function animate(obj, target) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var step = 20;
            step = obj.offsetLeft < target ? step : -step;

            if (Math.abs(obj.offsetLeft - target) > Math.abs(step)) {
                obj.style.left = obj.offsetLeft + step + "px";
            } else {
                obj.style.left = target + "px";
                clearInterval(obj.timer);
            }
        }, 5)
    }
}

function getByClass(oParent, sClass) {
    var aElem = oParent.getElementsByTagName("*");
    var arr = [];
    for (var i = 0; i < aElem.length; i++) {
        if (aElem[i].className == sClass) {
            arr.push(aElem[i]);
        }
    }
    return arr;
}

function $(id) {
    return document.getElementById(id);
}