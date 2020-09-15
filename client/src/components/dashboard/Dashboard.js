import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profile";
import DashboardAction from "./DashboardAction";
import BookShelf from "./BookShelf";
import ProfileForm from "../profile-form/ProfileForm";

const Dashboard = ({
  getProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return loading && profile === null ? (
    "Loading..."
  ) : (
    <>
      <h1>Dashboard</h1>
      <p>Welcome {user && user.name}</p>

      {profile !== null ? (
        <>
          <DashboardAction />
          {profile.books && (
            <div className="book-grid">
              <BookShelf books={profile.books} />
            </div>
          )}
        </>
      ) : (
        <>
          <p>Please create a profile</p>
          <ProfileForm />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile })(Dashboard);
