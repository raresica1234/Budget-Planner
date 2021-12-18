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
    name: "",
    users: []
};

export interface ListEdit {
    id?: string;
    name: string;
    users: [];
}

export interface List {
    id?: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Item {
    id?: string;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ListDetails {
    listName: string;
    items: Item[];
    sum: number;
    users: [];
}

export interface TokenResponse {
    token: string;
}