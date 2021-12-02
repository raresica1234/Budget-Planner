export interface User {
    email: string;
    password: string;
}

export interface RegisterUser extends User {
    confirmPassword: string;
}

export const EMPTY_USER: User = {
    email: "",
    password: "",
};

export const EMPTY_REGISTER_USER: RegisterUser = {
    ...EMPTY_USER,
    confirmPassword: "",
};

export const EMPTY_LIST_EDIT: ListEdit = {
    name: ""
};

export interface ListEdit {
    id?: string;
    name: string;
}

export interface List {
    id?: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
