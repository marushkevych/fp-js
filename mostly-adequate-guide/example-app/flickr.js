requirejs.config({
  paths: {
    ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'
  }
});

require(['ramda','jquery'], function (_, $) { 

  var trace = _.curry(function(tag, x) {
    console.log(tag, x);
    return x;
  });
  // app goes here

  var Impure = {
    getJSON: _.curry(function(callback, url) {
      $.getJSON(url, callback);
    }),

    setHtml: _.curry(function(sel, html) {
      $(sel).html(html);
    })
  };

  var url = function (term) {
    return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' +
      term + '&format=json&jsoncallback=?';
  };

  var img = function (url) {
    return $('<img />', { src: url });
  };

  // item -> img
  var itemToImage = _.compose(img, _.path(['media', 'm']));

  // json -> [img]
  var imgs = _.compose(_.map(itemToImage), _.prop('items'));

  var render = _.compose(Impure.setHtml('body'), imgs);

  var app = _.compose(Impure.getJSON(render), url);

  app('skiing');


});