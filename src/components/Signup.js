import React, {useState} from 'react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const CloseAccountHandler = () => {
        props.onAccountClose();
    }

    const EmailChangeHandler = (email) =>{
        setEmail(email.target.value);
    }

    const PasswordChangeHandler = (password) => {
        setPassword(password.target.value);
    }
    
    const SignUpHandler = (data) => {
        data.preventDefault();
        const accountData = {
            email: email,
            password: password
        }

        //Create account with database
        if (accountData.email != '' && accountData.password != ''){
            console.log(accountData);
            //create account using firebase rest auth
        }
    }

    return (
        <Fade>
            <div className="flex flex-col m-6">
                <div className="ml-auto">
                    <button onClick={CloseAccountHandler}
                    className="flex w-8 h-8 m-3 rounded-full focus:ring-2 ml-3 hover:scale-110 bg-white hover:bg-gray-200 duration-300 justify-center items-center">
                        <XIcon className="w-5 h-5"/>
                    </button>
                </div>
                <form onSubmit={SignUpHandler}> 
                    <h1 className="font-medium text-2xl">Sign up</h1>
                    <p className="my-4 opacity-70">Sign up to start using My Tasks!</p>
                    <hr className="my-6" />
                    <label className="uppercase text-sm font-bold opacity-70">Email</label>
                    <input type="text" onChange={EmailChangeHandler}
                    className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none" />
                    <label className="uppercase text-sm font-bold opacity-70">Password</label>
                    <input type="text" onChange={PasswordChangeHandler}
                    className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none" />
                    <button type="submit" className="bg-gray-200 rounded-md p-2 pl-3 pr-3 mt-2 hover:bg-blue-300 duration-300 focus:ring-2 focus:ring-blue-300">
                        Create Account
                    </button>
                </form>
            </div>
        </Fade>
    )
};

export default Signup;