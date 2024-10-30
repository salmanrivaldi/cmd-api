import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Form1Service } from "./form1.service";
import { WebResponse } from "src/model/web.model";
import { Form1Response, CreateForm1Request, UpdateForm1Request } from "src/model/form1.model";
import { request } from "http";

@Controller('/api/form1')
export class Form1Controller {

    constructor(private Form1Service: Form1Service){}

    @Post('/create')
    async create(@Body() request: CreateForm1Request): Promise<WebResponse<Form1Response>> {
        const result = await this.Form1Service.create(request);
        return {
            data: result
        }
    }

    @Get('/find/:id')
    async get(@Param('id') id:string): Promise<WebResponse<Form1Response>> {
        const result = await this.Form1Service.getOne(id);
        return {data: result}
    }

    @Get('/all')
    async getAll(): Promise<WebResponse<Form1Response[]>> {
    const result = await this.Form1Service.getAll();
    return { data: result };
    }

    @Put('/update/:id')
    async update(@Param('id') id:string, @Body() request: UpdateForm1Request): Promise<WebResponse<Form1Response>> {
        const result = await this.Form1Service.update(request);
        return {
            data : result
        }
    }

}

    

