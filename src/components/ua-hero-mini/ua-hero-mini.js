
import React from 'react';
import PropTypes from 'prop-types';
import Image from '../image';
import { mapJsonRichText } from '../../utils/renderRichText';
import './ua-hero-mini.css';

const imageSizes = [
  {
    imageWidth: '660px',
    renditionName: 'web-optimized-large.webp',
    size: '(min-width: 1000px) 660px'
  },
  {
    imageWidth: '1000px',
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '800px',
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '600px',
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '412px',
    renditionName: 'web-optimized-medium.webp',
  },
  {
    size: '100vw',
  }
];


const imageSizesHero = [
  {
    imageWidth: '1600px',
    renditionName: 'web-optimized-xlarge.webp',
  },
  {
    imageWidth: '1200px',
    renditionName: 'web-optimized-xlarge.webp',
  },
  {
    imageWidth: '1000px',
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '800px',
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '600px',
    renditionName: 'web-optimized-medium.webp',
  },
  {
    imageWidth: '412px',
    renditionName: 'web-optimized-small.webp',
  },
  {
    size: '100vw',
  }
];

const UaHeroMini = ({ content }) => {


  const renderAsset = ({ asset }) => {
    if (asset && Object.prototype.hasOwnProperty.call(content.desktopMedia, 'mimeType'))
      return (<Image asset={content.desktopMedia} imageSizes={imageSizesHero} />);
    else
      return (<Image asset={content.desktopMedia} imageSizes={imageSizesHero} />);
  };

  return (
    <div className={'uaHeroMini'}>
      <section className={'uaHeroMini'}>
        <div className='container'>
          {renderAsset(content)}
          <div className='content-block'>
            <span className='teaserTitle'>{content.teaser.teaserTitle}</span>
            <span className='teaserText'>{mapJsonRichText(content.teaser.teaserText.json)}</span>
            <p className='description'>{content.teaser.snipeText}</p>
            <span className='subheadlineText'>{mapJsonRichText(content.teaser.subheadlineText.json)}</span>
          </div>
        </div>
      </section>
    </div>
  );
};


UaHeroMini.propTypes = {
  content: PropTypes.object,
};

export default UaHeroMini;

