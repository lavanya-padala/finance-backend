const Record = require("../models/Record");

exports.createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    if (!amount || !type) {
      return res.status(400).json({ message: "Amount and type required" });
    }

    const record = await Record.create({
      amount,
      type,
      category,
      date,
      notes,
      createdBy: req.user.id
    });

    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getRecords = async (req, res) => {
  try {
    const { type, category } = req.query;

    let filter = {};
    if (type) filter.type = type;
    if (category) filter.category = category;

    const records = await Record.find(filter);

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateRecord = async (req, res) => {
  try {
    const id=req.params.id;
     const existingRecord = await Record.findById(id);
    
        if (!existingRecord) {
          return res.status(404).json({ message: "Record doesn't exist" });
        }
    const record = await Record.findByIdAndUpdate(
     id,
      req.body,
  { returnDocument: 'after' }
    );

    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteRecord = async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};