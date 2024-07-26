import { resendOtp } from "@/api/commonApi";
import { projectLeadEmailVerification, } from "@/api/projectLeadApi";
import { teamMemberVerifyEmail } from "@/api/teamMemberApi";
import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import errorHandler from "@/middlewares/errorHandler";
import { getUserInfo } from "@/redux/slices/userData";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";


function Otp() {

    const [value, setValue] = useState("");
    const [otptimer, setOtpTimer] = useState(100)
    const [resend, setResend] = useState(false)
    const userinfo = getUserInfo()

    const navigate = useNavigate()

    const location = useLocation()


    useEffect(() => {
        const queyparams = new URLSearchParams(location.search)
        const otp = queyparams?.get('otp');
        if (otp) {
            setValue(otp)
        }
    })


    const userdata = {
        name: userinfo?.name,
        email: userinfo?.email,
        otp: value,
        role: userinfo?.role
    };



    async function handleSubmit() {
        if (value.length === 6 && userinfo?.role == 'Project-Lead') {
            try {
                const response = await projectLeadEmailVerification(userdata);
                if (response) {
                    navigate(`/login/${userdata.role}`)
                }
            } catch (error) {
                toast('Verification failed. Please try again.');
            }
        } else if (value.length === 6 && userinfo?.role == 'Team-Member') {
            try {
                const response = await teamMemberVerifyEmail(userdata)
                if (response) {
                    navigate(`/login/${userdata.role}`)
                }
            } catch (error) {
                toast('Verification failed. Please try again.');
            }

        } else {
            toast('Invalid OTP format. Please enter a 6-digit OTP.', { style: { color: "red" }, position: 'top-center' });
        }
    }



    async function resendTime() {
        setResend(true)
        setOtpTimer(100)
        let timer = setInterval(() => {
            setOtpTimer((otptimer) => {
                if (otptimer == 0) {
                    clearInterval(timer)
                    setResend(false)
                    return 0
                } else {
                    console.log(otptimer);
                    return otptimer - 1
                }
            })

        }, 1000)
        try {
            const response = await resendOtp(userdata)
            if (response) {
                toast('OTP have sent to your email', { position: 'top-center' })
            }
        } catch (error) {
            errorHandler(error)
        }
    }


    return (
        <div className="w-full h-screen flex justify-center items-start">
            <div className="w-[520px] mt-32 flex flex-col justify-between gap-8">
                <div className="flex justify-end">
                    <svg width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.`w3.org/2000/svg">
                        <path d="M23 0L23.823 3.36707C25.109 8.62855 25.752 11.2593 27.1233 13.3821C28.336 15.2593 29.9527 16.8418 31.8554 18.0139C34.0071 19.3395 36.651 19.926 41.9388 21.0991L46 22L41.9388 22.9009C36.651 24.074 34.0071 24.6605 31.8554 25.9861C29.9527 27.1582 28.336 28.7407 27.1233 30.6179C25.752 32.7407 25.109 35.3714 23.823 40.6329L23 44L22.177 40.6329C20.891 35.3714 20.248 32.7407 18.8767 30.6179C17.664 28.7407 16.0473 27.1582 14.1446 25.9861C11.9929 24.6605 9.34898 24.074 4.06116 22.9009L0 22L4.06116 21.0991C9.34897 19.926 11.9929 19.3395 14.1446 18.0139C16.0473 16.8418 17.664 15.2593 18.8767 13.3821C20.248 11.2593 20.891 8.62855 22.177 3.36707L23 0Z" fill="black" />
                    </svg>
                </div>
                <div className="w-full">
                    <h2 className="text-5xl capitalize font-bold">Enter Code</h2>
                    <p className="text-neutral-400 mt-3">
                        We’ve sent an <b>OTP</b> with an activation code <br /> to your email  {userdata?.email}. <br />  OTP will expire in 5 min
                    </p>
                    <div className="flex items-center justify-center mt-5 flex-col w-full">
                        <InputOTP
                            maxLength={6}
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                        >
                            <InputOTPGroup className="gap-2">
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <div className="text-center w-full text-sm mt-10">
                            {value === "" ? (
                                <>Enter your one-time password.</>
                            ) : (
                                <Button onClick={handleSubmit} className="w-full p-8 text-center rounded-lg">Submit</Button>
                            )}
                        </div>
                        <Button disabled={resend} variant={'outline'} onClick={resendTime} className={`text-center font-bold text-sm capitalize  mt-4 ${resend ? 'cursor-not-allowed ' : 'cursor-pointer'}`}>resend OTP {resend ? <span> : {`${Math.floor(otptimer / 60)}`.padStart(2, '0')}:{`${otptimer % 60}`.padStart(2, '0')}</span> : null} </Button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Otp;
