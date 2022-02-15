import Head from "next/head";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { refresheShipment } from "../../components/redux/actions/shipmentsActions";
const ReactJson = dynamic(import("react-json-view"), { ssr: false });
export default function ShipmentPage(data: any) {
  const dispatch = useDispatch();

  return (
    <div className="flex  min-h-0 h-screen items-center mt-1 w-full flex-col flex-auto border-l">
      <button
        onClick={() => dispatch(refresheShipment(data.id))}
        className=" absolute bottom-5 right-5  px-5 py-2 text-lg font-bold tracking-wide text-white bg-green-500 rounded-full focus:outline-none"
      >
        Refreshe
      </button>
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
}

export async function getStaticProps(context: any) {
  console.log("hi", context);
  const { params } = context;

  const data = await fetch(
    `https://us-central1-djomake.cloudfunctions.net/nbl_function/api/v2//shipments/${params.slug}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const content = await data.json();
  // const mdxSource = await renderToString(content);
  //  console.log(content);
  return {
    props: {
      ...content,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(
    `https://us-central1-djomake.cloudfunctions.net/nbl_function/api/v2/shipments`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const content = await res.json();
  return {
    paths: content.map((ship: any) => ({
      params: {
        slug: ship.id,
      },
    })),
    fallback: false,
  };
}
