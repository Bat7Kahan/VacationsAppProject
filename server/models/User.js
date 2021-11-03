const Joi = require("joi");

class User {
    constructor(user){
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.username  = user.username;
        this.password = user.password;
    }

    static #validationSchema = Joi.object({
        firstname: Joi.string().required().min(2).max(50),
        lastname: Joi.string().required().min(2).max(50),
        username: Joi.string().required().min(2).max(50),
        password: Joi.string().required().min(2).max(50)
    });

    validate() {
        const result = User.#validationSchema.validate(this, { abortEarly: true });
        return result.error ? result.error.details.map(err => err.message) : null;
    }
}

module.exports = User;