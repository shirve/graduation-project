import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from './ImageSwiper.module.scss'

interface Props {
  images: string[]
}

const ImageSwiper = ({ images }: Props) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      style={{ marginBottom: '0.5rem' }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className={styles.swiperSlide}>
            <img
              src={`/uploads/${image}`}
              alt='project_image'
              className={styles.swiperSlideImage}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ImageSwiper
