import React,{useState, useEffect} from 'react';
import TaskItem from './TaskItem.js';
import '../index.css';

const TaskList = (props) => {
    let taskContent;

    if (props.username == ''){
        taskContent = <h1>Log in or Create an Account to get started!</h1>;
    } else {
        taskContent = <h1>No Tasks!</h1>;
    }

    const TaskDeleteHandler = (taskId) => {
        props.onTaskDelete(taskId);
    }

    const DateUpdateHandler = (date) => {
        props.onDateUpdate(date);
    }

    if(props.tasks){
        if (props.tasks.length > 0){
            let key = 0;
            taskContent = props.tasks.map(data =>
            <TaskItem onDateUpdate={DateUpdateHandler}
            onTaskDelete={TaskDeleteHandler} taskPrivate={props.taskPrivate} userId={props.userId}
            key={data.id} taskPriority={data.taskPriority} taskStatus ={data.taskStatus} taskDate={data.taskDate}
            taskId = {data.id} taskName = {data.taskName} taskDescription = {data.taskDescription}></TaskItem>)
        }
    };

    return (
        <ul>
            {taskContent}
        </ul>
    );
}

export default TaskList;