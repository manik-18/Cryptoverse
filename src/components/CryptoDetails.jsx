import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import {
  FaDollarSign,
  FaHashtag,
  FaBolt,
  FaMoneyBillAlt,
  FaTrophy,
  FaChartLine,
  FaExchangeAlt,
  FaExclamationCircle,
  FaCheck,
  FaTimes,
  FaCoins,
  FaCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import Spinner from "./Spinner";
import LineChart from "./LineChart";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });

  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Spinner />;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const stats = [
    {
      title: "Price to USD",
      value: `${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <FaDollarSign />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <FaHashtag /> },
    {
      title: "24h Volume",
      value: `${
        cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])
      }`,
      icon: <FaBolt />,
    },
    {
      title: "Market Cap",
      value: `${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <FaMoneyBillAlt />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `${millify(cryptoDetails.allTimeHigh?.price)}`,
      icon: <FaTrophy />,
    },
  ];
  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <FaChartLine />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <FaExchangeAlt />,
    },
    {
      title: "Approved Supply",
      value: cryptoDetails.supply.confirmed ? <FaCheck /> : <FaTimes />,
      icon: <FaExclamationCircle />,
    },
    {
      title: "Total Supply",
      value: `${millify(cryptoDetails.supply.total)}`,
      icon: <FaCoins />,
    },
    {
      title: "Circulating Supply",
      value: `${millify(cryptoDetails.supply.circulating)}`,
      icon: <FaCircle />,
    },
  ];

  return (
    <div>
      <div>
        <div className="p-6">
          <h5 className="max-[400px]:text-2xl text-center mb-2 text-4xl tracking-tight text-white font-bold">
            {cryptoDetails.name} Price
          </h5>
          <p className="text-center font-normal text-gray-300">
            {cryptoDetails.name} live price in US Dollar (USD). View value
            statistics, market cap, and supply.
          </p>
        </div>
      </div>
      <form className="max-w-sm mx-auto mb-8 flex flex-col justify-center items-center">
        <label
          htmlFor="time-period"
          className="block mb-2 text-sm font-medium text-white text-center mt-2"
        >
          Select Time Period
        </label>
        <select
          id="time-period"
          className="border text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setTimeperiod(e.target.value)}
          value={timeperiod}
        >
          {time.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </form>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />
      <div className="flex justify-center items-center gap-8 max-[860px]:flex-col">
        <div className="text-center max-w-sm py-6 px-2 border rounded-lg shadow-lg bg-gray-800 border-gray-400">
          <p className="text-2xl font-semibold tracking-tight text-white">
            {cryptoDetails.name} Value Statistics
          </p>
          <p className="text-gray-400 py-3">
            An overview showing the value statistics of {cryptoDetails.name}.
          </p>

          {stats.map(({ icon, title, value }, index) => (
            <div key={index}>
              <div className="mt-1 flex items-center justify-between px-2">
                <h5 className="mb-2 font-semibold tracking-tight text-white">
                  <span className="text-gray-400 inline-flex">{icon}</span>{" "}
                  {title}
                </h5>

                <p className="mb-3 font-normal text-gray-300">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center max-w-sm py-6 px-2 border rounded-lg shadow-lg bg-gray-800 border-gray-400">
          <p className="text-2xl font-semibold tracking-tight text-white">
            Other Stats Info
          </p>
          <p className="text-gray-400 py-3">
            An overview showing the other statistics of {cryptoDetails.name}.
          </p>

          {genericStats.map(({ icon, title, value }, index) => (
            <div key={index}>
              <div className="mt-1 flex items-center justify-between px-2">
                <h5 className="mb-2 font-semibold tracking-tight text-white">
                  <span className="text-gray-400 inline-flex">{icon}</span>{" "}
                  {title}
                </h5>

                <p className="mb-3 font-normal text-gray-300">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-8">
        <div className="p-6">
          <h5 className="max-[400px]:text-2xl text-center mb-2 text-4xl tracking-tight text-white font-bold">
            What is {cryptoDetails.name}?
          </h5>
          <p className="text-center font-normal text-gray-300">
            {HTMLReactParser(cryptoDetails.description)}
          </p>
        </div>
        <h5 className="max-[400px]:text-2xl text-center my-2 text-4xl tracking-tight text-white font-bold">
          {cryptoDetails.name} Links
        </h5>
        {cryptoDetails.links?.map((link, index) => (
          <div key={index}>
            <Link
              to={link.url}
              className="mx-8 my-4 block p-6 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
              <div className="flex justify-between items-center max-[500px]:flex-col max-[500px]:items-start">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                  {link.type}
                </h5>
                <p className="font-normal text-gray-400">{link.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoDetails;
