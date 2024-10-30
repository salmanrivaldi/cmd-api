import { HttpException, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/common/prisma.service";
import { ValidationService } from "src/common/validation.service";
import { CreateForm1Request, Form1Response, UpdateForm1Request,  } from "src/model/form1.model";
import { exceptions, Logger } from "winston";
import { Form1Validation } from "./form1.validation";
import { v4 as uuidv4 } from "uuid"
import { Prisma } from "@prisma/client";

@Injectable()
export class Form1Service {

    constructor(
        private ValidationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private PrismaService: PrismaService,
    ) {}

    async create(request: CreateForm1Request) : Promise<Form1Response> {

        this.logger.info(`Create new form 1 ${JSON.stringify(
            request,
            (key, value) => (typeof value === 'bigint' ? value.toString() : value)
        )}`);
        
        
        //Create Form 1
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


    //Get All Form 1
    async getAll() {
        this.logger.info('Fetching all forms');
        try {
            // Fetch all forms from the database
            const allForms = await this.PrismaService.tbForm1.findMany();

            // Filter out invalid dates
            const validForms = allForms.filter(form => {
                const tglReview = new Date(form.tgl_review);
                return !isNaN(tglReview.getTime()); // Filter out invalid dates
            });

            // Return the valid forms
            return validForms;
        } catch (error) {
            this.logger.error('Could not fetch forms', error);
            throw new Error('Error fetching forms'); // Customize the error message as needed
        }
    }


    //Update Form 1
    async update( request: UpdateForm1Request): Promise<Form1Response> {
        this.logger.info(`Update form 1 ${JSON.stringify(
            request,
            (key, value) => (typeof value === 'bigint' ? value.toString() : value) 
        )}`);

        const updateForm1Request: UpdateForm1Request = this.ValidationService.validate(Form1Validation.UPDATEFORM1, request);

        const existingForm1 = await this.PrismaService.tbForm1.findUnique({
            where : { id: request.id }
        });

        if (!existingForm1) {
            throw new HttpException('Form not found!', 404)
        }

        const tbForm1 = await this.PrismaService.tbForm1.update({
            where: {id: request.id},
            data: {
                metode_kontak: request.metode_kontak || existingForm1.metode_kontak,
                jumlah_kontak: request.jumlah_kontak || existingForm1.jumlah_kontak,
                kategori_kontak: request.kategori_kontak || existingForm1.kategori_kontak,
                nik: request.nik || existingForm1.nik,
                umur: request.umur || existingForm1.umur,
                kps_sp: request.kps_sp || existingForm1.kps_sp,
                gender: request.gender || existingForm1.gender,
                category: request.category || existingForm1.category,
                category2: request.category2 || existingForm1.category2,
                tipe_kd: request.tipe_kd || existingForm1.tipe_kd,
                district: request.district || existingForm1.district,
                kecamatan: request.kecamatan || existingForm1.kecamatan,
                kelurahan: request.kelurahan || existingForm1.kelurahan,
                kelurahan2: request.kelurahan2 || existingForm1.kelurahan2,
                lokasi_kontak: request.lokasi_kontak || existingForm1.lokasi_kontak,
                phone: request.phone || existingForm1.phone,
                phone_number: request.phone_number || existingForm1.phone_number,
                ktp: request.ktp || existingForm1.ktp,
                ktp_ya: request.ktp_ya || existingForm1.ktp_ya,
                asuransi: request.asuransi || existingForm1.asuransi,
                asuransi_ya: request.asuransi_ya || existingForm1.asuransi_ya,
                tahu_status_hiv: request.tahu_status_hiv || existingForm1.tahu_status_hiv,
                tes_hasil_enam_bulan: request.tes_hasil_enam_bulan || existingForm1.tes_hasil_enam_bulan,
                tes_hasil_duabelas_bulan: request.tes_hasil_duabelas_bulan || existingForm1.tes_hasil_duabelas_bulan,
                terdaftar_perawatan: request.terdaftar_perawatan || existingForm1.terdaftar_perawatan,
                didampingi_cbs_plus: request.didampingi_cbs_plus || existingForm1.didampingi_cbs_plus,
                berbagi_jarum_suntik: request.berbagi_jarum_suntik || existingForm1.berbagi_jarum_suntik,
                seks_tanpa_kondom: request.seks_tanpa_kondom || existingForm1.seks_tanpa_kondom,
                eligible: request.eligible || existingForm1.eligible,
                mengalami_kekerasan: request.mengalami_kekerasan || existingForm1.mengalami_kekerasan,
                bersedia_dirujuk_aeo: request.bersedia_dirujuk_aeo || existingForm1.bersedia_dirujuk_aeo,
                mengalami_gejala_tb: request.mengalami_gejala_tb || existingForm1.mengalami_gejala_tb,
                jarum_suntik: request.jarum_suntik || existingForm1.jarum_suntik,
                kondom: request.kondom || existingForm1.kondom,
                pelicin: request.pelicin || existingForm1.pelicin,
                media_kie: request.media_kie || existingForm1.media_kie,
                prep: request.prep || existingForm1.prep,
                prep_link: request.prep_link || existingForm1.prep_link,
                klien_adalah: request.klien_adalah || existingForm1.klien_adalah,
                tes: request.tes || existingForm1.tes,
                tes_layanan: request.tes_layanan || existingForm1.tes_layanan,
                tb: request.tb || existingForm1.tb,
                ims: request.ims || existingForm1.ims,
                gbv: request.gbv || existingForm1.gbv,
                tes_lainnya: request.tes_lainnya || existingForm1.tes_lainnya,
                menolak_dirujuk: request.menolak_dirujuk || existingForm1.menolak_dirujuk,
                rencana_bertemu_lagi: request.rencana_bertemu_lagi || existingForm1.rencana_bertemu_lagi,
                klien_form2: request.klien_form2 || existingForm1.klien_form2,
                merujuk_cbs_plus: request.merujuk_cbs_plus || existingForm1.merujuk_cbs_plus,
                form_entri: request.form_entri || existingForm1.form_entri,
                nama_cbs_plus: request.nama_cbs_plus || existingForm1.nama_cbs_plus,
                kode_nama_cbs: request.kode_nama_cbs || existingForm1.kode_nama_cbs,
                kode_parent_cbs: request.kode_parent_cbs || existingForm1.kode_parent_cbs,
                tipe_cbs: request.tipe_cbs || existingForm1.tipe_cbs,
                cso: request.cso || existingForm1.cso,
                kode_cso: request.kode_cso || existingForm1.kode_cso,
                tgl_review: request.tgl_review || existingForm1.tgl_review,
                validated: request.validated || existingForm1.validated,
                reported: request.reported || existingForm1.reported,
                modify_date: new Date(),
                modify_by: request.modify_by || existingForm1.modify_by,
                trash: request.trash || existingForm1.trash,

            }
        })

        return tbForm1
    }
    
    
    
    

}