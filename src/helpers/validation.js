import * as Yup from 'yup';


export const BookSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    description: Yup.string()
      .min(2, 'Too short!')
      .max(1250, 'Too Long!')
      .required('Description is required'),
    price: Yup.number()
      .positive('Price must be a positive number')
      .required('Price is required'),
    imageUrl: Yup.string().url('Must be a valid URL').nullable(),
  });

export const loginShema = Yup.object().shape({
  username: Yup.string().required('Title is required'),
  password:Yup.string()
  .min(8, 'Password is too short - should be 8 chars minimum.')
  .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  email:  Yup.string().required('Title is required'),
})

export const signShema = Yup.object().shape({
  username: Yup.string().required('Title is required'),
  password:Yup.string().required("ıs Requierd")
  .min(8, 'Password is too short - should be 8 chars minimum.')
  .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
 passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  email:  Yup.string().required('Title is required'),
})