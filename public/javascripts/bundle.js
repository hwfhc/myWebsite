/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ArticleList;

var tagSet = __webpack_require__(0);

Vue.component('article_item', {
    template: '\
  <tr>\
    <button v-on:click="this.show" v-html="article_item.title">\
    </button>\
  <tr>\
  ',
    props: ['article_item'],
    methods: {
        show: function () {
            var article_container = new Vue({
                el: '#article_container',
                data: {
                    title: '',
                    content: ''
                }
            });

            var xhttp = new XMLHttpRequest();
            var myJSON,obj;
            ///////
            function ArticleChange(ID){
                var xhttp = new XMLHttpRequest();
                var myJSON,obj;

                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        myJSON = this.responseText;
                        obj = JSON.parse(myJSON);

                        article_container.title = obj.title;
                        article_container.content = obj.content;

                        document.getElementById('article_list').style.display = 'none';
                        document.getElementById('graph').style.display = 'none';
                        document.getElementById('article_container').style.display = '';
                    }
                };
                xhttp.open("GET", "/articles/" + ID + ".json", true);
                xhttp.send();

            }
            ArticleChange(this.article_item.ID);
            /*  xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          myJSON = this.responseText;
          obj = JSON.parse(myJSON);

          document.getElementById('article_list').innerHTML = obj.content;
        }
      };
      xhttp.open("GET", "/articles/" + this.article_item.ID + ".json", true);
      xhttp.send();*/
        }
    }
})


function ArticleList(ARTICLE){
    /*
     *参数说明:
     *存储所有article的对象数组
     *参数格式：
     *article[i].ID:文章ID
     *article[i].title:文章标题
     *article[i].tags:标签数组（非标签集合对象）
     */

    //将ARTICLE值赋给article
    var article = [];

    ARTICLE.forEach(function(item,index){
      article.push(new Article(ARTICLE[index].ID,ARTICLE[index].title,ARTICLE[index].tags));
    });

    //将article值赋给visible_article
    var visible_article = article.concat();

    var VueReact = new Vue({
        el: '#article_list',
        data: {
            items: visible_article
        }
    })

    //对外接口
    this.Filter = Filter;


    function Filter(tag_group){
        /*
         *效果说明：
         *visible_article中换为拥有tag_group中所有标签的article
         */

        //筛选
        visible_article = article.filter(function(item){
            if(item.tag_group.isContain(tag_group)){
                return true;
            }else{
                return false;
            }
        });

        VueReact.items = visible_article;
    }


    function Article(id,title,tags){
        /*
         *属性说明：
         *id:文章的编号
         *title:文章对应的标题
         *tags:文章所有标签的数组
         *需求：TagGroup
         */
        Object.defineProperty(this,'ID',{
            configurable: false,
            writable: false,
            value: id
        });

        Object.defineProperty(this,'title',{
            configurable: false,
            writable: false,
            value: title
        });

        this.tag_group = new tagSet(tags);
    }

}



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = Layer;

var tagSet = __webpack_require__(0);
var Matrix = __webpack_require__(1);

function power(number,N){
    /*
     *效果说明:
     *求number的N次方
     */
    if(N == 2)
    {
        return number * number;
    }

    if(N % 2 == 0){
        return power(power(number,N / 2 ),2);

    }
    else{
        return number * power(number,N-1);
    }
}
/**************************图形**********************************************/
class Shape{
    constructor(center,range,tag,color){
        /*
         *
         *属性说明：
         *location：图形中心坐标
         *range：图形半径
         *
         */
        this.location = new Matrix([
            [center[0],center[1],1]
        ]);
        this.range = range;
        this.tag = tag;
        this.color = color;
    }

    GetX(){
        /*
         *效果说明:
         *获取中心的X坐标
         */
        return this.location.GetNumber(1,1);
    }

    GetY(){
        /*
         *效果说明:
         *获取中心的Y坐标
         */
        return this.location.GetNumber(1,2);
    }

    Transformation(M){
        /*
         *效果说明:
         *M为一个矩阵，node的value将右乘M
         */

        this.location = this.location.Multiple(M);
    }
}
//**************************图层**********************************************
function Layer(CANVAS){
    /*
     *效果说明:
     *创建一个图层
     *canvas是对应的canvas元素
     *包含一些图形
     */
    this.canvas = CANVAS;
    this.shapes = [];
    this.tag_group = new tagSet([]);
}

Layer.prototype.DeleteShape = function(N){
    /*
     *效果说明:
     *删除第N个图形，从0开始计数
     */
    this.shapes.slice(N,1);
}

