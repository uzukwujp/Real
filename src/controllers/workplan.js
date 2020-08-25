import Workplan from "../models/workplan";
import validateWorkPlanInput from "../inputValidations/workplan";
import Project from "../models/project";

export const createWorkPlan = async (req, res) => {
  try {
    const { error } = validateWorkPlanInput(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const workPlan = new Workplan({
      projectId: await Project.findOne({ _id: req.body.projectId }),
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
    });

    const result = await workPlan.save();

    res.status(201).json({ message: "workplan created successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateWorkPlan = async (req, res) => {
  try {
    const { error } = validateWorkPlanInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    let workPlan = {};
    workPlan.projectId = await Project.findOne({ _id: req.body.projectId });
    workPlan.startDate = req.body.startDate;
    workPlan.endDate = req.body.endDate;
    const result = await Workplan.findOneAndUpdate(
      { _id: req.params.id },
      workPlan,
      { upsert: true, new: true }
    );
    res.status(200).json({ message: "workPlan updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
