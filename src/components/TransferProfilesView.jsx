import React, { useEffect } from 'react';
import classNames from 'src/utils/helpers';
import {
  handleTransferProfile$,
  listenTransferStatus$,
  manageTransferProfiles$,
  transferProgressStatus,
} from 'src/features/transfer-profiles';
import useObservable from 'src/hooks/useObservable';
import { useTranslation } from 'react-i18next';
import { useAppContext } from 'src/context/AppContextProvider';
import { PLATFORMS } from 'src/utils/constants.js';
import useNetwork from 'src/hooks/useNetwork.js';

function TransferProfilesView() {
  const { t } = useTranslation();
  const [transferData] = useObservable(manageTransferProfiles$);
  const { formLoginKiki$, formLoginTransferPlatform$ } = useAppContext();
  const [formLoginTransferPlatform] = useObservable(formLoginTransferPlatform$);
  const [formLoginKiki] = useObservable(formLoginKiki$);
  const isNetworkAvailable = useNetwork();

  const isTransferring = transferData?.transferStatus === transferProgressStatus.transferring;

  const isReadyTransfer = !!formLoginKiki?.statistic && !!formLoginTransferPlatform?.statistic;

  useEffect(() => {
    let subscriber;
    if (formLoginTransferPlatform?.platform && formLoginTransferPlatform?.platformToken) {
      subscriber = listenTransferStatus$(
        manageTransferProfiles$,
        PLATFORMS.find((platform) => platform.name === formLoginTransferPlatform?.platform),
        formLoginTransferPlatform?.platformToken,
      ).subscribe();
    } else {
      subscriber?.unsubscribe();
    }

    return () => {
      subscriber?.unsubscribe();
    };
  }, [formLoginTransferPlatform?.platform, formLoginTransferPlatform?.platformToken]);

  if (!transferData) {
    return null;
  }

  return (
    <div className='px-4 flex justify-between items-center'>
      <div>
        {isNetworkAvailable ? (
          transferData &&
          transferData.transferStatus !== transferProgressStatus.nothing && (
            <span className='text-base italic text-gray-500'>
              {t('Transferring: ')}
              {transferData.profiles}
            </span>
          )
        ) : (
          <span className='text-base italic text-gray-500'>Network error</span>
        )}
      </div>
      <button
        className={classNames(
          'rounded px-4 py-2 text-white text-sm',
          isTransferring || !isReadyTransfer ? 'bg-gray-300' : 'bg-primary-main' + ' hover:bg-primary-lighter',
        )}
        onClick={() =>
          isTransferring || !isReadyTransfer
            ? {}
            : handleTransferProfile$(
                manageTransferProfiles$,
                PLATFORMS.find((platform) => platform.name === formLoginTransferPlatform.platform),
                formLoginTransferPlatform.platformToken,
                formLoginKiki.platformToken,
              )
        }
      >
        {isTransferring ? t('Đang chuyển đổi') : t('Chuyển đổi')}
      </button>
    </div>
  );
}

export default TransferProfilesView;
