import Update from "../models/update";
import validateUpdateInput from "../inputValidations/update";
import Project from "../models/project";

export const createUpdate = async (req, res) => {
  try {
    const { error } = validateUpdateInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const update = new Update({
      projectId: await Project.findOne({ _id: req.body.projectId }),
      message: req.body.message,
      createdAt: new Date(req.body.createdAt),
    });

    const result = await update.save();
    res
      .status(201)
      .json({ message: "project  update created successfully", update });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getOneUpdate = async (req, res) => {
  try {
    const result = await Update.find({ projectId: req.params.id })
      .sort({ createdAt: -1 })
      .limit(1);

    if (!result) {
      return res.status(400).json({ message: "invalid projectId" });
    }
    res.status(200).json({ message: result });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