Layer.prototype.AddShape = function(X,Y,range,tag,color){
    /*
     *效果说明:
     *将事先创建的shape添加到本图层
     */
    this.shapes.push(new Shape([X,Y],range,tag,color));
}

Layer.prototype.Draw = function(){
    /*
     *效果说明：
     *依次绘画图层中所有shape
     */

    //临时存储变量
    var shape;    //临时存储一个shape

    //初始化，获取canvas
    var canvas = this.canvas;
    var ctx = canvas.getContext('2d');

    ctx.lineWidth = 3;
    for(let i=0;i < this.shapes.length;i++)
    {
        shape = this.shapes[i];


        //图形
        ctx.beginPath();
        ctx.arc(shape.GetX(),shape.GetY(),shape.range,0,Math.PI*2);
        ctx.fillStyle = shape.color;
        ctx.closePath();
        ctx.fill();

        //文字
        ctx.textAlign='center';
        ctx.font = '14px 微软雅黑';
        ctx.fillStyle = 'black';
        ctx.fillText(shape.tag,shape.GetX(),shape.GetY()+7);//文字中心补正
    }
}

Layer.prototype.Clear = function(){
    /*
     *效果说明：
     *立即清除本图层，如果使用计时器调用layer.Clear会导致无法获取this关键字
     */
    var canvas = this.canvas;
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0,0,canvas.width,canvas.height);
}

Layer.prototype.ClickedAt = function(x,y){
    /*
     *参数：
     *x：鼠标点击canvas的x坐标
     *y：鼠标点击canvas的y坐标
     *
     *返回值：
     *鼠标所点击的shape
     */
    var distance;

    for(let i=0;i<this.shapes.length;i++){
        distance = power(x - this.shapes[i].GetX(),2) + power(y - this.shapes[i].GetY(),2);

        if(distance <= power(this.shapes[i].range,2)){
            return this.shapes[i];
        }
    }
}

