import { Body, Controller, Post } from "@nestjs/common";
import { Form1Service } from "./form1.service";
import { WebResponse } from "src/model/web.model";
import { Form1Response, RegisterForm1Request } from "src/model/form1.model";

@Controller('/api/form1')
export class Form1Controller {

    constructor(private Form1Service: Form1Service){}

    @Post()
    async register(@Body() request: RegisterForm1Request): Promise<WebResponse<Form1Response>> {
        
        const result = await this.Form1Service.register(request);

        return {
            data: result
        }
    }
}