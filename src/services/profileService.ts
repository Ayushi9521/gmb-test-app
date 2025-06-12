import axios from '@/api/axiosInstance';

export const getProfile = async () => {
   const res = await axios.get('/v1/get-user-profile');
   return res.data?.data?.profileDetails; // Return only the profile details
};

export const updateProfile = (data: any) => {
  return axios.put('/v1/update-profile', data); // If profile is editable
};