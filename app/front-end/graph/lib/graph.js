module.exports = Layer;

var tagSet = require('tag_set');
var Matrix = require('matrix_tool');

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
        Object.defineProperty(this,'range',{
            configurable: false,
            writable: false,
            value: range
        });

        this.location = new Matrix([
            [center[0],center[1],1]
        ]);
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

    Object.defineProperty(this,'canvas',{
        configurable: false,
        writable: false,
        value: CANVAS
    });

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

    for(var i=0;i<this.shapes.length;i++){
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
