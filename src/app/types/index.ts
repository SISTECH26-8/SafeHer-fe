export type Language = 'id' | 'en';

export interface Translations {
  lapor: string;
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
  login: string;
  register: string;
  emailLabel: string;
  passwordLabel: string;
  nameLabel: string;
  confirmPasswordLabel: string;
  loginSuccess: string;
  registerSuccess: string;
  noAccount: string;
  hasAccount: string;
}

export const content: Record<Language, Translations> = {
  id: {
    lapor: 'Laporan Anonim',
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
    login: 'Masuk',
    register: 'Daftar',
    emailLabel: 'Alamat Email',
    passwordLabel: 'Kata Sandi',
    nameLabel: 'Nama Lengkap',
    confirmPasswordLabel: 'Konfirmasi Kata Sandi',
    loginSuccess: 'Berhasil Masuk!',
    registerSuccess: 'Akun Berhasil Dibuat!',
    noAccount: 'Belum punya akun?',
    hasAccount: 'Sudah punya akun?',
  },
  en: {
    lapor: 'Anonymous Report',
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
    login: 'Login',
    register: 'Register',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    nameLabel: 'Full Name',
    confirmPasswordLabel: 'Confirm Password',
    loginSuccess: 'Login Successful!',
    registerSuccess: 'Account Created Successfully!',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
  },
};