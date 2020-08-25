import Joi from "joi";

const schema = Joi.object({
  workPlanId: Joi.string().required(),
  stageName: Joi.string().required(),
  projectId: Joi.string().required(),
});

const validateStageInput = (stage) => {
  return schema.validate(stage);
};

export default validateStageInput;
