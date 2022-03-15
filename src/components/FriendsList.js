import React, {useState, useEffect} from 'react';
import {XIcon} from '@heroicons/react/solid';
import $ from 'jquery';
import { data } from 'autoprefixer';
import FriendsItem from './FriendsItem.js';
import Fade from 'react-reveal/Fade';

const FriendsList = (props) => {

    const [friends, setFriends] = useState('');
    const [friendContent, setFriendContent] = useState('');

    //get friends list
    if (friends == ''){
        $.get("https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/user/friends/" + props.userId,
        function(data, status){
            const friendList = JSON.parse(data);
            setFriends(friendList);
        });
    };

    useEffect(()=>{
        if (friends.length > 0){
            const friendsMapped = friends.map(data =>
            <FriendsItem username={data.username} friendId={data.id} key={data.id}/>)
            setFriendContent(friendsMapped);
        };
    },[friends]);

    return(
        <Fade>
            <ul className="flex flex-col mb-5">
                {friendContent}
            </ul>
        </Fade>
    );
};

export default FriendsList;
