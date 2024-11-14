import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";
import { useParams } from "react-router-dom";
import { Input } from "../../components/ui/Input";

export const Profile = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get(`user/${id}`);
        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    })();
  }, []);

  return (
    <div className="py-10">
      {isLoading ? (
        <div className="flex justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        <>
          <h1 className="text-3xl text-center font-semibold mb-6">
            {userData?.data?.username
              ? `Welcome, ${userData.data.username}`
              : "Error"}
          </h1>
          <div className="space-y-4 px-12">
            <Input type="text" value={userData?.data?.email || ""} readOnly />
            <Input
              type="text"
              value={userData?.data?.username || ""}
              readOnly
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
