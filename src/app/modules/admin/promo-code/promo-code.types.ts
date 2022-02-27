export interface PromoCode
{
    _id?: string;
    discount?: number;
    usagelimit_percoupon?: number;
    usagelimit_peruser?: number;
    type?: string,
    promocodetype?: string,
    promocode?: string,
    avaiable_from?: Date,
    createdAt?: Date;
    updatedAt?: Date;
}
