import React from 'react';
import { PLATFORMS } from '../utils/constants';
import { manageFormTransferPlatformLogin$ } from '../features/login';
import useObservable from '../hooks/useObservable';
import { useTranslation } from 'react-i18next';
import classNames from 'src/utils/helpers.js';

function LoginTransferPlatformView() {
  const { t } = useTranslation();
  const formLoginTransferPlatform$ = manageFormTransferPlatformLogin$();
  const [formLoginTransferPlatform] = useObservable(formLoginTransferPlatform$);

  if (!formLoginTransferPlatform) {
    return null;
  }

  return (
    <div className='w-full md:w-1/2'>
      <div className=''>
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
          formLoginTransferPlatform.platform ? 'opacity-100' : 'opacity-10 grayscale pointer-events-none',
        )}
      >
        {formLoginTransferPlatform.statistic ? (
          <div className='flex flex-col gap-2 mt-3 items-start'>
            <span>
              {t('Xin chào')}, <strong>{formLoginTransferPlatform.email}</strong>
            </span>
            <span>{formLoginTransferPlatform.statistic.allProfilesCount} profiles</span>
            <button onClick={formLoginTransferPlatform.logout}>{t('Đăng xuất')}</button>
          </div>
        ) : (
          <>
            <p className='font-semibold'>{t('Thông tin đăng nhập')}</p>
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
            <button
              className='bg-primary-main hover:bg-primary-lighter rounded px-4 py-2 text-white text-sm'
              onClick={formLoginTransferPlatform.onLogin}
            >
              {t('Đăng nhập')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginTransferPlatformView;
