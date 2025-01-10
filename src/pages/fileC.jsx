const Notification = require("../models/notificationModel");
const Doctor = require("../models/doctorModel");
const mongoose = require("mongoose");

exports.addSymptom = async (req, res) => {
  const { patientId, symptome, doctorId, patientName } = req.body;
  try {
    const newNotification = new Notification({
      doctorId: doctorId,
      patientId: patientId,
      patientName: patientName,
      type: "symptome",
      detail: symptome,
      date: new Date(),
    });
    await newNotification.save();

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

    // Lors de l'envoi de la notification
    global.io.emit("notification", {
      id: generateId(),
      doctorId: doctorId,
      patientId: patientId,
      patientName: patientName,
      type: "symptome",
      detail: symptome,
      date: new Date(),
    });

    res.status(200).json({ message: "Symptome added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addProblem = async (req, res) => {
  const { patientId, problem, doctorId, patientName } = req.body;
  try {
    const newNotification = new Notification({
      doctorId: doctorId,
      patientId: patientId,
      patientName: patientName,
      type: "problem",
      detail: problem,
      date: new Date(),
    });
    await newNotification.save();
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const generateId = () => "_" + Math.random().toString(36).substr(2, 9);
    global.io.emit("notification", {
      id: generateId(),
      doctorId: doctorId,
      patientId: patientId,
      patientName: patientName,
      type: "problem",
      detail: problem,
      date: new Date(),
    });

    res.status(200).json({ message: "problem added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNotificationsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const notifications = await Notification.find({ patientId });
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
exports.getNotificationsByUser = async (req, res) => {
  try {
    const doctorId =
      req.params.doctorId ||
      req.query.doctorId ||
      req.params.userId ||
      req.query.userId;

    // Vérifiez si doctorId est un ObjectId valide
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ error: "Invalid doctor ID" });
    }
    const notifications = await Notification.find({
      doctorId,
    });
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
exports.UpdateIsRead = async (req, res) => {
  try {
    const notifications = req.body;
    if (Array.isArray(notifications)) {
      await Promise.all(
        notifications.map(async (notif) => {
          await Notification.findByIdAndUpdate(notif._id, {
            isRead: notif.isRead,
          });
        })
      );
      res.status(200).json({ message: "Notifications updated" });
    } else {
      res.status(400).json({ message: "Invalid data format" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating notifications", error });
  }
};

exports.getTopProblems = async (req, res) => {
  try {
    console.log("Fetching top problems");
    const topPatients = await Notification.aggregate([
      { $match: { type: "problem" } },
      {
        $group: {
          _id: "$patientId",
          count: { $sum: 1 },
          patientName: { $first: "$patientName" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    console.log("Top Patients Aggregation Result:", topPatients);

    const totalProblems = await Notification.aggregate([
      { $match: { type: "problem" } },
      {
        $group: {
          _id: null,
          totalCount: { $sum: 1 },
        },
      },
    ]);

    console.log("Total Problems Aggregation Result:", totalProblems);

    const totalResolvedProblems = await Notification.aggregate([
      { $match: { type: "problem", resolved: true } },
      {
        $group: {
          _id: null,
          totalCount: { $sum: 1 },
        },
      },
    ]);

    console.log(
      "Total Resolved Problems Aggregation Result:",
      totalResolvedProblems
    );

    res.json({
      topPatients,
      totalProblems: totalProblems.length > 0 ? totalProblems[0].totalCount : 0,
      totalResolvedProblems:
        totalResolvedProblems.length > 0
          ? totalResolvedProblems[0].totalCount
          : 0,
    });
  } catch (error) {
    console.error("Error fetching top problems:", error);
    res.status(500).send("Server Error");
  }
};

exports.getHistory = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const notifications = await Notification.find({ doctorId }).sort({
      date: -1,
    }); // Trier par date décroissante
    res.json({ success: true, notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.resolveProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);
    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }
    notification.resolved = true;
    await notification.save();
    res.json({ success: true, notification });
  } catch (error) {
    console.error("Error resolving problem:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
