import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div>
      <section className="bg-gray-800">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="text-blue-500 mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-500">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-white">
              Something's missing.
            </p>
            <p className="mb-4 text-lg font-light text-gray-400">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.{" "}
            </p>
            <Link
              to="/"
              className="text-center mt-4 block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            >
              Go back to HomePage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error404;
