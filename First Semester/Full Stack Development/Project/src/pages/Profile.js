import React from "react";
import { useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../css/Home.css";
import axios from "axios";
import { BaseUrlContext } from "../context/BaseUrlContext";
import { UserInfoContext } from "../context/UserInfoContext";

const Profile = () => {
  const { theme } = React.useContext(ThemeContext);
  const base_url = React.useContext(BaseUrlContext).baseUrl;
  const userEmail = React.useContext(UserInfoContext).userEmail;
  const simulation_data = {
    user_name: "John Doe",
    count_passwords: 10,
    count_vaults: 5,
  };
  const [data, setData] = React.useState(null);
  const getDataFromServer = async () => {
    const response = await axios
      .post(
        `${base_url}/get_profile_data`,
        {},
        {
          params: {
            user_email: userEmail,
          },
        },
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
        // alert("server not running! a simulated response is being sent");
        const response = {
          data: {
            message: "simulation",
          },
        };
        return response;
      });
    if (response.data.message === "simulation") {
      setData(simulation_data);
    } else {
      if (response.data.length === 0) {
        setData(simulation_data);
      } else {
        setData(response.data.data);
      }
    }
  };

  useEffect(() => {
    if (theme === "light") {
      const light_button = document.getElementById("light_button");
      light_button.click();
    } else {
      const dark_button = document.getElementById("dark_button");
      dark_button.click();
    }
    if (!data) {
      getDataFromServer();
      // if (data.user_name !== "John Doe") {
      // }
    }
  });
  return (
    <div
      className="h-screen p-10"
      id={theme === "light" ? "divbg" : "divbgdark"}
    >
      <div className="text-6xl titillium m-4 text-center w-full text-accent">
        Profile
      </div>
      <div className="flex outline rounded-3xl m-10 p-12 items-center justify-evenly h-1/2">
        <div className="w-96 h-96">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={{ enableBackground: "new 0 0 512 512" }}
            xmlSpace="preserve"
          >
            <circle
              style={{ fill: "#0055b8" }}
              cx="255.998"
              cy="255.998"
              r="247.824"
            />
            <path
              style={{ fill: "#0082ca" }}
              d="M256 322.65c-76.614 0-141.344 50.84-162.322 120.619 43.484 37.724 100.237 60.555 162.322 60.555s118.837-22.833 162.322-60.555C397.344 373.489 332.614 322.65 256 322.65z"
            />
            <path
              style={{ fill: "#fff" }}
              d="m200.419 332.661-5.172 41.416L256 345.622zM311.581 332.661l5.172 41.416L256 345.622z"
            />
            <path
              style={{ opacity: ".1", enableBackground: "new" }}
              d="M256 322.65c-29.782 0-57.765 7.685-82.084 21.176 24.092 14.122 52.14 22.227 82.084 22.227 29.944 0 57.991-8.105 82.084-22.227-24.318-13.491-52.302-21.176-82.084-21.176z"
            />
            <circle
              style={{ fill: "#ffbf9e" }}
              cx="255.998"
              cy="203.475"
              r="144.326"
            />
            <circle
              style={{ fill: "#c29178" }}
              cx="255.998"
              cy="214.069"
              r="17.742"
            />
            <path
              style={{ fill: "#333e48" }}
              d="M256 59.158c-74.039 0-135.045 55.756-143.348 127.569 58.778-9.379 110.475-39.971 146.981-83.703 32.879 32.716 78.202 52.939 128.25 52.939 1.472 0 2.939-.021 4.404-.056C372.625 99.576 319.036 59.158 256 59.158z"
            />
            <path
              style={{ fill: "#1e252b" }}
              d="M256 437.627c-6.02 0-10.899 4.88-10.899 10.899 0 6.02 4.88 10.899 10.899 10.899 6.018 0 10.899-4.88 10.899-10.899 0-6.02-4.881-10.899-10.899-10.899zm0-50.318c-6.02 0-10.899 4.88-10.899 10.899 0 6.02 4.88 10.899 10.899 10.899 6.018 0 10.899-4.88 10.899-10.899 0-6.02-4.881-10.899-10.899-10.899zm-60.754-188.087c5.965 0 10.8-4.835 10.8-10.799 0-5.964-4.835-10.799-10.8-10.799-5.963 0-10.798 4.835-10.798 10.799-.001 5.964 4.835 10.799 10.798 10.799zm121.513 0c5.964 0 10.799-4.835 10.799-10.799 0-5.964-4.836-10.799-10.799-10.799-5.965 0-10.799 4.835-10.799 10.799 0 5.964 4.834 10.799 10.799 10.799zm120.26-124.241C388.666 26.63 324.38.001 256 .001S123.333 26.63 74.981 74.981C26.629 123.333 0 187.62 0 256s26.629 132.667 74.981 181.019c48.352 48.352 112.639 74.98 181.019 74.98s132.667-26.629 181.019-74.98C485.371 388.667 512 324.38 512 256s-26.629-132.667-74.981-181.019zM256 495.65c-56.481 0-109.972-19.418-152.873-55.079 14.369-42.537 46.523-77.725 87.561-95.959l-3.553 28.451a8.174 8.174 0 0 0 11.58 8.415l54.526-25.539c.919.016 1.835.035 2.759.035s1.84-.019 2.759-.035l54.526 25.539a8.173 8.173 0 0 0 11.58-8.415l-3.553-28.451c41.038 18.235 73.192 53.422 87.561 95.959C365.972 476.232 312.481 495.65 256 495.65zm4.21-380.796c34.649 31.502 79.06 48.894 126.128 49.267a135.69 135.69 0 0 1 5.809 39.359c0 75.072-61.075 136.148-136.147 136.148S119.853 278.553 119.853 203.48c0-3.286.123-6.543.353-9.771 54.003-10.045 103.224-37.78 140.004-78.855zm-137.684 61.731C135.045 114.35 190.132 67.332 256 67.332c55.173 0 102.786 32.99 124.149 80.281-43.321-1.888-83.818-19.603-114.751-50.382a8.186 8.186 0 0 0-6.143-2.372 8.18 8.18 0 0 0-5.899 2.927c-33.707 40.381-79.828 68.071-130.83 78.799zm184.28 183.806-17.344-8.123a151.086 151.086 0 0 0 15.773-4.451l1.571 12.574zm-84.268-8.123-17.344 8.123 1.571-12.574a150.841 150.841 0 0 0 15.773 4.451zm202.92 73.19a249.028 249.028 0 0 1-3.453 3.37c-15.78-41.209-46.853-75.547-86.225-95.439 43.593-26.87 72.715-75.049 72.715-129.908 0-84.086-68.409-152.496-152.496-152.496S103.503 119.393 103.503 203.48c0 54.859 29.123 103.04 72.715 129.91-39.371 19.891-70.445 54.228-86.225 95.439a249.028 249.028 0 0 1-3.453-3.37C41.277 380.194 16.349 320.013 16.349 256S41.277 131.806 86.541 86.541 191.986 16.349 256 16.349s124.194 24.928 169.458 70.192S495.65 191.986 495.65 256s-24.927 124.194-70.192 169.458z"
            />
          </svg>
        </div>
        {data ? (
          <div className="flex flex-col justify-start h-full items-start w-1/2 py-10">
            <div>
              <div className="text-4xl m-2">
                Name: <span className="text-accent">{data.user_name}</span>
              </div>
            </div>
            <div>
              <div className="text-4xl m-2">
                Registered Email:{" "}
                <span className="text-accent">{userEmail}</span>
              </div>
            </div>
            <div>
              <div className="text-4xl m-2">
                No. of Passwords Saved:{" "}
                <span className="text-accent">{data.count_passwords}</span>
              </div>
            </div>
            <div>
              <div className="text-4xl m-2">
                No. of Vaults:{" "}
                <span className="text-accent">{data.count_vaults}</span>
              </div>
            </div>
          </div>
        ) : (
          <span className="loading loading-infinity loading-xs"></span>
        )}
      </div>
    </div>
  );
};

export default Profile;
