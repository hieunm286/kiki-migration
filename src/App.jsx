import React from 'react';
import { useTranslation } from 'react-i18next';
import { PLATFORMS } from './utils/constants';
import KikiLogin from './assets/kiki-logo.png';
import useAppContext from './hooks/useAppContext';
import classNames from './utils/helpers';

function App() {
  const { t } = useTranslation();
  // state
  const {
    loginWithKikiLogin,
    onChangePlatform,
    formState,
    onChangeFormState,
    formKikiState,
    onChangeFormKikiState,
    transferProfiles,
    transferStatus,
    transferringData,
    kikiUser,
    logoutKiki,
  } = useAppContext();

  return (
    <div className='md:h-screen flex justify-center items-center'>
      <div className='w-full max-w-[700px] border border-silver-500 rounded-lg mx-auto overflow-hidden pb-4'>
        <div className='bg-primary-main flex items-center px-4 py-3'>
          <h3 className='text-white text-2xl font-bold'>KikiLogin migrations</h3>
        </div>
        <div className='px-4 py-2 flex flex-col md:flex-row gap-12'>
          <div className='w-full md:w-1/2'>
            <div className=''>
              <p className='text-silver-500 font-semibold'>{t('Vui lòng chọn nền tảng cần chuyển đổi')}</p>
              <div onChange={onChangePlatform}>
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
            <div className='flex flex-col gap-3'>
              <p className='font-semibold'>{t('Thông tin đăng nhập')}</p>
              <input
                value={formState.email}
                onChange={onChangeFormState}
                name='email'
                className='p-1 rounded w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-s placeholder:text-sm'
                placeholder={t('Nhập email')}
              />
              <input
                value={formState.password}
                onChange={onChangeFormState}
                type='password'
                name='password'
                className='p-1 rounded w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-s placeholder:text-sm'
                placeholder={t('Nhập password')}
              />
              <button className='bg-primary-main hover:bg-primary-lighter rounded px-4 py-2 text-white text-sm'>
                {t('Đăng nhập')}
              </button>
            </div>
          </div>

          <div className='w-full md:w-1/2'>
            <div className='flex justify-center items-center w-full py-1'>
              <img src={KikiLogin} className='w-20' alt='logo' />
            </div>

            {kikiUser.email ? (
              <div className='flex flex-col gap-2 mt-3 items-start'>
                <span>
                  {t('Xin chào')}, <strong>{kikiUser.email}</strong>
                </span>
                <button onClick={logoutKiki}>{t('Đăng xuất')}</button>
              </div>
            ) : (
              <div className='flex flex-col gap-3 mt-3'>
                <p className='font-semibold'>{t('Đăng nhập vào KikiLogin')}</p>
                <input
                  value={formKikiState.email}
                  onChange={onChangeFormKikiState}
                  name='email'
                  className='p-1 rounded w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-s placeholder:text-sm'
                  placeholder={t('Nhập email')}
                />
                <input
                  value={formKikiState.password}
                  onChange={onChangeFormKikiState}
                  type='password'
                  name='password'
                  className='p-1 rounded w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-s placeholder:text-sm'
                  placeholder={t('Nhập password')}
                />
                <button
                  className='bg-primary-main hover:bg-primary-lighter rounded px-4 py-2 text-white text-sm'
                  onClick={loginWithKikiLogin}
                >
                  {t('Đăng nhập')}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='border-b border-b-gray-200 border-b-solid my-4 mx-4' />
        <div className='px-4 flex justify-between items-center'>
          <div>
            {transferringData && (
              <span className='text-base italic text-gray-500'>
                {t('Transferring: ')}
                {transferringData}
              </span>
            )}
          </div>
          <button
            className={classNames(
              'rounded px-4 py-2 text-white text-sm',
              transferStatus.isTransferring ? 'bg-gray-300' : 'bg-primary-main hover:bg-primary-lighter',
            )}
            onClick={transferProfiles}
          >
            {transferStatus.isTransferring ? t('Đang chuyển đổi') : t('Chuyển đổi')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
