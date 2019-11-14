(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        root.component = root.component || {};
        root.component.tabs = factory(root.jQuery);
    }
}(this, function ($) {
    'use strict';

    function initTabs() {

        $(function () {

            $('.c-tab--navigation').each(function (element) {

                var slider_width,
                    tab_width,
                    left_position,
                    $active,
                    $content,
                    $links = $(this).find('a'),
                    $currentTab = $(this).find('a.active'),
                    $indicator = $(this).find('.c-tab-indicator');

                if ($currentTab.hasClass('active')) {
                    slider_width = $('.c-tab--slider').innerWidth();
                    tab_width = $currentTab.innerWidth();
                    // var $tab_position = $slider_width - tab_width;
                    left_position = $currentTab.position().left;
                    $indicator.css({ 'width': tab_width + 'px', 'left': left_position + 'px' });
                }

                $active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
                $active.addClass('active');
                $content = $($active[0].hash);

                $links.not($active).each(function () {
                    $(this.hash).hide();
                });

                // Binds the click event handler
				$(this).on('click', 'a', function (e) {

                    $active.removeClass('active');
                    $content.hide();

                    $active = $(this);
                    $content = $(this.hash);

                    $active.addClass('active');
                    $content.show();

                    moveSlider($active);
                    addRipple(e);
					e.preventDefault();
                });
            });
        });
    }


    function moveSlider($tab_clicked) {
        var $new_tab = $tab_clicked;
        var $tab_parent = $new_tab.parent();
        var $list_parent = $tab_parent.parent();
        var $indicator = $list_parent.find('.c-tab--slider').children();
        var new_tab_width = $new_tab.innerWidth();
        var left_position = $new_tab.position().left;

        $indicator.css({ 'width': new_tab_width + 'px', 'left': left_position + 'px' });
    }

    function addRipple(e) {
        var target = e.target;
        var targetPosition = target.getBoundingClientRect(),
            offsetX = e.clientX - targetPosition.left,
            offsetY = e.clientY - targetPosition.top;
        var top = offsetY;
        var left = offsetX;
        var timeout = null;
        var ripple = document.createElement('span');
        var styleString = 'top:calc(' + top + 'px - .5em); left:calc(' + left + 'px - .5em);';

        target.appendChild(ripple);
        ripple.setAttribute("style", styleString);
        ripple.classList.add('-ripple');
        timeout = setTimeout(function () {
            ripple.parentNode.removeChild(ripple);
        }, 5000);
    }

    return {
        initTabs: initTabs
    };

}));
