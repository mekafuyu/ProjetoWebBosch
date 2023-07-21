$(' #apagar ').on('click', (e) => {
    
    var edv = $("#edvtrash").val();
    var processo = $(e.target).parent().parent().attr('id');
    console.log(processo)
   
    $.ajax({
        type: 'POST',
        url: '/Homecol',
        data: {
            edvtrash: edv,
            processo: processo
        },
        success: (data) => {
            $(' #success-apagar ').removeClass('hide')
            location.reload();
        },
        error: (data) => {
            $(' #success-apagar ').addClass('hide');
            
        }
    });
});