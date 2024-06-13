import {useState} from 'react';

export const useForm = initalValue => {
  const [values, setValues] = useState(initalValue);
  return [
    values,
    (formType, formValue) => {
      if (formType === 'reset') {
        return setValues(initalValue);
      }
      return setValues({...values, [formType]: formValue});
    },
  ];
};
