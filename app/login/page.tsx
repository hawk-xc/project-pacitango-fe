'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AuthInput from '@/components/AuthInput';
import VersionFootnote from '@/components/VersionFootnote';
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) setErr(error.message);
  };

  const loginGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
  };

  const loginFacebook = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: { redirectTo: window.location.origin },
    });
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
                Selamat datang di <br /> Aplikasi PacitanGo
              </h1>
            </div>

            {/* Kontainer form putih */}
            <div className="w-full bg-white rounded-t-3xl shadow-lg">
              <div className="max-w-[380px] mx-auto px-5 pt-10 pb-6">
                <form onSubmit={handleLogin} className="space-y-3">
                  <AuthInput label="Email" name="email" placeholder="Masukan Email" type="email" icon={<Mail size={18} />} value={email} onChange={setEmail} />
                  <AuthInput label="Password" name="password" placeholder="Masukan Password" type="password" icon={<Lock size={18} />} value={password} onChange={setPassword} withTogglePassword />
                  {err && <p className="text-sm text-red-600">{err}</p>}
                  <button type="submit" disabled={loading} className="h-12 w-full rounded-xl bg-[#5B8CFF] text-white font-semibold hover:opacity-95 disabled:opacity-60">
                    {loading ? 'Memproses...' : 'Login'}
                  </button>
                </form>

                <div className="flex items-center my-4">
                  <hr className="flex-grow border-gray-300" />
                  <span className="mx-2 text-gray-500 text-sm">atau</span>
                  <hr className="flex-grow border-gray-300" />
                </div>

                <div className="space-y-3">
                  <button onClick={loginGoogle} className="h-12 w-full rounded-xl bg-white border text-gray-800 text-sm font-medium flex items-center justify-center gap-2 shadow-sm">
                    <span className="w-5 h-5 flex items-center justify-center bg-white border rounded-full text-xs">G</span>
                    Sign In with Google
                  </button>

                  <button onClick={loginFacebook} className="h-12 w-full rounded-xl bg-[#1877F2] text-white text-sm font-medium flex items-center justify-center gap-2 shadow hover:brightness-95">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35C.597 0 0 .598 0 1.337v21.326C0 23.403.597 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.24h-1.918c-1.507 0-1.799.716-1.799 1.766v2.317h3.596l-.468 3.622h-3.128V24h6.128C23.403 24 24 23.403 24 22.663V1.337C24 .598 23.403 0 22.675 0z" />
                    </svg>
                    Sign In with Facebook
                  </button>
                </div>

                <div className="text-center mt-4">
                  <a href="/register" className="text-sm text-gray-600 hover:underline">Belum punya akun? Daftar sekarang</a>
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
