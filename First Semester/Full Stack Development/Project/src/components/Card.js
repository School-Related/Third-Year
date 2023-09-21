import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import React from "react";
import { NavLink } from "react-router-dom";

const Card = (props) => {
  return (
    <div
      className="card w-[28rem] mediumshadow hover:scale-105 transform-gpu duration-200
        hover:shadow-2xl bg-primary hover:bg-primary-focus text-primary-content titillium"
    >
      <div className="card-body items-center text-center">
        <div className="card-title text-4xl mb-2">{props.title}</div>
        {props.icon}
        <div className="text-3xl py-10 px-3 outline outline-1 rounded-3xl text-primary-content">
          {props.text}
        </div>
        <div className="card-actions">
          <NavLink to={`/${props.title}`}>
            <button className="btn btn-outline text-xl text-primary-content mt-6">
              {props.title} <ArrowUpRightIcon className="w-5 h-5" />
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Card;
