import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import ProfileData from "./ProfileData";
import ProfileBooks from "./ProfileBooks";

const Profile = ({
  profile: { profile, loading },
  auth,
  match,
  getProfileById,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  if (profile === null || loading) return "Loading...";

  return (
    <>
      <Link className="btn btn-light" to="/profiles">
        Back to Profiles
      </Link>
      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.user._id && (
          <Link className="btn btn-dark" to="/edit-profile">
            Edit Profile
          </Link>
        )}
      <div className="profile-grid my-1">
        <ProfileData profile={profile} />
        <ProfileBooks books={profile.books} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
