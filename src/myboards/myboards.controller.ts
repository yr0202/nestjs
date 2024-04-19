import { Controller } from '@nestjs/common';
import { MyboardsService } from './myboards.service';

@Controller('myboards')
export class MyboardsController {
    constructor(
        private myboardsService: MyboardsService
    ) { }
}
