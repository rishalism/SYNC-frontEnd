import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { UserRole } from "@/types/user"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

function RolePage() {

    const [role, selectRole] = useState<UserRole>(UserRole.projectlead)


    const { ProjectleadInfo, TeamMemberInfo } = useSelector((state: RootState) => state.auth)
    const accessToken = localStorage.getItem('accessToken')
    const navigate = useNavigate()
    useEffect(() => {
        if (ProjectleadInfo || TeamMemberInfo && accessToken) {
            navigate('/overview');
        }
    }, [ProjectleadInfo, TeamMemberInfo, navigate]);


    function handleSelectRole(role: UserRole) {
        selectRole(role)
        navigate(`/signup/${role}`)
    }

    return (
        <div className="w-full flex items-center justify-center h-screen p-5">
            <div className="w-[500px] ">
                <div className="flex justify-end lg:mb-10">
                    <svg width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 0L23.823 3.36707C25.109 8.62855 25.752 11.2593 27.1233 13.3821C28.336 15.2593 29.9527 16.8418 31.8554 18.0139C34.0071 19.3395 36.651 19.926 41.9388 21.0991L46 22L41.9388 22.9009C36.651 24.074 34.0071 24.6605 31.8554 25.9861C29.9527 27.1582 28.336 28.7407 27.1233 30.6179C25.752 32.7407 25.109 35.3714 23.823 40.6329L23 44L22.177 40.6329C20.891 35.3714 20.248 32.7407 18.8767 30.6179C17.664 28.7407 16.0473 27.1582 14.1446 25.9861C11.9929 24.6605 9.34898 24.074 4.06116 22.9009L0 22L4.06116 21.0991C9.34897 19.926 11.9929 19.3395 14.1446 18.0139C16.0473 16.8418 17.664 15.2593 18.8767 13.3821C20.248 11.2593 20.891 8.62855 22.177 3.36707L23 0Z" fill="black" />
                    </svg>
                </div>
                <div>
                    <h1 className="font-bold text-3xl font-sans">Choose your role</h1>
                    <p className="text-neutral-400 mt-3">
                        Select your role to get started with setting <br /> up your account.
                    </p>
                </div>
                <div className="space-y-2 mt-3">
                    <RadioGroup defaultValue="option-one">
                        <div className={`${role == 'Project-Lead' ? 'outline-dotted' : 'outline-none'} w-full flex justify-between rounded-lg p-7 border-2 `}>
                            <h1 className="font-bold">project Manager</h1>
                            <RadioGroupItem onClick={() => handleSelectRole(UserRole.projectlead)} value="option-one" id="option-one" />
                        </div>
                        <div className={`${role == 'Team-Member' ? 'outline-dotted' : 'outline-none'} w-full flex justify-between rounded-lg p-7 border-2 `}>
                            <h1 className="font-bold">Team Member</h1>
                            <RadioGroupItem onClick={() => handleSelectRole(UserRole.teammember)} value="option-two" id="option-two" />
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </div>
    )
}

export default RolePage
