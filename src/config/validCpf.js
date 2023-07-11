
module.exports = {

    async validator(cpf) {

        var index = 0;
        var resto = 0;
        var a = false;
        var b = false;

        for (var i = 10; i > 1; i--) 
            index += Number(cpf.charAt(10 - i)) * i;

        if ((index % 11) == 0 || (index % 11 == 1) )
            resto = 0;
        else
            resto = 11 - (index % 11);

        
        if (cpf.charAt(9) == resto)
            a = true
        index = 0;

        for (var i = 11; i > 1; i--)
            index += Number(cpf.charAt(11 - i)) * i;

        if ((index % 11) == 0  || (index % 11) == 1)
            resto = 0;
        else
            resto = 11 - (index % 11);

        if (cpf.charAt(10) == resto)
            b = true

        if (a == true && b == true)
            return false;

        return true
    },

    async cpfWithoutLetters(cpf) {
        if (!(cpf.match(/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/)))
            return false
        return true
    }
}
