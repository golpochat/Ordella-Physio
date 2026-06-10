import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useUiStore } from "@/store/ui.store";

export function useNetwork() {
  const showOfflineBanner = useUiStore((state) => state.showOfflineBanner);
  const setShowOfflineBanner = useUiStore((state) => state.setShowOfflineBanner);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const isOffline = !(state.isConnected && state.isInternetReachable !== false);
      setShowOfflineBanner(isOffline);
    });

    return unsubscribe;
  }, [setShowOfflineBanner]);

  return {
    isOffline: showOfflineBanner,
  };
}
