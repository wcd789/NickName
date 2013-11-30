/*---------------------------
 名称：nickName
 作者：weichengdong
 邮件: weichengdong2008@foxmail.com
 ---------------------------*/
(function ($) {
    /*---------------------------
     支持的html标签列表与type
     ---------------------------*/
    $.Type = {
        a:"a",
        p:"p",
        td:"td",
        th:"th",
        div: "div",
        span: "span",
        text: "text",
        reset: "reset",
        radio: "radio",
        image: "image",
        number: "number",
        submit: "submit",
        hidden: "hidden",
        button: "button",
        textarea: "textarea",
        password: "password",
        checkbox: "checkbox"
    };

    /*---------------------------
     通过指定属性（id，name）获取值json，包括自定义属性等
     ---------------------------*/
    $.fn.NickNameGetBy = function (attr) {
        return $.Getter(this,attr);
    };
    /*---------------------------
     获取包含属性为nickname的元素的值为json,是 $.fn.NickNameGetBy的一个特例
     ---------------------------*/
    $.fn.NickNameGet = function () {
        return $.Getter(this,"nickName");
    };

    $.Getter=function(that,attr){
        var jsonData = {};
        var nickElements = that.find("["+attr+"]");
        for (var i=0;i<nickElements.length;i++) {
            var nick = $(nickElements[i]);
            var type = nick.attr("type");
            if (type == null) {
                continue;
            }
            switch (type) {
                case $.Type.text:
                case $.Type.reset:
                case $.Type.number:
                case $.Type.submit:
                case $.Type.hidden:
                case $.Type.button:
                case $.Type.textarea:
                case $.Type.password:
                    jsonData[nick.attr(attr)] = nick.val();
                    break;
                case $.Type.radio:
                case $.Type.checkbox:
                    if( jsonData[nick.attr(attr)]==null){
                        jsonData[nick.attr(attr)]=[];
                    }
                    var obj={chk:nick.is(':checked'),val:nick.val()};
                    jsonData[nick.attr(attr)].push(obj);
                    break;
                case $.Type.image:
                    jsonData[nick.attr(attr)] =nick.attr("src");
                    break;
                case $.Type.p:
                case $.Type.td:
                case $.Type.th:
                case $.Type.div:
                case $.Type.span:
                    jsonData[nick.attr(attr)] = nick.text();
                    break;
                case $.Type.a:
                    jsonData[nick.attr(attr)] ={href: nick.attr("href"),text: nick.text()};
                    nick.attr("href", jsonData[nick.attr(attr)].href);
                    break;
                default:
                    jsonData[nick.attr(attr)]= nick.val();
            }
        }
        return jsonData;
    }

    /*---------------------------
     把json值设置在指定属性的元素上
     ---------------------------*/
    $.fn.NickNameSetBy = function (attr,jsonData) {
        $.Setter(this,jsonData,attr);
        return this;
    };

    /*---------------------------
     把json值设置在属性为nickname的元素上，是$.fn.NickNameSetBy的一个特例
     ---------------------------*/
    $.fn.NickNameSet = function (jsonData) {
        $.Setter(this,jsonData,"nickName");
        return this;
    };

    $.Setter=function(that,jsonData,attr){
        for (var objKey in jsonData) {
            var nickElements = that.find("["+attr+"=" + objKey + "]");
            if (nickElements == null) {
                continue;
            }
            for(var i=0;i<nickElements.length;i++){
                var nick=$(nickElements[i]);
                var type=nick.attr("type");
                if (type == null) {
                    continue;
                }
                switch (type) {
                    case $.Type.text:
                    case $.Type.reset:
                    case $.Type.number:
                    case $.Type.submit:
                    case $.Type.hidden:
                    case $.Type.button:
                    case $.Type.textarea:
                    case $.Type.password:
                        nick.val(jsonData[nick.attr(attr)]);
                        break;
                    case $.Type.radio:
                    case $.Type.checkbox://设置值为value的元素被选中
                        nick.attr("checked",jsonData[nick.attr(attr)][i].chk);
                        nick.val(jsonData[nick.attr(attr)][i].val);
                        break;
                    case $.Type.image:
                        nick.attr("src", jsonData[nick.attr(attr)]);
                        break;
                    case $.Type.p:
                    case $.Type.td:
                    case $.Type.th:
                    case $.Type.div:
                    case $.Type.span:
                        nick.text(jsonData[nick.attr(attr)]);
                        break;
                    case $.Type.a:
                        nick.attr("href", jsonData[nick.attr(attr)].href);
                        nick.text(jsonData[nick.attr(attr)].text ||nick.text());
                        break;
                    default:
                        nick.val(jsonData[nick.attr(attr)]);
                }
            }
        }
    }
})(jQuery);