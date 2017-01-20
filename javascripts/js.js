var myJSON =
'{ "tags":[\
          {"tag":"html", "number":40, "X":600, "Y":400 ,"color":"#0080c0"},\
          {"tag":"css", "number":40, "X":800, "Y":600 ,"color":"#00ff00"},\
          {"tag":"javascript", "number":60, "X":1000, "Y":500 ,"color":"#ff8000"}\
          ]\
   }';

var layer;
var tag_pool = new TagPool();

function init(){
  var obj = JSON.parse(myJSON);
  var center = [];
  var item;
  var shape;

  //创建layer
  layer = new Layer(document.getElementById('demo'));

  //注册图形
  for(let i=0;i < obj.tags.length;i++){
    item = obj.tags[i];
    layer.AddShape(item.X,item.Y,item.number,item.tag,'#0080c0');
  }
  layer.Draw();
}

init();

function MouseClick(e){
   //获取canvas绝对位置
   var X = demo.getBoundingClientRect().left+document.body.scrollLeft;
   var Y = demo.getBoundingClientRect().top+document.body.scrollTop;

   //获取鼠标在canvas中的坐标
   var e = window.event;
   var scrollX = document.body.scrollLeft;
   var scrollY = document.body.scrollTop;
   var x = e.clientX + scrollX - X;
   var y = e.clientY + scrollY - Y;

   function isClicked(x,y){
      var distance;

      for(let i=0;i<layer.shapes.length;i++){

        distance = power(x - layer.shapes[i].GetX(),2) + power(y - layer.shapes[i].GetY(),2);

        if(distance <= power(layer.shapes[i].range,2)){
          if(tag_pool.isInclude(layer.shapes[i].tag)){
            layer.shapes[i].color = '#0080c0';
            tag_pool.DeleteTag(layer.shapes[i].tag);
          }else{
            layer.shapes[i].color = '#f00000';
            tag_pool.AddTag(layer.shapes[i].tag);
          }

          layer.Clear();
          layer.Draw();
          break;
       }
     }
   }

   isClicked(x,y);
}
