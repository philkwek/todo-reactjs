import React, {useState} from 'react';
import $ from 'jquery';
import '../index.css';
import Fade from 'react-reveal/Fade';

const TaskInput = (props) => {
    const [enteredTask, setEnteredTask] = useState('');
    const [enteredTaskDetails, setEnteredTaskDetails] = useState('');

    const TaskChangeHandler = (event) => {
        setEnteredTask(event.target.value);
    };

    const TaskDescriptionHandler = (event) => {
        setEnteredTaskDetails(event.target.value);
    };

    const CloseTaskHandler = () => {
        props.closeNewTask();
    };

    const SubmitHandler = (event) => {
        event.preventDefault();

        const taskData = {
            taskName: enteredTask,
            taskDescription: enteredTaskDetails,
            taskStatus: 0,
            taskPriority: 0,
            userId: props.userId,
            taskDate: "0000-00-00",
        };

        //uploads task to correct db (private or public tasks)
        if (props.privateStatus){ //if task is private
            $.post("https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/tasks/privateTasks/" + props.userId, 
            taskData, function(result){
                gotTaskId(result);
            } )
        } else { //if task is private
            $.post("https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/tasks", taskData, function(result){
                gotTaskId(result);
            } )
        }

        const gotTaskId = (taskId) => {
            const uploadedData = {
                ...taskData,
                "id": taskId
            }
            props.onSaveTask(uploadedData);
        };
    }

    return(
        <Fade>
            <form onSubmit={SubmitHandler} className="form flex flex-row items-center w-full">
                {/* <input type="checkbox" className="w-4 h-4 rounded-full focus:ring-1" /> */}
                <button onClick={CloseTaskHandler} type="button" className="bg-white rounded-full items-center justify-center text-gray-500 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500">
                <span className="sr-only">Close menu</span>
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
                <div className="ml-3 flex flex-col w-full">
                    <input onChange={TaskChangeHandler} className="border-0 p-0 text-base font-medium focus:ring-0 text-gray-600" placeholder="Task Name (Hit 'Enter' to add task!)" type="text"></input>
                    <input onChange={TaskDescriptionHandler} className="text-xs text-gray-500 p-0 border-0 focus:ring-0" placeholder="Task Description" type="text"></input>
                </div>
                <div>
                    <button type="submit"/>
                 </div>
            </form>
        </Fade>
    );
};

export default TaskInput;