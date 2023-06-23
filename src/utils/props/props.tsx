//! TODO: Change to proper datatypes
export type SelectorProps = {
  data: any;
  selected: any;
  setSelected: any;
  id: any;
};

export type SidebarProps = {
  isTab: any;
  isOpen: any;
  setIsOpen: any;
};

export type DashboardNavbarProps = {
  setIsOpen: any;
  isOpen: any;
};

export type HeadingProps = {
  primaryHeading?: string;
  secondaryHeading?: string;
  tertiaryHeading?: string;
};

export type ItemCardProps = {
  heading?: string;
  description?: string;
};
