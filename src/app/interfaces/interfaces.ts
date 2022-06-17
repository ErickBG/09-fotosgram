export interface RespuestaPosts {
    ok:   boolean;
    page: number;
    post: Post[];
}

export interface Post {
    _id?:     string;
    message?: string;
    imgs?:    string[];
    coords?:  string;
    user?:    User;
    created?: Date;
}

export interface User {
    _id?:      string;
    nameUser?: string;
    avatar?:   string;
    email?:    string;
    password?:    string;
}