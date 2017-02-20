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

class Layer{
    constructor(CANVAS){
        /*
         *效果说明:
         *创建一个图层
         *canvas是对应的canvas元素
         *包含一些图形
         */
        this.canvas = CANVAS;
        this.shapes = [];
        this.tag_group = new TagGroup([]);
    }

    DeleteShape(N){
        /*
         *效果说明:
         *删除第N个图形，从0开始计数
         */
        var length = this.shapes.length;
        this.shapes[N] = this.shapes[length-1];
        this.shapes[length-1] = undefined;
        this.shapes.length--;
    }

    AddShape(X,Y,range,tag,color){
        /*
         *效果说明:
         *将事先创建的shape添加到本图层
         */
        var length = this.shapes.length;
        var shape = new Shape([X,Y],range,tag,color);

        this.shapes[length] = shape;
    }

    Draw(){
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

    Clear(){
        /*
         *效果说明：
         *立即清除本图层，如果使用计时器调用layer.Clear会导致无法获取this关键字
         */
        var canvas = this.canvas;
        var ctx = canvas.getContext('2d');

        ctx.clearRect(0,0,canvas.width,canvas.height);
    }

    ClickedAt(x,y){
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

            if(distance <= power(layer.shapes[i].range,2)){
                return this.shapes[i];
            }
        }
    }

    GetTagGroup(){
        /*
         *效果说明：
         *获取layer对象的tag_group属性
         */
        return this.tag_group;
    }
}
