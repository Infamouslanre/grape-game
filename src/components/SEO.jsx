import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Grape Game - Test Your Luck and Strategy",
  description = "Play the exciting Grape Game where you test your luck and strategy! Eat grapes, avoid the poisoned one, and compete for high scores. A fun, addictive game for all ages.",
  keywords = "grape game, strategy game, luck game, browser game, online game, puzzle game, casual game",
  image = "/sprites/grape.png",
  url = "https://grape-game-9014f.web.app"
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#4CAF50" />
      <meta name="robots" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Additional Meta Tags for Game */}
      <meta name="game:type" content="browser" />
      <meta name="game:platform" content="web" />
      <meta name="game:genre" content="strategy, luck" />

      {/* Google AdSense */}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7131419666924013" crossorigin="anonymous"></script>
    </Helmet>
  );
};

export default SEO; 