
module.exports = {

    async validator(cpf) {

        // Object.defineProperty(this, 'cpfLimpo', {
        //     get: function () {
        //         return cpf.replace(/\D+/g, ''); // é utilizado o get apenas para limpar o número ao receber
        //     }
        // });

        var index = 0;
        var resto = 0;
        var a = false;
        var b = false;

        for (var i = 10; i > 1; i--) 
            index += Number(cpf.charAt(11 - i)) * i;

        if ((index * 10) % 11 == 10 || (index * 10) % 11 == 11) 
            resto = 0;
        else
            resto = (index * 10) % 11;
        

        index = 0;
        if (cpf.charAt(10) == resto)
            a = true


        for (var i = 11; i > 1; i--)
            index += Number(cpf.charAt(12 - i)) * i;

        if ((index * 10) % 11 == 10 || (index * 10) % 11 == 11)
            resto = 0;
        else
            resto = (index * 10) % 11;


        if (cpf.charAt(11) == resto)
            b = true


        if (a == true && b == true)
            return true;

        return false
    },

    async cpfWithoutLetters(cpf) {
        if (!(cpf.match(/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/)))
            return false
        return true
    }
}
