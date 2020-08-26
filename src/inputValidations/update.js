import Joi from "joi";

const schema = Joi.object({
  projectId: Joi.string().required(),
  message: Joi.string().required(),
  createdAt: Joi.date(),
});

const validateUpdateInput = (update) => {
  return schema.validate(update);
};

export default validateUpdateInput;
