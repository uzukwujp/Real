import Joi from "joi";
import validateUserInput from "./signUp";

const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "dev", "com.ng"] },
    })
    .required(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const validateSignInInput = (user) => {
  return schema.validate(user);
};

export default validateSignInInput;
