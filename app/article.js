var TagGroup = require('./TagGroup.js');

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
            item = new Article(article[i].ID,article[i].title,article[i].tag_group.GetTags());
            visible_article.push(item);
        }

        //筛选
        for(let i=0;i<visible_article.length;i++){
            if(visible_article[i].tag_group.isIncludeTagGroup(tag_group) == false){
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
        this.tag_group = TagGroup.Create(tags);
    }

}

