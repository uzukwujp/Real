import Joi from "joi";
const schema = Joi.object({
  projectId: Joi.string().required(),
  stageId: Joi.string().required(),
  mileStones: Joi.object().required(),
});

const validateMilestoneInput = (milestone) => {
  return schema.validate(milestone);
};

export default validateMilestoneInput;
