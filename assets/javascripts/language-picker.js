/** 
 * Created on : 2014.08.24., 5:26:26
 * Author     : Lajos Molnar <lajax.m@gmail.com>
 */
$(document).ready(function () {
    LanguagePicker.init();
});

var LanguagePicker = {
    init: function () {
        $('body').on('click', '.language-picker ul a', $.proxy(function (event) {
            this.change($(event.currentTarget).attr('href'));
            return false;
        }, this));
        $('body').on('click', '.language-picker.dropdown-list a, .language-picker.dropup-list a', $.proxy(function (event) {
            this.render($(event.currentTarget).closest('.language-picker'));
            $(event.currentTarget).parent().find('ul').toggleClass('active');
        }, this));
        $('body').on('mouseover', '.language-picker.dropdown-list a, .language-picker.dropup-list a', $.proxy(function (event) {
            this.render($(event.currentTarget).closest('.language-picker'));
        }, this));
        $('body').on('mouseout', '.language-picker.dropdown-list', function () {
            $(this).find('ul').removeClass('active');
        });
    },
    change: function (url) {
        $.get(url, {}, function () {
            document.location.reload();
        });
    },
    render: function ($object) {
        // Restore the dropdown state
        if ($object.hasClass('dropup-list')) {
            $object.addClass('dropdown-list').removeClass('dropup-list');
        }
        
        var height = $(window).height() + $(window).scrollTop();
        var containerHeight = $object.height() - ($object.find('a').eq(0).height());
        var listHeight = $object.find('ul').height();
        var top = $object.position().top;
        if (top + containerHeight + listHeight > height && (top - height > 0 || height - top < height / 2)) {
            $object.addClass('dropup-list').removeClass('dropdown-list');
        }
    }
};