import { LicenseInfo } from '@mui/x-license-pro';

export const initPro = (): void => {
  LicenseInfo.setLicenseKey(process.env.MUI_DATA_GRID_LICENSE_KEY || '');
};
