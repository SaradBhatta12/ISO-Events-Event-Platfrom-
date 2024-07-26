import React from "react";
import Link from "next/link";
// Define an interface for the props
interface CardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  bookingPrice: number;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  image,
  category,
  bookingPrice,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-2 border hover:cursor-pointer border-slate-600 transition-all">
      <img className="w-full" src={image} alt="next event" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-200 text-base">{description}</p>
        <p className="text-gray-400 text-sm">{category}</p>
        <p className="text-gray-400 text-sm">${bookingPrice}</p>
      </div>
      <div className="px-6 py-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          <Link href={`/${id}`}>See More..</Link>
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Book Event
        </button>
      </div>
    </div>
  );
};

export default Card;
