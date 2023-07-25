export interface ContactRequest {
    firstName: string;
    lastName:  string;
    age:       number;
    photo:     string;
}

export interface GetContacts {
    message: string;
    data:    ContactResponse[];
}

export interface ContactResponse {
    id:        string;
    firstName: string;
    lastName:  string;
    age:       number;
    photo:     string;
}
