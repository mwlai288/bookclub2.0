import React, { useState } from "react";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import { Link } from "react-router-dom";

const ProfileForm = ({ createProfile }) => {
  const [formData, setFormData] = useState({
    bio: "",
    username: "",
    genres: "",
    instagram: "",
    facebook: "",
    twitter: "",
  });

  const { bio, username, genres, instagram, facebook, twitter } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData);
  };

  const [socialInputs, setSocialInputs] = useState(false);

  return (
    <>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Add some changes to your profile
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            placeholder="* A unique username for your profile url."
            name="username"
            value={username}
            onChange={onChange}
            type="text"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* List your favorite genres. Enter at least one."
            name="genres"
            value={genres}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Tell us a little about yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          />
        </div>

        <div className="my-2">
          <button
            onClick={() => setSocialInputs(!socialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {socialInputs && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </div>
          </>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile })(ProfileForm);
