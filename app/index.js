var Article = require('./article');
var Layer = require('./graph');
var Matrix = require('matrix_tool');
var tagSet = require('tag_set');


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
