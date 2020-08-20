import Stage from "../models/stage";
import Milestone from "../models/milestone";
import Project from "../models/project";
import validateStageInput from "../inputValidations/stage";

export const createStage = async (req, res) => {
  try {
    const { error } = validateStageInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const project = await Project.findOne({ _id: req.body.projectId });
    if (!project) {
      return res.status(400).json({ message: "invalid project id" });
    }

    const milestone = await Milestone.findOne({
      projectName: project.name,
      stageName: req.body.stageName,
    });
    if (!milestone) {
      return res
        .status(400)
        .json({ message: "No milestone with the given stage name found" });
    }
    const stage = new Stage({
      projectName: project.name,
      stageName: req.body.stageName,
      milestone: milestone._id,
    });
    const result = await stage.save();
    res.status(201).json({ message: "stage creation successful", result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
