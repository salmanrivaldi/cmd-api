import { z, ZodType } from "zod";


export class Form1Validation {
    static readonly CREATEFORM1: ZodType = z.object({
        metode_kontak: z.string().max(50),
        jumlah_kontak: z.number().int(),
        kategori_kontak: z.string().max(15),
        uic: z.string().max(10).optional(),
        nik: z.string().max(16).optional(),
        umur: z.number().int(),
        kps_sp: z.string().max(10),
        gender: z.string().max(12).optional(),
        category: z.string().max(50).optional(),
        category2: z.string().max(200),
        tipe_kd: z.string().max(15),
        district: z.string().max(10).optional(),
        kecamatan: z.string().max(12).optional(),
        kelurahan: z.string().max(15).optional(),
        kelurahan2: z.string().max(30),
        lokasi_kontak: z.string().max(100).optional(),
        phone: z.string().max(20),
        phone_number: z.string().max(15),
        ktp: z.string().max(3).optional(),
        ktp_ya: z.string().max(100).optional(),
        asuransi: z.string().max(3).optional(),
        asuransi_ya: z.string().max(100).optional(),
        tahu_status_hiv: z.string().max(15).optional(),
        tes_hasil_enam_bulan: z.string().max(3).optional(),
        tes_hasil_duabelas_bulan: z.string().max(5),
        terdaftar_perawatan: z.string().max(3),
        didampingi_cbs_plus: z.string().max(3),
        berbagi_jarum_suntik: z.string().max(3),
        seks_tanpa_kondom: z.string().max(3),
        eligible: z.string().max(3),
        mengalami_kekerasan: z.string().max(3),
        bersedia_dirujuk_aeo: z.string().max(15),
        mengalami_gejala_tb: z.string().max(200),
        jarum_suntik: z.number().int(),
        kondom: z.number().int(),
        pelicin: z.number().int(),
        media_kie: z.number().int(),
        prep: z.string().max(15),
        prep_link: z.string().max(15),
        klien_adalah: z.string().max(50),
        tes: z.string().max(3),
        tes_layanan: z.string().max(10),
        tb: z.string().max(3),
        ims: z.string().max(3),
        gbv: z.string().max(3),
        tes_lainnya: z.string().max(100),
        menolak_dirujuk: z.string().max(3),
        rencana_bertemu_lagi: z.string().max(15),
        klien_form2: z.string().max(3),
        merujuk_cbs_plus: z.string().max(5),
        form_entri: z.string().max(10),
        nama_cbs_plus: z.string().max(50),
        kode_nama_cbs: z.string().max(100).optional(),
        kode_parent_cbs: z.string().max(100),
        tipe_cbs: z.string().max(200),
        cso: z.string().max(200).optional(),
        kode_cso: z.string().max(10),
        tgl_review: z.preprocess((arg) => {
            if (typeof arg === "string" || arg instanceof Date) {
                const date = new Date(arg);
                if (!isNaN(date.getTime())) return date;
            }
            return undefined;
        }, z.date().optional()),
        validated: z.string().datetime().optional(),
        reported: z.string().datetime().optional(),
        create_by: z.string().max(50),
        modify_date: z.date().optional(),
        modify_by: z.string().max(50),
        trash: z.number().int(),
    });

    static readonly UPDATEFORM1: ZodType = z.object({
        
    });

    static readonly PAGINGFORM1: ZodType = z.object({
        page: z.number().min(1).positive(),
        size: z.number().min(1).positive(),
    });
}