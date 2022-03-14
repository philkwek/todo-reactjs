import React, {useState} from 'react';
import Fade from 'react-reveal/Fade';
import {XIcon} from '@heroicons/react/solid';

const AddFriend = (props) => {

    const [email, setEmail] = useState('');

    const CloseAccountHandler = () => {
        props.onFriendClose();
    };

    const EmailChangeHandler = (email) =>{
        setEmail(email.target.value);
    };

    const AddFriendHandler = () => {
        console.log(email);
    }

    return (
        <Fade>
            <form className="flex flex-col m-6 align-center justify-center items-center">
                <div className="mb-5">
                    <label className="uppercase text-sm font-bold opacity-70 text-left">Friend's Email</label>
                    <input type="text" onChange={EmailChangeHandler}
                    className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none" />
                </div>
                <div className="flex flex-row">
                    <button onClick={AddFriendHandler} type="submit"
                    className="mt-0 m-5 rounded-xl p-3 mb-5 bg-green-500 text-white hover:bg-green-700 hover:text-white duration-300 text-medium">Add Friend</button>
                    <button onClick={CloseAccountHandler} 
                    className="mt-0 m-5 rounded-xl p-3 mb-5 bg-gray-200 hover:bg-gray-500 hover:text-white duration-300 text-medium">Cancel</button>
                </div>
            </form>
        </Fade>
    )
}

export default AddFriend;