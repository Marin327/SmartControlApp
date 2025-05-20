import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import Animated, { FadeIn, FadeOut, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { useRouter, useSegments } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Animated background color change
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(darkMode ? 1 : 0, { duration: 500 });
  }, [darkMode]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = progress.value === 0 ? '#f0f0f0' : '#121212';
    return {
      backgroundColor,
    };
  });

  const titles: Record<string, string> = {
    home: 'Начало',
    explore: 'Съвети',
    profile: 'Профил',
  };

  const currentTitle = titles[segments[0]] || 'Приложение';

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={[styles.container, animatedStyle]}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: darkMode ? '#fff' : '#000' }]}>{currentTitle}</Text>

        <TouchableOpacity onPress={() => setDarkMode(!darkMode)} style={styles.darkModeButton}>
          <Icon name={darkMode ? 'sunny' : 'moon'} size={24} color={darkMode ? '#FFD700' : '#333'} />
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <View style={styles.content}>{children}</View>

      {/* Bottom navigation */}
      <View style={[styles.tabBar, { backgroundColor: darkMode ? '#222' : '#fff' }]}>
        <TouchableOpacity onPress={() => router.push('/home')} style={styles.tabButton}>
          <Icon name="home-outline" size={24} color={segments[0] === 'home' ? '#007AFF' : '#888'} />
          <Text style={[styles.tabText, segments[0] === 'home' && styles.tabActive]}>Начало</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/explore')} style={styles.tabButton}>
          <Icon name="book-outline" size={24} color={segments[0] === 'explore' ? '#007AFF' : '#888'} />
          <Text style={[styles.tabText, segments[0] === 'explore' && styles.tabActive]}>Съвети</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/profile')} style={styles.tabButton}>
          <Icon name="person-outline" size={24} color={segments[0] === 'profile' ? '#007AFF' : '#888'} />
          <Text style={[styles.tabText, segments[0] === 'profile' && styles.tabActive]}>Профил</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  darkModeButton: {
    padding: 6,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    height: 60,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  tabActive: {
    color: '#007AFF',
    fontWeight: '700',
  },
});
