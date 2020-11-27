import { EMAIL_REGEX } from "./../constants/regex";

export const validateEmail = (email: string): boolean => {
  
  if(!email || email.length > 256 || !EMAIL_REGEX.test(email)){
    return false
  }

  // Further checking of some things regex can't handle
  const [account, address] = email.split("@");

  if(account.length > 64){
    return false;
  }

  return !address.split('.').some((part) => {
    return part.length > 63;
  })
};
