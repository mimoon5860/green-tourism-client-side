import React from 'react';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../ContextApi/useAuth';

const Login = () => {
    const { user, googleLogin, error, setIsLoading, setError, setUser } = useAuth();

    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/home';

    const loginWithGoogle = () => {
        googleLogin()
            .then((result) => {
                const user = result.user;
                setUser(user);
                history.push(redirect_uri);
            }).catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
            }).finally(() => {
                setIsLoading(false);
            });

    }

    console.log(user);
    return (
        <div className="text-center my-5" >
            {
                error && <p className="text-danger">{error}</p>
            }
            {
                user.email ?
                    <p>You Already Logged in</p>
                    :
                    <button onClick={loginWithGoogle} >Login With Google</button>
            }

        </div>
    );
};

export default Login;