import { useRouter } from "expo-router";

export const useCustomNavigation = () => {
  const router = useRouter();

  const to = {
    auth: {
      login: () => router.push("/(auth)/(login)"),
      register: () => router.push("/(auth)/(register)"),
      confirmPhone: () => router.push("/(auth)/(confirm-phone)"),
      changePhone: () => router.push("/(auth)/(change-phone)"),
    },

    app: {
      agents: {
        home: () => router.push("/(app)/(agents)"),
      },
      contacts: {
        home: () => router.push("/(app)/(contacts)"),
      },
      conversations: {
        home: () => router.push("/(app)/(conversations)"),
      },
      settings: {
        home: () => router.push("/(app)/(settings)"),
      },
    },
  };

  return {
    router,
    to,
  };
};
