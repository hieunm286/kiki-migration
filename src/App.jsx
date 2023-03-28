import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LoginTransferPlatformView from 'src/components/LoginTransferPlatformView';
import LoginKikiView from 'src/components/LoginKikiView';
import TransferProfilesView from 'src/components/TransferProfilesView';
import http, { HttpClient } from 'src/utils/api-services/http';
import { ToastContainer } from 'react-toastify';

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    http.local = new HttpClient(`http://localhost:${params.get('localPort')}`);
    const ssoUrl = params.get('apiSSOUrl');
    const apiClientUrl = params.get('apiClientUrl');
    if (ssoUrl) {
      http.sso = new HttpClient(ssoUrl);
    }
    if (apiClientUrl) {
      http.client = new HttpClient(apiClientUrl);
    }
  }, []);

  return (
    <>
      <ToastContainer theme='colored' />
      <div className='md:h-screen flex justify-center items-center'>
        <div className='w-full max-w-[700px] border border-silver-500 rounded-lg mx-auto overflow-hidden pb-4'>
          <div className='bg-primary-main flex items-center px-4 py-3'>
            <h3 className='text-white text-2xl font-bold'>KikiLogin migrations</h3>
          </div>
          <div className='px-4 py-2 flex flex-col md:flex-row gap-12'>
            <LoginTransferPlatformView />
            <LoginKikiView />
          </div>
          <div className='border-b border-b-gray-200 border-b-solid my-4 mx-4' />
          <TransferProfilesView />
        </div>
      </div>
    </>
  );
}

export default App;
