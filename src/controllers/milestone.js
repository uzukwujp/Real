import Milestone from "../models/milestone";
import validateMilestoneInput from "../inputValidations/milestone";
import Project from "../models/project";

export const createMilestone = async (req, res) => {
  try {
    const { error } = validateMilestoneInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const project = await Project.findOne({ _id: req.body.projectId });
    if (!project) {
      return res.status(400).json({ message: "no such project exist" });
    }
    const milestone = new Milestone({
      projectName: project.name,
      stageName: req.body.projectStage,
      mileStones: req.body.mileStones,
    });
    const result = await milestone.save();
    res.status(201).json({ message: "milestone created successfully", result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateOneMilestone = async (req, res) => {
  try {
    const { error } = validateMilestoneInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const project = await Project.findOne({ _id: req.body.projectId });
    if (!project) {
      return res.status(400).json({ message: "invalid project id" });
    }
    let milestone = {};
    milestone.projectname = project.name;
    milestone.stageName = req.body.projectStage;
    milestone.mileStones = req.body.mileStones;
    const result = await Milestone.findOneAndUpdate(
      { projectName: project.name, stageName: req.body.projectStage },
      milestone,
      {
        new: true,
        upsert: true,
      }
    );
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
