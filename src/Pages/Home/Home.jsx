import { useContext } from "react";
import About from "../../Components/About/About";
import Banner from "../../Components/Banner/Banner";
import MyMonthlyRequest from "../../Components/My Monthly Request/MyMonthlyRequest";
import MyPendingRequest from "../../Components/My Pending Request/MyPendingRequest";
import PendingRequest from "../../Components/Pending Request/PendingRequest";
import useRole from "../../Hooks/useRole";
import { AuthContext } from "../../Provider/AuthProvider";
import {Helmet} from "react-helmet-async"
import PricingPackages from "../../Components/PricingPackages/PricingPackages";
import ClientFeedback from "../../Components/ClientFeedback/ClientFeedback";

const Home = () => {
  const [role, isLoading] = useRole();
  const { user } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Helmet> <title>AssetVerse | Home</title> </Helmet>
      {user && role === "employee" && (
        <>
          <MyPendingRequest />
          <MyMonthlyRequest />
        </>
      )}
      {user && role === "hr" && <PendingRequest />}
      {!user && (
        <>
          <Banner />
          <About />
          <PricingPackages></PricingPackages>
          <ClientFeedback></ClientFeedback>
        </>
      )}
    </div>
  );
};

export default Home;