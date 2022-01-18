import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ReactJson = dynamic(import("react-json-view"), { ssr: false });

const SearchResults = () => {
  const { data } = useSelector((state: RootState) => state.terminal);
  return (
    <div className="flex min-h-0 h-screen   w-screen flex-col flex-auto border-l">
      <ReactJson
        name={false}
        displayObjectSize={false}
        displayDataTypes={false}
        enableClipboard={false}
        theme="monokai"
        src={data ? data : {}}
      />
    </div>
  );
};

export default SearchResults;
