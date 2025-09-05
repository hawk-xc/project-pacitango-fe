
import React from 'react';

type SectionCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function SectionCard({ title, children, className }: SectionCardProps) {
  return (
    // Based on prototype: rounded-2xl, shadow-card, padding 16 (p-4)
    <div className={`bg-white rounded-2xl shadow-md p-4 ${className}`}>
      <h3 className="text-base font-semibold text-gray-800 mb-3">{title}</h3>
      {children}
    </div>
  );
}
