const validateMail = (mail: string): string | true  => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!regex.test(mail)) return "Please input a valid email";
  return true;
};

const validatePsw = (psw: string): string | true  => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 chars, one letter and one number.
  if (!regex.test(psw))
    return "Passwords must have at least 8 characters, one letter and one number";
  return true;
};

const validateName = (name: string): string | true => {
  const regex = /^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/; // A-z chars allowed, min 2 chars for name, no trailing space.
  if (!regex.test(name)) return "Name can only hold latin alphabet characters";
  return true;
};

const validateUsername = (username: string): string | true  => {
  const regex = /^[A-Za-z][A-Za-z0-9_]{3,15}$/; // Between 3-15 chars, only a-z and 0-9 chars allowed.
  if (!regex.test(username))
    return "Username must start with a letter and have at least 3 to 15 characters";
  return true;
};

const validateDescription = (description: string): string | true  => {
  if (description.length === 0) return true; // By default posts can be posted without description.
  const regex = /^(.|\s)*[a-zA-Z]+(.|\s)*$/; // Allows alphabets, numbers, special chars.
  if (!regex.test(description) || description.length > 2200)
    return "Description can only contain 2200 characters between alphabets, numbers and special characters if needed";
  return true;
};

const isFileImage = (file: File): string | true  => {
  if (file && file.type.includes("image")) return true;
  else
    return "There seems to be a problem with your file. Ensure it is an image.";
};

export {
  validateMail,
  validateName,
  validatePsw,
  validateUsername,
  validateDescription,
  isFileImage,
};
