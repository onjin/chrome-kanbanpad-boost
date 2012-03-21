var KBPBoost = (function($) {
    var my = {};

    // public
    my.toggle_column = function toggle_column(el) {
        if (el.hasClass('boost_collapsed_column')) {
            my.restore_column(el);
        } else {
            my.collapse_column(el);
        }
    };

    my.collapse_column = function collapse_column(el) {
        id = el.attr('id');
        el.addClass('boost_collapsed_column');
        $.cookie(id, 'collapsed');
    };

    my.restore_column = function restore_column(el) {
        id = el.attr('id');
        el.removeClass('boost_collapsed_column');
        $.cookie(id, '');
    };

    my.init = function() {
        // restore columns state onload
        $('.kanban-column').each(function(index) {
            el = $(this);
            id = el.attr('id');
            if ($.cookie(id) == 'collapsed') {
                my.collapse_column(el);
            }
        });

        // attach columns toggling
        $('.kanban-column').each(function(index) {
            col = $(this);
            col.find('h1.edit-step').click(function() {
                my.toggle_column($(this).parent().parent());
            });

        });
    };

    // private
    //function private() {};

    return my;
} (jQuery));

// initialize
$(function() {
    KBPBoost.init();
});
