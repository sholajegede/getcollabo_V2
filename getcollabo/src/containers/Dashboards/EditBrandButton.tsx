import React from 'react';
import { Link } from 'react-router-dom';
import ButtonSecondary from 'shared/Button/ButtonSecondary';

const EditBrandButton = ({ brandProfile }) => {
  if (
    !brandProfile.businessName ||
    !brandProfile.logo ||
    !brandProfile.desc ||
    !brandProfile.industry
  ) {
    return null; // Don't show the button if any of the required properties are missing
  }

  return (
    <Link to={`/update/${brandProfile._id}`}>
      <ButtonSecondary sizeClass="px-4 py-1.5 sm:px-5">
        Edit Profile
      </ButtonSecondary>
    </Link>
  );
};

export default EditBrandButton;
