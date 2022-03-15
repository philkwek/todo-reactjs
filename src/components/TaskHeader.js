import React, {useEffect, useState} from 'react';

const TaskHeader = (props) => {
    let originalUsername;

    if (props.username == "" || props.username == undefined){
        originalUsername = "My"
    } else {
        originalUsername = props.username + "'s";
    }

    const [username, setUsername] = useState(originalUsername);

    useEffect(()=>{
        setUsername(originalUsername);
    });

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

    const SwitchTasks = () =>{
        if (username == originalUsername){
            setUsername('Private');
        } else {
            setUsername(originalUsername);
        }
    }

    return (
    <div className="flex flex-row items-center">
        <h1 onClick={SwitchTasks}
        className="text-2xl font-bold font-sans select-none cursor-pointer hover:text-blue-600 duration-300">
            {username} Tasks</h1>
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