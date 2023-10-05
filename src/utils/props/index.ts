export type SelectorProps = {
  data: any;
  selected: string;
  setSelected: React.Dispatch<string|any>;
  id: any;
};

export type SidebarProps = {
  id:string|any;
  isLoading:boolean;
  vehicle_data:vehicleDataProps[];
  isTab: boolean;
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  page:string;
  theme:string|any;
};

export type GetUserDataComponentProps = {
  heading:string;
  page:string;
  isRequired:boolean;
  userId:string|null;
  userEmail:string|null;
  formDiv:string;
  buttonName:string;
}

export type YourVehicleProps = {
    isLoading:boolean;
    vehicleData:vehicleDataProps[];
    isTab:boolean;
    setIsOpen:(value: React.SetStateAction<boolean>) => void;
    page:string;
}

export type VehicleUsageProps ={
  MaxTemp:string | null | undefined;
  MinTemp:string | null | undefined;
  unit:string;
  setDistanceValue:(val: number | undefined) => string | number | undefined
} 

export type BatteryHealthProps = {
  SoH:number|undefined;
}

export type BasicCarDataProps = {
  heading: string;
  data:string;
  icon:React.ReactNode;
}

export type vehicleInfoProps = {
  Odometer:number|undefined;
  Brand:string|null|undefined;
  Model:string|null|undefined;
  Year:number|null|undefined;
  Vin:string|null|undefined;
  unit:string;
  batterCapacity:number|null|undefined;
  setDistanceValue:(val: number | undefined) => string | number | undefined
}

export type CharginPatternProps ={
    avgSoC:number|null|undefined;
    chargeRate:number|null|undefined;
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
    distance:number|undefined;
    lastUpdated:string|undefined;
  }
};

export interface vehicleCalcultedDataProps {
  avgDailyMiles: {
    avgValue: number;
    currentOdometerReading: number;
    prevMonthOdometerReading: number | null;
  };
  certifiedRange: number;
  chargeRateData: {
    avgChargingRate: number;
    currentChargeRate: number | null;
  };
  connectorType: string;
  rangeData: {
    avgRealRange: number;
    currentRange: number;
    maxRange: number;
    minRange: number | null;
  };
  socData: {
    avgValue: number;
    max: number;
    min: number;
  };
  soh: number;
  temperatureRange: {
    max: number;
    min: number;
  };
  totalChargingSessions: number;
}

export type VendorCountProp = {
  vendor:string;
  count:number;
}

export type DashboardLayoutProps = {
  children:any;
  page:string;
}

export type DashboardNavbarProps = {
  setIsOpen: any;
  isOpen: boolean;
  page:string | string[] | undefined;
  name:string|any;
  id:string|any;
  isTab:boolean;
  userImage:string;
  isImageLoading:boolean;
};

export type UserSideMenuProps = {
  name:string|any;
  id:string;
  userImage:string;
  isImageLoading:boolean;
}

export type UserImageProps ={
  userImage:string;
  imageWidth:number;
  imageHeight:number;
  imageSize?:string;
  svgClassName:string;
  isLoading:boolean;
  fontSize:number;
  // setUserImage:React.Dispatch<React.SetStateAction<string>>;
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