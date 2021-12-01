import React from 'react'
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCarouselCaption,
} from 'mdb-react-ui-kit';

import Ad1 from '../../../common/assets/ad1@2x.png'
import Ad2 from '../../../common/assets/ad2@2x.png'
import Ad3 from '../../../common/assets/ad3@2x.png'


const Carousel = () => {
  return (
    <MDBCarousel showIndicators fade >
      <MDBCarouselInner>
        <MDBCarouselItem className='active'>
          <MDBCarouselElement src={Ad1} alt='...' />
        </MDBCarouselItem>

        <MDBCarouselItem>
          <MDBCarouselElement src={Ad2} alt='...' />
        </MDBCarouselItem>

        <MDBCarouselItem>
          <MDBCarouselElement src={Ad3} alt='...' />
          {/* <MDBCarouselCaption>
            <h5>Third slide label</h5>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </MDBCarouselCaption> */}
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
  )
}

export default Carousel
