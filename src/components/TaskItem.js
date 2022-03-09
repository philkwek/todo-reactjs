import React, {useState} from 'react';
import $ from 'jquery';
import '../index.css';

const TaskItem = (props) => {

    const [closeBtnState, setCloseBtnState] = useState('');

    let originalStatus = false;

    if (props.taskStatus === "true" || props.taskStatus === true){ //checks taskStatus and sets checkbox accordingly
        originalStatus = true;
    }

    const [taskStatus, setTaskStatus] = useState(originalStatus)

    const taskCheckHandler = (event) => { //checks task as done or undone
        setTaskStatus(event.target.checked); 
        const taskCheckData = {
            taskId: props.taskId,
            taskDone: event.target.checked
        };
        props.onTaskChecked(taskCheckData);
    };

    const deleteTaskHandler = () => { //deletes task from client by passing taskId to be deleted
        props.onTaskDelete(props.taskId);
    };

    const toggleDeleteButton = () => { //toggles delete todo button
        if(closeBtnState === ''){
            setCloseBtnState(
                <button onClick={deleteTaskHandler} type="button" className="bg-white rounded-full items-center justify-center text-gray-500 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    <span className="sr-only">Close menu</span>
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )
        } else {
            setCloseBtnState('');
        }
    }

    return (
        <li id={props.taskId} onDoubleClick={toggleDeleteButton} className="flex flex-row items-center mb-5 w-full select-none">
            {closeBtnState}
            <input defaultChecked={taskStatus} id="taskCheckStatus" type="checkbox" onChange={taskCheckHandler} className="w-4 h-4 rounded-full focus:ring-1 ml-3" />
            <div className="ml-3">
                <p className="text-base font-medium">{props.taskName}</p>
                <p className="text-xs text-gray-500">{props.taskDescription}</p>
             </div>
        </li>
    );
}

export default TaskItem;