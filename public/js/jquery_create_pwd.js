$(' #createbtn ').on('click', (e) => {
    
    var senha = $("#senha").val();
   

    $.ajax({
        type: 'POST',
        url: '/AddCol',
        data: {
            senha: senha,
        },
        success: (data) => {
            $(' #addcol ').trigger('submit')
        },
        error: (data) => {
            $(' #error-createpwd ').removeClass('hide')
            
        }
    });
});

$(' .alerta button ').on('click', (e) => {
    $(' #error-createpwd ').addClass('hide');
});

$(' .fieldre ').on('focus', (e) => {
    $(' #error-create ').addClass('hide')
});