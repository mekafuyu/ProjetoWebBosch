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
            $(' #success-create ').removeClass('hide')
            $(' #error-create ').addClass('hide');
        },
        error: (data) => {
            $(' #error-create ').removeClass('hide')
            $(' #success-create ').addClass('hide');
            
        }
    });
});

$(' .alerta button ').on('click', (e) => {
    $(' #error-create ').addClass('hide');
});
$(' .alerta-bom button ').on('click', (e) => {
    $(' #success-create ').addClass('hide');
});

$(' .fieldre ').on('focus', (e) => {
    $(' #error-create ').addClass('hide')
});




