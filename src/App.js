import React, {useState} from 'react';
import $ from 'jquery';
import './index.css';
import TaskDisplay from './components/TaskDisplay.js'
import TaskInput from './components/TaskInput.js';

const testData = [
  {
      "id": "4cvQmibYdm1mN8A4uifT",
      "taskName": "Plan Event",
      "taskDescription": "",
      "taskStatus": "true",
      "userId": "HYOePPQ2ZVo1P0G7lch0"
  },
  {
      "id": "SogFb3AqceHpC75jXhS2",
      "taskDescription": "get milk, eggs, flour and sugar for baking",
      "userId": "otherId",
      "taskName": "Get Groceries",
      "taskStatus": "false"
  },
  {
      "id": "mp0blgkCxnpKS3zXYQUr",
      "taskName": "Read Bible",
      "taskDescription": "Matthew 5",
      "userId": "testing",
      "taskStatus": "false"
  },
  {
      "id": "pYEe0XRKgOIvAZbQAqP7",
      "taskName": "Finish Coding Project",
      "taskStatus": "false",
      "userId": "HYOePPQ2ZVo1P0G7lch0",
      "taskDescription": ""
  },
  {
      "id": "y16JDui5yWMmJXvhTTmU",
      "userId": "testing",
      "taskStatus": "false",
      "taskName": "Testing",
      "taskDescription": "Testing123"
  }
]

function App() {
  const [newTask, setNewTask] = useState('');
  const [allTasks, setAllTasks] = useState('');

  //Uncomment when uploading to site
  if (allTasks === ''){
    $.get("https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/tasks", function(data, status){
      const tasks = JSON.parse(data);
      setAllTasks(tasks);
      console.log('Fetched Data');
    });
  };

  const closeTaskHandler = () => {
    setNewTask();
  }

  const saveTaskHandler = (event) => {
    const taskData = event;
    //save to cloud
    setAllTasks((prevState) => {
      return [...prevState, taskData]
    });

    closeTaskHandler();
  };

  const newTaskHandler = () => {
    setNewTask(<TaskInput closeNewTask={closeTaskHandler} onSaveTask={saveTaskHandler}/>)
  };

  const taskCheckedHandler = (event) => { //updates task status
    $.ajax({
      url:"https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/tasks/" + event.taskId,
      type:"PUT",
      data: {
        taskStatus: event.taskDone
      },
      success: function () {console.log("Put success")}
    });
  };

  const taskDeleteHandler = (taskId) => {
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
  //md:h-3/4 md:w-3/4 sm:w-full sm:h-full
  return (
    <div className="flex flex-col place-content-center">
      <div className="w-full h-full sm:w-9/10 sm:h-4/5 md:h-3/6 md:w-3/6 lg:w-2/6 lg:h-2/6 m-auto rounded-lg relative border-0 shadow-md p-5">
        <div className="grid grid-cols-1 gap-5">
          <div><h1 className="text-3xl font-bold font-sans">My Tasks</h1></div>
          <TaskDisplay tasks={allTasks} onTaskDelete={taskDeleteHandler} onTaskChecked={taskCheckedHandler}></TaskDisplay>
          {newTask}
        </div>
        <div className="absolute bottom-2 right-2">
            <button 
            onClick={newTaskHandler}
            className="text-white font-bold py-2 px-4 rounded-full m-3
            transition ease-in-out delay-150 bg-black hover:scale-110 hover:bg-blue-500 duration-300">+
            </button>
        </div>
      </div>
    </div>
  );
}

export default App;
