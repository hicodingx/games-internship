import React from "react";
import "./cards.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Cards() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  return (
    <div className="cards">
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="card"
        autoPlay={true}
      >
        <div className="card one">
          <div className="card-content">
            <p className="tagline">For Everyone</p>
            <p className="title">Let your imagination run wild</p>
          </div>
        </div>
        <div className="card second">
          <div className="card-content">
            <p className="tagline">For Everyone</p>
            <p className="title">Let your imagination run wild</p>
          </div>
        </div>
        <div className="card third">
          <div className="card-content">
            <p className="tagline">For Everyone</p>
            <p className="title">Let your imagination run wild</p>
          </div>
        </div>
        <div className="card second">
          <div className="card-content">
            <p className="tagline">For Everyone</p>
            <p className="title">Let your imagination run wild</p>
          </div>
        </div>
      </Carousel>

      {/* <div className="card">
        <div className="card-content">
          <p className="tagline">For Everyone</p>
          <p className="title">Let your imagination run wild</p>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <p className="tagline">For Everyone</p>
          <p className="title">Let your imagination run wild</p>
        </div>
      </div> */}
    </div>
  );
}

export default Cards;
