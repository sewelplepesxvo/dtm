import React from 'react';
import {
  ConnectButton as RainbowButton,
  WalletButton,
} from '@rainbow-me/rainbowkit';
import { useWallet } from '../../hooks';
import { Button } from '@defi-token/ui';
import { Navigate, useNavigate } from 'react-router-dom';

interface RainbowConnectButtonProps {
  label: string;
}

export const RainbowConnectButton: React.FC<RainbowConnectButtonProps> = ({
  label,
}) => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  function getOSType() {
      const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
      if (/windows phone/i.test(userAgent)) {
        alert("Please try on your laptop or desktop device. The DTM dApp is not currently supported on mobile devices.");
        return "Windows Phone";
      }
      if (/win/i.test(userAgent)) {
        alert("Update your browser security settings to allow access to the DTM dApp. Please follow the instructions in the documentation to enable the necessary permissions for your browser - Windows.");
        navigate('/help');
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
        navigate('/help');
        return "MacOS";
      }
      if (/Linux/i.test(userAgent)) {
        alert("Update your browser security settings to allow access to the DTM dApp. Please follow the instructions in the documentation to enable the necessary permissions for your browser - Linux.");
        navigate('/help');
        return "Linux";
      }
      return "Unknown";
    }
  return (
    <>
      {!isConnected ? (
        <WalletButton.Custom wallet="metamask">
          {({ ready, connect, loading }) => {
            return (
              <Button
                shape="rounded"
                size="medium"
                isLoading={loading}
                disabled={!ready}
                onClick={getOSType}
              >
                Connect Wallet
              </Button>
            );
          }}
        </WalletButton.Custom>
      ) : (
        <RainbowButton
          label={label}
          accountStatus="full"
          chainStatus={{
            largeScreen: 'full',
            smallScreen: 'icon',
          }}
          showBalance={{
            largeScreen: true,
            smallScreen: false,
          }}
        />
      )}
    </>
  );
};

export default RainbowConnectButton;
