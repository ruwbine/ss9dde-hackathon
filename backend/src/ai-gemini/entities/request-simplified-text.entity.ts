import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RequestSimolifiedEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    simplifiedText:string;

}