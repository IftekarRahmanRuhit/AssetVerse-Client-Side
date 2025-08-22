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
import Events from "../../Components/Events/Events";
import MostRequestedItems from "../../Components/MostRequestedItems/MostRequestedItems";
import LimitedItems from "../../Components/LimitedItems/LimitedItems";
import Chart from "../../Components/Chart/Chart";
import FeedbackSection from "../../Components/FeedbackSection/FeedbackSection";
import IndustriesSection from "../../Components/IndustriesSection/IndustriesSection";
import ClientShowcase from "../../Components/ClientShowcase/ClientShowcase";
import BlogSection from "../../Components/BlogSection/BlogSection";
import ContactSection from "../../Components/ContactSection/ContactSection";

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
        <div className="max-w-screen-2xl mx-auto">
        <div className="max-w-screen-2xl mx-auto mt-20">
         <Banner />
         </div>
         <div>
         <About />
         </div>
         <div><IndustriesSection></IndustriesSection></div>
         <div><PricingPackages></PricingPackages></div>
         <div><ClientShowcase></ClientShowcase></div>
         <div><ClientFeedback></ClientFeedback></div>
         <div><BlogSection></BlogSection></div>
         <div><ContactSection></ContactSection></div>
        </div>
        
       </>
      )}
      {user && role === "hr" && (
        <>
        <div className="max-w-screen-2xl mx-auto">
        <div className="max-w-screen-2xl mx-auto mt-20">
         <Banner />
         </div>
         <div>
         <About />
         </div>
         <div><IndustriesSection></IndustriesSection></div>
         <div><PricingPackages></PricingPackages></div>
         <div><ClientShowcase></ClientShowcase></div>
         <div><ClientFeedback></ClientFeedback></div>
         <div><BlogSection></BlogSection></div>
         <div><ContactSection></ContactSection></div>
        </div>
        
       </>
      )
       }
      {!user && (
        <>
         <div className="max-w-screen-2xl mx-auto">
         <div className="max-w-screen-2xl mx-auto mt-20">
          <Banner />
          </div>
          <div>
          <About />
          </div>
          <div><IndustriesSection></IndustriesSection></div>
          <div><PricingPackages></PricingPackages></div>
          <div><ClientShowcase></ClientShowcase></div>
          <div><ClientFeedback></ClientFeedback></div>
          <div><BlogSection></BlogSection></div>
          <div><ContactSection></ContactSection></div>
         </div>
         
        </>
      )}
    </div>
  );
};

export default Home;