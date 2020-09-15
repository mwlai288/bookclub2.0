import React from "react";
import { Link } from "react-router-dom";
const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    username,
    bio,
    genres,
    social,
  },
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        Likes: <p className="my-1">{genres.join(",")}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileItem;
