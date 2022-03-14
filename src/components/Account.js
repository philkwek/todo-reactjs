import React, {useState, useEffect} from 'react';
import Fade from 'react-reveal/Fade';
import Signup from './Signup.js'
import AccountManager from './AccountManager.js';
import Login from './Login.js';
import { getAuth } from "firebase/auth";
import {XIcon} from '@heroicons/react/solid';

const auth = getAuth();

const Account = (props) => {
    let currentAccount;

    const CloseAccountHandler = () => {
        props.onAccountClose();
    };

    const LoginHandler = () => {
        setAccountDiv(accountState[1]);
    };

    const SignUpHandler = () => {
        setAccountDiv(accountState[0]);
    };

    const accountState = [
        <Signup onAccountClose={CloseAccountHandler} />,
        <Login onAccountClose={CloseAccountHandler} />,
        <Fade>
            <div className="flex flex-col m-6 align-center justify-center items-center">
                <div className="ml-auto">
                    <button onClick={CloseAccountHandler}
                        className="flex w-8 h-8 m-3 rounded-full focus:ring-2 ml-3 hover:scale-110 bg-white hover:bg-gray-200 duration-300 justify-center items-center">
                        <XIcon className="w-5 h-5"/>
                    </button>
                </div>
                <h1 className="font-semibold text-2xl text-center mb-5">Welcome to My Task!</h1>
                <p className="text-center mb-10">Login or Sign up for an account to get started!</p>
                <button onClick={LoginHandler}
                className="w-1/3 rounded-xl p-3 mb-5 bg-gray-200 hover:bg-blue-500 duration-300 text-medium">Login</button>
                <button onClick={SignUpHandler}
                className="w-1/3 rounded-xl p-3 mb-5 bg-blue-500 hover:bg-gray-200 duration-300 text-white text-medium">Sign up</button>
            </div>
        </Fade>,
        <AccountManager onAccountClose={CloseAccountHandler} />
    ];

    if(props.username == undefined || props.username == ''){
        currentAccount = accountState[2];
    } else {
        currentAccount = accountState[3];
    };
    
    const [accountDiv, setAccountDiv] = useState(currentAccount);

    // useEffect(()=>{
    //     if(props.username == undefined || props.username == ''){
    //         setAccountDiv(accountState[2]);
    //     } else {
    //         setAccountDiv(accountState[3]);
    //     };
    // })

    return(
    <div className="w-full sm:w-3/4 lg:w-1/2
    absolute bg-white rounded-lg drop-shadow-xl justify-self-center m-auto left-0 right-0">
        {accountDiv}
    </div>
    )
};

export default Account;