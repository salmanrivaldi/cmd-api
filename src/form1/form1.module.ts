import { Module } from "@nestjs/common";
import { Form1Service } from "./form1.service";
import { Form1Controller } from "./form1.controller";

@Module({
    providers: [Form1Service],
    controllers: [Form1Controller]
})
export class Form1Module {}