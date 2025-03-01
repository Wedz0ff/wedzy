// @ts-nocheck
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';

const imageList = [
  'hat',
  '800',
  '900',
  '1000',
  '1100',
  '1300',
  '1400',
  '1750',
  '1800',
  '1900',
  '2000',
  '2100',
  '2200',
  '2300',
  '2400',
  '2500',
  '2600',
];

export default function ImageSlider() {
  return (
    <div>
      <Swiper
        style={{
          '--swiper-navigation-color': 'hsl(0, 90%, 40%)',
          '--swiper-pagination-color': 'hsl(0, 90%, 40%)',
        }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
      >
        {imageList.map((imageName, index) => (
          <SwiperSlide key={index}>
            <Image
              src={`/slide/${imageName}.jpg`}
              alt={`${imageName}`}
              width={600}
              height={400}
              priority={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
