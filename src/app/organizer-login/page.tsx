"use client";
import axios from "axios";
import Head from "next/head";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [documentNumber, setDocumentNumber] = useState<string>("");
  const [documentType, setDocumentType] = useState<string>("citizenship");
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
  const [passportPhotoPreview, setPassportPhotoPreview] = useState<string>("");
  const [documentPhoto, setDocumentPhoto] = useState<File | null>(null);
  const [documentPhotoPreview, setDocumentPhotoPreview] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");

  const handleDocumentPhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] as File;
    setDocumentPhoto(file);
    setDocumentPhotoPreview(file ? URL.createObjectURL(file) : "");
  };

  const handlePassportPhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] as File;
    setPassportPhoto(file);
    setPassportPhotoPreview(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("documentNumber", documentNumber);
    formData.append("documentType", documentType);
    if (passportPhoto) {
      formData.append("passportPhoto", passportPhoto);
    }
    if (documentPhoto) {
      formData.append("documentPhoto", documentPhoto);
    }
    formData.append("companyName", companyName);

    try {
      const res = await axios.post("/api/auth/organizer", formData, {
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
      toast.error("An error occurred while uploading files.");
    }
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <ToastContainer />
      <Head>
        <title>KYC Verification</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">KYC Verification</h1>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white rounded shadow-md"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="documentType"
            >
              Document Type
            </label>
            <select
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="documentType"
              value={documentType}
              onChange={(event) => setDocumentType(event.target.value)}
            >
              <option value="citizenship" className="text-amber-950">
                Citizenship
              </option>
              <option value="drivingLicense" className="text-amber-950">
                Driving License
              </option>
              <option value="legalDocument" className="text-amber-950">
                Another Legal Document
              </option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="documentNumber"
            >
              Document Number
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="documentNumber"
              type="text"
              value={documentNumber}
              onChange={(event) => setDocumentNumber(event.target.value)}
              placeholder="Enter your document number"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="documentPhoto"
            >
              Document Photo
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="documentPhoto"
              type="file"
              accept="image/*"
              onChange={handleDocumentPhotoChange}
            />
            {documentPhotoPreview && (
              <div className="mt-4">
                <img
                  src={documentPhotoPreview}
                  alt="Document Preview"
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="passportPhoto"
            >
              Passport Size Photo
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="passportPhoto"
              type="file"
              accept="image/*"
              onChange={handlePassportPhotoChange}
            />
            {passportPhotoPreview && (
              <div className="mt-4">
                <img
                  src={passportPhotoPreview}
                  alt="Passport Photo Preview"
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="companyName"
            >
              Company Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="companyName"
              type="text"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              placeholder="Company Name"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit KYC
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
