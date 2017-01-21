var layer;
var article_list;

function init1(){
  var myJSON =
  '{ "tags":[\
            {"tag":"html", "number":40, "X":600, "Y":400 ,"color":"#0080c0"},\
            {"tag":"css", "number":40, "X":800, "Y":600 ,"color":"#00ff00"},\
            {"tag":"javascript", "number":60, "X":1000, "Y":500 ,"color":"#ff8000"}\
            ]\
     }';

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

function init2(){
  var myJSON =
  '{ "articles":[\
              {"title":"二狗", "tags":["css","html"] },\
              {"title":"关公", "tags":["css","javascript"] },\
              {"title":"万恶的IE", "tags":["html"] },\
              {"title":"苟利", "tags":["html"] },\
              {"title":"生死以", "tags":["javascript"] },\
              {"title":"西方哪个国家我没去过", "tags":["javascript","css","html"] }\
              ]\
    }';

  var obj = JSON.parse(myJSON);

  article_list = new ArticleList(obj.articles);
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

   layer.ClickedAt(x,y);
   article_list.Filter(layer.tag_group);
}
