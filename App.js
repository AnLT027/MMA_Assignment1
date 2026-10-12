import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { AppProvider, useApp } from './src/AppContext';
// import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
// import EditProfileScreen from './src/screens/EditProfileScreen';
// import ActivityScreen from './src/screens/ActivityScreen';
// import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { theme, dark, ready } = useApp();

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator color={theme.primary} />
      </View>
    );
  }

  const navigationTheme = {
    ...DefaultTheme,
    dark,
    colors: {
      ...DefaultTheme.colors,
      background: theme.background,
      card: theme.surface,
      text: theme.text,
      border: theme.border,
      primary: theme.primary,
    },
  };

  return (
    <>
      <StatusBar style={dark ? 'light' : 'dark'} />
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: theme.surface },
            headerTintColor: theme.text,
            headerTitleStyle: { fontWeight: '600' },
            contentStyle: { backgroundColor: theme.background },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ' }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Hồ sơ' }} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Sửa hồ sơ' }} />
          <Stack.Screen name="Activity" component={ActivityScreen} options={{ title: 'Hoạt động' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Cài đặt' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
}
