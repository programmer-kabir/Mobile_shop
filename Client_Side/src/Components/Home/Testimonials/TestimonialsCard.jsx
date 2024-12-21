import React from "react";
import { FaQuoteLeft, FaQuoteRight, FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
const TestimonialsCard = ({data}) => {
    const { comment, photo, name, rating,email } = data;
  return (
    <div>
    <div className="border border-gray-300 rounded-lg p-6">
      <div className="flex items-center">
        <FaQuoteLeft className="text-gray-300 w-12 h-12 flex-shrink-0 mr-5" />
        <p className="text-gray-600 mb-4 flex-grow">{comment}</p>
        <FaQuoteRight className="text-gray-300 w-12 h-12 flex-shrink-0 ml-2" />
      </div>

      <div className="flex items-center gap-2 mt-2">
        <img src={photo} alt={name} className="w-16 h-16 rounded-full" />
        <div>
          <p className="font-bold">{name}</p>
          <div className="  position-absolute bottom-0 end-50 mb-3">
            <Rating
              readonly
              className="text-success"
              placeholderRating={rating}
              emptySymbol={<FaRegStar />}
              placeholderSymbol={<FaStar> </FaStar>}
              fullSymbol={<FaStar> </FaStar>}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TestimonialsCard