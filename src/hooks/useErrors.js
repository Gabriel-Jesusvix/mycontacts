import { useState, useCallback } from 'react';

export default function useErros() {
  const [errors, setErros] = useState([]);

  const setError = useCallback(({ field, message }) => {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (errorAlreadyExists) {
      return;
    }

    setErros((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }, [errors]);

  const removeError = useCallback((fieldName) => {
    setErros((prevState) => prevState.filter(
      (error) => error.field !== fieldName,
    ));
  }, []);

  const getErrorMessageByFieldName = useCallback((fildName) => (
    errors.find((error) => error.field === fildName)?.message
  ), [errors]);

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  };
}
