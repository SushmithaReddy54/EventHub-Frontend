import * as yup from 'yup';

export const signUpValidationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  emailId: yup.string().email('Invalid email format').required('Email is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  createPassword: yup.string().required('Create Password is required').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$&*])[A-Za-z0-9!.@#$&*]{8,20}$/,
    'Password must contains atleast one capital, small letters, numeric and special character'
  ),
  confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('createPassword'), null], 'Passwords must match'),
});