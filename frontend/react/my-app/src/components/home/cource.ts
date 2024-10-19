export interface IModule {
    id: string;
    name: string;
    description: string;
  }
export interface ICourse {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    modules?: IModule[];
}