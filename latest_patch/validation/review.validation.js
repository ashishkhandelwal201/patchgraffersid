import { Joi } from '../utils/import.js'

const reviewValidation = async (req, res, next) => {
  try {
    const reviewValidation = async (body) => {
      const joiSchema = await Joi.object({
        fullname: Joi.string().required().messages({
          "any.required": "fullname  is required.",
          "string.empty": "fullname cannot be empty.",
        }),
        subject: Joi.string().required().messages({
          "any.required": "subject  is required.",
          "string.empty": "subject cannot be empty.",
        }),
        reviewtext: Joi.string().required().messages({
          "any.required": "reviewtext  is required.",
          "string.empty": "reviewtext cannot be empty.",
        }),
        ratings: Joi.string().required().messages({
          "any.required": "ratings  is required.",
          "string.empty": "ratings cannot be empty.",
        }),
        
      });
      return joiSchema.validate(body, {
        errors: { wrap: { label: "" } },
      });
    };
    const validation = await reviewValidation(req.body);
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

export { reviewValidation };
