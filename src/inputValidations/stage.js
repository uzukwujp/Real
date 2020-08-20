import Joi from "joi";

const schema = Joi.object({
  projectId: Joi.string().required(),
  stageName: Joi.string().required(),
});

const validateStageInput = (stage) => {
  return schema.validate(stage);
};

export default validateStageInput;
