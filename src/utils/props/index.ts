export type UserContextProps = {
  // Functions
  UpdateIdToken:() => Promise<void>;
  setDistanceValue:(val: number|null|undefined) => string | number | undefined;
  fetchUserImage:() => Promise<void>;

  // State Variables 
  userEmail:string;
  userOwnerType:string;
  userCity:string|undefined;
  userState:string|undefined;
  userCountry:string|undefined;
  userLocation:string;
  userId:string|null;
  vehicleCalcultedIdData: vehicleCalcultedDataProps | undefined;
  vehicleIdData: vehicleDataProps | undefined;
  userImage:string;
  isLoading:boolean;
  vehicleData:vehicleDataProps[];
  vehicleCalcultedData:Record<string, vehicleCalcultedDataProps>|undefined|null;
  name:string;
  unit:string;
  isImageLoading:boolean;
  temperatureData: temperatureDataProps;
  webSocket:WebSocket|null;
  // idToken:string|null

  // State Functions
  setVehicleData:React.Dispatch<React.SetStateAction<vehicleDataProps[]>>
  setVehicleCalcultedData:React.Dispatch<React.SetStateAction<Record<string, vehicleCalcultedDataProps>| undefined>>;
  setVehicleIdData: React.Dispatch<React.SetStateAction<vehicleDataProps | undefined>>;
  setVehicleCalcultedIdData: React.Dispatch<React.SetStateAction<vehicleCalcultedDataProps | undefined>>;
  setUnit:React.Dispatch<React.SetStateAction<string>>;
  setName:React.Dispatch<React.SetStateAction<string>>;
  setUserCity:React.Dispatch<React.SetStateAction<string>>;
  setUserState:React.Dispatch<React.SetStateAction<string>>;
  setUserCountry:React.Dispatch<React.SetStateAction<string>>;
  setUserEmail:React.Dispatch<React.SetStateAction<string>>;
  setUserImage:React.Dispatch<React.SetStateAction<string>>;
  setTemperatureData: React.Dispatch<React.SetStateAction<temperatureDataProps>>
}

export type temperatureDataProps = {
  minTemperature: number|null;
  maxTemperature: number|null;
}

export type SelectorProps = {
  data: any;
  selected: Record<any,any>;
  setSelected: React.Dispatch<string|any>;
  id: any;
};

export type SidebarProps = {
  NumberVehiclePaid:number|undefined;
  id:string|any;
  idToken:string|null;
  isLoading:boolean;
  vehicleData:vehicleDataProps[];
  isTab: boolean;
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  page:string;
  theme:string|any;
};

export type GetUserDataComponentProps = {
  heading:string;
  page:string;
  idToken?:string|null;
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
  avgDailyDistance:number|null| undefined;
  avgDistancePrevMonths:(number | null)[]|undefined;
  SoCMinRange:number|null| undefined;
  SoCMaxRange:number|null| undefined;
  avgRealRangeObserved:number|null| undefined;
  minRange:number|null| undefined;
  maxRange:number|null|undefined;
  certifiedRange:any;
  temperatureData:{
    minTemperature: number | null | undefined;
    maxTemperature: number | null | undefined;
  }
  unit:string;
  setDistanceValue:(val: number|null|undefined) => string | number | undefined
} 

export type BatteryHealthProps = {
  SoH:number|undefined|null;
  PrevMonthsSoH:(number | null)[]|null[]|number[]|undefined;
}

export type BasicCarDataProps = {
  heading: string;
  data:number|string|Date|React.JSX.Element|any;
  icon:React.ReactNode;
}

export type vehicleInfoProps = {
  Odometer:number|null|undefined;
  Brand:string|null|undefined;
  Model:string|null|undefined;
  Year:number|null|undefined;
  Vin:string|null|undefined;
  unit:string;
  batterCapacity:number|null|undefined;
  setDistanceValue:(val: number |null| undefined) => string | number | undefined
}

