import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { WebResponse } from "src/model/web.model";
import { LoginUserRequest, LoginUserResponse, RegisterUserRequest, UpdateUserRequest, UserResponse } from "src/model/user.model";
import { request } from "http";

@Controller('/api/users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/create')
    async register (@Body() request: RegisterUserRequest): Promise<WebResponse<UserResponse>>{
        const result = await this.userService.register(request);
        return {
            data: result
        }
    }

    @Post('/login')
    async login (@Body() request: LoginUserRequest): Promise<WebResponse<LoginUserResponse>> {
        const result = await this.userService.login(request);
        return {
            data: result
        }
    }

    @Get('/:user_id')
    async getOne (@Param('user_id', ParseIntPipe) user_id: number): Promise<WebResponse<UserResponse>> {
        const result = await this.userService.getOne(user_id);
        return {
            data: result
        }
    }

    @Get()
    async getAll (
        @Query('page', new ParseIntPipe({optional: true})) page: number = 1,
        @Query('size', new ParseIntPipe({optional: true})) size: number = 10,
    ) : Promise <WebResponse<UserResponse[]>> {
        const result = await this.userService.getAll(page, size)
        return result
    }

    @Put('/update/:user_id')
    async update (@Param('user_id', ParseIntPipe) user_id: number, @Body() request: UpdateUserRequest) : Promise<WebResponse<UserResponse>> {
        const result = await this.userService.update(request, user_id);
        return {
            data: result
        }
    }

    @Delete('/delete/:user_id')
    async remove (@Param('user_id', ParseIntPipe) user_id: number): Promise <WebResponse<UserResponse>> {
        const result = await this.userService.remove(user_id);
        return {
            data: result
        }
    }

    @Put('/trash/:user_id')
    async trash (@Param('user_id', ParseIntPipe) user_id: number): Promise <WebResponse<UserResponse>> {
        const result = await this.userService.trash(user_id);
        return {
            data: result
        }
    }

}