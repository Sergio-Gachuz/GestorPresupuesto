const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async(contrasena) => {
    const salt = await bcrypt.genSalt(10);
    const contrasenaCifrada = await bcrypt.hash(contrasena, salt);

    return contrasenaCifrada;
}

helpers.matchPassword = async(contrasena, savedContrasena) =>{
    try {
        return await bcrypt.compare(contrasena, savedContrasena);
    } catch (error) {
        console.log(error);
    }
}

module.exports = helpers