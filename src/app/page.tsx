"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Loading from "./components/Loading";
import axios from "axios";

// Define an interface for the event data
interface Event {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  bookingPrice: number;
}

const Page: React.FC = () => {
  const [data, setData] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getallPost = async () => {
    try {
      const res = await axios.get("/api/auth/getallevents");
      setData(res.data.allevents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getallPost();
  }, []);

  return (
    <div className="min-h-screen bg-custom-bg text-white">
      <Navbar />
      <div className="events flex flex-wrap justify-center gap-4 p-5">
        {loading ? (
          <Loading />
        ) : (
          data?.map((event) => (
            <Card
              key={event._id} // Ensure you provide a unique key
              id={event._id}
              title={event.title}
              description={event.description}
              image={event.image}
              category={event.category}
              bookingPrice={event.bookingPrice}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
