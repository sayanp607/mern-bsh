import LiveClass from "../models/LiveClass.js";

// Fetch all live classes
export const getLiveClasses = async (req, res) => {
  try {
    const liveClasses = await LiveClass.find();
    res.json(liveClasses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching live classes!" });
  }
};

// Add a new live class
export const createLiveClass = async (req, res) => {
  const { link } = req.body;
  if (!link) return res.status(400).json({ message: "Link is required!" });

  try {
    const newLiveClass = new LiveClass({ link });
    await newLiveClass.save();
    res.status(201).json({ message: "Live class link added!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding live class link!" });
  }
};

//delete live class
export const deleteLiveClass = async (req, res) => {
  const { id } = req.params;

  try {
    const liveClass = await LiveClass.findByIdAndDelete(id);

    if (!liveClass) {
      return res.status(404).json({ message: "Live class not found" });
    }

    res.status(200).json({ message: "Live class deleted successfully", liveClass });
  } catch (error) {
    console.error("Error deleting live class:", error);
    res.status(500).json({ message: "An error occurred while deleting the live class" });
  }
};