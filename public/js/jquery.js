$(' #Entrar ').on('click', (e) => {
    
    var edv = $("#edv").val();
    var senha = $("#senha").val();

    $.ajax({
        type: 'POST',
        url: '/LoginCol',
        data: {
            edv: edv,
            senha: senha
        },
        success: (data) => {
            $(' #login ').trigger('submit')
        },
        error: (data) => {
            $(' #error ').removeClass('hide')
            
        }
    });
});

$(' .alerta button ').on('click', (e) => {
    $(' #error ').addClass('hide');
})
