import React from 'react';

export default function TwitterCard({ result }) {
  const defaultTitle = result?.['og:title'] || result?.title;
  const defaultDescription = result?.['og:description'] || result?.description;
  const domain = result?.tabURL.hostname.replace('www.', '');

  return (
    <>
      <h4 className="my-3 social-title relative">
        <span className="text-[#A3B3CA] pr-4 bg-white relative">Facebook</span>
      </h4>
      <div className="mt-5">
        <div
          className="h-[252px] bg-cover bg-center overflow-hidden border"
          style={{ backgroundImage: `url(${result['og:image']})` }}
        />
        <div className="cursor-pointer border-[#dadde1] border border-t-0 py-[10px] px-[12px] text-card-dark-gray bg-[#f2f3f5]">
          <span className="block text-card-gray overflow-hidden overflow-ellipsis uppercase text-[12px]">
            {domain}
          </span>
          <span className="overflow-hidden text-card-dark-gray font-semibold text-[16px] block overflow-ellipsis whitespace-nowrap max-w-full">
            {defaultTitle}
          </span>
          {defaultDescription && (
            <span className="text-card-gray font-light block overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">
              {defaultDescription}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
