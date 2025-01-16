import useAuth from './useAuth'

import { useQuery } from '@tanstack/react-query'
import axios from "axios";
const useRole = () => {

  const { user, loading } = useAuth()
  const { data: role, isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/users/role/${user?.email}`)
      return data.role
    },
  })
  console.log(role)
  return [role, isLoading]
}

export default useRole