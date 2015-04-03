// Code here will be linted with JSHint.
/* jshint ignore:start */
// require.config({
//   baseUrl: "/",
//   paths: {
//     'skrollr' : "skrollr.min"
//   },
//   waitSeconds: 15
// });

// require(['skrollr'], function(skrollr){
//   var s = skrollr.init({
//     edgeStrategy: 'set',
//     easing: {
//       WTF: Math.random,
//       inverted: function(p) {
//         return 1-p;
//       }
//     }
//   });
// });

// var audio;
// var playlist;
// var tracks;
// var current;

// init();
// function init(){
//     current = 0;
//     audio = $('audio');
//     playlist = $('#playlist');
//     tracks = playlist.find('li a');
//     len = tracks.length - 1;
//     audio[0].volume = .10;
//     playlist.find('a').click(function(e){
//         e.preventDefault();
//         link = $(this);
//         current = link.parent().index();
//         run(link, audio[0]);
//     });
//     audio[0].addEventListener('ended',function(e){
//         current++;
//         if(current == len){
//             current = 0;
//             link = playlist.find('a')[0];
//         }else{
//             link = playlist.find('a')[current];    
//         }
//         run($(link),audio[0]);
//     });
// }
// function run(link, player){
//         player.src = link.attr('href');
//         par = link.parent();
//         par.addClass('active').siblings().removeClass('active');
//         audio[0].load();
//         audio[0].play();
// }

// Code here will be ignored by JSHint.
/* jshint ignore:end */