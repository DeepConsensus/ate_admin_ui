
export interface Agent
{
    _id?: string;
    name?: string;
    email?: string;
    address?: string;
    latitude?: number;
    longtitude?: number;   
    image?: string;
    countrycode?: string;
    phone?: number;
    deviceId?: string;
    deviceOS?: string;
    status?: number;
    updatedAt?: Date;
    createdAt?: Date;
}