export type CharginPatternProps ={
    avgSoC:number|null|undefined;
    chargeRate:number|null|undefined;
    totalChargingSessions:number|null|undefined;
    powerDilveryState:string|undefined;
    connectorType:string|null|undefined
    batteryLevel:number|null|undefined;
    isCharging:boolean|undefined;
    timeRemaining:number|null|undefined;
}

export type vehicleDataProps = {
  Connected_On:string;
  Subs_fee:number;
  Vehicle_Type:string;
  id:string;
  vendor:string;
  plan:string;
  isReachable:boolean|null;
  lastSeen:string;
  chargeState:{
    batteryCapacity:number;
    batteryLevel:number;
    chargeLimit:number;
    chargeRate:number|null;
    isFullyCharged:boolean;
    isCharging:boolean;
    lastUpdated:string;
    range:number;
    isPluggedIn:boolean;
    chargeTimeRemaining:number|null;
    powerDeliveryState:string;
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
};

export type vehicleCalcultedDataProps = {
  avgDailyMiles:{
    avgDistancePrevMonths:(number | null)[];
    avgValue:number|null;
    prevMonthOdometerReading:number|null;
    currentOdometerReading:number|null;
  }
  certifiedRange:number|null;
  chargeRateData:{
    avgChargingRate:number|null;
    chargeEndTime:null|Date;
    chargeStartTime:null|Date;
    currentChargeRate:number|null;
    odometerReadingAfterCharging:number|null;
    totalEnergyConsumed:number|null;
  }
  connectorType:string|null;
  dataPointCollected:number|null;
  rangeData:{
    avgRealRange:number|null;
    currentRange:number|null;
    minRange:number|null;
    maxRange:number|null;
  }
  socData:{
    avgValue:number|null;
    min:number|null;
    max:number|null;
  }
  sohData:{
    currentSoh:number|null;
    prevMonthsSoh:(number|null)[]|null[]|number[]|undefined;
  }
  totalChargingSessions:number|null;
}

export type VehicleComponentProps = {
  vehicleIdData:vehicleDataProps|undefined|null;
  temperatureData:temperatureDataProps;
  vehicleCalculatedIdData:vehicleCalcultedDataProps|undefined|null;
  unit: string;
  userLocation: string;
  setDistanceValue:(val: number|null|undefined) => string|number|undefined;
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
  isTab:boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  page:string | string[];
  name:string|any;
  id:string|any;
};

export type UserSideMenuProps = {
  name:string|any;
  id:string;
}

export type UserImageProps ={
  userImage:string;
  imageWidth:number;
  imageHeight:number;
  imageSize?:string;
  svgClassName:string;
  isLoading:boolean;
  loaderSize:number;
}   

export type HeadingProps = {
  primaryHeading?: string;
  secondaryHeading?: string;
  tertiaryHeading?: string;
};

export type AuthInputProps = {
  outerDiv:string | undefined;
  labelName:string;
  disabled?:boolean;
  labelFor:string;
  isRequired:boolean;
  inputType:string;
  inputAutocomplete:string;
  inputClassname:string | undefined;
  inputValue:string | number | string[] | undefined
  inputOnChange:React.ChangeEventHandler<HTMLInputElement> | undefined
  children?:React.JSX.Element|null;
}

export type AuthListBoxProps = {
  isRequired:boolean;
  labelName:string;
  data: any;
  selected: Record<any,any>;
  setSelected: React.Dispatch<string|Record<any,any>>;
  id: string;
  // labelFor:string;
  // data:Record<any,any>[];
  // value:any;
  // OnChange:React.ChangeEventHandler<HTMLInputElement> | undefined;
}

// {
//   "userId":"61c3c5cf-98fd-4e64-a6a9-d4024724491d",
//   "eventName":"MODIFY",
//   "updatedData":{
//      "country":"Spain",
//      "city":"Madrid",
//      "vehicles_processed_data":{
//         "cb59389d-2a5f-49fd-8f20-e4806b9f5f04":{
//            "dataPointCollected":56,
//            "connectorType":"ChaDeMo",
//            "avgDailyMiles":{
//               "avgValue":3388.842105263158,
//               "currentOdometerReading":64388,
//               "prevMonthOdometerReading":0,
//               "avgDistancePrevMonths":[
//                  null,
//                  null,
//                  null,
//                  null,
//                  null,
//                  null,
//                  null,
//                  null,
//                  null,
//                  null,
//                  null,
//                  null
//               ]
//            },
//            "totalChargingSessions":0,
//            "certifiedRange":350,
//            "socData":{
//               "avgValue":0,
//               "min":20,
//               "max":80
//            },
//            "rangeData":{
//               "currentRange":300,
//               "maxRange":300,
//               "avgRealRange":300,
//               "minRange":null
//            },
//            "sohData":{
//              "currentSoh":0,
//              "prevMonthsSoh":[null,null,null,null,null,null,null,null,null,null,null,null]
//            }
//            "chargeRateData":{
//               "chargeStartTime":null,
//               "totalEnergyConsumed":0,
//               "chargeEndTime":null,
//               "avgChargingRate":0,
//               "odometerReadingAfterCharging":0,
//               "currentChargeRate":null
//            }
//         },
//         "3e16428b-5ecd-4457-ae1d-adfcde1829c2":{
//            "dataPointCollected":36,
//            "connectorType":"ChaDeMo",
//            "avgDailyMiles":{
//               "avgValue":1402.8947368421052,
//               "currentOdometerReading":26655,
//               "prevMonthOdometerReading":0,
//               "avgDistancePrevMonths":[
//                  null,
//                  null,
//                  null,
//                  null,
//                  null,
//                  null,
//                  null,
//                  null,
//                  null,
//                  null,
//                  null,
//                  null
//               ]
//            },
//            "totalChargingSessions":0,
//            "certifiedRange":350,
//            "socData":{
//               "avgValue":0,
//               "min":20,
//               "max":80
//            },
//            "rangeData":{
//               "currentRange":211,
//               "maxRange":211,
//               "avgRealRange":211,
//               "minRange":null
//            },
//            "soh":98,
//            "chargeRateData":{
//               "chargeStartTime":null,
//               "totalEnergyConsumed":0,
//               "chargeEndTime":null,
//               "avgChargingRate":0,
//               "odometerReadingAfterCharging":0,
//               "currentChargeRate":null
//            }
//         }
//      },
//      "name":"Momentum-E",
//      "vehicles":[
//         {
//            "capabilities":{
//               "chargeState":{
//                  "interventionIds":[
                    
//                  ],
//                  "isCapable":true
//               },
//               "odometer":{
//                  "interventionIds":[
                    
//                  ],
//                  "isCapable":true
//               },
//               "stopCharging":{
//                  "interventionIds":[
                    
//                  ],
//                  "isCapable":true
//               },
//               "information":{
//                  "interventionIds":[
                    
//                  ],
//                  "isCapable":true
//               },
//               "location":{
//                  "interventionIds":[
                    
//                  ],
//                  "isCapable":true
//               },
//               "smartCharging":{
//                  "interventionIds":[
                    
//                  ],
//                  "isCapable":true
//               },
//               "startCharging":{
//                  "interventionIds":[
                    
//                  ],
//                  "isCapable":true
//               }
//            },
//            "chargeState":{
//               "isPluggedIn":false,
//               "chargeRate":null,
//               "chargeLimit":100,
//               "lastUpdated":"2023-10-19T06:41:51.228Z",
//               "chargeTimeRemaining":null,
//               "range":211,
//               "isCharging":false,
//               "isFullyCharged":false,
//               "batteryCapacity":75,
//               "powerDeliveryState":"UNPLUGGED",
//               "batteryLevel":0
//            },
//            "isReachable":true,
//            "odometer":{
//               "lastUpdated":"2023-10-04T01:55:16.000Z",
//               "distance":26655
//            },
//            "smartChargingPolicy":{
//               "minimumChargeLimit":0,
//               "isEnabled":false,
//               "deadline":null
//            },
//            "Subs_fee":15,
//            "Vehicle_Type":"LMV",
//            "userId":"61c3c5cf-98fd-4e64-a6a9-d4024724491d",
//            "lastSeen":"2023-10-19T06:41:51.229Z",
//            "locationId":null,
//            "vendor":"JAGUAR",
//            "information":{
//               "year":2020,
//               "vin":"F4MXPE9NWGMD16707",
//               "model":"I-PACE",
//               "brand":"Jaguar"
//            },
//            "location":{
//               "lastUpdated":"2023-10-03T13:16:50.000Z",
//               "latitude":27.9953,
//               "longitude":-168.318
//            },
//            "Connected_On":"2023-10-04T12:54:14.482Z",
//            "id":"3e16428b-5ecd-4457-ae1d-adfcde1829c2",
//            "plan":"PAID"
//         },
//         {
//            "capabilities":{
//               "chargeState":{
//                  "interventionIds":[
                    
//                  ],
//                  "isCapable":true
//               },
//               "odometer":{
//                  "interventionIds":[
                    
//                  ],
//                  "isCapable":true
//               },
//               "stopCharging":{
//                  "interventionIds":[
                    
//                  ],
//                  "isCapable":true
//               },
//               "information":{
//                  "interventionIds":[
                    
//                  ],
//                  "isCapable":true
//               },
//               "location":{
//                  "interventionIds":[
                    
//                  ],
//                  "isCapable":true
//               },
//               "smartCharging":{
//                  "interventionIds":[
                    
//                  ],
//                  "isCapable":true
//               },
//               "startCharging":{
//                  "interventionIds":[
                    
//                  ],
//                  "isCapable":true
//               }
//            },
//            "chargeState":{
//               "isPluggedIn":false,
//               "chargeRate":null,
//               "chargeLimit":100,
//               "lastUpdated":"2023-10-19T06:39:01.190Z",
//               "chargeTimeRemaining":null,
//               "range":300,
//               "isCharging":false,
//               "isFullyCharged":false,
//               "batteryCapacity":75,
//               "powerDeliveryState":"UNPLUGGED",
//               "batteryLevel":0
//            },
//            "isReachable":true,
//            "odometer":{
//               "lastUpdated":"2023-10-03T16:32:59.000Z",
//               "distance":64388
//            },
//            "smartChargingPolicy":{
//               "minimumChargeLimit":0,
//               "isEnabled":false,
//               "deadline":null
//            },
//            "Subs_fee":20,
//            "Vehicle_Type":"LMV",
//            "userId":"61c3c5cf-98fd-4e64-a6a9-d4024724491d",
//            "lastSeen":"2023-10-19T06:39:01.191Z",
//            "locationId":null,
//            "vendor":"JAGUAR",
//            "information":{
//               "year":2020,
//               "vin":"8SGRVF5DUPBT88389",
//               "model":"I-PACE",
//               "brand":"Jaguar"
//            },
//            "location":{
//               "lastUpdated":"2023-10-04T01:50:22.000Z",
//               "latitude":-9.3161,
//               "longitude":12.6848
//            },
//            "Connected_On":"2023-10-04T12:54:14.882Z",
//            "id":"cb59389d-2a5f-49fd-8f20-e4806b9f5f04",
//            "plan":"PAID"
//         }
//      ],
//      "state":"Madrid",
//      "userId":"61c3c5cf-98fd-4e64-a6a9-d4024724491d",
//      "email":"mannandassani@momentum-e.com",
//      "owner_type":"Fleet Owner"
//   }
// }