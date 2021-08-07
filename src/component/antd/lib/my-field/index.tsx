import React, { useContext } from 'react';
import Field, { MyFieldProps } from './Field';

export default ({
  formProps,
  ...props
}:MyFieldProps) => {

  return (
    <Field
      { ...props }
    />
  )
}