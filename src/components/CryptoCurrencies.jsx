import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Spinner from "./Spinner";

const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (cryptosList?.data?.coins) {
      const filteredData = cryptosList.data.coins.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCryptos(filteredData);
    }
  }, [cryptosList, searchTerm]);

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className="mx-4">
      {!simplified && (
        <form className="max-w-md mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Cryptocurrency"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
      )}
      <div className="grid max-[850px]:grid-cols-2 gap-4 max-[650px]:grid-cols-1 grid-cols-3">
        {cryptos?.map((currency) => (
          <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
            <div className="bg-gray-800 border border-gray-500 rounded-lg shadow hover:bg-gray-700 w-full">
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h5 className="mb-2 text-xl tracking-tight text-white">
                    {currency.rank}. {currency.name}
                  </h5>
                  <img
                    src={currency.iconUrl}
                    alt={currency.name}
                    className="h-10"
                  />
                </div>
                <p className="font-normal text-gray-400">
                  Price: {millify(currency.price)}
                </p>
                <p className="font-normal text-gray-400">
                  Market Cap: {millify(currency.marketCap)}
                </p>
                <p className="font-normal text-gray-400">
                  Daily Change: {millify(currency.change)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CryptoCurrencies;
