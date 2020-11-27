import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret'

type JWT_OPTIONS = {
  secret?: string,
  expiresIn?: string | number
}

const signToken = (payload: object, options: JWT_OPTIONS = {}): string => {
  let secret = JWT_SECRET;
  if(options.secret){
    secret = options.secret;
  }

  if(options.expiresIn){
    return jwt.sign(payload, secret, { expiresIn: options.expiresIn })
  }

  return jwt.sign(payload, secret, { noTimestamp: true })
}

const verify = (token: string, options: JWT_OPTIONS = {}): string | object => {
  let secret = JWT_SECRET;
  if(options.secret){
    secret = options.secret;
  }

  return jwt.verify(token, secret);
}

export default {
  signToken,
  verify
}