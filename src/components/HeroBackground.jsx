import React from 'react';
import desktopHero from '../../Dekstop Version.jpg';
import mobileHero from '../../Mobile Version.jpg';

export default function HeroBackground() {
  return (
    <div className="hero-photo" aria-hidden="true">
      <picture className="hero-picture">
        <source media="(max-width: 900px)" srcSet={mobileHero} />
        <img
          src={desktopHero}
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
    </div>
  );
}
