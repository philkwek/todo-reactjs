import React, {useState, useEffect, useRef} from 'react';
import $ from 'jquery';
import '../index.css';
import Fade from 'react-reveal/Fade';
import {CheckIcon, CogIcon} from '@heroicons/react/solid'

const TaskItem = (props) => {
    const firstRender = useRef(false);

    const [closeBtnState, setCloseBtnState] = useState('');
    const [taskBtnState, setTaskBtnState] = useState(
        <div className="w-5 h-5 rounded-full border-2 border-gray-500"></div>
    );
    const [taskStatusNo, setTaskStatusNo] = useState(0);

    let originalStatus = false;

    if (props.taskStatus === "true" || props.taskStatus === true){ //checks taskStatus and sets checkbox accordingly
        originalStatus = true;
    }

    const [taskStatus, setTaskStatus] = useState(originalStatus)

    const TaskCheckHandler = (event) => { //checks task as done or undone
        setTaskStatus(event.target.checked); 
        const taskCheckData = {
            taskId: props.taskId,
            taskDone: event.target.checked
        };
        props.onTaskChecked(taskCheckData);
    };

    const ChangeStatusHandler = () => {

        if (taskStatusNo === 0){
            setTaskBtnState(<CogIcon className="w-5 h-5 text-white bg-yellow-400 rounded-full"/>);
            setTaskStatusNo(1);

        } else if (taskStatusNo === 1){
            setTaskBtnState(<CheckIcon className="w-5 h-5 text-white bg-green-700 rounded-full"/>);
            setTaskStatusNo(2);

        } else if (taskStatusNo === 2){
            setTaskBtnState(<div className="w-5 h-5 rounded-full border-2 border-gray-500"></div>);
            setTaskStatusNo(0);
        }
    }

    useEffect(() => {
        if (firstRender.current){
            const taskCheckData = {
                taskId: props.taskId,
                taskDone: taskStatusNo
            };
            props.onTaskChecked(taskCheckData);
        } else {
            firstRender.current = true;
        }
    }, [props, taskStatusNo]);

    const DeleteTaskHandler = () => { //deletes task from client by passing taskId to be deleted
        props.onTaskDelete(props.taskId);
    };

    const ToggleDeleteButton = () => { //toggles delete todo button
        if(closeBtnState === ''){
            setCloseBtnState(
                <Fade>
                    <button onClick={DeleteTaskHandler} type="button" className="bg-white rounded-full items-center justify-center text-gray-500 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500">
                        <span className="sr-only">Close menu</span>
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </Fade>
            )
        } else {
            setCloseBtnState('');
        }
    }

    return (
        <Fade>
            <li id={props.taskId} onDoubleClick={ToggleDeleteButton} className="flex flex-row items-center mb-5 w-full select-none">
                {closeBtnState}
                <input defaultChecked={taskStatus} type="checkbox" onChange={TaskCheckHandler} className="w-4 h-4 rounded-full focus:ring-1 ml-3" />
                <button onClick={ChangeStatusHandler} className="w-5 h-5 rounded-full focus:ring-2 ml-3">
                    {taskBtnState}
                </button>
                <div className="ml-3">
                    <p className="text-base font-medium">{props.taskName}</p>
                    <p className="text-xs text-gray-500">{props.taskDescription}</p>
                </div>
            </li>
        </Fade>
    );
}

export default TaskItem;