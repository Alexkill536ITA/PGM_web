function AnimateRotate(angle, repeat) {
    var duration = 60000;
    setTimeout(function () {
        if (repeat && repeat == "infinite") {
            AnimateRotate(angle, repeat);
        } else if (repeat && repeat > 1) {
            AnimateRotate(angle, repeat - 1);
        }
    }, duration)
    var $elem = $('.icon-repeat');

    $({ deg: 0 }).animate({ deg: angle }, {
        duration: duration,
        step: function (now) {
            $elem.css({
                'transform': 'rotate(' + now + 'deg)'
            });
        }
    });
}
AnimateRotate(360, "infinite");