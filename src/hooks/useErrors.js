import { useState, useCallback } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  const setError = useCallback(({ filed, message }) => {
    const errorAlreadyExists = errors.find((error) => error.filed === filed);

    if (errorAlreadyExists) {
      return;
    }

    setErrors((prevState) => [
      ...prevState,
      { filed, message },
    ]);
  }, [errors]);

  const removeError = useCallback((filedName) => {
    setErrors((prevState) => prevState.filter((error) => error.filed !== filedName));
  }, []);

  const getErrorMessageByFiledName = useCallback((fildName) => (
    errors.find((error) => error.field === fildName)?.message
  ), [errors]);

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFiledName,
  };
}
