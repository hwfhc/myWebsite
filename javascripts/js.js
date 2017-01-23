var layer;
var article_list;

function init1(){
    var xhttp = new XMLHttpRequest();
    var myJSON,obj,item,shape;
    var center = [];

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myJSON = this.responseText;
        obj = JSON.parse(myJSON);

        //创建layer
        layer = new Layer(document.getElementById('demo'));

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


function init2(){
  var xhttp = new XMLHttpRequest();
  var myJSON,obj;

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myJSON = this.responseText;
      obj = JSON.parse(myJSON);

      article_list = new ArticleList(obj.articles);
    }
  };
  xhttp.open("GET", "/articles/index.json", true);
  xhttp.send();
}

init1();
init2();

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

   var shape = layer.ClickedAt(x,y);

   if(shape!=undefined){
     if(layer.GetTagGroup().isInclude(shape.tag)){
        shape.color = '#0080c0';
        layer.GetTagGroup().DeleteTag(shape.tag);
     }else{
        shape.color = '#f00000';
        layer.GetTagGroup().AddTag(shape.tag);
     }

     layer.Clear();
     layer.Draw();

     article_list.Filter(layer.GetTagGroup());
   }
}
