export default function VersionFootnote({ light = false }: { light?: boolean }) {
  return <div className={`text-center text-xs ${light ? 'text-white/90' : 'text-gray-500'} mt-4`}>pacitan.go v0.0.1</div>;
}
