var app = angular.module("app", []);
app.controller("ctrl", function($scope) {
    //$scope.myLists = ["你好", "B", "AA", "AAAA", "ABS", "A143", "A2XX", "ADFES", "Aqwe"];
    //
    $scope.myLists = [
    {"yourKey":{"aa":1}},
    {"yourKey":{"aa":2}},
    {"yourKey":{"aa":3}},
    {"yourKey":{"aa":4}},
    {"yourKey":{"aa":5}}];
    


    // $scope.myLists = [
    // {"yourKey":{"aa":{"aaa":1}}},
    // {"yourKey":{"aa":{"aaa":2}}},
    // {"yourKey":{"aa":{"aaa":3}}},
    // {"yourKey":{"aa":{"aaa":4}}},
    // {"yourKey":{"aa":{"aaa":5}}}];

    
    // $scope.myLists = [
    // {"yourKey":23,"name": "XX"},
    // {"yourKey":"dd","name": "XX"},
    // {"yourKey":"h12h","name": "XX"},
    // {"yourKey":"qwe","name": "XX"},
    // {"yourKey":"345","name": "XX"},
    // {"yourKey":"qqq","name": "XX"},
    // {"yourKey":"1111","name": "XX"},
    // {"yourKey":"323232","name": "XX"}];
    

    // $scope.myLists = [
    // {"yourKey":23},
    // {"yourKey":"dd"},
    // {"yourKey":"h12h"},
    // {"yourKey":"qwe"},
    // {"yourKey":"345"},
    // {"yourKey":"qqq"},
    // {"yourKey":"1111"},
    // {"yourKey":"323232"}];
    $scope.toShow = false;
    $scope.show = function() {
        console.log($scope.keyWord);
    }
});

