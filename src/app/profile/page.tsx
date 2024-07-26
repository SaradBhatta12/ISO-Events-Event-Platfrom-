"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface userDetail {
  id: string;
  username: string;
  image: string;
}
interface EventDetails {
  id: string;
  title: string;
  descritpion: string;
  image: string;
  price: number;
  catagory: string;
}
const page: React.FC = () => {
  const [events, setEvents] = useState<EventDetails[]>([]);
  const [user, setUser] = useState();
  console.log(user, events);
  const getEvents = async () => {
    const res = await axios.get("/api/auth/profile");
    setEvents(res.data.events);
    setUser(res.data.userdetails);
  };
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="min-h-screen bg-custom-bg text-white flex flex-col items-center py-12">
      <div className="w-full max-w-4xl p-6 bg-form-bg rounded-lg shadow-lg">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={user?.image}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-button-bg"
          />
          <div>
            <h2 className="text-2xl font-bold">{user?.username}</h2>
            <p className="text-text-secondary">Full Stack Developer</p>
            <p className="text-text-secondary">
              Creating amazing web applications
            </p>
          </div>
        </div>
        <button className="mb-6 px-4 py-2 rounded bg-button-bg text-white font-bold hover:bg-orange-700 transition-colors">
          Edit Profile
        </button>
        <h3 className="text-xl font-bold mb-4">Created Events</h3>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-4 rounded bg-input-bg border border-input-border"
            >
              <h4 className="text-lg font-bold">{event.title}</h4>
              <p className="text-text-secondary">{event.descritpion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
