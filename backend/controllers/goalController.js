const asyncHandler = require('express-async-handler');
const Goal = require('../model/goalModel');
const User = require('../model/userModel');

//! @desc GET GOALS
//! @route GET /api/goals
//! @access Private

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

//! @desc Create a goal
//! @route POST /api/goals
//! @access Private

const createGoal = asyncHandler(async (req, res) => {
  try {
    if (!req.body.text) {
      res.status(400);
      throw new Error('Please add a text field');
    }

    const goal = await Goal.create({
      text: req.body.text,
      user: req.user.id,
    });

    res.status(200).json(goal);
  } catch (err) {}
});

//! @desc Update a goal
//! @route PUT /api/goals/:id
//! @access Private

const updateGoal = asyncHandler(async ({ params, body }, res) => {
  try {
    const goal = await Goal.findById(params.id);

    if (!goal) {
      res.status(400);
      throw new Error('Goal not found');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }

    if (goal.user.toString() !== user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }
    const updatedGoal = await Goal.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    res.status(200).json(updatedGoal);
  } catch (err) {
    res.status(500).json({ message: 'Goal not found..Error...' });
  }
});

//! @desc Delete a goal
//! @route DELETE /api/goals/:id
//! @access Private

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  const user = await User.findById(req.user.id);

    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }

    if (goal.user.toString() !== user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  updateGoal,
  createGoal,
  deleteGoal,
};
