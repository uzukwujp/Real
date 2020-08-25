import Project from "../models/project";
import validateProjectInput from "../inputValidations/project";
import Workplan from "../models/workplan";
import Milestone from "../models/milestone";
import Stage from "../models/stage";
import { join } from "path";
import promisifiedUnlink from "../utilities/unlink";
import User from "../models/user";
import mongoose from "mongoose";

export const createProject = async (req, res) => {
  try {
    const { error } = validateProjectInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const project = new Project({
      name: req.body.projectName,
      user: await User.findOne({ _id: req.user.id }),
      location: req.body.location,
      projectPlan: req.file.filename,
    });

    const result = await project.save();
    res.status(201).json({ message: "project created successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Workplan.find({}).populate({
      path: "projectId",
      populate: { path: "user" },
    });

    if (!projects) {
      return res
        .status(400)
        .json({ message: "you do not have any project yet" });
    }
    res.status(200).json({ message: projects });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getAllClientsProjects = async (req, res) => {
  try {
    const projects = await Project.find({ _id: req.user.id });
    if (!projects) {
      return res
        .status(400)
        .json({ message: "you do not cuurently have a project" });
    }
    res.status(200).json({ message: projects });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

//provide project id as path variable
export const getOneProjectDetails = async (req, res) => {
  try {
    const details = await Milestone.find({
      projectId: { _id: req.params.projectId },
    })
      .populate({
        path: "projectId",
        model: "Project",
      })
      .populate({
        path: "stageId",
        select: "stageName",
        model: "Stage",
        populate: {
          path: "workPlanId",
          select: "progress",
          model: "Workplan",
        },
      });

    if (!details) {
      return res.status(400).json({ message: "invalid project id" });
    }
    res.status(200).json({ message: details });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateOneProject = async (req, res) => {
  try {
    const { error } = validateProjectInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let project = await Project({ _id: req.params.id });
    if (!project) {
      return res.status(400).json({ message: "no such project found" });
    }
    if (!req.file) {
      project.name = req.body.projectName;
      project.location = req.body.location;
    } else {
      project.name = req.body.projectName;
      project.location = req.body.location;
      project.projectPlan = req.file.filename;
    }
    const result = await project.save();
    res.status(200).json({ message: result });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const deleteOneProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });
    if (project.photos.length > 0) {
      for (let fileName of project.photos) {
        await promisifiedUnlink(join(__dirname, `../images/${fileName}`));
      }
    }

    await promisifiedUnlink(
      join(__dirname, `../projectPlans/${project.projectPlan}`)
    );

    const result = await Promise.all([
      Project.deleteOne({ _id: req.params.id }),
      Workplan.deleteOne({ projectId: req.params.id }),
      Stage.deleteMany({ projectId: req.params.id }),
      Milestone.deleteMany({ projectId: req.params.id }),
    ]);
    res.status(200).json({ message: "project successfully deleted", result });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// two handlers left update one project and delete one project
