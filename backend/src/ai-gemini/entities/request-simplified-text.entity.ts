import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RequestSimolifiedEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    simplifiedText:string;

    @CreateDateColumn()
    createdAt: Date;
}