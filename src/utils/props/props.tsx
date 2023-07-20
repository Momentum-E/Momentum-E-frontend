//! TODO: Change to proper datatypes
export type SelectorProps = {
  data: any;
  selected: any;
  setSelected: any;
  id: any;
};

export type SidebarProps = {
  id:string|any;
  isLoading:boolean;
  vehicle_data:vehicleDataProps;
  isTab: boolean;
  isOpen: boolean;
  setIsOpen: any;
};

export type YourVehicleProps = {
    isLoading:boolean;
    vehicleData:vehicleDataProps;
    isTab:boolean;
    setIsOpen:any;
}

export type vehicleDataProps = {
  id:string;
  vendor:string;
  isReachable:boolean|null;
  lastSeen:string;
  chargeState:{
    batteryCapacity:number;
    batteryLevel:number;
    chargeRate:number;
    isFullyCharged:boolean;
    isCharging:boolean;
    lastUpdated:string;
    range:number;
  }
  information:{
      vin:string|null;
      brand:string|null;
      model:string|null;
      year: number|null;
  },
  odometer:{
    distance:number|null;
    lastUpdated:string|null;
  }
}[];

export type DashboardNavbarProps = {
  setIsOpen: any;
  isOpen: boolean;
  page:string | string[] | undefined;
  name:string|any;
  id:string|any;
  isTab:boolean;
};

export type UserSideMenuProps = {
  name:string|any;
  id:string;
}

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

export type AuthListBoxProps = {
  labelFor:string;
  isRequired:boolean;
  labelName:string;
  data:{ type: string; }[];
  value:any;
  OnChange:React.ChangeEventHandler<HTMLInputElement> | undefined;
}