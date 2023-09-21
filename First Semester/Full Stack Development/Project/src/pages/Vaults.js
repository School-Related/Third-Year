import React from "react";
import { useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { IconArrowRight, IconEraser, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import select_image from "../utils/images";
import axios from "axios";
import { BaseUrlContext } from "../context/BaseUrlContext";
import { UserInfoContext } from "../context/UserInfoContext";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

const Vaults = () => {
  const base_url = React.useContext(BaseUrlContext).baseUrl;
  const userEmail = React.useContext(UserInfoContext).userEmail;
  useEffect(() => {
    const html = document.querySelector("html");
    html.classList.remove("overflow-hidden");
  }, []);

  const [vaults, setVaults] = React.useState([]);
  const [deleteVaultID, setdeleteVaultID] = React.useState(null);
  const [newVaultName, setNewVaultName] = React.useState("");
  const [newVaultDescription, setNewVaultDescription] = React.useState("");

  const { theme } = React.useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === "light") {
      const light_button = document.getElementById("light_button");
      light_button.click();
    } else {
      const dark_button = document.getElementById("dark_button");
      dark_button.click();
    }
    if (vaults.length === 0) {
      getVaults();
    }
  }, [vaults, theme]);

  const handleDeleteVault = async () => {
    const response = await axios
      .post(
        `${base_url}/delete_vault`,
        {},
        {
          params: {
            vault_id: deleteVaultID,
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
    if (response.data.message === "simulation") {
      alert("Vault Deleted");
    } else if (response.data.message === "success") {
      setVaults([]);
      const toast = document.querySelector(".toast");
      toast.classList.remove("hidden");
      const toast_content = document.getElementById("toast_content");
      toast_content.innerHTML = "Vault Deleted";
      setTimeout(() => {
        toast.classList.add("hidden");
      }, 3000);
    } else if (response.data.message === "failure") {
      const toast = document.querySelector(".toast");
      toast.classList.remove("hidden");
      const toast_content = document.getElementById("toast_content");
      toast_content.innerHTML = "Could not Delete Vault";
      setTimeout(() => {
        toast.classList.add("hidden");
      }, 3000);
    }
    setdeleteVaultID(null);
  };

  const getVaults = async () => {
    const response = await axios
      .post(
        `${base_url}/get_vaults`,
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
      setVaults([
        {
          id: 1,
          name: "Favourifgtes",
          description: "Your Favourtites",
        },
        {
          id: 2,
          name: "Passwords",
          description: "The place for your passwords",
        },
        {
          id: 3,
          name: "Cards",
          description: "Safely Store your cards",
        },
      ]);
    } else {
      // set vaults but also set the image for each vault
      response.data.data.forEach((vault) => {
        vault.vault_image = select_image()["image"];
      });
      setVaults(response.data.data);
    }
  };

  const handleAddNewVaultSave = async () => {
    const modal = document.getElementById("my_modal_3");
    modal.close();

    // check if the fields are set:
    if (newVaultName === "" || newVaultDescription === "") {
      alert("Please fill all the fields");
      return;
    }

    // send request to server to add a new vault.
    const response = await axios
      .post(
        `${base_url}/add_vault`,
        {},
        {
          params: {
            vault_name: newVaultName,
            vault_description: newVaultDescription,
            user_email: userEmail,
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
    if (response.data.message === "simulation") {
      alert("Vault Added");
    } else if (response.data.message === "success") {
      setVaults([]);
    } else if (response.data.message === "failure") {
      // toast
      const toast = document.querySelector(".toast");
      toast.classList.remove("hidden");
      const toast_content = document.getElementById("toast_content");
      toast_content.innerHTML = "Vault Already Exists";
      setTimeout(() => {
        toast.classList.add("hidden");
      }, 3000);
    }
  };
  return (
    <div>
      <div className="h-32 bg-transparent p-10 m-4 rounded-3xl flex justify-between">
        <div className="flex-1 flex items-center">
          <h1 className="text-5xl w-full font-bold text-base-content">
            Your Vaults
          </h1>
        </div>
        <div className="flex items-center">
          <button
            className="btn bg-secondary-focus border-none text-2xl btn-lg hover:bg-success hover:text-success-content flex items-center gap-2 text-secondary-content"
            onClick={() => {
              const modal = document.getElementById("my_modal_3");
              modal.showModal();
            }}
          >
            Add Vaults
            <span className="text-secondary-content"></span>
            <IconPlus className="text-5xl text-secondary-content" />
          </button>
          {/* <button className="btn btn-success">Edit Vaults</button> */}
        </div>
      </div>
      <div>
        <div className="overflow-x-auto p-8 px-20 flex flex-wrap justify-center">
          {vaults.length > 0
            ? vaults.map((vault) => {
                return (
                  <div className="card w-1/4 h-72 bg-base-100 shadow-xl image-full m-4">
                    <div
                      style={{
                        backgroundImage: `url("${vault.vault_image}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                      className="image-full rounded-xl h-full w-full"
                    ></div>
                    <div className="card-body">
                      <div className="card-title text-2xl flex justify-between">
                        {vault.vault_name}
                        <div
                          className=" w-8 h-8 hover:scale-110 duration-200 transition-all transform-gpu"
                          onClick={() => {
                            setdeleteVaultID(vault.vault_id);
                            const modal = document.getElementById("my_modal_1");
                            modal.showModal();
                          }}
                        >
                          <IconEraser className="h-8 w-8" />
                        </div>
                      </div>
                      <p className="text-2xl">{vault.vault_description}</p>
                      <div className="card-actions justify-end">
                        <button
                          className="btn btn-primary btn-lg"
                          onClick={() => {
                            navigate(
                              `/vaults/${vault.vault_id}/${vault.vault_name}`,
                            );
                          }}
                        >
                          {" "}
                          Open
                          <IconArrowRight className="text-2xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            : "No Vaults Found"}
        </div>
      </div>
      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box">
          <div className="font-bold text-3xl">Add New Vault</div>
          <div className="flex gap-4 flex-col">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-xl">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter Name Here"
                className="input input-bordered w-full max-w-xs"
                value={newVaultName}
                onChange={(e) => setNewVaultName(e.target.value)}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-xl">Description</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={newVaultDescription}
                onChange={(e) => setNewVaultDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={handleAddNewVaultSave}>
              Save
            </button>
          </div>
        </form>
      </dialog>
      <div className="toast toast-end duration-300 transform-gpu ease-in-out hidden">
        <div className="alert alert-success bg-primary">
          <span className="flex items-center gap-4 text-2xl">
            <CheckBadgeIcon className="w-10 h-10" />
            <p id="toast_content">Vault Added</p>
          </span>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <div className="font-bold text-3xl">Are You Sure? </div>
          <p className="py-4">
            Are you sure you want to delete this vault? This will delete all
            Passwords in the Vault, and it is irreversable!
          </p>
          <div className="modal-action flex gap-4">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={handleDeleteVault}>
              Yes, Delete!
            </button>
            <button className="btn">NO!</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default Vaults;
