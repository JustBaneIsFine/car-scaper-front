export interface LoginCheckReturn {
  loggedIn: boolean;
  user: false | { username: string; email: string };
}

export interface ReturnValueBasic {
  success: boolean;
  error: false | string;
  loggedIn: boolean;
}

export interface RegisterReturnValue {
  success: boolean;
  error: false | string;
}
