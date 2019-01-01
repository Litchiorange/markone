window.onload = function() {
    //better-scroll
    var bas = new BScroll('section', {
        click: true,
        probeType: 2
    });

    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(data) {
            rander(data.data);
        }
    });

    function rander(data) {
        // console.log(data)
        var html = '';
        $.each(data, function(index, item) {
            html += `
            <div class="pic">
                <h2>${item.title}</h2>
                <p>${item.price}</p>
                <p>${item.num}</p>
            </div>
        `;
        });
        $('.con').append(html);
    }
}