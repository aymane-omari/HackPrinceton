// // app/_layout.tsx
import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ActionsProvider } from '../contexts/ActionsContext';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Add any custom fonts here if needed
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ActionsProvider>
      <Stack 
        onLayout={onLayoutRootView}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#22C55E',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
      </Stack>
    </ActionsProvider>
  );
}

// app/_layout.tsx
// import { Stack } from 'expo-router';
// import { useCallback } from 'react';
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// import { ActionsProvider } from '../contexts/ActionsContext';
// import { AccessibilityProvider } from '../contexts/AccessibilityContext';

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [fontsLoaded] = useFonts({
//     'OpenDyslexic': require('../assets/fonts/OpenDyslexic-Regular.otf'),
//   });

//   const onLayoutRootView = useCallback(async () => {
//     if (fontsLoaded) {
//       await SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded]);

//   if (!fontsLoaded) return null;

//   return (
//     <AccessibilityProvider>
//       <ActionsProvider>
//         <Stack 
//           onLayout={onLayoutRootView}
//           screenOptions={{
//             headerStyle: {
//               backgroundColor: '#22C55E',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//           }}
//         >
//           <Stack.Screen 
//             name="(tabs)" 
//             options={{ headerShown: false }} 
//           />
//         </Stack>
//       </ActionsProvider>
//     </AccessibilityProvider>
//   );
// }