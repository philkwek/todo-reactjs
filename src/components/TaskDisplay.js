import '../index.css';
import TaskList from './TaskList.js';

const TaskDisplay = (props) => {

    const TaskCheckHandler = (event) => {
        props.onTaskChecked(event);
    }

    const TaskDeleteHandler = (taskId) => {
        props.onTaskDelete(taskId);
    }

    const PriorityUpdateHandler = (data) => {
        props.onPriorityUpdate(data);
    }

    return (
        <div className="flex flex-row items-center">
            <TaskList onTaskDelete={TaskDeleteHandler} onTaskChecked={TaskCheckHandler} onPriorityUpdate={PriorityUpdateHandler}
            tasks={props.tasks} />
        </div>
    );
};

export default TaskDisplay;
