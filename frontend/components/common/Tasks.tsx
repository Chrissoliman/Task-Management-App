import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import Task from './Task';
import { fetchCategoryTasks, fetchCompletedTasks, fetchIncompletedTasks, fetchTasks } from '@/store/slices/taskSlice';

const Tasks: React.FC<{ selectedCategory: string }> = ({ selectedCategory }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, isLoading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    if (selectedCategory === 'all') {
      dispatch(fetchTasks());
    } else if(selectedCategory === 'completed') {
      dispatch(fetchCompletedTasks());
    } else if(selectedCategory === 'incompleted') {
      dispatch(fetchIncompletedTasks());
    } else if(selectedCategory === 'shopping' || selectedCategory === 'personal' || selectedCategory === 'other') {
      dispatch(fetchCategoryTasks(selectedCategory));
    } else {
      dispatch(fetchTasks());
    }
  }, [dispatch, selectedCategory]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {tasks.length > 0 ? (
        tasks.map((task) => <Task key={task._id} task={task} />)
      ) : (
        <div className="text-center col-span-full text-white text-xl">No tasks available</div>
      )}
    </div>
  );
};

export default Tasks;
