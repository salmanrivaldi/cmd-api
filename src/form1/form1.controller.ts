import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from "@nestjs/common";
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

    @Get('/:id')
    async get(@Param('id') id:string): Promise<WebResponse<Form1Response>> {
        const result = await this.Form1Service.getOne(id);
        return {data: result}
    }

    @Get()
    async getAll(
        @Query('page', new ParseIntPipe ({optional: true})) page: number = 1,
        @Query('size', new ParseIntPipe ({optional: true})) size: number = 10, 
    ) : Promise <WebResponse<Form1Response[]>> {
        return this.Form1Service.getAll(page, size)
    }


    @Put('/update/:id')
    async update(@Param('id') id:string, @Body() request: UpdateForm1Request): Promise<WebResponse<Form1Response>> {
        const result = await this.Form1Service.update(request, id);
        return {
            data : result
        }
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id:string): Promise<WebResponse<Form1Response>> {
        const result = await this.Form1Service.remove(id)
        return {
            data : result
        }
    }

    @Put('/trash/:id')
    async trash(@Param('id') id:string): Promise<WebResponse<Form1Response>> {
        const result = await this.Form1Service.trash(id)
        return {
            data: result
        }
    }

}

    

