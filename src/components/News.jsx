import React, { useState } from "react";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Spinner from "./Spinner";
import { useGetCryptosQuery } from "../services/cryptoApi";
const DEFAULT_IMAGE_URL =
  "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=600";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
  });
  const { data } = useGetCryptosQuery(100);

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <>
      {!simplified && (
        <form className="max-w-sm mx-auto mb-8">
          <label
            htmlFor="cryptos"
            className="block mb-2 text-sm font-medium text-white"
          >
            Select category
          </label>
          <select
            id="cryptos"
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setNewsCategory(e.target.value)}
          >
            <option value="Cryptocurrency">Cryptocurrency</option>
            {data?.data?.coins.map((coin) => (
              <option key={coin.id} value={coin.name}>
                {coin.name}
              </option>
            ))}
          </select>
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
        {cryptoNews.data
          .slice(0, simplified ? 5 : cryptoNews.data.length)
          .map((news, index) => (
            <div
              key={index}
              className="border border-gray-500 rounded overflow-hidden shadow-lg hover:scale-105 bg-gray-800"
            >
              <img
                src={news.image || DEFAULT_IMAGE_URL}
                alt={news.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-gray-200 font-semibold text-xl mb-2 ">
                  {news.title}
                </h2>
                <p className="text-gray-400 text-sm mt-2">
                  {moment.unix(news.date).fromNow()}
                </p>
                <a
                  href={news.url}
                  className="text-center mt-4 block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default News;
