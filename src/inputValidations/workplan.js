import Joi from "joi";

const schema = Joi.object({
  projectId: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});

const validateWorkPlanInput = (workplan) => {
  return schema.validate(workplan);
};

export default validateWorkPlanInput;
