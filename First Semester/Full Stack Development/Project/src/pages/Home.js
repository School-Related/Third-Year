import React from "react";
import "../css/Home.css";

import { ThemeContext } from "../context/ThemeContext";
import { useEffect } from "react";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { NavLink, useNavigate } from "react-router-dom";

const Generator_Home = () => {
	const navigate = useNavigate();
	const { theme } = React.useContext(ThemeContext);
	useEffect(() => {
		if (theme === "light") {
			const light_button = document.getElementById("light_button");
			light_button.click();
		} else {
			const dark_button = document.getElementById("dark_button");
			dark_button.click();
		}
	});

	return (
		<div className="" id={theme === "light" ? "divbg" : "divbgdark"}>
			<div className="flex gap-24 justify-between">
				<div className="flex-1">
					<div className="text-[8rem] text-netural titillium p-8 m-8 line leading-tight">
						The Only Password Manager you need!
					</div>
					<div className="p-8 m-8 text-5xl rubik text-base-content">
						Never Forget, or remember a password ever again with
						Anti Brutus. A password Manager unlike any other, with a
						focus on security and ease of use. Built by a team of{" "}
						<span className="text-accent">
							Bleeding edge Cyber security Professionals from MIT.
						</span>
					</div>
					<div className="p-8 m-8 mt-0 pt-0 text-5xl rubik text-base-content">
						Head over to your Vaults to Begin!
					</div>
					<button
						className="fancybutton border p-8  ml-16 flex gap-4"
						onClick={() => {
							navigate("/vaults");
						}}
					>
						<p className="text-base-content">Vaults</p>
						<ArrowRightCircleIcon className="w-12 h-12" />
					</button>
				</div>
				<div id="logo" className="w-[45rem] m-8 p-8 mr-32 mt-16"></div>
			</div>

			{/* section */}
			<div className="text-8xl text-netural titillium p-8 m-8 line leading-tight text-center">
				How Do we do it?
			</div>
			<div className="flex gap-24 justify-between">
				<div
					id={theme === "light" ? "howwedo" : "howwedodark"}
					className="w-[90rem] h-[30rem] ml-32 m-8 p-8 mt-16"
				></div>

				<div className="p-16 m-8 text-4xl rubik text-base-content w-11/12">
					Anti Brutus uses a combination of the latest in Cyber
					Security techniques and the most advanced encryption
					algorithms to protect your data. We use a combination of
					Salting, Hashing with SHA-256 and Secure SQL Databases with
					fortified backend servers to ensure that your data is safe
					from any third-party. We also use a combination of the
					latest in authentication techniques to ensure that only you
					can access your data.
					<br />
				</div>
			</div>
			<div className="divider"></div>

			{/* section */}
			<div className="text-8xl text-netural titillium p-8 m-8 line leading-tight text-center">
				How Do I use this?
			</div>
			<div className="flex gap-24 justify-between">
				<div className="p-16 m-8 text-4xl rubik text-base-content w-11/12">
					Its already difficult remembering all your passwords, and
					with more and more websites that require login, it is
					becoming increasingly difficult to remember all your
					passwords. This is where{" "}
					<span className="text-secondary">Anti Brutus</span> comes
					in.
					<br></br>
					<br></br>
					Anti Brutus is a password manager that allows you to store
					all your passwords in one place, and access them with a{" "}
					<span className="text-secondary">
						{" "}
						Single Master Password.
					</span>{" "}
					This way, you only need to remember one password, and you
					can access all your passwords from anywhere in the world.
					<br />
					<br />
					It is however, also difficult to maintain strong passwords
					for each new website that you visit, for this, we offer our{" "}
					<span className="text-secondary">
						{" "}
						Password Generator
					</span>{" "}
					which allows you to generate strong passwords for each new
					website that you visit, and store them in your vault.
					<br />
					<button className="fancybutton border p-8 flex gap-4 mt-12">
						<NavLink to="/generator">
							<p className="text-base-content">
								Password Generator
							</p>
						</NavLink>
						<ArrowRightCircleIcon className="w-12 h-12" />
					</button>
				</div>
				<div
					id={theme === "light" ? "fpasssvg" : "fpasssvgdark"}
					className="w-[90rem] h-[30rem] ml-32 m-8 p-8 mt-16"
				></div>
			</div>
			<br></br>
			<div className="divider"></div>
			<div className="text-8xl text-netural titillium p-8 m-8 line leading-tight text-center">
				What are Vaults?
			</div>
			<div className="flex gap-24 justify-between">
				<div
					id={theme === "light" ? "vaultspng" : "vaultspngdark"}
					className="w-[90rem] h-[30rem] ml-32 m-8 p-8 mt-16"
				></div>

				<div className="p-16 m-8 text-4xl rubik text-base-content w-11/12">
					Vaults are a way to organize your passwords. You can create
					as many vaults as you want, and store passwords in each
					vault. This way, you can organize your passwords based on
					their use.
					<br />
					<br />
					You can save various kinds of sensitive data in your vaults,
					like your credit card details, your bank account details,
					your Aadhar Card Info, etc. There are pre built templates
					for all of these to choose from.
					<br />
					<br />
					<button
						className="fancybutton border p-8 flex gap-4"
						onClick={() => {
							navigate("/vaults");
						}}
					>
						<p className="text-base-content">Vaults</p>
						<ArrowRightCircleIcon className="w-12 h-12" />
					</button>
				</div>
			</div>
			<div className="divider"></div>
		</div>
	);
};

export default Generator_Home;
