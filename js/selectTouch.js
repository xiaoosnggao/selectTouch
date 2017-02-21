!function ($) {
    "use strict";
    var selectTouch = function (options) {
        if (!(this instanceof selectTouch)) return new selectTouch(options);
        var selectTouchOptions = {
            selectTouchWarp: '.gxs-selectTouch-warp',
            selectTouch: '.gxs-selectTouch',
            selectTouchBox: '.gxs-selectTouch-box',
            selectTouchSlide: '.gxs-selectTouch-slide',
            selectTouchBg: '.gxs-selectTouch-bg',
            item: 0,
            selectForm: 'gxs-select',
            isScrolling: false,
            designateSelect: null,
            closeSelect: null
        };

        $.extend(selectTouchOptions, options);

        this.prototype = {
            nextPage: function () {
                if (selectTouchOptions.isScrolling == false) {
                    return;
                }
                selectTouchOptions.item = Math.abs(Math.floor(parseFloat($(selectTouchOptions.selectTouchSlide).css("top")) / 98));
                if (selectTouchOptions.item > $(selectTouchOptions.selectTouchBox).length - 1) {
                    selectTouchOptions.item = $(selectTouchOptions.selectTouchBox).length - 1
                }
                this.objAnimation();
                this.curItem();
            },
            prevPage: function () {
                if (selectTouchOptions.item == 0) {
                    return;
                }
                selectTouchOptions.item = Math.abs(Math.floor(parseFloat($(selectTouchOptions.selectTouchSlide).css("top")) / 98));
                this.objAnimation();
                this.curItem();
            },
            curItem: function () {
                var ele = $(selectTouchOptions.selectTouchBox).eq(selectTouchOptions.item);
                $(selectTouchOptions.selectTouchBox).removeClass("cur2 cur3").addClass("cur1");
                $(ele).addClass("cur3").next().addClass("cur2").prev().prev().addClass("cur2");
            },
            objAnimation: function () {
                var setEq = -(selectTouchOptions.item * 98);
                $(selectTouchOptions.selectTouchSlide).animate({"top": setEq}, 200);
            },
            selectShow: function () {
                $(selectTouchOptions.selectTouchWarp).fadeIn(200);
                $(".gxs-vh").addClass("filter");
            },
            selectHide: function () {
                $(selectTouchOptions.selectTouchWarp).fadeOut(200, function () {
                    $(".gxs-vh").removeClass("filter");
                    selectTouchOptions.append === true ? $(selectTouchOptions.selectTouchWarp).remove() : $(selectTouchOptions.selectTouchWarp).removeClass(_this.str);
                });
            }
        };

        var date = new Date();
        selectTouchOptions.dialogWarp = '.gxs-selectTouch-warp-' + date.getTime();
        var str = selectTouchOptions.dialogWarp.substring(1);

        if (selectTouchOptions.append === true) {
            var btnData = $(selectTouchOptions.alertBtn).data("index");
            var selectTouchWarp = $('<div></div>', {
                class: "gxs-selectTouch-warp"
            }).appendTo('body').addClass(str).data("index", btnData);
            var selectTouchBox = $('<div></div>', {
                class: "gxs-selectTouch"
            }).appendTo(selectTouchWarp);
            var selectTouchBg = $('<div></div>', {
                class: "gxs-selectTouch-bg"
            }).appendTo(selectTouchWarp);
            var selectTouchHd = $('<div></div>', {
                class: "gxs-selectTouch-hd"
            }).appendTo(selectTouchBox);
            var selectTouchBd = $('<div></div>', {
                class: "gxs-selectTouch-bd"
            }).appendTo(selectTouchBox);
            var selectTouchBorder = $('<div></div>', {
                class: "gxs-selectTouch-border"
            }).appendTo(selectTouchBd);
            var selectTouchSlider = $('<div></div>', {
                class: "gxs-selectTouch-slide"
            }).appendTo(selectTouchBd);
            var txtAry = [];
            var valAry = [];
            var txt = null;
            var val = null;
            $(".gxs-select[data-index=" + btnData + "] option").each(function () {
                txt = $(this).text();
                val = $(this).val();
                txtAry.push(txt);
                valAry.push(val);
                $('<div></div>', {
                    class: "gxs-selectTouch-box",
                    html: "<p>" + txt + "</p>"
                }).appendTo(selectTouchSlider);
            });
            var selectTouchBtnDefault = $('<button></button>', {
                class: 'gxs-btn default',
                text: '取消'
            }).appendTo(selectTouchHd);
            var selectTouchBtnPrimary = $('<button></button>', {
                class: 'gxs-btn primary',
                text: "确定"
            }).appendTo(selectTouchHd);
            selectTouchOptions.selectTouchWarp = "." + str;
        }

        this.prototype.selectShow();

        selectTouchOptions.selectTouch = $(selectTouchOptions.selectTouchWarp).find('.gxs-selectTouch');
        selectTouchOptions.selectTouchBox = $(selectTouchOptions.selectTouchWarp).find('.gxs-selectTouch-box');
        selectTouchOptions.selectTouchSlide = $(selectTouchOptions.selectTouchWarp).find('.gxs-selectTouch-slide');

        if ($(selectTouchOptions.alertBtn).data("list")) {
            selectTouchOptions.item = $(selectTouchOptions.alertBtn).data("list");
        }

        var _this = this;
        var startPos = null;
        var eleClick = null;

        $(selectTouchOptions.selectTouchWarp).find(selectTouchOptions.selectTouchBox).addClass("cur1");
        this.prototype.curItem();
        this.prototype.objAnimation();

        $(selectTouchOptions.selectTouchSlide).on('touchstart', function (event) {
            selectTouchOptions.isScrolling = true;
            var startTouch = event.originalEvent.targetTouches[0];
            startPos = {
                x: startTouch.pageX,
                y: startTouch.pageY,
                time: +new Date()
            };
            event.preventDefault()
        });

        $(selectTouchOptions.selectTouchWarp).find(".primary").touchClick(function () {
            _this.prototype.selectHide();
            var text = $(selectTouchOptions.selectTouchWarp).find($(selectTouchOptions.selectTouchBox)).eq(selectTouchOptions.item).text().trim();
            var val = $(selectTouchOptions.selectTouchWarp).find($(selectTouchOptions.selectTouchBox)).eq(selectTouchOptions.item).data("value");
            $(selectTouchOptions.alertBtn).attr("type") == "text" ? $(selectTouchOptions.alertBtn).val(text) : $(selectTouchOptions.alertBtn).text(text);
            $(selectTouchOptions.alertBtn).data("list", selectTouchOptions.item);
            selectTouchOptions.designateSelect(text, val);
            $(".gxs-select[data-index=" + btnData + "]").val($(".gxs-select[data-index=" + btnData + "] option").eq(selectTouchOptions.item).val());
        });

        $(selectTouchOptions.selectTouchWarp).find(".default").touchClick(function (event) {
            _this.prototype.selectHide();
            selectTouchOptions.closeSelect();
        });

        $(selectTouchOptions.selectTouchBg).touchClick(function (event) {
            _this.prototype.selectHide()
        });

        $(selectTouchOptions.selectTouchSlide).on('touchmove', function (event) {
            if (!selectTouchOptions.isScrolling) {
                return;
            }
            var moveTouch = event.originalEvent.targetTouches[0];
            var movePos = {
                x: moveTouch.pageX - startPos.x,
                y: moveTouch.pageY - startPos.y
            };

            selectTouchOptions.isScrolling = Math.abs(movePos.x) < Math.abs(movePos.y);
            if (selectTouchOptions.isScrolling) {
                var moveOffset = movePos.y - selectTouchOptions.item * 98;
                $(selectTouchOptions.selectTouchSlide).css("top", moveOffset);
                event.preventDefault()
            }
        });

        $(selectTouchOptions.selectTouchSlide).on('touchend', function (event) {
            if (!selectTouchOptions.isScrolling) {
                return;
            }
            var duration = +new Date() - startPos.time;
            var endTouch = event.originalEvent.changedTouches[0];
            var endPos = {
                x: endTouch.pageX - startPos.x,
                y: endTouch.pageY - startPos.y
            };

            if (duration > 0) { /*间隔事件*/
                if (Math.abs(endPos.y) > 30) { /*两次滑动的距离>10*/
                    if (endPos.y >= 0) {
                        if (selectTouchOptions.item == 0) {
                            selectTouchOptions.isScrolling = false;
                            _this.prototype.objAnimation();
                        } else {
                            _this.prototype.prevPage();
                        }
                    } else if (endPos.y < 0) {
                        if (selectTouchOptions.item == $(selectTouchOptions.selectTouchBox).length - 1) {
                            selectTouchOptions.isScrolling = false;
                            _this.prototype.objAnimation();
                        } else {
                            _this.prototype.nextPage();
                        }
                    } else {
                        selectTouchOptions.isScrolling = false;
                        _this.prototype.objAnimation();
                    }
                } else {
                    _this.prototype.objAnimation();
                }
            } else {
                _this.prototype.objAnimation();
            }
        })
    };

    window.selectTouch = selectTouch;
}($);

