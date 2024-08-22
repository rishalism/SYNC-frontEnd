
import { Modal } from "flowbite-react";
import { useFormik } from "formik";
import { inviteMembersSchema } from "@/validations/formvalidation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { UserRole } from "@/types/user";
import { forgotPassword, ResetPasswordOTP } from "@/api/projectLeadApi";
import { toast } from "sonner";
import { useState } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import ResetPassword from "@/components/ui/ResetPassword";
import { TeamMemberForgotPassword, TeamMemberSendResetPasswordOtp } from "@/api/teamMemberApi";



function ForgotOtp({ openModal, setOpenModal, value, setValue, otpSented, setOtpSented, email }: any) {

    const { role } = useParams()
    const [changePassword, setChangePassword] = useState(false)

    const { errors, touched, isSubmitting, values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: inviteMembersSchema,
        onSubmit: async (values) => {
            if (values) {
                if (role == UserRole.projectlead) {
                    const data = await forgotPassword({ email: values.email, role })
                    if (data) {
                        setOtpSented(true)
                        toast.success('OTP has sent to your email')
                    }
                } else if (role == UserRole.teammember) {
                    const data = await TeamMemberForgotPassword({ email: values.email, role })
                    if (data) {
                        setOtpSented(true)
                        toast.success('OTP has sent to your email')
                    }
                }
            }
        }
    })

    async function submitOtp() {
        if (value.length === 6 && role == UserRole.projectlead) {
            const data = await ResetPasswordOTP({ email, otp: value })
            if (data) {
                setChangePassword(true)
                setOtpSented(false)
            }
        } else if (value.length === 6 && role == UserRole.teammember) {
            const data = await TeamMemberSendResetPasswordOtp({ email, otp: value })
            if (data) {
                setChangePassword(true)
                setOtpSented(false)
            }
        } else {
            toast('Invalid OTP format. Please enter a 6-digit OTP.', { style: { color: "red" }, position: 'top-center' });
        }
    }


    return (
        <div>
            <Modal show={openModal} onClose={() => setOpenModal(false)} size="2xl" popup>
                <Modal.Header className='px-5'>
                    {otpSented ? <h3 className="text-xl mt-3  font-medium text-gray-900 dark:text-white capitalize">Enter OTP to reset password</h3> : <h3 className="text-xl mt-3 font-medium text-gray-900 dark:text-white capitalize">Enter email to reset password</h3>}
                </Modal.Header>
                <Modal.Body>
                    {
                        changePassword ?
                            <ResetPassword email={email} setOpenModal={setOpenModal} setChangePassword={setChangePassword} />
                            :
                            <div className="flex py-10 flex-col items-center">
                                {
                                    otpSented ?
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
                                                    <Button onClick={submitOtp} className="w-1/2 p-8 text-center rounded-lg">Submit</Button>
                                                )}
                                            </div>
                                        </div>
                                        :
                                        <div className='flex flex-col w-full'>
                                            <form onSubmit={handleSubmit}>
                                                <div className='flex mt-3 flex-row gap-4 '>
                                                    <div className="w-full">
                                                        <Input placeholder="your email here.." id="email" value={values.email} type="text" onChange={handleChange} onBlur={handleBlur} />
                                                        {errors.email && touched.email && <p className="text-xs ml-2 text-red-500">{errors.email}</p>}
                                                    </div>
                                                    <Button type="submit" disabled={isSubmitting} variant={'default'}>send OTP</Button>
                                                </div>
                                            </form>
                                        </div>}
                            </div>}
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ForgotOtp
