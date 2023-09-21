import {
  IconAlertCircleFilled,
  IconDeviceFloppy,
  IconEye,
  IconEyeClosed,
  IconPencilBolt,
  IconPlus,
  IconSearch,
  IconTrashFilled,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BaseUrlContext } from "../context/BaseUrlContext";
import { UserInfoContext } from "../context/UserInfoContext";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import "../css/Vault.css";

const VaultContent = () => {
  // get context data
  const user_email = React.useContext(UserInfoContext).userEmail;
  const base_url = React.useContext(BaseUrlContext).baseUrl;
  const [selected_password, setSelectedPassword] = React.useState(null);
  const [dontHavePasswords, setDontHavePasswords] = React.useState(false);
  const [passwords, setPasswords] = React.useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passVisible, setPassVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  let simulation_passwords = [
    {
      id: 1,
      name: "Facebook",
      username: "username",
      password: "password",
      url: "https://facebook.com",
      description: "Your Favourtites",
      date: "12/12/12",
      icon: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.facebook.com/&size=128",
    },
    {
      id: 2,
      name: "Instagram",
      username: "username",
      password: "password",
      url: "https://instagram.com",
      description: "The place for your passwords",
      date: "12/12/12",
      icon: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.instagram.com/&size=128",
    },
    {
      id: 3,
      name: "Google",
      username: "username",
      password: "password",
      url: "https://google.com",
      description: "The place for your passwords",
      date: "12/12/12",
      icon: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://google.com&size=128",
    },
    {
      id: 3,
      name: "Twitter",
      username: "username",
      password: "password",
      url: "https://twitter.com",
      description: "Safely Store your cards",
      date: "12/12/12",
      icon: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://twitter.com&size=128",
    },
    {
      id: 3,
      name: "Icones",
      username: "username",
      password: "password",
      url: "https://icones.js.org/",
      description: "Safely Store your cards",
      date: "12/12/12",
      icon: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://icones.js.org&size=128",
    },
    {
      id: 3,
      name: "Whatsapp",
      username: "username",
      password: "password",
      url: "https://web.whatsapp.com/",
      description: "Safely Store your cards",
      date: "12/12/12",
      icon: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://web.whatsapp.com/&size=128",
    },
    {
      id: 3,
      name: "Chat GPT",
      username: "username",
      password: "password",
      url: "https://chat.openai.com/",
      description: "Safely Store your cards",
      date: "12/12/12",
      icon: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://chat.openai.com/&size=128",
    },
    {
      id: 3,
      name: "Amazon",
      username: "username",
      password: "password",
      url: "https://www.amazon.in/",
      description: "Safely Store your cards",
      date: "12/12/12",
      icon: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.amazon.in/&size=128",
    },
    {
      id: 3,
      name: "Github",
      username: "username",
      password: "password",
      url: "https://github.com",
      description: "Safely Store your cards",
      date: "12/12/12",
      icon: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://github.com&size=128",
    },
  ];

  useEffect(() => {
    const html = document.querySelector("html");
    html.classList.add("overflow-hidden");
    // get the passwords from the database
    if (passwords.length === 0) {
      if (!dontHavePasswords) {
        getPasswords();
      }
    }
  }, [passwords, dontHavePasswords]);

  const params = useParams();

  const getPasswords = async () => {
    const response = await axios
      .post(
        `${base_url}/get_vault_data`,
        {},
        {
          params: {
            user_email: user_email,
            vault_id: params.id,
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
      setPasswords(simulation_passwords);
    } else {
      // set vaults but also set the image for each vault
      if (response.data.data.length === 0) {
        setPasswords([]);
        setDontHavePasswords(true);
      } else {
        setPasswords(response.data.data);
      }
    }
  };

  const handleDelete = async () => {
    if (selected_password.pass_id === -1) {
      // alert("this password is not saved!");
      const toast_div = document.querySelector("#toast_problem");
      const toast_content = document.querySelector("#toast_content_problem");
      toast_content.innerHTML = "This password is not saved! Delete Failed!";
      toast_div.classList.remove("hidden");
      setTimeout(() => {
        toast_div.classList.add("hidden");
      }, 2000);
      return;
    }
    // send a request to the backend to delete the password from the database.
    const response = await axios
      .post(
        `${base_url}/delete_vault_data`,
        {},
        {
          params: {
            pass_id: selected_password.pass_id,
          },
        },
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
        alert("server not running! a simulated response is being sent");
        const response = {
          data: {
            message: "simulation",
          },
        };
        return response;
      });
    if (response.data.message === "success") {
      const toast_div = document.querySelector(".toast");
      const toast_content = document.querySelector("#toast_content");
      toast_content.innerHTML = "Password Deleted!";
      toast_div.classList.remove("hidden");
      setTimeout(() => {
        toast_div.classList.add("hidden");
      }, 2000);
      getPasswords();
      setSelectedPassword(null);
    } else if (response.data.message === "simulation") {
      const toast_div = document.querySelector(".toast");
      const toast_content = document.querySelector("#toast_content");
      toast_content.innerHTML = "Simulated Deleted!";
      toast_div.classList.remove("hidden");
      setTimeout(() => {
        toast_div.classList.add("hidden");
      }, 2000);
    } else if (response.data.message === "failure") {
      const toast_div = document.querySelector("#toast_problem");
      const toast_content = document.querySelector("#toast_content_problem");
      toast_content.innerHTML = "Could not Delete Password! Try Again";
      toast_div.classList.remove("hidden");
      setTimeout(() => {
        toast_div.classList.add("hidden");
      }, 2000);
    } else if (response.data.message === "something went wrong") {
      // comment.innerHTML = "Login Failed! Try Again!";
      // alert("something went wrong! try again!");
      // show toast.
      const toast_div = document.querySelector("#toast_problem");
      const toast_content = document.querySelector("#toast_content_problem");
      toast_content.innerHTML = "Something Went Wrong! Login Again.";
      toast_div.classList.remove("hidden");
      setTimeout(() => {
        toast_div.classList.add("hidden");
      }, 2000);
    }
  };

  const handleSave = async () => {
    // save the password to the database
    // update the password in the passwords array

    // check if the fields are fileld first.
    if (
      name === "" ||
      username === "" ||
      password === "" ||
      url === "" ||
      description === ""
    ) {
      const toast_div = document.querySelector("#toast_problem");
      const toast_content = document.querySelector("#toast_content_problem");
      toast_content.innerHTML = "Please fill all the fields!";
      toast_div.classList.remove("hidden");
      setTimeout(() => {
        toast_div.classList.add("hidden");
      }, 2000);
      return;
    }

    if (selected_password.pass_id === -1) {
      // send a request to the backend to add a new password to the database.
      const response = await axios
        .post(
          `${base_url}/add_vault_data`,
          {},
          {
            params: {
              vault_id: params.id,
              user_email: user_email,
              pass_name: name,
              user_name: username,
              password: password,
              url: url,
              description: description,
              icon: `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=128`,
            },
          },
        )
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.error(error);
          alert("server not running! a simulated response is being sent");
          const response = {
            data: {
              message: "simulation",
            },
          };
          return response;
        });
      if (response.data.message === "success") {
        const toast_div = document.querySelector(".toast");
        const toast_content = document.querySelector("#toast_content");
        toast_content.innerHTML = "Password Saved!";
        toast_div.classList.remove("hidden");
        setTimeout(() => {
          toast_div.classList.add("hidden");
        }, 2000);
        setDontHavePasswords(false);
        getPasswords();
        setSelectedPassword(null);
      } else if (response.data.message === "simulation") {
        const toast_div = document.querySelector(".toast");
        const toast_content = document.querySelector("#toast_content");
        toast_content.innerHTML = "Simulated Saved!";
        toast_div.classList.remove("hidden");
        setTimeout(() => {
          toast_div.classList.add("hidden");
        }, 2000);
      } else if (response.data.message === "failure") {
        const toast_div = document.querySelector("#toast_problem");
        const toast_content = document.querySelector("#toast_content_problem");
        toast_content.innerHTML = "Could not save Password! Try Again";
        toast_div.classList.remove("hidden");
        setTimeout(() => {
          toast_div.classList.add("hidden");
        }, 2000);
      } else if (response.data.message === "user not found") {
        // comment.innerHTML = "Login Failed! Try Again!";
        // alert("something went wrong! try again!");
        // show toast.
        const toast_div = document.querySelector("#toast_problem");
        const toast_content = document.querySelector("#toast_content_problem");
        toast_content.innerHTML = "Something Went Wrong! Login Agai.";
        toast_div.classList.remove("hidden");
        setTimeout(() => {
          toast_div.classList.add("hidden");
        }, 2000);
      }
    } else {
      // send a request to update the password in the database.
      const response = await axios
        .post(
          `${base_url}/update_vault_data`,
          {},
          {
            params: {
              vault_id: params.id,
              user_email: user_email,
              pass_id: selected_password.pass_id,
              pass_name: name,
              user_name: username,
              password: password,
              url: url,
              description: description,
              icon: `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=128`,
            },
          },
        )
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.error(error);
          alert("server not running! a simulated response is being sent");
          const response = {
            data: {
              message: "simulation",
            },
          };
          return response;
        });
      if (response.data.message === "success") {
        const toast_div = document.querySelector(".toast");
        const toast_content = document.querySelector("#toast_content");
        toast_content.innerHTML = "Password Saved!";
        toast_div.classList.remove("hidden");
        setTimeout(() => {
          toast_div.classList.add("hidden");
        }, 2000);
        setDontHavePasswords(false);
        getPasswords();
        setSelectedPassword(null);
      } else if (response.data.message === "simulation") {
        const toast_div = document.querySelector(".toast");
        const toast_content = document.querySelector("#toast_content");
        toast_content.innerHTML = "Simulated Saved!";
        toast_div.classList.remove("hidden");
        setTimeout(() => {
          toast_div.classList.add("hidden");
        }, 2000);
      } else if (response.data.message === "failure") {
        const toast_div = document.querySelector("#toast_problem");
        const toast_content = document.querySelector("#toast_content_problem");
        toast_content.innerHTML = "Could not save Password! Try Again";
        toast_div.classList.remove("hidden");
        setTimeout(() => {
          toast_div.classList.add("hidden");
        }, 2000);
      } else if (response.data.message === "something went wrong") {
        // comment.innerHTML = "Login Failed! Try Again!";
        // alert("something went wrong! try again!");
        // show toast.
        const toast_div = document.querySelector("#toast_problem");
        const toast_content = document.querySelector("#toast_content_problem");
        toast_content.innerHTML = "Something Went Wrong! Login Agai.";
        toast_div.classList.remove("hidden");
        setTimeout(() => {
          toast_div.classList.add("hidden");
        }, 2000);
      }
    }
  };
  return (
    <div>
      <div className="h-32 bg-transparent p-10 m-4 rounded-3xl flex justify-between items-center">
        <div className="flex-1 flex items-center">
          <h1 className="text-5xl w-full font-bold text-base-content">
            {params.name}
          </h1>
        </div>
        <div className="px-4 w-auto mr-10 text-2xl flex items-center gap-2 outline outline-1 rounded-full">
          <div className="rounded-full h-14 w-14 p-2 flex items-center justify-center">
            <IconSearch className="text-5xl text-base-content h-7 w-7" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="text-2xl h-14 w-full rounded-2xl border-none outline-none bg-transparent"
          />
        </div>
        <div className="flex items-center">
          <button
            className="btn bg-primary border-none text-2xl btn-lg hover:bg-primary-focus hover:text-primary-content flex items-center gap-2 text-primary-content"
            onClick={() => {
              // clear all fields.
              setName("");
              setUsername("");
              setPassword("");
              setUrl("");
              setDescription("");
              setSelectedPassword({
                pass_name: "New Password",
                pass_id: -1,
              });
            }}
          >
            New Password
            <span className="text-primary-content"></span>
            <IconPlus className="text-5xl text-primary-content" />
          </button>
          {/* <button className="btn btn-success">Edit Vaults</button> */}
        </div>
      </div>
      <div className="flex">
        <div className="overflow-x-hidden p-8 px-20 flex-1 h-[70vh] scroll-m-4 will-change-scroll scroll-smooth">
          {passwords.length !== 0 ? (
            <table className="table text-xl">
              {/* head */}
              <thead>
                <tr className="text-3xl text-base-content border-base-content outline rounded-ss-2xl rounded-se-2xl">
                  <th></th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody className="">
                {passwords.map((password) => {
                  return (
                    <tr
                      className="h-16 transition-all duration-200 transform-gpu hover:bg-base-200 hover:cursor-pointer border-base-content"
                      key={password.pass_id}
                      onClick={() => {
                        setSelectedPassword(password);
                        // set values as well from this password.
                        setName(password.pass_name);
                        setUsername(password.username);
                        setPassword(password.password);
                        setUrl(password.website_url);
                        setDescription(password.description);
                      }}
                    >
                      <td>
                        <img
                          src={password.icon}
                          className="h-12 w-12 rounded-full outline outline-2 outline-offset-2 outline-primary"
                          alt=""
                        />
                      </td>
                      <td className="hover:text-accent text-3xl transition-all duration-300">
                        {password.pass_name}
                      </td>
                      <td className="text-2xl">{password.username}</td>
                      <td className="text-2xl">{password.pass_date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="w-full h-full">
              <div className="text-4xl text-base-content text-center font-semibold m-8">
                Theres Nothing Here!
              </div>
              <div id="emptysvg" className="w-full h-2/3"></div>
            </div>
          )}
        </div>
        {selected_password ? (
          <div className="overflow-x-hidden p-8 px-20 flex-1 h-[70vh] scroll-m-4 will-change-scroll scroll-smooth">
            <div className="flex items-center justify-between">
              <div className="text-5xl font-bold text-center text-base-content">
                Details{" "}
                {selected_password ? `- ${selected_password.pass_name}` : null}
              </div>
              <button
                className="btn btn-primary btn-lg text-2xl"
                onClick={() => window.my_modal_3.showModal()}
              >
                {selected_password && selected_password.pass_id === -1
                  ? "Save"
                  : "Update"}
                <IconDeviceFloppy className="text-5xl text-primary-content h-8 w-8" />
              </button>
            </div>

            {/* textbox for name and username */}
            <div className="flex gap-16">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-xl">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-xl">UserName</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            {/* textbox for password */}
            <div className="flex gap-16 items-end mt-4">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-xl">Password</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type={passVisible ? "text" : "password"}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passVisible ? (
                    <IconEye
                      className="w-10 h-10"
                      onClick={() => {
                        setPassVisible(() => {
                          return !passVisible;
                        });
                      }}
                    />
                  ) : (
                    <IconEyeClosed
                      className="w-10 h-10"
                      onClick={() => {
                        setPassVisible(() => {
                          return !passVisible;
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              <button
                className="btn btn-md btn-secondary text-2xl items-center"
                onClick={() => {
                  // navigate to the password generator page.
                  navigate("/master");
                }}
              >
                Generate
                <IconPencilBolt className="text-5xl text-secondary-content h-8 w-8" />
              </button>
              <div className="flex items-center justify-center h-full w-fit">
                <div className="badge badge-lg outline outline-1 text-2xl p-4 mb-2 w-fit">
                  Length: {password.length}
                </div>
              </div>
            </div>
            {/* textbox for url */}
            <div className="form-control w-full max-w-xs mt-4">
              <label className="label">
                <span className="label-text text-xl">Website URL</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            {/* textbox for description */}
            <div className="mt-4 ">
              <label className="label">
                <span className="label-text text-xl">Description</span>
              </label>
              <textarea
                className="textarea textarea-secondary w-full"
                placeholder="Bio"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div>
              <button
                className="btn btn-lg btn-error text-2xl mt-12 flex items-center"
                onClick={() => {
                  window.my_modal_1.showModal();
                }}
              >
                <IconTrashFilled className="text-5xl text-error-content h-8 w-8" />
                DELETE
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Confirm</h3>
          <p className="py-4">Are you sure you sant to save changes?</p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </form>
      </dialog>
      <div className="toast toast-end duration-300 transform-gpu ease-in-out hidden">
        <div className="alert alert-success bg-primary">
          <span className="flex items-center gap-4 text-2xl">
            <CheckBadgeIcon className="w-10 h-10" />
            <p id="toast_content">Copied to Clipboard!</p>
          </span>
        </div>
      </div>
      <div
        className="toast toast-end duration-300 transform-gpu ease-in-out hidden"
        id="toast_problem"
      >
        <div className="alert alert-error bg-error">
          <span className="flex items-center gap-4 text-2xl">
            <IconAlertCircleFilled className="w-10 h-10" />
            <p id="toast_content_problem">Copied to Clipboard!</p>
          </span>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <div className="font-bold text-3xl">Are You Sure?</div>
          <p className="py-4">
            Are you sure you want to delete this password? It is irreversable!
          </p>
          <div className="modal-action flex gap-4">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={handleDelete}>
              Yes, Delete!
            </button>
            <button className="btn">NO!</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default VaultContent;
