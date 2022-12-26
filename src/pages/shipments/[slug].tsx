import Router, { useRouter } from "next/router";
import dynamic from "next/dynamic";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import {
  getShipments,
  removeShipment,
} from "../../components/redux/actions/shipmentsActions";
import Containershipment from "../../components/RoutesComponents/shipments/ContainerData";
import { useEffect, useState } from "react";
import { RootState } from "../../components/redux/store";
import { terminalsAvailable } from "../../components/redux/terminalsData";
import { proxy } from "../../components/redux/proxy";
import { setNotification } from "../../components/redux/actions/notificationActions";
const ReactJson = dynamic(import("react-json-view"), { ssr: false });
export default function ShipmentPage(shipment: any) {
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const [terminalname, setTerminalName] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const { res } = useSelector((state: RootState) => state.shipments);
  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };
  useEffect(() => {
    setIsRefreshing(false);
  }, [shipment]);
  const pol_date = () => {
    let pol = "";
    if (shipment.voyage) {
      if (
        shipment.voyage.pol_atd_at === null &&
        shipment.voyage.pol_etd_at === null
      ) {
        pol = "NO ETD";
      } else if (
        shipment.voyage.pol_atd_at === null &&
        shipment.voyage.pol_etd_at !== null
      ) {
        pol =
          "ETD : " +
          moment.parseZone(shipment.voyage.pol_etd_at).format("MMM DD YYYY");
      } else if (
        shipment.voyage.pol_atd_at !== null &&
        shipment.voyage.pol_etd_at === null
      ) {
        pol =
          "ATD : " +
          moment.parseZone(shipment.voyage.pol_atd_at).format("MMM DD YYYY");
      } else if (
        shipment.voyage.pol_atd_at !== null &&
        shipment.voyage.pol_etd_at !== null
      ) {
        pol =
          "ATD : " +
          moment.parseZone(shipment.voyage.pol_atd_at).format("MMM DD YYYY");
      }
    }

    return pol;
  };
  const destination_date = () => {
    let pol = "";
    if (shipment.voyage) {
      if (
        shipment.voyage.destination_ata_at === null &&
        shipment.voyage.destination_eta_at === null
      ) {
        pol = "";
      } else if (
        shipment.voyage.destination_ata_at === null &&
        shipment.voyage.destination_eta_at !== null
      ) {
        pol =
          "ETA : " +
          moment
            .parseZone(shipment.voyage.destination_eta_at)
            .format("MMM DD YYYY");
      } else if (
        shipment.voyage.destination_ata_at !== null &&
        shipment.voyage.destination_eta_at === null
      ) {
        pol =
          "ATA : " +
          moment
            .parseZone(shipment.voyage.destination_ata_at)
            .format("MMM DD YYYY");
      } else if (
        shipment.voyage.destination_ata_at !== null &&
        shipment.voyage.destination_eta_at !== null
      ) {
        pol =
          "ATA : " +
          moment
            .parseZone(shipment.voyage.destination_ata_at)
            .format("MMM DD YYYY");
      }
    }

    return pol ? (
      <div className="bg-gray-200 p-2 rounded-lg"> {pol}</div>
    ) : (
      <div className="bg-gray-200 p-2 rounded-lg"> ETA ~ N/A</div>
    );
  };
  const statecode = () => {
    let state = shipment.destination?.state?.code
      ? shipment.destination?.state?.code + ","
      : "";

    return state;
  };
  const pod_date = () => {
    let pol = "";
    if (shipment.voyage) {
      if (
        shipment.voyage.pod_ata_at === null &&
        shipment.voyage.pod_eta_at === null
      ) {
        pol = "NO ETA";
      } else if (
        shipment.voyage.pod_ata_at === null &&
        shipment.voyage.pod_eta_at !== null
      ) {
        pol =
          "ETA : " +
          moment.parseZone(shipment.voyage.pod_eta_at).format("MMM DD YYYY");
      } else if (
        shipment.voyage.pod_ata_at !== null &&
        shipment.voyage.pod_eta_at === null
      ) {
        pol =
          "ATA : " +
          moment.parseZone(shipment.voyage.pod_ata_at).format("MMM DD YYYY");
      } else if (
        shipment.voyage.pod_ata_at !== null &&
        shipment.voyage.pod_eta_at !== null
      ) {
        pol =
          "ATA : " +
          moment
            .parseZone(shipment.voyage.pod_ata_at)
            .format("MMM DD YYYY ,h:mma");
      }
    }

    return pol;
  };

  const trackShipmentAtTerminal = async (e: React.FormEvent) => {
    try {
      if (!shipment.pod_terminal) {
        alert("no pod terminal");
      } else {
        let request_type = "update_request";
        if (shipment.containers[0].cntnr === null) {
          request_type = "initial_request";
        }
        setLoading(true);
        const res = await fetch(
          `${proxy}/v2/cargo/${request_type}/${shipment.id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status < 300) {
          setLoading(false);
          refreshData();
        } else {
          setLoading(false);
          dispatch(setNotification(res.statusText, "danger"));
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      dispatch(setNotification("error", "danger"));
    }

    //dispatch(setNotification("updated!!", "green"));
  };
  const refresheShipment = async (e: React.FormEvent) => {
    try {
      setLoading(true);
      const res = await fetch(`${proxy}/v2/shipments/${shipment.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (res.status < 300) {
        setLoading(false);
        refreshData();
      } else {
        setLoading(false);
        dispatch(setNotification(res.statusText, "danger"));
      }
    } catch (error) {
      console.log(error);
      dispatch(setNotification("error", "danger"));
    }

    //dispatch(setNotification("updated!!", "green"));
  };
  const deleteShip = async (id: string) => {
    dispatch(removeShipment(id));
    dispatch(getShipments());
    await router.push("/shipments");
  };
  const saveTerminal = async () => {
    const res = await fetch(`${proxy}/v2/shipments/addTerminal`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: shipment.id,
        frims_code: terminalsAvailable.find(({ name }) => name === terminalname)
          ?.firms,
      }),
    });
    if (res.status < 300) {
      refreshData();
    }
  };

  const selectTerminal = (
    <form className="w-full max-w-sm">
      <div className="flex items-center border-b border-teal-500 py-2">
        <select
          className="block appearance-none w-5/6 bg-gray-200 border p-2 border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-state"
          value={terminalname}
          onChange={(event) => setTerminalName(event.target.value)}
        >
          <option>Select Terminal</option>
          {terminalsAvailable?.map((terminal: any, index: number) => (
            <option key={index}>{terminal.name}</option>
          ))}
        </select>
        <button
          onClick={saveTerminal}
          className="flex-shrink-0 bg-gray-700 hover:bg-teal-700 border-teal-500 hover:border-teal-700  text-sm border-4 text-white py-1 px-3 rounded"
          type="button"
        >
          Save
        </button>
      </div>
    </form>
  );

  return (
    <div className="flex bg-gray-100  min-h-screen  items-center w-full flex-col flex-auto border-l">
      <div className="w-2/3    overflow-hidden ">
        <div className="flex justify-between  items-center  py-2">
          <div className="bg-orange-600 text-base uppercase  py-1   text-black-200 ">
            Shipment
            <p className="font-bold text-2xl">{shipment?.number}</p>
          </div>
          <div className="text-base">
            Shipping Line
            <p className="font-bold text-2xl">
              {shipment.shipping_lines?.name}
            </p>
          </div>
          <div className="text-base">
            Terminal
            {shipment.pod_terminal?.nickname ? (
              <p className="font-bold text-2xl">
                {shipment.pod_terminal?.nickname}{" "}
              </p>
            ) : (
              selectTerminal
            )}
            <span className="text-xs">
              {shipment.pod_terminal?.frims_code
                ? shipment.pod_terminal?.frims_code
                : null}{" "}
            </span>{" "}
          </div>
          <div className="text-base">
            <button
              onClick={() => setState(true)}
              className="  px-5 py-2 mt-4 text-base font-bold  text-white bg-gray-900 rounded-full focus:outline-none"
            >
              JSON View
            </button>
          </div>

          <div className="text-base">
            <button
              onClick={() => deleteShip(shipment.id)}
              className="  px-5 py-2 mt-4 text-base font-bold  text-white bg-yellow-600 rounded-full focus:outline-none"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {/* the first card in slug  */}
      <div className="m-2 p-3 bg-white w-2/3">
        <div id="pol" className="flex flex-row   items-center my-2">
          <div className="w-1/2">
            {shipment.port_of_lading
              ? shipment.port_of_lading?.name +
                "," +
                shipment.port_of_lading?.country?.country_code
              : shipment.port_of_lading_name + "*"}
          </div>

          <div className="bg-gray-200 p-2 rounded-lg">{pol_date()}</div>
        </div>
        <div id="pod" className="flex flex-row    items-center ">
          <div className="w-1/2">
            {shipment.port_of_discharge
              ? shipment.port_of_discharge?.name +
                "," +
                shipment.port_of_discharge?.country?.country_code
              : shipment.port_of_discharge_name + "*"}
          </div>

          <div className="bg-gray-200 p-2 rounded-lg">{pod_date()}</div>
        </div>
        {shipment.destination ||
        shipment.destination_terminal ||
        shipment.destination_name ? (
          <div id="destination" className="flex flex-row   items-center my-2">
            <div className="flex flex-col w-1/2">
              <div>
                {shipment.destination
                  ? shipment.destination?.name +
                    "," +
                    statecode() +
                    shipment.destination?.country.country_code
                  : shipment.destination_name + "*"}
              </div>
              <div className="w-1/2">
                {shipment.destination_terminal?.rail ? (
                  <div className="flex items-center gap-2">
                    <p>{shipment.destination_terminal?.rail?.name}</p>
                    <p className="p-1 bg-gray-200 rounded-lg">
                      {shipment.destination_terminal?.rail?.frims_code}
                    </p>
                  </div>
                ) : (
                  ""
                )}
                {shipment.destination_terminal?.terminal
                  ? shipment.destination_terminal?.terminal.name +
                    "," +
                    (
                      <p className="p-1 bg-gray-200">
                        {shipment.destination_terminal?.terminal?.frims_code}
                      </p>
                    )
                  : ""}
              </div>
            </div>

            {destination_date()}
          </div>
        ) : (
          ""
        )}

        <div>
          <strong>
            {shipment.voyage
              ? "last refreshed " +
                moment
                  .parseZone(shipment.voyage.last_status_refresh_at)
                  .fromNow()
              : ""}
          </strong>{" "}
        </div>
      </div>
      {/* the first card in slug  */}
      <div className="flex flex-wrap  w-3/12 mb-2">
        <div className=" md:w-1/2 px-3 mb-6 md:mb-0">
          <button
            onClick={() => refresheShipment(shipment.id)}
            className="block  appearance-none w-full bg-gray-900 border text-center border-gray-200 text-white py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-blue-900 focus:border-gray-500"
          >
            Track on carrier
          </button>
        </div>
        <div className="w-full md:w-1/2  px-3 mb-6 md:mb-0">
          {" "}
          <button
            onClick={trackShipmentAtTerminal}
            className="block appearance-none w-full bg-gray-900 border text-center border-gray-200 text-white py-3 px-4 pr-8 rounded-full leading-tight  focus:border-gray-500"
            type="submit"
          >
            Track on terminal
          </button>
          {loading && (
            <svg
              className="animate-spin  h-5 w-5 mr-3 border-t-2 border-b-2 border-black"
              viewBox="0 0 24 24"
            ></svg>
          )}
        </div>
      </div>

      <div className="m-2 p-3 bg-white w-2/3   items-center mt-1   border-lg">
        {shipment.containers?.map((con: any) => (
          <Containershipment
            key={con.id}
            container={con}
            shipmentId={shipment.id}
          />
        ))}
      </div>

      {state ? (
        <div className="fixed w-screen h-screen inset-0 z-10 overflow-scroll">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setState(false)}
          ></div>
          <div className="flex items-center min-h-screen   px-4 py-8">
            <div className="relative w-full max-w-7xl mx-auto bg-white rounded-md shadow-lg">
              <div className="flex items-center justify-between p-4 border-b">
                <h4 className="text-lg font-medium text-gray-800">
                  Json Viewer
                </h4>
                <button
                  className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                  onClick={() => setState(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mx-auto"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-2 p-4 mt-3 text-xs max-h-screen leading-relaxed text-gray-500 overflow-scroll">
                <ReactJson
                  name={false}
                  displayObjectSize={false}
                  displayDataTypes={false}
                  enableClipboard={false}
                  theme="monokai"
                  src={shipment ? shipment : {}}
                />
              </div>
              <div className="flex items-center gap-3 p-4 mt-5 border-t"></div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;

  const shipment = await fetch(`${proxy}/v2/shipments/${params.slug}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const content = await shipment.json();
  // const mdxSource = await renderToString(content);
  //console.log("contentrsss", content);
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
