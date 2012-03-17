$(function() {
    $('.kanban-column').each(function(index) {
        col = $(this);
        col.find('h1.edit-step').click(function() {
            $(this).parent().parent().toggleClass('boost_collapsed_column');
        });

    });

});
