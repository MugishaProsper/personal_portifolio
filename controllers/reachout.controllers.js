import Reachout from "../models/reachout.model.js";

export const getAllReachouts = async (req, res) => {
  try {
    const reachouts = await Reachout.find();
    res.status(200).json(reachouts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getReachout = async (req, res) => {
  try {
    const { reachoutId } = req.params;
    const reachout = await Reachout.findById(reachoutId);
    res.status(200).json(reachout);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createReachout = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newReachout = new Reachout({ name, email, message });
    await newReachout.save();
    res.status(201).json(newReachout);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateReachout = async (req, res) => {
  try {
    const { reachoutId } = req.params;
    const { name, email, message } = req.body;
    const updatedReachout = await Reachout.findByIdAndUpdate(reachoutId, { name, email, message }, { new: true });
    res.status(200).json(updatedReachout);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteReachout = async (req, res) => {
  try {
    const { reachoutId } = req.params;
    await Reachout.findByIdAndDelete(reachoutId);
    res.status(200).json({ message: "Reachout deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const likeReachout = async (req, res) => {
  try {
    const { reachoutId } = req.params;
    const reachout = await Reachout.findById(reachoutId);
    if(!reachout){
      return res.status(404).json({ message: "Reachout not found" });
    }
    reachout.likes++;
    await reachout.save();
    res.status(200).json({ likes : reachout.likes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



