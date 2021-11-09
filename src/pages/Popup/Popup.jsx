import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import TwitterCard from '../../components/TwitterCard';
import GoogleCard from '../../components/GoogleCard';
import FacebookCard from '../../components/FacebookCard';
import LinkedinCard from '../../components/LinkedinCard';
import WhatsAppCard from '../../components/WhatsAppCard';
import '../../assets/styles/tailwind.css';

const OG_PROP = 'property';
const TWITTER_PROP = 'property';
const NAME = 'name';
const CONTENT = 'content';

const Popup = () => {
  const [result, setResult] = useState(null);

  const findFavicon = (links) => {
    let favicon = '';

    // Prioritise links with rel of 'icon'
    for (let link of links) {
      if (link.rel === 'icon' && link.href) {
        favicon = link.href;
      }
    }

    // Check links with rel including 'icon'
    if (!favicon) {
      for (let link of links) {
        if (link.rel.includes('icon') && link.href) {
          favicon = link.href;
        }
      }
    }

    // Check links with href containing 'favicon'
    if (!favicon) {
      for (let link of links) {
        if (link.href.includes('favicon')) {
          favicon = link.href;
        }
      }
    }

    return favicon;
  };

  chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action === 'getSource') {
      const pageSource = request.source;
      const doc = window.document.createElement('html');
      doc.innerHTML = pageSource;
      const res = {};

      const metaEls = doc.getElementsByTagName('meta');
      let linkEls = doc.getElementsByTagName('link');
      let titleTag = doc.getElementsByTagName('title');
      let metaDescTag = doc.querySelector("meta[name='description']");

      if (titleTag.length) {
        res.title = titleTag[0].textContent;
      }

      if (metaDescTag) {
        res.description = metaDescTag.content;
      }

      for (let meta of metaEls) {
        filterAll(meta, 'og:', res);
        filterAll(meta, 'twitter:', res);
      }

      res.favicon = findFavicon(linkEls);
      const tabURL = new URL(res['og:url'] || request.tabURL);
      res.tabURL = tabURL;
      setResult(res);
    }
  });

  const filterAll = (meta, prefix, resObj) => {
    let prop = prefix === 'og:' ? OG_PROP : TWITTER_PROP;

    if (meta.hasAttribute(prop) || meta.hasAttribute(NAME)) {
      let tag = meta.getAttribute(prop) || meta.getAttribute(NAME);

      if (tag.startsWith(prefix)) {
        resObj[tag] = meta.getAttribute(CONTENT) || meta.getAttribute('value');
      }
    }
  };

  const getHTML = (tabURL) => {
    const source = document.documentElement.outerHTML;
    chrome.runtime.sendMessage({ action: 'getSource', source: source, tabURL });
  };

  const initializeReading = () => {
    // const reading = document.getElementById('reading');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: getHTML,
        args: [tabs[0].url],
      });
    });
    // setIsLoading(false);
  };

  useEffect(() => {
    initializeReading();
  }, []);

  if (!result)
    return (
      <>
        <Header />
        <div className="w-[510px] h-[600px] px-[5px] flex justify-center items-center flex-col">
          <img src="/search.gif" className="w-3/5" alt="search gif" />
          <span className="text-gray-500 text-lg">Loading</span>
        </div>
      </>
    );

  return (
    <>
      <Header />
      <div className="w-[510px] h-[600px] max-h-[600px] px-[5px] mt-16 overflow-scroll overflow-y-scroll text-[14px] pb-[100px]">
        <GoogleCard result={result} />
        <WhatsAppCard result={result} />
        <TwitterCard result={result} />
        <LinkedinCard result={result} />
        <FacebookCard result={result} />
        <div className="text-center text-gray-700 font-medium text-xs my-5">
          <a
            href="https://github.com/narutuffy/ogmeta"
            target="_blank"
            rel="noreferrer"
            class="text-sm sm:text-base mt-6 -mb-20 box-pink-sm  font-bold inline-flex items-center px-2 py-1 my-2 border-2 border-transparent shadow-sm leading-4 rounded-md text-white focus:outline-none bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="-ml-0.5 mr-1.5 h-4 w-4 sm:h-5 sm:w-5"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </>
  );
};

export default Popup;
