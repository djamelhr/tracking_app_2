import Head from "next/head";
import Image from "next/image";
import Search from "../components/form/Search";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../components/redux/store";
import SearchResults from "../components/form/SearchResults";
import MainShipments from "../components/shipments";
// import styles from '../styles/Home.module.css'

export default function shipments() {
  return (
    <div className="h-screen bg-gray-100 ">
      <div className="pt-5">
        <MainShipments />
      </div>
    </div>
  );
}
