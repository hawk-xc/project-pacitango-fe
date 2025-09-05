
import React from 'react';

// Type for a single timeline item's data
type TimelineItemData = {
  label: string;
  date: string;
  note?: string;
  status: 'Pending' | 'Proses' | 'Selesai';
};

// Props for the internal TimelineItem component
type TimelineItemProps = TimelineItemData & {
  isLast?: boolean;
};

// Color configuration for different statuses
const statusConfig = {
  Selesai: { dot: 'bg-green-500' },
  Proses: { dot: 'bg-blue-500' },
  Pending: { dot: 'bg-yellow-500' },
};

/**
 * Renders a single item in the timeline, including the dot, line, and content.
 */
function TimelineItem({ label, date, note, status, isLast }: TimelineItemProps) {
    return (
        <div className="flex">
            {/* Left Rail: Dot and connecting line */}
            <div className="flex flex-col items-center mr-4">
                <div className={`w-3.5 h-3.5 rounded-full mt-1 ${statusConfig[status].dot} z-10 border-2 border-white`} />
                {!isLast && <div className="w-0.5 flex-grow bg-gray-200" />}
            </div>

            {/* Right Content */}
            <div className={`pb-8 ${isLast ? '' : 'flex-grow'}`}>
                <p className="font-semibold text-gray-900 text-sm">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{date}</p>
                {note && <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded-md">{note}</p>}
            </div>
        </div>
    );
}

// Props for the main Timeline component
type TimelineProps = {
  items: TimelineItemData[];
};

/**
 * Renders a vertical timeline UI from a list of items.
 */
export function Timeline({ items }: TimelineProps) {
  return (
    <div>
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          {...item}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}
