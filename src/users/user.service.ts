import { HttpException, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/common/prisma.service";
import { ValidationService } from "src/common/validation.service";
import { LoginUserRequest, LoginUserResponse, RegisterUserRequest, UpdateUserRequest, UserResponse } from "src/model/user.model";
import { Logger } from "winston";
import { UserValidation } from "./user.validation";
import * as argon2 from 'argon2'
import * as bcrypt from 'bcrypt'
import { TbUser } from "@prisma/client";
import { v4 as uuid } from 'uuid'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { WebResponse } from "src/model/web.model";

@Injectable()
export class UserService {

        constructor(
            @Inject(WINSTON_MODULE_PROVIDER) private logger:Logger,
            private validationService: ValidationService,
            private prismaService: PrismaService,
            private jwtService: JwtService,
            private configService: ConfigService
        ) {}

        //Function to return User Response
        toUserResponse(user: TbUser): UserResponse {
            return {
                user_id: user.user_id,
                user_uuid: user.user_uuid,
                site_id: user.site_id,
                user_login: user.user_login,
                user_login_old: user.user_login_old,
                user_pass: user.user_pass,
                user_pass2: user.user_pass2,
                user_first: user.user_first,
                user_last: user.user_last,
                user_gender: user.user_gender,
                user_tmp_lahir: user.user_tmp_lahir,
                user_tgl_lahir: user.user_tgl_lahir,
                user_level_instansi: user.user_level_instansi,
                user_type: user.user_type,
                user_implementor: user.user_implementor,
                prov_kode: user.prov_kode,
                kab_kode: user.kab_kode,
                kec_kode: user.kec_kode,
                user_alamat: user.user_alamat,
                user_email: user.user_email,
                user_wilayah: user.user_wilayah,
                user_telepon: user.user_telepon,
                user_imei: user.user_imei,
                user_lama_kerja: user.user_lama_kerja,
                user_group: user.user_group,
                user_group2: user.user_group2,
                user_mulai: user.user_mulai,
                user_akhir: user.user_akhir,
                user_perminggu: user.user_perminggu,
                user_renumerasi: user.user_renumerasi,
                user_renumerasi_nilai: user.user_renumerasi_nilai.toNumber(),
                user_salary: user.user_salary.toNumber(),
                user_stipend: user.user_stipend.toNumber(),
                user_transportasi: user.user_transportasi.toNumber(),
                user_telekomunikasi: user.user_telekomunikasi.toNumber(),
                user_alat: user.user_alat,
                user_renumerasi_lain: user.user_renumerasi_lain,
                user_renumerasi_nilai_lain: user.user_renumerasi_nilai_lain,
                user_jam_kerja: user.user_jam_kerja,
                user_paren: user.user_paren,
                user_level: user.user_level,
                user_permit: user.user_permit,
                user_active: user.user_active,
                user_display: user.user_display,
                user_avatar: user.user_avatar,
                utoken: user.utoken,
                create_by: user.create_by,
                create_date: user.create_date,
                modify_by: user.modify_by,
                modify_date: user.modify_date,
                language: user.language,
                trash: user.trash,
            }
        }

        //Create User
        async register(request: RegisterUserRequest): Promise<UserResponse> {

            this.logger.info(`Register new user ${JSON.stringify(request)}`);
            
            const registerUser: RegisterUserRequest = this.validationService.validate(UserValidation.REGISTER, request);

            const totalUserWithSameUserlogin = await this.prismaService.tbUser.count({
                where : {
                    user_login : registerUser.user_login
                }
            });

            if (totalUserWithSameUserlogin != 0) {
                throw new HttpException('User already exist!', 400);
            }

            if (registerUser.user_pass2 != registerUser.user_pass) {
                throw new HttpException('Password tidak sama!', 400);
            }

            registerUser.user_uuid = uuid()

            registerUser.user_pass = await argon2.hash(registerUser.user_pass);
            registerUser.user_pass2 = await argon2.hash(registerUser.user_pass2);

            const user = await this.prismaService.tbUser.create({
                data: registerUser
            })
            
            return this.toUserResponse(user)
        }

        //Login User
        async login(request: LoginUserRequest): Promise<LoginUserResponse> {
            this.logger.info(`Login user with user_login ${JSON.stringify(request)}`);

            const loginUser: LoginUserRequest = this.validationService.validate(UserValidation.LOGIN, request);

            const user = await this.prismaService.tbUser.findFirst({
                where: {
                    user_login : loginUser.user_login
                }
            });

            if (!user) {
                throw new HttpException(`User doesn't exist!`, 404);
            }

            const isPasswordValid = await argon2.verify(user.user_pass, loginUser.user_pass);

            if (!isPasswordValid) {
                throw new HttpException(`Password is invalid!`, 400);
            }

            //Generate JWT token
            const payload = {user_id: user.user_id, user_login: user.user_login};
            const secret = this.configService.get<string>('JWT_SECRET');
            const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN');
            const token = this.jwtService.sign(payload, {secret, expiresIn});

            return {
                user_id: user.user_id,
                user_login: user.user_login,
                token
            }
        }

        //Get One User
        async getOne(user_id: number): Promise<UserResponse> {
            this.logger.info(`Fetching user with id ${JSON.stringify(user_id)}`);

            const getUser = await this.prismaService.tbUser.findUnique({
                where: {
                    user_id
                }
            });

            if (!getUser) {
                throw new HttpException(`User doesn't exist!`, 404);
            }

            return this.toUserResponse(getUser)
        }

        //Get All Users
        async getAll(page: number, size: number): Promise<WebResponse<UserResponse[]>> {
            
            const skip = (page - 1) * size;

            const users = await this.prismaService.tbUser.findMany({
                take: size,
                skip: skip
            });

            const total = await this.prismaService.tbUser.count();

            return {
                data: users.map(users => this.toUserResponse(users)),
                paging: {
                    current_page: page,
                    size: size,
                    total_page: Math.ceil(total/size)
                }
            }

        }

        //Update User
        async update(request: UpdateUserRequest, user_id: number): Promise<UserResponse> {
            this.logger.info(`Updating user with id ${user_id}`);

            const updateUser : UpdateUserRequest = await this.validationService.validate(UserValidation.UPDATE, request);

            const existingUser = await this.prismaService.tbUser.findFirst({
                where: {
                    user_id: user_id
                }
            });

            if (!existingUser) {
                throw new HttpException(`User doesn't exist!`, 404);
            }

            const updatedUser = await this.prismaService.tbUser.update({
                where: {
                    user_id: user_id
                },
                data: {
                    site_id: request.site_id,
                    user_login: request.user_login,
                    user_login_old: request.user_login_old,
                    user_pass: request.user_pass,
                    user_pass2: request.user_pass2,
                    user_first: request.user_first,
                    user_last: request.user_last,
                    user_gender: request.user_gender,
                    user_tmp_lahir: request.user_tmp_lahir,
                    user_tgl_lahir: request.user_tgl_lahir,
                    user_level_instansi: request.user_level_instansi,
                    user_type: request.user_type,
                    user_implementor: request.user_implementor,
                    prov_kode: request.prov_kode,
                    kab_kode: request.kab_kode,
                    kec_kode: request.kec_kode,
                    user_alamat: request.user_alamat,
                    user_email: request.user_email,
                    user_wilayah: request.user_wilayah,
                    user_telepon: request.user_telepon,
                    user_imei: request.user_imei,
                    user_lama_kerja: request.user_lama_kerja,
                    user_group: request.user_group,
                    user_group2: request.user_group2,
                    user_mulai: request.user_mulai,
                    user_akhir: request.user_akhir,
                    user_perminggu: request.user_perminggu,
                    user_renumerasi: request.user_renumerasi,
                    user_renumerasi_nilai: request.user_renumerasi_nilai,
                    user_salary: request.user_salary,
                    user_stipend: request.user_stipend,
                    user_transportasi: request.user_transportasi,
                    user_telekomunikasi: request.user_telekomunikasi,
                    user_alat: request.user_alat,
                    user_renumerasi_lain: request.user_renumerasi_lain,
                    user_renumerasi_nilai_lain: request.user_renumerasi_nilai_lain,
                    user_jam_kerja: request.user_jam_kerja,
                    user_paren: request.user_paren,
                    user_level: request.user_level,
                    user_permit: request.user_permit,
                    user_active: request.user_active,
                    user_display: request.user_display,
                    user_avatar: request.user_avatar,
                    utoken: request.utoken,
                    create_by: request.create_by,
                    create_date: request.create_date,
                    modify_by: request.modify_by,
                    modify_date: request.modify_date,
                    language: request.language,
                    trash: request.trash
                }
            });

            return {
                user_id: updatedUser.user_id,
                user_uuid: updatedUser.user_uuid,
                site_id: updatedUser.site_id,
                user_login: updatedUser.user_login,
                user_login_old: updatedUser.user_login_old,
                user_pass: updatedUser.user_pass,
                user_pass2: updatedUser.user_pass2,
                user_first: updatedUser.user_first,
                user_last: updatedUser.user_last,
                user_gender: updatedUser.user_gender,
                user_tmp_lahir: updatedUser.user_tmp_lahir,
                user_tgl_lahir: updatedUser.user_tgl_lahir,
                user_level_instansi: updatedUser.user_level_instansi,
                user_type: updatedUser.user_type,
                user_implementor: updatedUser.user_implementor,
                prov_kode: updatedUser.prov_kode,
                kab_kode: updatedUser.kab_kode,
                kec_kode: updatedUser.kec_kode,
                user_alamat: updatedUser.user_alamat,
                user_email: updatedUser.user_email,
                user_wilayah: updatedUser.user_wilayah,
                user_telepon: updatedUser.user_telepon,
                user_imei: updatedUser.user_imei,
                user_lama_kerja: updatedUser.user_lama_kerja,
                user_group: updatedUser.user_group,
                user_group2: updatedUser.user_group2,
                user_mulai: updatedUser.user_mulai,
                user_akhir: updatedUser.user_akhir,
                user_perminggu: updatedUser.user_perminggu,
                user_renumerasi: updatedUser.user_renumerasi,
                user_renumerasi_nilai: updatedUser.user_renumerasi_nilai.toNumber(),
                user_salary: updatedUser.user_salary.toNumber(),
                user_stipend: updatedUser.user_stipend.toNumber(),
                user_transportasi: updatedUser.user_transportasi.toNumber(),
                user_telekomunikasi: updatedUser.user_telekomunikasi.toNumber(),
                user_alat: updatedUser.user_alat,
                user_renumerasi_lain: updatedUser.user_renumerasi_lain,
                user_renumerasi_nilai_lain: updatedUser.user_renumerasi_nilai_lain,
                user_jam_kerja: updatedUser.user_jam_kerja,
                user_paren: updatedUser.user_paren,
                user_level: updatedUser.user_level,
                user_permit: updatedUser.user_permit,
                user_active: updatedUser.user_active,
                user_display: updatedUser.user_display,
                user_avatar: updatedUser.user_avatar,
                utoken: updatedUser.utoken,
                create_by: updatedUser.create_by,
                create_date: updatedUser.create_date,
                modify_by: updatedUser.modify_by,
                modify_date: updatedUser.modify_date,
                language: updatedUser.language,
                trash: updatedUser.trash,
            }
        } 

        //Delete User
        async remove(user_id: number): Promise<UserResponse> {
            this.logger.info(`Removing user with id ${user_id}`);

            const checkUserExist = await this.prismaService.tbUser.findFirst({
                where: {
                    user_id
                }
            });

            if (!checkUserExist) {
                throw new HttpException(`User doesn't exist!`, 404)
            }

            const removeUser = await this.prismaService.tbUser.delete({
                where: {
                    user_id
                }
            });

            return this.toUserResponse(removeUser)

        }

        //Trash User
        async trash(user_id: number): Promise<UserResponse> {
            this.logger.info(`User trash with id ${user_id}`);

            const isTrashExist = await this.prismaService.tbUser.findFirst({
                where: {
                    user_id
                }
            });

            if (!isTrashExist) {
                throw new HttpException(`User doesn't exist`, 404);
            }

            const trash = await this.prismaService.tbUser.update({
                where: {
                    user_id
                },
                data: {trash: 1}
            });

            return this.toUserResponse(trash)
        }
}