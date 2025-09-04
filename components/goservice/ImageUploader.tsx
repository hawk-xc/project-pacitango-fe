'use client';

import { useRef } from 'react';
import { ImagePlus, X } from 'lucide-react';

export default function ImageUploader({ value, onChange, max = 5 }: { value: string[]; onChange: (v: string[]) => void; max?: number }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pick = () => inputRef.current?.click();

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = reject;
      r.readAsDataURL(file);
    });

  const onFiles = async (files: FileList | null) => {
    if (!files) return;
    const imgs = await Promise.all(
      Array.from(files)
        .slice(0, max - value.length)
        .map(toBase64)
    );
    onChange([...value, ...imgs]);
  };

  const remove = (i: number) => {
    const cp = [...value];
    cp.splice(i, 1);
    onChange(cp);
  };

  return (
    <div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {value.map((src, i) => (
          <div key={i} className="relative min-w-[120px] h-24 rounded-xl border border-slate-200 shadow bg-white overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`foto-${i}`} className="w-full h-full object-cover" />
            <button type="button" onClick={() => remove(i)} className="absolute right-1 top-1 bg-white/95 border border-slate-200 rounded-md p-1 shadow">
              <X size={14} />
            </button>
          </div>
        ))}
        {value.length < max && (
          <button type="button" onClick={pick} className="min-w-[120px] h-24 rounded-xl border-2 border-dashed border-sky-200 bg-sky-50 text-sky-700 font-extrabold grid place-items-center">
            <ImagePlus size={20} /> Tambah Foto
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} />
      <p className="text-xs text-slate-500 mt-2">Format: JPG/PNG • Maks {max} foto</p>
    </div>
  );
}
