export interface User {
    email: string;
    password: string;
}

export interface RegisterUser extends User {
    confirmPassword: string;
}

export const EMPTY_USER: User = {
    email: "",
    password: ""
}

export const EMPTY_REGISTER_USER: RegisterUser = {
    ...EMPTY_USER,
    confirmPassword: ""
}
