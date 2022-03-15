import React, {useEffect, useState} from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import $ from 'jquery';
import './index.css';
import TaskDisplay from './components/TaskDisplay.js'
import TaskInput from './components/TaskInput.js';
import TaskHeader from './components/TaskHeader.js';
import Account from './components/Account.js';
import FriendsPage from './components/FriendsPage.js';
import FriendsTasks from './components/FriendsTasks.js';
import {UserIcon, UserGroupIcon} from '@heroicons/react/solid'

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

const auth = getAuth();

function App() {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [privateTask, setPrivateTask] = useState(false);

  //function ensures userId & username is always up to date with current user
  useEffect(() => { //updates userId state on auth change
    onAuthStateChanged(auth, (user) => { //gets user's uid on sign in or sign up
      if (user) {
        const uid = user.uid;
        if (userId != uid){
          $.get("https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/user/" + uid, function(data, status){
            const userData = JSON.parse(data);
            setUsername(userData.username);
            setUserId(uid);
          })
        };
      } else {
        setUsername('');
        setUserId('');
      }
    });
  })

  const [newTask, setNewTask] = useState('');
  const [allTasks, setAllTasks] = useState('');

  const [accountPage, setAccountPage] = useState('');
  const [accountClassName, setAccountClassName] = useState("w-full h-full sm:w-9/10 sm:h-4/5 md:h-4/6 md:w-3/6 lg:w-2/6 lg:h-3/6 m-auto rounded-lg relative border-0 shadow-md p-5")

  const [friendsPage, setFriendsPage] = useState('');
  const [friendTaskPage, setFriendTaskPage] = useState('');

  if (allTasks === '' && userId != '' && privateTask == false){ //gets tasks from site on first setup
    if (privateTask){
      $.get("https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/tasks/privateTasks/" + userId, function(data, status){
        let taskData = JSON.parse(data);
  
        const sortedData = SortTasks(taskData);
  
        setAllTasks(sortedData);
      });
    } else {
      $.get("https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/tasks/" + userId, function(data, status){
        let taskData = JSON.parse(data);
  
        const sortedData = SortTasks(taskData);
  
        setAllTasks(sortedData);
      });
    }
  };

  useEffect(()=>{ //switches mode of task list from private to public
    if (privateTask){
      $.get("https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/tasks/privateTasks/" + userId, function(data, status){
        let taskData = JSON.parse(data);
  
        const sortedData = SortTasks(taskData);
  
        setAllTasks(sortedData);
      });
    } else {
      $.get("https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/tasks/" + userId, function(data, status){
        let taskData = JSON.parse(data);
  
        const sortedData = SortTasks(taskData);
  
        setAllTasks(sortedData);
      });
    }
  }, [privateTask])

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
    SortTasks(allTasks);
    CloseTaskHandler();
  };

  const NewTaskHandler = () => {
    setNewTask(<TaskInput privateStatus={privateTask} closeNewTask={CloseTaskHandler} onSaveTask={SaveTaskHandler} userId={userId}/>)
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

  const CloseAccountHandler = () =>{ 
    setAccountPage('');
    setAccountClassName("w-full h-full sm:w-9/10 sm:h-4/5 md:h-4/6 md:w-3/6 lg:w-2/6 lg:h-3/6 m-auto rounded-lg relative border-0 shadow-md p-5");
  };

  const OpenAccountHandler = () => {
    if (accountPage == ''){
      setAccountPage(<Account onAccountClose={CloseAccountHandler} username={username} />);
      setAccountClassName("w-full h-full sm:w-9/10 sm:h-4/5 md:h-4/6 md:w-3/6 lg:w-2/6 lg:h-3/6 m-auto rounded-lg relative border-0 shadow-md p-5 blur-sm")
    } 
  };

  const CloseFriendsHandler = () =>{ 
    setFriendsPage('');
    setAccountClassName("w-full h-full sm:w-9/10 sm:h-4/5 md:h-4/6 md:w-3/6 lg:w-2/6 lg:h-3/6 m-auto rounded-lg relative border-0 shadow-md p-5");
  };

  const OpenFriendTask = (data) => {
    console.log(data);
    setFriendTaskPage(<FriendsTasks friendData={data} onCloseFriendTasks={CloseFriendTask} />);
  };

  const CloseFriendTask = () => {
    setFriendTaskPage('');
  };

  const OpenFriendHandler = () => {
    if (friendsPage ==''){
      setFriendsPage(<FriendsPage onFriendsClose={CloseFriendsHandler} userId={userId} onFriendTask={OpenFriendTask}/>)
      setAccountClassName("w-full h-full sm:w-9/10 sm:h-4/5 md:h-4/6 md:w-3/6 lg:w-2/6 lg:h-3/6 m-auto rounded-lg relative border-0 shadow-md p-5 blur-sm");
    }
  };

  const PrivateTaskHandler = (data) => {
    console.log(data);
    setPrivateTask(data);
  };

  React.useEffect(()=>{

  },[accountPage])

  return (
    <div className="flex flex-col place-content-center">
      <div className={accountClassName}>
        <div className="grid grid-cols-1 gap-5">
          <TaskDisplay tasks={allTasks} username={username} userId={userId} taskPrivate={privateTask}
          onTaskDelete={TaskDeleteHandler} onPrivate={PrivateTaskHandler}> 
          </TaskDisplay>
          {newTask}
        </div>
        <div className="absolute bottom-2 right-2">
          <div className="flex flex-row items-center">
            <button 
            onClick={NewTaskHandler}
            className="text-white font-bold py-2 px-4 rounded-full m-3
            transition ease-in-out delay-150 bg-black hover:scale-110 hover:bg-blue-500 duration-300">+
            </button>
            <button 
            onClick={OpenFriendHandler}
            className="flex w-10 h-10 m-3 rounded-full focus:ring-2 ml-3 hover:scale-110 bg-gray-200 hover:bg-blue-400 duration-300 justify-center items-center">
              <UserGroupIcon className="w-5 h-5" />
            </button>
            <button 
            onClick={OpenAccountHandler}
            className="flex w-10 h-10 m-3 rounded-full focus:ring-2 ml-3 hover:scale-110 bg-gray-200 hover:bg-blue-400 duration-300 justify-center items-center">
              <UserIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      {accountPage}
      {friendsPage}
      {friendTaskPage}
    </div>
  );
}

export default App;
