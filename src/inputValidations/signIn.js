import Joi from "joi";

const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .required(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const validateSignInInput = (user) => {
  return schema.validate(user);
};

export default validateSignInInput;
