'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import AuthInput from '@/components/AuthInput';
import VersionFootnote from '@/components/VersionFootnote';
import { User, Mail, Lock } from 'lucide-react';

export default function RegisterPage() {
  const r = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setErr('Konfirmasi password tidak sama');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);
    if (error) setErr(error.message);
    else r.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative max-w-sm w-full mx-auto bg-white h-[844px] rounded-3xl overflow-hidden shadow-2xl">
        <main className="relative h-full">
          {/* Background Image */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/bg-login.png')" }} />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Wrapper for Title and Form Container */}
          <div className="absolute bottom-0 w-full">
            {/* Title (positioned above the white card) */}
            <div className="max-w-[380px] mx-auto px-5 pb-4">
              <h1
                className="text-left text-white text-3xl font-bold leading-tight"
                style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)' }}
              >
                Siapkan Akunmu Dan <br /> Mulai Sekarang!
              </h1>
            </div>

            {/* Kontainer form putih */}
            <div className="w-full bg-white rounded-t-3xl shadow-lg">
              <div className="max-w-[380px] mx-auto px-5 pt-10 pb-6">
                <form onSubmit={onSubmit} className="space-y-4">
                  <AuthInput label="Nama lengkap" name="fullname" placeholder="Masukan Nama lengkap" icon={<User size={18} />} value={fullName} onChange={setFullName} />
                  <AuthInput label="Email" name="email" placeholder="Masukan Email" type="email" icon={<Mail size={18} />} value={email} onChange={setEmail} />
                  <AuthInput label="Password" name="password" placeholder="Masukan Password" type="password" icon={<Lock size={18} />} value={password} onChange={setPassword} withTogglePassword />
                  <AuthInput label="Konfirmasi password" name="confirm" placeholder="Konfirmasi password" type="password" icon={<Lock size={18} />} value={confirm} onChange={setConfirm} withTogglePassword />
                  {err && <p className="text-sm text-red-600">{err}</p>}
                  <button type="submit" disabled={loading} className="h-12 w-full rounded-xl bg-[#5B8CFF] text-white font-semibold hover:opacity-95 disabled:opacity-60">
                    {loading ? 'Memproses...' : 'Daftar'}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <a href="/login" className="text-sm text-gray-600 hover:underline">Sudah punya akun? Login</a>
                </div>

                <VersionFootnote />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}