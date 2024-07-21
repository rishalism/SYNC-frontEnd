import { SignUpWithGoogle } from "@/api/projectLeadApi";
import { teamMemberGoogleSignup } from "@/api/teamMemberApi";
import { Button } from "@/components/ui/button";
import { loginProjectlead, loginTeamMember } from "@/redux/slices/auth";
import { UserRole } from "@/types/user";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const GoogleSignUp = () => {
    const { role } = useParams<{ role: string }>();
    const [user, setUser] = useState<{ access_token: string } | null>(null);
    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('google login failed', error),
    });
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
                        const response = await SignUpWithGoogle({ ...res.data, role })
                        if (response) {
                            dispatch(loginProjectlead(response.data))
                            navigate('/overview')
                        }
                    } else {
                        const response = await teamMemberGoogleSignup({ ...res.data, role })
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
        <div className="flex flex-col">
            <Button onClick={() => googleLogin()} className="border-2 gap-3 capitalize" variant="outline">
                <FcGoogle /> Sign Up with Google
            </Button>
        </div>
    );
};

export default GoogleSignUp;
