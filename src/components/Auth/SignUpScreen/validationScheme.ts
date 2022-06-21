import * as Yup from 'yup';

const validation = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  fullname: Yup.string()
    .matches(
      /\b[A-Z][a-z]* [A-Z][a-z]*( [A-Z])?\b/,
      'Полное имя должно состоять из 2 слов и начинаться с заглавных букв',
    )
    .min(2, 'Must be 2 characters or more')
    .required('Required'),
  password: Yup.string()
    .min(12, 'Must be 12 characters or more')
    .required('Required'),
  repeatPassword: Yup.string()
    .min(12, 'Must be 12 characters or more')
    .oneOf([Yup.ref('password'), null], "Passwords don't match!")
    .required('Required'),
});

export default validation;
