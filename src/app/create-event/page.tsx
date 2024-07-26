"use client";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Page: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [bookingPrice, setBookingPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("bookingPrice", bookingPrice);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post("/api/auth/event", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-bg">
      <ToastContainer />
      <form
        className="bg-form-bg p-6 rounded-lg shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Create Event
        </h2>

        <div className="mb-4">
          <label className="block text-text-primary mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 rounded bg-input-bg border border-input-border text-text-primary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-text-primary mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="w-full p-2 rounded bg-input-bg border border-input-border text-text-primary"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-text-primary mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="w-full p-2 rounded bg-input-bg border border-input-border text-text-primary"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Web Development">Web Development</option>
            <option value="App Development">App Development</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Data Science">Data Science</option>
            <option value="Cyber Security">Cyber Security</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-text-primary mb-2"
            htmlFor="bookingPrice"
          >
            Booking Price
          </label>
          <input
            type="number"
            id="bookingPrice"
            className="w-full p-2 rounded bg-input-bg border border-input-border text-text-primary"
            value={bookingPrice}
            onChange={(e) => setBookingPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-text-primary mb-2" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            id="image"
            className="w-full p-2 rounded bg-input-bg border border-input-border text-text-primary"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 rounded bg-button-bg text-text-primary font-bold hover:bg-orange-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
