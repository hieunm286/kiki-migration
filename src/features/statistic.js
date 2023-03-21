import { switchMap } from 'rxjs';
import { rxServices } from '../apis/services';

export function getKikiStatistic$(login$) {
  return login$.pipe(switchMap(() => rxServices.kikiStatistic$()));
}

export const handleStatisticData = (statisticData = {}) => {
  const { userInfo, usedMember, usedProfile, package: packageInfo } = statisticData;

  return {
    email: userInfo?.email,
    usedProfile,
    usedMember,
    totalProfile: packageInfo?.profileLimit,
    totalMember: packageInfo?.memberLimit,
    packageName: packageInfo?.name,
  };
};

export function getTransferPlatformStatistic$(login$, url) {
  return login$.pipe(
    switchMap((data) => {
      console.log(data);
      return rxServices.getAllProfileTransferPlatform$(url, data.data);
    }),
  );
}
