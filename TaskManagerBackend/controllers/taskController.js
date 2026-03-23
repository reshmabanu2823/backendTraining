const Task = require("../models/Task");

async function getTasks(req, res, next) {
  try {
    console.log('\n🔵 GET TASKS');
    console.log('req.user:', JSON.stringify(req.user));
    
    if (!req.user || !req.user.id) {
      console.log('❌ No user authenticated');
      return res.status(401).json({ message: "Not authenticated" });
    }

    const userId = String(req.user.id);
    console.log('✅ Fetching for userId:', userId);
    
    const tasks = await Task.find({ userId });
    console.log('✅ Found', tasks.length, 'tasks\n');
    
    res.status(200).json(tasks);
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ message: "Failed to fetch tasks: " + error.message });
  }
}

async function createTask(req, res, next) {
  try {
    console.log('\n🔵 CREATE TASK');
    console.log('req.user:', JSON.stringify(req.user));
    console.log('req.body:', req.body);
    
    const { title } = req.body;
    
    if (!req.user) {
      console.log('❌ No req.user');
      return res.status(401).json({ message: "User not authenticated" });
    }
    
    if (!req.user.id) {
      console.log('❌ No req.user.id');
      console.log('req.user keys:', Object.keys(req.user));
      return res.status(401).json({ message: "User ID not found in authentication token" });
    }

    const userId = String(req.user.id);
    console.log('✅ Auth userId:', userId);

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const titleTrimmed = String(title).trim();
    if (titleTrimmed.length < 3) {
      return res.status(400).json({ message: "Title must be at least 3 characters" });
    }

    console.log('✅ Creating task - title:', titleTrimmed, 'userId:', userId);
    
    const task = new Task({
      title: titleTrimmed,
      userId: userId
    });
    
    const savedTask = await task.save();
    console.log('✅ Task saved:', savedTask._id);
    console.log('🟢 CREATE SUCCESS\n');

    res.status(201).json({ message: "Task created successfully", task: savedTask });
  } catch (error) {
    console.error('\n❌ CREATE ERROR:', error.message);
    console.error(error);
    res.status(500).json({ message: "Failed to create task: " + error.message });
  }
}

async function updateTask(req, res, next) {
  try {
    console.log('\n🔵 UPDATE TASK');
    console.log('req.user:', JSON.stringify(req.user));
    console.log('req.body:', req.body);
    
    const { id } = req.params;
    const { completed } = req.body;
    
    if (!req.user || !req.user.id) {
      console.log('❌ No user authenticated');
      return res.status(401).json({ message: "Not authenticated" });
    }

    const userId = String(req.user.id);
    
    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId !== userId) {
      return res.status(403).json({ message: "You don't have permission to update this task" });
    }

    task.completed = completed;
    const updatedTask = await task.save();
    
    console.log('✅ Task updated:', updatedTask._id);
    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error('❌ UPDATE ERROR:', error.message);
    res.status(500).json({ message: "Failed to update task: " + error.message });
  }
}

async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;
    
    if (!req.user || !req.user.id) {
      console.error('No user ID in request');
      return res.status(401).json({ message: "User not authenticated" });
    }

    const userId = req.user.id.toString();
    
    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the task belongs to the authenticated user
    if (task.userId !== userId) {
      return res.status(403).json({ message: "You don't have permission to delete this task" });
    }

    const result = await Task.findByIdAndDelete(id);
    
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ message: "Failed to delete task: " + error.message });
  }
}

async function clearAllTasks(req, res, next) {
  try {
    console.log('\n🔵 CLEAR ALL TASKS');
    console.log('req.user:', JSON.stringify(req.user));
    
    if (!req.user || !req.user.id) {
      console.log('❌ No user authenticated');
      return res.status(401).json({ message: "Not authenticated" });
    }

    const userId = String(req.user.id);
    console.log('✅ Clearing tasks for userId:', userId);
    
    const result = await Task.deleteMany({ userId });
    console.log('✅ Deleted', result.deletedCount, 'tasks\n');
    
    res.status(200).json({ message: "All tasks cleared successfully", deletedCount: result.deletedCount });
  } catch (error) {
    console.error('❌ CLEAR ALL ERROR:', error.message);
    res.status(500).json({ message: "Failed to clear tasks: " + error.message });
  }
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  clearAllTasks
};