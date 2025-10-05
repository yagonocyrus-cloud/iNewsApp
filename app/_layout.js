import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" />        {/* login */}
        <Stack.Screen name="signup" />       {/* signup */}
        <Stack.Screen name="home" />         {/* home */}
        <Stack.Screen name="newsDetails" />  {/* add/view news */}
      </Stack>
    </AuthProvider>
  );
}
