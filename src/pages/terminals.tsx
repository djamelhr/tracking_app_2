import Terminals_Rails_Components from "../components/form/TableTerminals";
import DataNav from "../components/layouts/DataNav";
import TerminalTable from "../components/RoutesComponents/Terminals/Terminal";

// import styles from '../styles/Home.module.css'

export default function Terminals() {
  return (
    <div>
      <DataNav />
      <Terminals_Rails_Components />;
    </div>
  );
}
