'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Camera, Settings, Plus, AlertCircle, Info } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Modals state
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactModalMode, setContactModalMode] = useState<'add' | 'edit'>('add');
  const [editingContactId, setEditingContactId] = useState<number | null>(null);

  // Form states
  const [profileForm, setProfileForm] = useState({ name: '', email: '', phone: '' });
  const [contactForm, setContactForm] = useState({ name: '', phone: '' });

  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    // Load contacts from localStorage on mount
    const savedContacts = localStorage.getItem('emergency_contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    } else {
      // Default demo contacts
      const demoContacts = [
        { id: 1, name: 'Ayah', phone: '+62 8123 4567 89', isDemo: true },
        { id: 2, name: 'Bunda', phone: '+62 8123 4567 89', isDemo: true }
      ];
      setContacts(demoContacts);
      localStorage.setItem('emergency_contacts', JSON.stringify(demoContacts));
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.full_name || user.fullName || user.name || user.username || 'Gyshela Grimonia Gustiar',
        email: user.email || 'gyselagrimoniagustiar@gmail.com',
        phone: user.phone || '+62 8123 4567 89'
      });

      // AUTO-CHECK: Jika pengguna baru/belum punya kontak darurat sama sekali
      if (contacts.length === 0) {
        openAddContact();
      }
    }
  }, [user, contacts.length]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const handleSaveProfile = () => {
    setIsEditProfileOpen(false);
    alert('Profil berhasil diperbarui!');
  };

  const handleSaveContact = () => {
    if (!contactForm.name || !contactForm.phone) {
      alert('Mohon isi nama dan nomor telepon!');
      return;
    }

    if (contactModalMode === 'add') {
      const newContact = {
        id: Date.now(),
        name: contactForm.name,
        phone: contactForm.phone,
        isDemo: false
      };
      const newContacts = [...contacts, newContact];
      setContacts(newContacts);
      localStorage.setItem('emergency_contacts', JSON.stringify(newContacts));
    } else {
      const updatedContacts = contacts.map((c) =>
          c.id === editingContactId
            ? { ...c, name: contactForm.name, phone: contactForm.phone, isDemo: false }
            : c
        );
      setContacts(updatedContacts);
      localStorage.setItem('emergency_contacts', JSON.stringify(updatedContacts));
    }
    setIsContactModalOpen(false);
  };

  const handleDeleteContact = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus kontak ini?')) {
      const newContacts = contacts.filter((c) => c.id !== id);
      setContacts(newContacts);
      localStorage.setItem('emergency_contacts', JSON.stringify(newContacts));
    }
  };

  const openAddContact = () => {
    setContactForm({ name: '', phone: '' });
    setContactModalMode('add');
    setIsContactModalOpen(true);
  };

  const openEditContact = (contact: any) => {
    setContactForm({ name: contact.name, phone: contact.phone });
    setEditingContactId(contact.id);
    setContactModalMode('edit');
    setIsContactModalOpen(true);
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF4297] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-white min-h-[calc(100vh-100px)] p-4 md:p-6 pb-32 font-sans">
      {/* Profile Card Header */}
      <div className="mb-8 mt-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 transition-all hover:shadow-md">
        <div className="flex items-center gap-6">
          <div className="w-[88px] h-[88px] bg-[#FF4297] rounded-full flex items-center justify-center text-white text-[32px] font-bold shrink-0 shadow-md">
            {getInitials(profileForm.name)}
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-xl font-bold text-neutral-900 leading-snug">
              {profileForm.name}
            </h1>
            <p className="text-xs text-neutral-600 font-medium my-0.5">
              {profileForm.email}
            </p>
            <p className="text-xs text-neutral-400">{profileForm.phone}</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="bg-[#FF4297] hover:bg-pink-600 text-white text-xs font-semibold py-2 px-4 rounded-xl flex items-center shadow-sm transition-all cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 mr-1.5" /> Edit Profil
          </button>
        </div>
      </div>

      {/* Emergency Contacts Section */}
      <div className="bg-white rounded-2xl p-5 md:p-6 mb-6 shadow-sm border border-pink-100/60 hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold tracking-wide text-neutral-900 uppercase">
            KONTAK DARURAT
          </h2>
          <button
            onClick={openAddContact}
            className="bg-[#FF4297] hover:bg-pink-600 text-white text-xs font-semibold py-2 px-3.5 rounded-xl flex items-center shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1 stroke-[2.5]" /> Tambah Kontak
          </button>
        </div>

        <p className="text-xs text-neutral-500 leading-relaxed mb-4">
          Kontak di bawah ini akan secara otomatis menerima notifikasi darurat dan koordinat lokasi terkini saat kamu memicu fitur SOS.
        </p>

        {/* Banner Info Data Contoh */}
        {contacts.some((c) => c.isDemo) && (
          <div className="bg-amber-50 border border-amber-200/80 text-amber-800 text-xs p-3 rounded-xl mb-4 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Catatan:</strong> Kontak bertanda <span className="bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded text-[10px] font-semibold">Data Contoh</span> di bawah adalah contoh bawaan sistem. Silakan perbarui atau ganti dengan kontak kerabat asli kamu.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-[#FFE5F0]/60 rounded-xl p-3.5 px-4 flex items-center justify-between border border-pink-100 shadow-sm hover:shadow transition-all"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-neutral-900">{contact.name}</h3>
                  {contact.isDemo && (
                    <span className="bg-pink-200/80 text-[#FF4297] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Data Contoh
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-600 mt-0.5">{contact.phone}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditContact(contact)}
                  className="bg-[#FF4297] text-white text-xs font-medium py-1 px-3 rounded-lg hover:bg-pink-600 transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="bg-neutral-400 text-white text-xs font-medium py-1 px-3 rounded-lg hover:bg-neutral-500 transition-colors cursor-pointer"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}

          {contacts.length === 0 && (
            <div className="text-center py-6 px-4 border border-dashed border-pink-200 rounded-xl bg-pink-50/30">
              <AlertCircle className="w-6 h-6 text-pink-400 mx-auto mb-2" />
              <p className="text-xs text-neutral-500 font-medium">
                Belum ada kontak darurat. Mohon tambahkan setidaknya 1 kontak untuk keamanan kamu.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Settings & Security Section */}
      <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
        <h2 className="text-sm font-bold tracking-wide text-neutral-900 mb-1 uppercase">
          PENGATURAN & KEAMANAN
        </h2>
        <p className="text-xs text-neutral-500 mb-6">
          Pengaturan akun, preferensi, dan keamanan
        </p>

        <div className="mb-6">
          <h3 className="text-xs font-bold text-neutral-800 mb-2.5">PENGATURAN</h3>
          <div className="flex flex-col gap-2">
            <a href="#" className="text-xs font-semibold text-blue-900 hover:underline">
              Preferensi Navigasi
            </a>
            <a href="#" className="text-xs font-semibold text-blue-900 hover:underline">
              Tema Tampilan
            </a>
            <a href="#" className="text-xs font-semibold text-blue-900 hover:underline">
              Pengaturan Suara Alarm SOS
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-neutral-800 mb-2.5">KEAMANAN</h3>
          <div className="flex flex-col gap-2">
            <a href="#" className="text-xs font-semibold text-blue-900 hover:underline">
              Ubah Kata Sandi
            </a>
            <a href="#" className="text-xs font-semibold text-blue-900 hover:underline">
              Autentikasi Dua Faktor
            </a>
            <a href="#" className="text-xs font-semibold text-blue-900 hover:underline">
              Akses Lokasi & Izin Browser
            </a>
          </div>
        </div>
      </div>

      {/* MODALS OVERLAY */}
      {(isEditProfileOpen || isContactModalOpen) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          {/* Edit Profile Modal */}
          {isEditProfileOpen && (
            <div className="bg-white rounded-3xl w-full max-w-xs p-6 shadow-2xl border border-pink-100 relative animate-in zoom-in-95 duration-200">
              <h3 className="text-xs font-extrabold text-[#7A0000] uppercase tracking-wide text-center mb-5">
                EDIT PROFIL
              </h3>

              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-18 h-18 bg-[#FF4297] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    {getInitials(profileForm.name)}
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#6A5AE0] rounded-full flex items-center justify-center border-2 border-white cursor-pointer shadow">
                    <Camera className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1 ml-1">
                    Nama
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, name: e.target.value })
                    }
                    className="w-full border border-neutral-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF4297]/50 text-neutral-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1 ml-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, email: e.target.value })
                    }
                    className="w-full border border-neutral-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF4297]/50 text-neutral-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1 ml-1">
                    Nomor Kontak
                  </label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, phone: e.target.value })
                    }
                    className="w-full border border-neutral-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF4297]/50 text-neutral-800"
                  />
                </div>
              </div>

              <div className="flex gap-2.5">
                <button
                  onClick={() => setIsEditProfileOpen(false)}
                  className="flex-1 bg-neutral-300 text-neutral-700 font-bold py-2.5 rounded-xl hover:bg-neutral-400 transition-colors text-xs cursor-pointer"
                >
                  BATAL
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-[#FF4297] text-white font-bold py-2.5 rounded-xl hover:bg-pink-600 transition-colors shadow-sm text-xs cursor-pointer"
                >
                  SIMPAN
                </button>
              </div>
            </div>
          )}

          {/* Contact Form Modal */}
          {isContactModalOpen && (
            <div className="bg-white rounded-3xl w-full max-w-xs p-6 shadow-2xl border border-pink-100 relative animate-in zoom-in-95 duration-200">
              <h3 className="text-xs font-extrabold text-[#7A0000] uppercase tracking-wide text-center mb-2">
                INFORMASI KONTAK
              </h3>
              
              {contacts.length === 0 && (
                <p className="text-[11px] text-pink-600 bg-pink-50 p-2 rounded-lg text-center mb-4">
                  ⚠️ Silakan isi kontak darurat terlebih dahulu untuk keamanan akun Anda.
                </p>
              )}

              <div className="space-y-3.5 mb-6 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1 ml-1">
                    Nama Kontak
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Ayah / Ibu"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF4297]/50 text-neutral-800 placeholder-neutral-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1 ml-1">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: +62 8123 4567 89"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, phone: e.target.value })
                    }
                    className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF4297]/50 text-neutral-800 placeholder-neutral-300"
                  />
                </div>
              </div>

              <div className="flex gap-2.5">
                {contacts.length > 0 && (
                  <button
                    onClick={() => setIsContactModalOpen(false)}
                    className="flex-1 bg-neutral-300 text-neutral-700 font-bold py-2.5 rounded-xl hover:bg-neutral-400 transition-colors text-xs cursor-pointer"
                  >
                    BATAL
                  </button>
                )}
                <button
                  onClick={handleSaveContact}
                  className="flex-1 bg-[#FF4297] text-white font-bold py-2.5 rounded-xl hover:bg-pink-600 transition-colors shadow-sm text-xs cursor-pointer"
                >
                  SIMPAN
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}