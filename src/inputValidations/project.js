import Joi from "joi";

const schema = Joi.object({
  projectName: Joi.string().required(),
  location: Joi.string().required(),
});

const validateProjectInput = (project) => {
  return schema.validate(project);
};

export default validateProjectInput;
