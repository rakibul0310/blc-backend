const Update = require("../../models/updateModel");

const createUpdate = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newUpdate = await Update.create({
      title,
      description,
    });

    if (newUpdate) {
      res.json({ message: "New update created successfully" });
    } else {
      res.json({ message: "Something wrong" });
    }
  } catch (error) {
    res.status(400).json({
      message: error.toString(),
    });
  }
};

module.exports = {
  createUpdate,
};
