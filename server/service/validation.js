function isEmail(email) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailFormat)) { return true; }

    return false;
};

const isPhoneNumber = (phoneNumber) => {
    var phoneNumberFormat = /^\d{10}$/;
    if (phoneNumber !== '' && phoneNumber.match(phoneNumberFormat)) {
        return true;
    }
    return false;
};

const isCharacter = (personName) => {
    var nameFormat = /^[a-zA-Z\s]+$/;
    if (personName !== '' && personName.match(nameFormat)) {
        return true;
    }
    return false;
};

const isStrongPassword = (strongPassword) => {
    var strongPasswordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (strongPassword !== '' && strongPassword.match(strongPasswordFormat)) {
        return true;
    }
    return false;
}

module.exports = { isEmail, isPhoneNumber, isCharacter, isStrongPassword };