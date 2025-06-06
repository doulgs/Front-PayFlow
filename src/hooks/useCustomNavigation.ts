import { useRouter } from "expo-router";

export const useCustomNavigation = () => {
  const router = useRouter();

  const to = {
    auth: {
      login: () => router.push("/(auth)/(onboarding)"),
    },

    app: {
      tabs: {
        dashboard: {
          home: () => router.push("/(app)/(tabs)/(dashboard)"),
        },
        new: {
          home: () => router.push("/(app)/(tabs)/(new)"),
        },
        overview: {
          home: () => router.push("/(app)/(tabs)/(overview)"),
        },
      },
      stacks: {
        launcher: {
          home: () => router.push("/(app)/(stacks)/(launcher)"),
        },
        notification: {
          home: () => router.push("/(app)/(stacks)/(notification)"),
        },
        profile: {
          home: () => router.push("/(app)/(stacks)/(profile)"),
        },
      },
    },
  };

  return {
    router,
    to,
  };
};
