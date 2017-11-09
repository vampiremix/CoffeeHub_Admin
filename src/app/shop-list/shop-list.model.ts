import { UsersModel } from "./../user/user.model";

export class ShopsModel {
    _id: string;
    name: string;
    address: {
        address: string;
        subdistrict: string;
        district: string;
        province: string;
        postcode: string;
    }
    shopcode: string;
    email: string;
    phone: string;
    location: {
        lat: string;
        lng: string;
    }
    created: Date;
    logo: string;
    shopowner: string;
    openinghours: {
        open: Date;
        close: Date;
    }
    facebook: string;
    instagram: string;
    line: string;
    parking: Array<string>;
    favorite: Array<UsersModel>;
    image: Array<string>;
    createduser: UsersModel;
    editlog: Array<createUserModel>
}
export class createUserModel {
    user: UsersModel;
    date: Date;
}