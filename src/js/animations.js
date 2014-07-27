var $ = require('jquery');

$.Velocity.RegisterUI('flip', {
    defaultDuration: 600,
    calls: [
        [ { translateX: '+8%', rotateY: '-10deg' }, 0.2, {easing: 'ease'} ],
        [ { translateX: '-100%', rotateY: '-180deg' }, 0.8, {easing: 'ease-in-out'} ]
    ]
});

$.Velocity.RegisterUI('unflip', {
    defaultDuration: 600,
    calls: [
        [ { translateX: 0, rotateY: 0 }, 1, {easing: 'ease'}]
    ]
});

$.Velocity.RegisterUI('deal', {
    defaultDuration: 600,
    calls: [
        [ {
          translateX: function(i, total) {
            return $(this).attr('X');
          },
          translateY: function(i, total) {
            return $(this).attr('Y');
          }
        }, 1, {easing: 'ease'}]
    ]
});