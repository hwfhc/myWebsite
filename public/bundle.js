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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

exports.Create = function(VALUE){
    return new Matrix(VALUE);
}

function Matrix(VALUE){
    /*
     *效果说明:
     *创建一个矩阵
     */
     if(VALUE.length != 0){
       this.value = VALUE;
       this.row = VALUE.length;
       this.column = VALUE[0].length;
     }
     else{
       console.log("矩阵不能无元素");
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
      console.log('矩阵相加异常');
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
      console.log('矩阵相乘异常');
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
      console.log("获取矩阵数值失败");
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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

exports.Create = function(ARTICLE){
    var item = new ArticleList(ARTICLE);
    return item;
};

function ArticleList(ARTICLE){
    /*
     *参数说明:
     *存储所有article的对象数组
     *参数格式：
     *article[i].title:文章标题
     *article[i].tags:标签数组（非标签集合对象）
     */

    //将ARTICLE值赋给article
    var article = [];

    for(let i=0;i<ARTICLE.length;i++){
        let item;
        item = new Article(ARTICLE[i].ID,ARTICLE[i].title,ARTICLE[i].tags)
        article.push(item);
    }

    //将article值赋给visible_article
    var visible_article = [];

    for(let i=0;i<ARTICLE.length;i++){
        let item;
        item = new Article(ARTICLE[i].ID,ARTICLE[i].title,ARTICLE[i].tags)
        visible_article.push(item);
    }

    new Vue({
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

        //清空visible_article
        for(let i=0;i<visible_article.length;i++){
            let item;
            visible_article.pop();
            i--;
        }

        //将article值赋给visible_article
        for(let i=0;i<article.length;i++){
            let item;
            item = new Article(article[i].ID,article[i].title,article[i].tag_group.OutPut());
            visible_article.push(item);
        }

        //筛选
        for(let i=0;i<visible_article.length;i++){
            if(visible_article[i].tag_group.isContain(tag_group) == false){
                visible_article.splice(i,1);
                i--;
            }
        }
    }


    function Article(id,title,tags){
        /*
         *属性说明：
         *id:文章的编号
         *title:文章对应的标题
         *tags:文章所有标签的数组
         *需求：TagGroup
         */
        this.ID = id;
        this.title = title;
        this.tag_group = new tagSet(tags);
    }

}



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var tagSet = __webpack_require__(0);
var Matrix = __webpack_require__(1);

//**************************数学常量**********************************************
function cos(angle){
    /*
     *效果说明：
     *计算角度的余弦值，角度越大精度越差
     *
     *计算方法:
     *cos函数的麦克劳林展开
     */
    var value;
    value = 1-power(angle,2)/2+power(angle,4)/24;
    return value;
}

function sin(angle){
    /*
     *效果说明：
     *计算角度的余弦值，角度越大精度越差
     *
     *计算方法:
     *cos函数的麦克劳林展开
     */
    var value;
    value = angle-power(angle,3)/6+power(angle,5)/120;
    return value;
}

function max(N1,N2){
    /*
     *效果说明：
     *求N1，N2最小值
     */
    if(N1 >= N2){
        return N1;
    }
    else{
        return N2;
    }
}

function min(N1,N2){
    /*
     *效果说明：
     *求N1，N2最小值
     */
    if(N1 <= N2){
        return N1;
    }
    else{
        return N2;
    }
}

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
//**************************图形**********************************************
class Shape{
    constructor(center,range,tag,color){
        /*
         *
         *属性说明：
         *location：图形中心坐标
         *range：图形半径
         *
         */
        this.location = Matrix.Create([
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
exports.Create = function(CANVAS){
    var item = new Layer(CANVAS);
    return item;
};

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
    var length = this.shapes.length;
    this.shapes[N] = this.shapes[length-1];
    this.shapes[length-1] = undefined;
    this.shapes.length--;
}

Layer.prototype.AddShape = function(X,Y,range,tag,color){
    /*
     *效果说明:
     *将事先创建的shape添加到本图层
     */
    var length = this.shapes.length;
    var shape = new Shape([X,Y],range,tag,color);

    this.shapes[length] = shape;
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
/* 4 */
/***/ (function(module, exports) {

module.exports = tagSet;


function tagSet(ELEMENTS){
    /*
     *效果说明:
     *初始化集合
     */
    this.value = ELEMENTS.concat();
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
    this.value.push(element);
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Article = __webpack_require__(2);
var Layer = __webpack_require__(3);
var matrix = __webpack_require__(1);
var tagSet = __webpack_require__(0);


var layer = Layer.Create(document.getElementById('graph'));
var article_list;

function initGraph(){
    var xhttp = new XMLHttpRequest();
    var myJSON,obj,item,shape;
    var center = [];

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


function initArticle(){
  var xhttp = new XMLHttpRequest();
  var myJSON,obj;

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myJSON = this.responseText;
      obj = JSON.parse(myJSON);

      article_list = Article.Create(obj.articles);
    }
  };
  xhttp.open("GET", "/articles/index.json", true);
  xhttp.send();
}

document.getElementById('article_container').style.display = 'none';
initGraph();
initArticle();

document.getElementById('graph').onclick = MouseClick;

function MouseClick(e){
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
}


/***/ })
/******/ ]);