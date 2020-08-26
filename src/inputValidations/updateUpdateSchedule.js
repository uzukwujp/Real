import Joi from "joi";

const schema = Joi.object({
  nextUpdate: Joi.date().required(),
});

const validateUpdatingUpdateScgeduleInput = (schedule) => {
  return schema.validate(schedule);
};

export default validateUpdatingUpdateScgeduleInput;
