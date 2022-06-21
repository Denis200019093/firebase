import * as Yup from 'yup';

const validation = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(12, 'Must be 12 characters or more')
    .required('Required'),
});

export default validation;
