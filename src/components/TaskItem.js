import React, {useState, useEffect, useRef} from 'react';
import $ from "jquery";
import '../index.css';
import '../components/css/TaskItem.css';
import Fade from 'react-reveal/Fade';
import {CheckIcon, CogIcon} from '@heroicons/react/solid'

const btnStates = [
    <div className="w-5 h-5 rounded-full border-2 border-gray-500"></div>, //undone task
    <CogIcon className="w-5 h-5 text-white bg-yellow-400 rounded-full"/>, //in-progress task
    <CheckIcon className="w-5 h-5 text-white bg-green-700 rounded-full"/>  //done task
]

const TaskItem = (props) => {
    const taskPrivate = props.taskPrivate;
    const firstRender = useRef(false);

    const [taskMenuState, setTaskMenuState] = useState('');
    const [taskBtnState, setTaskBtnState] = useState(btnStates[props.taskStatus])
    
    const [taskStatusNo, setTaskStatusNo] = useState(props.taskStatus);
    const [taskPriority, setTaskPriority] = useState(props.taskPriority);

    let setDate = props.taskDate;
    if (setDate == "0000-00-00"){
        setDate = '';
    }
    const [taskDate, setTaskDate] = useState(setDate);

    const ChangeStatusHandler = () => {
        if (taskStatusNo == 0){
            setTaskBtnState(btnStates[1]);
            setTaskStatusNo(1);

        } else if (taskStatusNo == 1){
            setTaskBtnState(btnStates[2]);
            setTaskStatusNo(2);

        } else if (taskStatusNo == 2){
            setTaskBtnState(btnStates[0]);
            setTaskStatusNo(0);
        }
    }

    useEffect(() => {
        if (firstRender.current){
            if (taskPrivate){
                $.ajax({
                    url:"https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/tasks/privateTasks/"
                    + props.userId + '/' + props.taskId,
                    type:"PUT",
                    data: {
                    taskStatus: taskStatusNo
                    },
                    success: function () {console.log("Put success")}
                });
            } else {
                $.ajax({
                    url:"https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/tasks/" + props.taskId,
                    type:"PUT",
                    data: {
                    taskStatus: taskStatusNo
                    },
                    success: function () {console.log("Put success")}
                });
            }
        } else {
            firstRender.current = true;
        }
    }, [taskStatusNo]);

    const DeleteTaskHandler = () => { //deletes task from client by passing taskId to be deleted
        props.onTaskDelete(props.taskId);
    };

    const TaskPriorityHandler = (event) => {
        setTaskPriority(event.target.value);
    };

    const DateSetHandler = (event) => {
        setTaskDate(event.target.value);
    };

    useEffect(()=> { //updates task date
        if (taskPrivate){
            $.ajax({
                url:"https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/tasks/privateTasks/"
                + props.userId + '/' + props.taskId,
                type:"PUT",
                data: {
                  taskDate: taskDate
                },
                success: function () {console.log("Put success")}
            });
        } else {
            $.ajax({
                url:"https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/tasks/" + props.taskId,
                type:"PUT",
                data: {
                  taskDate: taskDate
                },
                success: function () {console.log("Put success")}
            });
        }
    },[taskDate]);

    const ToggleTaskMenu = () => { //toggles delete todo button
        if(taskMenuState === ''){
            setTaskMenuState(
                <Fade>
                    <div className="flex flex-row align-middle items-center">
                        <button onClick={DeleteTaskHandler} type="button" 
                        className="ml-3 bg-white rounded-full items-center justify-center 
                        text-gray-500 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 w-4 h-4">
                            <span className="sr-only">Close menu</span>
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <input type="date" onChange={DateSetHandler} className="ml-3 border-0 text-xs"/>
                    </div>
                </Fade>
            )
        } else {
            setTaskMenuState('');
        }
    }

    const TaskUpdateHandler = () => {
        //update priority if there is a change
        if (taskPriority != props.taskPriority) {
            let newData = {
            taskPriority: taskPriority,
            taskDescription: props.taskDescription,
            taskName: props.taskName,
            taskStatus: taskStatusNo,
            };

            //updates server
            if (taskPrivate){
                $.ajax({
                    url:"https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/tasks/privateTasks/"
                    + props.userId + '/' + props.taskId,
                    type: "PUT",
                    data: newData,
                    success: function () {
                        console.log("Update success");
                    },})
            } else {
                $.ajax({
                    url:"https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/tasks/" + props.taskId,
                    type: "PUT",
                    data: newData,
                    success: function () {
                        console.log("Update success");
                    },})
            }

            newData = {
            ...newData,
            taskId: props.taskId,
            };
            //updates client
            props.onPriorityUpdate(newData);
        }
    };

    return (
        <Fade>
            <li id={props.taskId} onDoubleClick={ToggleTaskMenu} className="flex flex-row items-center mb-6 w-full select-none">
                {taskMenuState}
                <button onClick={ChangeStatusHandler} className="w-5 h-5 rounded-full focus:ring-2 ml-3">
                    {taskBtnState}
                </button>
                <div>
                    <select className="priority-list ml-1 appearance-none h-8 border-0 text-xs text-center" 
                    defaultValue={taskPriority} onChange={TaskPriorityHandler} onBlur={TaskUpdateHandler}>
                        <option value="0">!</option>
                        <option value="1">!!</option>
                        <option value="2">!!!</option>
                    </select>
                </div>
                <div className="ml-3">
                    <p className="text-base font-medium">{props.taskName}</p>
                    <p className="text-xs text-gray-500">{props.taskDescription}</p>
                    <p className="text-xs text-red-400">{taskDate}</p>
                </div>
            </li>
        </Fade>
    );
}

export default TaskItem;