import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

import marmita1 from "../img/marmita1.jpg";
import marmita2 from "../img/marmita2.jpg";
import marmita3 from "../img/marmita3.jpg";
import marmita4 from "../img/marmita4.jpg";

const imagens = [marmita1, marmita2, marmita3, marmita4];

function Carousel() {
  return (
    <div className="w-full h-full">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop={true}
        slidesPerView={1}
        className="w-full h-full"
      >
        {imagens.map((img, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <img
              src={img}
              alt={`Marmita ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
