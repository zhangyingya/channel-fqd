function iColorShow(d, t, func) {
    _id = d;
    var e = jQuery("#" + t).offset(),
        r = jQuery("#" + t);

    jQuery("#iColorPicker,#icp_iframe").css({
        top: e.top + jQuery("#" + d).outerHeight() + 4 + "px",
        left: e.left - 110 + "px",
        position: "absolute",
        "z-index": 1e3
    }).fadeIn("fast"), -[1] || window.XMLHttpRequest ? jQuery("#iColorPickerBg").css({
        position: "fixed",
        top: 0,
        left: 0,
        "z-index": 99,
        width: "100%",
        height: "100%"
    }).fadeIn("fast") : (jQuery("body,html").css({
        height: "100%",
        width: "100%",
        position: "relative"
    }), jQuery("#iColorPickerBg").css({
        position: "absolute",
        top: 0,
        left: 0,
        "z-index": 99,
        width: "100%",
        height: "100%"
    }).fadeIn("fast"));
    var o = jQuery("#" + d).val();
    jQuery("#colorPreview").css("background", o), jQuery("#color").val(o);
    var c = jQuery("#iColorPicker");
    for (tempColor = null, jQuery("#colorPreview").find("input").eq(0).val(o), i = 0; i < c.length; i++) {
        var a = document.getElementById("hexSection" + i),
            l = a.childNodes,
            n = l.length;
        for (j = 0; n > j; j++) {
            var s = l[j].childNodes,
                u = s.length;
            for (k = 0; u > k; k++) jQuery(l[j].childNodes[k]).unbind().mouseover(function () {
                if (!tempColor) {
                    var d = "#" + jQuery(this).attr("hx");
                    jQuery("#colorPreview").css("background", d), jQuery("#colorPreview").find("input").eq(0).val(d), $("#delheadcolor").css("display", "")
                }
            }), jQuery(l[j].childNodes[k]).click(function () {
                var d = "#" + jQuery(this).attr("hx");
                tempColor = d, 
                "fgcolor" == _id ? (setcolor("fg", tempColor,func), 
                jQuery("#iColorPickerBg").hide(), 
                $("#colorvalue").val(tempColor), 
                $("#resetFgColor").css("display", "inline-block"), 
                jQuery("#colorPreview input").val(tempColor), 
                jQuery("#iColorPicker,#icp_iframe").fadeOut()) : "bggcolor" == _id ? ($("#colorvalue1").val(tempColor), setcolor("bg", tempColor,func), $("#resetBgColor").css("display", "inline-block"), jQuery("#iColorPickerBg").hide(), jQuery("#iColorPicker,#icp_iframe").fadeOut()) : ($("#colorvalue2").val(tempColor), setcolor("my", tempColor), jQuery("#iColorPickerBg").hide(), $("#resetMyColor").css("display", "inline-block"), jQuery("#iColorPicker,#icp_iframe").fadeOut()), $("#" + _id).val(tempColor), r.css("background-color", tempColor).val(tempColor)
            })
        }
    }
    jQuery("#colorPreview a").click(function () {
        var d = jQuery("#" + _id).val();
        $("#" + _id).val(d), $("#icp_" + _id).css("background-color", d).val(d), "fgcolor" == _id ? setcolor("fg", d,func) : setcolor("bg", d,func), jQuery("#iColorPickerBg").hide(), jQuery("#iColorPicker,#icp_iframe").fadeOut()
    }), jQuery("#colorPreview input").keyup(function () {
        var d = $(this).val();
        d.match(/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/) && (jQuery("#colorPreview").css("background", d), jQuery("#" + _id).val(d).css("background", d))
    }).keydown(function (d) {
        return !String.fromCharCode(d.which).match(/[^#0-9A-F\b\x25\x27\x60a-k]/)
    })
}
var tempColor = null,
    _id = null;
this.iColorPicker = function () {
    jQuery("input.iColorPicker").each(function (d) {
        if (0 == d) {
            var t = '<table class="pickerTable" id="pickerTable0">';
            t += '<thead id="hexSection0"><tr>', t += '<td style="background:#ff0000;" hx="ff0000"></td>', t += '<td style="background:#ffff00" hx="ffff00"></td>', t += '<td style="background:#00ff00" hx="00ff00"></td>', t += '<td style="background:#00ffff" hx="00ffff"></td>', t += '<td style="background:#0000ff" hx="0000ff"></td>', t += '<td style="background:#ff00ff" hx="ff00ff"></td>', t += '<td style="background:#ffffff" hx="ffffff"></td>', t += '<td style="background:#ebebeb" hx="ebebeb"></td>', t += '<td style="background:#e1e1e1" hx="e1e1e1"></td>', t += '<td style="background:#d7d7d7" hx="d7d7d7"></td>', t += '<td style="background:#cccccc" hx="cccccc"></td>', t += '<td style="background:#c2c2c2" hx="c2c2c2"></td>', t += '<td style="background:#b7b7b7" hx="b7b7b7"></td>', t += '<td style="background:#acacac" hx="acacac"></td>', t += '<td style="background:#a0a0a0" hx="a0a0a0"></td>', t += '<td style="background:#959595" hx="959595"></td>', t += "</tr><tr>", t += '<td style="background:#ee1d24" hx="ee1d24"></td>', t += '<td style="background:#fff100" hx="fff100"></td>', t += '<td style="background:#00a650" hx="00a650"></td>', t += '<td style="background:#00aeef" hx="00aeef"></td>', t += '<td style="background:#2f3192" hx="2f3192"></td>', t += '<td style="background:#ed008c" hx="ed008c"></td>', t += '<td style="background:#898989" hx="898989"></td>', t += '<td style="background:#7d7d7d" hx="7d7d7d"></td>', t += '<td style="background:#707070" hx="707070"></td>', t += '<td style="background:#626262" hx="626262"></td>', t += '<td style="background:#555555" hx="555555"></td>', t += '<td style="background:#464646" hx="464646"></td>', t += '<td style="background:#363636" hx="363636"></td>', t += '<td style="background:#262626" hx="262626"></td>', t += '<td style="background:#111111" hx="111111"></td>', t += '<td style="background:#000000" hx="000000"></td>', t += "</tr><tr>", t += '<td style="background:#f7977a" hx="f7977a"></td>', t += '<td style="background:#fbad82" hx="fbad82"></td>', t += '<td style="background:#fdc68c" hx="fdc68c"></td>', t += '<td style="background:#fff799" hx="fff799"></td>', t += '<td style="background:#c6df9c" hx="c6df9c"></td>', t += '<td style="background:#a4d49d" hx="a4d49d"></td>', t += '<td style="background:#81ca9d" hx="81ca9d"></td>', t += '<td style="background:#7bcdc9" hx="7bcdc9"></td>', t += '<td style="background:#6ccff7" hx="6ccff7"></td>', t += '<td style="background:#7ca6d8" hx="7ca6d8"></td>', t += '<td style="background:#8293ca" hx="8293ca"></td>', t += '<td style="background:#8881be" hx="8881be"></td>', t += '<td style="background:#a286bd" hx="a286bd"></td>', t += '<td style="background:#bc8cbf" hx="bc8cbf"></td>', t += '<td style="background:#f49bc1" hx="f49bc1"></td>', t += '<td style="background:#f5999d" hx="f5999d"></td>', t += "</tr><tr>", t += '<td style="background:#f16c4d" hx="f16c4d"></td>', t += '<td style="background:#f68e54" hx="f68e54"></td>', t += '<td style="background:#fbaf5a" hx="fbaf5a"></td>', t += '<td style="background:#fff467" hx="fff467"></td>', t += '<td style="background:#acd372" hx="acd372"></td>', t += '<td style="background:#7dc473" hx="7dc473"></td>', t += '<td style="background:#39b778" hx="39b778"></td>', t += '<td style="background:#16bcb4" hx="16bcb4"></td>', t += '<td style="background:#00bff3" hx="00bff3"></td>', t += '<td style="background:#438ccb" hx="438ccb"></td>', t += '<td style="background:#5573b7" hx="5573b7"></td>', t += '<td style="background:#5e5ca7" hx="5e5ca7"></td>', t += '<td style="background:#855fa8" hx="855fa8"></td>', t += '<td style="background:#a763a9" hx="a763a9"></td>', t += '<td style="background:#ef6ea8" hx="ef6ea8"></td>', t += '<td style="background:#f16d7e" hx="f16d7e"></td>', t += "</tr><tr>", t += '<td style="background:#ee1d24" hx="ee1d24"></td>', t += '<td style="background:#f16522" hx="f16522"></td>', t += '<td style="background:#f7941d" hx="f7941d"></td>', t += '<td style="background:#fff100" hx="fff100"></td>', t += '<td style="background:#8fc63d" hx="8fc63d"></td>', t += '<td style="background:#37b44a" hx="37b44a"></td>', t += '<td style="background:#00a650" hx="00a650"></td>', t += '<td style="background:#00a99e" hx="00a99e"></td>', t += '<td style="background:#00aeef" hx="00aeef"></td>', t += '<td style="background:#0072bc" hx="0072bc"></td>', t += '<td style="background:#0054a5" hx="0054a5"></td>', t += '<td style="background:#2f3192" hx="2f3192"></td>', t += '<td style="background:#652c91" hx="652c91"></td>', t += '<td style="background:#91278f" hx="91278f"></td>', t += '<td style="background:#ed008c" hx="ed008c"></td>', t += '<td style="background:#ee105a" hx="ee105a"></td>', t += "</tr><tr>", t += '<td style="background:#9d0a0f" hx="9d0a0f"></td>', t += '<td style="background:#a1410d" hx="a1410d"></td>', t += '<td style="background:#a36209" hx="a36209"></td>', t += '<td style="background:#aba000" hx="aba000"></td>', t += '<td style="background:#588528" hx="588528"></td>', t += '<td style="background:#197b30" hx="197b30"></td>', t += '<td style="background:#007236" hx="007236"></td>', t += '<td style="background:#00736a" hx="00736a"></td>', t += '<td style="background:#0076a4" hx="0076a4"></td>', t += '<td style="background:#004a80" hx="004a80"></td>', t += '<td style="background:#003370" hx="003370"></td>', t += '<td style="background:#1d1363" hx="1d1363"></td>', t += '<td style="background:#450e61" hx="450e61"></td>', t += '<td style="background:#62055f" hx="62055f"></td>', t += '<td style="background:#9e005c" hx="9e005c"></td>', t += '<td style="background:#9d0039" hx="9d0039"></td>', t += "</tr><tr>", t += '<td style="background:#790000" hx="790000"></td>', t += '<td style="background:#7b3000" hx="7b3000"></td>', t += '<td style="background:#7c4900" hx="7c4900"></td>', t += '<td style="background:#827a00" hx="827a00"></td>', t += '<td style="background:#3e6617" hx="3e6617"></td>', t += '<td style="background:#045f20" hx="045f20"></td>', t += '<td style="background:#005824" hx="005824"></td>', t += '<td style="background:#005951" hx="005951"></td>', t += '<td style="background:#005b7e" hx="005b7e"></td>', t += '<td style="background:#003562" hx="003562"></td>', t += '<td style="background:#002056" hx="002056"></td>', t += '<td style="background:#0c004b" hx="0c004b"></td>', t += '<td style="background:#30004a" hx="30004a"></td>', t += '<td style="background:#4b0048" hx="4b0048"></td>', t += '<td style="background:#7a0045" hx="7a0045"></td>', t += '<td style="background:#7a0026" hx="7a0026"></td>', t += "</tr></thead>", t += '<tbody><tr><td style="border:1px solid #000;background:#fff;cursor:pointer;height:60px;-moz-background-clip:-moz-initial;-moz-background-origin:-moz-initial;-moz-background-inline-policy:-moz-initial;text-align:-ms-center;" colspan="16" align="center" id="colorPreview"><input id="icolortext" type="text" maxlength="7" size="8" style="color:#000;border:1px solid rgb(0, 0, 0);padding:5px;background-color:#fff;font:11px Arial, Helvetica, sans-serif;"/></td></tr></tbody></table>', t += "<style>#iColorPicker input{margin:2px}</style>", jQuery(document.createElement("div")).attr("id", "iColorPicker").css("display", "none").html(t).appendTo("body"), jQuery(document.createElement("div")).attr("id", "iColorPickerBg").click(function () {
                jQuery("#iColorPickerBg").hide(), jQuery("#" + _id).attr("data-color", tempColor), jQuery("#iColorPicker,#icp_iframe").fadeOut()
            }).appendTo("body"), jQuery("table.pickerTable td").css({
                width: "12px",
                height: "14px",
                border: "1px solid #000",
                cursor: "pointer"
            }), jQuery("#iColorPicker table.pickerTable").css({
                "border-collapse": "collapse"
            }), jQuery("#iColorPicker").css({
                border: "1px solid #ccc",
                background: "#333",
                padding: "5px",
                color: "#fff",
                "z-index": 9
            })
        }
        jQuery("#colorPreview").css({
            height: "50px"
        }), jQuery(this).css("backgroundColor", jQuery(this).val()).after('<div id="icp_' + this.id + '" class="colorPicker-picker cp" style="background-color:' + jQuery(this).val() + '" onclick="iColorShow(\'' + this.id + "','icp_" + this.id + "');return false;\"></div>")
    })
}, jQuery(function () {
    iColorPicker()
});
function setcolor(id,color,e){
    id = '#icp_' + id + 'color';
    $(id).css("background",color);
    if(e && e != undefined && e != null){
        e();
    }
}