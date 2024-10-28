import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/common/prisma.service";
import { ValidationService } from "src/common/validation.service";
import { RegisterUserRequest, UserResponse } from "src/model/user.model";
import { Logger } from "winston";
import { UserValidation } from "./user.validation";

@Injectable()
export class UserService {

        constructor(
            private validationService: ValidationService,
            @Inject(WINSTON_MODULE_PROVIDER) private logger:Logger,
            private prismaService: PrismaService
        ) {}

        async register(request: RegisterUserRequest): Promise<UserResponse> {

            this.logger.info(`Register new user ${JSON.stringify(request)}`);
            this.validationService.validate(UserValidation.REGISTER, request);

            const totalUserWithSameUsername = await this.prismaService
            return null
        }

}