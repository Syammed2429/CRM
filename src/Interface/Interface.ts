export interface FormDataInterface {
    contact: string;
    name: string;
    avatar: string;
    organization: string;
    assignedUser: string;
    id?: string;
    status: string;

}
export interface RequiredField {
    field: keyof FormDataInterface;
    message: string;
}