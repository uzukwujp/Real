import Milestone from "../models/milestone";
import validateMilestoneInput from "../inputValidations/milestone";
import Stage from "../models/stage";
import Project from "../models/project";

export const createMilestone = async (req, res) => {
  try {
    const { error } = validateMilestoneInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const milestone = new Milestone({
      stageId: await Stage.findOne({ _id: req.body.stageId }),
      mileStones: req.body.mileStones,
      projectId: await Project.findOne({ _id: req.body.projectId }),
    });
    const result = await milestone.save();
    res.status(201).json({ message: "milestone created successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOneMilestone = async (req, res) => {
  try {
    const { error } = validateMilestoneInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let milestone = await Milestone.findOne({ _id: req.params.id });
    if (!milestone) {
      return res.status(400).json({ message: "invalid id provided" });
    }

    milestone.projectId = req.body.projectId;
    milestone.stageId = req.body.stageId;
    milestone.mileStones = req.body.mileStones;
    milestone.markModified("mileStones");

    const result = await milestone.save();

    res.status(200).json({ message: "milestone updated successfully", result });
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: error.message });
  }
};

export const getOneMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.findOne({ _id: req.params.id });

    if (!milestone) {
      return res
        .status(400)
        .json({ message: "invalid projectId or stageName" });
    }
    res.status(200).json({ message: milestone });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
