import React, {useState, useEffect} from 'react';
import {XIcon, CheckIcon, CogIcon} from '@heroicons/react/solid';
import $ from 'jquery';
import { data } from 'autoprefixer';
import Fade from 'react-reveal/Fade';

const taskStates = [
    <div className="w-5 h-5 rounded-full border-2 border-gray-500"></div>, //undone task
    <CogIcon className="w-5 h-5 text-white bg-yellow-400 rounded-full"/>, //in-progress task
    <CheckIcon className="w-5 h-5 text-white bg-green-700 rounded-full"/>  //done task
]

const FriendsTasksItem = (props) => {
    const data = props.taskData

    return (
        <Fade>
            <li className="flex flex-row items-center mb-3 w-full select-none">
                <div className="w-5 h-5 rounded-full focus:ring-2 ml-3">
                    {taskStates[data.taskStatus]}
                </div>
                <div className="ml-3">
                    <p className="text-base font-medium">{data.taskName}</p>
                    <p className="text-xs text-gray-500">{data.taskDescription}</p>
                    <p className="text-xs text-red-400">{data.taskDate}</p>
                </div>
            </li>
        </Fade>
    )
}

export default FriendsTasksItem;