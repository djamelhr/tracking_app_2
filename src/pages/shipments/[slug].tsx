import Head from "next/head";
import dynamic from "next/dynamic";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { refresheShipment } from "../../components/redux/actions/shipmentsActions";
const ReactJson = dynamic(import("react-json-view"), { ssr: false });
export default function ShipmentPage(data: any) {
  const dispatch = useDispatch();
  const pol_date = () => {
    let pol = "";
    if (data.voyage.pol_atd_at === null && data.voyage.pol_etd_at === null) {
      pol = "NO ETD";
    } else if (
      data.voyage.pol_atd_at === null &&
      data.voyage.pol_etd_at !== null
    ) {
      pol =
        +"ETD : " + moment(data.voyage.pol_etd_at).format("MMM DD YYYY ,h:mma");
    } else if (
      data.voyage.pol_atd_at !== null &&
      data.voyage.pol_etd_at === null
    ) {
      pol =
        "ATD : " + moment(data.voyage.pol_atd_at).format("MMM DD YYYY ,h:mma");
    } else if (
      data.voyage.pol_atd_at !== null &&
      data.voyage.pol_etd_at !== null
    ) {
      pol =
        "ATD : " + moment(data.voyage.pol_atd_at).format("MMM DD YYYY ,h:mma");
    }

    return pol;
  };
  const pod_date = () => {
    let pol = "";
    if (data.voyage.pod_ata_at === null && data.voyage.pod_eta_at === null) {
      pol = "NO ETA";
    } else if (
      data.voyage.pod_ata_at === null &&
      data.voyage.pod_eta_at !== null
    ) {
      pol =
        "ETA : " + moment(data.voyage.pod_eta_at).format("MMM DD YYYY ,h:mma");
    } else if (
      data.voyage.pod_ata_at !== null &&
      data.voyage.pod_eta_at === null
    ) {
      pol =
        "ATA : " + moment(data.voyage.pod_ata_at).format("MMM DD YYYY ,h:mma");
    } else if (
      data.voyage.pod_ata_at !== null &&
      data.voyage.pod_eta_at !== null
    ) {
      pol =
        "ATA : " + moment(data.voyage.pod_ata_at).format("MMM DD YYYY ,h:mma");
    }

    return pol;
  };
  return (
    <div className="flex bg-gray-100  min-h-0 h-screen items-center mt-1 w-full flex-col flex-auto border-l">
      <button
        onClick={() => dispatch(refresheShipment(data.id))}
        className=" absolute bottom-5 right-5  px-5 py-2 text-lg font-bold tracking-wide text-white bg-green-500 rounded-full focus:outline-none"
      >
        Refreshe
      </button>
      <div className="m-2 bg-white w-2/3 h-2/6 ">
        <div id="pol">
          <p>{data.port_of_lading_name}</p>

          <p>{pol_date()}</p>
        </div>
        <div id="pod">
          <p>{data.port_of_discharge_name}</p>

          <p>{pod_date()}</p>
        </div>

        <div>
          last refreshed{" "}
          <strong>
            {moment(data.voyage.last_status_refresh_at).fromNow()}
          </strong>{" "}
        </div>
      </div>
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

export async function getServerSideProps(context: any) {
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

// export async function getStaticPaths() {
//   const res = await fetch(
//     `https://us-central1-djomake.cloudfunctions.net/nbl_function/api/v2/shipments`,
//     {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const content = await res.json();
//   return {
//     paths: content.map((ship: any) => ({
//       params: {
//         slug: ship.id,
//       },
//     })),
//     fallback: false,
//   };
// }
