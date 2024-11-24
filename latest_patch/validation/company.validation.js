import { Joi } from '../utils/import.js'

const companyValidation = async (req, res, next) => {
  try {
    const companyValidation = async (body) => {
      const joiSchema = await Joi.object({
        companyname: Joi.string().required().messages({
          "any.required": "companyname  is required.",
          "string.empty": "companyname cannot be empty.",
        }),
        location: Joi.string().required().messages({
          "any.required": "location  is required.",
          "string.empty": "location cannot be empty.",
        }),
        city: Joi.string().required().messages({
          "any.required": "city  is required.",
          "string.empty": "city cannot be empty.",
        }),
        foundedon: Joi.string().required().messages({
          "any.required": "foundedon  is required.",
          "string.empty": "foundedon cannot be empty.",
        }),
        
      });
      return joiSchema.validate(body, {
        errors: { wrap: { label: "" } },
      });
    };
    const validation = await companyValidation(req.body);
    let response = {};
    if (validation.error) {
      let { details } = validation.error;
      const message = details.map((i) => i.message).join(", ");
      response.message = message;
      response.statusCode = 422;
      response.error = "ValidationError";
      return res.json(response);
    } else {
      next();
    }
  } catch (error) {
    console.log("validation error", error);
  }
};

export { companyValidation };
