import Head from "next/head";
import Image from "next/image";
import Search from "../components/form/Search";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../components/redux/store";
import SearchResults from "../components/form/SearchResults";
// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="flex-1 flex  flex-col">
      <main className="flex-grow flex min-h-0   border-t">
        <Search />

        <SearchResults />
      </main>
    </div>
  );
}
