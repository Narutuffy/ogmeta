import React from 'react';

export default function TwitterCard({ result }) {
  const defaultTitle = result?.ogTitle || result?.title;
  const defaultDescription = result?.ogDescription || result?.description;
  const href = result?.tabURL.href;

  return (
    <>
      <h4 className="my-3 social-title relative">
        <span className="text-[#A3B3CA] pr-4 bg-white relative cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">
          Google
        </span>
      </h4>
      <div>
        <span className="block text-[18px] text-[#1a0dab] whitespace-nowrap overflow-ellipsis overflow-hidden max-w-full">
          {defaultTitle}
        </span>
        <span className="block text-[14px] text-[#006621] whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">
          {href}
        </span>
        <span
          style={{
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            display: '-webkit-box',
          }}
          className="text-[#545454] text-[13px] leading-[1.4] break-words overflow-hidden overflow-ellipsis"
        >
          {defaultDescription}
        </span>
      </div>
    </>
  );
}
