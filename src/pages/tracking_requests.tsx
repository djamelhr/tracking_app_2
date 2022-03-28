import MainTrakingRequests from "../components/trackingRequests";
// import styles from '../styles/Home.module.css'

export default function tracking_requests() {
  return (
    <div className="h-full bg-gray-100 min-h-screen">
      <div className="p-5">
        <MainTrakingRequests />
      </div>
    </div>
  );
}
