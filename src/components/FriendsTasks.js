import React, {useState, useEffect} from 'react';
import {XIcon} from '@heroicons/react/solid';
import $ from 'jquery';
import Fade from 'react-reveal/Fade';
import FriendsTasksItem from './FriendsTasksItem.js';

const FriendsTasks = (props) => {

    const [friendName, setFriendName] = useState(props.friendData.username);
    const [friendTasks, setFriendTasks] = useState(undefined);
    const [taskInsert, setTaskInsert] = useState(<h1>No active tasks!</h1>)

    const CloseTasksHandler = () => {
        props.onCloseFriendTasks();
    };

    if (friendTasks == undefined){
        $.get("https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/tasks/" + props.friendData.id,
        function(data, status){
            const friendTasks = JSON.parse(data);
            setFriendTasks(friendTasks);
        });
    }

    useEffect(()=>{
        if (friendTasks == ''){

        } else if (friendTasks != undefined) {
            console.log(friendTasks);
            // const domInsert = friendTasks.map(data => {
            //     <FriendsTasksItem taskData={data} />
            // });
            const domInsert = friendTasks.map(data => 
                <FriendsTasksItem taskData={data} key={data.id} />)
            setTaskInsert(domInsert);
        }
    }, [friendTasks]);

    return(
        <Fade>
            <div className="w-full sm:w-3/4 lg:w-1/2
                absolute bg-white rounded-lg drop-shadow-xl justify-self-center m-auto left-0 right-0">
                    <div className="flex flex-col m-6 align-center justify-center items-left">
                        <div className="ml-auto">
                            <button onClick={CloseTasksHandler}
                                className="flex w-8 h-8 m-3 rounded-full focus:ring-2 ml-3 hover:scale-110 bg-white hover:bg-gray-200 duration-300 justify-center items-center">
                                <XIcon className="w-5 h-5"/>
                            </button>
                        </div>
                        <h1 className="font-semibold text-2xl text-left mb-5">{friendName}'s Tasks</h1>
                        <ul className="mb-3 flex flex-col">
                            {taskInsert}
                        </ul>
                    </div>
            </div>
        </Fade>
    )
};

export default FriendsTasks;