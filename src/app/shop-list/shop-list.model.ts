import { UsersModel } from "./../user/user.model";

export class ShopsModel {
    _id: string;
    name: string;
    address: addressModel = new addressModel() ;
    shopcode: string;
    email: string;
    phone: string;
    location: locateModel = new locateModel();
    created: Date;
    logo: string;
    shopowner: string;
    openinghours: openTimeModel = new openTimeModel();
    facebook: string;
    instagram: string;
    line: string;
    parking: string;
    favorite: Array<UsersModel>;
    image: Array<string>;
    createduser: UsersModel = new UsersModel();
    editlog: Array<createUserModel>
}
export class createUserModel {
    user: UsersModel;
    date: Date;
}
export class openTimeModel{
    open: Date = new Date(); 
    close: Date = new Date();
}
export class addressModel{
    address: string;
    subdistrict: string;
    district: string;
    province: string;
    postcode: string;
}

export class locateModel{
    
        lat: string;
        lng: string;
    
}