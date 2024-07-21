import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { loginProjectlead, loginTeamMember } from '@/redux/slices/auth';
import { SignInWithGoogle } from '@/api/projectLeadApi';
import { UserRole } from '@/types/user';
import { teamMemberGoogleLogin } from '@/api/teamMemberApi';



function GoogleSignin() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { role } = useParams<{ role: string }>();
    const [user, setUser] = useState<{ access_token: string } | null>(null);
    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('google login failed', error),
    });

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json',
                    },
                })
                .then(async (res) => {
                    if (role == UserRole.projectlead) {
                        const response = await SignInWithGoogle({ ...res.data, role })
                        if (response) {
                            dispatch(loginProjectlead(response.data))
                            navigate('/overview')
                        }
                    } else {
                        const response = await teamMemberGoogleLogin({ ...res.data, role })
                        if (response) {
                            dispatch(loginTeamMember(response.data))
                            navigate('/overview')
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [user]);

    return (
        <div className="flex  flex-col mt-8">
            <Button onClick={() => googleLogin()} className="border-2 gap-3 py-6 capitalize" variant={'ghost'}><FcGoogle /> Sign in with google</Button>
        </div>
    )
}

export default GoogleSignin
