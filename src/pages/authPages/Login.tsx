import { ProjectLeadLogin } from "@/api/projectLeadApi";
import { teamMemberLogin } from "@/api/teamMemberApi";
import { RootState } from "@/app/store";
import GoogleSignin from "@/components/google/GoogleSignIn";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { loginProjectlead, loginTeamMember } from "@/redux/slices/auth";
import { loginSchema } from "@/validations/formvalidation";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ForgotOtp from "./ForgotOtp";


function Login() {

    const [openModal, setOpenModal] = useState(false)
    const [value, setValue] = useState('')
    const [otpSented, setOtpSented] = useState(false)
    const [email, setEmail] = useState('')
    const { role } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    interface Formvalues {
        email: string;
        password: string;
    }



    useEffect(() => {
        const queyparams = new URLSearchParams(location.search)
        const otp = queyparams?.get('otp');
        const email = queyparams?.get('email');
        if (otp && email) {
            setOpenModal(true)
            setValue(otp)
            setOtpSented(true)
            setEmail(email)
        }
    }, [])


    const { ProjectleadInfo, TeamMemberInfo } = useSelector((state: RootState) => state.auth)
    useEffect(() => {
        if (ProjectleadInfo || TeamMemberInfo) {
            navigate('/overview')
        }
    }, [navigate, TeamMemberInfo, ProjectleadInfo])

    const { errors, touched, handleBlur, handleChange, values, handleSubmit } = useFormik<Formvalues>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            if (role == 'Project-Lead') {
                const response = await ProjectLeadLogin(values)
                if (response) {
                    dispatch(loginProjectlead(response.data))
                    navigate('/overview')
                }
            } else if (role == 'Team-Member') {
                const response = await teamMemberLogin(values)
                if (response) {
                    dispatch(loginTeamMember(response.data))
                    navigate('/overview')
                }
            }
        }
    })

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const target = event.target as HTMLInputElement;
            const form = target.form as HTMLFormElement;
            const index = Array.prototype.indexOf.call(form.elements, target);
            const nextElement = form.elements[index + 1] as HTMLElement;
            if (nextElement) {
                nextElement.focus();
            }
        }
    };

    return (
        <div className='w-full flex items-center justify-evenly overflow-auto h-screen'>
            <div className="w-[400px] lg:block hidden">
                <div>
                    <svg width="350" height="310" viewBox="0 0 471 369" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M296.343 83.3342C297.898 78.0843 305.334 78.0843 306.889 83.3342L317.813 120.199C329.632 160.085 361.821 190.642 402.267 200.37L446.63 211.041C452.249 212.393 452.249 220.385 446.63 221.736L402.267 232.408C361.821 242.136 329.632 272.693 317.813 312.579L306.889 349.444C305.334 354.694 297.898 354.694 296.343 349.444L285.419 312.578C273.6 272.693 241.411 242.136 200.965 232.408L156.602 221.736C150.983 220.385 150.983 212.393 156.602 211.041L200.965 200.37C241.411 190.642 273.6 160.085 285.419 120.199L296.343 83.3342Z" fill="#F1F3F4" stroke="black" />
                        <path d="M194.964 19.5561C196.52 14.3062 203.955 14.3062 205.511 19.5561L216.302 55.9722C228.12 95.8574 260.31 126.414 300.756 136.143L344.622 146.694C350.24 148.046 350.24 156.038 344.622 157.389L300.756 167.94C260.31 177.669 228.12 208.226 216.302 248.111L205.511 284.527C203.955 289.777 196.52 289.777 194.964 284.527L184.173 248.111C172.354 208.226 140.165 177.669 99.7191 167.94L55.853 157.389C50.2347 156.038 50.2347 148.046 55.853 146.694L99.7191 136.143C140.165 126.414 172.354 95.8574 184.173 55.9722L194.964 19.5561Z" stroke="black" />
                        <path d="M332.24 17.5933C332.441 15.8185 335.02 15.8185 335.221 17.5933L336.42 28.1725C337.355 36.4247 343.961 42.883 352.232 43.631L363.292 44.6311C365.112 44.7957 365.112 47.4543 363.292 47.6189L352.232 48.619C343.961 49.367 337.355 55.8254 336.42 64.0775L335.221 74.6567C335.02 76.4314 332.441 76.4315 332.24 74.6567L331.041 64.0775C330.106 55.8253 323.5 49.367 315.228 48.619L304.169 47.6189C302.349 47.4543 302.349 44.7957 304.169 44.6311L315.228 43.631C323.5 42.883 330.106 36.4247 331.041 28.1725L332.24 17.5933Z" fill="#F1F3F4" stroke="black" />
                        <path d="M30.365 90.5079C30.5171 89.1767 32.4509 89.1767 32.6029 90.5079L32.6328 90.7696C33.3867 97.3695 38.6749 102.531 45.2912 103.125C46.6125 103.243 46.6125 105.174 45.2912 105.292C38.6749 105.886 33.3867 111.047 32.6328 117.647L32.6029 117.909C32.4509 119.24 30.5171 119.24 30.365 117.909L30.3351 117.647C29.5813 111.047 24.293 105.886 17.6767 105.292C16.3554 105.174 16.3554 103.243 17.6767 103.125C24.293 102.531 29.5813 97.3695 30.3351 90.7695L30.365 90.5079Z" fill="#F1F3F4" stroke="black" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-center capitalize text-3xl font-bold">explore the app</h1>
                    <p className="text-sm text-neutral-400 text-center mt-3">Streamline your development process with powerful API testing, documentation, and collaboration tools</p>
                </div>
                <GoogleSignin />
            </div>
            <div className="w-[400px] ">
                <div className="flex justify-end">
                    <svg width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 0L23.823 3.36707C25.109 8.62855 25.752 11.2593 27.1233 13.3821C28.336 15.2593 29.9527 16.8418 31.8554 18.0139C34.0071 19.3395 36.651 19.926 41.9388 21.0991L46 22L41.9388 22.9009C36.651 24.074 34.0071 24.6605 31.8554 25.9861C29.9527 27.1582 28.336 28.7407 27.1233 30.6179C25.752 32.7407 25.109 35.3714 23.823 40.6329L23 44L22.177 40.6329C20.891 35.3714 20.248 32.7407 18.8767 30.6179C17.664 28.7407 16.0473 27.1582 14.1446 25.9861C11.9929 24.6605 9.34898 24.074 4.06116 22.9009L0 22L4.06116 21.0991C9.34897 19.926 11.9929 19.3395 14.1446 18.0139C16.0473 16.8418 17.664 15.2593 18.8767 13.3821C20.248 11.2593 20.891 8.62855 22.177 3.36707L23 0Z" fill="black" />
                    </svg>
                </div>
                <div className="mt-10 p-2">
                    <form onSubmit={handleSubmit}>
                        <h2 className="font-bold text-3xl">Hi Welcome ! 👋</h2>
                        <div className="mt-5 space-y-2">
                            <span className={`${errors.email && touched.email ? 'text-red-500' : 'text-neutral-300'} text-sm`}>Email</span>
                            <Input
                                className={`${errors.email && touched.email ? 'border-red-500' : 'border-neutral-300'} border-2`}
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="email"
                                placeholder="Email"
                                onKeyDown={handleKeyDown}
                            />
                            {errors.email && touched.email && <p className="text-xs text-red-500">{errors.email}</p>}
                        </div>
                        <div className="mt-5 space-y-2">
                            <span className={`${errors.password && touched.password ? 'text-red-500' : 'text-neutral-300'} text-sm`}>Password</span>
                            <Input
                                className={`${errors.password && touched.password ? 'border-red-500' : 'border-neutral-300'} border-2`}
                                id="password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Password"
                                onKeyDown={handleKeyDown}
                            />
                            {errors.password && touched.password && <p className="text-xs text-red-500">{errors.password}</p>}
                        </div>
                        <div className="mt-6 flex gap-2">
                            <input disabled defaultChecked type="checkbox" className="checkbox w-5 h-5 border-neutral-400" />
                            <p className=" text-neutral-400 text-sm">i accept the terms of privacy and policy</p>
                        </div>
                        <div className="mt-10">
                            <Button type="submit" className="w-full py-6">Login</Button>
                        </div>
                        <p onClick={() => setOpenModal(true)} className="capitalize  text-neutral-400 text-center mt-3 hover:underline cursor-pointer text-sm"> forgot password?</p>
                        <p className="capitalize  text-neutral-400 text-center mt-3 text-sm"> dont have an account ? <Link to={`/signup/${role}`}><span className="underline cursor-pointer">Signup</span></Link> </p>
                    </form>
                </div>
            </div>
            <ForgotOtp openModal={openModal} setOpenModal={setOpenModal} value={value} setValue={setValue} otpSented={otpSented} setOtpSented={setOtpSented} email={email} />
        </div>
    )
}

export default Login
