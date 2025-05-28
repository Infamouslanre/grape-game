import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Grape Game - Fun Grape Eating Challenge',
  description = 'Play the exciting Grape Game where you eat as many grapes as you can! Challenge your friends and compete for high scores.',
  keywords = 'grape game, eating challenge, fun game, high scores, multiplayer game',
  image = '/grape.png',
  url = 'https://grape-game.com'
}) => {
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#6b21a8" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO; 