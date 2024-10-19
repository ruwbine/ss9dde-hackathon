import {IModule} from "../../modules/interfaces/module.interface";

export interface ICourse {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    modules?: IModule[];
}
