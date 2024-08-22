import { ResetPasswordValidation } from '@/validations/formvalidation'
import { useFormik } from 'formik'
import { Input } from './input'
import { Button } from './button'
import { toast } from 'sonner'
import { UpdatePassword } from '@/api/projectLeadApi'
import { UserRole } from '@/types/user'
import { useParams } from 'react-router-dom'
import { TeamMemberResetPassword } from '@/api/teamMemberApi'

function ResetPassword({ email, setOpenModal, setChangePassword }: any) {

    const { role } = useParams()

    const { errors, touched, isSubmitting, values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: ResetPasswordValidation,
        onSubmit: async (values) => {
            if (values) {
                if (role === UserRole.projectlead) {
                    const data = await UpdatePassword({ email, password: values.password })
                    if (data) {
                        setOpenModal(false)
                        setChangePassword(false)
                        toast.success('Password is succesfully Reseted.')
                    }
                } else if (role == UserRole.teammember) {
                    const data = await TeamMemberResetPassword({ email, password: values.password })
                    if (data) {
                        setOpenModal(false)
                        setChangePassword(false)
                        toast.success('Password is succesfully Reseted.')
                    }
                }

            }
        }
    })

    return (
        <div className="w-full">
            <form className='space-y-5' onSubmit={handleSubmit}>
                <span className={`${errors.password && touched.password ? 'text-red-500' : ''} text-sm`}>Password</span>
                <div>
                    <Input
                        className={`${errors.password && touched.password ? 'border-red-500' : ''} border-2`}
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        placeholder="new password"
                    />
                    {errors.password && touched.password && <p className="text-xs text-red-500">{errors.password}</p>}                        </div>
                <span className={`${errors.password && touched.password ? 'text-red-500' : ''} text-sm`}>confirm Password</span>
                <div>
                    <Input
                        className={`${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''} border-2`}
                        id="confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="confirm password"
                    />
                    {errors.confirmPassword && touched.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}                            </div>
                <div className='w-full'>
                    <Button type='submit' className='w-full capitalize'>Reset Password</Button>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword
