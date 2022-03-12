import React, {useState} from 'react';
import Fade from 'react-reveal/Fade';
import {XIcon} from '@heroicons/react/solid'
import Signup from './Account.js'

const accountState = [
    <Signup />
    ,
    <div>hello</div>
]

const Account = (props) => {
    const [accountDiv, setAccountDiv] = useState(accountState[1]);

    return(
    <div className="absolute backdrop-blur-md bg-white rounded-lg drop-shadow-xl w-1/2 justify-self-center m-auto left-0 right-0">
        {accountDiv}
    </div>
    )
};

export default Account