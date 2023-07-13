$(' #addcol ').on('click', (e) => {
    
    var edv = $("#edv2").val();
    var senha = $("#newsenha").val();
    var cpf = $("#Cpf").val();
    var confirmsenha = $("#confirmnewsenha").val(); 
    console.log(edv, senha, cpf, confirmsenha)

    $.ajax({
        type: 'POST',
        url: '/ChangePwd',
        data: {
            edv2: edv,
            Cpf: cpf,
            newsenha: senha,
            confirmnewsenha: confirmsenha
        },
        success: (data) => {
            $(' #success-update ').removeClass('hide')
        },
        error: (data) => {
            $(' #error-update ').removeClass('hide')
            $(' #success-update ').addClass('hide');
            
        }
    });
});

$(' .alerta button ').on('click', (e) => {
    $(' #error-update ').addClass('hide');
});
$(' .alerta-bom button ').on('click', (e) => {
    $(' #success-update ').addClass('hide');
});

$(' .fieldre ').on('focus', (e) => {
    $(' #error-update ').addClass('hide')
});
