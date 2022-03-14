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

    const TaskCheckHandler = (event) => {
        props.onTaskChecked(event);
    };

    const TaskDeleteHandler = (taskId) => {
        props.onTaskDelete(taskId);
    };

    const PriorityUpdateHandler = (data) => {
        props.onPriorityUpdate(data);
    };

    const TaskFilterHandler = (tasks) => {
        setAllTasks(tasks);
    };

    return (
        <div>
            <TaskHeader onTaskFilter={TaskFilterHandler} tasks={originalData} username={props.username}/>
            <div className="flex flex-row items-center mt-5">
                <TaskList username={props.username}
                onTaskDelete={TaskDeleteHandler} onTaskChecked={TaskCheckHandler} onPriorityUpdate={PriorityUpdateHandler}
                tasks={allTasks} />
            </div>
        </div>
    );
};

export default TaskDisplay;
