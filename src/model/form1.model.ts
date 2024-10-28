export class RegisterForm1Request {
    no: bigint; // Change from number to bigint
    uuid: string; // Required field
    id: string; // Required field
    tgl_kontak?: Date; // Optional
    metode_kontak: string; // Required field
    jumlah_kontak: number; // Required field
    kategori_kontak: string; // Required field
    uic?: string; // Optional
    nik?: string; // Optional
    umur: number; // Required field
    kps_sp: string; // Required field
    gender?: string; // Optional
    category?: string; // Optional
    category2: string; // Required field
    tipe_kd: string; // Required field
    district?: string; // Optional
    kecamatan?: string; // Optional
    kelurahan?: string; // Optional
    kelurahan2: string; // Required field
    lokasi_kontak?: string; // Optional
    phone: string; // Required field
    phone_number: string; // Required field
    ktp?: string; // Optional
    ktp_ya?: string; // Optional
    asuransi?: string; // Optional
    asuransi_ya?: string; // Optional
    tahu_status_hiv?: string; // Optional
    tes_hasil_enam_bulan?: string; // Optional
    tes_hasil_duabelas_bulan: string; // Required field
    terdaftar_perawatan: string; // Required field
    didampingi_cbs_plus: string; // Required field
    berbagi_jarum_suntik: string; // Required field
    seks_tanpa_kondom: string; // Required field
    eligible: string; // Required field
    mengalami_kekerasan: string; // Required field
    bersedia_dirujuk_aeo: string; // Required field
    mengalami_gejala_tb: string; // Required field
    jarum_suntik: number; // Required field
    kondom: number; // Required field
    pelicin: number; // Required field
    media_kie: number; // Required field
    prep: string; // Required field
    prep_link: string; // Required field
    klien_adalah: string; // Required field
    tes: string; // Required field
    tes_layanan: string; // Required field
    tb: string; // Required field
    ims: string; // Required field
    gbv: string; // Required field
    tes_lainnya: string; // Required field
    menolak_dirujuk: string; // Required field
    rencana_bertemu_lagi: string; // Required field
    klien_form2: string; // Required field
    merujuk_cbs_plus: string; // Required field
    form_entri: string; // Required field
    nama_cbs_plus: string; // Required field
    kode_nama_cbs?: string; // Optional
    kode_parent_cbs: string; // Required field
    tipe_cbs: string; // Required field
    cso?: string; // Optional
    kode_cso: string; // Required field
    tgl_review: Date; // Required field
    validated?: Date; // Optional
    reported?: Date; // Optional
    create_date: Date; // Required field
    create_by: string; // Required field
    modify_date?: Date; // Optional
    modify_by: string; // Required field
    trash: number; // Required field
}

export class Form1Response {
    // no: bigint; // Change from number to bigint
    uuid: string; // Required field
    id: string; // Required field
    tgl_kontak?: Date; // Optional
    metode_kontak: string; // Required field
    jumlah_kontak: number; // Required field
    kategori_kontak: string; // Required field
    uic?: string; // Optional
    nik?: string; // Optional
    umur: number; // Required field
    kps_sp: string; // Required field
    gender?: string; // Optional
    category?: string; // Optional
    category2: string; // Required field
    tipe_kd: string; // Required field
    district?: string; // Optional
    kecamatan?: string; // Optional
    kelurahan?: string; // Optional
    kelurahan2: string; // Required field
    lokasi_kontak?: string; // Optional
    phone: string; // Required field
    phone_number: string; // Required field
    ktp?: string; // Optional
    ktp_ya?: string; // Optional
    asuransi?: string; // Optional
    asuransi_ya?: string; // Optional
    tahu_status_hiv?: string; // Optional
    tes_hasil_enam_bulan?: string; // Optional
    tes_hasil_duabelas_bulan: string; // Required field
    terdaftar_perawatan: string; // Required field
    didampingi_cbs_plus: string; // Required field
    berbagi_jarum_suntik: string; // Required field
    seks_tanpa_kondom: string; // Required field
    eligible: string; // Required field
    mengalami_kekerasan: string; // Required field
    bersedia_dirujuk_aeo: string; // Required field
    mengalami_gejala_tb: string; // Required field
    jarum_suntik: number; // Required field
    kondom: number; // Required field
    pelicin: number; // Required field
    media_kie: number; // Required field
    prep: string; // Required field
    prep_link: string; // Required field
    klien_adalah: string; // Required field
    tes: string; // Required field
    tes_layanan: string; // Required field
    tb: string; // Required field
    ims: string; // Required field
    gbv: string; // Required field
    tes_lainnya: string; // Required field
    menolak_dirujuk: string; // Required field
    rencana_bertemu_lagi: string; // Required field
    klien_form2: string; // Required field
    merujuk_cbs_plus: string; // Required field
    form_entri: string; // Required field
    nama_cbs_plus: string; // Required field
    kode_nama_cbs?: string; // Optional
    kode_parent_cbs: string; // Required field
    tipe_cbs: string; // Required field
    cso?: string; // Optional
    kode_cso: string; // Required field
    tgl_review: Date; // Required field
    validated?: Date; // Optional
    reported?: Date; // Optional
    create_date: Date; // Required field
    create_by: string; // Required field
    modify_date?: Date; // Optional
    modify_by: string; // Required field
    trash: number; // Required field
}