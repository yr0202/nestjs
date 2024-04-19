import { Injectable } from "@nestjs/common";
import { Myboard } from "./entities/myboards.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class MyboardsRepository extends Repository<Myboard>{
    constructor(dataSource: DataSource){
        super(Myboard, dataSource.createEntityManager());
    }
}