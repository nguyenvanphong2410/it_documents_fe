import "./mainHeading.scss";
import bgImg1 from "../../assets/images/slide-1.jpg";
import bgImg2 from "../../assets/images/slide-2.jpg";
import bgImg3 from "../../assets/images/slide-3.jpg";
import bgImg4 from "../../assets/images/slide-4.jpg";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useContext } from "react";
import { Context } from "../../context/Context";

const MainHeading = () => {
  const { user } = useContext(Context);
  return (
    <header className="sliderHeading">
      {
        user?.isAdmin ?
          <></>
          :
          <div className="sliderHeading__slider">
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
            >
              <SwiperSlide style={{ backgroundImage: `url(${bgImg1})` }}>
                <div className="slide-text">
                  {/* <h1>Tài Liệu Công Nghệ Thông Tin</h1>
              <p>
                Cùng khám phá những tài liệu công nghệ chất lượng và hiểu quả của
                của hàng chúng tối
              </p> */}
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ backgroundImage: `url(${bgImg2})` }}>
                <div className="slide-text">
                  {/* <h1>Tài Liệu Công Nghệ Thông Tin</h1>
              <p>
                Cùng khám phá những tài liệu công nghệ chất lượng và hiểu quả của
                của hàng chúng tối
              </p> */}
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ backgroundImage: `url(${bgImg3})` }}>
                <div className="slide-text">
                  {/* <h1>Tài Liệu Công Nghệ Thông Tin</h1>
              <p>
                Cùng khám phá những tài liệu công nghệ chất lượng và hiểu quả của
                của hàng chúng tối
              </p> */}
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ backgroundImage: `url(${bgImg4})` }}>
                <div className="slide-text">
                  {/* <h1>Tài Liệu Công Nghệ Thông Tin</h1>
              <p>
                Cùng khám phá những tài liệu công nghệ chất lượng và hiểu quả của
                của hàng chúng tối
              </p> */}
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
      }

    </header>
  );
};

export default MainHeading;
