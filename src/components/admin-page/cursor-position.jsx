import React, { useEffect }from 'react';
import styles from '../../styles/cursor-position.scss';

export default function CursorPosition({currentImageWidth, currentImageHeight, schemeSvgRef }) {

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!schemeSvgRef.current) return;

      const rect = schemeSvgRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(event.clientX - rect.left, currentImageWidth));
      const y = Math.max(0, Math.min(event.clientY - rect.top, currentImageHeight));

      //console.log(`X: ${x}, Y: ${y}`);
      document.querySelector('.cursorPosition').innerText = `X: ${Math.round(x)}, Y: ${Math.round(y)}`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [currentImageWidth, currentImageHeight]);

    return(
        <div></div>                
    );
}