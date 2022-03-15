import React, {useState, useEffect} from 'react';
import Fade from 'react-reveal/Fade';
import { getAuth } from "firebase/auth";
import {XIcon} from '@heroicons/react/solid';
import { LogoutAccount } from '../service/firebase.js';
import AddFriend from './AddFriend.js';

const AccountManager = (props) =>{

    const [addFriend, setAddFriend] = useState('');

    const CloseAccountHandler = () => {
        props.onAccountClose();
    };

    const LogoutHandler = () => {
        LogoutAccount();
        window.location.reload();
    };

    return(
    <Fade>
        <div className="flex flex-col m-6 align-center justify-center items-center">
            <div className="ml-auto">
                <button onClick={CloseAccountHandler}
                    className="flex w-8 h-8 m-3 rounded-full focus:ring-2 ml-3 hover:scale-110 bg-white hover:bg-gray-200 duration-300 justify-center items-center">
                    <XIcon className="w-5 h-5"/>
                </button>
            </div>
            <h1 className="font-semibold text-2xl text-center mb-10">Account Management</h1>
            <button onClick={LogoutHandler}
            className="w-1/3 rounded-xl p-3 mb-5 bg-gray-200 hover:bg-blue-500 hover:text-white duration-300 text-medium">Logout</button>
        </div>
    </Fade>
    )
}

export default AccountManager;