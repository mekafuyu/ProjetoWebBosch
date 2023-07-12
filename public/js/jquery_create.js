$(' #createbtn ').on('click', (e) => {
    
    var edv = $("#edv").val();
    var cpf = $("#cpf").val();

    $.ajax({
        type: 'POST',
        url: '/AddCol',
        data: {
            edv: edv,
            cpf: cpf,
           
        },
        success: (data) => {
            $(' #addcol ').trigger('submit')
        },
        error: (data) => {
            $(' #error-create ').removeClass('hide')
            
        }
    });
});

$(' .alerta button ').on('click', (e) => {
    $(' #error-create ').addClass('hide');
});



