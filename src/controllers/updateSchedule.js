import UpdateSchedule from "../models/updateSchedule";
import validateUpdateScheduleInput from "../inputValidations/updateSchedule";
import Project from "../models/project";
import validateUpdatingUpdateScheduleInput from "../inputValidations/updateUpdateSchedule";

export const createUpdateSchedule = async (req, res) => {
  try {
    const { error } = validateUpdateScheduleInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updateSchedule = new UpdateSchedule({
      projectId: await Project.findOne({ _id: req.body.projectId }),
      lastUpdate: req.body.lastUpdate,
      nextUpdate: req.body.nextUpdate,
    });
    const result = await updateSchedule.save();
    res
      .status(201)
      .json({ message: "updateSchedule created successfully", result });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getOneUpdateSchedule = async (req, res) => {
  try {
    const updateSchedule = await UpdateSchedule.findOne({
      projectid: req.params.projectid,
    });
    if (!updateSchedule) {
      return res.status(400).json({ message: "invalid projectId" });
    }

    res.status(200).json({ message: updateSchedule });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateOneUpdateSchedule = async (req, res) => {
  try {
    const { error } = validateUpdatingUpdateScheduleInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const updateSchedule = await UpdateSchedule.findOne({
      projectid: req.params.projectid,
    });
    if (!updateSchedule) {
      return res.status(400).json({ message: "invalid projectId" });
    }

    updateSchedule.nextUpdate = new Date(req.body.nextUpdate);

    const result = await UpdateSchedule.findOneAndUpdate(
      { projectId: req.params.projectId },
      updateSchedule,
      { upsert: true, new: true }
    );
    res
      .status(200)
      .json({ message: "updateSchedule updated successfully", result });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
