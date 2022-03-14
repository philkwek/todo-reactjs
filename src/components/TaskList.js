import TaskItem from './TaskItem.js';
import '../index.css';

const TaskList = (props) => {
    let taskContent;

    if (props.username == ''){
        taskContent = <h1>Log in or Create an Account to get started!</h1>;
    } else {
        taskContent = <h1>No Tasks!</h1>;
    }

    const TaskCheckedHandler = (event) => {
        props.onTaskChecked(event);
    };

    const TaskDeleteHandler = (taskId) => {
        props.onTaskDelete(taskId);
    }

    const PriorityUpdateHandler =  (data) => {
        props.onPriorityUpdate(data);
    }

    if(props.tasks){
        if (props.tasks.length > 0){
            let key = 0;
            taskContent = props.tasks.map(data =>
            <TaskItem onTaskChecked={TaskCheckedHandler} onTaskDelete={TaskDeleteHandler} onPriorityUpdate={PriorityUpdateHandler}
            key={data.id} taskPriority={data.taskPriority} taskStatus ={data.taskStatus} 
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