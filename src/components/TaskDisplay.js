import React, {useState, useEffect} from 'react';
import '../index.css';
import TaskList from './TaskList.js';
import TaskHeader from './TaskHeader.js';

const TaskDisplay = (props) => {
    const originalData = props.tasks;

    const [allTasks, setAllTasks] = useState(props.tasks);

    React.useEffect(()=>{
        setAllTasks(originalData);
    },[originalData])

    const TaskDeleteHandler = (taskId) => {
        props.onTaskDelete(taskId);
    };

    const TaskFilterHandler = (tasks) => {
        setAllTasks(tasks);
    };

    const DateUpdateHandler = (date) => {
        props.onDateUpdate(date);
    };

    return (
        <div>
            <TaskHeader onTaskFilter={TaskFilterHandler} tasks={originalData} username={props.username}/>
            <div className="flex flex-row items-center mt-5">
                <TaskList username={props.username}
                onTaskDelete={TaskDeleteHandler} onDateUpdate={DateUpdateHandler}
                tasks={allTasks} />
            </div>
        </div>
    );
};

export default TaskDisplay;
