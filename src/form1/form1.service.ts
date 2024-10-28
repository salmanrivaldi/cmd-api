import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/common/prisma.service";
import { ValidationService } from "src/common/validation.service";
import { Form1Response, RegisterForm1Request } from "src/model/form1.model";
import { Logger } from "winston";
import { Form1Validation } from "./form1.validation";
import { v4 as uuidv4 } from "uuid"

@Injectable()
export class Form1Service {

    constructor(
        private ValidationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private PrismaService: PrismaService,
    ) {}

    async register(request: RegisterForm1Request) : Promise<Form1Response> {

        this.logger.info(`Register new user ${JSON.stringify(request)}`);
         
        const registerRequest: RegisterForm1Request = this.ValidationService.validate(Form1Validation.REGISTER, request)

        //Generate ID's
        const uuid = uuidv4()
        
        const tb_form1 = await this.PrismaService.tb_form1.create({
            data: {
                no: BigInt(request.no),  // Extract the no field
                uuid: uuid,
                id: request.id,
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
            // no: tb_form1.no,
            uuid: tb_form1.uuid,
            id: tb_form1.id,
            tgl_kontak: tb_form1.tgl_kontak,
            metode_kontak: tb_form1.metode_kontak,
            jumlah_kontak: tb_form1.jumlah_kontak,
            kategori_kontak: tb_form1.kategori_kontak,
            uic: tb_form1.uic,
            nik: tb_form1.nik,
            umur: tb_form1.umur,
            kps_sp: tb_form1.kps_sp,
            gender: tb_form1.gender,
            category: tb_form1.category,
            category2: tb_form1.category2,
            tipe_kd: tb_form1.tipe_kd,
            district: tb_form1.district,
            kecamatan: tb_form1.kecamatan,
            kelurahan: tb_form1.kelurahan,
            kelurahan2: tb_form1.kelurahan2,
            lokasi_kontak: tb_form1.lokasi_kontak,
            phone: tb_form1.phone,
            phone_number: tb_form1.phone_number,
            ktp: tb_form1.ktp,
            ktp_ya: tb_form1.ktp_ya,
            asuransi: tb_form1.asuransi,
            asuransi_ya: tb_form1.asuransi_ya,
            tahu_status_hiv: tb_form1.tahu_status_hiv,
            tes_hasil_enam_bulan: tb_form1.tes_hasil_enam_bulan,
            tes_hasil_duabelas_bulan: tb_form1.tes_hasil_duabelas_bulan,
            terdaftar_perawatan: tb_form1.terdaftar_perawatan,
            didampingi_cbs_plus: tb_form1.didampingi_cbs_plus,
            berbagi_jarum_suntik: tb_form1.berbagi_jarum_suntik,
            seks_tanpa_kondom: tb_form1.seks_tanpa_kondom,
            eligible: tb_form1.eligible,
            mengalami_kekerasan: tb_form1.mengalami_kekerasan,
            bersedia_dirujuk_aeo: tb_form1.bersedia_dirujuk_aeo,
            mengalami_gejala_tb: tb_form1.mengalami_gejala_tb,
            jarum_suntik: tb_form1.jarum_suntik,
            kondom: tb_form1.kondom,
            pelicin: tb_form1.pelicin,
            media_kie: tb_form1.media_kie,
            prep: tb_form1.prep,
            prep_link: tb_form1.prep_link,
            klien_adalah: tb_form1.klien_adalah,
            tes: tb_form1.tes,
            tes_layanan: tb_form1.tes_layanan,
            tb: tb_form1.tb,
            ims: tb_form1.ims,
            gbv: tb_form1.gbv,
            tes_lainnya: tb_form1.tes_lainnya,
            menolak_dirujuk: tb_form1.menolak_dirujuk,
            rencana_bertemu_lagi: tb_form1.rencana_bertemu_lagi,
            klien_form2: tb_form1.klien_form2,
            merujuk_cbs_plus: tb_form1.merujuk_cbs_plus,
            form_entri: tb_form1.form_entri,
            nama_cbs_plus: tb_form1.nama_cbs_plus,
            kode_nama_cbs: tb_form1.kode_nama_cbs,
            kode_parent_cbs: tb_form1.kode_parent_cbs,
            tipe_cbs: tb_form1.tipe_cbs,
            cso: tb_form1.cso,
            kode_cso: tb_form1.kode_cso,
            tgl_review: tb_form1.tgl_review,
            validated: tb_form1.validated,
            reported: tb_form1.reported,
            create_date: tb_form1.create_date,
            create_by: tb_form1.create_by,
            modify_date: tb_form1.modify_date,
            modify_by: tb_form1.modify_by,
            trash: tb_form1.trash
        }
    }
}