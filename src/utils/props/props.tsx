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
  page:string;
  name:string;
  id:string;
};

export type HeadingProps = {
  primaryHeading?: string;
  secondaryHeading?: string;
  tertiaryHeading?: string;
};

export type ItemCardProps = {
  heading?: string;
  description?: string;
  imageSource?:any,
  imageAlt?:any,
  imageClassname?:string,
};

export type AuthInputProps = {
  outerDiv:string | undefined;
  labelName:string;
  labelFor:string;
  isRequired:boolean;
  inputType:string;
  inputAutocomplete:string;
  inputClassname:string | undefined;
  inputValue:string | number | string[] | undefined
  inputOnChange:React.ChangeEventHandler<HTMLInputElement> | undefined
  children:React.JSX.Element|null;
}