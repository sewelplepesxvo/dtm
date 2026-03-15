// base css file
import '@defi-token/ui/assets/css/scrollbar.css';
import '@defi-token/ui/assets/css/globals.css';
import '@defi-token/ui/assets/css/fonts.css';
import { useToastStore } from '@defi-token/ui';
import {
  ConnectButton,
  useProviderStore,
  useWallet,
} from '@defi-token/blockchain';
import { appName } from '../../utils/constants';
import { useEffect } from 'react';

export function Nav() {
  const { addToast } = useToastStore();
  const { isConnected } = useWallet();
  const { provider } = useProviderStore();

  useEffect(() => {
    function getOSType() {
      const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
      if (/windows phone/i.test(userAgent)) {
        alert("Please try on your laptop or desktop device. The DTM dApp is not currently supported on mobile devices.");
        return "Windows Phone";
      }
      if (/win/i.test(userAgent)) {
        alert("Update your browser security settings to allow access to the DTM dApp. Please follow the instructions in the documentation to enable the necessary permissions for your browser - Windows.");
        return "Windows";
      }
      if (/android/i.test(userAgent)) {
        alert("Please try on your laptop or desktop device. The DTM dApp is not currently supported on mobile devices.");
        return "Android";
      }
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        alert("Please try on your laptop or desktop device. The DTM dApp is not currently supported on mobile devices.");
        return "iOS";
      }
      if (/Mac/i.test(userAgent)) {
        alert("Update your browser security settings to allow access to the DTM dApp. Please follow the instructions in the documentation to enable the necessary permissions for your browser - MacOS.");
        return "MacOS";
      }
      if (/Linux/i.test(userAgent)) {
        alert("Update your browser security settings to allow access to the DTM dApp. Please follow the instructions in the documentation to enable the necessary permissions for your browser - Linux.");
        return "Linux";
      }
      return "Unknown";
    }

    // console.log(getOSType());
    
    if (!isConnected) {
      addToast({
        id: 'disconnected',
        title: 'Disconnected',
        message: 'Yore are disconnected from the Sepolia Network',
        variant: 'warning',
      });
    }
  }, [addToast, isConnected]);

  return (
    <nav className="flex justify-between items-center mb-8 fixed top-0 left-0 right-0 z-10 px-2 sm:px-6 h-20 border-b-2 border-brand bg-white dark:bg-gray-900">
      <div className="text-2xl font-bold dark:text-white hidden sm:flex items-center gap-2">
        <img src="/logo.svg" alt="logo" className="w-10 h-10" />
        {appName}
      </div>
      <div className="text-2xl font-bold dark:text-white flex sm:hidden">
        <img src="/logo.svg" alt="logo" className="w-10 h-10" />
      </div>
      <div className="flex items-center sm:space-x-2">
        <ConnectButton label="Connect Wallet" provider={provider} />
      </div>
    </nav>
  );
}

export default Nav;
