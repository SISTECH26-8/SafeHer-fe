'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Camera, Settings, Plus } from 'lucide-react';

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

  // Dummy contacts for demo
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Ayah', phone: '+62 8123 4567 89' },
    { id: 2, name: 'Bunda', phone: '+62 8123 4567 89' }
  ]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.full_name || user.fullName || user.name || user.username || 'Amanda Safira',
        email: user.email || 'amandasafira@gmail.com',
        phone: user.phone || '+62 8123 4567 89'
      });
    }
  }, [user]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const handleSaveProfile = () => {
    // Ideally call API here
    setIsEditProfileOpen(false);
    alert('Profil berhasil diperbarui!');
  };

  const handleSaveContact = () => {
    if (!contactForm.name) return;
    
    if (contactModalMode === 'add') {
      const newContact = {
        id: Date.now(),
        name: contactForm.name,
        phone: contactForm.phone
      };
      setContacts([...contacts, newContact]);
    } else {
      setContacts(contacts.map(c => c.id === editingContactId ? { ...c, name: contactForm.name, phone: contactForm.phone } : c));
    }
    setIsContactModalOpen(false);
  };

  const handleDeleteContact = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus kontak ini?')) {
      setContacts(contacts.filter(c => c.id !== id));
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
        <div className="w-8 h-8 border-4 border-sistech-pink border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white min-h-[calc(100vh-100px)] p-4 md:p-6 pb-32 font-sans">
      
      {/* Profile Card */}
      <div className="mb-8 mt-6">
        <div className="flex items-center gap-6">
          <div className="w-[88px] h-[88px] bg-[#FF4297] rounded-full flex items-center justify-center text-white text-[32px] font-bold shrink-0 shadow-md">
            {getInitials(profileForm.name)}
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-[22px] font-bold text-neutral-900 mb-1 leading-normal pt-2">{profileForm.name}</h1>
            <p className="text-[13px] text-neutral-900 font-medium mb-0.5">{profileForm.email}</p>
            <p className="text-[11px] text-neutral-500">{profileForm.phone}</p>
          </div>
        </div>
        <div className="flex justify-end mt-3 pr-2">
           <button 
             onClick={() => setIsEditProfileOpen(true)}
             className="bg-[#FF4297] hover:bg-pink-600 text-white text-[10px] font-bold py-1.5 px-3 rounded-md flex items-center shadow-sm transition-colors"
           >
             <Settings className="w-3 h-3 mr-1.5" /> Edit Profil
           </button>
        </div>
      </div>

      {/* Emergency Contacts Section */}
      <div className="border border-[#7A0000]/30 rounded-[4px] p-4 md:p-5 mb-6 relative">
        <h2 className="text-[15px] font-bold text-neutral-900 mb-2">KONTAK DARURAT</h2>
        <p className="text-[10px] text-neutral-700 leading-[1.6] mb-5 pr-4 md:pr-16 font-medium">
          Kontak di bawah ini akan secara otomatis menerima notifikasi darurat dan koordinat lokasi terkini saat kamu memicu fitur SOS.
        </p>
        
        <div className="flex justify-end mb-4">
          <button 
            onClick={openAddContact}
            className="bg-[#FF4297] hover:bg-pink-600 text-white text-[11px] font-bold py-1.5 px-3 rounded-md flex items-center shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5 mr-1 stroke-[3]" /> Tambah Kontak
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-[#FFE5F0] rounded-xl p-3 px-4 flex items-center justify-between shadow-sm border border-pink-100">
              <div>
                <h3 className="text-sm font-bold text-neutral-900">{contact.name}</h3>
                <p className="text-[11px] text-neutral-600 mt-0.5">{contact.phone}</p>
              </div>
              <div className="flex gap-2 mr-1">
                <button 
                  onClick={() => openEditContact(contact)}
                  className="bg-[#FF4297] text-white text-[9px] font-bold py-1 px-3 rounded-[4px] hover:bg-pink-600 transition-colors"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteContact(contact.id)}
                  className="bg-[#A3A3A3] text-white text-[9px] font-bold py-1 px-3 rounded-[4px] hover:bg-neutral-500 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
          {contacts.length === 0 && (
             <p className="text-xs text-center text-neutral-400 py-4 italic">Belum ada kontak darurat.</p>
          )}
        </div>
      </div>

      {/* Settings & Security Section */}
      <div className="border border-[#7A0000]/30 rounded-[4px] p-4 md:p-5 mt-8">
        <h2 className="text-[15px] font-bold text-neutral-900 mb-1">PENGATURAN & KEAMANAN</h2>
        <p className="text-[10px] text-neutral-600 mb-6 font-medium">Pengaturan akun, preferensi, dan keamanan</p>
        
        <div className="mb-6">
          <h3 className="text-xs font-bold text-neutral-900 mb-2">PENGATURAN</h3>
          <div className="flex flex-col gap-1.5">
            <a href="#" className="text-[11px] font-bold text-[#1E3A8A] hover:underline underline-offset-2">Preferensi Navigasi</a>
            <a href="#" className="text-[11px] font-bold text-[#1E3A8A] hover:underline underline-offset-2">Tema Tampilan</a>
            <a href="#" className="text-[11px] font-bold text-[#1E3A8A] hover:underline underline-offset-2">Pengaturan Suara Alarm SOS</a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-neutral-900 mb-2">KEAMANAN</h3>
          <div className="flex flex-col gap-1.5">
            <a href="#" className="text-[11px] font-bold text-[#1E3A8A] hover:underline underline-offset-2">Ubah Kata Sandi</a>
            <a href="#" className="text-[11px] font-bold text-[#1E3A8A] hover:underline underline-offset-2">Autentikasi Dua Faktor</a>
            <a href="#" className="text-[11px] font-bold text-[#1E3A8A] hover:underline underline-offset-2">Akses Lokasi & Izin Browser</a>
          </div>
        </div>
      </div>

      {/* MODALS OVERLAY */}
      {(isEditProfileOpen || isContactModalOpen) && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          
          {/* Edit Profile Modal */}
          {isEditProfileOpen && (
            <div className="bg-white rounded-[1.5rem] w-full max-w-[20rem] p-6 shadow-2xl border border-sistech-pink relative animate-in zoom-in-95 duration-200">
              <h3 className="text-[13px] font-extrabold text-[#7A0000] uppercase tracking-wide text-center mb-6">EDIT PROFIL</h3>
              
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-[72px] h-[72px] bg-[#FF4297] rounded-full flex items-center justify-center text-white text-[28px] font-bold shadow-sm">
                    {getInitials(profileForm.name)}
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#6A5AE0] rounded-full flex items-center justify-center border-2 border-white cursor-pointer">
                    <Camera className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1 ml-1">Nama</label>
                  <input 
                    type="text" 
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                    className="w-full border border-neutral-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-sistech-pink focus:border-sistech-pink text-neutral-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1 ml-1">E-mail</label>
                  <input 
                    type="email" 
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                    className="w-full border border-neutral-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-sistech-pink focus:border-sistech-pink text-neutral-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1 ml-1">Nomor Kontak</label>
                  <input 
                    type="text" 
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                    className="w-full border border-neutral-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-sistech-pink focus:border-sistech-pink text-neutral-800 font-medium"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setIsEditProfileOpen(false)}
                  className="flex-1 bg-[#8F8F8F] text-white font-bold py-3 rounded-lg hover:bg-neutral-500 transition-colors shadow-sm text-xs"
                >
                  BATAL
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className="flex-1 bg-[#FF4297] text-white font-bold py-3 rounded-lg hover:bg-pink-600 transition-colors shadow-sm text-xs"
                >
                  SIMPAN
                </button>
              </div>
            </div>
          )}

          {/* Contact Form Modal */}
          {isContactModalOpen && (
            <div className="bg-white rounded-[1.5rem] w-full max-w-[20rem] p-6 shadow-2xl border border-sistech-pink relative animate-in zoom-in-95 duration-200">
              <h3 className="text-[13px] font-extrabold text-[#7A0000] uppercase tracking-wide text-center mb-6">INFORMASI KONTAK</h3>
              
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1 ml-1">Nama</label>
                  <input 
                    type="text" 
                    placeholder="eg : John Doe"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full border border-neutral-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-sistech-pink focus:border-sistech-pink text-neutral-800 placeholder-neutral-300 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1 ml-1">Nomor Kontak</label>
                  <input 
                    type="text" 
                    placeholder="eg : +62 8123 4567 89"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    className="w-full border border-neutral-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-sistech-pink focus:border-sistech-pink text-neutral-800 placeholder-neutral-300 font-medium"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setIsContactModalOpen(false)}
                  className="flex-1 bg-[#8F8F8F] text-white font-bold py-3 rounded-lg hover:bg-neutral-500 transition-colors shadow-sm text-xs"
                >
                  BATAL
                </button>
                <button 
                  onClick={handleSaveContact}
                  className="flex-1 bg-[#FF4297] text-white font-bold py-3 rounded-lg hover:bg-pink-600 transition-colors shadow-sm text-xs"
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
