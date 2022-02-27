export interface Notice
{
    _id?: string;
    title?: string;
    notice?: string;
    extraNote?: string;   
    delivery_user?: {
        id?: string;
        name?: string;
        deviceId?: string;
        deviceOS?: string;
    }[];
    createdAt?: Date;
    updatedAt?: Date;
}
