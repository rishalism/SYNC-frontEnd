import { Modal, ModalBody } from 'flowbite-react'
import { Button } from './button'
import { FcGoogle } from "react-icons/fc";
import { Input } from './input';
import { Link, useNavigate } from 'react-router-dom';
import { FormikValues, useFormik } from 'formik';
import { loginSchema } from '@/validations/formvalidation';
import { teamMemberGoogleLogin, teamMemberLogin } from '@/api/teamMemberApi';
import { loginTeamMember } from '@/redux/slices/auth';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { UserRole } from '@/types/user';
import SingupModal from './SingupModal';


function SigninModal({ openModal, setOpenModal }: any) {
    interface Formvalues {
        email: string;
        password: string;
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState<{ access_token: string } | null>(null);

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => setUser(response),
        onError: (error) => console.log(error),
    })

    const [signup, setSignup] = useState(false)
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
                    const role = UserRole.teammember
                    const response = await teamMemberGoogleLogin({ ...res.data, role })
                    if (response) {
                        dispatch(loginTeamMember(response.data))
                        setOpenModal(false)
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [user])


    const { errors, touched, handleBlur, handleChange, values, handleSubmit } = useFormik<Formvalues>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            const response = await teamMemberLogin(values)
            if (response) {
                dispatch(loginTeamMember(response.data))
                setOpenModal(false)
            }
        }
    })


    const GotosignupModal = () => {
        setOpenModal(false)
        setSignup(true)
    }

    return (
        <>
            <div>
                <Modal size={'sm'} show={openModal} >
                    <ModalBody>
                        <div className='flex flex-col space-y-5'>
                            <h2 className='font-semibold' >Login as Team-Member to continue</h2>
                            <form className='space-y-5' onSubmit={handleSubmit}>
                                <span className={`${errors.email && touched.email ? 'text-red-500' : ''} text-sm`}>Email</span>
                                <div>
                                    <Input
                                        className={`${errors.email && touched.email ? 'border-red-500' : ''} border-2`}
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type="email"
                                        placeholder="Email"
                                    />
                                    {errors.email && touched.email && <p className="text-xs text-red-500">{errors.email}</p>}                        </div>
                                <span className={`${errors.password && touched.password ? 'text-red-500' : ''} text-sm`}>Password</span>
                                <div>
                                    <Input
                                        className={`${errors.password && touched.password ? 'border-red-500' : ''} border-2`}
                                        id="password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Password"
                                    />
                                    {errors.password && touched.password && <p className="text-xs text-red-500">{errors.password}</p>}                            </div>
                                <div className='w-full'>
                                    <Button type='submit' className='w-full capitalize'>login</Button>
                                </div>
                            </form>
                            <div className="flex  flex-col mt-8">
                                <Button onClick={() => googleLogin()} variant={'outline'} className="border-2 gap-3 py-6 capitalize"><FcGoogle /> Sign in with google </Button>
                                <span className='text-xs text-center mt-1'> ( take less than 1 min )</span>
                            </div>
                            <span className='text-xs text-center'>dont have an Team-Member Account <span onClick={GotosignupModal} className='underline cursor-pointer' >signup</span></span>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
            <SingupModal openModal={signup} setOpenModal={setSignup} />
        </>

    )
}

export default SigninModal
