import { useEffect, useState } from 'react';
import { ErrorUtils } from '../utils/api-services/error';
import { apiServices } from '../apis/index';
import { setSession } from '../utils/setSession';

export const transferProgressStatus = {
  nothing: -1,
  transferring: 0,
  done: 1,
};

export const startTransfer = async () => {
  return Promise.resolve('Transferring started...');
};

export const transferPromiseProgress = async () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const el = arr[Math.floor(Math.random() * arr.length)];
  if (el === 10) {
    return Promise.resolve('Done');
  }
  return Promise.resolve(el);
};

export default function useAppContext() {
  const [selectedPlatform, setSelectedPlatform] = useState();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [formKikiState, setFormKikiState] = useState({
    email: '',
    password: '',
  });

  const [platformUser, setPlatformUser] = useState({
    email: '',
    profile: -1,
  });

  const [kikiUser, setKikiUser] = useState({
    email: '',
    package: '',
  });

  const [startFetchProgressStatus, setStartFetchStatus] = useState(transferProgressStatus.nothing);
  const [transferringData, setTransferringData] = useState();

  useEffect(() => {
    let interval;
    if (startFetchProgressStatus === transferProgressStatus.transferring) {
      interval = setInterval(fetchTransferringProgress, 1000);
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }

    return () => clearInterval(interval);
  }, [startFetchProgressStatus]);

  const onChangePlatform = (e) => {
    setSelectedPlatform(e.target.value);
  };

  const onChangeFormState = (e) => {
    setFormState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onChangeFormKikiState = (e) => {
    setFormKikiState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const loginWithKikiLogin = async () => {
    try {
      const response = await apiServices.loginKiki(formKikiState);
      setSession(response.data.token);
      setKikiUser({
        email: response.data.userInfo?.email,
        package: response.data?.userInfo?.package?.packageDetail?.name,
      });
    } catch (err) {
      ErrorUtils.handleError(err, {
        isErrorInstanceFn: (error) => {},
      });
    }
  };

  const transferProfiles = async () => {
    if (startFetchProgressStatus === transferProgressStatus.transferring) return;
    try {
      const response = await startTransfer();
      setStartFetchStatus(transferProgressStatus.transferring);
    } catch (err) {}
  };

  const fetchTransferringProgress = async () => {
    try {
      const response = await transferPromiseProgress();
      setTransferringData(response);
      if (response === 'Done') {
        setStartFetchStatus(transferProgressStatus.done);
      }
    } catch (err) {}
  };

  const logoutKiki = () => {
    setKikiUser({ email: '', package: '' });
    setSession(undefined);
  };

  return {
    selectedPlatform,
    formState,
    formKikiState,
    onChangePlatform,
    onChangeFormState,
    onChangeFormKikiState,
    loginWithKikiLogin,
    transferProfiles,
    startFetchProgressStatus,
    transferStatus: {
      isTransferring: startFetchProgressStatus === transferProgressStatus.transferring,
      isDone: startFetchProgressStatus === transferProgressStatus.done,
    },
    transferringData,
    kikiUser,
    logoutKiki,
  };
}
