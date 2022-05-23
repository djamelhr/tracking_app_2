import MainShipments from "../components/RoutesComponents/shipments";
// import styles from '../styles/Home.module.css'

export default function shipments() {
  return (
    <div className="h-full bg-gray-100 min-h-screen">
      <div className="pt-5">
        <MainShipments />
      </div>
    </div>
  );
}
