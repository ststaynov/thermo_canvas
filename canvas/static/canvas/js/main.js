window.onload = initialize;

function initialize() {
    var $body = $('body'),
        $threesixtyBg = $('.c-threesixty-bg'),
        $ideaBox = $('.c-idea-box'),
        $exitBtn = $('.c-idea-box-exit-btn'),
        render,
        $idea = $('.idea'),
        $ideaWrapper = $('.idea-wrapper'),
        $lightBulb = $('.c-lamp');

    render = jQuery('#vr_render').ThreeSixty({
        totalFrames: 24,
        endFrame: 24,
        currentFrame: 1,
        imgList: '.threesixty_images',
        progress: '.vr_spinner',
        imagePath: './static/animations/images/render/',
        filePrefix: 'render_',
        zeroStart: false,
        zeroPadding: 5,
        ext: '.png',
        width: 150,
        height: 110,
        navigation: true,
        responsive: true,
        //plugins : ['ThreeSixtyWheelZoom', 'ThreeSixtyFullscreen'],
        //plugins : ['ThreeSixtyFullscreen'],
        //disableSpin : true,
        direction: 1,
        autoplay: true,
        autoplayDirection: -1,
        autoplayFramerate: 100
    });

    $lightBulb.on('touchstart mousedown', function (e) {
        e.stopPropagation();

        $lightBulb.addClass('cracked');
        $lightBulb.removeClass('on');
        setTimeout(function () {
            blackout();
        }, 1000);
    });

    $idea.bind("touchstart mousedown", function (e) {
        if ($ideaWrapper.hasClass('invisible')) {}
        else {
            $ideaWrapper.addClass('invisible');
        }
    });


    $exitBtn.on('click tap', function (e) {
        e.stopPropagation();
        $('.c-main-content').removeClass('invisible');
        $('.c-game-rules').removeClass('invisible');
        $('.threesixty').removeClass('invisible');
        $('.e-stoyan-baloon').removeClass('visible');
        $('.c-lamp').removeClass('off cracked');
        $threesixtyBg.removeClass('shrink');
        $idea.removeClass('invisible');
        TweenLite.set($idea, {transform: "translate3d(0px, 0px, 0px)"});
        TweenLite.set($('.c-lamp'), {clearProps:"all"});
        TweenLite.to($body, 2, {backgroundColor: "transparent"});
        $ideaBox.removeClass('visible');
    });

    function blackout() {
        $lightBulb.addClass('off');
        $('.c-main-content').addClass('invisible');
        setTimeout(function () {
            TweenLite.to($body, 2, {backgroundColor: "#000000"});
            setTimeout(function () {
                $ideaBox.addClass('visible');
            }, 4000);
        }, 1000);
    }
}
