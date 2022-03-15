import React, {useState} from 'react';
import {XIcon} from '@heroicons/react/solid';
import AddFriend from './AddFriend.js';
import FriendsList from './FriendsList.js';

const FriendsPage = (props) => {

    const [addFriend, setAddFriend] = useState('');

    const CloseFriendHandler = () => {
        props.onFriendsClose();
    };

    const OpenAddFriendHandler = () => {
        setAddFriend(<AddFriend onFriendClose={CloseAddFriendHandler} userId={props.userId} />)
    };

    const CloseAddFriendHandler = () => {
        setAddFriend('');
    };

    const OpenFriendTask = (data) => {
        props.onFriendTask(data);
    }

    return (
        <div className="w-full sm:w-3/4 lg:w-1/2
            absolute bg-white rounded-lg drop-shadow-xl justify-self-center m-auto left-0 right-0">
                <div className="flex flex-col m-6 align-center justify-center items-center">
                    <div className="ml-auto">
                        <button onClick={CloseFriendHandler}
                            className="flex w-8 h-8 m-3 rounded-full focus:ring-2 ml-3 hover:scale-110 bg-white hover:bg-gray-200 duration-300 justify-center items-center">
                            <XIcon className="w-5 h-5"/>
                        </button>
                    </div>
                    <h1 className="font-semibold text-2xl text-center mb-5">Friends List</h1>
                    <FriendsList userId={props.userId} onOpenFriend={OpenFriendTask} />
                    <button onClick={OpenAddFriendHandler}
                    className="w-1/3 rounded-xl p-3 mb-3 bg-gray-200 hover:bg-blue-500 hover:text-white duration-300 text-medium">Add Friend</button>
                    {addFriend}
                </div>
        </div>
    )
}

export default FriendsPage;