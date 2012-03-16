$(function() {
    $('.kanban-column').each(function(index) {
        col = $(this);
        col.find('h1 em.step-name').click(function() {
            $(this).parent().parent().parent().toggleClass('boost_collapsed_column');
        });

    });

});
