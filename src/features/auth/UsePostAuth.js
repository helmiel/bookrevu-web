import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/AuthContext";

export const usePostAuth = () => {
  const { login } = useAuth();
  axiosInstance.defaults.withCredentials = true;
  return useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const response = await axiosInstance.post("/authentications", {
          username,
          password,
        });

        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    },
    onError: (error) => {
      console.log(error);
      throw new Error(error.message);
    },
    onSuccess: (data) => {
      login(data.data.accessToken);
    },
  });
};
// import { axiosInstance } from "@/lib/axios";
// import { useMutation } from "@tanstack/react-query";
// import { useState } from "react";

// export const usePostAuth = () => {
//   const [accessToken, setAccessToken] = useState(null);

//   return useMutation({
//     mutationFn: async ({ username, password }) => {
//       try {
//         const response = await axiosInstance.post("/authentications", {
//           username,
//           password,
//         });

//         return response.data;
//       } catch (error) {
//         throw new Error(
//           error.response?.data?.message || error.message || "An error occurred"
//         );
//       }
//     },
//     onError: (error) => {
//       console.log(error);
//       throw new Error(error.message);
//     },
//     onSuccess: (data) => {
//       setAccessToken(data.data.accessToken);

//       document.cookie = `refreshToken=${data.data.refreshToken}; HttpOnly; Secure; Path=/; SameSite=Strict`;
//     },
//   });
// };
