const Record = require("../models/Record");

exports.getSummary = async (req, res) => {
  try {
    const income = await Record.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const expense = await Record.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    res.json({
      totalIncome: income[0]?.total || 0,
      totalExpense: expense[0]?.total || 0,
      balance:
        (income[0]?.total || 0) - (expense[0]?.total || 0)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const buildFilter = (query) => {
  const { type, category, startDate, endDate } = query;

  let filter = {};

  if (type) filter.type = type;
  if (category) filter.category = category;

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  return filter;
};


exports.getCategoryTotals = async (req, res) => {
  try {
    const filter = buildFilter(req.query);

    const result = await Record.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" }
        }
      },
      { $sort: { totalAmount: -1 } }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getRecentActivity = async (req, res) => {
  try {
    const result = await Record.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getMonthlyTrends = async (req, res) => {
  try {
    const filter = buildFilter(req.query);

    const result = await Record.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          totalAmount: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getWeeklyTrends = async (req, res) => {
  try {
    const filter = buildFilter(req.query);

    const result = await Record.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            week: { $week: "$date" }
          },
          totalAmount: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.week": 1 } }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};