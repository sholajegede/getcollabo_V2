import React, { FC } from "react";
import Heading from "shared/Heading/Heading";

export interface HeaderFilterSectionProps {
  className?: string;
}

const HeaderFilterSection: FC<HeaderFilterSectionProps> = ({
  className = "mb-0",
}) => {

  return (
    <div className={`flex flex-col relative ${className}`}>
      <Heading>{"Featured Creators"}</Heading>
    </div>
  );
};

export default HeaderFilterSection;
