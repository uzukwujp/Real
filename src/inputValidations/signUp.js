import Joi from "joi";

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "dev", "com.ng"] },
    })
    .required(),
  phoneNumber: Joi.number().required(),
  userName: Joi.string().required(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  isAdmin: Joi.boolean(),
});

const validateSignUpInput = (user) => {
  return schema.validate(user);
};
export default validateUserInput;
