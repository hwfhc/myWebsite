module.exports = ArticleList;

var tagSet = require('tag_set');

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

        //将article值赋给visible_article
        visible_article = article.concat();
        VueReact.items = visible_article;

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
        Object.defineProperty(this,'ID',{
            configurable: false,
            writable: false,
            value: id
        })

        this.ID = 'asdfsadf';
        this.title = title;
        this.tag_group = new tagSet(tags);
    }

}

