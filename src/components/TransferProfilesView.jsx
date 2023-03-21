import React from 'react';
import classNames from 'src/utils/helpers.js';
import {
  handleTransferProfile,
  manageTransferProfiles$,
  transferProgressStatus,
} from 'src/features/transfer-profiles.js';
import useObservable from 'src/hooks/useObservable.js';
import { useTranslation } from 'react-i18next';

function TransferProfilesView() {
  const { t } = useTranslation();
  const [transferData] = useObservable(manageTransferProfiles$);

  const isTransferring = transferData?.transferProgressStatus === transferProgressStatus.transferring;
  console.log(transferData);

  if (!transferData) {
    return null;
  }

  return (
    <div className='px-4 flex justify-between items-center'>
      <div>
        {transferData && isTransferring && (
          <span className='text-base italic text-gray-500'>
            {t('Transferring: ')}
            {transferData.profiles}
          </span>
        )}
      </div>
      <button
        className={classNames(
          'rounded px-4 py-2 text-white text-sm',
          isTransferring ? 'bg-gray-300' : 'bg-primary-main' + ' hover:bg-primary-lighter',
        )}
        onClick={() => (isTransferring ? {} : handleTransferProfile(manageTransferProfiles$))}
      >
        {isTransferring ? t('Đang chuyển đổi') : t('Chuyển đổi')}
      </button>
    </div>
  );
}

export default TransferProfilesView;
