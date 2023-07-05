$(' #correct ').on('submit', (e) => {
    e.preventDefault();
    // console.log(e.target.attributes.action.value)
    var formData = new FormData(e.target);
    formData.append('questoes', $(' #questoes ').val())
    // console.log($(' #questoes '))

    $.ajax({
        type: 'POST',
        url: e.target.attributes.action.value,
        data: formData,
        processData: false,
        contentType: false,
        success: (data) => {
            console.log(data)
        },
        error: (data) => {
            
        }
    });
})

$(' #questoes ').on('focusout', (e) => [
    console.log($(' #questoes ').val())
    
])