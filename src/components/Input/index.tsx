import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

interface IProps {
  id: string;
  label: string;
  name: string;
  type: string;
}

const Input: React.FC<IProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      fullWidth
      label={label}
      helperText={meta.touched && meta.error}
      {...field}
      {...props}
    />
  );
};

export default Input;
