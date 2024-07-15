import React, { useState, useEffect, useRef } from 'react';
import CursorPosition from './cursor-position.jsx';
import styles from '../../styles/find-coordinates.scss';

export default function FindCoordinates() {
    const [imageSrc, setImageSrc] = useState('');
    const [currentImageWidth, setCurrentImageWidth] = useState(0);
    const [currentImageHeight, setCurrentImageHeight] = useState(0);
    const imgRef = useRef(null); // Ref для доступа к изображению
    const cursPosRef = useRef(null);
    const imgAndSchemeRef = useRef(null);
    const schemeSvgRef = useRef(null); // Ref для доступа к SVG схеме

    useEffect(() => {
        if (imgRef.current && schemeSvgRef.current) {
            const cursPos = cursPosRef.current;
            const img = imgRef.current;
            const schemeSvg = schemeSvgRef.current;
            const imgAndScheme = imgAndSchemeRef.current;

            const innerWidth = img.clientWidth;
            const innerHeight = img.clientHeight;

            console.log('innerWidth=', innerWidth);
            console.log('innerHeight=', innerHeight);

            setCurrentImageWidth(innerWidth);
            setCurrentImageHeight(innerHeight);

            console.log('currentImageWidth=', currentImageWidth);
            console.log('currentImageHeight=', currentImageHeight);

            schemeSvg.style.width = `${innerWidth}px`;
            schemeSvg.style.height = `${innerHeight}px`;

            imgAndScheme.style.width = `${innerWidth}px`;
            cursPos.style.display = 'block';
        }
    }, [imageSrc]);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        const loadImage = new Promise((resolve) => {
            reader.onload = () => {
                setImageSrc(reader.result);
                console.log('Image loaded');
                resolve();
            };
            reader.readAsDataURL(file);
        });

        await loadImage;
    };

    return(
        <div id="pageContent">
            <div id="appCode">
                <form action="" className='imageInputForm' method="POST" enctype="multipart/form-data">
                    <input id="image" type="file" onChange={handleImageChange} />
                </form>

                <div className="img_and_scheme" ref={imgAndSchemeRef}>
                    <img id="show_image" src={imageSrc} ref={imgRef} />
        
                    <div className="markup-scheme" ref={schemeSvgRef}>
                        <svg id="svg">
                            <g id="floor">
                                <polygon points="442,217,528,217,528,259,442,259" className="isElevatorOrStairs" id="bp_id_3e5aa691-1970-4f8d-90ea-1df4232cb4e2"></polygon>
                            </g>
                        </svg>
                    </div>
                </div>

                <div className="cursorPosition" ref={cursPosRef}>
                    <CursorPosition currentImageWidth={currentImageWidth} currentImageHeight={currentImageHeight} schemeSvgRef={schemeSvgRef} />
                </div>
                
                <div id="pointFieldsContainer"></div>

            </div>
        </div>
    );
}