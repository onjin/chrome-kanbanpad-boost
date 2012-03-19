$(function() {
    // BEGIN: column helpers
    function toggle_column(el) {
        if (el.hasClass('boost_collapsed_column')) {
            restore_column(el);
        } else {
            collapse_column(el);
        }
    }
    function collapse_column(el) {
        id = el.attr('id');
        el.addClass('boost_collapsed_column');
        $.cookie(id, 'collapsed');
    }
    function restore_column(el) {
        id = el.attr('id');
        el.removeClass('boost_collapsed_column');
        $.cookie(id, '');
    }
    // END: column helpers

    // restore columns state onload
    $('.kanban-column').each(function(index) {
        el = $(this);
        id = el.attr('id');
        if ($.cookie(id) == 'collapsed') {
            collapse_column(el);
        }
    });

    // attach columns toggling
    $('.kanban-column').each(function(index) {
        col = $(this);
        col.find('h1.edit-step').click(function() {
            toggle_column($(this).parent().parent());
        });

    });

});
