import * as yup from 'yup'

export const signupSchema = yup.object().shape({
    name: yup.string()
        .min(5, 'Name must be at least 2 characters')
        .max(50, 'Name must be at most 50 characters')
        .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
        .required('Name is required'),
    username: yup.string()
        .min(5, 'Username must be at least 3 characters')
        .max(15, 'Username must be at most 15 characters')
        .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
        .required('Username is required'),
    email: yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
        .required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),

})

export const loginSchema = yup.object().shape({
    email: yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
        .required('Password is required'),
})


export const NewProjectSchema = yup.object().shape({
    projectName: yup.string()
        .required('Project Name is required')
        .min(3, 'Project name must be at least 3 characters')
        .max(20, 'Project name must be at most 20 characters'),
    description: yup.string()
        .required('Description is required')
        .min(30, 'Description should be at least 30 characters')
        .max(200, 'Description should not be more than 200 characters')
});
