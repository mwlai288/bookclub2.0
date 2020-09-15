import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <h1 className="large text-primary">Fellow Readers</h1>
          <p className="lead">
            <i className="fas fa-book-reader">
              Browse and connect with other avid readers
            </i>
          </p>

          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
