import { Request, Response } from "express";
import Task from "../models/Task";
import User from "../models/User";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate, category } = req.body;
    const userId = res.locals.user._id.toString();

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!title) {
      return res.status(400).json({ error: "Task must have title" });
    }

    const newTask = new Task({
      title,
      description,
      dueDate,
      category,
      user: userId
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error: any) {
    console.log("Error in createTask controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id.toString();

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const tasks = await Task.find({ user: userId }).populate(
      "user",
      "-password"
    );

    if (tasks.length === 0) {
      return res.status(200).json([]);
    }

    res.status(201).json(tasks);

  } catch (error: any) {
    console.log("Error in getAllTasks controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const completeIncompleteTask = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id.toString();
    const taskId = req.params.id

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const task = await Task.findById(taskId)
    if (!task) return res.status(404).json({ message: "Task not found" });

    const isCompleted = task.completed

    if(isCompleted) {
      // To change to incompleted
     const updatedTask =  await Task.findByIdAndUpdate(taskId, {completed: false}, {new: true})
     res.status(201).json(updatedTask);
    }
    else {
      // To change to completed
      const updatedTask =  await Task.findByIdAndUpdate(taskId, {completed: true}, {new: true})
      res.status(201).json(updatedTask);
    }



  } catch (error: any) {
    console.log("Error in completeIncompleteTask controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getCompletedTasks = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id.toString();

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const tasks = await Task.find({ user: userId, completed: true }).populate(
      "user",
      "-password"
    );

    if (tasks.length === 0) {
      return res.status(200).json([]);
    }

    res.status(201).json(tasks);

  } catch (error: any) {
    console.log("Error in getAllTasks controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getInCompletedTasks = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id.toString();

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const tasks = await Task.find({ user: userId, completed: false }).populate(
      "user",
      "-password"
    );

    if (tasks.length === 0) {
      return res.status(200).json([]);
    }

    res.status(201).json(tasks);

  } catch (error: any) {
    console.log("Error in getAllTasks controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getCategoryTasks = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id.toString();
    const category = req.params.category

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const tasks = await Task.find({ user: userId, category: category }).populate(
      "user",
      "-password"
    );

    if (tasks.length === 0) {
      return res.status(200).json([]);
    }

    res.status(201).json(tasks);

  } catch (error: any) {
    console.log("Error in getAllTasks controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const editTask = async (req: Request, res: Response) => {
  try {
    const {title, description, dueDate, category} = req.body
    const taskId = req.params.id
    const userId = res.locals.user._id.toString();

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let task = await Task.findById(taskId).populate(
      "user",
      "-password"
    );

    task.title = title || task.title
    task.description = description || task.description
    task.dueDate = dueDate || task.dueDate
    task.category = category || task.category

    task = await task.save()


    res.status(201).json(task);

  } catch (error: any) {
    console.log("Error in getAllTasks controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);
    if (!task) return res.status(400).json({ error: "Task not found" });


    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task deleted succefully" });

  } catch (error: any) {
    console.log("Error in deleteTask controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};