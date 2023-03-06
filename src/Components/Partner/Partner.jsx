import React, { useEffect, useRef } from "react";
import { tns } from "tiny-slider/src/tiny-slider";
import affiliateAlcamy from "./LOGO/affiliate-image-alchemy.png";
import apexHeader from "./LOGO/apex-header-hm-footer-sm.png";
import apexIcon from "./LOGO/apex-icon-primary-lt-clr-purple.png";
import "./partner.css";

function Partner() {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = tns({
      container: sliderRef.current,
      rewind: false,
      autoplayButtonOutput: false,
      navPosition: "bottom",
      items: 1.5,
      slideBy: 5,
      gutter: 10,
      center: true,
      autoplay: true,
      speed: 3000,
      autoplayTimeout: 2000,
      fixedWidth: 280,
      loop: true,
      mouseDrag: true,
      mode: "carousel",
      controls: false,
      nav: false,
    });

    function onTransitionEnd(e) {
      console.log(e);
    }

    // bind function to event
    slider.events.on("dragEnd", onTransitionEnd);

    return () => {
      // remove function binding
      slider.events.off("dragEnd", onTransitionEnd);
    };
  }, []);

  const sliderData1 = [
    affiliateAlcamy,
    apexHeader,
    apexIcon,
    affiliateAlcamy,
    apexHeader,
    apexIcon,
    affiliateAlcamy,
    apexHeader,
    apexIcon
  ];

  return (
    <div className="slider mt-5 p-5">
      <div ref={sliderRef} className="slider-wrapper">
        {sliderData1.map((imageUrl, index) => (
          <div key={index} className="slider-item">
            <div
              className="slider-card card bg-white nft-items nft-margin-minus nft-primary rounded-md shadow overflow-hidden mb-3"
              style={{
                background: `url(${imageUrl}) no-repeat center`,
                backgroundSize: "cover",
                textAlign: "center",
                height: 200,
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff"
              }}
            >
              <div className="nft-image p-3 partnar position-relative overflow-hidden">
                <img src={imageUrl} className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Partner;
