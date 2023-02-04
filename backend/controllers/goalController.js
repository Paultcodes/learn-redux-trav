const asyncHandler = require('express-async-handler');

//! @desc GET GOALS
//! @route GET /api/goals
//! @access Private

const getGoals = asyncHandler(async (req, res) => {
  res.send('Get goal...');
});

//! @desc Create a goal
//! @route POST /api/goals
//! @access Private

const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.test) {
    res.status(400);
    throw new Error('Please add a text field');
  } else {
    res.status(200).json({ message: 'Created Goal' });
  }
});

//! @desc Update a goal
//! @route PUT /api/goals/:id
//! @access Private

const updateGoal = asyncHandler(async (req, res) => {
  res.send('Goal updated...');
});

//! @desc Delete a goal
//! @route DELETE /api/goals/:id
//! @access Private

const deleteGoal = asyncHandler(async (req, res) => {
  res.send('Goal deleted...');
});

module.exports = {
  getGoals,
  updateGoal,
  createGoal,
  deleteGoal,
};
