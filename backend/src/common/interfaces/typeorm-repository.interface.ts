import { FindOptionsWhere } from 'typeorm';
import {IRepository} from "./repository.interface";
export interface ITypeormRepository<T> extends Omit<IRepository<T>, 'findByParams' | 'findOneByParams'> {
    findByParams(params: FindOptionsWhere<T>): Promise<T[] | null>;
    findOneByParams(params: FindOptionsWhere<T>): Promise<T | null>;
}