export type Language = 'id' | 'en';

export interface Translations {
  beranda: string;
  peta: string;
  kontak: string;
  lapor: string;
  komunitas: string;
  heroTag: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDesc: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  emergencyBtn: string;
  modalTitle: string;
  modalSub: string;
  catLabel: string;
  cat1: string;
  cat2: string;
  cat3: string;
  cat4: string;
  locLabel: string;
  locPlaceholder: string;
  descLabel: string;
  descPlaceholder: string;
  submitBtn: string;
  successMsg: string;
  cancelBtn: string;
}

export const content: Record<Language, Translations> = {
  id: {
    beranda: 'Beranda',
    peta: 'Peta Aman',
    kontak: 'Kontak Darurat',
    lapor: 'Laporan Anonim',
    komunitas: 'Komunitas & Edukasi',
    heroTag: 'Perlindungan Perempuan Terpadu',
    heroTitleLine1: 'Ruang Aman untuk',
    heroTitleLine2: 'Setiap Langkahmu',
    heroDesc: 'SafeHer memberikan akses cepat ke bantuan darurat, pemantauan lokasi real-time, dan jaringan dukungan aman.',
    feature1Title: 'Peta Paling Aman',
    feature1Desc: 'Lacak rute aman dan terhindar dari area rawan.',
    feature2Title: 'Respon Cepat',
    feature2Desc: 'Terhubung langsung ke pihak berwenang & wali.',
    feature3Title: 'Laporan Anonim',
    feature3Desc: 'Laporkan insiden secara aman tanpa identitas.',
    emergencyBtn: 'TOMBOL EMERGENCY',
    modalTitle: 'Buat Laporan Anonim',
    modalSub: 'Identitas dan privasimu dijamin 100% aman dan tidak akan dilacak.',
    catLabel: 'Kategori Kejadian',
    cat1: 'Pelecehan Verbal / Catcalling',
    cat2: 'Pelecehan Fisik',
    cat3: 'Penguntitan (Stalking)',
    cat4: 'Area Rawan / Kurang Penerangan',
    locLabel: 'Lokasi Kejadian',
    locPlaceholder: 'Cth: Jl. Sudirman dekat Halte Bus',
    descLabel: 'Detail Laporan',
    descPlaceholder: 'Ceritakan kejadian selengkap mungkin (opsional)...',
    submitBtn: 'Kirim Laporan Rahasia',
    successMsg: 'Laporan Anonim Berhasil Terkirim!',
    cancelBtn: 'Batal',
  },
  en: {
    beranda: 'Home',
    peta: 'Safe Map',
    kontak: 'Emergency Contacts',
    lapor: 'Anonymous Report',
    komunitas: 'Community & Education',
    heroTag: 'Integrated Women Safety',
    heroTitleLine1: 'A Safe Space for',
    heroTitleLine2: 'Your Every Step',
    heroDesc: 'SafeHer provides rapid emergency access, real-time location monitoring, and a trusted support network.',
    feature1Title: 'Safe Map Routing',
    feature1Desc: 'Track safe routes and avoid high-risk areas.',
    feature2Title: 'Rapid Response',
    feature2Desc: 'Directly connect to authorities and trusted contacts.',
    feature3Title: 'Anonymous Report',
    feature3Desc: 'Report incidents safely without revealing identity.',
    emergencyBtn: 'EMERGENCY BUTTON',
    modalTitle: 'Submit Anonymous Report',
    modalSub: 'Your identity and privacy are 100% secured and untracked.',
    catLabel: 'Incident Category',
    cat1: 'Verbal Harassment / Catcalling',
    cat2: 'Physical Harassment',
    cat3: 'Stalking',
    cat4: 'Unsafe / Dimly Lit Area',
    locLabel: 'Incident Location',
    locPlaceholder: 'E.g., Main Street near Bus Station',
    descLabel: 'Report Details',
    descPlaceholder: 'Describe the situation in detail (optional)...',
    submitBtn: 'Submit Secret Report',
    successMsg: 'Anonymous Report Submitted Successfully!',
    cancelBtn: 'Cancel',
  },
};