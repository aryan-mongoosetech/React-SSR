// import './index.css';
import React from 'react';
import A from './a.js';
import parse from 'html-react-parser';
// import { Link } from 'react-router-dom';

function Blog({ data }) {
  // const navigate = useNavigate();
  return (
    <div className="bg-white max-w-[680px] mx-auto">
      <img
        src={`https://staging-cms.mstblockchain.com${data.cardImage.url}`}
        alt=""
      />
      <div>{extractDomElements(data.description)}</div>
    </div>
  );
}

export default Blog;

function extractDomElements(description) {
  const transform = (node) => {
    if (node.type === 'tag') {
      // if (node.attribs?.style) {
      //   delete node.attribs.style;
      // }

      const customClasses = {
        h1: '!inter-font !text-2xl wsm:!text-3xl !mt-16 !font-bold !text-gray-900 !leading-[28px]',
        h2: '!inter-font !text-2xl wsm:!text-3xl !mt-16 !font-bold !text-gray-900 !leading-[28px]',
        h3: '!inter-font !text-xl wsm:!text-2xl !mt-12 !font-semibold !text-gray-900 !leading-[28px]',
        p: '!tracking-wide !source-serif !text-18 wmd:!text-20 !text-gray-800 !leading-[32px] !mt-[18px]',
        span: '!source-serif !tracking-wide !text-18 wmd:!text-20 !text-gray-900 !leading-[28px]',
        ul: '!source-serif !list-disc !mt-6 !pl-5 !space-y-2',
        ol: '!source-serif !list-decimal !mt-6 !pl-5 !space-y-2',
        li: '!source-serif !text-18 wmd:!text-20 !text-gray-900 !leading-[32px] !mt-3',
        a: '!source-serif !text-gray-800 !underline hover:!text-gray-900',
        img: '!rounded-md !my-4',
        blockquote:
          '!border-l-4 !pl-4 wmd:!my-5 !my-3  !italic !text-gray-500 !border-gray-300',
      };

      const tag = node.name;
      const className = customClasses[tag] || '';

      if (className) {
        node.attribs.class = className;
      }
    }
  };

  return parse(description, { replace: transform });
}
