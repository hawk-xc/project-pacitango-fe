
import React from 'react';
import { ImageIcon } from 'lucide-react';

type PhotoGalleryProps = {
  photos?: string[];
};

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  // If no photos, render two gray placeholders with centered image icon and 'Foto' label.
  if (!photos || photos.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="aspect-[4/3] bg-gray-100 rounded-xl flex flex-col items-center justify-center border-2 border-dashed"
            aria-label="Placeholder untuk foto bukti"
          >
            <ImageIcon className="w-8 h-8 text-gray-400 mb-1" />
            <span className="text-xs text-gray-500">Foto</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    // Grid 2 cols on mobile, 3 on >=sm; images rounded-xl, object-cover, fixed aspect ratio (e.g., aspect-[4/3]).
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {photos.map((photo, index) => (
        <div key={index} className="aspect-[4/3]">
          <img
            src={photo}
            alt={`Bukti foto ${index + 1}`}
            className="w-full h-full object-cover rounded-xl border"
          />
        </div>
      ))}
    </div>
  );
}
