module.exports = {
    async requirementpwd (password) {
        if(password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{5,12}/))
            return true
        return false
    },

    async edvnumber (edv) {
        if (edv.match(/^[0-9]{8}/))
            return true
        return false
    }
}