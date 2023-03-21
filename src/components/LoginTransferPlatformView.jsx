import React, { useCallback } from 'react';
import { PLATFORMS } from '../utils/constants';
import useObservable from '../hooks/useObservable';
import { useTranslation } from 'react-i18next';
import classNames from 'src/utils/helpers.js';
import { handleTransferPlatformStatisticData } from 'src/features/statistic.js';
import { useAppContext } from 'src/context/AppContextProvider.jsx';

function LoginTransferPlatformView() {
  const { t } = useTranslation();
  const { formLoginTransferPlatform$ } = useAppContext();
  const [formLoginTransferPlatform] = useObservable(formLoginTransferPlatform$);
  const { totalProfile } = handleTransferPlatformStatisticData(formLoginTransferPlatform?.statistic);
  console.log('formLoginTransferPlatform', formLoginTransferPlatform);
  const isValidForm =
    formLoginTransferPlatform &&
    ((formLoginTransferPlatform.platform === 'Dolphin' && formLoginTransferPlatform.platformToken) ||
      (formLoginTransferPlatform.platform !== 'Dolphin' &&
        formLoginTransferPlatform.email &&
        formLoginTransferPlatform.password));

  const renderForm = useCallback(() => {
    switch (formLoginTransferPlatform.platform) {
      case 'Dolphin':
        return (
          <input
            value={formLoginTransferPlatform.platformToken}
            onChange={formLoginTransferPlatform.updateFormValue}
            name='platformToken'
            className='p-1 rounded w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-s placeholder:text-sm'
            placeholder={t('Nhập token')}
          />
        );
      default:
        return (
          <>
            <input
              value={formLoginTransferPlatform.email}
              onChange={formLoginTransferPlatform.updateFormValue}
              name='email'
              className='p-1 rounded w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-s placeholder:text-sm'
              placeholder={t('Nhập email')}
            />
            <input
              value={formLoginTransferPlatform.password}
              onChange={formLoginTransferPlatform.updateFormValue}
              type='password'
              name='password'
              className='p-1 rounded w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-s placeholder:text-sm'
              placeholder={t('Nhập password')}
            />
          </>
        );
    }
  }, [formLoginTransferPlatform]);

  if (!formLoginTransferPlatform) {
    return null;
  }

  return (
    <div className='w-full md:w-1/2'>
      <div
        className={classNames(formLoginTransferPlatform.statistic ? 'opacity-20 grayscale pointer-events-none' : '')}
      >
        <p className='text-silver-500 font-semibold'>{t('Vui lòng chọn nền tảng cần chuyển đổi')}</p>
        <div onChange={formLoginTransferPlatform.updatePlatform}>
          {PLATFORMS.map((platform) => (
            <div key={platform.name} className='flex items-center'>
              <input type='radio' id={platform.name} value={platform.name} name='platform' />
              <label htmlFor={platform.name} className='ml-2'>
                {platform.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className='border-b border-b-gray-200 border-b-solid my-4' />
      <div
        className={classNames(
          'flex flex-col gap-3',
          formLoginTransferPlatform.platform ? 'opacity-100' : 'opacity-20 grayscale pointer-events-none',
        )}
      >
        {formLoginTransferPlatform.statistic ? (
          <div className='flex flex-col gap-2 mt-3 items-start'>
            {formLoginTransferPlatform.email && (
              <span>
                {t('Xin chào')}, <strong>{formLoginTransferPlatform.email}</strong>
              </span>
            )}

            <span>{totalProfile} profiles</span>
            <button onClick={formLoginTransferPlatform.logout}>{t('Đăng xuất')}</button>
          </div>
        ) : (
          <>
            <p className='font-semibold'>{t('Thông tin đăng nhập')}</p>
            {renderForm()}
            <button
              className={classNames(
                'rounded px-4 py-2 text-white text-sm',
                !isValidForm || formLoginTransferPlatform.isLoading
                  ? 'bg-gray-300'
                  : 'bg-primary-main' + ' hover:bg-primary-lighter',
              )}
              onClick={
                !isValidForm || formLoginTransferPlatform.isLoading ? undefined : formLoginTransferPlatform.onLogin
              }
            >
              {formLoginTransferPlatform.isLoading ? t('Vui lòng chờ...') : t('Đăng nhập')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginTransferPlatformView;
