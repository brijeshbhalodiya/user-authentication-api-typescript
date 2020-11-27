type ErrorData = {
  [key: string]: any
}

export class CustomError extends Error {
  constructor(
    public message: string,
    public code: string | number = "INTERNAL_ERROR",
    public status: number = 500,
    public data: ErrorData = {},
    ){
      super();
    }
}

export class BadUserInputError extends CustomError {
  constructor(errorData: ErrorData){
    super("There were validation errors.", 'BAD_USER_INPUT', 400, errorData);
  }
}

export class RouteNotFoundError extends CustomError {
  constructor(originalUrl: string) {
    super(`Route '${originalUrl}' does not exist.`, 'ROUTE_NOT_FOUND', 404);
  }
}