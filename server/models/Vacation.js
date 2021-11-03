const Joi = require("joi");

class Vacation {
    constructor(vacation, image) {
        this.id = vacation.id;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.start_date = vacation.start_date;
        this.end_date = vacation.end_date;
        this.price = vacation.price;
        this.image = image;
    }

    static #postValidationSchema = Joi.object({
        description: Joi.string().required(),
        destination: Joi.string().required().min(2).max(50),
        start_date: Joi.date().required(),
        end_date: Joi.date().required().greater(Joi.ref('start_date')).message('start date must be before end date'),
        price: Joi.number().required(),
        id: Joi.allow(),
        image: Joi.required()
    });

    validatePost() {
        const result = Vacation.#postValidationSchema.validate(this, { abortEarly: true });
        console.log(result);
        return result.error ? result.error.details.map(err => err.message) : null;
    }

    static #updateValidationSchema = Joi.object({
        description: Joi.string().optional(),
        destination: Joi.string().optional().min(2).max(50),
        start_date: Joi.date().optional(),
        end_date: Joi.date().optional().greater(Joi.ref('start_date')).message('start date must be before end date'),
        price: Joi.number().optional(),
        id: Joi.optional(),
        image: Joi.optional()
    });

    validateUpdate() {
        const result = Vacation.#updateValidationSchema.validate(this, { abortEarly: true });
        console.log(result);
        return result.error ? result.error.details.map(err => err.message) : null;
    }
}

module.exports = Vacation;