import React from "react";
import { Link } from "react-router-dom";

const DashboardAction = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary" /> Edit Profile
      </Link>
      <Link to="/search-books" className="btn btn-light">
        <i className="fas fa-user-circle text-primary" /> Search Book
      </Link>
    </div>
  );
};

export default DashboardAction;
