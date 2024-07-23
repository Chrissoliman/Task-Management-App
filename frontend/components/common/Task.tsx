import { AppDispatch } from '@/store';
import { deleteTask, toggleTaskCompletion } from '@/store/slices/taskSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import CreateTask from './CreateTask';

interface TaskProps {
  task: {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    category: string;
    completed: boolean;
  };
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [edit, setEdit] = useState(false)

  async function deleteHandler() {
    await dispatch(deleteTask(task._id))
  }

  async function toggleCompleteTask() {
    await dispatch(toggleTaskCompletion(task._id))
  }

  async function editHandler() {
    setEdit(true)
  }

  return (
    <>
    {edit && <CreateTask editMode={edit} setEditMode={setEdit} task={task} />}
    <div className="bg-gray-900 h-64 max-w-xl flex flex-col justify-between p-4 rounded-lg shadow-md">
      <div>
        <div className='flex justify-between'>
          <h3 className="font-bold text-white text-lg">{task.title}</h3>
          <h3 className="text-gray-50 text-sm pt-1 opacity-70">{task.category}</h3>
        </div>
        {task.description && <p className="text-gray-100 mt-2 mb-2 text-base">{task.description}</p>}
        {task.dueDate && <p className="text-gray-300 text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
      </div>
      <div className="flex justify-between items-center space-x-2">
        <div>
          <button onClick={toggleCompleteTask} className={`text-white text-sm p-3 rounded-full bg-green-700 hover:bg-green-900 ${!task.completed && 'bg-red-700 hover:bg-red-900'}`}>{task.completed ? 'Completed' : 'Incompleted'}</button>
        </div>
        <div className='flex items-center space-x-2'>
          <button onClick={deleteHandler} className=" text-white hover:text-red-500 text-2xl"><AiOutlineDelete /></button>
          <button onClick={editHandler} className="text-white hover:text-blue-500 text-xl"><FaRegEdit /></button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Task;
