$(' #correct ').on('submit', async (e) => {
    e.preventDefault();
    $(' #Loading ').modal('show');
    // console.log(e.target.attributes.action.value)
    var formData = new FormData(e.target);

    if ($(e.target).has(" #print ").length){
        formData.set('prova',
                      await (await fetch($(e.target).children(' #boxbtn ').children(' #print ').attr('src'))).blob(),
                      Date.now()+".jpeg")
    }

    var Gabarito = $(' #FormGab ').serializeArray()
    var gabarito = {};

    for (var questao of Gabarito) {
        gabarito[Number(questao['name'])] = questao['value']
        // gabarito = gabarito + + Number(questao['name']) + ' : ["' + questao['value'] + '"],'
    }
    gabarito = JSON.stringify(gabarito)
    // gabarito = gabarito.slice(0,-1) + '}'
    console.log(gabarito)

    formData.append('gabarito', gabarito)
    formData.append('questoes', $(' #questoes ').val())

    $.ajax({
        type: 'POST',
        url: e.target.attributes.action.value,
        data: formData,
        processData: false,
        contentType: false,
        success: (data) => {
            console.log(data)
            console.log('#'+data.cand)
            $(' #Loading ').modal('hide');
            $('#'+data.cand).val(data.nota)
        },
        error: (data) => {
            $(' #Loading ').modal('hide');
        }
    });
})

$(' #questoes ').on('input', (e) => {
    $(' #Gabarito' ).empty();
    $(' #Gabarito' ).append(`<tr>
    <th scope="col" class="strongbg text-center">Questão</th>
    <th scope="col" class="strongbg text-center">Resposta</th>
</tr>`);
    for (let i = 1; i <= $(' #questoes ').val(); i++) {
        var newColumn = $(`<tr>
    <td class="lightbg text-center">${i}</td>
    <td class="lightbg text-center">
        <input type="radio" id="a" name="${i}" value="a">
        <input type="radio" id="b" name="${i}" value="b">
        <input type="radio" id="c" name="${i}" value="c">
        <input type="radio" id="d" name="${i}" value="d">
        <input type="radio" id="e" name="${i}" value="e">
    </td>
</tr>`)
        $(' #Gabarito' ).append(newColumn)
    };
   
})

$(' #setgab ').on('click', (e) => {
    $(' #modalGabarito ').modal('show');
});

$(' .prova ').on('change', (e) => {
    var fileName = $(e.target).val();
    $(e.target).parent().children('label').html(fileName);
})
