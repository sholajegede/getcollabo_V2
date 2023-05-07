import React, { FC, useState } from "react";
import NcDropDown, { NcDropDownItem } from "shared/NcDropDown/NcDropDown";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalReportItem from "./ModalReportItem";
import ModalTransferToken from "./ModalTransferToken";

export interface NftMoreDropdownProps {
  containerClassName?: string;
  iconClass?: string;
  dropdownPosition?: "up" | "down";
  actions?: { id: string; name: string; icon?: string; href?: string }[];
}

const actionsDefault: NftMoreDropdownProps["actions"] = [
  { id: "report", name: "Report abuse", icon: "las la-flag" },
];

const NftMoreDropdown: FC<NftMoreDropdownProps> = ({
  containerClassName = "py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer",
  iconClass = "w-4 h-4 sm:h-5 sm:w-5",
  dropdownPosition = "down",
  actions = actionsDefault,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTransfering, setIsTransfering] = useState(false);

  const openModalEdit = () => setIsEditing(true);
  const closeModalEdit = () => setIsEditing(false);

  const openModalReport = () => setIsReporting(true);
  const closeModalReport = () => setIsReporting(false);

  const openModalDelete = () => setIsDeleting(true);
  const closeModalDelete = () => setIsDeleting(false);

  const openModalTransferToken = () => setIsTransfering(true);
  const closeModalTransferToken = () => setIsTransfering(false);

  const handleClickDropDown = (item: NcDropDownItem) => {
    if (item.href) {
      return;
    }

    if (item.id === "edit") {
      return openModalEdit();
    }
    if (item.id === "report") {
      return openModalReport();
    }
    if (item.id === "delete") {
      return openModalDelete();
    }
    if (item.id === "transferToken") {
      return openModalTransferToken();
    }
    return;
  };

  const renderMenu = () => {
    return (
      <NcDropDown
        className={` ${containerClassName} `}
        iconClass={iconClass}
        data={actions}
        panelMenusClass={
          dropdownPosition === "up"
            ? "origin-bottom-right bottom-0 "
            : "origin-top-right !w-44 sm:!w-52"
        }
        onClick={handleClickDropDown}
      />
    );
  };

  return (
    <div className="">
      {renderMenu()}
      <ModalReportItem
        show={isReporting}
        onCloseModalReportItem={closeModalReport}
      />
      <ModalEdit show={isEditing} onCloseModalEdit={closeModalEdit} />

      <ModalDelete show={isDeleting} onCloseModalDelete={closeModalDelete} />
      <ModalTransferToken
        show={isTransfering}
        onCloseModalTransferToken={closeModalTransferToken}
      />
    </div>
  );
};

export default NftMoreDropdown;
