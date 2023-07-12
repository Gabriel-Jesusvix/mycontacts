import { useState } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  function setError({ filed, message }) {
    const errorAlreadyExists = errors.find((error) => error.filed === filed);

    if (errorAlreadyExists) {
      return;
    }

    setErrors((prevState) => [
      ...prevState,
      { filed, message },
    ]);
  }

  function removeError(filedName) {
    setErrors((prevState) => prevState.filter((error) => error.filed !== filedName));
  }

  function getErrorMessageByFiledName(filedName) {
    return errors.find((error) => error.filed === filedName)?.message;
  }

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFiledName,
  };
}
