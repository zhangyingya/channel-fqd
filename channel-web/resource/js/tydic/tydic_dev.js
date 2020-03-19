var dic_W, dicW, dicW_, dic_H, dicH, dicH_, dcT, dcBd, dcST = 100, 
dcMAX = Number.MAX_VALUE,
ie = jQuery.browser.msie,
iev = jQuery.browser.version,
ie6 = ie && iev < 7,
ie7 = ie && iev == 7,
ie8 = ie && iev > 7,
ie67 = ie6 || ie7,
ie68 = ie6 || ie8,
ff = jQuery.browser.mozilla,
ff2 = ff && navigator.userAgent.toLowerCase().match(/firefox\/([\d.]+)/) && (navigator.userAgent.toLowerCase().match(/firefox\/([\d.]+)/)[1].charAt(0) - 3 < 0),
safari = jQuery.browser.safari,
opera = jQuery.browser.opera,
dicPath = '/channel-web/resource/images/',
tydic = {};
String.prototype.replaceAll = function(a, b) {
    return this.replace(new RegExp(a, "gm"), b);
}; (function(dc, $) {
    dc.blocker = {
        opt: {},
        dqq: [[], []],
        cqq: [[], []],
        load: function(c) {
            var isDoc = (c.context) ? false: true;
            c.context = isDoc ? dcBd: c.context.css({
                position: 'relative'
            });
            c.obj = $({});
            var ob = dc.tool.qq(isDoc ? this.dqq: this.cqq, this.opt, c),
            id = ob.data('id'),
            ctx = ob.data('cfg').context;
            ctx.append('<div id = "dic' + id + '" class = "dicBlock"/>');
            ob.data('blk', $('#dic' + id).data('ctx', ctx).data('id', id));
            if (ie6) {
                ctx.append('<iframe id = "dic' + id + 'Frm" scrolling = "no" frameborder = "0" style = "width:0;height:0"></iframe>');
            }
            var blk = {
                cnt: $('#dic' + id).data('sTop', $(isDoc ? document: ctx).scrollTop()),
                close: function() {
                    blk.cnt.remove();
                    if (isDoc) {
                        dc.blocker.dqq[0] = $.grep(dc.blocker.dqq[0],
                        function(cur, i) {
                            return id == cur[i];
                        });
                        dc.blocker.dqq[1] = $.grep(dc.blocker.dqq[1],
                        function(cur, i) {
                            return ob == cur[i];
                        });
                    } else {
                        dc.blocker.cqq[0] = $.grep(dc.blocker.cqq[0],
                        function(cur, i) {
                            return id == cur[i];
                        });
                        dc.blocker.cqq[1] = $.grep(dc.blocker.cqq[1],
                        function(cur, i) {
                            return ob == cur[i];
                        });
                    }
                    if (isDoc) {
                        if (0 == $('.dicBlock', ctx).length) {
                            var htdy = $(ie ? 'html': 'body');
                            if (isDoc && 'hidden' != htdy.data('overflow')) {
                                htdy.removeAttr('style');
                            }
                            dc.tool.disTab(false);
                        }
                    } else {
                        if (! (c.context.data('head') && c.context.data('body') && c.context.data('page'))) {
                            c.context.css({
                                overflowX: c.context.data('ovx'),
                                overflowY: c.context.data('ovy')
                            });
                        }
                    }

                    if (ie6) {
                        $('#dic' + id + 'Frm').remove();
                    }
                }
            };
            if (isDoc) {
                if (dc.blocker.dqq[0].length < 2) {
                    var htdy = $(ie ? 'html': 'body');
                    htdy.data('overflow', htdy.css('overflow'));
                    htdy.css({
                        overflow: 'hidden'
                    });
                }
            } else {
                c.context.data('ovx', c.context.css('overflowX')).data('ovy', c.context.css('overflowY'));
                c.context.css({
                    overflowX: 'hidden',
                    overflowY: 'hidden'
                });
            }
            blk.cnt.css({
                position: 'absolute',
                overflow: 'hidden',
                left: 0,
                top: isDoc ? 0 : blk.cnt.data('sTop'),
                width: isDoc ? dicW_: ctx.width(),
                //height: isDoc ? dicH + (blk.cnt.data('sTop')) : ctx.height(),
                bottom : 0,
                backgroundImage: 'url("' + dicPath + (ie6 ? 'blank': 'block') + '.png")'
            });
            if (ie6) {
                $('#dic' + id + 'Frm').css({
                    position: 'absolute',
                    overflow: 'hidden',
                    left: 0,
                    top: 0,
                    width: blk.cnt.width(),
                    height: blk.cnt.height(),
                    zIndex: $.dicZid(),
                    filter: 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'
                });
                blk.cnt.css({
                    zIndex: $.dicZid(),
                    filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src="' + dicPath + 'block.png")'
                });
            }
            blk.cnt.css({
                zIndex: $.dicZid()
            });
            dc.tool.disTab(true);
            var rez = function(bo, doc) {
                bo = bo.data('blk');
                var ctx = bo.data('ctx');
                if (ff2) {
                    $(document).scrollTop(bo.data('sTop'));
                }
                var w = doc ? dicW: ctx.width();
                var h = doc ? dicH + bo.data('sTop') : ctx.height();
                bo.css({
                    width: w,
                    height: h
                });
                var cnt = bo.children();
                if (bo.data('auto')) {
                    cnt.width(w / bo.data('auto'));
                }
                cnt.css({
                    left: ((w < cnt.width()) ? 0 : (w - cnt.width()) / 2),
                    top: ((h < cnt.height()) ? 0 : (bo.data('sTop') / (isDoc ? 1 : 2)) + (h - bo.data('sTop') - cnt.height()) / 2)
                });
                if (ie6) {
                    $('#dic' + bo.data('id') + 'Frm', ctx).css({
                        left: bo.css('left'),
                        top: bo.css('top'),
                        width: bo.width(),
                        height: bo.height()
                    });
                }
            };
            $.dicAddResize(function() {
                $.each(dc.blocker.dqq[1],
                function() {
                    rez($(this), true);
                });
                $.each(dc.blocker.cqq[1],
                function() {
                    rez($(this), false);
                });
            });
            return blk;
        }
    },
    dc.box = {
        opt: {
            style: 1,
            title: '',
            cTitle: '',
            content: '',
            icon: dicPath + 'space.gif',
            button: [],
            timer: -1,
            drag: false,
            width: 400,
            height: 200,
            beforeClose: function() {},
            close: function() {},
            confirm: function() {},
            cancel: function() {}
        },
        load: function(c) {
            switch ((c && c.style ? c.style: 1) - 0) {
            case 1:
                this.opt.title = $.i18n('box-t1');
                this.opt.cTitle = "&nbsp;";
                this.opt.icon = 'msg-right';
                this.opt.button = [{
                    name: $.i18n('box-b1'),
                    func: function() {
                        cls();
                    }
                }];
                break;
            case 2:
                this.opt.title = $.i18n('box-t2');
                this.opt.cTitle ="&nbsp;";
                this.opt.icon = 'msg-wrong';
                this.opt.button = [{
                    name: $.i18n('box-b1'),
                    func: function() {
                        cls();
                    }
                }];
                break;
            case 3:
                this.opt.title = $.i18n('box-t3');
                this.opt.cTitle = $.i18n('box-c3');
                this.opt.icon = 'msg-warn';
                this.opt.button = [{
                    name: $.i18n('box-b1'),
                    func: function() {
                        cls();
                    }
                }];
                break;
            case 4:
                this.opt.title = $.i18n('box-t4');
                this.opt.cTitle = $.i18n('box-c4');
                this.opt.icon = 'msg-user';
                this.opt.button = [{
                    name: $.i18n('box-b2'),
                    func: function() {
                        cls();
                    }
                },
                {
                    name: $.i18n('box-b3'),
                    func: function() {
                        cls();
                    }
                }];
                break;
            default:
                break;
            }
            var p = $.extend({},
            this.opt, c || {}),
            n = $.dicAdd().append('<div/><div/><div/><div/><div/>');
            var w = $.dicWin({
                title: p.title,
                context: p.context,
                content: n,
                width: 400,
                height: 200,
                modal: true,
                drag: p.drag,
                beforeClose: function() {
                    n.hide();
                    p.beforeClose();
                },
                close: function() {
                    n.hide();
                    p.close();
                }
            });
            var cls = function() {
                 w.close();
                n.remove();
            };
            $('div', n).each(function(i) {
                switch (i) {
                case 0:
                    $(this).css({
                        display:
                        'inline',
                        'float': 'left',
                        margin: (ie67 ? '20px': '0px') + ' 20px 20px',
                        width: 47,
                        height: 47
                    }).append('<img class = "' + p.icon + '" style = "margin:0" src = "' + dicPath + 'space.gif"/>');
                    break;
                case 1:
                    $(this).addClass('cR').css({
                        margin:
                        '20px 20px 0 20px'
                    }).append(p.cTitle);
                    break;
                case 2:
                    if (p.mContent) {
                        var did = $.dicId();
                        $(this).append('<img  id="' + did + '" class="cR hand ui_box1" title="' + $.i18n('box-t5') + '" src = "' + dicPath + 'space.gif"/>').append(p.content);
                        $('#' + did).click(function() {
                            var solo = $($('div', n)[3]);
                            if (solo.css('display') == 'none') {
                                solo.html(p.mContent).show();
                                $(this).removeClass('ui_box1').addClass('ui_box2').attr('title', $.i18n('box-t6'));
                            } else {
                                solo.hide();
                                $(this).removeClass('ui_box2').addClass('ui_box1').attr('title', $.i18n('box-t5'));
                            }
                        });
                    } else {
                        $(this).append(p.content);
                    }
                    break;
                case 3:
                    $(this).css({
                        'width':
                        260,
                        'height': 70,
                        'overflowY': 'auto',
                        'border': 'solid 1px gray'
                    }).hide();
                    break;
                case 4:
                    var m = $(this).addClass('tc').css({
                        clear: 'both'
                    });
                    $.each(p.button,
                    function(i, b) {
                        $('<input type = "button" class = "btn1" value = "' + b.name + '" />&nbsp;').appendTo(m).click(function() {
                            if (4 == p.style - 0) {
                                if (0 == i && p.confirm) {
                                    p.confirm(n);
                                }
                                if (1 == i && p.cancel) {
                                    p.cancel(n);
                                }
                            }
                            if (0 == p.style - 0) {
                                if (b.func()) {
                                    cls();
                                }
                            } else {
                                b.func();
                            }
                        });
                    });
                    break;
                }
            });
            
            
            $(document).unbind("keydown").bind("keydown","space",function(event){ 
            	 if(event.keyCode == 32 || event.keyCode == 13)
            		 cls();
            	});
            
        }
    },
    dc.bubble = {
        opt: {
            title: '',
            width: 300,
            height: 200,
            drag: false,
            opacity: 1,
            content: '',
            close: false,
            secs: 4000
        },
        dwMsg:null,
        qq: [[], []],
        close: function() { 
        	if(dc.bubble.dwMsg)
        		dc.bubble.dwMsg.remove(); 
        	dc.bubble.dwMsg =null;
        },
        load: function(c) { 
            c.obj = $({});
            var bo = dc.tool.qq(this.qq, this.opt, c),
            id = bo.data('id'),
            p = bo.data('cfg');
            var sb = function(c, w, a) {
                var s = {
                    opacity: c.opacity
                };
                if(!w)return;
                if (dicH - w.offset().top - c.height < 0) {
                    s.top = dicH - c.height - (ie6 ? 35 : 30);
                }
                if (dicW - w.offset().left - c.width < 0) {
                    s.left = dicW - c.width - (ie6 ? 50 : 30);
                }
                if (a) {
                    w.stop(true, true).animate({
                        opacity: c.opacity,
                        top: dicH - c.height - (ie6 ? 35 : 30),
                        left: dicW - c.width - (ie6 ? 50 : 30)
                    },
                    {
                        duration: 500
                    });
                } else {
                    w.css(s);
                }
            };  
            
            dc.bubble.dwMsg = $('#dic' + $.dicWin({
                title: p.title,
                width: p.width,
                height: p.height,
                drag: p.drag,
                opacity: 0.1,
                modal: false,
                left: dicW - p.width - (ie6 ? 50 : 30),
                top: dicH - p.height - (ie6 ? 135 : 130),
                content: p.content
            }).id);
            sb(p, dc.bubble.dwMsg, true);
            $.dicAddResize(function() {
                sb(p, dc.bubble.dwMsg, false);
            }); 
              
            if (p.close) {  
            	dc.bubble.dwMsg.stop(true,true).fadeOut(p.secs,function(){ dc.bubble.close();}); 
            } 
        }
    },
    dc.calendar = {
        opt: {
            separator: '-',
            format: 'YYYY-MM-DD',
            multi: false,
            showTime: 100,
            hideTime: 100,
            direction: 's',
            spaceX: 0,
            spaceY: 0,
            opacity: 1
        },
        qq: [[], []],
        md: function(d, m) {
            var s = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            var y = d.getFullYear();
            s[1] = (((y % 100 != 0) && (y % 4 == 0)) || (y % 400 == 0)) ? 29 : 28;
            return s[m ? m: d.getMonth()];
        },
        load: function(c) {
            var cld, p = $.extend({},
            this.opt, c || {});
            var doym = function(p, y, m, d, c, Y) {
                var t = c.obj.data('target'),
                ym = p.data('ym').hide().empty().removeAttr('style').addClass('date-side tc').css({
                    position: 'absolute',
                    top: 28,
                    left: Y ? 42 : 87,
                    height: 'auto'
                }).unbind('mouseenter mouseleave');
                if (Y) {
                    var mod = y % 10;
                    y -= 0 == mod ? 10 : 0;
                    ym.append('<table width="100%" class="mT5 top" border="0" cellSpacing="0" cellpadding="0" align = "center"><tr><td>' + (y - mod + 1) + '</td><td>' + (y - mod + 2) + '</td></tr><tr><td>' + (y - mod + 3) + '</td><td>' + (y - mod + 4) + '</td></tr><tr><td>' + (y - mod + 5) + '</td><td>' + (y - mod + 6) + '</td></tr><tr><td>' + (y - mod + 7) + '</td><td>' + (y - mod + 8) + '</td></tr><tr><td>' + (y - mod + 9) + '</td><td>' + (y - mod + 10) + '</td></tr></table><table width = "96%" class = "mg mT5 down" border = "0" cellSpacing = "0" cellpadding = "0"><tr><td>&nbsp;</td><td class = "dateico2-2"></td><td>&nbsp;</td><td class = "dateico2-1"></td><td>&nbsp;</td></tr></table>');
                    var ytd = $('td', $('table.top', ym));
                    ytd.addClass('hand').hover(function() {
                        $(this).addClass('cB')
                    },
                    function() {
                        $(this).removeClass('cB')
                    }).each(function(i) {
                        $(this).click(function() {
                            var da = new Date(),
                            lm;
                            da.setFullYear($(this).text(), m - 1, 1);
                            lm = dc.calendar.md(da, null);
                            da.setDate(d > lm ? lm: d);
                            rf(da, c, t);
                        });
                    });
                    $('td:odd', $('table.down', ym)).each(function(i) {
                        $(this).click(function() {
                            if (0 == i) {
                                ytd.each(function() {
                                    $(this).text($(this).text() - 10);
                                });
                            } else {
                                ytd.each(function() {
                                    $(this).text($(this).text() - -10);
                                });
                            }
                        });
                    });
                } else {
                    ym.append('<table width="100%" class="mT5" border="0" cellSpacing="0" cellpadding="0"><tr><td>' + $.i18n('cal-m1') + '</td><td>' + $.i18n('cal-m2') + '</td></tr><tr><td>' + $.i18n('cal-m3') + '</td><td>' + $.i18n('cal-m4') + '</td></tr><tr><td>' + $.i18n('cal-m5') + '</td><td>' + $.i18n('cal-m6') + '</td></tr><tr><td>' + $.i18n('cal-m7') + '</td><td>' + $.i18n('cal-m8') + '</td></tr><tr><td>' + $.i18n('cal-m9') + '</td><td>' + $.i18n('cal-m10') + '</td></tr><tr><td>' + $.i18n('cal-m11') + '</td><td>' + $.i18n('cal-m12') + '</td></tr></table>');
                    $('td', ym).addClass('hand').hover(function() {
                        $(this).addClass('cB')
                    },
                    function() {
                        $(this).removeClass('cB')
                    }).each(function(i) {
                        $(this).click(function() {
                            var da = new Date(),
                            lm;
                            da.setFullYear(y, i, 1);
                            lm = dc.calendar.md(da, null);
                            da.setDate(d > lm ? lm: d);
                            rf(da, c, t);
                        });
                    });
                }
                ym.hover(function() {},
                function() {
                    ym.hide();
                }).show();
            };
            var dotm = function(i, t, d, c) {
                var l = 0,
                w = 0,
                s = [];
                switch (i) {
                case 0:
                    l = 15;
                    w = 50;
                    for (var z = 0; z < 24; z++) {
                        s.push('<tr><td>' + b0(z) + $.i18n('cal-hour') + '</td></tr>');
                    }
                    break;
                case 1:
                    l = 65;
                    w = 58;
                    for (z = 0; z < 60; z++) {
                        s.push('<tr><td>' + b0(z) + $.i18n('cal-minute') + '</td></tr>');
                    }
                    break;
                case 2:
                    l = 124;
                    w = 51;
                    for (z = 0; z < 60; z++) {
                        s.push('<tr><td>' + b0(z) + $.i18n('cal-second') + '</td></tr>');
                    }
                    break;
                }
                var tm = c.obj.data('ym').hide().empty().removeAttr('style').addClass('date-side tc').css({
                    position: 'absolute',
                    top: 29,
                    left: l,
                    width: w,
                    height: 158,
                    overflowX: 'hidden',
                    overflowY: 'auto'
                }).unbind('mouseenter mouseleave');
                $('td', $('<table width="100%" class="mT5 hand" border="0" cellSpacing="0" cellpadding="0"></table>').appendTo(tm).append(s.join(''))).each(function(j) {
                    $(this).hover(function() {
                        $(this).addClass('cB')
                    },
                    function() {
                        $(this).removeClass('cB');
                    }).click(function() {
                        $(t[i]).text($(this).text().substring(0, 2));
                        switch (i) {
                        case 0:
                            d.setHours(j);
                            break;
                        case 1:
                            d.setMinutes(j);
                            break;
                        case 2:
                            d.setSeconds(j);
                            break;
                        }
                        tm.hide();
                    });
                });

                tm.hover(function() {},
                function() {
                    tm.hide();
                }).show();
            };
            var b0 = function(n) {
                return n < 10 ? '0' + n: n;
            };
            var pd = function(s, p, a) {
                if (s && s.length > 0) {
                    s = s.split(p);
                    try {
                        return new Date(s[0], s[1] - 1, s[2]).getTime();
                    } catch(e) {
                        return a ? dcMAX: 0;
                    }
                } else {
                    return a ? dcMAX: 0;
                }
            };
            var tz = function(d) {
                var z = $.getCookie('tydic.i18n.timezone.key');
                if (z) {
                    d.setHours(d.getHours() + z);
                }
            };
            var vd = function(d, s) {
                var date = new Date();
                if (d) {
                    d = $.trim(d);
                    if (d.length > 0) {
                        switch (p.format) {
                        case 'YYYY' + s + 'MM' + s + 'DD': case 'MM' + s + 'DD' + s + 'YYYY': case 'YYYY' + s + 'MM' + s + 'DD HH:MM:SS': case 'MM' + s + 'DD' + s + 'YYYY HH:MM:SS': date.setTime(Date.parse(d.replaceAll(s, '/')));
                            break;
                        case 'DD' + s + 'MM' + s + 'YYYY': case 'DD' + s + 'MM' + s + 'YYYY HH:MM:SS': d = d.split(s);
                            var _ = d[0];
                            d[0] = d[1];
                            d[1] = _;
                            date.setTime(Date.parse(d.join(s).replaceAll(s, '/')));
                            break;
                        case 'YYYY' + s + 'MM': d = d.split(s);
                            if (2 == d.length) {
                                date.setFullYear(d[0] - 0, 0, 1);
                                if ((d[0] - 0 >= 1970) && (d[0] - 0 <= 3000) && (d[1] - 0 <= 12) && (d[1] - 0 >= 1)) {
                                    date.setMonth(d[1] - 1, 1);
                                }
                            }
                            break;
                        }
                    } else {
                        tz(date);
                    }
                } else {
                    tz(date);
                }
                return date;
            };
            var rg = function(d, n, p, s, e) {
                if (s > 0 || e > 0) {
                    var d_ = new Date(d);
                    d_.setHours(0, 0, 0, 0);
                    d_.setDate(n);
                    d_ = d_.getTime();
                    if (s > 0 && e > 0) {
                        return s <= e ? d_ >= s && d_ <= e: false;
                    } else if (s > 0) {
                        return d_ >= s;
                    } else {
                        return d_ <= e;
                    }
                } else {
                    return true;
                }
            };
            var rf = function(d, c, t) {
                var tool = c.obj.data('tool'),
                p = t.data('cfg'),
                sp = p.separator,
                dd = c.obj.data('dd'),
                btn = $('span', c.obj.data('btns')),
                time = c.obj.data('time');
                c.obj.data('ym').empty().hide();

                var tol = $('td', tool).addClass('hand');
                $(tol[0]).unbind('click').click(function() {
                    d.setFullYear(d.getFullYear() - 1);
                    rf(d, c, t);
                });
                $(tol[1]).unbind('click').click(function() {
                    var da = d.getDate();
                    d.setMonth(d.getMonth() - 1, 1);
                    var lm = dc.calendar.md(d, d.getMonth());
                    d.setDate(da > lm ? lm: da);
                    rf(d, c, t);
                });
                $(tol[2]).text(d.getFullYear() + $.i18n('cal-year')).unbind('click').click(function() {
                    doym(c.obj, $(this).text().substr(0, 4), $(tol[3]).data('m'), vd(t[0].value, sp).getDate(), c, true);
                });
                $(tol[3]).data('m', (d.getMonth() + 1)).text($.i18n('cal-m' + (d.getMonth() + 1))).unbind('click').click(function() {
                    doym(c.obj, $(tol[2]).text().substr(0, 4), $(tol[3]).data('m'), vd(t[0].value, sp).getDate(), c, false);
                });
                $(tol[4]).unbind('click').click(function() {
                    var da = d.getDate();
                    d.setMonth(d.getMonth() + 1, 1);
                    var lm = dc.calendar.md(d, d.getMonth());
                    d.setDate(da > lm ? lm: da);
                    rf(d, c, t);
                });
                $(tol[5]).unbind('click').click(function() {
                    d.setFullYear(d.getFullYear() + 1);
                    rf(d, c, t);
                });

                var _d = new Date();
                _d.setFullYear(d.getFullYear(), d.getMonth(), 1);
                _d = _d.getDay();
                var _n = 1,
                rs, rsd, re, red, m = dc.calendar.md(d, d.getMonth()),
                curD,
                r = p.range,
                s = t.attr('begin'),
                sd = t.attr('beginDate'),
                e = t.attr('end'),
                ed = t.attr('endDate');
                rs = Math.max(r && r.begin ? pd($(r.begin).val(), sp, false) : 0, s ? pd($('#' + s).val(), sp, false) : 0);
                rsd = Math.max(r && r.beginDate ? pd(r.beginDate, sp, false) : 0, sd ? pd(sd, sp, false) : 0);
                re = Math.min(r && r.end ? pd($(r.end).val(), sp, true) : dcMAX, e ? pd($('#' + e).val(), sp, true) : dcMAX);
                red = Math.min(r && r.endDate ? pd(r.endDate, sp, true) : dcMAX, ed ? pd(ed, sp, true) : dcMAX);
                s = Math.max(rs, rsd);
                e = (re == dcMAX && red == dcMAX) ? 0 : Math.min(re, red);

                $.each(dd,
                function(i, o) {
                    o.removeData('num').data('num', i).removeClass().addClass('c6').text('').unbind('mouseenter mouseleave');
                    if (_d <= i && _n - 1 < m) {
                        if (_n == d.getDate()) {
                            t.data('datenow', i);
                        }
                        o.unbind('click').addClass('hand');
                        if (rg(d, _n, p, s, e)) {
                            o.click(function() {
                                d.setDate($(this).text());
                                curD.removeClass('datenow');
                                curD = $(this).addClass('datenow');
                                t.data('datenow', $(this).data('num'));
                                rd(d, c, t);
                            });
                        } else {
                            o.removeClass('c6').addClass('cc').removeClass('hand');
                        }
                        o.text(_n++).hover(function() {
                            if (!$(this).hasClass('datenow') && $(this).hasClass('c6')) {
                                $(this).addClass('datetmp');
                            }
                        },
                        function() {
                            if (!$(this).hasClass('datenow')) {
                                $(this).removeClass('datetmp');
                            }
                        });
                    } else {
                        o.removeClass('hand');
                    }
                });
                curD = dd[t.data('datenow')].addClass('datenow');
                $(btn[0]).unbind('click').removeClass();
                if (rg(new Date(), new Date().getDate(), p, s, e)) {
                    $(btn[0]).addClass('hand cB').click(function() {
                        rd(new Date(), c, t);
                    });
                } else {
                    $(btn[0]).addClass('cc');
                }
                $(btn[2]).unbind('click').click(function() {
                    t.val('');
                    c.close();
                });

                if (p.format.indexOf('HH:MM:SS') > -1) {
                    time.empty().append('<tr align = "center" class = "cB"><td><span>' + b0(d.getHours()) + '</span>' + $.i18n('cal-hour') + '</td><td>:</td><td><span>' + b0(d.getMinutes()) + '</span>' + $.i18n('cal-minute') + '</td><td>:</td><td><span>' + b0(d.getSeconds()) + '</span>' + $.i18n('cal-second') + '</td></tr>');
                    $('td:even', time).addClass('hand').each(function(m) {
                        $(this).unbind('click').click(function() {
                            dotm(m, $('span', time), d, c);
                        });
                    });
                }
            };
            var rd = function(d, c, t) {
                var s = [],
                ss = [],
                f = t.data('cfg').format,
                sp = t.data('cfg').separator;
                switch (f) {
                case 'MM' + sp + 'DD' + sp + 'YYYY': s.push(b0(d.getMonth() + 1));
                    s.push(b0(d.getDate()));
                    s.push(d.getFullYear());
                    t.val(s.join(sp));
                    break;
                case 'DD' + sp + 'MM' + sp + 'YYYY': s.push(b0(d.getDate()));
                    s.push(b0(d.getMonth() + 1));
                    s.push(d.getFullYear());
                    t.val(s.join(sp));
                    break;
                case 'YYYY' + sp + 'MM' + sp + 'DD': s.push(d.getFullYear());
                    s.push(b0(d.getMonth() + 1));
                    s.push(b0(d.getDate()));
                    t.val(s.join(sp));
                    break;
                case 'MM' + sp + 'DD' + sp + 'YYYY HH:MM:SS': s.push(b0(d.getMonth() + 1));
                    s.push(b0(d.getDate()));
                    s.push(d.getFullYear());
                    ss.push(b0(d.getHours()));
                    ss.push(b0(d.getMinutes()));
                    ss.push(b0(d.getSeconds()));
                    t.val(s.join(sp) + ' ' + ss.join(':'));
                    break;
                case 'DD' + sp + 'MM' + sp + 'YYYY HH:MM:SS': s.push(b0(d.getDate()));
                    s.push(b0(d.getMonth() + 1));
                    s.push(d.getFullYear());
                    ss.push(b0(d.getHours()));
                    ss.push(b0(d.getMinutes()));
                    ss.push(b0(d.getSeconds()));
                    t.val(s.join(sp) + ' ' + ss.join(':'));
                    break;
                case 'YYYY' + sp + 'MM' + sp + 'DD HH:MM:SS': s.push(d.getFullYear());
                    s.push(b0(d.getMonth() + 1));
                    s.push(b0(d.getDate()));
                    ss.push(b0(d.getHours()));
                    ss.push(b0(d.getMinutes()));
                    ss.push(b0(d.getSeconds()));
                    t.val(s.join(sp) + ' ' + ss.join(':'));
                    break;
                case 'YYYY' + sp + 'MM': s.push(d.getFullYear());
                    s.push(b0(d.getMonth() + 1));
                    t.val(s.join(sp));
                    break;
                }
                try { // 对于日期时间触发事件
                    var fun = $(t).attr('funName');
                    if (fun) {
                        eval("" + fun + "(t)");
                    }
                } catch(ex) {
                    null;
                }
                c.close();
            };
            var init = function(c) {
                var tar = c.obj.data('target'),
                pl = c.obj.removeClass('msg-bg').css({
                    backgroundColor: '#feffd6'
                });
                if (p.multi || $('table', pl).length < 1) {
                    pl.append('<table border = "0" cellspacing = "0" cellpadding = "0"><tr><td class = "datebg-top"><table border = "0" cellspacing = "0" cellpadding = "0" class = "date-w mg"></table><div class = "date mg"/>' + '<table width = "100%" border = "0" cellspacing = "0" cellpadding = "0" class = "date-w mg mT5"></table>' + '</td></tr><tr><td class = "datebg-bom">&nbsp;</td></tr></table><div class = "date_ym"/>');
                    var dw = [],
                    dd = [],
                    ym = $('.date_ym', pl),
                    cnt = $('.datebg-top', pl),
                    tool = $($('.date-w', cnt)[0]).append('<tr><td class = "dateico-1"></td><td class = "dateico-3"></td><td class = "tc cB"></td><td class = "tc cB"></td><td class = "dateico-4"></td><td class = "dateico-2"></td></tr>'),
                    date = $('.date', cnt).append('<table width = "100%" border = "0" cellspacing = "0" cellpadding = "0" class = "date_tab"></table>'),
                    time = $($('.date-w', cnt)[1]),
                    dt = $('.date_tab', date.css({
                        cursor: 'default'
                    })),
                    ds = [],
                    tol = $('td', tool);
                    for (var i = 1; i <= 6; i++) {
                        ds.push('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
                    }
                    ds.push('<tr><td></td><td></td><td colspan = "5"></td></tr>');
                    dt.append(ds.join(''));
                    $('td', dt).each(function(i) { (i < 7 ? dw: dd).push($(this));
                    });
                    dw[0].text($.i18n('cal-sun'));
                    dw[1].text($.i18n('cal-mon'));
                    dw[2].text($.i18n('cal-tue'));
                    dw[3].text($.i18n('cal-wed'));
                    dw[4].text($.i18n('cal-thu'));
                    dw[5].text($.i18n('cal-fri'));
                    dw[6].text($.i18n('cal-sat'));
                    dd[dd.length - 1].width(115).css({
                        textAlign: 'center'
                    }).append('<span class = "cB hand">&nbsp;' + $.i18n('cal-today') + '&nbsp;</span><span class="cB">' + $.i18n('cal-separator') + '</span><span class = "cB hand">&nbsp;' + $.i18n('cal-clean') + '&nbsp;</span>');
                    pl.data('ym', ym);
                    pl.data('tool', tool);
                    pl.data('time', time);
                    pl.data('dd', dd.splice(0, dd.length - 1));
                    pl.data('btns', dd[dd.length - 1]);
                }
                dc.panel.auto(tar.offset().top, tar.offset().left, tar.height(), tar.width(), pl, {
                    direction: p.direction
                });
                rf(vd(tar[0].value, tar.data('cfg').separator), c, tar);
            };
            var valid = function(c) {
                var t = c.obj.data('target');
                if (t.data('dateValid')) {
                    dc.valid.rule({
                        trim: true
                    },
                    t, t.attr('vtype'));
                }
            };
            $.each(p.obj ? [p.obj] : $('.inp-date'),
            function(i, o) {
                cld = $(o).dicPanel({
                    id: p.obj ? $.dicId() : 'dicCalendar',
                    direction: p.direction,
                    multi: p.multi,
                    showTime: p.showTime,
                    hideTime: p.hideTime,
                    spaceX: p.spaceX,
                    spaceY: p.spaceY,
                    event: 'focus',
                    opacity: p.opacity,
                    beforeShow: function() {
                        $(o).data('cfg', p);
                        cld.obj.data('target', $(o));
                        init(cld);
                    },
                    beforeClose: function() {
                        valid(cld);
                    }
                });
            });
        }
    },
    dc.combo = {
        opt: {
            editable: true,
            width: 0,
            height: 0,
            size: 9,
            scale: 2,
            ignoreCase: true,
            url: null,
            data: null,
            pick: function() {}
        },
        // [{category:'', icon:'', content:''}]
        load: function(c) {
            var timer, lock = false,
            opt = $.extend({},
            this.opt, c || {}),
            more = true;
            var filterData = function(c) {
                var reData = [];
                var data = c.obj.val();
                if (null == c.url) {
                    if (c.ignoreCase) {
                        $.each(c.data,
                        function(i, o) {
                            if (o.content.toUpperCase().indexOf(data.toUpperCase()) > -1) {
                                reData[reData.length] = {
                                    catagory: o.category,
                                    icon: o.icon,
                                    content: o.content
                                };
                            }
                        });
                    } else {
                        $.each(c.data,
                        function(i, o) {
                            if (o.content.indexOf(data) > -1) {
                                reData[reData.length] = {
                                    catagory: o.category,
                                    icon: o.icon,
                                    content: o.content
                                };
                            }
                        });
                    }
                } else {
                    try {

} catch(e) {
                        reData = [];
                    }
                }
                if (more && reData.length > c.size) {
                    var re = [];
                    for (var i = 0,
                    len = reData.length; i < len && i < c.size - 1; i++) {
                        re.push(reData[i]);
                    }
                    re.push({
                        catagory: '',
                        icon: '',
                        content: $.i18n('cbo-more') + '...'
                    });
                    return re;
                } else {
                    return reData;
                }
            };
            var fill = function(c, u) {
                $.each(filterData(c),
                function(i, o) {
                    u.append('<li>' + o.content + '</li>');
                });
                var lis = $('li', u);
                lis.each(function(i) {
                    $(this).css({
                        height: '16'
                    }).hover(function() {
                        u.data('cbr', i);
                        lis.css({
                            background: ''
                        });
                        $(this).css({
                            background: '#BCEBEF'
                        });
                    },
                    function() {
                        u.data('cbr', i);
                        $(this).css({
                            background: ''
                        });
                    }).click(function() {
                        if ($.i18n('cbo-more') + '...' == $(this).text()) {
                            more = false;
                            cclk(u, c);
                        } else {
                            c.obj.val($(this).text());
                            c.pick(c.obj);
                            lock = false;
                            cblur(u, c);
                        }
                    });
                });
                return lis.length;
            };
            var act = function(u, c, s) {
                return function() {
                    if (s) {
                        u.empty();
                        var n = fill(c, u);
                        if (n > 0) {
                            var lis = $('li', u);
                            u.addClass('msg-bg').stop(true, true).animate({
                                opacity: 0.8,
                                height: (c.height > 0 ? (c.height >= n * 16 ? n * 16 : c.height) : (n > c.size ? c.size: n) * 16)
                            },
                            {
                                duration: 250,
                                complete: function() {
                                    u.css({
                                        overflowX: 'hidden',
                                        overflowY: 'auto'
                                    });
                                    $($('li', u)[0]).css({
                                        background: '#BCEBEF'
                                    });
                                    u.data('cbr', 0);
                                    c.obj.unbind('keydown.combo').bind('keydown.combo',
                                    function(e) {
                                        if (13 == e.keyCode) {
                                            $($('li', u)[u.data('cbr')]).click();
                                        }
                                        if (38 == e.keyCode) {
                                            lis.css({
                                                background: ''
                                            });
                                            if (u.scrollTop() / 16 >= u.data('cbr')) {
                                                u.scrollTop((u.data('cbr') - 1 < 0) ? lis.length * 16 : (u.scrollTop() - 16));
                                            }
                                            u.data('cbr', u.data('cbr') - 1 < 0 ? n - 1 : u.data('cbr') - 1);
                                            $($('li', u)[u.data('cbr')]).css({
                                                background: '#BCEBEF'
                                            });
                                        }
                                        if (40 == e.keyCode) {
                                            lis.css({
                                                background: ''
                                            });
                                            if (u.data('cbr') >= (c.size - 1)) {
                                                u.scrollTop((u.data('cbr') + 1 > n - 1) ? 0 : (u.scrollTop() + 16));
                                            }
                                            u.data('cbr', u.data('cbr') + 1 > n - 1 ? 0 : u.data('cbr') + 1);
                                            $($('li', u)[u.data('cbr')]).css({
                                                background: '#BCEBEF'
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            u.stop(true, true).animate({
                                opacity: 0,
                                height: 0
                            },
                            {
                                duration: 250,
                                complete: function() {
                                    u.removeClass().css({
                                        overflowX: 'hidden',
                                        overflowY: 'auto'
                                    });
                                }
                            });
                        }
                    } else {
                        u.stop(true, true).animate({
                            opacity: 0,
                            height: 0
                        },
                        {
                            duration: 250,
                            complete: function() {
                                u.removeClass().css({
                                    overflowX: 'hidden',
                                    overflowY: 'auto'
                                });
                            }
                        });
                    }
                };
            };
            var cblur = function(u, c) {
                if (!lock) {
                    clearTimeout(timer);
                    timer = window.setTimeout(act(u, c, false), 100);
                }
            };
            var cclk = function(u, c) {
                clearTimeout(timer);
                timer = window.setTimeout(act(u, c, c.editable ? (c.obj.val().length >= c.scale) : true), 150);
            };
            if (!$('#dicCombo').length) {
                dcBd.append('<div id = "dicCombo" style = "position:absolute"/>');
            }
            var cb = $('#dicCombo').empty();
            cb.css({
                left: opt.obj.offset().left,
                top: opt.obj.offset().top + opt.obj.height() + 5,
                width: opt.width > 0 ? opt.width: opt.obj.width() + 4
            });
            cb.append('<ul/>').dicNoCopy();
            if (!opt.editable) {
                opt.obj.attr({
                    readOnly: true
                });
            }
            var ul = $($('ul', cb)[0]).css({
                position: 'relative',
                zIndex: $.dicZid(),
                overflowX: 'hidden',
                overflowY: 'auto',
                cursor: 'pointer',
                listStyle: 'none none outside',
                width: '100%',
                padding: 0,
                margin: 0,
                opacity: 0,
                height: 0
            }).scroll(function() {
                lock = true;
                opt.obj.focus();
            }).hover(function() {
                lock = true;
                opt.obj.focus();
            },
            function() {
                lock = false;
            });
            opt.obj.attr({
                autocomplete: 'off'
            }).unbind('mouseenter mouseleave').hover(function() {
                lock = true;
            },
            function() {
                lock = false;
            }).unbind('blur').blur(function() {
                cblur(ul, opt);
            }).unbind('click').click(function() {
                more = true;
                cclk(ul, opt);
            }).unbind('keyup').keyup(function(e) {
                if (13 == e.keyCode) {
                    more = false;
                }
                if ((37 > e.keyCode || 40 < e.keyCode) && 13 != e.keyCode) {
                    cclk(ul, opt);
                }
            });
            $.dicAddResize(function() {
                cb.css({
                    left: opt.obj.offset().left,
                    top: opt.obj.offset().top + opt.obj.height() + 5
                });
            });
        }
    },
    dc.cookie = function(n, v, c) {
        if (typeof v != 'undefined') {
            c = c || {};
            if (v === null) {
                v = '';
                c = $.extend({},
                c);
                c.expires = -1;
            }
            var exp = '';
            if (c.expires && (typeof c.expires == 'number' || c.expires.toUTCString)) {
                var date;
                if (typeof c.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (c.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = c.expires;
                }
                exp = '; expires=' + date.toUTCString();
            }
            var path = c.path ? '; path=' + (c.path) : '';
            var domain = c.domain ? '; domain=' + (c.domain) : '';
            var secure = c.secure ? '; secure': '';
            document.cookie = [n, '=', encodeURIComponent(v), exp, path, domain, secure].join('');
        } else {
            var ck = null;
            if (document.cookie && document.cookie != '') {
                var cks = document.cookie.split(';');
                for (var i = 0; i < cks.length; i++) {
                    var k = $.trim(cks[i]);
                    if (k.substring(0, n.length + 1) == (n + '=')) {
                        ck = decodeURIComponent(k.substring(n.length + 1));
                        break;
                    }
                }
            }
            return ck;
        }
    },
    dc.drager = {
        opt: {
            handle: '',
            clean: false
        },
        qq: [[], []],
        run: function(c) {
            var l, t, x, y, deo;
            var dg = dc.tool.qq(this.qq, this.opt, c);
            var opt = dg.data('cfg');
            if ('absolute' != dg.css('position')) {
                dg.css({
                    position: 'relative'
                });
            }
            var im = opt.obj.data('modal'),
            m = function(a, b, c, d, e, f) {
                return function() {
                    a = a < 0 ? 0 : (a > c ? c: a);
                    b = b < 0 ? 0 : (b > d ? d: (b <= e ? e: b));
                    dg.css({
                        left: a,
                        top: b
                    });
                    if (ie6) {
                        $('#' + opt.obj.attr('id') + 'Frm').css({
                            left: a,
                            top: b
                        });
                    }
                    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                };
            };
            $(document).bind('mousemove',
            function(e) {
                if (deo) {
                    if (opt.clean && !opt.cls) {
                        opt.cls = true;
                        $('#' + opt.obj.attr('id') + '_content', opt.obj).css({
                            visibility: 'hidden'
                        });
                    }
                    var c = opt.context;
                    var g = c ? (c.data('dragLeft') ? c.data('dragLeft') : 0) : 0;
                    var h = c ? (c.data('dragTop') ? c.data('dragTop') : 0) : 0;
                    setTimeout(m(e.clientX - x + l - g, e.clientY - y + t - h, (im ? (c ? c.width() : dicW) : (c ? c.width() : dicW_)) - opt.obj.width(), (im ? (c ? c.height() : dicH) : (c ? c.height() : dicH_)) + (c ? 0 : $(document).scrollTop()) - opt.obj.height(), c ? 0 : $(document).scrollTop(), 0), 10);
                }
            }).bind('mouseup',
            function() {
                deo = null;
                if (1 == $('#' + opt.obj.attr('id') + '_content > iframe', opt.obj).length) {
                    var blk = $('#' + opt.obj.attr('id') + '_content > div');
                    if (1 == blk.length) {
                        blk.removeAttr('style');
                    }
                }
                if (opt.clean) {
                    opt.cls = false;
                    $('#' + opt.obj.attr('id') + '_content', opt.obj).css({
                        visibility: 'visible'
                    });
                }
            });
            opt.obj.mousedown(function() {
                $(this).css({
                    zIndex: $.dicZid()
                });
                var ct = $('#' + $(this).attr('id') + '_content', $(this));
                if (1 == $('#' + $(this).attr('id') + '_content > iframe', $(this)).length) {
                    var blk = $('#' + $(this).attr('id') + '_content > div');
                    if (1 == blk.length) {
                        blk.css({
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: ct.width(),
                            height: ct.height(),
                            backgroundImage: 'url("' + dicPath + 'blank.png")'
                        });
                    }
                }
            }); ((opt.handle) ? opt.handle: opt.obj).mousedown(function(e) {
                if (1 == e.which) {
                    l = dg.offset().left;
                    t = dg.offset().top;
                    x = e.clientX;
                    y = e.clientY;
                    deo = this;
                }
            });
        }
    },
    dc.drawer = {
        opt: {},
        load: function(c) {
            c = $.extend({},
            this.opt, c || {});
            if (!$.isArray(c.target)) {
                c.target = [c.target];
            }
            $(c.src).addClass('hand').unbind('click.d').bind('click.d',
            function() {
                $.each(c.target,
                function(i, o) {
                    $(o).toggle();
                });
            });
        }
    },
    dc.id = {
        id: 100000000,
        cal: function() {
            this.id++;
        },
        get: function() {
            this.cal();
            return this.id;
        }
    },
    dc.lang = {
        regional: 'zh-cn',
        update: function() {
            var r = $.getCookie('tydic.i18n.lang.key');
            r = r ? r: (navigator.userLanguage ? navigator.userLanguage: navigator.language);
            r = r.toLowerCase().replaceAll('_', '-');
            dc.lang.regional = dc.lang.res[r] ? r: 'zh-cn';
        },
        res: {
            'zh-cn': {
                'box-t1': '\u6210\u529F\u63D0\u793A',
                'box-c1': '\u606D\u559C\u60A8\uFF01',
                'box-t2': '\u9519\u8BEF\u63D0\u793A',
                'box-c2': '\u5F88\u62B1\u6B49\uFF01',
                'box-t3': '\u8B66\u544A\u63D0\u793A',
                'box-c3': '\u8BF7\u6CE8\u610F\uFF1A',
                'box-t4': '\u786E\u8BA4\u63D0\u793A',
                'box-c4': '\u8BF7\u6CE8\u610F\uFF1A',
                'box-t5': '\ufeff\u67e5\u770b\u66f4\u591a\u4fe1\u606f',
                'box-t6': '\ufeff\u6536\u8d77',
                'box-b1': '\u5173\u95ED',
                'box-b2': '\u786E\u5B9A',
                'box-b3': '\u53D6\u6D88',
                'cal-m1': '1\u6708',
                'cal-m2': '2\u6708',
                'cal-m3': '3\u6708',
                'cal-m4': '4\u6708',
                'cal-m5': '5\u6708',
                'cal-m6': '6\u6708',
                'cal-m7': '7\u6708',
                'cal-m8': '8\u6708',
                'cal-m9': '9\u6708',
                'cal-m10': '10\u6708',
                'cal-m11': '11\u6708',
                'cal-m12': '12\u6708',
                'cal-hour': '\u65F6',
                'cal-minute': '\u5206',
                'cal-second': '\u79D2',
                'cal-year': '\u5E74',
                'cal-sun': '\u65E5',
                'cal-mon': '\u4E00',
                'cal-tue': '\u4E8C',
                'cal-wed': '\u4E09',
                'cal-thu': '\u56DB',
                'cal-fri': '\u4E94',
                'cal-sat': '\u516D',
                'cal-today': '\u4ECA\u5929',
                'cal-separator': '\uFE31',
                'cal-clean': '\u6E05\u9664',
                'cbo-more': '\u66F4\u591A',
                'grd-no': '\u6CA1\u6709\u627E\u5230\u7B26\u5408\u6761\u4EF6\u7684\u6570\u636E',
                'grd-pageout': '\u5206\u9875\u8D85\u65F6',
                'grd-select': '\u9009\u62E9',
                'grd-selall': '\u5168\u9009',
                'grd-revsel': '\u53CD\u9009',
                'grd-nosel': '\u4E0D\u9009',
                'grd-num': '\u7B2C',
                'grd-page': '\u9875',
                'grd-fir': '\u9996\u9875',
                'grd-pre': '\u4E0A\u4E00\u9875',
                'grd-nxt': '\u4E0B\u4E00\u9875',
                'grd-lst': '\u5C3E\u9875',
                'grd-total': '\u5171',
                'grd-data': '\u6761\u8BB0\u5F55',
                'grd-timeout': '\u8D85\u65F6\u6216\u65E0\u6CD5\u83B7\u53D6\u6570\u636E',
                'grd-prev': '\u524D',
                'grd-next': '\u540E',
                'grd-more': '\u66F4\u591A',
                'vld-special': '\u4E0D\u80FD\u5305\u542B\u4E0B\u5217\u5B57\u7B26',
                'vld-empty': '\u4E0D\u80FD\u4E3A\u7A7A',
                'vld-email': '\u90AE\u4EF6\u683C\u5F0F\u4E0D\u6B63\u786E',
                'vld-number': '\u5FC5\u987B\u662F\u6570\u5B57',
                'vld-pnumber': '\u5FC5\u987B\u662F\u6B63\u6574\u6570\u6216\u5E26\u4E8C\u4F4D\u7684\u6B63\u5C0F\u6570',
                'vld-integer': '\u5FC5\u987B\u662F\u6574\u6570',
                'vld-pinteger': '\u5FC5\u987B\u662F\u6B63\u6574\u6570',
                'vld-double': '\u5FC5\u987B\u662F\u5C0F\u6570',
                'vld-english': '\u5FC5\u987B\u662F\u82F1\u6587\u5B57\u6BCD',
                'vld-chinese': '\u5FC5\u987B\u662F\u6C49\u5B57',
                'vld-phone': '\u56FA\u8BDD\u53F7\u7801\u683C\u5F0F\u4E0D\u6B63\u786E',
                'vld-mobile': '\u624B\u673A\u53F7\u7801\u683C\u5F0F\u4E0D\u6B63\u786E',
                'vld-qq': '\u53F7\u7801\u683C\u5F0F\u4E0D\u6B63\u786E',
                'vld-zip': '\u90AE\u7F16\u683C\u5F0F\u4E0D\u6B63\u786E',
                'vld-hour': '\u5C0F\u65F6\u683C\u5F0F\u9519\u8BEF'
            }
        },
        i18n: function(s) {
            return this.res[this.regional][s];
        }
    },
    dc.menu = {
        opt: {
            style: 1,
            opacity: 1,
            layout: true,
            click: function() {}
        },
        qq: [[], []],
        load: function(c) {
            var menu = dc.tool.qq(this.qq, this.opt, c),
            id = menu.data('id'),
            opt = menu.data('cfg');
            if (opt.data.length > 0) {
                var cno = 0,
                l1 = [],
                m1,
                t1,
                t2,
                s;
                var mu1 = function(li, opt, s, id, mi) {
                    return function() {
                        var m = $('#' + id).empty(),
                        l2,
                        child;
                        if (li.data('menu').child && s) {
                            child = li.data('menu').child;
                            switch (opt.style - 0) {
                            case 2:
                                var lv2 = [];
                                $.each(child,
                                function(i, o) {
                                    o.child = null;
                                    if (2 == o.level) {
                                        l2 = o;
                                        lv2.push(o);
                                    } else if (2 != o.level) {
                                        if (!$.isArray(l2.child)) {
                                            l2.child = [];
                                        }
                                        l2.child[l2.child.length] = o;
                                    }
                                });
                                s = ['<ul>'];
                                $.each(lv2,
                                function(i, o) {
                                    s.push('<li ' + (o.child ? 'class = "submenu2-jiantou"': '') + '><a href = "' + (o.disable ? '#"': o.url + '" ' + (o.target ? ('target = "' + o.target + '"') : (o.open ? 'target = "_blank"': ''))) + '>' + o.name + '</a></li>');
                                });
                                s.push('</ul>');
                                m.append(s.join(''));
                                $('li', m).each(function(i) {
                                    if ($(this).hasClass('submenu2-jiantou')) {
                                        $(this).hover(function() {
                                            clearTimeout(t2);
                                            t2 = window.setTimeout(mu2(m, lv2[i].child, i, opt, id, true), 250);
                                        },
                                        function() {
                                            clearTimeout(t2);
                                            t2 = window.setTimeout(mu2(m, lv2[i].child, i, opt, id, false), 250);
                                        });
                                    }
                                });
                                $('a', m).each(function(i) {
                                    $(this).attr({
                                        title: $(this).text()
                                    }).css({
                                        width: 118,
                                        whiteSpace: 'nowrap',
                                        wordBreak: 'keep-all',
                                        overflowX: 'hidden',
                                        textOverflow: 'ellipsis',
                                        '-o-text-overflow': 'ellipsis'
                                    }).click(function() {
                                        if ('#' != $(this).attr('href')) {
                                            opt.click(lv2[i]);
                                        }
                                    });
                                });
                                m.css({
                                    height: 'auto'
                                });
                                if (li.offset().top + li.height() + (ie68 ? 5 : 1) + m.height() >= dicH) {
                                    m.css({
                                        height: dicH - li.offset().top - li.height() - (ie68 ? 5 : 1)
                                    });
                                }
                                m.css({
                                    top: li.offset().top + li.height() - 1,
                                    left: (m.width() + li.offset().left + 46 <= dicW) ? li.offset().left: (li.offset().left + li.width() - 20 - m.width() >= 0 ? li.offset().left + li.width() - 20 - m.width() : li.offset().left),
                                    display: '',
                                    opacity: 0
                                });
                                if (ie6) {
                                    $('#' + id + 'Frm').css({
                                        width: m.width() + 2,
                                        height: m.height() + 2,
                                        top: m.offset().top,
                                        left: m.offset().left
                                    });
                                }
                                break;
                            default:
                                var cl = child.length;
                                $.each(child,
                                function(i, o) {
                                    if (2 == o.level) {
                                        l2 = o.id;
                                        m.append('<h2><a t = "' + i + '" class = "cB tb" style = "cursor:default" href = "' + (o.disable ? '#"': o.url + '" ' + (o.target ? ('target = "' + o.target + '"') : (o.open ? 'target = "_blank"': ''))) + '>' + o.name + '</a></h2>');
                                        if (!child[i + 1] || (child[i + 1] && child[i + 1].pid != o.id)) {
                                            if (!$('#lv3' + l2 + id).length) {
                                                m.append('<div id = "lv3' + l2 + id + '" />');
                                            }
                                            $('#lv3' + l2 + id).append('<a t = "' + i + '"' + (o.id == m.data('cm') ? 'class = "cO" ': '') + 'href = "' + (o.disable ? '#"': o.url + '" ' + (o.target ? ('target = "' + o.target + '"') : (o.open ? 'target = "_blank"': ''))) + '>' + o.name + '</a>');
                                        }
                                    } else if (2 != o.level) {
                                        if (!$('#lv3' + l2 + id).length) {
                                            m.append('<div id = "lv3' + l2 + id + '" />');
                                        }
                                        $('#lv3' + l2 + id).append('<a t = "' + i + '"' + (o.id == m.data('cm') ? 'class = "cO" ': '') + 'href = "' + (o.disable ? '#"': o.url + '" ' + (o.target ? ('target = "' + o.target + '"') : (o.open ? 'target = "_blank"': ''))) + '>' + o.name + '</a>');
                                    }
                                });
                                $('a', m).each(function(i) {
                                    $(this).attr({
                                        title: $(this).text()
                                    }).css({
                                        padding: 0,
                                        background: 'none transparent scroll repeat 0% 0%',
                                        lineHeight: '22px',
                                        width: '100',
                                        'float': 'left',
                                        marginRight: '10px',
                                        whiteSpace: 'nowrap',
                                        textDecoration: 'none',
                                        wordBreak: 'keep-all',
                                        overflowX: 'hidden',
                                        textOverflow: 'ellipsis',
                                        '-o-text-overflow': 'ellipsis'
                                    }).click(function() {
                                        if ('#' != $(this).attr('href')) {
                                            $('a', m).removeClass('cO');
                                            $(this).addClass('cO');
                                            m.data('cm', child[this.t].id);
                                            $(m1).removeClass();
                                            $(m1[mi]).addClass('ex');
                                            opt.click(child[this.t]);
                                        }
                                    });
                                });
                                m.css({
                                    height: 'auto'
                                });
                                if (li.offset().top + li.height() + (ie68 ? 26 : 22) + m.height() >= dicH) {
                                    m.css({
                                        height: dicH - li.offset().top - li.height() - (ie68 ? 26 : 22)
                                    });
                                }
                                m.css({
                                    top: li.offset().top + li.height(),
                                    left: (m.width() + li.offset().left + 46 <= dicW) ? li.offset().left: (li.offset().left + li.width() - 20 - m.width() >= 0 ? li.offset().left + li.width() - 20 - m.width() : li.offset().left),
                                    display: '',
                                    opacity: 0
                                });
                                if (ie6) {
                                    $('#' + id + 'Frm').css({
                                        width: m.width() + 22,
                                        height: m.height() + 22,
                                        top: m.offset().top,
                                        left: m.offset().left
                                    });
                                }
                            }
                        }
                        sm(li.data('menu').child && s, opt, id, false)();
                    };
                };
                var mu2 = function(p, l, n, opt, d, s) {
                    return function() {
                        if (s) {
                            var _s = ['<ul>'],
                            m = $('#' + d + 'Sub').empty();
                            $.each(l,
                            function(i, o) {
                                _s.push('<li><a href = "' + (o.disable ? '#"': o.url + '" ' + (o.target ? ('target = "' + o.target + '"') : (o.open ? 'target = "_blank"': ''))) + '>' + o.name + '</a></li>');
                            });
                            _s.push('</ul>');
                            m.append(_s.join(''));
                            $('a', m).each(function(i) {
                                $(this).attr({
                                    title: $(this).text()
                                }).css({
                                    width: 118,
                                    whiteSpace: 'nowrap',
                                    wordBreak: 'keep-all',
                                    overflowX: 'hidden',
                                    textOverflow: 'ellipsis',
                                    '-o-text-overflow': 'ellipsis'
                                }).click(function() {
                                    if ('#' != $(this).attr('href')) {
                                        opt.click(l[i]);
                                    }
                                });
                            });
                            m.css({
                                top: p.offset().top + n * 24,
                                left: (m.width() + p.width() + p.offset().left <= dicW) ? p.width() + p.offset().left: (p.offset().left - m.width()),
                                display: '',
                                opacity: 0
                            });
                            if (ie6) {
                                $('#' + id + 'FrmSub').css({
                                    width: m.width() + 2,
                                    height: m.height() + 2,
                                    top: m.offset().top,
                                    left: m.offset().left
                                });
                            }
                        }
                        sm(s, opt, d, true)();
                    };
                };
                var sm = function(s, o, i, t) {
                    return function() {
                        if (ie6) {
                            $('#' + i + 'Frm').css({
                                display: s ? '': 'none'
                            });
                        }
                        if (!$('#' + i).data('mhover')) {
                            $('#' + i).stop(true, true).animate({
                                opacity: s ? o.opacity: 0
                            },
                            {
                                duration: t ? 0 : 250,
                                complete: function() {
                                    $('#' + i).css({
                                        display: s ? '': 'none'
                                    });
                                }
                            });
                        }
                        if (t) {
                            if (ie6) {
                                $('#' + i + 'Frm' + (t ? 'Sub': '')).css({
                                    display: s ? '': 'none'
                                });
                            }
                            $('#' + i + (t ? 'Sub': '')).stop(true, true).animate({
                                opacity: s ? o.opacity: 0
                            },
                            {
                                duration: 250,
                                complete: function() {
                                    $('#' + i + (t ? 'Sub': '')).css({
                                        display: s ? '': 'none'
                                    });
                                }
                            });
                        }
                    };
                };
                if (!$('#' + id).length) {
                    dcBd.append('<div id = "' + id + '" class = "submenu' + (opt.style) + '" style = "display:none"/>' + (ie6 ? '<iframe id = "' + id + 'Frm" scrolling = "no" frameborder = "0" class = "submenu" style = "position:absolute;display:none;width:0;height:0;z-index:' + $.dicZid() + '"/>': ''));
                    $('#' + id).css({
                        zIndex: $.dicZid()
                    }).hover(function() {
                        $(this).data('mhover', true);
                        clearTimeout(t1);
                        t1 = window.setTimeout(sm(true, opt, id, false), 250);
                    },
                    function() {
                        $(this).data('mhover', false);
                        clearTimeout(t1);
                        t1 = window.setTimeout(sm(false, opt, id, false), 250);
                    });
                    if (2 == opt.style - 0) {
                        dcBd.append('<div id = "' + id + 'Sub" class = "submenu2" style = "display:none"/>' + (ie6 ? '<iframe id = "' + id + 'FrmSub" scrolling = "no" frameborder = "0" class = "submenu" style = "position:absolute;display:none;width:0;height:0;z-index:' + $.dicZid() + '"/>': ''));
                        $('#' + id + 'Sub').css({
                            zIndex: $.dicZid()
                        }).hover(function() {
                            clearTimeout(t2);
                            t2 = window.setTimeout(sm(true, opt, id, true), 250);
                        },
                        function() {
                            clearTimeout(t2);
                            t2 = window.setTimeout(sm(false, opt, id, true), 250);
                        });
                    }
                }
                $.each(opt.data,
                function(i, o) {
                    if (1 == o.level) {
                        l1[l1.length] = o;
                    }
                    if (opt.data[cno].id != o.id && 1 != o.level) {
                        if (!$.isArray(opt.data[cno].child)) {
                            opt.data[cno].child = [];
                        }
                        opt.data[cno].child[opt.data[cno].child.length] = o;
                    } else {
                        cno = i;
                    }
                });
                s = ['<ul>'];
                $.each(l1,
                function(i, o) {
                    s.push('<li><a href = "' + (o.disable ? '#"': (o.url + '" ' + (o.target ? ('target = "' + o.target + '"') : (o.open ? 'target = "_blank"': '')))) + '>' + o.name + '</a></li>');
                });
                s.push('</ul>');
                opt.obj.removeClass().addClass('menu').append(s.join('')).dicScroll({
                    layout: opt.layout
                });
                m1 = $('li', opt.obj);
                m1.each(function(i) {
                    $(this).data('menu', l1[i]).hover(function() {
                        $(this).addClass('now');
                        clearTimeout(t1);
                        t1 = window.setTimeout(mu1($(this), opt, true, id, i), 250);
                    },
                    function() {
                        if (!$(this).hasClass('ex')) {
                            $(this).removeClass();
                        }
                        clearTimeout(t1);
                        t1 = window.setTimeout(mu1($(this), opt, false, id, i), 250);
                    }).click(function() {
                        if (true != l1[i].disable) {
                            $(m1).removeClass();
                            $(m1[i]).addClass('ex');
                            opt.click(l1[i]);
                        }
                    });
                });
            }
        }
    },
    dc.ddsel = {
        opt: {
            width: 150,
            height: 200,
            spaceX: 0,
            spaceY: 0,
            opacity: '0.9',
            event: 'hover',
            auto: true,
            clk: function() {}
        },
        qq: [[], []],
        load: function(c) {
            if (!this.qq[0][0]) {
                this.qq[0][0] = $.dicId() + 'dicDDsel';
            }
            var po = dc.tool.qq(this.qq, this.opt, c),
            opt = po.data('cfg'),
            id = this.qq[0][0],
            sa = $('#' + id + 'A'),
            sb = $('#' + id + 'B'),
            sc = $('#' + id + 'C'),
            sto = null;
            if (!sa[0]) {
                var frzid = $.dicZid(),
                ddzid = $.dicZid();
                sa = $.dicAdd(null, id + 'A').addClass('ui_ddl').hide().css({
                    position: 'absolute',
                    width: 0,
                    height: 'auto',
                    zIndex: ddzid
                });
                sb = $.dicAdd(null, id + 'B').addClass('ui_ddl').hide().css({
                    position: 'absolute',
                    width: 0,
                    height: 'auto',
                    zIndex: ddzid
                });
                sc = $.dicAdd(null, id + 'C').addClass('ui_ddl').hide().css({
                    position: 'absolute',
                    width: 0,
                    height: 'auto',
                    zIndex: ddzid
                });
                if (ie6) {
                    $('<iframe id = "' + id + 'A_Frm" scrolling = "no" frameborder = "0"></iframe>').appendTo(dcBd).css({
                        position: 'absolute',
                        opacity: opt.opacity,
                        width: 0,
                        height: 0,
                        zIndex: frzid
                    });
                    $('<iframe id = "' + id + 'B_Frm" scrolling = "no" frameborder = "0"></iframe>').appendTo(dcBd).css({
                        position: 'absolute',
                        opacity: opt.opacity,
                        width: 0,
                        height: 0,
                        zIndex: frzid
                    });
                    $('<iframe id = "' + id + 'C_Frm" scrolling = "no" frameborder = "0"></iframe>').appendTo(dcBd).css({
                        position: 'absolute',
                        opacity: opt.opacity,
                        width: 0,
                        height: 0,
                        zIndex: frzid
                    });
                }
            }
            var constr = function(lev, pid) {
                if (!pid) {
                    return false;
                }
                var d = opt.data,
                ar = [];
                $.each(d,
                function() {
                    if (this.level == lev && this.p == pid) {
                        var hs = false,
                        tid = this.id;
                        $.each(d,
                        function(i, n) {
                            if (n.p == tid) {
                                hs = true;
                                return;
                            }
                        });
                        ar.push('<div title="');
                        ar.push(this.text);
                        ar.push('" cid="' + tid + '" level="');
                        ar.push(this.level);
                        ar.push('">');
                        if (hs) {
                            ar.push('<img src="' + dicPath + 'menu-jiantou.gif" class="vm"/>');
                        } else {
                            ar.push('&nbsp;&nbsp;');
                        }
                        ar.push(this.text);
                        ar.push('</div>');
                    }
                });
                return ar.length ? ar.join('') : false;
            };
            var cclose = function() {
                var rsa = $('#' + id + 'A');
                if (!rsa.data('C')) {
                    $('#' + id + 'C').hide();
                    if (ie6) {
                        $('#' + id + 'C_Frm').css({
                            width: 0,
                            height: 0
                        });
                    }
                }
                if (!rsa.data('B')) {
                    $('#' + id + 'B').hide();
                    if (ie6) {
                        $('#' + id + 'B_Frm').css({
                            width: 0,
                            height: 0
                        });
                    }
                }
                if (!rsa.data('A') && !rsa.data('ON')) {
                    rsa.hide();
                    if (ie6) {
                        $('#' + id + 'A_Frm').css({
                            width: 0,
                            height: 0
                        });
                    }
                }
            };
            var bindE = function(who, tid, dir) {
                $('div', $('#' + who)).each(function() {
                    $(this).unbind('mouseover,mouseout').mouseover(function() {
                        var cur = $(this).addClass('ui_ddl_hover'),
                        i_id = cur.attr('cid'),
                        lev = cur.attr('level'),
                        m = $('#' + tid + 'A'),
                        a = false,
                        b = false,
                        c = false,
                        cL = false;
                        if (lev === '1') {
                            a = true;
                            cL = 'B';
                        } else if (lev === '2') {
                            a = b = true;
                            cL = 'C';
                        } else if (lev === '3') {
                            a = b = c = true;
                        }
                        if (cL) {
                            var mson = constr(lev - 0 + 1, i_id);
                            if (mson) {
                                cL === 'B' ? (b = true) : (cL === 'C' ? (c = true) : '');
                                var f_l = (dir === 'E') ? (cur.parent().offset().left + opt.width) : (cur.parent().offset().left - opt.width),
                                f_t = cur.offset().top;
                                $('#' + tid + cL).html(mson).show().css({
                                    'top': f_t,
                                    'left': f_l,
                                    'width': opt.width
                                });
                                if (ie6) {
                                    $('#' + id + cL + '_Frm').css({
                                        'width': opt.width,
                                        'height': $('#' + tid + cL).height(),
                                        'top': f_t,
                                        'left': f_l
                                    });
                                }
                                bindE(tid + cL, tid, dir);
                            }
                        }
                        m.data('C', c).data('B', b).data('A', a);
                        cclose();
                    }).mouseout(function() {
                        $(this).removeClass('ui_ddl_hover');
                    }).click(function() {
                        var tid = $(this).attr('cid');
                        $.each(opt.data,
                        function(i, n) {
                            if (this.id == tid) {
                                opt.clk.call(null, this);
                                return false;
                            }
                        })
                    });
                });
            };
            var miss = function() {
                sa.data('C', false).data('B', false).data('A', false).data('on', false);
                if (sto) {
                    clearTimeout(sto);
                }
                sto = setTimeout(cclose, 500);
            };
            sa.mouseout(miss);
            sb.mouseout(miss);
            sc.mouseout(miss);
            var tevent = opt.event && opt.event === 'click' ? 'click': 'mouseover';
            $('#' + opt.obj.attr('id')).unbind('mouseout').unbind(tevent).bind(tevent,
            function() {
                sa.data('A', true).data('ON', true).show().html(constr('1', '0'));
                var of = $(this).offset(),
                oft = of.top,
                ofl = of.left,
                sw = $(this).width(),
                dw = $(document.documentElement).width(),
                tdir = 'E';
                if (2 * ofl + sw > dw) {
                    sa.css({
                        'top': oft,
                        'left': ofl - opt.width,
                        'width': opt.width
                    }).data('DIR', 'W');
                    tdir = 'W';
                } else {
                    sa.css({
                        'top': oft,
                        'left': ofl + sw + 10,
                        'width': opt.width
                    }).data('DIR', 'E');
                }
                bindE(id + 'A', id, tdir);
                if (ie6) {
                    $('#' + id + 'A_Frm').css({
                        'width': opt.width,
                        'height': sa.height(),
                        'top': oft,
                        'left': ((tdir === 'E' ? (ofl + sw + 10) : (ofl - opt.width)))
                    });
                }
            }).bind('mouseout',
            function() {
                sa.data('A', false).data('ON', false);
                if (sto) {
                    clearTimeout(sto);
                }
                sto = setTimeout(cclose, 500);
            });
        }
    },
    dc.panel = {
        opt: {
            direction: 'e',
            spaceX: 0,
            spaceY: 0,
            opacity: '0.9',
            showTime: 250,
            hideTime: 500,
            multi: true,
            event: 'hover',
            auto: true,
            beforeShow: function() {},
            beforeClose: function() {},
            afterShow: function() {},
            afterClose: function() {}
        },
        qq: [[], []],
        load: function(c) {
            var po = dc.tool.qq(this.qq, this.opt, c),
            opt = po.data('cfg'),
            id = opt.multi ? opt.obj.attr('id') + 'Panel': (opt.id ? opt.id: 'dicPanel'),
            p,
            ip = ($('#' + id).length) ? true: false;
            if (!ip) {
                p = $.dicAdd(opt.context, id).css({
                    position: 'absolute',
                    overflow:'auto',
                    opacity: 0
                });
                p.dicNoCopy();
                if (ie6) {
                    $('<iframe id = "' + id + 'Frm" scrolling = "no" frameborder = "0"></iframe>').appendTo(opt.context ? opt.context: dcBd).css({
                        position: 'absolute',
                        opacity: opt.opacity,
                        width: 0,
                        height: 0,
                        zIndex: $.dicZid()
                    });
                }
            }
            p = $('#' + id).addClass('msg-bg').hide();
            if (opt.width) {
                p.width(opt.width);
            }
            if (opt.height) {
                p.height(opt.height);
            }
            switch (opt.event) {
            case 'focus':
                opt.obj.unbind('focus.p blur.p').bind('focus.p',
                function() {
                    opt.obj.data('focus', 't');
                    dc.panel.run(opt, p, id, true);
                }).bind('blur.p',
                function() {
                    opt.obj.data('focus', 'f');
                    if ('i' != opt.obj.data('mouse')) {
                        dc.panel.run(opt, p, id, false);
                    }
                });
                break;
            default:
            case 'click':
                opt.obj.unbind(('hover' == opt.event ? 'mouseenter': 'click') + '.p mouseleave.p mouseover.p').bind(('hover' == opt.event ? 'mouseenter': 'click') + '.p',
                function() {
                    opt.obj.data('mouse', 'i');
                    dc.panel.run(opt, p, id, true);
                }).bind('mouseleave.p',
                function() {
                    opt.obj.data('mouse', 'o');
                    dc.panel.run(opt, p, id, false);
                }).bind('mouseover.p',
                function() {
                    opt.obj.data('mouse', 'i');
                });
                break;
            }
            return {
                obj: p,
                html: function(o) {
                    p.html(o);
                },
                append: function(o) {
                    p.append(o);
                },
                page: function(o) {
                    this.clean();
                    p.css('padding', 0).html('<iframe width=' + opt.width + ' height=' + opt.height + '  src="' + o + '" scrolling = "yes" frameborder = "0"></iframe>');
                },
                clean: function() {
                    p.empty();
                },
                close: function() {
                    opt.beforeClose();
                    p.stop(true, false).stop().animate({
                        opacity: 0
                    },
                    {
                        duration: opt.hideTime,
                        complete: function() {
                            p.hide();
                            if (ie6) {
                                $('#' + id + 'Frm').css({
                                    width: 0,
                                    height: 0,
                                    left: 0,
                                    top: 0
                                });
                            }
                            opt.afterClose();
                        }
                    });
                }
            };
        },
        auto: function(t, l, h, w, p, o) {
            if (t + 12 + p.height() + ('s' == o.direction ? h: 0) > $(document).scrollTop() + dicH) {
                p.css({
                    top: t - (t + p.height() + 12 - $(document).scrollTop() - dicH) + (o.spaceY ? o.spaceY: 0)
                });
            }
            if (l + 16 + p.width() + ('e' == o.direction ? w: 0) > $(document).scrollLeft() + dicW) {
                p.css({
                    left: l - (l + p.width() + 16 - $(document).scrollLeft() - dicW) + (o.spaceX ? o.spaceX: 0)
                });
            }
        },
        run: function(c, p, d, s) {
            if (s) {
                p.css({
                    zIndex: $.dicZid()
                }).unbind('mouseenter.p mouseleave.p mouseover.p').bind('mouseenter.p',
                function() {
                    c.obj.data('mouse', 'i');
                    p.stop(true, false).stop().css({
                        opacity: c.opacity
                    });
                }).bind('mouseleave.p',
                function() {
                    c.obj.data('mouse', 'o');
                    if ('focus' != c.event || 'f' == c.obj.data('focus')) {
                        c.beforeClose();
                        p.stop(true, false).stop().animate({
                            opacity: 0
                        },
                        {
                            duration: c.hideTime,
                            complete: function() {
                                p.hide();
                                if (ie6) {
                                    $('#' + d + 'Frm').css({
                                        width: 0,
                                        height: 0,
                                        left: 0,
                                        top: 0
                                    });
                                }
                                c.afterClose();
                            }
                        });
                    }
                }).bind('mouseover.p',
                function() {
                    c.obj.data('mouse', 'i');
                });
                var l = c.obj.offset().left;
                var t = c.obj.offset().top;
                if (c.content) {
                    p.html(c.content);
                }
                switch (c.direction) {
                case 'n':
                    p.css({
                        left:
                        l + c.spaceX,
                        top: t + c.spaceY - 9 - p.height()
                    });
                    break;
                case 's':
                    p.css({
                        left:
                        l + c.spaceX,
                        top: t + c.spaceY + 4 + c.obj.height()
                    });
                    break;
                case 'w':
                    p.css({
                        left:
                        l + c.spaceX - p.width() - 13,
                        top: t + c.spaceY
                    });
                    break;
                case 'e':
                    p.css({
                        left:
                        l + c.spaceX + c.obj.width() + 4,
                        top: t + c.spaceY
                    });
                    break;
                case 'c':
                    p.css({
                        left:
                        l - (p.width() - c.obj.width() + 10) / 2 + c.spaceX,
                        top: t - (p.height() - c.obj.height() + 6) / 2 + c.spaceY
                    });
                    break;
                }
                dc.panel.auto(t, l, c.obj.height(), c.obj.width(), p, c);
                c.beforeShow();
                if (ie6) {
                    $('#' + d + 'Frm').css({
                        width: p.width() + (p.hasClass('msg-bg') ? 12 : 0),
                        height: p.height() + (p.hasClass('msg-bg') ? 8 : 0),
                        left: p.css('left'),
                        top: p.css('top')
                    });
                }
                p.show().stop(true, false).stop().animate({
                    opacity: c.opacity
                },
                {
                    duration: c.showTime,
                    complete: function() {
                        c.afterShow();
                    }
                });
            } else {
                c.beforeClose();
                p.stop(true, false).stop().animate({
                    opacity: 0
                },
                {
                    duration: c.hideTime,
                    complete: function() {
                        p.hide();
                        if (ie6) {
                            $('#' + d + 'Frm').css({
                                width: 0,
                                height: 0,
                                left: 0,
                                top: 0
                            });
                        }
                        c.afterClose();
                    }
                });
            }
        }
    },
    dc.progress = {
        opt: {
            style: 0,
            text: '',
            percent: false,
            waitTime: 5,
            breakTime: function() {}
        },
        qq: [[], []],
        load: function(c) {
            c = $.extend({},
            c);
            c.obj = $({});
            var b, pg, pt, per, bar, po = dc.tool.qq(this.qq, this.opt, c),
            id = po.data('id'),
            opt = po.data('cfg');
            b = opt.context ? dc.blocker.load({
                context: opt.context
            }) : dc.blocker.load({});
            b.cnt.append('<div id = "dic' + id + '"/>').data('auto', 2);
            pg = $('#dic' + id).attr('align', 'center').css({
                position: 'absolute',
                width: b.cnt.width() / 2,
                height: '22',
                left: b.cnt.width() / 4,
                top: (b.cnt.height() - 22) / 2
            });
            pg.css({
                background: 'url(' + dicPath + (0 == opt.style ? 'loading.gif': 'pregress_bg.png') + ')'
            });
            pg.append('<span/>&nbsp;<span id = "dic' + id + 'Perc"/><div id = "dic' + id + 'Bar"/>');
            $('span', pg).each(function(i) {
                if (0 == i) {
                    $(this).css({
                        zIndex: $.dicZid()
                    }).html(opt.text);
                } else {
                    $(this).css({
                        zIndex: $.dicZid()
                    }).html((1 == opt.style) ? (opt.percent ? '0%': '') : '');
                }
                $(this).css({
                    position: 'relative',
                    top: (pg.height() - $(this).height()) / 2
                });
            });
            per = $('#dic' + id + 'Perc', pg);
            bar = $('#dic' + id + 'Bar', pg).css({
                position: 'absolute',
                top: 0,
                left: 0,
                height: '22',
                background: 'url(' + dicPath + 'loading.gif)'
            });
            var breakFun = function() {
                opt.breakTime();
                clearTimeout(pt);
                b.close();
            };
            if (0 == opt.style && opt.waitTime > 0) {
                pt = setTimeout(breakFun, opt.waitTime * 1000);
            }
            return {
                update: function(i) {
                    if (1 == opt.style) {
                        if (i >= 100) {
                            bar.css({
                                width: pg.width()
                            });
                            clearTimeout(pt);
                            this.close();
                        } else {
                            i = i < 1 ? 0 : i;
                            if (opt.percent) {
                                per.html(i + '%');
                            }
                            bar.stop(true, true).animate({
                                width: pg.width() * i / 100
                            },
                            {
                                duration: 200
                            });
                        }
                    }
                },
                close: function() {
                    clearTimeout(pt);
                    b.close();
                }
            };
        }
    },
    dc.scroll = {
        opt: {
            speed: 2,
            layout: true
        },
        qq: [[], []],
        load: function(c) {
            var a, l, r, t, w, h, so = dc.tool.qq(this.qq, this.opt, c),
            id = 'dic' + so.data('id'),
            p = so.data('cfg'),
            ex = ($('#' + id).length) ? true: false;
            if (!ex) {
                p.obj.css({
                    position: 'relative'
                }).wrap('<div id = "' + id + '"><div id = "' + id + 'Area"/></div>');
            }
            t = $('#' + id).css({
                position: 'relative',
                overflow: 'hidden'
            }).width(0);
            if (ex) {
                l = $('#' + id + 'l');
                r = $('#' + id + 'r');
            } else {
                l = $.dicAdd(t).attr('id', id + 'l').css({
                    position: 'absolute',
                    display: 'none'
                }).addClass('jiantou3');
                r = $.dicAdd(t).attr('id', id + 'r').css({
                    position: 'absolute',
                    display: 'none'
                }).addClass('jiantou2');
            }
            a = $('#' + id + 'Area');
            if (p.realWidth) {
                w = p.realWidth;
            } else {
                a.width(32767);
                w = so.width();
            }
            h = p.realHeight ? p.realHeight: so.height();
            l.css({
                top: Math.abs(h - l.height()) / 2.0
            });
            r.css({
                top: Math.abs(h - r.height()) / 2.0
            });
            t.removeAttr('style').css({
                position: 'relative',
                zoom: 1
            });
            a.removeAttr('style').css({
                position: 'relative',
                overflow: 'hidden'
            });
            $.dicAddResize(function() {
                dc.scroll.run(p, a, l, r, w);
            });
            this.run(p, a, l, r, w);
        },
        run: function(c, a, l, r, w) {
            c.obj.width(w);
            var k = c.width ? c.width: dicW - (ie6 ? ('no' == dcBd.attr('scroll') ? 0 : 20) : 0);
            if (isNaN(k)) {
                k = dicW * k.substr(0, k.length - 1) / 100;
            }
            k -= ie8 ? 4 : 0;
            if (c.obj.width() > k) {
                if (k - l.width() - r.width() > 0) {
                    a.css({
                        width: k - l.width() - r.width(),
                        left: c.layout ? 0 : l.width()
                    });
                    l.css({
                        left: c.layout ? a.width() : 0,
                        display: ''
                    });
                    r.css({
                        left: a.width() + l.width(),
                        display: ''
                    });
                    if (c.obj.offset().left + c.obj.width() - (c.layout ? l: r).offset().left > 0) {
                        r.removeClass().addClass('jiantou2');
                    }
                    var t, ofl = a.width() + (c.layout ? 0 : 24) - w + Math.abs(c.obj.offset().left) - (ie8 ? 2 : 0);
                    if (ofl > 0) {
                        c.obj.stop(true, true).animate({
                            left: '+=' + ofl
                        },
                        {
                            duration: 0
                        });
                    }
                    var rock = function(lf, o, l, r) {
                        return function() {
                            if (lf && o.offset().left + o.width() - (c.layout ? l: r).offset().left <= 0) {
                                l.removeClass().addClass('jiantou1');
                                r.removeClass().addClass('jiantou4');
                                window.clearInterval(t);
                            } else if (!lf && o.offset().left - (c.layout ? 0 : l.offset().left + l.width()) >= 0) {
                                l.removeClass().addClass('jiantou3');
                                r.removeClass().addClass('jiantou2');
                                window.clearInterval(t);
                            } else {
                                l.removeClass().addClass('jiantou1');
                                r.removeClass().addClass('jiantou2');
                                o.stop(true, true).animate({
                                    left: (lf ? '-': '+') + '=2'
                                },
                                {
                                    duration: 0
                                });
                            }
                        };
                    };
                    l.unbind('mouseenter mouseleave').hover(function() {
                        t = window.setInterval(rock(false, c.obj, l, r), c.speed);
                    },
                    function() {
                        window.clearInterval(t);
                    });
                    r.unbind('mouseenter mouseleave').hover(function() {
                        t = window.setInterval(rock(true, c.obj, l, r), c.speed);
                    },
                    function() {
                        window.clearInterval(t);
                    });
                } else {
                    l.css({
                        left: c.layout ? a.width() : 0,
                        display: ''
                    });
                    a.css({
                        width: 0,
                        left: c.layout ? 0 : l.width()
                    });
                    r.css({
                        left: l.width(),
                        display: ''
                    });
                }
            } else {
                l.css({
                    display: 'none'
                });
                a.css({
                    width: w,
                    left: 0
                });
                c.obj.css({
                    width: w,
                    left: 0
                });
                r.css({
                    display: 'none'
                });
            }
        }
    },
    dc.sizer = {
        qq: [],
        add: function(os) {
            if ($.isArray(os)) {
                $.each(os,
                function(i, o) {
                    dc.sizer.qq.push(o);
                });
            } else {
                dc.sizer.qq.push(os);
            }
        },
        before: function() {},
        run: function() {
            dc.tool.sizing();
            dc.sizer.before();
            $.each(dc.sizer.qq,
            function(i, f) {
                f();
            });
            dc.sizer.after();
            clearTimeout(dcT);
        },
        after: function() {}
    },
    dc.tips = {
        opt: {
            title: '',
            direction: 'e',
            spaceX: 0,
            spaceY: 0,
            opacity: '0.8',
            showTime: 500,
            hideTime: 1000,
            event: 'hover'
        },
        load: function(c) {
            if (c.title && c.title.length > 0) {
                c.obj.attr('title', c.title);
            }
            if (c.obj.attr('title')) {
                var p = $.extend({},
                this.opt, c || {});
                var t = p.obj.attr('title');
                p.obj.removeAttr('title');
                p.obj.dicPanel({
                    id: 'dicTips',
                    direction: p.direction,
                    spaceX: p.spaceX,
                    spaceY: p.spaceY,
                    width: p.width,
                    height: p.height,
                    opacity: p.opacity,
                    showTime: p.showTime,
                    hideTime: p.hideTime,
                    multi: false,
                    clazz: 'msg-bg',
                    content: '<div style = "margin:10px"><img class = "msg-bg200" src = "' + dicPath + 'space.gif"/>' + t + '</div>',
                    event: p.event
                });
            }
        }
    },
    dc.tab = {
        opt: {
            /* width : -1,height : -1, */
            position: 'top',
            closeable: false,
            asyn: false,
            layout: true,
            showNum: 0,
            data: [],
            beforeClick: function() {},
            click: function() {}
        },
        qq: [[], []],
        load: function(c) {
            var oTab = dc.tool.qq(this.qq, this.opt, c);
            var isV, tab, tabs, area, id = oTab.data('id'),
            opt = oTab.data('cfg'),
            tabLi = [],
            tabArr = [],
            areaArr = [],
            areaCnt = [],
            url = [],
            tl = [],
            t_open = (opt.event && opt.event == 'hover' ? 'mouseover': 'click');
            var close = function(i) { 
                var cur = $(tabArr[i]).data('oid');
                $(tabArr[i]).remove();
                tabArr = $('li', tab);
                if (!areaArr[i]) return; 
                areaArr[i].remove();
                areaArr.splice(i, 1);
                $.each(tabArr,
                function(k, u) {
                    if ($(u).data('oid') && $(u).data('oid') > cur) {
                        $(u).data('oid', $(u).data('oid') - 1);
                    }
                });
                var tt = $({}).data('oid', -1);
                $.each(tabArr,
                function(j, t) {
                    if (null != $(t).data('oid')) {
                        tt = $(t).data('oid') > tt.data('oid') ? $(t) : tt;
                    }

                    $(t).unbind(t_open).bind(t_open,
                    function() {
                        tabClk(j, t);
                    });
                });
                tw -= 108;
                closeFun();
                tab.dicScroll({
                    realWidth: tw,
                    realHeight: 24,
                    layout: opt.layout
                });
                tt.click();
                return false;
            };
            var closeFun = function() {
                $('li>a>span', tab).each(function(i) {
                    $('img', $(this)).click(function() {
                        close(i);
                    });
                });
            };
            var tabClk = function(i, t) {
                opt.obj.data('curTab', i);
                opt.beforeClick(i, tl[i]);
                if (isV) {
                    $('li', tab).removeClass();
                    $(t).removeClass().addClass('now');
                } else {
                    $('li', tab).css({
                        background: 'url(' + dicPath + 'tab007.gif) no-repeat 4px 0px'
                    });
                    $(t).css({
                        background: 'url(' + dicPath + 'tab008.gif) no-repeat 4px 0px'
                    });
                }
                $.each(areaArr,
                function(j, a) {
                    a.hide();
                });
                var cur = $(t).data('oid');
                $.each(tabArr,
                function(k, u) {
                    if ($(u).data('oid') > cur) {
                        $(u).data('oid', $(u).data('oid') - 1);
                    }
                });
                $(t).data('oid', tabArr.length - 1);
                areaArr[i].css({
                    display: ''
                });
                if (areaArr[i].data('url')) {
                    areaArr[i].append(areaArr[i].data('url')).removeData('url');
                }
                opt.click(i, tl[i]);
            };
            var getTab = function(t) {
                for (var i = 0; i < tabArr.length; i++) {
                    if (t == $(tabArr[i]).text()) {
                        return $(tabArr[i]);
                    }
                }
            };
            var getArea = function(t) {
                for (var i = 0; i < areaArr.length; i++) {
                    if (t == areaArr[i].data('title')) {
                        return areaArr[i];
                    }
                }
            };
            /*
					 * if (opt.width > 0) { opt.obj.width(opt.width); } if
					 * (opt.height > 0) { opt.obj.height(opt.height); }
					 */
            isV = 'top' == opt.position || 'bottom' == opt.position;
            switch (opt.position) {
            case 'bottom':
                area = $.dicAdd(opt.obj).css({
                    overflow: 'hidden',
                    clear: 'both'
                });
                tabs = $.dicAdd(opt.obj).addClass('tabs2 mT5 clear').append('<ul><div/></ul>');
                break;
            case 'left':
                tabs = $.dicAdd(opt.obj).addClass('tabs3 mT5 clear').append('<ul></ul>');
                area = $.dicAdd(opt.obj).css({
                    position: 'relative',
                    overflow: 'hidden',
                    clear: 'both'
                });
                break;
            case 'right':
                area = $.dicAdd(opt.obj).css({
                    position: 'relative',
                    'float': 'left',
                    clear: 'both',
                    marginRight: '24px'
                });
                tabs = $.dicAdd(opt.obj).addClass('tabs4').append('<ul></ul>');
                break;
            default:
                tabs = $.dicAdd(opt.obj).addClass('tabs1 mT5 clear').append('<ul><div/></ul>');
                area = $.dicAdd(opt.obj).css({
                    position: 'relative',
                    overflow: 'hidden',
                    clear: 'both'
                });
            }
            tab = $(isV ? 'ul>div': 'ul', tabs);
            var _clsable;
            $.each(opt.data,
            function(i, t) {
                tl[i] = t.title;
                _clsable = undefined != t.closeable ? t.closeable: opt.closeable;
                tabLi[i] = '<li title = "' + t.title + '"><a><span>' + t.title + (_clsable ? '<img src = "' + dicPath + ('top' == opt.position ? 'close2': 'ico-close') + '.gif"/>': '') + '</span></a></li>';
                areaCnt[i] = $.dicAdd(area);
                url[i] = '<iframe src = "' + t.url + '" width = "' + (isV ? '100%': (ie6 ? '100%': opt.obj.width() - 24)) + '" height = "' + (t.height ? t.height: 'auto') + '"  frameborder = "0"></iframe>';
            });
            $.each(opt.data,
            function(i, t) {
                tab.append(tabLi[i]);
                areaArr[areaArr.length] = areaCnt[i].css({
                    display: 'none'
                }).data('title', t.title);
                if (t.content) {
                    areaArr[i].append(t.content);
                } else if (opt.asyn) {
                    areaArr[i].data('ud', true).data('url', url[i]);
                } else {
                    areaArr[i].data('ud', true).append(url[i]);
                }
            });
            var tw = 0;
            tabArr = $('li', tab);
            $.each(tabArr,
            function(i, t) {
                $(t).data('oid', tabArr.length - 1 - i).bind(t_open,
                function() {
                    tabClk(i, t);
                });
                tw += 108;
            });
            closeFun();

            if (isV) {
                tab.dicScroll({
                    realWidth: tw,
                    realHeight: 24,
                    layout: opt.layout
                });
            }

            $(tabArr[opt.showNum]).click();
            return {
                repTitle: function(x, name) {
                    if ('number' == typeof(x)) {
                        areaArr[x].data('title', name);
                        $(tabArr[x]).attr("title", name);
                        $(tabArr[x]).find("span").text(name);
                    } else for (var i = 0; i < areaArr.length; i++) {
                        if (x == areaArr[i].data('title')) {
                            areaArr[i].data('title', name);
                            $(tabArr[i]).attr("title", name);
                            $(tabArr[i]).find("span").text(name);
                            break;
                        }
                    }

                },
                get: function(x) {
                    if ('number' == typeof(x)) {
                        return areaArr[x] ? (areaArr[x].data('ud') ? $('iframe', areaArr[x])[0].contentWindow: areaArr[x]) : undefined;
                    } else {
                        var a = getArea(x);
                        return a ? (a.data('ud') ? $('iframe', a)[0].contentWindow: a) : undefined;
                    }
                },
                resetH: function(h) {
                    for (var i = 0; i < areaArr.length; i++) {
                        if (areaArr[i].data('ud') && $('iframe', areaArr[i])[0]) {
                            $('iframe', $(areaArr[i])).css('height', h);
                        }
                    }
                },
                add: function(t) {
                    var _clsable = undefined != t.closeable ? t.closeable: opt.closeable;
                    tab.append('<li title = "' + t.title + '"><a><span>' + t.title + (_clsable ? '<img src = "' + dicPath + ('top' == opt.position ? 'close2': 'ico-close') + '.gif"/>': '') + '</span></a></li>');
                    areaArr[areaArr.length] = $.dicAdd(area).css({
                        display: 'none'
                    }).data('title', t.title);
                    if (t.content) {
                        areaArr[areaArr.length - 1].append(t.content);
                    } else {
                        var url = '<iframe src = "' + t.url + '" width = "100%" height = "' + (t.height ? t.height: 'auto') + '"  frameborder = "0"></iframe>';
                        if (opt.asyn) {
                            areaArr[areaArr.length - 1].data('url', url).data('ud', true);
                        } else {
                            areaArr[areaArr.length - 1].append(url).data('ud', true);
                        }
                    }
                    tabArr = $('li', tab);
                    closeFun();
                    tabArr.each(function(i, o) {
                        $(o).data('oid', $(o).data('oid') - -1);
                        if (i == tabArr.length - 1) {
                            $(o).data('oid', 0).bind(t_open,
                            function() {
                                tabClk(i, o);
                            });
                        }
                    });
                    tw += 108;
                    tab.dicScroll({
                        realWidth: tw,
                        realHeight: 24,
                        layout: opt.layout
                    });
                    this.show(tabArr.length - 1);
                },
                show: function(x) {
                    if ('number' == typeof(x)) {
                        if (opt.event && opt.event == 'hover') {
                            $(tabArr[x]).mouseover();
                        } else {
                            $(tabArr[x]).click();
                        }
                    } else {
                        if (opt.event && opt.event == 'hover') {
                            getTab(x).mouseover();
                        } else {
                            getTab(x).click();
                        }
                    }
                },
                showTab: function(x) {
                    $(tabArr[x]).click();
                },
                close: function(x) {
                    if ('string' == typeof(x)) {
                        for (var i = 0; i < areaArr.length; i++) {
                            if (x == areaArr[i].data('title')) {
                                x = i;
                                break;
                            }
                        }
                    }
                    close(x);
                },
                getCurTabNum: function() {
                    return opt.obj.data('curTab');
                },
                url: function(x, u) {
                    if ('number' == typeof(x)) {
                        $('iframe', $(areaArr[x]))[0].src = u;
                    } else {
                        $('iframe', $(getArea(x)))[0].src = u;
                    }
                }
            };
        }
    },
    dc.table = {
        opt: {
            head: [],
            pageSize: '10,20',
            size: 10,
            model: 0,
            progress: true,
            initParam: {},
            waitTime: 60,
            leftWidth: '1px', 
            pageCount: false,
            freeze: false,
            check: function() {},
            selAll: function() {},
            selRev: function() {},
            selCal: function() {},
            load: function() {}
        },
        qq: [[], []],
        recov: function(c, b) {
            if (b || 0 != c.model) {
                c.obj.data('hsort').css({
                    background: 'url(' + dicPath + 'sort.gif) no-repeat 10px center'
                }).data('order', 'sort');
            }
        },
        load: function(c) {
            this.opt.noResult = $.i18n('grd-no');
            var head, lhead, body, page, chk, chk_ = false,
            aod, ram = Math.random(),
            oTab = dc.tool.qq(this.qq, this.opt, c),
            id = oTab.data('id'),
            opt = oTab.data('cfg');
            opt.obj.data('param', opt.initParam);
            var rightWidth=opt["rightWidth"]?(" width="+opt["rightWidth"]):" ";
            opt.obj.empty().append('<table cft="noRes" width="100%" border="0" cellspacing="0" cellpadding="0" ><tr><td  vAlign="top" ' + (opt["freeze"] ? "": "colspan=2") + '><div id="rightDiv" style="position: relative; overflow-x: auto;overflow-y: auto;float:left;width:100%" ><table ' + (opt["freeze"] ? rightWidth: "width=100% style=table-layout:fixed;") + ' /></div></td></tr></table><table/>');

            $('table', opt.obj).each(function(i) {
                $(this).attr({
                    border: 0,
                    cellspacing: 0,
                    cellpadding: 0
                }).css({
                    padding: 0,
                    margin: 0,
                    tableLayout: 'fixed'
                });
                if (0 == i) {
                    if (opt["freeze"]) {
                        $(this).find("tr").prepend("<td valign='top' width=" + opt["leftWidth"] + "><div id='leftDiv' style='margin-top:0px;overflow:hidden;float:left;width:100%'><table style='table-layout:fixed' width='100%' ><thead><tr/></thead><tbody/></table></div></td> ");
                        opt.obj.find("#leftDiv").find("table").addClass('dataGrid');
                        opt.obj.data('leftbody', opt.obj.find("#leftDiv tbody:first"));
                        lhead = opt.obj.find("#leftDiv thead");

                    }
                } else if (1 == i) {
                    $(this).addClass('dataGrid').append('<thead><tr/></thead><tbody/>');
                    head = $(this).find("thead");
                    body = $(this).find("tbody:first");
                    opt.obj.data('head', head);
                    opt.obj.data('body', body);

                } else if (2 == i) {
                    $(this).attr("width", '100%');
                    page = $(this).addClass('page mT5').height(30);
                    opt.obj.data('page', page);
                }
            });

            $.each(opt.head,
            function(i, h) {
                var he = null;
                if (opt["freeze"] && opt.head[i]["freeze"]) he = lhead;
                else he = head;
                var widths=opt.head[i].width?' width = "' + opt.head[i].width+'"':'' ;
                var th = $('<th' + (h.hide ? ' style = "display:none" ': ' ')+ widths +' title = "' + (h.dis ? h.dis: h.name) + '" />');
                $('tr', he).append(th);
                th.css({
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                });
                if (undefined == opt.head[i].sort) {
                    th.html('&nbsp;' + (opt.head[i].dis ? opt.head[i].dis: opt.head[i].name) + '&nbsp;');
                } else {
                    th.html('<div style = "background:url(' + dicPath + 'sort.gif) no-repeat 10px center">&nbsp;&nbsp;&nbsp;&nbsp;' + (opt.head[i].dis ? opt.head[i].dis: opt.head[i].name) + '&nbsp;</div>');
                    $('div', th).css({
                        cursor: 'pointer'
                    }).click(function() {
                        if (opt.obj.data('Data')) {
                            if (th.data('order')) {
                                switch (th.data('order')) {
                                case 'sort':
                                    aod = 'asc';
                                    break;
                                case 'asc':
                                    aod = 'desc';
                                    break;
                                case 'desc':
                                    aod = 'sort';
                                    break;
                                }
                            } else {
                                aod = 'asc';
                            }
                            dc.table.recov(opt, true);
                            th.data('order', aod);
                            if ('sort' == aod) {
                                opt.obj.removeData('order').removeData('orderCol');
                            } else {
                                opt.obj.data('order', aod).data('orderCol', opt.head[i].name);
                            }
                            th.css({
                                background: 'url(' + dicPath + aod + '.gif) no-repeat 10px center'
                            });

                            if (0 == opt.model && opt.head[i].sort.style) {
                                dc.table.page(id, 1, opt, {
                                    'col': opt.obj.data('orderCol'),
                                    'order': opt.obj.data('order')
                                },
                                Math.random());
                            } else {
                                var ram = Math.random();
                                opt.obj.data('ram', ram);
                                var prog = dc.table.tprog(opt, ram, 30, $.i18n('grd-pageout'));
                                var col = opt.obj.data('orderCol');
                                var json = opt.obj.data('Data').slice(0);
                                switch (opt.head[i].sort.type) {
                                case 'number':
                                    if ('sort' != aod) {
                                        json = json.sort(function(a, b) {
                                            if (a[col] - b[col] < 0) {
                                                return - 1;
                                            } else if (a[col] - b[col] > 0) {
                                                return 1;
                                            } else {
                                                return 0;
                                            }
                                        });
                                    }
                                    break;
                                case 'date':
                                    alert('coming soon!');
                                    break; // Date.parese('1
                                    // ' +
                                    // month
                                    // +
                                    // year)
                                default:
                                    if ('sort' != aod) {
                                        json = json.sort(function(a, b) {
                                            if (a[col] < b[col]) {
                                                return - 1;
                                            } else if (a[col] > b[col]) {
                                                return 1;
                                            } else {
                                                return 0;
                                            }
                                        });
                                    }
                                }
                                if ('desc' == aod) {
                                    json = json.reverse();
                                }
                                opt.obj.data('run', true).data('curData', json);
                                dc.table.render(id, opt, json, opt.obj.data('totalRecord'), prog, ram);
                                opt.load();
                            }
                        }
                    });
                }
                if (h.checked) {
                    chk_ = true;
                }
            });

            opt.obj.data('hsort', $('th>div', head));

            page.append('<tr><td width = "100%"><div style="height:28px;line-height:28px" />' + (2 == opt.model ? '<div  style="height:28px;line-height:28px" id = "' + id + '_mixPage"/>': '<div style="height:28px;line-height:28px"  /><div style="height:28px;line-height:28px" /><div style="height:28px;line-height:28px" /><div style="height:28px;line-height:28px" /><div style="height:28px;line-height:28px" />') + '</td></tr>');
            $('tr>td>div', page).each(function(i) {
                $(this).css({
                    'float': 0 == i ? 'left': 'right'
                });
                if (0 == i && chk_) {
                    $(this).append(' ' + $.i18n('grd-select') + ' : <span class = "cB">' + $.i18n('grd-selall') + '</span> - <span class = "cB">' + $.i18n('grd-revsel') + '</span> - <span class = "cB">' + $.i18n('grd-nosel') + '</span>');
                    $('span', $(this)).each(function(i) {
                        dc.tool.va($(this));
                        $(this).click(function() {
                            chk = opt["freeze"] ? $(':checkbox[t]', opt.obj.data('leftbody')) : $(':checkbox[t]', opt.obj.data('body'));
                            if (0 == i) {
                                chk.attr('checked', true);
                                opt.selAll(chk);
                            } else if (1 == i) {
                                chk.each(function() {
                                    $(this).attr('checked', !$(this).attr('checked'));
                                });
                                opt.selRev(chk);
                            } else if (2 == i) {
                                chk.attr('checked', false);
                                opt.selCal(chk);
                            }
                        });
                    });
                } else if (1 == i && 2 == opt.model) {
                    opt.cacheSize = (!opt.cacheSize) ? 10 : opt.cacheSize;
                    opt.cacheSize = opt.cacheSize < 1 ? 1 : opt.cacheSize;
                    opt.obj.data('cache', opt.cacheSize);
                    var s = [],
                    len = opt.cacheSize >= 10 ? 10 : opt.cacheSize;
                    s.push('<span id = "' + id + '_first" class = "cB"></span>');
                    s.push('<span id = "' + id + '_pcache" class = "cB"></span>');
                    for (var _ = 1; _ <= len; _++) {
                        s.push('<span id = "' + id + '_' + _ + '" class = "cB"></span>');
                    }
                    s.push('<span id = "' + id + '_ncache" class = "cB"></span>');
                    s.push('<span id = "' + id + '_more" class = "cB"></span>');
                    $(this).append(s.join('') + '&nbsp;');
                } else if (1 == i && 2 != opt.model) {
                    // $(this)
                    // .append(
                    // '&nbsp;<input type = "button"
                    // class = "img-go"/>');
                	$(this).append(' \u7B2C <input id = "'+ id + 'NumPage" name = "NumPage' + id + '" type = "text" class = "input30" style = "padding:0px"/>\u9875');
                	$(this).append('&nbsp;<input type = "button" class = "img-go"/>');
                	
                } else if (2 == i && 2 != opt.model && opt.pageCount == true) {
                    $(this).append(' ' + ' <span>每页</span><select  id="' + id + 'PageNum" name = "PageNum' + id + '" style = "padding:0px"><option value="10">10</option><option value="20">20</option><option value="50">50</option><option value="100">100</option><option value="200">200</option></select><span> ' + $.i18n('grd-data') + '</span>&nbsp;&nbsp;');
                } else if (3 == i && 2 != opt.model) {
                    $(this).append('<span id = "' + id + 'CurPage">0</span>/<span id = "' + id + 'TotalPage">0</span>&nbsp;&nbsp;');
                } else if (4 == i && 2 != opt.model) {
                    $(this).append('&nbsp;&nbsp;&nbsp;&nbsp; <span id = "'+ id + 'First">\u9996\u9875</span> - <span id = "' + id + 'Prev">' + $.i18n('grd-pre') + '</span> - <span id = "' + id + 'Next">' + $.i18n('grd-nxt') + '</span> - <span id = "'+ id+ 'Last">\u5C3E\u9875</span>&nbsp;&nbsp;&nbsp;&nbsp;');
                } else if (5 == i && 2 != opt.model) {
                    $(this).append(' ' + $.i18n('grd-total') + ' <span id = "' + id + 'TotalRecord" class = "cR"> 0 </span> ' + $.i18n('grd-data') + ' ');
                }
            });

            opt.obj.data('size', opt.size);
            opt.obj.data('curPage', 0);
            opt.obj.data('totalRecord', 0);
            opt.obj.data('totalPage', 0);
            opt.obj.data('ram', ram);
            this.page(id, 1, opt, {
                'col': opt.obj.data('orderCol'),
                'order': opt.obj.data('order')
            },
            ram);
          
           if(opt["freeze"]){
        	   var leftDivS=opt.obj.find('#leftDiv');
        	   	opt.obj.find('#rightDiv').unbind("scroll").scroll(
            		function(){ 
            			leftDivS.scrollTop(this.scrollTop);
            		});
           }
            return {
                getSelIds: function() {
                    var datas = opt["freeze"] ? opt.obj.data('leftbody') : opt.obj.data('body');
                    var re = '',
                    ctype = datas.data('ctype');
                    if (ctype) {
                        $(':' + (1 == ctype ? 'checkbox': 'radio') + '[t]:checked', datas).each(function() {
                            re += $(this).val() + ',';
                        });
                        if (re.length > 0 && re.lastIndexOf(',') > -1) {
                            re = re.substring(0, re.length - 1);
                        } else {
                            re = null;
                        }
                    }
                    return re;
                },
                getRows: function() {
                    var arr = [];
                    $.each(opt.obj.data('Data') || [],
                    function(i, o) {
                        arr.push(o);
                    });
                    return arr;
                },
                getSelRows: function() {
                    var datas = opt["freeze"] ? opt.obj.data('leftbody') : opt.obj.data('body');
                    var arr = [],
                    ctype = datas.data('ctype');
                    if (ctype) {
                        var data = opt.obj.data('curData');
                        data = data ? data: opt.obj.data('Data');
                        $(':' + (1 == ctype ? 'checkbox': 'radio') + '[t]:checked', datas).each(function() {
                            arr[arr.length] = data[$(this).attr('t')];
                        });
                    }
                    return arr;
                },
                getTotalNum: function() {
                    return opt.obj.data('totalRecord');
                },
                getTotalPage: function() {
                    return opt.obj.data('totalPage');
                },
                getCurPage: function() {
                    return opt.obj.data('curPage');
                },
                changeSize: function(size) {
                    opt.size = '' + size;
                    opt.obj.data('size', opt.size);
                    this.page(1);
                },
                page: function(n) {
                    opt.obj.data('curPage', n);
                    dc.table.recov(opt, false);
                    dc.table.page(id, 0, opt, {
                        'col': opt.obj.data('orderCol'),
                        'order': opt.obj.data('order')
                    },
                    Math.random());
                },
                show: function() {
                    opt.obj.show();
                },
                hide: function() {
                    opt.obj.hide();
                },
                setParam: function(p) {
                    opt.obj.data('param', p);
                },
                setData: function(d) {
                    opt.data = d;
                }
            };
        },
        tprog: function(c, r, t, m) {
            if (c.progress) {
                return $.dicProgress({
                    context: c.obj,
                    waitTime: t,
                    breakTime: function() {
                        if (c.obj.data('ram') == r) {
                            c.obj.data('run', false);
                            c.obj.data('body').html('<tr><td align = "center" class = "cR">' + m + '!</td></tr>');
                            c.obj.data('page').hide();
                            c.load();
                        }
                    }
                });
            } else {
                var b = function() {
                    if (c.obj.data('ram') == r) {
                        c.obj.data('run', false);
                        c.obj.data('body').html('<tr><td align = "center" class = "cR">' + m + '!</td></tr>');
                        c.obj.data('page').hide();
                        c.load();
                    }
                };
                var bt = setTimeout(b, c.waitTime * 1000);
                return {
                    close: function() {
                        clearTimeout(bt);
                    }
                };
            }
        },
        page: function(i, n, c, o, r) {
            c.obj.data('run', true);
            var p = dc.table.tprog(c, r, c.waitTime, $.i18n('grd-timeout'));
            switch (n) {
            case 1:
                c.obj.data('curPage', 1);
                break;
            case 2:
                c.obj.data('curPage', c.obj.data('curPage') > 1 ? c.obj.data('curPage') - 1 : 1);
                break;
            case 3:
                c.obj.data('curPage', c.obj.data('curPage') < c.obj.data('totalPage') ? c.obj.data('curPage') - -1 : c.obj.data('totalPage'));
                break;
            case 4:
                c.obj.data('curPage', c.obj.data('totalPage'));
                break;
            default:
            }
            this.fill(i, c, p, o, c.obj.data('ram'));
        },
        total: function(i, c) {
            if (2 != c.model) {
                $('#' + i + 'TotalRecord').html(c.obj.data('totalRecord'));
                $('#' + i + 'CurPage').html((c.obj.data('curPage') - c.obj.data('totalPage') > 0) ? c.obj.data('totalPage') : c.obj.data('curPage'));
                $('#' + i + 'TotalPage').html(c.obj.data('totalPage'));
                $('#' + i + 'PageNum').val(c.size);
                $('#' + i + 'NumPage').val(c.obj.data('curPage'))
            }
        },
        render: function(id, c, js, rt, p, r) {
            if (c.obj.data('run') && c.obj.data('ram') == r) {
                if (rt < 1) {
                    c.obj.removeData('Data');
                    if (null != p) {
                        p.close();
                    }
                    if (c.freeze) c.obj.data('leftbody').css({
                        'tableLayout': 'auto'
                    }).empty();
                    c.obj.data('body').css({
                        'tableLayout': 'auto'
                    }).empty();
                    c.obj.find("[cft=title]").remove();
                    c.obj.find("[cft=noRes]").append('<tr cft="title"><td colspan="2" align = "center" class = "cG">' + c.noResult + '!</td></tr>');
                    c.obj.data('page').hide();
                } else {
                    c.obj.find("[cft=title]").remove();
                    var row = [],
                    rows,
                    w,
                    chks,
                    bhead = [];
                    var leftrow = [],
                    leftrows,
                    lhead = [];
                    for (var int = 0; int < c.head.length; int++) {
                        var array_element = c.head[int];
                        if (array_element["freeze"] && c.freeze) lhead.push(array_element);
                        else bhead.push(array_element);

                    }

                    c.obj.data('body').css({
                        'tableLayout': 'fixed'
                    }).empty();
                    if (c.freeze) c.obj.data('leftbody').css({
                        'tableLayout': 'auto'
                    }).empty();
                    c.obj.data('page').show();
                    var btns, tmp = '',
                    isAct = c.action && c.action.length > 0;
                    for (var i = 0; i < js.length; i++) {
                        row.push('<tr class = "' + (0 == i % 2 ? 'dataGridWRow2': 'dataGridWRow') + '">');
                        leftrow.push('<tr class = "' + (0 == i % 2 ? 'dataGridWRow2': 'dataGridWRow') + '">');
                        $.each(c.head,
                        function(n, s) {
                            var tableCon = "";
                            if (s["freeze"] && c.freeze) {
                                tableCon = c.obj.data('leftbody');
                            } else {
                                tableCon = c.obj.data('body');
                            }
                            tmp = null == js[i][s.name] ? '': '' + js[i][s.name];
                            if (s.replace) {
                                tmp = s.replace(js[i]);
                            }
                            if (s.link) {
                                tmp = '<span class = "cB">' + tmp + '</span>';
                            }
                            if (n == c.head.length - 1 && isAct) {
                                btns = '';
                                $.each(c.action,
                                function(j, o) {
                                    if (undefined == o['place']) {
                                        o.place = true;
                                    }
                                    if (!o.show || (o.show && o.show(js[i]))) {
                                        btns += '&nbsp;<span' + (o.disable && o.disable(js[i]) ? '>': ' class = "cB">') + o.name + '</span>';
                                    } else {
                                        btns += (o.place ? '&nbsp;': '') + '<span style = "' + (o.place ? 'visibility:hidden': 'display:none') + '">' + o.name + '</span>';
                                    }
                                });
                            } else {
                                btns = tmp;
                            }
                            if (s.checked) {
                                tableCon.data('ctype', 1);
                            }
                            if (s.radio) {
                                tableCon.data('ctype', 2);
                            }
                            var widths=s.width?' width ="' + s.width + ' " ':' ';
                            if (s["freeze"] && c.freeze) 
                            	leftrow.push((s.checked || s.radio) ? 
                            			('<td' + (s.hide ? ' style = "display:none"': '') + ' align = "center"  ' +widths + ' ><input t = "' + i + '" type = "' + (s.checked ? 'checkbox': 'radio') + '" name = "dic' + id + '" value = "' + tmp + '"/></td>') 
                            		: ('<td ' + (s.hide ? ' style = "display:none"': '') + ' align = "' + s.align +'" ' +widths+ '   >' + btns + '</td>'));
                            else row.push((s.checked || s.radio) ? ('<td' + (s.hide ? ' style = "display:none"': '') + ' align = "center"  ' + widths + ' ><input t = "' + i + '" type = "' + (s.checked ? 'checkbox': 'radio') + '" name = "dic' + id + '" value = "' + tmp + '"/></td>') : ('<td ' + (s.hide ? ' style = "display:none"': '') + ' align = "' + s.align + '"'+  widths  + (c.freeze ? "": "style=word-wrap:break-word") + ' >' + btns + '</td>'));
                        });
                        row.push('</tr>');
                        leftrow.push('</tr>');
                    }
                    c.obj.data('body').append(row.join(''));

                    if (c.obj.data('body').data('ctype')) {
                        chks = $(':' + (1 == c.obj.data('body').data('ctype') ? 'checkbox': 'radio') + '[t]', c.obj.data('body'));
                        chks.each(function(i) {
                            $(this).click(function() {
                                c.check(chks[i], js[i]);
                            });
                        });
                    }
                    rows = $('tr', c.obj.data('body'));
                    if (c.freeze) {

                        c.obj.data('leftbody').append(leftrow.join(''));
                        if (c.obj.data('leftbody').data('ctype')) {
                            chks = $(':' + (1 == c.obj.data('leftbody').data('ctype') ? 'checkbox': 'radio') + '[t]', c.obj.data('leftbody'));
                            chks.each(function(i) {
                                $(this).click(function() {
                                    c.check(chks[i], js[i]);
                                });
                            });
                        }

                        leftrows = $('tr', c.obj.data('leftbody'));
                        leftrows.each(function(i) {
                            if (c.cssRow) {
                                c.cssRow($(this), js[i]);
                            }
                            leftrows.hover(function() {
                                $(this).addClass('tab-mubOver');
                                c.obj.data('body').find("tr:eq(" + $(this).index() + ")").addClass('tab-mubOver');
                            },
                            function() {
                                c.obj.data('body').find("tr:eq(" + $(this).index() + ")").removeClass('tab-mubOver');
                                $(this).removeClass('tab-mubOver');
                            });
                            $(this).click(function() {
                                c.obj.data('body').find("tr").removeClass('over-hang');
                                c.obj.data('body').find("tr:eq(" + $(this).index() + ")").addClass('over-hang');
                                leftrows.removeClass('over-hang');
                                $(this).addClass('over-hang');
                            });
                            if (c.rowClk) {
                                $(this).css({
                                    cursor: 'pointer'
                                }).click(function(e) {
                                    if ('TD' == e.target.tagName) {
                                        c.rowClk(js[i]);
                                    }
                                });
                            }
                            if (c.rowDbClk) {
                                $(this).dblclick(function(e) {
                                    if ('TD' == e.target.tagName) {
                                        c.rowDbClk(js[i]);
                                    }
                                });
                            }
                        });

                        $('tr>td', c.obj.data('leftbody')).each(function(i) {
                            if (lhead[i % lhead.length].wrap) {
                                $(this).css({
                                    whiteSpace: 'normal'
                                });
                            } else {
                                $(this).css({
                                    whiteSpace: 'nowrap' 
                                });
                            }
                            if (0 == (i + 1) % lhead.length) {
                                $('span', $(this)).each(function(j) {
                                    if ($(this).hasClass('cB')) {
                                        dc.tool.va($(this));

                                        $(this).click(function() {
                                            lhead[lhead.length - 1].link.fun(js[Math.floor(i / lhead.length)]);
                                        });

                                    }
                                });
                            } else {
                                $(this).attr({
                                    title: $(this).text()
                                });
                                $('span', $(this)).each(function(j) {
                                    dc.tool.va($(this));
                                    $(this).click(function() {
                                        lhead[(i + 1) % lhead.length - 1].link.fun(js[Math.floor(i / lhead.length)]);
                                    });
                                });
                            }
                        });

                    }
                    rows.each(function(i) {
                        if (c.cssRow) {
                            c.cssRow($(this), js[i]);
                        }
                        rows.hover(function() {
                            if (c.freeze) c.obj.data('leftbody').find("tr:eq(" + $(this).index() + ")").addClass('tab-mubOver');
                            $(this).addClass('tab-mubOver');
                        },
                        function() {
                            if (c.freeze) c.obj.data('leftbody').find("tr:eq(" + $(this).index() + ")").removeClass('tab-mubOver');
                            $(this).removeClass('tab-mubOver');
                        });
                        $(this).click(function() {
                            if (c.freeze) {
                                c.obj.data('leftbody').find("tr").removeClass('over-hang');
                                c.obj.data('leftbody').find("tr:eq(" + $(this).index() + ")").addClass('over-hang');
                            }
                            rows.removeClass('over-hang');
                            $(this).addClass('over-hang');
                        });
                        if (c.rowClk) {
                            $(this).css({
                                cursor: 'pointer'
                            }).click(function(e) {
                                if ('TD' == e.target.tagName) {
                                    c.rowClk(js[i]);
                                }
                            });
                        }
                        if (c.rowDbClk) {
                            $(this).dblclick(function(e) {
                                if ('TD' == e.target.tagName) {
                                    c.rowDbClk(js[i]);
                                }
                            });
                        }
                    });

                    $('tr>td', c.obj.data('body')).each(function(i) {
                        if (bhead[i % bhead.length].wrap) {
                            $(this).css({
                                whiteSpace: 'normal'
                            });
                        } else {
                            $(this).css({
                                whiteSpace: 'nowrap'
                            });
                        }
                        if (0 == (i + 1) % bhead.length) {
                            $('span', $(this)).each(function(j) {
                                if ($(this).hasClass('cB')) {
                                    dc.tool.va($(this));
                                    if (c.action) {
                                        $(this).click(function() {
                                            c.action[j].fun(js[((i + 1) / bhead.length) - 1]);
                                        });
                                    } else {
                                        $(this).click(function() {
                                            bhead[bhead.length - 1].link.fun(js[Math.floor(i / bhead.length)]);
                                        });

                                    }
                                }
                            });
                        } else {
                            $(this).attr({
                                title: $(this).text()
                            });
                            $('span', $(this)).each(function(j) {
                                dc.tool.va($(this));
                                $(this).click(function() {
                                    bhead[(i + 1) % bhead.length - 1].link.fun(js[Math.floor(i / bhead.length)]);
                                });
                            });
                        }
                    });

                    c.obj.data('size', c.size);
                    c.obj.data('totalRecord', rt);
                    c.obj.data('totalPage', Math.ceil(rt / c.size));
                    dc.table.total(id, c);

                    if (2 == c.model) {
                        var index = c.obj.data('curPage') - 0,
                        cache = c.obj.data('cache');
                        $('#' + id + '_pcache').html(index > 10 ? $.i18n('grd-prev') + '10' + $.i18n('grd-page') : '').unbind('click').click(function() {
                            dc.table.recov(c, false);
                            c.obj.data('curPage', $('#' + id + '_1').text() - 10);
                            c.obj.data('cIdx', c.obj.data('cIdx') - 1);
                            dc.table.page(id, 0, c, {
                                'col': c.obj.data('orderCol'),
                                'order': c.obj.data('order')
                            },
                            Math.random());
                        });
                        var siz = Math.ceil(c.obj.data('cNum') / c.size);
                        for (var _ = (c.obj.data('cIdx') - 1) * 10 + 1, __ = 1; _ <= c.obj.data('cIdx') * 10; _++, __++) {
                            if (_ <= siz) {
                                $('#' + id + '_' + __).html('&nbsp;' + _ + '&nbsp;').unbind('click').click(function() {
                                    dc.table.recov(c, false);
                                    c.obj.data('curPage', $(this).text());
                                    dc.table.page(id, 0, c, {
                                        'col': c.obj.data('orderCol'),
                                        'order': c.obj.data('order')
                                    },
                                    Math.random());
                                });
                            } else {
                                $('#' + id + '_' + __).html('').unbind('click');
                            }
                        }
                        $('#' + id + '_ncache').html(c.obj.data('sIdx') - c.obj.data('cIdx') > 0 ? $.i18n('grd-next') + '10' + $.i18n('grd-page') : '').unbind('click').click(function() {
                            dc.table.recov(c, false);
                            c.obj.data('curPage', $('#' + id + '_1').text() - -10);
                            c.obj.data('cIdx', c.obj.data('cIdx') - -1);
                            dc.table.page(id, 0, c, {
                                'col': c.obj.data('orderCol'),
                                'order': c.obj.data('order')
                            },
                            Math.random());
                        });
                        $('#' + id + '_more').html(siz == c.obj.data('cIdx') * 10 ? $.i18n('grd-more') : '').unbind('click').click(function() {
                            dc.table.recov(c, false);
                            c.obj.data('curPage', siz - -1);
                            dc.table.page(id, 0, c, {
                                'col': c.obj.data('orderCol'),
                                'order': c.obj.data('order')
                            },
                            Math.random());
                        });
                        var ar = [],
                        spAr = $('span', $('#' + id + '_mixPage'));
                        spAr.each(function() {
                            ar[ar.length] = $(this);
                        });
                        dc.tool.va(ar);
                    } else {
                        var pNum = $('#' + id + 'NumPage').unbind('blur').blur(
							function() {
								$(this).val($.trim($(this).val()));
								if (isNaN($(this).val() - 0)) {
									$(this).val(1)
								} else if (!($(this).val() > 0 && $(this).val() <= c.obj.data('totalPage'))) {
									$(this).val(1)
								} else {
									var _n = $(this).val().indexOf('.');
									if (_n > -1) {
										$(this).val($(this).val().substring(0,_n));
									}
								}
						});
                        $('#' + id + 'PageNum').unbind('change').bind('change',
                        function() {
                            c.size = $(this).val();
                            c.obj.data('size', c.size);
                            dc.table.recov(c, false);
                            dc.table.page(id, 1, c, {
                                'col': c.obj.data('orderCol'),
                                'order': c.obj.data('order')
                            },
                            Math.random());
                        });
                        var clsBtn = function(btn) {
                            btn.removeClass('cB').css({
                                cursor: 'default',
                                textDecoration: 'none'
                            }).unbind('mouseenter mouseleave click');
                        };

						$('.img-go', c.obj.data('page')).unbind('click').click(
						function() {
						    dc.table.recov(c, false);
						    c.obj.data('curPage',(pNum.val().length < 1 ? 1: pNum.val()));
						    dc.table.page(id,0,c,{'col' : c.obj.data('orderCol'),
						                          'order' : c.obj.data('order')},
						    Math.random());
						 });
                        clsBtn($('#' + id + 'First'));
                        clsBtn($('#' + id + 'Prev'));
                        clsBtn($('#' + id + 'Next'));
                        clsBtn($('#' + id + 'Last'));
                        if (c.obj.data('curPage') - 1 > 0) {
                            dc.tool.va([$('#' + id + 'First'), $('#' + id + 'Prev')]);
                            $('#' + id + 'First').addClass('cB').unbind('click').click(function() {
                                dc.table.recov(c, false);
                                dc.table.page(id, 1, c, {
                                    'col': c.obj.data('orderCol'),
                                    'order': c.obj.data('order')
                                },
                                Math.random());
                            });
                            $('#' + id + 'Prev').addClass('cB').unbind('click').click(function() {
                                dc.table.recov(c, false);
                                dc.table.page(id, 2, c, {
                                    'col': c.obj.data('orderCol'),
                                    'order': c.obj.data('order')
                                },
                                Math.random());
                            });
                        }
                        if (c.obj.data('curPage') != c.obj.data('totalPage')) {
                            dc.tool.va([$('#' + id + 'Next'), $('#' + id + 'Last')]);
                            $('#' + id + 'Next').addClass('cB').unbind('click').click(function() {
                                dc.table.recov(c, false);
                                dc.table.page(id, 3, c, {
                                    'col': c.obj.data('orderCol'),
                                    'order': c.obj.data('order')
                                },
                                Math.random());
                            });
                            $('#' + id + 'Last').addClass('cB').unbind('click').click(function() {
                                dc.table.recov(c, false);
                                dc.table.page(id, 4, c, {
                                    'col': c.obj.data('orderCol'),
                                    'order': c.obj.data('order')
                                },
                                Math.random());
                            });
                        }
                    }

                    if (null != p) {
                        p.close();
                    }
                }
            }
            
           if(c.freeze){ 
        	   var maxHeight=c["maxHeight"];
        	   if(!maxHeight){ 
        		   maxHeight=0;
        		   var pObjs=c.obj.siblings();
        		   pObjs.each(function(i){
        			   maxHeight+=pObjs[i].offsetHeight;
        		   });  
         		   maxHeight=document.documentElement.clientHeight -maxHeight-35; 
        	   }
        	   if(	c.obj.find("#rightDiv table").height()> maxHeight){
         	  	c.obj.find("#rightDiv").height(maxHeight);  
         	 	c.obj.find("#leftDiv").height(maxHeight-17);  
         	  }else
         		 c.obj.find("#rightDiv").height(c.obj.find("#rightDiv table").height()+25);
           }else
        	   c.obj.find("#rightDiv").height(c.obj.find("#rightDiv table").height());
        },
        fill: function(id, c, p, or, r) {
            var load = function(c, j, i, t, p, r) {
                c.obj.data('Data', j);
                dc.table.render(i, c, j, t, p, r);
                c.load();
            };
            var engine = function(d, c, s) {
                var j = [];
                for (var i = (c - 1) * s; i < c * s && i < d.length; i++) {
                    j[j.length] = d[i];
                }
                return j;
            };
            var param = function(c, r) {
                var p = {},
                prefix = 'object' == typeof(c.url) && c.url.prefix ? c.url.prefix + '.': '',
                pm = c.obj.data('param');
                p[prefix + 'size'] = c.obj.data('size');
                p[prefix + 'curPage'] = c.obj.data('curPage');
                if (pm) {
                    for (var i in pm) {
                        p[prefix + i] = $.isArray(pm[i]) ? pm[i][0] : pm[i];
                    }
                }
                p.ram = r;
                return p;
            };
            var adpr = function(c, j) {
                return c.adapter ? eval('j.' + c.adapter.rowTotal) : j.rowTotal;
            };
            var adpc = function(c, j) {
                return c.adapter ? eval('j.' + c.adapter.infoContent) : j.infoContent;
            };
            switch (c.model) {
            case 1:
                load(c, engine(adpc(c, c.data), c.obj.data('curPage'), c.size), id, adpc(c, c.data).length, p, r);
                break;
            case 2:
                if (c.obj.data('cNum') && Math.ceil(c.obj.data('cNum') / c.size) - c.obj.data('curPage') >= 0) {
                    load(c, engine(c.obj.data('cData'), c.obj.data('curPage'), c.size), id, c.obj.data('cNum') - 0, p, r);
                } else {
                    var ps2 = {
                        size: c.obj.data('size'),
                        curPage: c.obj.data('curPage'),
                        cacheSize: c.obj.data('cache'),
                        ram: r
                    };
                    c.obj.data('sIdx', c.obj.data('sIdx') ? (c.obj.data('sIdx') - -1) : 1);
                    c.obj.data('cIdx', c.obj.data('sIdx'));
                    ps2.cacheIndex = c.obj.data('sIdx');
                    $.getJSON(c.url, ps2,
                    function(js) {
                    	  
                        if (c.processJSON) {
                            js = c.processJSON.call(null, js);
                        }
                        if (adpc(c, js).length > 0) {
                            if (c.obj.data('cData')) {
                                var tmp = c.obj.data('cData');
                                for (var i = 0; i < adpc(c, js).length; i++) {
                                    tmp[tmp.length] = adpc(c, js)[i];
                                }
                                c.obj.data('cData', tmp);
                            } else {
                                c.obj.data('cData', adpc(c, js));
                            }
                            c.obj.data('cNum', c.obj.data('cData').length);
                            load(c, engine(c.obj.data('cData'), ps2.curPage, c.size), id, adpr(c, js), p, r);
                        } else {
                            alert('no more~');
                            c.obj.data('sIdx', c.obj.data('sIdx') - 1);
                            c.obj.data('cIdx', c.obj.data('sIdx'));
                            c.obj.data('curPage', c.obj.data('curPage') - 1);
                            if (null != p) {
                                p.close();
                            }
                        }
                    });
                }
                break;
            default:
                var ps = param(c, r);
                if (or.col) {
                    ps.orderCol = or.col;
                    ps.order = or.order;
                }
                $.postJSON({
                    url: 'object' == typeof(c.url) ? c.url.url: c.url,
                    data: ps,
                    success: function(j) { 
                        if (c.processJSON) {
                            j = c.processJSON.call(null, j);
                        }
                        load(c, adpc(c, j), id, adpr(c, j) ? adpr(c, j) : 0, p, r);
                    }
                });
                // $.getJSON('object' == typeof(c.url) ? c.url.url :
                // c.url, ps, function(j) {load(c, adpc(c, j), id,
                // (adpr(c, j) ? adpr(c, j) : 0), p, r);});
            }
        }
    },
    dc.tool = {
        add: function(w, d) {
            return $('<div id = "' + (d ? d: 'dic' + $.dicId()) + '"/>').appendTo(w ? w: dcBd);
        },
        qq: function(q, p, c) {
            if (!c.obj.data('id')) {
                c.obj.data('id', $.dicId());
            }
            var n = $.inArray(c.obj.data('id'), q[0]);
            if ( - 1 == n) {
                q[0][q[0].length] = c.obj.data('id');
                q[1][q[1].length] = c.obj.data('cfg', $.extend(true, {},
                p, c || {}));
                n = q[1].length - 1;
            } else {
                q[1][n].data('cfg', $.extend({},
                p, c || {}));
            }
            return q[1][n];
        },
        sizing: function() {
            dic_W = dcBd.width();
            dicW = $(document.documentElement).width();
            dicW_ = $(document).width();
            dic_H = dcBd.height();
            dicH = (ie) ? $(document.documentElement).height() : document.body.clientHeight;
            dicH_ = $(document).height();
        },
        unMenu: function(os) {
            if ($.isArray(os)) {
                $.each(os,
                function(i, o) {
                    o.bind('contextmenu',
                    function() {
                        return false;
                    });
                });
            } else {
                os.bind('contextmenu',
                function() {
                    return false;
                });
            }
        },
        unSelect: function(os) {
            if ($.isArray(os)) {
                if (ff) {
                    $.each(os,
                    function(i, o) {
                        o.css('-moz-user-select', 'none');
                    });
                } else {
                    $.each(os,
                    function(i, o) {
                        o.attr('unselectable', 'on');
                        o.bind('selectstart',
                        function() {
                            return false;
                        });
                    });
                }
            } else {
                if (ff) {
                    os.css('-moz-user-select', 'none');
                } else {
                    os.attr('unselectable', 'on');
                    os.bind('selectstart',
                    function() {
                        return false;
                    });
                }
            }
        },
        va: function(os) {
            var ho = function(o) {
                o.css({
                    cursor: 'pointer'
                }).hover(function() {
                    o.css({
                        textDecoration: 'underline'
                    });
                },
                function() {
                    o.css({
                        textDecoration: 'none'
                    });
                });
            };
            if ($.isArray(os)) {
                $.each(os,
                function(i, o) {
                    ho(o);
                });
            } else {
                ho(os);
            }
        },
        focus: function(ctx) {
            $('<input type = "text" style = "position:absolute;left:0;top:-50px;width:0"/>').appendTo(ctx ? ctx: dcBd).focus().blur().remove();
        },
        disTab: function(b) {
            $(document).data('keyTab', b);
            window.document.onkeydown = function(e) {
                e = (e) ? e: window.event;
                if (9 == e.keyCode) {
                    return ! $(document).data('keyTab');
                }
            };
        },
        formJson: function(f) {
            var e, o, j = {};
            f = 'object' != typeof(f) ? $('#' + f)[0] : $(f)[0];
            var s = function(j, e) {
                var mul = $(e).data('mul');
                if (j[e.name]) {
                    j[e.name].push(mul ? mul: e.value);
                } else {
                    j[e.name] = [mul ? mul: e.value];
                }
            };
            for (var i = 0,
            l = f.length; i < l; i++) {
                e = f[i];
                switch (e.type) {
                case 'button':
                case 'reset':
                case 'submit':
                    break;
                case 'radio':
                case 'checkbox':
                    if (e.checked) {
                        s(j, e);
                    }
                    break;
                case 'select-multiple':
                    var sm = [];
                    $('option', e).each(function() {
                        if ($(this)[0].selected) {
                            sm.push($(this)[0].value);
                        }
                    });
                    $(e).data('mul', sm);
                    s(j, e);
                    break;
                default:
                    s(j, e);
                    break;
                }
            }
            for (var _ in j) {
                if (1 == j[_].length) {
                    j[_] = j[_][0];
                }
            }
            return j;
        }
    },
    dc.tree = {
        opt: {
            chkIds: '',
            expIds: '',
            disIds: '',
            asyn: false,
            icon: {
                th1: 'Q',
                th2: 'Q',
                th3: 'Q',
                leaf: 'Y',
                priority: true,
                line: true
            },
            clkScale: false,
            checking: function() {},
            clk: function() {},
            click: function() {},
            dbClick: function() {}
        },
        qq: [[], []],
        load: function(c) {
            var tre = dc.tool.qq(this.qq, this.opt, c);
            var id = tre.data('id');
            var opt = tre.data('cfg');
            var chkId = function(c) {
                if (c[0].checked) {
                    var arr = opt.obj.data('chkIds');
                    arr[arr.length] = c.val();
                    opt.obj.data('chkIds', arr);
                } else {
                    var n = $.inArray(c.val(), opt.obj.data('chkIds'));
                    if (n > -1) {
                        opt.obj.data('chkIds').splice(n, 1);
                    }
                }
            };
            var pchkId = function(n, c) {
                var pn = $('#' + n.attr('p'));
                var _pn = $('#_' + n.attr('p'));
                var pchk = $(':checkbox', pn)[0];
                if (c) {
                    if (pchk && !pchk.checked) {
                        pchk.checked = true;
                        chkId($(pchk));
                        pchkId(pn, true);
                    }
                } else if (_pn.length) {
                    var cChk = $(':checkbox:checked', _pn);
                    if (cChk && 0 == cChk.length) {
                        pchk.checked = false;
                        chkId($(pchk));
                        pchkId(pn, false);
                    }
                }
            };
            var togImg = function(p, l, z) {
                var m = '';
                switch (l) {
                case '1':
                    m = z ? '_' + opt.icon.th1: opt.icon.th1;
                    break;
                case '2':
                    m = z ? '_' + opt.icon.th2: opt.icon.th2;
                    break;
                case '3':
                    m = z ? '_' + opt.icon.th3: opt.icon.th3;
                    break;
                default:
                    m = z ? '_Q': 'Q';
                }
                p[p.length - 1].src = dicPath + m + '.gif';
                if (opt.icon.line) {
                    var s = p[p.length - 2].src;
                    s = s.substr(s.lastIndexOf('/') + 1);
                    s = s.substr(0, s.indexOf('.'));
                    switch (s) {
                    case 'C':
                        s = 'E';
                        break;
                    case 'A':
                        s = '_';
                        break;
                    case 'B':
                        s = 'P';
                        break;
                    case 'F':
                        s = 'K';
                        break;
                    case 'E':
                        s = 'C';
                        break;
                    case '_':
                        s = 'A';
                        break;
                    case 'P':
                        s = 'B';
                        break;
                    case 'K':
                        s = 'F';
                        break;
                    }
                    p[p.length - 2].src = dicPath + s + '.gif';
                }
            };
            var tog = function(n, z) {
                n.data('state', !z);
                togImg($('#' + n.attr('id') + '>img'), n.attr('l'), !z);
                if (z) {
                    $('#_' + n.attr('id')).hide();
                } else {
                    $('#_' + n.attr('id')).show();
                }
            };
            var img = function(o, p, c, L) {
                o.data('name', opt.clkScale ? ('<span>' + o.html() + '</span>') : o.html()).empty();
                var imgs = '',
                ln = o.data('ln'),
                id = o.attr('id'),
                ckd = '',
                l = o.attr('l'),
                ic = '',
                si = 0;
                if (p) {
                    for (var i = 0; i < ln.length; i++) {
                        imgs += '<img src = "' + dicPath + ln.charAt(i) + '.gif"/>';
                    }
                    imgs += '<img src = "' + dicPath + p + '.gif"/>';
                } else {
                    for (var j = 0; j < ln.length; j++) {
                        si += 20;
                    }
                    o.css({
                        marginLeft: si + 'px'
                    });
                }

                switch (l) {
                case '1':
                    ic = opt.icon.th1;
                    break;
                case '2':
                    ic = opt.icon.th2;
                    break;
                case '3':
                    ic = opt.icon.th3;
                    break;
                default:
                    ic = c ? 'Q': opt.icon.leaf;
                }
                imgs += '<img src = "' + dicPath + (c ? ic: (opt.icon.priority ? opt.icon.leaf: ic)) + '.gif"/>';
                o.append(imgs);
                if (opt.checkbox) {
                    var n = $.inArray(id, opt.obj.data('chkIds'));
                    if (n > -1) {
                        ckd = 'checked';
                    }
                    var bol = 'boolean' == typeof(opt.checkbox),
                    lbol = !opt.checkbox.leafChk || (opt.checkbox.leafChk && !$('#_' + o[0].id).length);
                    var cs = '<input type = "checkbox" ' + ckd + ' name = "' + opt.obj.attr('id') + 'Chk" ' + (o.data('dis') ? 'disabled': '') + ' value = "' + id + '"/>&nbsp;' + o.data('name');
                    if (bol) {
                        o.append(lbol ? cs: o.data('name'));
                    } else {
                        if (undefined == opt.checkbox.show) {
                            o.append(lbol ? cs: o.data('name'));
                        } else if (opt.checkbox.show(o)) {
                            o.append(lbol ? cs: o.data('name'));
                        } else {
                            o.append(o.data('name'));
                        }
                    }
                    $(':checkbox', o).click(function() {
                        c = $(this)[0];
                        if (opt.checkbox.chlChk) {
                            render(o, L, true);
                            $(':checkbox', $('#_' + o.attr('id'))).each(function() {
                                if (!$('#' + $(this).val()).data('dis')) {
                                    $(this).attr({
                                        'checked': c.checked
                                    });
                                    chkId($(this));
                                }
                            });
                        }
                        if (opt.checkbox.parChk) {
                            pchkId(o, c.checked);
                        }
                        chkId($(this));
                        opt.checking($(this)[0], o);
                    });
                } else {
                    o.append(o.data('name'));
                }
            };
            var icon = function(e, n, c, l, i, L) {
                if (opt.icon.line) {
                    if (1 == e) {
                        img(n, (1 == l ? (c ? 'A': '-') : (c ? 'B': 'L')), c, L);
                    } else {
                        if (0 == i) {
                            img(n, (1 == l ? (c ? 'F': 'D') : (c ? 'C': 'T')), c, L);
                        } else if (e - 1 == i) {
                            img(n, c ? 'B': 'L', c, L);
                        } else {
                            img(n, c ? 'C': 'T', c, L);
                        }
                    }
                } else {
                    img(n, null, c, L);
                }
            };
            var fat = function(n) {
                if (opt.clkScale) {
                    if (opt.obj.data('curTree')) {
                        opt.obj.data('curTree').removeClass('tb');
                    }
                    opt.obj.data('curTree', n.addClass('tb'));
                }
            };
            var render = function(o, l, g) {
                if (o.data('ok')) {
                    var ns = $('#_' + o.attr('id') + '>div[p]');
                    if (ns && ns.length > 0) {
                        ns.each(function(i) {
                            if (g) {
                                render($(this), ns.length - 1 == i, g);
                            }
                        });
                    }
                } else {
                    tree($('#_' + o.attr('id') + '>div[p]'), (o.data('ln') ? o.data('ln') : '') + (l ? 'w': 'I'), g);
                    o.data('ok', true);
                }
            };
            var expand = function(i) {
                var pa = $('#' + $('#' + i).attr('p'));
                if (pa.length && pa.attr('l') - 1 > 0) {
                    expand(pa.attr('id'));
                }
                if (!pa.data('state')) {
                    pa.trigger('click', [true]);
                }
            };
            var checked = function(i) {
                var n = $('#' + i);
                if ('1' == n.attr('l')) {
                    $(':checkbox', n).attr('checked', true);
                } else {
                    var arr = opt.obj.data('chkIds');
                    var inx = $.inArray(n.attr('p'), arr);
                    if (inx < 0) {
                        arr[arr.length] = n.attr('p') + '';
                        opt.obj.data('chkIds', arr);
                    }
                    checked(n.attr('p'));
                }
            };
            var hover = function(n) {
                n.hover(function() {
                    n.css({
                        color: 'highlighttext',
                        backgroundColor: 'highlight'
                    });
                },
                function() {
                    n.css({
                        color: '',
                        backgroundColor: ''
                    });
                });
            };
            var perm = function(i) {
                if ('boolean' == typeof(opt.obj.data('disIds'))) {
                    return ! opt.obj.data('disIds');
                } else {
                    return $.inArray(i, opt.obj.data('disIds')) < 0;
                }
            };
            var pclkLogic = function(o, e) {
                if (opt.clkScale) {
                    if ('IMG' == e.target.tagName || 'DIV' == e.target.tagName) {
                        tog(o, o.data('state'));
                    } else if ('INPUT' != e.target.tagName && perm(o.attr('id'))) {
                        fat(o);
                        opt.clk(o);
                    }
                } else {
                    if ('INPUT' != e.target.tagName) {
                        if (perm(o.attr('id'))) {
                            fat(o);
                        }
                        tog(o, o.data('state'));
                        if (perm(o.attr('id'))) {
                            opt.clk(o);
                        }
                    }
                }
            };
            var pclk = function(n) {
                n.unbind('click').click(function(e) {
                    pclkLogic($(this), e);
                });
            };
            var tree = function(ns, ln, go) {
                if (ns && ns.length > 0) {
                    ns.addClass('tree');
                    var pa;
                    ns.each(function(i) {
                        pa = $('#_' + $(this).attr('id')).length ? true: false;
                        if (!perm($(this).attr('id'))) {
                            $(this).data('dis', true).css({
                                fontStyle: 'italic',
                                color: 'gray'
                            });
                        }
                        if (ie6 || ff) {
                            hover($(this));
                        }
                        $(this).data('ln', ($(this).data('ln') ? $(this).data('ln') : '') + ln);
                        if (pa) {
                            $(this).click(function(e, exp) {
                                render($(this), ns.length - 1 == i, false);
                                if (exp) {
                                    tog($(this), $(this).data('state'));
                                } else {
                                    pclkLogic($(this), e);
                                }
                            });
                        } else {
                            $(this).click(function(e) {
                                if (opt.clkScale) {
                                    if ('INPUT' != e.target.tagName && perm($(this).attr('id')) && 'IMG' != e.target.tagName && 'DIV' != e.target.tagName) {
                                        fat($(this));
                                        opt.clk($(this));
                                        opt.click($(this));
                                    }
                                } else {
                                    if ('INPUT' != e.target.tagName && perm($(this).attr('id'))) {
                                        fat($(this));
                                        opt.clk($(this));
                                        opt.click($(this));
                                    }
                                }
                            }).dblclick(function() {
                                if (perm($(this).attr('id'))) {
                                    opt.dbClick($(this));
                                }
                            });
                        }
                        icon(ns.length, $(this), pa, $(this).attr('l'), i, ns.length - 1 == i);
                        if (go) {
                            render($(this), ns.length - 1 == i, go);
                        }
                    });
                }
            };
            opt.obj.data('chkIds', 'string' == typeof(opt.chkIds) ? opt.chkIds.split(',') : opt.chkIds);
            opt.obj.data('disIds', 'string' == typeof(opt.disIds) ? opt.disIds.split(',') : opt.disIds);
            tree($('#' + opt.obj.attr('id') + '>div[p]'), '', false);
            opt.obj.data('expIds', 'string' == typeof(opt.expIds) ? opt.expIds.split(',') : opt.expIds);
            if (opt.checkbox && opt.checkbox.parChk) {
                $.each(opt.obj.data('chkIds'),
                function(i, o) {
                    if (o.length > 0) {
                        checked(o);
                    }
                });
            }
            $.each(opt.obj.data('expIds'),
            function(i, o) {
                if (o.length > 0) {
                    expand(o);
                }
            });
            return {
                getSelIds: function() {
                    var re = opt.obj.data('chkIds').join(',');
                    if (',' == re.charAt(0)) {
                        re = re.substr(1);
                    }
                    return re;
                },
                expand: function(ids) {
                    ids = 'string' == typeof(ids) ? ids.split(',') : ids;
                    for (var i = 0; i < ids.length; i++) {
                        if (ids[i].length > 0) {
                            expand(ids[i]);
                        }
                    }
                },
                getJSON: function(u, ps, n, call) {
                    if (!n.data('asyn')) {
                        var img = $('img:last', n);
                        var load = function(n, isLoad) {
                            if (isLoad) {
                                img.data('curSrc', img.attr('src')).attr('src', dicPath + '/load.gif').width(20).height(20);
                            } else {
                                img.attr('src', dicPath + '/Y.gif');
                            }
                        };
                        load(n, true);
                        $.getJSON(u, ps,
                        function(data) {
                            if (data.length > 0) {
                                img.attr('src', dicPath + '/_Q.gif');
                                var id, ns = ['<div id="_' + n.attr('id') + '">'];
                                $.each(data,
                                function(i, o) {
                                    ns.push('<div class = "tree" style = "margin-left:' + 20 * n.attr('l') + 'px" l = ' + (n.attr('l') - -1) + ' p = ' + n.attr('id'));
                                    for (var d in data[i]) {
                                        if ('id' == d) {
                                            id = o[d] + '';
                                        }
                                        ns.push(' ' + d + ' = "' + o[d] + '"');
                                    }
                                    ns.push('>');
                                    ns.push('<img src = "' + dicPath + 'Q.gif"/>');
                                    ns.push((opt.checkbox ? ('<input type = "checkbox"' + (perm(id) ? '': ' disabled') + ($.inArray(id, opt.obj.data('chkIds')) >= 0 ? ' checked': '') + ' name = "' + opt.obj.attr('id') + 'Chk" value = "' + id + '" /> ') : '') + (opt.clkScale ? '<span>' + o['name'] + '</span>': o['name']));
                                    ns.push('</div>');
                                });
                                ns.push('</div>');
                                n.data('state', true).after(ns.join(''));
                                pclk(n);
                                var an = $('#_' + n.attr('id') + '>div[p]');
                                an.each(function(i) {
                                    if (ie6 || ff) {
                                        hover($(this));
                                    }
                                    $(this).click(function(e) {
                                        if (opt.clkScale) {
                                            if ('INPUT' != e.target.tagName && perm($(this).attr('id')) && 'IMG' != e.target.tagName && 'DIV' != e.target.tagName) {
                                                fat($(this));
                                                opt.clk($(this));
                                                opt.click($(this));
                                            }
                                        } else {
                                            if ('INPUT' != e.target.tagName && perm($(this).attr('id'))) {
                                                fat($(this));
                                                opt.clk($(this));
                                                opt.click($(this));
                                            }
                                        }
                                    });

                                    if (opt.checkbox) {
                                        $(':checkbox', $(this)).click(function() {
                                            chkId($(this));
                                            opt.checking($(this)[0], $(an[i]));
                                        });
                                    }
                                });
                            } else {
                                load(n, false);
                            }
                            n.data('asyn', true);
                            if (call) {
                                call(data);
                            }
                        });
                    }
                }
            };
        }
    },
    dc.valid = {
        opt: {
            trim: true,
            focus: true,
            visible: false,
            mini: false,
            errorMsg: null, 
            msgDiv:null,
            msgItem:null,
            characters: '<>|\\',
            vFailFun: function() {}
        },
        qq: [[], []],
        showMsg:function(arg){ 
         	var hidd=arg.is(":hidden");
        	if(hidd){
        		var context=arg.parents("#div_content").parent();
        		var index= context.index();
        		var title=context.parent().prev().find("li:eq("+index+")");
        		title.trigger("click");
        		var spSid=context.parent().parent().attr("upStructId");
        		if(spSid!=-1){
        			var context1=context.parent().parent().parent();
        			var index= context1.index();
        			var title=context1.parent().prev().find("li:eq("+index+")");
        			title.trigger("click");
        		}
        	}
        },
        show: function(e, c, m, s) {
            if (!c.obj) return; 
            c["msgDiv"]= c["msgDiv"]|| $(c.obj[0]).find("#show_infoMsg_div");
             
            var getMsgItem=function(){
             	var item="#TD_N_" + e[0].id;
            	c["msgItem"]=c["msgItem"]||{};
            	c["msgItem"][item]=c["msgItem"][item]||$(c.obj[0]).find(item);
            	  if (c["msgItem"][item].length > 0) {
                      m = c["msgItem"][item].text() + m;
                  }
           
            	  if (c["msgItem"][item].length > 0) {
            		  if(s) 
                      	c["msgItem"][item].html(c["msgItem"][item].text().replace('*', '<span style="color: red">*</span>'));
            		  else{
            		 	  dc.valid.showMsg(c["msgItem"][item]);
            			  c["msgItem"][item].html(("<span style='color: red'>" + c["msgItem"][item].text() + "</span>")  );
            		  }
                    }
            };
            if (e.data('vtip')) { 
             } else {
                e.data('vtip', $.dicId()).data('vok', s); 
             }
        
            if (s) {
                e.removeAttr('title').css({backgroundColor:''}); 
         	   getMsgItem();
            } else {
                e.css({backgroundColor:'#fef7f7'});
                if (c.mini) {
                    e.attr('title', m);
                }
               if( c["msgDiv"].length >0){
            	   getMsgItem();
                 var html = '<img src = "' + dicPath + 'space.gif" class = "' + (s ? '': 'msg-bg0') + '" ' + (!s && c.mini ? 'title = "' + m.replace('*', '') + '"': '') + ' />' + (s || c.mini ? '': m.replace('*', ''));
                 top.$.dicBubble({
                                             title: '验证提示',
                                             // 广播标题设置
                                             content: html,
                                             // 广播内容设置
                                             width: 300,
                                             height: 100,
                                             close: true
                                         }); 
               }
            }
            
            
              

        },
        reg: function(c, v, e, m) {
            if (v.test(e.val())) {
                dc.valid.show(e, c, m, true);
                return true;
            } else {
                dc.valid.show(e, c, m, false);
                return false;
            }
        },
        speCha: function(p, e) {
            if (!e.attr('vcharacter') && p.characters) {
                for (var c = 0,
                cl = p.characters.length; c < cl; c++) {
                    if (e.val().indexOf(p.characters.charAt(c)) > -1) {
                        dc.valid.show(e, p, $.i18n('vld-special') + '(< > | \\)', false);
                        return true;
                    }
                }
            }
            return false;
        },
        rule: function(c, e, t) {
        	var va=$.trim(e[0].value);
        	var vmasg= e.attr('vmsg');
            if (c.trim) {
                e.val(va);
            }
            if (c["visible"] && e.is(':hidden')) return true;
            switch (t.toLowerCase()) {
            case 'empty':
                if (dc.valid.speCha(c, e)) {
                    return false;
                }
                dc.valid.show(e, c, (vmasg ? vmasg : $.i18n('vld-empty')),va.length > 0);
                return e.val().length > 0;
                break;
            case 'email':
                return dc.valid.reg(c,  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(?:com|cn|net)$/, e, (vmasg ? vmasg : $.i18n('vld-email')));
                break;
            case 'number':
                dc.valid.show(e, c, (vmasg ? vmasg : $.i18n('vld-number')), va.length > 0 ? !isNaN(va) : false);
                return va.length > 0 ? !isNaN(va) : false;
                break;
            case 'pnumber':
                return dc.valid.reg(c, /(^(0|[1-9][0-9]*)$)|(^[0-9]+((.[0-9]{2})|(.[0-9]{1}))?$)/, e, (vmasg ? vmasg : $.i18n('vld-pnumber')));
                break;
            case 'integer':
                return dc.valid.reg(c, /^[-\+]?\d+$/, e, (vmasg ? vmasg : $.i18n('vld-integer')));
                break;
            case 'pinteger':
                return dc.valid.reg(c, /^[1-9]{1}[\d]*$/, e, (vmasg ? vmasg : $.i18n('vld-pinteger')));
                break;
            case 'double':
                return dc.valid.reg(c, /^[-\+]?\d+(\.\d+)?$/, e, (vmasg ? vmasg : $.i18n('vld-double')));
                break;
            case 'english':
                if (dc.valid.speCha(c, e)) {
                    return false;
                }
                return dc.valid.reg(c, /^(([a-z]+\s*)|(\s+[a-z]+))[a-z\s]*$/i, e, (vmasg ? vmasg : $.i18n('vld-english')));
                break;
            case 'chinese':
                if (dc.valid.speCha(c, e)) {
                    return false;
                }
                return dc.valid.reg(c, /^[\u0391-\uFFE5]+$/, e, (vmasg ? vmasg : $.i18n('vld-chinese')));
                break;
            case 'phone':
                return true;
                break;
            case 'mobile':
                return dc.valid.reg(c, /^((\(\d{3}\))|(\d{3}\-))?1[358]\d{9}$/, e, (vmasg ? vmasg : $.i18n('vld-mobile')));
                break;
            case 'qq':
                return dc.valid.reg(c, /^[1-9]\d{4,8}$/, e, (vmasg ? vmasg : 'QQ' + $.i18n('vld-qq')));
                break;
            case 'zip':
                return dc.valid.reg(c, /^[1-9]\d{5}$/, e, (vmasg ? vmasg : $.i18n('vld-zip')));
                break;
            case 'hour':
                return dc.valid.reg(c, /^([0-1]\d|[2][0-3])\:([0-5]\d)$/, e, (vmasg ? vmasg : $.i18n('vld-hour')));
                break;
            default:
                return false;
            }
        },
        length: function(c) {
            var k = function(o) {
                if (o.val().length >= o.attr('maxlength')) {
                    o.val(o.val().substring(0, o.attr('maxlength')));
                }
            };
            $('textarea[maxlength]', c.obj).each(function() {
                $(this).keydown(function() {
                    k($(this));
                }).blur(function() {
                    k($(this));
                });
            });
        },
        valid: function(c) {  
            var els = c.obj.find("[vtype]");
            var vt;
            for (var i = 0; i < els.length; i++) {      
            	var items=$(els[i]);
            	var va=$.trim(items[0].value);
                vt = items.attr('vtype');
                vt = vt.split(',');
                if (c.trim) {
                	items.val(va);
                }
                for (var v = 0; v < vt.length; v++) {
                    if ('empty' == vt[v] || va.length > 0) {
                        if (!dc.valid.rule(c, items, vt[v])) { 
                            if (c.obj.data('sub')) {
                            	items.focus().blur();
                                c.obj.removeData('sub');
                            }
                            return false;
                        }
                    } else {
                        $(items.removeData('vtip').nextAll('.dicValid')[0]).remove();
                    }
                } 
            } 
            return true;
        },
        field: function(c) { 
            if (c.fields) {
                var bolean;
                var eo, el;
                for (var i = 0; i < c.fields.length; i++) {
                    eo = c.fields[i];
                    el = $('#' + eo.id);
                    if (c.trim) {
                        el.val($.trim(el[0].value));
                    }
                    if (eo.reg) {
                        if (!dc.valid.reg(c, eo.reg, el, eo.msg)) {
                            if (c.obj.data('sub')) {
                                el.focus().blur();
                                c.obj.removeData('sub');
                            }
                            return false;
                        }
                    } else {
                        el.data('vmsg', eo.msg);
                        bolean = eo.cond(el,
                        function(msg) {
                            el.data('vmsg', msg);
                        });
                        dc.valid.show(el, c, el.data('vmsg'), bolean);
                        if (!bolean) {
                            if (c.obj.data('sub')) {
                                el.focus().blur();
                                c.obj.removeData('sub');
                            }
                            return false;
                        }
                    }
                }
            }
         
            return true;
        },
        clean: function(c) {
            $('.dicValid', c.obj).remove();
            $.each(c.obj[0].elements,
            function(i, o) {
                $(o).removeData('vtip').removeAttr('title').css({
                    backgroundColor: ''
                });
            });
        },
        vblur: function(c) {
            var vt;
            $.each(c.obj.find("[vtype]"),
            function(i, o) {
                vt = $(o).attr('vtype');

                if ($(o).hasClass('inp-date')) {
                    $(o).data('dateValid', true);
                } else {
                    $(o).data('vt', vt.split(',')).blur(function() {
                        if (c.trim) {
                            $(o).val($.trim($(o)[0].value));
                        }
                        vt = $(o).data('vt');
                        for (var v = 0; v < vt.length; v++) {
                            if ('empty' == vt[v] || $(o).val().length > 0) {
                                if (!dc.valid.rule(c, $(o), vt[v])) {
                                    c.vFailFun($(o));
                                    break;
                                }
                            } else {
                                $($(o).removeData('vtip').nextAll('.dicValid')[0]).remove();
                            }
                        }
                    });
                }

            });
            if (c.fields) {
                var el;
                $.each(c.fields,
                function(i, o) {
                    $('#' + o.id).blur(function() {
                        el = $('#' + o.id);
                        if (c.trim) {
                            el.val($.trim(el[0].value));
                        }
                        if (o.reg) {
                            dc.valid.reg(c, o.reg, el, o.msg);
                        } else {
                            el.data('vmsg', o.msg);
                            var cond = o.cond(el,
                            function(msg) {
                                el.data('vmsg', msg);
                            });
                            dc.valid.show(el, c, el.data('vmsg'), cond);
                        }
                    });
                });
            }
        },
        submit: function(c) { 
       		 return dc.valid.valid(c) && dc.valid.field(c);            
        },
        load: function(c) { 
            var f = dc.tool.qq(this.qq, this.opt, c),
            id = f.data('id'),
            p = f.data('cfg');
            this.length(p); 
            if (p.focus) {
                this.vblur(p);
            }
            var sub = p.obj[0].onsubmit;
            var clk = [];
            if (sub) {
                p.obj[0].onsubmit = null;
            }
            if (p.subBtn) {
                if (!$.isArray(p.subBtn)) {
                    p.subBtn = [p.subBtn];
                    if (p.funBtn) {
                        p.funBtn = [p.funBtn];
                    }
                }
                $.each(p.subBtn,
                function(i, b) {
                    if (p.funBtn) {
                        clk[clk.length] = p.funBtn[i];
                    } else {
                        if (b[0].onclick) {
                            clk[clk.length] = b[0].onclick;
                        } else if (b.data('events') && b.data('events')['click']) {
                            clk[clk.length] = b.data('events')['click'][0].handler;
                        }
                    }
                    if (clk[clk.length - 1]) {
                        b[0].onclick = null;
                        b.unbind('click');
                    }
                    if ('submit' != b.attr('type')) {
                        b.click(function() {
                            p.obj.trigger('submit', [i]);
                        });
                    }
                });
            }
            p.obj.submit(function(e, n) {
                p.obj.data('sub', true);
                if (dc.valid.submit(p)) {
                    if (sub) {
                        if (sub()) {
                            if (clk[n]) {
                                clk[n]();
                                return false;
                            }
                        } else {
                            return false;
                        }
                    } else {
                        if (clk[n]) {
                            clk[n]();
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            }).bind('reset',
            function() {
                dc.valid.clean(p);
            }); 
            return {
                showMsg: function(e, m, b) {
                    dc.valid.show(e, c, m, b);
                },
                addBlur: function(i) {
                    var e = 'object' == typeof(i) ? $(i) : $('#' + i);
                    var t = e.attr('vtype');
                    if (t) {
                        if (e.hasClass('inp-date')) {
                            e.data('dateValid', true);
                        } else {
                            e.data('vt', t.split(',')).unbind('blur').blur(function() {
                                if (c.trim) {
                                    e.val($.trim(e[0].value));
                                }
                                t = e.data('vt');
                                for (var v = 0; v < t.length; v++) {
                                    if ('empty' == t[v] || e.val().length > 0) {
                                        if (!dc.valid.rule(p, e, t[v])) {
                                            p.vFailFun(e);
                                            break;
                                        }
                                    } else {
                                        $(e.removeData('vtip').nextAll('.dicValid')[0]).remove();
                                    }
                                }
                            });
                        }
                    }
                }
            };
           
        }       
    },
    dc.win = {
        opt: {
            title: '',
            width: 600,
            height: 400,
            left: -1,
            top: -1,
            drag: false,
            modal: true,
            opacity: 1,
            clean: false,
            closable: true,
            beforeClose: function() {},
            close: function() {}
        },
        qq: [[], []],
        load: function(cfg) {
            var isUrl = false;
            var wid = $.dicId(),
            cdiv,
            sameDoc;
            if ((!cfg.obj || 'object' != typeof(cfg.obj))) {
                if ('string' == typeof(cfg.content)) {
                    cfg.obj = $({}).data('content', cfg.content);
                } else if ('object' == typeof(cfg.content)) {
                    cdiv = cfg.content[0].ownerDocument.createElement('div');
                    cfg.content.before(cdiv);
                    cfg.obj = cfg.content.data('curDis', cfg.content.css('display')).css({
                        display: 'block'
                    });
                    sameDoc = cfg.obj[0].ownerDocument == document.body.ownerDocument;
                } else {
                    isUrl = true;
                    var src;
                    if ('string' == typeof(cfg.url)) {
                        src = ' src = "' + cfg.url + '"';
                    } else {
                        cfg.param = cfg.url.param ? cfg.url.param: null;
                        cfg.load = cfg.url.load ? cfg.url.load: null;
                        cfg.frmId = cfg.url.frmId ? cfg.url.frmId: null;
                        cfg.frmName = cfg.url.frmName ? cfg.url.frmName: null;
                        cfg.url = cfg.url.url ? cfg.url.url: null;
                        src = ' src = "' + (cfg.param ? '': cfg.url) + '"';
                        src = ie || ff ? src: (cfg.param ? '': src);
                    }
                    cfg.obj = $({}).data('content', '<iframe' + src + (cfg.frmId ? ' id = "' + cfg.frmId + '"': '') + (cfg.frmName ? ' name = "' + cfg.frmName + '"': '') + ' frameborder = "0" scrolling = "yes" width = "100%" height = "100%"/><div/>');
                }
            }
            var oWin = dc.tool.qq(this.qq, this.opt, cfg);
            var reId = oWin.data('id');
            var id = 'dic' + reId;
            var opt = oWin.data('cfg');
            var blk;
            if (opt.modal) {
                blk = dc.blocker.load({
                    context: opt.context
                });
            }
            var container = opt.modal ? blk.cnt: dcBd;
            container.append('<div id = "' + id + '" class = "window100-side4"><div id = "' + id + '_titleBar"></div><div id = "' + id + '_content"></div>');
            var reWin = {},
            win = $('#' + id).hide().css({
                position: 'relative',
                left: 0,
                top: 0,
                width: opt.width,
                height: opt.height,
                opacity: opt.opacity
            });
            if (!opt.modal) {
                if (ie6) {
                    container.append('<iframe id = "' + id + 'Frm" frameborder = "0"></iframe>');
                    $('#' + id + 'Frm').css({
                        position: 'absolute',
                        opacity: opt.opacity,
                        zIndex: $.dicZid()
                    });
                }
                opt.left = (opt.left > 0) ? opt.left: ((dic_W < win.width()) ? 0 : (dic_W - win.width()) / 2);
                opt.top = (opt.top > 0) ? opt.top: (((dicH < win.height()) ? 0 : (dicH - win.height()) / 2) + $(document).scrollTop());
                win.css({
                    position: 'absolute',
                    zIndex: $.dicZid(),
                    left: opt.left,
                    top: opt.top
                });
                if (ie6) {
                    $('#' + id + 'Frm').css({
                        width: opt.width,
                        height: opt.height,
                        left: opt.left,
                        top: opt.top
                    });
                }
            }
            var titleBar = $('#' + id + '_titleBar').css({
                position: 'relative',
                overflow: 'hidden',
                width: opt.width,
                height: '28px'
            }).append('<div id = "' + id + '_title"></div><div id = "' + id + '_close"></div>');
            var title = $('#' + id + '_title').css({
                position: 'relative',
                top: 0
            }).addClass('window-top').html('<div style = "overflow:hidden;width:' + (opt.width - 40) + 'px;height:27px;font-weight:bold;font-size:13px">&nbsp;' + opt.title + '</div>');
            var close = $('#' + id + '_close').css({
                position: 'absolute',
                top: 3,
                right: 10,
                cursor: 'pointer'
            }).html('<img ' + (opt.closable ? '': 'style = "display:none"') + ' src = "' + dicPath + 'ico-close.gif"/>').click(function() {
                opt.beforeClose();
                dc.win.qq[0] = $.grep(dc.win.qq[0],
                function(cur, i) {
                    return reId == cur[i];
                });
                dc.win.qq[1] = $.grep(dc.win.qq[1],
                function(cur, i) {
                    return oWin == cur[i];
                });
                if (!opt.obj.data('content') && cdiv) {
                    if (sameDoc || ie8 || ff || opera) {
                        $(cdiv).after(cfg.content).remove();
                    } else if (safari) {
                        cfg.content.css({
                            display: 'none'
                        });
                        cdiv.ownerDocument.adoptNode(cfg.content[0]);
                        cdiv.parentNode.insertBefore(cfg.content[0], cdiv.nextSibling);
                        $(cdiv).remove();
                    }
                    cfg.content.css({
                        display: cfg.content.data('curDis')
                    });
                }
                var  objs= $('#' + id); 
//                if ('string' == typeof(cfg.url)) {
//                var iframe =objs.find('iframe')[0].contentWindow; 
//                 iframe.document.write(''); 
//                 iframe.document.clear(); 
//                }
                if (opt.modal) {
                    blk.close();
                } else {    
                    objs.remove();
                    if (ie6) {
                        $('#' + id + 'Frm').remove();
                    }
                }
                dc.tool.focus(opt.context);
                opt.close();
            });
            var content = $('#' + id + '_content').css({
                position: 'relative',
                margin: '10px',
                overflow: (opt.url) ? '': 'auto',
                width: win.width() - 20,
                height: win.height() - 40 - title.height()
            });
            if (opt.obj.data('content')) {
                content.append(opt.obj.data('content'));
                var ifrm;
                if (isUrl && cfg.param) {
                    var initForm = function(id, url, param) {
                        var form = [];
                        form.push('<form id = "' + id + 'Form" method = "post" action = "' + url + '">');
                        for (var f in param) {
                            if ($.isArray(param[f])) {
                                for (var z = 0,
                                zl = param[f].length; z < zl; z++) {
                                    if ($.isArray(param[f][z])) {
                                        for (var z1 = 0,
                                        zl1 = param[f][z].length; z1 < zl1; z1++) {
                                            form.push('<input type = "hidden" name = "' + f + '" value = "' + param[f][z][z1] + '"/>');
                                        }
                                    } else {
                                        form.push('<input type = "hidden" name = "' + f + '" value = "' + param[f][z] + '"/>');
                                    }
                                }
                            } else {
                                form.push('<input type = "hidden" name = "' + f + '" value = "' + param[f] + '"/>');
                            }
                        }
                        form.push('</form>');
                        return form.join('');
                    };
                    ifrm = $($('iframe', content)[0]);
                    if (ie || ff) {
                        ifrm.one('load.win',
                        function() {
                            ifrm.one('load.win',
                            function() {
                                if (opt.load) {
                                    opt.load(reWin, ifrm[0].contentWindow);
                                }
                            });
                            $(ifrm[0].contentWindow.document.body).append(initForm(id, opt.url, opt.param));
                            ifrm[0].contentWindow.document.getElementById(id + 'Form').submit();
                        });
                    } else {
                        ifrm.one('load.win',
                        function() {
                            if (opt.load) {
                                opt.load(reWin, ifrm[0].contentWindow);
                            }
                        });
                        $(ifrm[0].contentWindow.document.body).append(initForm(id, opt.url, opt.param));
                        ifrm[0].contentWindow.document.getElementById(id + 'Form').submit();
                    }
                } else {
                    ifrm = $($('iframe', content)[0]);
                    ifrm.one('load.win',
                    function() {
                        if (opt.load) {
                            opt.load(reWin, ifrm[0].contentWindow);
                        }
                    });
                }
            } else {
                if (sameDoc || ie8 || ff || opera) {
                    content.append(opt.obj);
                } else {
                    if (safari) {
                        content.append(content[0].ownerDocument.adoptNode(opt.obj[0]));
                    } else {
                        var se = function(n, m) {
                            var evs = n.ownerDocument.parentWindow.$(n).data('events');
                            for (var i in evs) {
                                $(m).bind(i, evs[i][0].handler);
                            }
                        };
                        var fn = function(n, m) {
                            var len = n.childNodes ? n.childNodes.length: 0;
                            if (len > 0) {
                                for (var i = 0; i < len && len > 0; i++) {
                                    if (1 == n.childNodes[i].nodeType) {
                                        se(n.childNodes[i], m.childNodes[i]);
                                    }
                                }
                            }
                        };
                        content.append(opt.obj.hide().html());
                        fn(opt.obj[0], content[0]);
                    }
                }
            }
            if (ie) {
                if (isUrl) {
                    var ifm = $('iframe', content)[0];
                    ifm.onreadystatechange = function() {
                        if (ifm.readyState == "complete") {
                            var i = $.dicId();
                            dcBd.append('<iframe id = "' + i + '" style = "width:0;height:0;display:none"></iframe>');
                            try {
                                $('#' + i).attr('src', dicPath + 'space.gif').remove();
                            } catch(e) {}
                        }
                    };
                }
            }
            if (ie6) {
                var fixSel = function(ctn, par) {
                    var sels = $('select', par);
                    ctn.scroll(function() {
                        if ('none' != sels.css('display')) {
                            sels.hide();
                            sels.show();
                        }
                    });
                };
                if (isUrl) {
                    var timer;
                    var fix = function() {
                        var pWin = $($('iframe', content)[0].contentWindow);
                        if (pWin) {
                            fixSel(pWin, $('iframe', content).contents());
                            clearInterval(timer);
                        }
                    };
                    timer = setInterval(fix, 333);
                } else {
                    fixSel(content, dcBd);
                }
            }
            if (opt.drag) {
                titleBar.css({
                    cursor: 'move'
                });
                win.data('modal', opt.modal).dicDrag({
                    handle: titleBar,
                    context: opt.context,
                    clean: opt.clean
                });
            }
            if (opt.modal) {
                dc.sizer.run();
            }
            win.show();
            if (opt.modal) {
                dc.tool.focus(titleBar);
            }

            reWin.id = reId;
            reWin.window = opt.url ? $('iframe', content)[0].contentWindow: window;
            reWin.document = reWin.window.document;
            reWin.close = function() {
                close.click();
            };
            reWin.show = function() {
                $('#dic' + reId).css({
                    visibility: 'visible'
                });
            };
            reWin.hide = function() {
                $('#dic' + reId).css({
                    visibility: 'hidden'
                });
            };
            reWin.resize = function(w, h) {
                win.css({
                    width: w,
                    height: h
                });
                titleBar.css({
                    width: w
                });
                content.css({
                    width: w - 20,
                    height: h - 20 - title.height()
                });
                win.css({
                    left: (dic_W < w) ? 0 : (dic_W - w) / 2,
                    top: ((dicH < h) ? 0 : (dicH - h) / 2) + $(document).scrollTop()
                });
            };
            reWin.title = function(s) {
                $('div', title).html(s);
            };
            return reWin;
        }
    },
    dc.zid = {
        id: 10000,
        cal: function() {
            this.id++;
        },
        get: function() {
            this.cal();
            return this.id;
        }
    }
})(tydic, jQuery);

(function($) {
    $.dicId = function() {
        return tydic.id.get();
    };
    $.dicZid = function() {
        return tydic.zid.get();
    };
    $.dicFormJson = function(f) {
        return tydic.tool.formJson(f);
    };
    $.dicBeforeResize = function(f) {
        tydic.sizer.before = f;
    };
    $.dicAddResize = function(fs) {
        tydic.sizer.add(fs);
    };
    $.dicAfterResize = function(f) {
        tydic.sizer.after = f;
    };
    $.postJSON = function(c) {
        var isMul = false;
        if (c.form) {
            c.form = 'object' != typeof(c.form) ? $('#' + c.form) : $(c.form);
            isMul = -1 < c.form[0].enctype.toLowerCase().indexOf('multipart');
            c.data = isMul ? {}: $.extend(true, $.dicFormJson(c.form), c.data || {});
        }
        if (isMul) {
            var id = $.dicId(),
            frm;
            if (c.url) {
                c.form.attr('action', c.url);
            }
            c.form.attr('method', 'post').after('<iframe id = "tar' + id + '" name = "tar' + id + '" style = "width:0;height:0;display:none"></iframe>');
            frm = $('#tar' + id).one('load.file',
            function() {
                var s = $('#tar' + id).contents().find('pre').html();
                eval('s=' + s + ';');
                c.form.removeAttr('target');
                $('#tar' + id).remove();
                c.success(s);
            });
            c.form.attr('target', 'tar' + id);
            c.form.submit();
        } else {
            $.ajax({
                type: "POST",
                url: c.url,
                data: c.data,
                success: function(data) {
                    c.success(data);
                },
                dataType: "json"
            });
        }
    };
    $.getRegional = function() {
        return tydic.lang.regional;
    };
    $.setRegional = function(r) {
        r = r.toLowerCase().replaceAll('_', '-');
        tydic.lang.regional = tydic.lang.res[r] ? r: 'zh-cn';
    };
    $.dicRegional = function() {
        tydic.lang.update();
    };
    $.i18n = function(s) {
        return tydic.lang.i18n(s);
    };
    $.dicLang = function(r) {
        tydic.lang.res = $.extend(true, tydic.lang.res, r);
    };
    $.getCookie = function(n) {
        return tydic.cookie(n);
    };
    $.setCookie = function(n, v, c) {
        tydic.cookie(n, v, c);
    };
    $.delCookie = function(n) {
        tydic.cookie(n, null);
    };

    $.dicAdd = function(w, i) {
        return tydic.tool.add(w, i);
    };
    $.dicNoMenu = function(os) {
        return tydic.tool.unMenu(os);
    };
    $.fn.dicNoMenu = function() {
        return $.dicNoMenu($(this));
    };
    $.dicNoCopy = function(os) {
        return tydic.tool.unSelect(os);
    };
    $.fn.dicNoCopy = function() {
        return $.dicNoCopy($(this));
    };
    $.dicDrag = function(c) {
        return tydic.drager.run(c);
    };
    $.fn.dicDrag = function(c) {
        c = $.extend({},
        c, {
            obj: $(this)
        });
        return $.dicDrag(c);
    };
    $.dicDrawer = function(c) {
        return tydic.drawer.load(c);
    };
    $.fn.dicDrawer = function(c) {
        c = $.extend({},
        {
            target: c
        },
        {
            src: $(this)
        });
        return $.dicDrawer(c);
    };
    $.dicDDSelect = function(c) {
        return tydic.ddsel.load(c);
    };
    $.fn.dicDDSelect = function(c) {
        c = $.extend({},
        c, {
            obj: $(this)
        });
        return $.dicDDSelect(c);
    };
    $.dicPanel = function(c) {
        return tydic.panel.load(c);
    };
    $.fn.dicPanel = function(c) {
        c = $.extend({},
        c, {
            obj: $(this)
        });
        return $.dicPanel(c);
    };
    $.dicTips = function(c) {
        return tydic.tips.load(c);
    };
    $.fn.dicTips = function(c) {
        c = $.extend({},
        c, {
            obj: $(this)
        });
        return $.dicTips(c);
    };
    $.dicScroll = function(c) {
        return tydic.scroll.load(c);
    };
    $.fn.dicScroll = function(c) {
        c = $.extend({},
        c, {
            obj: $(this)
        });
        return $.dicScroll(c);
    };
    $.dicWin = function(c) {
        return tydic.win.load(c);
    };
    $.fn.dicWin = function(c) {
        c = $.extend({},
        c, {
            obj: $(this)
        });
        return $.dicWin(c);
    };
    $.dicBox = function(c) {
        return tydic.box.load(c);
    };
    $.fn.dicBox = function(c) {
        c = $.extend({},
        c, {
            obj: $(this)
        });
        return $.dicBox(c);
    };
    $.dicTab = function(c) {
        return tydic.tab.load(c);
    };
    $.fn.dicTab = function(c) {
        c = $.extend({},
        c, {
            obj: $(this)
        });
        return $.dicTab(c);
    };
    $.dicBubble = function(c) {
        return tydic.bubble.load(c);
    };
    $.fn.dicBubble = function(c) {
        c = $.extend({},
        c, {
            obj: $(this)
        });
        return $.dicBubble(c);
    };
    $.dicProgress = function(c) {
        return tydic.progress.load(c);
    };
    $.fn.dicProgress = function(c) {
        c = $.extend({},
        c, {
            context: $(this)
        });
        return $.dicProgress(c);
    };
    $.dicCombo = function(c) {
        return tydic.combo.load(c);
    };
    $.fn.dicCombo = function(c) {
        c = $.extend({},
        c, {
            obj: $(this)
        });
        return $.dicCombo(c);
    };
    $.dicTable = function(c) {
        return tydic.table.load(c);
    };
    $.fn.dicTable = function(c) {
        c = $.extend({},
        c, {
            obj: $(this)
        });
        return $.dicTable(c);
    };
    $.dicMenu = function(c) {
        return tydic.menu.load(c);
    };
    $.fn.dicMenu = function(c) {
        c = $.extend({},
        c, {
            obj: $(this)
        });
        return $.dicMenu(c);
    };
    $.dicValid = function(c) {
        return tydic.valid.load(c);
    };
    $.fn.dicValid = function(c) {
        c = $.extend({},
        c, {
            obj: $(this)
        });
        return $.dicValid(c);
    };
    $.dicTree = function(c) {
        return tydic.tree.load(c);
    };
    $.fn.dicTree = function(c) {
        c = $.extend({},
        c, {
            obj: $(this)
        });
        return $.dicTree(c);
    };
    $.dicCalendar = function(c) {
        return tydic.calendar.load(c);
    };
    $.fn.dicCalendar = function(c) {
        c = $.extend({},
        c, {
            obj: $(this)
        });
        return $.dicCalendar(c);
    };
    $.fn.remove=function( selector, keepData){   
     	    if (!selector || jQuery.filter(selector, [ this ]).length) {
    	        // Prevent memory leaks
    	        var item = $(this);
    	        var clearItem = $('#clear-use-memory');
    	        if (clearItem.length == 0) {
    	            jQuery('<div/>').hide().attr('id', 'clear-use-memory').appendTo('body');
    	            clearItem = jQuery('#clear-use-memory');
    	        }
    	        item.appendTo(clearItem);
    	        jQuery('*', clearItem).each(function (i, e) {
    	            (events = jQuery.data(this, 'events')) && jQuery.each(events, function (i, e1) {
    	                jQuery(e).unbind(i + '.*');
    	            });
    	            jQuery.event.remove(this);
    	            jQuery.removeData(this);
    	        });
    	        clearItem[0].innerHTML = '';
    	        item = null;
    	    } 
    };
})(jQuery);

jQuery(function($) {

    $.dicRegional();

    if (ie6) {
        try {
            document.execCommand('BackgroundImageCache', false, true);
        } catch(e) {}
    }

    dcBd = $('body');

    tydic.tool.sizing();

    $(window).resize(function() {
        if (dcT) {
            clearTimeout(dcT);
        }
        dcT = setTimeout(tydic.sizer.run, dcST);
    });
});