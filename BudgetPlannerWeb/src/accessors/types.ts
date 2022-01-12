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
    users: EmailWithRole[];
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
    name: string;
    items: Item[];
    sum: number;
    users: [];
    isVisitor: boolean;
}

export interface TokenResponse {
    token: string;
}

export interface ItemEdit {
    id?: string;
    listId: string;
    name: string;
    price: number;
}

export const EMPTY_ITEM_EDIT: ItemEdit = {
    listId: "",
    name: "",
    price: 0
}

export interface EmailWithRole {
    email: string;
    type: UserRole;
}

export enum UserRole {
    OWNER = 0,
    CONTRIBUTOR = 1,
    VISITOR = 2
}

export const EMPTY_EMAIL_WITH_ROLE: EmailWithRole = {
    email: "",
    type: UserRole.CONTRIBUTOR
}

export interface ListUsers {
    linkedUsers: EmailWithRole[];
    relevantEmails: string[];
}

export const EMPTY_LIST_USERS: ListUsers = {
    linkedUsers: [],
    relevantEmails: []
}