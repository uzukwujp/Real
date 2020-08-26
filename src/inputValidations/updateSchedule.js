import Joi from "joi";

const schema = Joi.object({
  lastUpdate: Joi.date(),
  nextUpdate: Joi.date(),
  projectId: Joi.string().required(),
});

const validateUpdateScheduleInput = (schedule) => {
  return schema.validate(schedule);
};

export default validateUpdateScheduleInput;
