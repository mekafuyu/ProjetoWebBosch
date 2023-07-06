$(' #correct ').on('submit', (e) => {
    e.preventDefault();
    $(' #Loading ').modal('show');
    // console.log(e.target.attributes.action.value)
    var formData = new FormData(e.target);
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
            $(' #Loading ').modal('hide');
        },
        error: (data) => {
            $(' #Loading ').modal('hide');
        }
    });
})

$(' #setgab ').on('click', (e) => {
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
    $(' #modalGabarito ').modal('show');
})

// $(' #questoes ').on('focusout', (e) => [
//     console.log($(' #questoes ').val())
    
// ])

