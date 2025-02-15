import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FloatingButton } from '../../components/ui/FloatingButton';
import { Header } from '../../components/ui/Header';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#0d0d0c' }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#b0fb50',
          tabBarInactiveTintColor: '#666666',
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: '#0d0d0c',
            borderTopColor: '#1a1a1a',
            height: 60 + insets.bottom,
            paddingBottom: 8 + insets.bottom,
            paddingTop: 8,
          },
          header: () => <Header />,
          contentStyle: {
            backgroundColor: '#0d0d0c',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused, size, color }) => (
              <MaterialCommunityIcons 
                name={focused ? "home" : "home-outline"} 
                size={size} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: 'Messages',
            tabBarIcon: ({ focused, size, color }) => (
              <MaterialCommunityIcons 
                name={focused ? "message" : "message-outline"} 
                size={size} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="leaderboard"
          options={{
            title: 'Leaderboard',
            tabBarIcon: ({ focused, size, color }) => (
              <MaterialCommunityIcons 
                name={focused ? "trophy" : "trophy-outline"} 
                size={size} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused, size, color }) => (
              <MaterialCommunityIcons 
                name={focused ? "account" : "account-outline"} 
                size={size} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ focused, size, color }) => (
              <MaterialCommunityIcons 
                name={focused ? "cog" : "cog-outline"} 
                size={size} 
                color={color} 
              />
            ),
          }}
        />
      </Tabs>
      <FloatingButton />
    </View>
  );
}