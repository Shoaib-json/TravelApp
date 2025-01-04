const Joi = require('joi');

module.exports.ListSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price: Joi.number().required().min(0),
        image : Joi.string().required()
    }).unknown(true),
})

module.exports.revSch = Joi.object({
    review : Joi.object({
        comment : Joi.string().required().min(5),
        
        
        
    }).unknown(true),
})