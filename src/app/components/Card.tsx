import React from "react";
import { FaBook, FaInfoCircle } from "react-icons/fa";

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, description }) => {
  return (
    <div className="card h-[25rem] w-[25rem] border border-rose-800 rounded "></div>
  );
};

export default Card;
