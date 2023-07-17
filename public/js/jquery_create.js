$(' #Cadastrar ').on('click', (e) => {
    
    var edv = $("#edv").val();
    var cpf = $("#cpf").val();
    var senha = $("#senha").val();
   
    $.ajax({
        type: 'POST',
        url: '/AddCol',
        data: {
            edv: edv,
            cpf: cpf,
            senha: senha
        },
        success: (data) => {
            $('#addcol').modal('hide')
            $(' #error-create ').addClass('hide');
        },
        error: (data) => {
            $(' #error-create ').removeClass('hide')
            
        }
    });
});

$(' .alerta button ').on('click', (e) => {
    $(' #error-create ').addClass('hide');
});




