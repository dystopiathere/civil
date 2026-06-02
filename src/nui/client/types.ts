export type CameraSetupData = {
  posX: number;
  posY: number;
  posZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  fov: number;
  rotationOrder: number;
};

export type NuiPageData = {
  focus: boolean;
  cursor: boolean;
  input: boolean;
  freeze: boolean;
  setupCamera?: () => number;
};

export type KeyMappingData = {
  key: string;
  description: string;
  handler: CallableFunction;
};
