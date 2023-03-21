import { manageFormKikiLogin$, manageFormTransferPlatformLogin$ } from 'src/features/login';

export function setupAppContext() {
  const formLoginKiki$ = manageFormKikiLogin$();
  const formLoginTransferPlatform$ = manageFormTransferPlatformLogin$();

  return {
    formLoginKiki$,
    formLoginTransferPlatform$,
  };
}
