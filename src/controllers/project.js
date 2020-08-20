import Project from "../models/project";
import validateProjectInput from "../inputValidations/project";

export const createProject = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    const { error } = validateProjectInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const project = new Project({
      name: req.body.projectName,
      user: req.user.id,
      location: req.body.location,
      projectPlan: req.file.filename,
    });

    const result = await project.save();
    res.status(201).json({ message: "project created successfully", project });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const uploadPhotos = async (req, res) => {
  try {
    const fileNames = req.files.map((x) => {
      return x.filename;
    });
    const project = await Project.findOne({ _id: req.params.projectid });
    if (!project) {
      return res.status(400).json({ message: "invalid project id" });
    }
    project.photos = fileNames;

    const result = await project.save();
    res.status(200).json({ message: "photos uploaded successfully", result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
