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

    my.show_ticket_details = function show_ticket_details(el) {
        id = el.attr('id');
        if( el.data('qtip')  ) {
            return;
        }
        content = '';
        $.get( get_url_for_task(el), function(data) {
            note = $(data).find("#task-note");
            if (note && note.html()) {
                content += '<pre class="task-note">' + note.html() + '</pre>';
            }
            el.qtip({
                content: {
                    prerender: true,
                    title: 'Notes',
                    text: content
                },
                show: {
                    solo: true,
                    delay: 1000,
                    when: {
                        event: 'mouseenter'
                    }
                },
                hide: 'mouseleave',
                onHide: function() { $(this).qtip('destroy'); },
                position: {
                    corner: {
                        target: 'bottomMiddle',
                        tooltip: 'topMiddle'
                    }
                },
                style: {
                    name: 'cream',
                    width: el.outerWidth()
                }
            });
            api = el.qtip("api");
            api.show();
        });
    };

    my.find_tickets = function find_tickets(owner) {
        if (! owner ) {
            owner = 'Unassigned';
        }
        $('.kanban-column ul li').each(function() {
            user = $(this).find('span.asignee').html();
            if ( user != owner ) {
                $(this).stop().animate({opacity: 0.3});
            }

        });
    };
    my.reset_search = function reset_search() {
        $('.kanban-column ul li').each(function() {
            $(this).stop().animate({opacity: 1});
        });
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
            col.find('h1.edit-step .step-name').click(function() {
                my.toggle_column($(this).parent().parent().parent());
            });

        });
        // attach tickets info popup
        $('.kanban-column li.ui-droppable').mouseenter(function() {
            my.show_ticket_details($(this));
        });
        // attach search owner routine
        $('#user-swatch li').mouseenter(function() {
            my.find_tickets($(this).attr('data-name'));
        }).mouseleave(function() {
            my.reset_search();
        });
    };

    // private
    function get_project_id() {
        parts = (document.location + "").split("/");
        parts = parts[4].split("#");
        return parts[0];
    }
    function get_task_id(el) {
        return el.attr('id').split("-")[1];
    }
    function get_task_step_id(el) {
        return el.parent().parent().parent().attr('id').split("-")[1];
    }
    function get_url_for_task(el) {
        return "https://" + location.host + "/projects/" + get_project_id() + "/tasks/" + get_task_id(el);
    }

    return my;
} (jQuery));

// initialize
$(function() {
    KBPBoost.init();
});
