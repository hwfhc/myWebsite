Vue.component('article_item', {
  template: '\
  <tr>\
    <td v-html="article_item.title">\
    </td>\
  <tr>\
  ',
  props: ['article_item']
})

class ArticleList{
  constructor(article){
   /*
    *参数说明:
    *存储所有article的对象数组
    *参数格式：
    *article[i].title:文章标题
    *article[i].tags:标签数组（非标签集合对象）
    */
    var item;

    //将article值赋给this.article
    this.article = [];
    for(let i=0;i<article.length;i++){
      item = new Article(article[i].title,article[i].tags)
      this.article.push(item);
    }

    //将article值赋给this.visible_article
    this.visible_article = [];
    for(let i=0;i<article.length;i++){
      item = new Article(article[i].title,article[i].tags)
      this.visible_article.push(item);
    }

    new Vue({
        el: '#article_list',
        data: {
          items: this.visible_article
        }
      })
  }

  Filter(tag_group){
   /*
    *效果说明：
    *visible_article中换为拥有tag_group中所有标签的article
    */
    var item;

    //清空visible_article
    for(let i=0;i<this.visible_article.length;i++){
      this.visible_article.pop();
      i--;
    }

    //将article值赋给visible_article
    for(let i=0;i<this.article.length;i++){
      item = new Article(this.article[i].title,this.article[i].tag_group.tags)
      this.visible_article.push(item);
    }

    //筛选
    for(let i=0;i<this.visible_article.length;i++){
      if(this.visible_article[i].tag_group.isIncludeTagGroup(tag_group) == false){
      //  console.log(this.visible_article[i].title);
        this.visible_article.splice(i,1);
        i--;
      }
    }
  }
}

class Article{
  constructor(title,tags){
   /*
    *属性说明：
    *文章对应的标题,TagGroup
    */
    this.title = title;
    this.tag_group = new TagGroup();

    for(let i=0;i<tags.length;i++){
      this.tag_group.AddTag(tags[i]);
    }
  }
}
