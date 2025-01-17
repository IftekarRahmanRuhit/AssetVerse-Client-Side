import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';


const useCompanyInfo = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth()

    const { data: companyInfo = {}, isPending: loading, refetch } = useQuery({
        queryKey: ['companyInfo',user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users-logo/${user?.email}`); 
            return res.data;
        }
    });

    return {companyInfo, loading, refetch};
};

export default useCompanyInfo;