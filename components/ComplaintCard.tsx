import { Complaint } from '@/lib/types';
import { MapPin, Tag } from 'lucide-react';

const statusStyles: { [key: string]: string } = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Diproses: 'bg-blue-100 text-blue-800',
  Diselesaikan: 'bg-green-100 text-green-800',
};

export function ComplaintCard({ complaint }: { complaint: Complaint }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex">
        {complaint.imageUrl && (
          <div className="w-1/3">
            <img className="h-full w-full object-cover" src={complaint.imageUrl} alt={complaint.title} />
          </div>
        )}
        <div className="p-4 flex-grow w-2/3">
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <p className="text-xs font-semibold text-cyan-600 uppercase tracking-wide flex items-center">
                <Tag className="w-3 h-3 mr-1.5" />
                {complaint.category}
              </p>
              <h3 className="text-md font-bold text-gray-900 mt-1">{complaint.title}</h3>
            </div>
            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${statusStyles[complaint.status]}`}>
              {complaint.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{complaint.description}</p>
          <div className="flex items-center text-gray-500 mt-3">
            <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
            <span className="text-xs truncate">{complaint.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
