import React, { memo } from 'react';
import './DarkroomBioStatement.css';

export const DarkroomBioStatementComponent = () => {
  return (
    <section id="darkroom-bio" className="darkroom-bio-section">
      <div className="darkroom-bio-container">
        <h2 className="darkroom-bio-text">
          Hi, I'm <span className="darkroom-bio-highlight">SIMON</span>.{' '}
          <span className="darkroom-gif-capsule">
            <img
              src="/assets/page2/gifs/Camera Recording GIF by Amy Winehouse.gif"
              alt="Camera Recording"
            />
          </span>{' '}
          I believe that every great photograph is a blend of technical precision{' '}
          <span className="darkroom-gif-capsule">
            <img
              src="/assets/page2/gifs/Fun Photography GIF by 2TON Agency.gif"
              alt="Fun Photography"
            />
          </span>{' '}
          and raw emotion. Whether I'm chasing the perfect natural light{' '}
          <span className="darkroom-gif-capsule">
            <img
              src="/assets/page2/gifs/Photography Photo GIF by A$AP NAST.gif"
              alt="Photography Photo"
            />
          </span>{' '}
          or meticulously setting up a studio shoot, my goal is to capture the authentic essence of my subjects. When I don't have a camera in my hand,{' '}
          <span className="darkroom-gif-capsule">
            <img
              src="/assets/page2/gifs/Photography Photo GIF by Reconnecting Roots.gif"
              alt="Reconnecting Roots"
            />
          </span>{' '}
          I'm usually exploring new hiking trails or tweaking digital frontend experiences{' '}
          <span className="darkroom-gif-capsule">
            <img
              src="/assets/page2/gifs/Toronto International Film Festival Camera GIF by TIFF.gif"
              alt="TIFF Camera"
            />
          </span>
          . Take a look around, and let's create something beautiful together.
        </h2>
      </div>
    </section>
  );
};

export const DarkroomBioStatement = memo(DarkroomBioStatementComponent);
export default DarkroomBioStatement;
