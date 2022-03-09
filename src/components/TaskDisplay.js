import '../index.css';
import TaskList from './TaskList.js';

const TaskDisplay = (props) => {

    const taskCheckHandler = (event) => {
        props.onTaskChecked(event);
    }

    const taskDeleteHandler = (taskId) => {
        props.onTaskDelete(taskId);
    }

    return (
        <div className="flex flex-row items-center">
            <TaskList onTaskDelete={taskDeleteHandler} onTaskChecked={taskCheckHandler} tasks={props.tasks} />
        </div>
    );
};

export default TaskDisplay;
