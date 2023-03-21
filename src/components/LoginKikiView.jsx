import React from 'react';
import KikiLogin from 'src/assets/kiki-logo.png';
import { manageFormKikiLogin$ } from 'src/features/login.js';
import useObservable from 'src/hooks/useObservable.js';
import { handleStatisticData } from 'src/features/statistic.js';
import { manageTransferProfiles$ } from 'src/features/transfer-profiles.js';
import { useTranslation } from 'react-i18next';

function LoginKikiView() {
  const { t } = useTranslation();
  const formLoginKiki$ = manageFormKikiLogin$();
  const [formLoginKiki] = useObservable(formLoginKiki$);

  const { email, usedMember, usedProfile, totalProfile, totalMember, packageName } = handleStatisticData(
    formLoginKiki?.statistic,
  );

  console.log({ formLoginKiki });

  if (!formLoginKiki) {
    return null;
  }

  return (
    <div className='w-full md:w-1/2'>
      <div className='flex justify-center items-center w-full py-1'>
        <img src={KikiLogin} className='w-20' alt='logo' />
      </div>

      {email ? (
        <div className='flex flex-col gap-2 mt-3 items-start'>
          <span>
            {t('Xin chào')}, <strong>{email}</strong>
          </span>
          <span>
            {t('Gói cước')}: {packageName}
          </span>
          <span>
            {usedProfile}/{totalProfile} profiles - {usedMember}/{totalMember} {t('thành viên')}
          </span>
          <button onClick={formLoginKiki.logout}>{t('Đăng xuất')}</button>
        </div>
      ) : (
        <div className='flex flex-col gap-3 mt-3'>
          <p className='font-semibold'>{t('Đăng nhập vào KikiLogin')}</p>
          <input
            value={formLoginKiki.email}
            onChange={formLoginKiki.updateFormValue}
            name='email'
            className='p-1 rounded w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-s placeholder:text-sm'
            placeholder={t('Nhập email')}
          />
          <input
            value={formLoginKiki.password}
            onChange={formLoginKiki.updateFormValue}
            type='password'
            name='password'
            className='p-1 rounded w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-s placeholder:text-sm'
            placeholder={t('Nhập password')}
          />
          <button
            className='bg-primary-main hover:bg-primary-lighter rounded px-4 py-2 text-white text-sm'
            onClick={formLoginKiki.onLogin}
          >
            {t('Đăng nhập')}
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginKikiView;
