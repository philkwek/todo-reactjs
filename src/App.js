import React, {useState} from 'react';
import $ from 'jquery';
import './index.css';
import TaskDisplay from './components/TaskDisplay.js'
import TaskInput from './components/TaskInput.js';

const testData = [
  {
      "id": "7VmNV41JNwdEOMI7gAbj",
      "taskStatus": "1",
      "userId": "testing",
      "taskDescription": "",
      "taskPriority": 2,
      "taskName": "Hello again"
  },
  {
      "id": "I1vHSi6lsGT15nfkLdgk",
      "taskDescription": "",
      "userId": "testing",
      "taskStatus": "0",
      "taskName": "Buy Milk!",
      "taskPriority": "0"
  },
  {
      "id": "kwMc922hZ1YvxsAYK93R",
      "taskStatus": "2",
      "taskName": "Hello!",
      "taskPriority": 0,
      "userId": "testing",
      "taskDescription": ""
  }
];

function App() {
  const [newTask, setNewTask] = useState('');
  const [allTasks, setAllTasks] = useState('');

  if (allTasks === ''){ //gets tasks from site
    $.get("https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/tasks", function(data, status){
      let taskData = JSON.parse(data);

      const sortedData = SortTasks(taskData);

      setAllTasks(sortedData);
      console.log('Fetched Data');
    });
  };

  const SortTasks = (tasks) => {
    tasks.sort(function(a, b){ //sorts list by order of priority
      return b.taskPriority - a.taskPriority;
    });

    tasks.sort(function(a,b){ //sorts list by order of status
      if (a.taskStatus==2){
        return -1
      } else {
        return 0
      }
    });

    tasks.sort(function(a, b){ //sorts list by order of priority
      if (a.taskStatus==2){
        return b.taskPriority - a.taskPriority;
      } else {
        return 0;
      }
    });

    return tasks;
  }

  const CloseTaskHandler = () => {
    setNewTask();
  }

  const SaveTaskHandler = (event) => {
    const taskData = event;
    //save to cloud
    setAllTasks((prevState) => {
      return [...prevState, taskData]
    });

    CloseTaskHandler();
  };

  const NewTaskHandler = () => {
    setNewTask(<TaskInput closeNewTask={CloseTaskHandler} onSaveTask={SaveTaskHandler}/>)
  };

  const TaskCheckedHandler = (event) => { //updates task status
    //updates server
    $.ajax({
      url:"https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/tasks/" + event.taskId,
      type:"PUT",
      data: {
        taskStatus: event.taskDone
      },
      success: function () {console.log("Put success")}
    });
  };

  const TaskDeleteHandler = (taskId) => {
    //delete task from client
    const newData = allTasks.filter(function(task){
      return task.id != taskId;
    });

    setAllTasks(newData);

    //delete task from server
    $.ajax({
      url:"https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/tasks/" + taskId,
      type:"DELETE",
      data: {},
      success: function () {console.log("Delete success")}
    });
  }

  const PriorityUpdateHandler = (data) => { //gives data of task and it's new priority
  };

  return (
    <div className="flex flex-col place-content-center">
      <div className="w-full h-full sm:w-9/10 sm:h-4/5 md:h-4/6 md:w-3/6 lg:w-2/6 lg:h-3/6 m-auto rounded-lg relative border-0 shadow-md p-5">
        <div className="grid grid-cols-1 gap-5">
          <div><h1 className="text-3xl font-bold font-sans">My Tasks</h1></div>
          <TaskDisplay tasks={allTasks} 
          onTaskDelete={TaskDeleteHandler} onTaskChecked={TaskCheckedHandler} onPriorityUpdate={PriorityUpdateHandler}> 
          </TaskDisplay>
          {newTask}
        </div>
        <div className="absolute bottom-2 right-2">
            <button 
            onClick={NewTaskHandler}
            className="text-white font-bold py-2 px-4 rounded-full m-3
            transition ease-in-out delay-150 bg-black hover:scale-110 hover:bg-blue-500 duration-300">+
            </button>
        </div>
      </div>
    </div>
  );
}

export default App;
