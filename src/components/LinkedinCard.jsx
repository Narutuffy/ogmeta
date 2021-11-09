import React from 'react';

export default function TwitterCard({ result }) {
  const defaultTitle = result?.ogTitle || result?.title;
  // const defaultDescription = result?.ogDescription || result?.description;
  const domain = result?.tabURL.hostname.replace('www.', '');

  return (
    <>
      <h4 className="my-3 social-title relative">
        <span className="text-[#A3B3CA] pr-4 bg-white relative">Linkedin</span>
      </h4>
      <div className="mt-5">
        <div
          className="h-[252px] bg-cover bg-center overflow-hidden border"
          style={{ backgroundImage: `url(${result['og:image']})` }}
        />
        <div className="cursor-pointer border-[#dadde1] border border-t-0 py-[10px] px-[12px] text-card-dark-gray bg-[#f2f3f5]">
          <span
            style={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              display: '-webkit-box',
            }}
            className="overflow-hidden text-black font-semibold text-[14px] inline-block max-w-full"
          >
            {defaultTitle}
          </span>
          <span className="block text-card-gray overflow-hidden text-[12px]">
            {domain}
          </span>
        </div>
      </div>
    </>
  );
}
