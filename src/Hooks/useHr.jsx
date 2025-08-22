import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

import { useQuery } from "@tanstack/react-query";
const useHr = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    
    const { data: isHr, isPending: isHrLoading } = useQuery({
        queryKey: [user?.email, 'isHr'],
        enabled: !loading && !!user?.email, 
        queryFn: async () => {
            const res = await axiosPublic.get(`/hr/role/${user.email}`);
            
            return res.data?.hr; 
        }
    });
    
    return [isHr, isHrLoading];
};

export default useHr;