Layer.prototype.GetTagGroup = function(){
    /*
     *效果说明：
     *获取layer对象的tag_group属性
     */
    return this.tag_group;
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = Matrix;

function Matrix(VALUE){
    /*
     *效果说明:
     *创建一个矩阵
     */
    if(VALUE.length != 0){
        if(VALUE.every(function(item){
            if( item.every(function(item2){
                if(typeof item2 === 'number'){
                    return true;
                }else{
                    return false;
                }
            })){
                return true;
            }else{
                return false;
            }
        })){
            this.value = VALUE;
            this.row = VALUE.length;
            this.column = VALUE[0].length;
        }else{
            console.error("[matrix_tool] the element of matrix must be a number");
        }
    }
    else{
        console.error("[matrix_tool] there is no element in matrix");
    }
}

Matrix.prototype.Add = function(M){
    /*
     *效果说明:
     *矩阵相加，在本矩阵基础上加上M矩阵,获得一个新的矩阵
     *
     */

    //新的矩阵
    var OutPut = new Matrix([0]);//写一个0为了获取OutPut.value[0]的长度
    //这两个变量用于循环遍历矩阵
    var row;
    var column;

    if(this.row == M.row && this.column == M.column)//同型矩阵判断
    {
        for(row = 0;row < this.row; row++)
        {
            //初始化每一行的数组，否则无法使用数组脚标(js没有二维数组)
            OutPut.value[row] = [];

            for(column = 0;column < this.column; column++)
            {
                OutPut.value[row][column] = this.value[row][column] + M.value[row][column];
            }
        }
    }
    else
    {
        console.error('[matrix_tool] columns and row of two matrix must be same');
    }

    return OutPut;
}

Matrix.prototype.Multiple = function(M){
    /*
     *效果说明:
     *矩阵相乘，在本矩阵基础上右乘M矩阵，获得新的矩阵
     *
     */

    //新的矩阵
    var OutPut = new Matrix([0]);//写一个0为了获取OutPut.value[0]的长度

    //这两个变量用于循环遍历矩阵
    var row;
    var column;

    //临时储存的变量
    var sum = 0;
    var i;

    if(this.column == M.row)//列数等于行数
    {
        for(row = 0;row < this.row;row++)
        {
            //初始化每一行的数组，否则无法使用数组脚标(js没有二维数组)
            OutPut.value[row] = [];

            for(column = 0;column < this.column; column++)
            {
                sum = 0;

                for(i = 0;i < this.column;i++)
                {
                    sum += this.value[row][i] * M.value[i][column];
                }

                OutPut.value[row][column] = sum;
            }
        }
    }
    else
    {
        console.error('[matrix_tool] columns and rows must be same');
    }
    //设置矩阵行，列
    OutPut.ReFreshRC();
    return OutPut;
}

Matrix.prototype.GetNumber = function(row,column){
    if(row <= this.row && column <= this.column && row > 0 && column >0){
        return this.value[row-1][column-1];
    }
    else{
        console.error("[matrix_tool] can not get the number");
    }
}

Matrix.prototype.ReFreshRC = function(){
    /*
     *效果说明：
     *重新计算矩阵的宽和列
     */
    this.row = this.value.length;
    this.column = this.value[0].length;
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = tagSet;


function tagSet(ELEMENTS){
    /*
     *效果说明:
     *初始化集合
     */
    var isRepeat = (function(){
        var judge = {};

        return function(value){
            if(judge[value] === undefined){
                judge[value] = true;
                return false;
            }else{
                return true;
            }
        }
    })();

    if(ELEMENTS.every(function(item,index,array){
        if(typeof item === 'string' && isRepeat(item) === false){
            return true;
        }
        else{
            return false;
        }
    })){
        this.value = ELEMENTS.concat();
    }
    else{
        console.error('[tag_set] element must be string or can not repeat');
    }
}

tagSet.prototype.OutPut = function(){
    /*
     *效果说明：
     *将所有标签以数组形式输出
     */
    return this.value.concat();
}

tagSet.prototype.Add = function(element){
    /*
     *效果说明：
     *添加新的元素
     */
    if(!this.value.some(function(item){
        return item === element;
    }) && typeof element === 'string'){
        this.value.push(element);
    }else{
        console.error('[tag_set] element must be string or can not repeat');
    }
}

tagSet.prototype.Delete = function(element){
    /*
     *效果说明:
     *删除元素
     */
    this.value = this.value.filter(function(item){
        return !(item === element);
    });
}

tagSet.prototype.isContain = function(SET){
    /*
     *效果说明:
     *判断集合是否包含另一个集合
     */

    var set = this.value;

    return SET.value.every(function(SET_item){
        return set.some(function(item){
            return item === SET_item;
        });
    });
}
tagSet.prototype.isOwn = function(element){
    /*
     *效果说明:
     *判断元素是否属于集合
     */
    return this.value.some(function(item){
        return item === element;
    });
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Article = __webpack_require__(2);
var Layer = __webpack_require__(3);
var Matrix = __webpack_require__(1);
var tagSet = __webpack_require__(0);


var layer = new Layer(document.getElementById('graph'));
var article_list;

{//graph init
    let xhttp = new XMLHttpRequest();
    let myJSON,obj,item,shape;
    let center = [];

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myJSON = this.responseText;
            obj = JSON.parse(myJSON);

            //注册图形
            for(let i=0;i < obj.tags.length;i++){
                item = obj.tags[i];
                layer.AddShape(item.X,item.Y,item.number,item.tag,'#0080c0');
            }
            layer.Draw();
        }
    };
    xhttp.open("GET", "/javascripts/graph.json", true);
    xhttp.send();
}

{//article init
    let xhttp = new XMLHttpRequest();
    let myJSON,obj;

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myJSON = this.responseText;
            obj = JSON.parse(myJSON);

            article_list = new Article(obj.articles);
        }
    };
    xhttp.open("GET", "/articles/index.json", true);
    xhttp.send();
}

document.getElementById('article_container').style.display = 'none';


document.getElementById('graph').addEventListener('click',function(e){
  //获取canvas绝对位置
    var X = graph.getBoundingClientRect().left+document.body.scrollLeft;
    var Y = graph.getBoundingClientRect().top+document.body.scrollTop;

    //获取鼠标在canvas中的坐标
    var e = window.event;
    var scrollX = document.body.scrollLeft;
    var scrollY = document.body.scrollTop;
    var x = e.clientX + scrollX - X;
    var y = e.clientY + scrollY - Y;

    var shape = layer.ClickedAt(x,y);

    if(shape!=undefined){
        if(layer.GetTagGroup().isOwn(shape.tag)){
            shape.color = '#0080c0';
            layer.GetTagGroup().Delete(shape.tag);
        }else{
            shape.color = '#f00000';
            layer.GetTagGroup().Add(shape.tag);
        }

        layer.Clear();
        layer.Draw();

        article_list.Filter(layer.GetTagGroup());
    }
});


/***/ })
/******/ ]);