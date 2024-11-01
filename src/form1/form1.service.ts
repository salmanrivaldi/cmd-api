import { HttpException, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/common/prisma.service";
import { ValidationService } from "src/common/validation.service";
import { CreateForm1Request, Form1Response, PagingForm1Request, UpdateForm1Request,  } from "src/model/form1.model";
import { exceptions, http, Logger } from "winston";
import { Form1Validation } from "./form1.validation";
import { v4 as uuidv4 } from "uuid"
import { Prisma, TbForm1 } from "@prisma/client";
import { request } from "http";
import { Paging, WebResponse } from "src/model/web.model";
import { take } from "rxjs";
import { date } from "zod";

@Injectable()
export class Form1Service {

    constructor(
        private ValidationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private PrismaService: PrismaService,
    ) {}

    //Create Form 1
    async create(request: CreateForm1Request) : Promise<Form1Response> {

        this.logger.info(`Create new form 1 ${JSON.stringify(
            request,
            (key, value) => (typeof value === 'bigint' ? value.toString() : value)
        )}`);
        

        const createForm1Request: CreateForm1Request = this.ValidationService.validate(Form1Validation.CREATEFORM1, request)
        
        //Generate UUID
        const uuid = uuidv4()

        //Generate ID
        // Format tgl_kontak to a string 
        let tglKontakFormatted;
        if (typeof request.tgl_kontak === 'string') {
            tglKontakFormatted = new Date(request.tgl_kontak).toISOString().split('T')[0].replace(/-/g, '');
        } else if (request.tgl_kontak instanceof Date) {
            tglKontakFormatted = request.tgl_kontak.toISOString().split('T')[0].replace(/-/g, '');
        } else {
            throw new HttpException('Invalid tgl_kontak format. It must be a date.', 400);
        }

        //Concatenate tgl_kontak with UIC for ID
        const newId = `${tglKontakFormatted}${request.uic}`;
        
        const tbForm1 = await this.PrismaService.tbForm1.create({
            data: {
                no: request.no,
                uuid: uuid,
                id: newId,
                tgl_kontak: request.tgl_kontak,
                metode_kontak: request.metode_kontak,
                jumlah_kontak: request.jumlah_kontak,
                kategori_kontak: request.kategori_kontak,
                uic: request.uic,
                nik: request.nik,
                umur: request.umur,
                kps_sp: request.kps_sp,
                gender: request.gender,
                category: request.category,
                category2: request.category2,
                tipe_kd: request.tipe_kd,
                district: request.district,
                kecamatan: request.kecamatan,
                kelurahan: request.kelurahan,
                kelurahan2: request.kelurahan2,
                lokasi_kontak: request.lokasi_kontak,
                phone: request.phone,
                phone_number: request.phone_number,
                ktp: request.ktp,
                ktp_ya: request.ktp_ya,
                asuransi: request.asuransi,
                asuransi_ya: request.asuransi_ya,
                tahu_status_hiv: request.tahu_status_hiv,
                tes_hasil_enam_bulan: request.tes_hasil_enam_bulan,
                tes_hasil_duabelas_bulan: request.tes_hasil_duabelas_bulan,
                terdaftar_perawatan: request.terdaftar_perawatan,
                didampingi_cbs_plus: request.didampingi_cbs_plus,
                berbagi_jarum_suntik: request.berbagi_jarum_suntik,
                seks_tanpa_kondom: request.seks_tanpa_kondom,
                eligible: request.eligible,
                mengalami_kekerasan: request.mengalami_kekerasan,
                bersedia_dirujuk_aeo: request.bersedia_dirujuk_aeo,
                mengalami_gejala_tb: request.mengalami_gejala_tb,
                jarum_suntik: request.jarum_suntik,
                kondom: request.kondom,
                pelicin: request.pelicin,
                media_kie: request.media_kie,
                prep: request.prep,
                prep_link: request.prep_link,
                klien_adalah: request.klien_adalah,
                tes: request.tes,
                tes_layanan: request.tes_layanan,
                tb: request.tb,
                ims: request.ims,
                gbv: request.gbv,
                tes_lainnya: request.tes_lainnya,
                menolak_dirujuk: request.menolak_dirujuk,
                rencana_bertemu_lagi: request.rencana_bertemu_lagi,
                klien_form2: request.klien_form2,
                merujuk_cbs_plus: request.merujuk_cbs_plus,
                form_entri: request.form_entri,
                nama_cbs_plus: request.nama_cbs_plus,
                kode_nama_cbs: request.kode_nama_cbs,
                kode_parent_cbs: request.kode_parent_cbs,
                tipe_cbs: request.tipe_cbs,
                cso: request.cso,
                kode_cso: request.kode_cso,
                tgl_review: request.tgl_review,
                validated: request.validated,
                reported: request.reported,
                create_date: new Date(),
                create_by: request.create_by,
                modify_date: new Date(),
                modify_by: request.modify_by,
                trash: request.trash,
            }
        })

        return {
            no: tbForm1.no,
            uuid: tbForm1.uuid,
            id: tbForm1.id,
            tgl_kontak: tbForm1.tgl_kontak,
            metode_kontak: tbForm1.metode_kontak,
            jumlah_kontak: tbForm1.jumlah_kontak,
            kategori_kontak: tbForm1.kategori_kontak,
            uic: tbForm1.uic,
            nik: tbForm1.nik,
            umur: tbForm1.umur,
            kps_sp: tbForm1.kps_sp,
            gender: tbForm1.gender,
            category: tbForm1.category,
            category2: tbForm1.category2,
            tipe_kd: tbForm1.tipe_kd,
            district: tbForm1.district,
            kecamatan: tbForm1.kecamatan,
            kelurahan: tbForm1.kelurahan,
            kelurahan2: tbForm1.kelurahan2,
            lokasi_kontak: tbForm1.lokasi_kontak,
            phone: tbForm1.phone,
            phone_number: tbForm1.phone_number,
            ktp: tbForm1.ktp,
            ktp_ya: tbForm1.ktp_ya,
            asuransi: tbForm1.asuransi,
            asuransi_ya: tbForm1.asuransi_ya,
            tahu_status_hiv: tbForm1.tahu_status_hiv,
            tes_hasil_enam_bulan: tbForm1.tes_hasil_enam_bulan,
            tes_hasil_duabelas_bulan: tbForm1.tes_hasil_duabelas_bulan,
            terdaftar_perawatan: tbForm1.terdaftar_perawatan,
            didampingi_cbs_plus: tbForm1.didampingi_cbs_plus,
            berbagi_jarum_suntik: tbForm1.berbagi_jarum_suntik,
            seks_tanpa_kondom: tbForm1.seks_tanpa_kondom,
            eligible: tbForm1.eligible,
            mengalami_kekerasan: tbForm1.mengalami_kekerasan,
            bersedia_dirujuk_aeo: tbForm1.bersedia_dirujuk_aeo,
            mengalami_gejala_tb: tbForm1.mengalami_gejala_tb,
            jarum_suntik: tbForm1.jarum_suntik,
            kondom: tbForm1.kondom,
            pelicin: tbForm1.pelicin,
            media_kie: tbForm1.media_kie,
            prep: tbForm1.prep,
            prep_link: tbForm1.prep_link,
            klien_adalah: tbForm1.klien_adalah,
            tes: tbForm1.tes,
            tes_layanan: tbForm1.tes_layanan,
            tb: tbForm1.tb,
            ims: tbForm1.ims,
            gbv: tbForm1.gbv,
            tes_lainnya: tbForm1.tes_lainnya,
            menolak_dirujuk: tbForm1.menolak_dirujuk,
            rencana_bertemu_lagi: tbForm1.rencana_bertemu_lagi,
            klien_form2: tbForm1.klien_form2,
            merujuk_cbs_plus: tbForm1.merujuk_cbs_plus,
            form_entri: tbForm1.form_entri,
            nama_cbs_plus: tbForm1.nama_cbs_plus,
            kode_nama_cbs: tbForm1.kode_nama_cbs,
            kode_parent_cbs: tbForm1.kode_parent_cbs,
            tipe_cbs: tbForm1.tipe_cbs,
            cso: tbForm1.cso,
            kode_cso: tbForm1.kode_cso,
            tgl_review: tbForm1.tgl_review,
            validated: tbForm1.validated,
            reported: tbForm1.reported,
            create_date: tbForm1.create_date,
            create_by: tbForm1.create_by,
            modify_date: tbForm1.modify_date,
            modify_by: tbForm1.modify_by,
            trash: tbForm1.trash
        }

        
    }

    //Get One Form 1
    async getOne(id: string): Promise <Form1Response> {
        this.logger.info(`Fetching form with id ${id}`)

        const getForm1 = await this.PrismaService.tbForm1.findUnique({
            where: {
                id
            }
        })

        return getForm1
    }


    //Function to return form1 response
    toForm1Response(form1: TbForm1) : Form1Response {
        return {
        no: form1.no,
        uuid: form1.uuid,
        id: form1.id,
        tgl_kontak: form1.tgl_kontak ?? undefined, // Optional
        metode_kontak: form1.metode_kontak,
        jumlah_kontak: form1.jumlah_kontak,
        kategori_kontak: form1.kategori_kontak,
        uic: form1.uic,
        nik: form1.nik,
        umur: form1.umur,
        kps_sp: form1.kps_sp,
        gender: form1.gender,
        category: form1.category,
        category2: form1.category2,
        tipe_kd: form1.tipe_kd,
        district: form1.district,
        kecamatan: form1.kecamatan,
        kelurahan: form1.kelurahan,
        kelurahan2: form1.kelurahan2,
        lokasi_kontak: form1.lokasi_kontak,
        phone: form1.phone,
        phone_number: form1.phone_number,
        ktp: form1.ktp,
        ktp_ya: form1.ktp_ya,
        asuransi: form1.asuransi,
        asuransi_ya: form1.asuransi_ya,
        tahu_status_hiv: form1.tahu_status_hiv,
        tes_hasil_enam_bulan: form1.tes_hasil_enam_bulan,
        tes_hasil_duabelas_bulan: form1.tes_hasil_duabelas_bulan,
        terdaftar_perawatan: form1.terdaftar_perawatan,
        didampingi_cbs_plus: form1.didampingi_cbs_plus,
        berbagi_jarum_suntik: form1.berbagi_jarum_suntik,
        seks_tanpa_kondom: form1.seks_tanpa_kondom,
        eligible: form1.eligible,
        mengalami_kekerasan: form1.mengalami_kekerasan,
        bersedia_dirujuk_aeo: form1.bersedia_dirujuk_aeo,
        mengalami_gejala_tb: form1.mengalami_gejala_tb,
        jarum_suntik: form1.jarum_suntik,
        kondom: form1.kondom,
        pelicin: form1.pelicin,
        media_kie: form1.media_kie,
        prep: form1.prep,
        prep_link: form1.prep_link,
        klien_adalah: form1.klien_adalah,
        tes: form1.tes,
        tes_layanan: form1.tes_layanan,
        tb: form1.tb,
        ims: form1.ims,
        gbv: form1.gbv,
        tes_lainnya: form1.tes_lainnya,
        menolak_dirujuk: form1.menolak_dirujuk,
        rencana_bertemu_lagi: form1.rencana_bertemu_lagi,
        klien_form2: form1.klien_form2,
        merujuk_cbs_plus: form1.merujuk_cbs_plus,
        form_entri: form1.form_entri,
        nama_cbs_plus: form1.nama_cbs_plus,
        kode_nama_cbs: form1.kode_nama_cbs,
        kode_parent_cbs: form1.kode_parent_cbs,
        tipe_cbs: form1.tipe_cbs,
        cso: form1.cso,
        kode_cso: form1.kode_cso,
        tgl_review: form1.tgl_review,
        validated: form1.validated,
        reported: form1.reported,
        create_date: form1.create_date,
        create_by: form1.create_by,
        modify_date: form1.modify_date,
        modify_by: form1.modify_by,
        trash: form1.trash,
        }
    }

    //Get All Form 1
    async getAll(page: number, size: number) : Promise<WebResponse<Form1Response[]>> {

        const skip = (page - 1) * size;

        const form1 = await this.PrismaService.tbForm1.findMany({
            take: size,
            skip: skip
        });

        const total = await this.PrismaService.tbForm1.count();

        return {
            data: form1.map(form1 => this.toForm1Response(form1)),
            paging: {
                current_page: page,
                size: size,
                total_page: Math.ceil(total/size)
            }
        }
    }


    //Update Form 1
    
    async update(request: UpdateForm1Request, id: string): Promise<Form1Response> {
        this.logger.info(`Updating form 1 with id ${request.id} and UUID ${request.uuid}: ${JSON.stringify(
            request,
            (key, value) => (typeof value === 'bigint' ? value.toString() : value)
        )}`);
    
        const updateForm1Request:UpdateForm1Request = this.ValidationService.validate(Form1Validation.UPDATEFORM1, request);
    
        const existingForm = await this.PrismaService.tbForm1.findFirst({
            where: { id: id },
        });
        if (!existingForm) {
            throw new HttpException(`Form with UIC ${request.uic} not found.`, 404);
        }
    
        // Update fields based on incoming request
        const updatedForm = await this.PrismaService.tbForm1.update({
            where: { id: id },
            data: {
                no: request.no,
                tgl_kontak: request.tgl_kontak,
                metode_kontak: request.metode_kontak,
                jumlah_kontak: request.jumlah_kontak,
                kategori_kontak: request.kategori_kontak,
                uic: request.uic,
                nik: request.nik,
                umur: request.umur,
                kps_sp: request.kps_sp,
                gender: request.gender,
                category: request.category,
                category2: request.category2,
                tipe_kd: request.tipe_kd,
                district: request.district,
                kecamatan: request.kecamatan,
                kelurahan: request.kelurahan,
                kelurahan2: request.kelurahan2,
                lokasi_kontak: request.lokasi_kontak,
                phone: request.phone,
                phone_number: request.phone_number,
                ktp: request.ktp,
                ktp_ya: request.ktp_ya,
                asuransi: request.asuransi,
                asuransi_ya: request.asuransi_ya,
                tahu_status_hiv: request.tahu_status_hiv,
                tes_hasil_enam_bulan: request.tes_hasil_enam_bulan,
                tes_hasil_duabelas_bulan: request.tes_hasil_duabelas_bulan,
                terdaftar_perawatan: request.terdaftar_perawatan,
                didampingi_cbs_plus: request.didampingi_cbs_plus,
                berbagi_jarum_suntik: request.berbagi_jarum_suntik,
                seks_tanpa_kondom: request.seks_tanpa_kondom,
                eligible: request.eligible,
                mengalami_kekerasan: request.mengalami_kekerasan,
                bersedia_dirujuk_aeo: request.bersedia_dirujuk_aeo,
                mengalami_gejala_tb: request.mengalami_gejala_tb,
                jarum_suntik: request.jarum_suntik,
                kondom: request.kondom,
                pelicin: request.pelicin,
                media_kie: request.media_kie,
                prep: request.prep,
                prep_link: request.prep_link,
                klien_adalah: request.klien_adalah,
                tes: request.tes,
                tes_layanan: request.tes_layanan,
                tb: request.tb,
                ims: request.ims,
                gbv: request.gbv,
                tes_lainnya: request.tes_lainnya,
                menolak_dirujuk: request.menolak_dirujuk,
                rencana_bertemu_lagi: request.rencana_bertemu_lagi,
                klien_form2: request.klien_form2,
                merujuk_cbs_plus: request.merujuk_cbs_plus,
                form_entri: request.form_entri,
                nama_cbs_plus: request.nama_cbs_plus,
                kode_nama_cbs: request.kode_nama_cbs,
                kode_parent_cbs: request.kode_parent_cbs,
                tipe_cbs: request.tipe_cbs,
                cso: request.cso,
                kode_cso: request.kode_cso,
                tgl_review: request.tgl_review,
                validated: request.validated,
                reported: request.reported,
                modify_date: new Date(),
                modify_by: request.modify_by,
                trash: request.trash,
            },
        });
    
        return {
            no: updatedForm.no,
            uuid: updatedForm.uuid,
            id: updatedForm.id,
            tgl_kontak: updatedForm.tgl_kontak,
            metode_kontak: updatedForm.metode_kontak,
            jumlah_kontak: updatedForm.jumlah_kontak,
            kategori_kontak: updatedForm.kategori_kontak,
            uic: updatedForm.uic,
            nik: updatedForm.nik,
            umur: updatedForm.umur,
            kps_sp: updatedForm.kps_sp,
            gender: updatedForm.gender,
            category: updatedForm.category,
            category2: updatedForm.category2,
            tipe_kd: updatedForm.tipe_kd,
            district: updatedForm.district,
            kecamatan: updatedForm.kecamatan,
            kelurahan: updatedForm.kelurahan,
            kelurahan2: updatedForm.kelurahan2,
            lokasi_kontak: updatedForm.lokasi_kontak,
            phone: updatedForm.phone,
            phone_number: updatedForm.phone_number,
            ktp: updatedForm.ktp,
            ktp_ya: updatedForm.ktp_ya,
            asuransi: updatedForm.asuransi,
            asuransi_ya: updatedForm.asuransi_ya,
            tahu_status_hiv: updatedForm.tahu_status_hiv,
            tes_hasil_enam_bulan: updatedForm.tes_hasil_enam_bulan,
            tes_hasil_duabelas_bulan: updatedForm.tes_hasil_duabelas_bulan,
            terdaftar_perawatan: updatedForm.terdaftar_perawatan,
            didampingi_cbs_plus: updatedForm.didampingi_cbs_plus,
            berbagi_jarum_suntik: updatedForm.berbagi_jarum_suntik,
            seks_tanpa_kondom: updatedForm.seks_tanpa_kondom,
            eligible: updatedForm.eligible,
            mengalami_kekerasan: updatedForm.mengalami_kekerasan,
            bersedia_dirujuk_aeo: updatedForm.bersedia_dirujuk_aeo,
            mengalami_gejala_tb: updatedForm.mengalami_gejala_tb,
            jarum_suntik: updatedForm.jarum_suntik,
            kondom: updatedForm.kondom,
            pelicin: updatedForm.pelicin,
            media_kie: updatedForm.media_kie,
            prep: updatedForm.prep,
            prep_link: updatedForm.prep_link,
            klien_adalah: updatedForm.klien_adalah,
            tes: updatedForm.tes,
            tes_layanan: updatedForm.tes_layanan,
            tb: updatedForm.tb,
            ims: updatedForm.ims,
            gbv: updatedForm.gbv,
            tes_lainnya: updatedForm.tes_lainnya,
            menolak_dirujuk: updatedForm.menolak_dirujuk,
            rencana_bertemu_lagi: updatedForm.rencana_bertemu_lagi,
            klien_form2: updatedForm.klien_form2,
            merujuk_cbs_plus: updatedForm.merujuk_cbs_plus,
            form_entri: updatedForm.form_entri,
            nama_cbs_plus: updatedForm.nama_cbs_plus,
            kode_nama_cbs: updatedForm.kode_nama_cbs,
            kode_parent_cbs: updatedForm.kode_parent_cbs,
            tipe_cbs: updatedForm.tipe_cbs,
            cso: updatedForm.cso,
            kode_cso: updatedForm.kode_cso,
            tgl_review: updatedForm.tgl_review,
            validated: updatedForm.validated,
            reported: updatedForm.reported,
            create_date: updatedForm.create_date,
            create_by: updatedForm.create_by,
            modify_date: updatedForm.modify_date,
            modify_by: updatedForm.modify_by,
            trash: updatedForm.trash,
        };
    }
    
    //Delete Form 1
    async remove(id: string): Promise<Form1Response> {
        this.logger.info(`Removing form 1 with ID: ${id}`);

        const checkForm1Exist = await this.PrismaService.tbForm1.findFirst({
            where: {
                id
            }
        })

        if (!checkForm1Exist) {
            throw new HttpException(`Form doesn't exist!`, 404)
        }

        const form1 = await this.PrismaService.tbForm1.delete({
            where: {
                id
            }
        });

        return form1
    }

    //Trash Form 1
    async trash(id: string): Promise<Form1Response> {
        this.logger.info(`Trash with ID: ${id}`);

        const isTrashExist = await this.PrismaService.tbForm1.findFirst({
            where: {
                id
            }
        });

        if (!isTrashExist) {
            throw new HttpException(`Form doesn't exist!`, 404)
        }

        const trash = await this.PrismaService.tbForm1.update({
            where: {
                id
            }, 
            data: {trash: 1}
        });

        return trash
    }
    
    

}