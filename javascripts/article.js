Vue.component('article_item', {
  template: '\
  <tr>\
    <td v-html="article_item.title">\
    </td>\
  <tr>\
  ',
  props: ['article_item']
})

var myJSON =
'{ "articles":[\
            {"title":"二狗", "date":"2016.07.02" },\
            {"title":"关公", "date":"2016.05.19" },\
            {"title":"万恶的IE", "date":"2016.07.19" },\
            {"title":"苟利", "date":"1988.02.15" },\
            {"title":"苟利", "date":"1988.02.15" }\
            ]\
  }';
var obj = JSON.parse(myJSON);

var article_list = new Vue({
    el: '#article_list',
    data: {
      items: obj.articles
    }
  })
