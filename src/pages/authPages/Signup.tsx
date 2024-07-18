import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import Starcomponent from "@/components/ui/starcomponent";
import { useFormik } from "formik";
import { signupSchema } from "@/validations/formvalidation";
import { ProjectLeadSignup } from "@/api/projectLeadApi";
import { saveProjectLeadInfo } from "@/redux/slices/projectLead";
import { Link } from "react-router-dom";
interface FormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Signup(): JSX.Element {

  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate()
  const { values, handleBlur, handleChange, handleSubmit, errors, touched, isSubmitting } = useFormik<FormValues>({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      if (role == 'Project-Lead') {
        const userinfo = {
          name: values.name,
          username: values.username,
          email: values.email,
          role
        }
        saveProjectLeadInfo(userinfo)
        const response = await ProjectLeadSignup(values)
        if (response) {
          navigate('/verify-otp')
        }
      }
    },
  });

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
    <div className="w-screen h-screen overflow-auto z-10  flex items-center pt-10 justify-evenly">
      <div className="w-[400px] hidden lg:block">
        <Starcomponent />
        <div className="mt-8">
          <p className="text-center text-neutral-400 text-sm">already have an account ?  <Link to={`/login/${role}`}><span className="underline cursor-pointer">Login</span></Link> </p>
        </div>
      </div>
      <div className="w-[400px] flex flex-col justify-evenly h-[600px]">
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold">Create account</h2>
          <span className="text-sm text-neutral-400">{role}</span>
          <div className="flex flex-col mt-3 space-y-2">
            <span className={`${errors.name && touched.name ? 'text-red-500' : 'text-neutral-300'} text-sm`}>Name</span>
            <Input
              className={`${errors.name && touched.name ? 'border-red-500' : 'border-neutral-300'} border-2`}
              id="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Name"
              onKeyDown={handleKeyDown}
            />
            {errors.name && touched.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>
          <div className="flex flex-col mt-3 space-y-2">
            <span className={`${errors.username && touched.username ? 'text-red-500' : 'text-neutral-300'} text-sm`}>Username</span>
            <Input
              className={`${errors.username && touched.username ? 'border-red-500' : 'border-neutral-300'} border-2`}
              id="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Username"
              onKeyDown={handleKeyDown}
            />
            {errors.username && touched.username && <p className="text-xs text-red-500">{errors.username}</p>}
          </div>
          <div className="flex flex-col mt-3 space-y-2">
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
          <div className="flex flex-col mt-3 space-y-2">
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
          <div className="flex flex-col mt-3 space-y-2">
            <span className={`${errors.confirmPassword && touched.confirmPassword ? 'text-red-500' : 'text-neutral-300'} text-sm`}>Confirm Password</span>
            <Input
              className={`${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-neutral-300'} border-2`}
              id="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm Password"
              onKeyDown={handleKeyDown}
            />
            {errors.confirmPassword && touched.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting} className={`${isSubmitting && 'cursor-not-allowed'} w-full mt-3 `}>Signup</Button>
        </form>
        <div className="mt-8 lg:hidden ">
          <p className="text-center text-neutral-400 text-sm">already have an account ?  <Link to={`/login/${role}`}><span className="underline cursor-pointer">Login</span></Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
