import React from 'react';
import CustomForm from 'components/customForm';
import { useAuth } from 'context/authContext';
import {
  registerFields,
  registerInitValue,
  validateRegister,
} from './registerFields';

const Register = () => {
  const { handleRegister } = useAuth();

  return (
    <CustomForm
      initialValues={registerInitValue}
      onSubmit={handleRegister}
      btnProps={{
        children: 'Sign Up',
      }}
      fields={registerFields}
      validate={validateRegister}
    />
  );
}

Register.displayName = 'Not Found';

export default Register;
