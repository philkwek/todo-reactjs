import React, {useState} from 'react';

const TaskHeader = (props) => {

    const FilterListHandler = (event) => {
        let filter = event.target.value;
        const tasks = props.tasks;
        let filteredTasks = [];
        if (filter != -1){
            // for (var i in tasks){
            //     if (tasks[i].taskStatus == filter){
            //         filteredTasks.push(tasks[i]);
            //     }
            // }
            console.log(tasks);
            filteredTasks = tasks.filter(tasks => tasks.taskStatus == filter)
        } else {
            filteredTasks = tasks;
        }

        props.onTaskFilter(filteredTasks);
    }

    return (
    <div className="flex flex-row items-center">
        <h1 className="text-3xl font-bold font-sans">My Tasks</h1>
        <select className="ml-5 border-0" onChange={FilterListHandler}>
            <option value="-1">Filter list by</option>
            <option value="2" >Done</option>
            <option value="1" >In-progress</option>
            <option value="0">Not started</option>
        </select>
    </div>
    );
}

export default TaskHeader;