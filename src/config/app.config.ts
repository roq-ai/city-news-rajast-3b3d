interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['App Owner'],
  customerRoles: [],
  tenantRoles: ['Content Editor', 'News Reporter', 'Advertiser'],
  tenantName: 'Publisher',
  applicationName: 'CITY NEWS RAJASTHAN',
  addOns: ['notifications', 'file'],
};
