import Stage from "../models/stage";
import validateStageInput from "../inputValidations/stage";
import Project from "../models/project";
import Workplan from "../models/workplan";

export const createStage = async (req, res) => {
  try {
    const { error } = validateStageInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const stage = new Stage({
      workPlanId: await Workplan.findOne({ _id: req.body.workPlanId }),
      stageName: req.body.stageName,
      projectId: await Project.findOne({ _id: req.body.projectId }),
    });
    const result = await stage.save();
    res.status(201).json({ message: "stage creation successful", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStage = async (req, res) => {
  try {
    const { error } = validateStageInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    let stage = {};
    stage.workPlanId = await Workplan.findOne({ _id: req.body.workPlanId });
    stage.stageName = req.body.stageName;
    stage.projectId = await Project.findOne({ _id: req.body.projectId });

    const result = await Stage.findOneAndUpdate({ _id: req.params.id }, stage, {
      upsert: true,
      new: true,
    });
    res.status(200).json({ message: "stage updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.stack.message });
  }
};
