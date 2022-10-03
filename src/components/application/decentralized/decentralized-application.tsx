import { DecentralizedProvider } from "src/providers/decentralized";
import Header from "../shared/header/header.component";
import DecentralizedMainContent from "./main-content/main-content.component";

const DecentralizedApplication = () => {
  return (
    <DecentralizedProvider>
      <Header />
      <DecentralizedMainContent />
    </DecentralizedProvider>
  );
};

export default DecentralizedApplication;
