import React from 'react';

export default function TwitterCard({ result }) {
  const defaultTitle = result?.['og:title'] || result?.title;
  const defaultDescription = result?.['og:description'] || result?.description;
  const defaultImage = result?.['og:image'];
  const domain = result?.tabURL.hostname.replace('www.', '');

  const twitterDescription =
    result?.['twitter:description'] || defaultDescription;

  const twitterImage = result?.['twitter:image'] || defaultImage;

  const isCardLarge =
    result['twitter:card'] && result['twitter:card'] === 'summary_large_image';

  return (
    <>
      <h4 className="my-3 social-title relative">
        <span className="text-[#A3B3CA] pr-4 bg-white relative">Twitter</span>
      </h4>
      {isCardLarge ? (
        <div className="rounded-lg border mt-5">
          <div
            className="h-[252px] rounded-t-lg bg-cover bg-center overflow-hidden bg-[#e1e8ed] border-b-[1px]"
            style={{ backgroundImage: `url(${twitterImage})` }}
          />
          {/* <img src={result['og:image']} className="w-full" alt="open graph" /> */}
          <div className="py-3 px-3 cursor-pointer">
            <span className="block text-twitter-gray">{domain}</span>
            <span className="overflow-hidden inline-block overflow-ellipsis whitespace-nowrap max-w-full">
              {result['twitter:title'] || defaultTitle}
            </span>
            {twitterDescription && (
              <span
                className="text-twitter-gray leading-[1.3em] font-light inline-block max-h-[2.6em] overflow-hidden overflow-ellipsis"
                style={{
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  display: '-webkit-box',
                }}
              >
                {twitterDescription}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="max-h-[129px] h-[129px] max-w-full w-full rounded-lg border flex">
          <div
            className="w-[129px] flex-none h-full rounded-l-lg bg-cover bg-center overflow-hidden bg-[#e1e8ed] border-r"
            style={{ backgroundImage: `url(${twitterImage})` }}
          />
          <div className="cursor-pointer w-3/4 flex-1 p-3 flex flex-col justify-center">
            <span className="block text-twitter-gray">{domain}</span>
            <span className="overflow-hidden inline-block overflow-ellipsis whitespace-nowrap max-w-full">
              {result['twitter:title'] || defaultTitle}
            </span>
            {twitterDescription && (
              <span
                className="leading-[1.3em] font-light overflow-hidden text-twitter-gray"
                style={{
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  display: '-webkit-box',
                }}
              >
                {twitterDescription}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
