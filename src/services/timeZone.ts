import axios from '@/api/axiosInstance';

export const getAllTimeZone = async () => {
   const res = await axios.get('/v1/get-timezone');
//    console.log(res.data.data.timezones);
//    return
   return res.data?.data.timezones; 
};

