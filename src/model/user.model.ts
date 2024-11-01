export class UserResponse {
    user_id: number;
    user_uuid: string;
    site_id: string;
    user_login: string;
    user_login_old: string;
    user_pass: string;
    user_pass2: string;
    user_first: string;
    user_last: string;
    user_gender: string;
    user_tmp_lahir: string;
    user_tgl_lahir?: Date;
    user_level_instansi: string;
    user_type: string;
    user_implementor: string;
    prov_kode: string;
    kab_kode: string;
    kec_kode: string;
    user_alamat: string;
    user_email: string;
    user_wilayah: string;
    user_telepon: string;
    user_imei: string;
    user_lama_kerja: string;
    user_group: string;
    user_group2: string;
    user_mulai: Date;
    user_akhir: Date;
    user_perminggu: number;
    user_renumerasi: string;
    user_renumerasi_nilai: number;
    user_salary: number;
    user_stipend: number;
    user_transportasi: number;
    user_telekomunikasi: number;
    user_alat: string;
    user_renumerasi_lain: string;
    user_renumerasi_nilai_lain: string;
    user_jam_kerja: number;
    user_paren: string;
    user_level: string;
    user_permit: string;
    user_active: string;
    user_display: string;
    user_avatar: string;
    utoken: string;
    create_by: string;
    create_date: Date;
    modify_by: string;
    modify_date: Date;
    language: string;
    trash: number;
}

export class RegisterUserRequest {
    user_uuid: string;
    site_id: string;
    user_login: string;
    user_login_old: string;
    user_pass: string;
    user_pass2: string;
    user_first: string;
    user_last: string;
    user_gender: string;
    user_tmp_lahir: string;
    user_tgl_lahir?: Date;
    user_level_instansi: string;
    user_type: string;
    user_implementor: string;
    prov_kode: string;
    kab_kode: string;
    kec_kode: string;
    user_alamat: string;
    user_email: string;
    user_wilayah: string;
    user_telepon: string;
    user_imei: string;
    user_lama_kerja: string;
    user_group: string;
    user_group2: string;
    user_mulai: Date;
    user_akhir: Date;
    user_perminggu: number;
    user_renumerasi: string;
    user_renumerasi_nilai: number;
    user_salary: number;
    user_stipend: number;
    user_transportasi: number;
    user_telekomunikasi: number;
    user_alat: string;
    user_renumerasi_lain: string;
    user_renumerasi_nilai_lain: string;
    user_jam_kerja: number;
    user_paren: string;
    user_level: string;
    user_permit: string;
    user_active: string;
    user_display: string;
    user_avatar: string;
    utoken: string;
    create_by: string;
    create_date: Date;
    modify_by: string;
    modify_date: Date;
    language: string;
    trash: number;
}

export class LoginUserRequest {
    user_login: string;
    user_pass: string;
}

export class LoginUserResponse {
    user_id: number;
    user_login: string;
    token: string;
}

export class UpdateUserRequest{
    user_uuid: string;
    site_id: string;
    user_login: string;
    user_login_old: string;
    user_pass: string;
    user_pass2: string;
    user_first: string;
    user_last: string;
    user_gender: string;
    user_tmp_lahir: string;
    user_tgl_lahir?: Date;
    user_level_instansi: string;
    user_type: string;
    user_implementor: string;
    prov_kode: string;
    kab_kode: string;
    kec_kode: string;
    user_alamat: string;
    user_email: string;
    user_wilayah: string;
    user_telepon: string;
    user_imei: string;
    user_lama_kerja: string;
    user_group: string;
    user_group2: string;
    user_mulai: Date;
    user_akhir: Date;
    user_perminggu: number;
    user_renumerasi: string;
    user_renumerasi_nilai: number;
    user_salary: number;
    user_stipend: number;
    user_transportasi: number;
    user_telekomunikasi: number;
    user_alat: string;
    user_renumerasi_lain: string;
    user_renumerasi_nilai_lain: string;
    user_jam_kerja: number;
    user_paren: string;
    user_level: string;
    user_permit: string;
    user_active: string;
    user_display: string;
    user_avatar: string;
    utoken: string;
    create_by: string;
    create_date: Date;
    modify_by: string;
    modify_date: Date;
    language: string;
    trash: number;
}

export class UpdateUserResponse{
    
}
