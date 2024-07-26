"use client";

import React from "react";
import { FaBars, FaUser, FaPlus, FaFire, FaSignInAlt } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";

const categories = [
  "Web Development",
  "App Development",
  "Machine Learning",
  "Data Science",
  "Cyber Security",
];

const Navbar: React.FC = () => {
  return (
    <nav className="bg-custom-bg text-white p-4 shadow-md sticky w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <FaBars className="text-2xl mr-4 cursor-pointer" />
          <h1 className="text-2xl font-bold" id="logo-text">
            ISOEvents.
          </h1>
        </div>
        <div className="flex items-center space-x-6 text-[12px] justify-center">
          <Link href="/create-event" className="flex items-center space-x-2">
            <FaPlus />
            <span>Create</span>
          </Link>
          <Link href="/trending" className="flex items-center space-x-2">
            <FaFire />
            <span>Trending</span>
          </Link>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex items-center space-x-2">
                <span>Categories</span>
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.292 7.707a1 1 0 011.414 0L10 11.001l3.294-3.294a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {categories.map((category) => (
                    <Menu.Item key={category}>
                      {({ active }) => (
                        <Link
                          href={`/category/${category
                            .toLowerCase()
                            .replace(/ /g, "-")}`}
                          className={`${
                            active ? "bg-gray-100" : ""
                          } block px-4 py-2 text-sm text-gray-700`}
                        >
                          {category}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <Link href="/profile" className="flex items-center space-x-2">
            <FaUser />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
