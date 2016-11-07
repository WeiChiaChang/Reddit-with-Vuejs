var subreddit = Vue.component('subreddit',{
  template: '#subreddit',
  props: ['name'],
  // Expect receive 'name' this argument from <subreddit> in index.html

  data: function(){
    return {
      posts: []
    }
  },

  created: function(){
    this.$http.get("https://www.reddit.com/r/" + this.name + "/top.json?limit=5")
    .then(function(response){
      this.posts = response.data.data.children;
    });
  }

  // Acquired Reddit API data in our model now

});

var post = Vue.component('post', {
  // template will go to index.html and find <template id="post">
  template: '#post',
  props: ['item']
  // Expect receive 'item' this object from <post> in index.html
});

Vue.filter('setAsBackground', function(value){
  if(value && value!='self' && value!='nsfw'){
    return 'background-image: url(' + value + ')';
  }
  else{
    return 'background-image: url(assets/img/placeholder.png)';
  }
});

Vue.filter('truncate', function(value){
  var len = 60;

  if(value.length <= len){
    return value;
  }
  else{
    return value.substring(0, len) + '...';
  }
});

new Vue({
  el: 'body'
});
