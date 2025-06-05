import { useRouter } from "expo-router";

export const useCustomNavigation = () => {
  const router = useRouter();

  const to = {
    auth: {
      login: () => router.push("/(auth)/(onboarding)"),
    },

    app: {
      dashboard: {
        home: () => router.push("/(app)/(dashboard)"),
      },
      laucher: {
        home: () => router.push("/(app)/(laucher)"),
      },
      settings: {
        home: () => router.push("/(app)/(setting)"),
      },
    },
  };

  return {
    router,
    to,
  };
};
