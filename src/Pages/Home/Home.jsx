import { useContext } from "react";
import About from "../../Components/About/About";
import Banner from "../../Components/Banner/Banner";
import MyMonthlyRequest from "../../Components/My Monthly Request/MyMonthlyRequest";
import MyPendingRequest from "../../Components/My Pending Request/MyPendingRequest";
import PendingRequest from "../../Components/Pending Request/PendingRequest";
import useRole from "../../Hooks/useRole";
import { AuthContext } from "../../Provider/AuthProvider";

const Home = () => {
  const [role, isLoading] = useRole();
  const { user } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
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
        </>
      )}
    </div>
  );
};

export default Home;