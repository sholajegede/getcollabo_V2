import React from 'react';
import { Link } from 'react-router-dom';
import ButtonSecondary from 'shared/Button/ButtonSecondary';

const EditProfileButton = ({ influencerProfile }) => {
  if (
    !influencerProfile.username ||
    !influencerProfile.displayName ||
    !influencerProfile.img ||
    !influencerProfile.industry ||
    !influencerProfile.about
  ) {
    return null; // Don't show the button if any of the required properties are missing
  }

  return (
    <Link to={`/edit-profile/${influencerProfile._id}`}>
      <ButtonSecondary sizeClass="px-4 py-1.5 sm:px-5">
        Edit Profile
      </ButtonSecondary>
    </Link>
  );
};

export default EditProfileButton;
