$(function() {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(data) {
            rander(data.data);
        }
    })
});

function rander(data) {

}