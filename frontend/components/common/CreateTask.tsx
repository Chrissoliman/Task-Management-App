import { AppDispatch, RootState } from '@/store';
import { addTask, editTask } from '@/store/slices/taskSlice';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Task {
  _id?: string;
  title: string;
  description: string;
  dueDate: string;
  category: string;
}

interface CreateTaskProps {
  editMode: boolean;
  setEditMode?: (edit: boolean) => void;
  task?: Task;
}

const CreateTask: React.FC<CreateTaskProps> = ({ editMode, setEditMode, task }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.tasks);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (setEditMode) {
      setEditMode(false)
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (task) {
      setFormData({ ...task, dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '' })
    }
  }, [task])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask: Task = { ...formData };
    try {
      let resultAction
      if (editMode) {
        resultAction = await dispatch(editTask({ id: newTask._id, updatedTask: newTask }));
        if (editTask.fulfilled.match(resultAction)) {
          console.log('Task created:', newTask);
          closeModal();
        } else {
          console.error('Failed to edit task:', resultAction.payload);
        }
      } else {
        resultAction = await dispatch(addTask(newTask));
        if (addTask.fulfilled.match(resultAction)) {
          console.log('Task created:', newTask);
          closeModal();
        } else {
          console.error('Failed to create task:', resultAction.payload);
        }
      }
    } catch (error) {
      console.error('Error in handleCreateTask:', error);
    }
  };

  return (
    <>
      {!editMode && <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        onClick={openModal}
      >
        Create Task
      </button>}
      {(isModalOpen || editMode) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal-box bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
            <h3 className="font-bold text-2xl mb-4 text-white">{editMode ? 'Edit Task' : 'Create a New Task'}</h3>
            <form onSubmit={handleCreateTask}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 p-2"
                  value={formData.title}
                  onChange={handleInputChange}
                  name="title"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  className="w-full rounded-lg border border-gray-300 p-2"
                  value={formData.description}
                  onChange={handleInputChange}
                  name="description"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Due Date</label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-300 p-2"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  name="dueDate"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1"> Category </label>

                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1.5 p-2 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                >
                  <option value="">Please Select</option>
                  <option value="shopping">Shopping</option>
                  <option value="personal">Personal</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="modal-action flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? 'Adding...' : editMode ? 'Edit Task' : 'Add Task'}
                </button>
              </div>
              {error && (
                <div className="mt-4 text-red-500 text-sm">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTask;
