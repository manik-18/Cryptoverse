import React from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import millify from "millify";
import CryptoCurrencies from "./CryptoCurrencies";
import News from "./News";
import Spinner from "./Spinner";

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  if (isFetching) {
    return <Spinner />;
  }

  return (
    <main className="bg-gray-800">
      <h1 className="text-center text-4xl font-bold text-gray-200 my-8 max-[400px]:text-2xl">
        Global Crypto Stats
      </h1>
      <section className="grid justify-center items-center max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4 ">
        <div className="bg-gray-800 border border-gray-500 rounded-lg shadow hover:bg-gray-700">
          <div className="p-6">
            <h5 className="mb-2 text-xl tracking-tight text-white">
              Total Cryptocurrencies
            </h5>
            <p className="font-normal text-gray-400">
              {millify(globalStats.total)}
            </p>
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-500 rounded-lg shadow hover:bg-gray-700">
          <div className="p-6">
            <h5 className="mb-2 text-xl tracking-tight text-white">
              Total Exchanges
            </h5>
            <p className="font-normal text-gray-400">
              {millify(globalStats.totalExchanges)}
            </p>
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-500 rounded-lg shadow hover:bg-gray-700">
          <div className="p-6">
            <h5 className="mb-2 text-xl tracking-tight text-white">
              Total Market Cap
            </h5>
            <p className="font-normal text-gray-400">
              {millify(globalStats.totalMarketCap)}
            </p>
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-500 rounded-lg shadow hover:bg-gray-700">
          <div className="p-6">
            <h5 className="mb-2 text-xl tracking-tight text-white">
              Total 24h Volume
            </h5>
            <p className="font-normal text-gray-400">
              {millify(globalStats.total24hVolume)}
            </p>
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-500 rounded-lg shadow hover:bg-gray-700">
          <div className="p-6">
            <h5 className="mb-2 text-xl tracking-tight text-white">
              Total Markets
            </h5>
            <p className="font-normal text-gray-400">
              {millify(globalStats.totalMarkets)}
            </p>
          </div>
        </div>
      </section>
      <h1 className="text-center text-4xl font-bold text-gray-200 my-8 max-[400px]:text-2xl">
        Top 10 Cryptocurrencies in the world.
      </h1>
      <section className="p-4">
        <CryptoCurrencies simplified />
      </section>
      <h1 className="text-center text-4xl font-bold text-gray-200 my-8 max-[400px]:text-2xl">
        Latest Crypto News
      </h1>
      <section className="p-4">
        <News simplified/>
      </section>
    </main>
  );
};

export default HomePage;