app.directive("alertdialog", function() {
    return {

        require: "?ngModel",
        scope: {
            lists: "=",
            keyWord: "=ngModel",
            key: "@"
        },
        templateUrl: "template/templatedialog.html",

        link: function(scope, elem, attrs, ctrl) {
            var isFirst = true;

            var keys = scope.key ? scope.key.split(".") : null;

            //scope.results = scope.getValue();
            //console.log(scope.key.split("."));

            //scope.keyWord = "";
            scope.results = []; //存放过滤后的结果
            scope.index = -1;
            scope.click = function() {
                console.log(ctrl.$modelValue);
            }
            scope.getValue = function() {
                if(!keys.length) {
                    return;
                }
                console.log("进来了-------------------------");
                var newArr = [];
                for(var i = 0, len = scope.results.length; i < len; i++) {
                    var value = scope.results[i][keys[0]];
                    //console.log(keys.length);
                    for(var j = 1, keyLen = keys.length; j < keyLen; j++) {
                        value = value[keys[j]];
                    }
                    console.log(value);
                    newArr.push(value);
                }
                scope.lists = newArr;
                scope.results = newArr;
                var item = scope.results[0];
                var value = scope.results[keys[0]];
                var value = item[keys[0]];
               // console.log(value);
               scope.key = null;
               
            }
            scope.show = function() {
                if(isFirst && keys) {
                    scope.getValue();
                    isFirst = false;
                }
                if(attrs.up == "") {
                    //var height = $(window).height() - (elem.offset().top - $("body").scrollTop());
                    var height = $("body").scrollTop() == 0 ?$(window).height() - (elem.offset().top - $("body").scrollTop()) : (elem.offset().top - $("body").scrollTop());
                    elem.find("ul").css("maxHeight", height + "px");
                    console.log($(window).height());
                    console.log(elem.offset().top)
                    console.log(elem.offset().top - $(document).scrollTop());
                    console.log(height);
                }else {
                    var height = $(window).height() - (elem.offset().top + elem.height() + 40);
                    height = height > 320 ? 320 : height;
                    elem.find("ul").css("maxHeight", height + "px");
                }
                
                scope.isShow=true;
            }
            
            scope.up = function() {
                
                var e = elem.find("ul");
                var height = e.height();
                var original = elem.offset();
                elem.css("position", "relative");
                e.css({
                    "position": "absolute",
                    "bottom": "100%"
                });
                console.log(height);
                
            }
            scope.down = function() {
                
                var e = elem.find("ul");
                var height = e.height();
                var original = elem.offset();
                elem.css("position", "relative");
                e.css({
                    "position": "absolute",
                    "top": "100%"
                });
                console.log(height);
            
            }

            scope.keyUp = function() {

                if (event.keyCode == 13) {
                    if (scope.index != -1) { //用户输入了词语但是和只和列表部分匹配此时按下回车键不应做相应操作
                      scope.isEnter = true;
                      scope.isShow = false;
                      console.log(scope.key);
                      console.log(scope.key);
                      console.log(scope.index);
                      console.log(scope.results);
                      console.log(scope.results);
                      scope.keyWord = scope.key ? scope.results[scope.index][scope.key] : scope.results[scope.index];
                  }
                } else if (event.keyCode == 38) {
                    if (scope.results.length > 0) { //不加这个判断当noMatch时按上下键设置滚动条时会报错
                        scope.index = scope.index > 0 ? --scope.index : scope.index == -1 ? scope.results.length - 1 : 0;
                        var currentElem = angular.element(elem.find("li")[scope.index]);
                        currentElem.parent().scrollTop(currentElem.height() * scope.index);
                    }
                } else if (event.keyCode == 40) {
                    if (scope.results.length > 0) {
                        scope.index = scope.index < scope.results.length - 1 ? ++scope.index : scope.index;
                        var currentElem = angular.element(elem.find("li")[scope.index]);
                        currentElem.parent().scrollTop(currentElem.height() * scope.index);
                    }
                }
            }
            scope.clickItem = function(index) {
                scope.keyWord = scope.key ? scope.results[index][scope.key] : scope.results[index];
                //scope.keyWord = scope.results[index];
            }
            scope.$watch("keyWord", function(newValue, oldValue) {
                if(attrs.up == "") {
                    scope.up();
                }else {
                    scope.down();
                }

                scope.index = -1;
                console.log(newValue);
                var e = new RegExp(newValue, 'ig');
                scope.results = scope.lists.filter(function(item) {
                    console.log(scope.key + "--------------------------------------");
                    console.log(item);
                    console.log(scope.key);
                    return e.test(scope.key ? item[scope.key] : item);
                    //return e.test(item);
                });
                
                if (scope.results.length == 0) {
                    scope.isNoMatch = true;
                } else {
                    scope.isNoMatch = false;
                }
                if (oldValue != newValue) { //----------------------------------1
                    if (!scope.isEnter) { //--------------------------------------2
                        scope.isShow = true;
                    } else {
                        scope.isEnter = false; //-----------------------------------3
                    }
                }
            })
        }
    }
});
var INTEGER_REGEXP = /^\-?\d*$/;
app.directive('integer', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            console.log(ctrl.$parsers);
            ctrl.$parsers.unshift(function(viewValue) {//unshift函数为js内置函数。。。。。。。
                console.log("被调用了");
                if (INTEGER_REGEXP.test(viewValue)) {
                    ctrl.$setValidity('integer', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('integer', false);
                    return undefined;
                }
            });
        }
    };
});

var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
app.directive('float', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (FLOAT_REGEXP.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('float', false);
                    return undefined;
                }
            });
        }
    };
});


/**
 * 1、选中某一条后按下enter键~下拉框隐藏~所以将isShow设为false~然后通过按键输入信息时isShow一直都是false导致提示框不能显示
 * 
 * 2、于是当输入框中的值发生变化时~下拉列别需要根据关键字自动过滤出结果并显示出来~故需要在watch中将isShow设置为true
 *   但是一开始的时候watch会被触发一次~并且oldValue == newValue~所以加了1的判断以此避免页面一开始加载时下拉框就被显示出来
 *   同时解决1中的问题
 *
 * 3、但是因为2的操作导致按下enter键后下拉框又无法隐藏了~因为在按下enter键后将isShow设置为false~但是随后又调用了watch~将isShow设为true
 *   所以在按下enter时设置多一个变量判断当前keyWord的变化是因为enter按键导致的~此时watch中就不该把isShow设为true~
 *   但是这会导致isShow一直为false无法显示下拉框~所以加第三步将isEnter设为false~以便keyWord再次发生变化时下拉框可以显示
 */
