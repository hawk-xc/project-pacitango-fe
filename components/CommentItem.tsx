
import React from 'react';

type CommentItemProps = {
  avatarUrl: string;
  author: string;
  timestamp: string;
  comment: string;
};

/**
 * Renders a single comment item with avatar, author, timestamp, and text.
 */
export function CommentItem({ avatarUrl, author, timestamp, comment }: CommentItemProps) {
  return (
    <div className="flex items-start space-x-3 py-2">
      <img
        src={avatarUrl}
        alt={`Avatar of ${author}`}
        className="w-9 h-9 rounded-full object-cover" // 36px
        aria-hidden="true"
      />
      <div className="flex-1">
        <div className="flex items-baseline space-x-2">
          <p className="font-bold text-sm text-gray-800">{author}</p>
          <p className="text-xs text-gray-500 font-light">{timestamp}</p>
        </div>
        <p className="text-sm text-gray-700 mt-1">{comment}</p>
      </div>
    </div>
  );
}
