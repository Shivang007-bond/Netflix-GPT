export const checkValidData = ( email, password) => {

  const isValidEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/.test(
      email
    );

  const isValidPassword =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);


  if (!isValidEmail)
    return "Email ID is not valid.(should contain a '@' and '.')";

  if (!isValidPassword)
    return "Password is not valid.(should be eight characters long , should have an uppercase , a lowercase and a special character)";

  return null;
};
