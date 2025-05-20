import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Switch, FlatList, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor, Easing } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

type Device = {
  id: string;
  name: string;
  hasTemperature: boolean;
  on: boolean;
  temperature?: number;
  tempRange?: { min: number; max: number };
};

export default function HomeScreen() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 8000, easing: Easing.linear }, () => {
      progress.value = 0;  // циклично
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 0.5, 1],
      ['#4c669f', '#3b5998', '#192f6a']
    );
    return {
      backgroundColor,
    };
  });

  const [started, setStarted] = React.useState(false);
  const [devices, setDevices] = React.useState<Device[]>([
    { id: 'ac', name: 'Климатик', hasTemperature: true, on: false, temperature: 22, tempRange: { min: 16, max: 30 } },
    { id: 'fridge', name: 'Хладилник', hasTemperature: false, on: true },
    { id: 'oven', name: 'Печка', hasTemperature: true, on: false, temperature: 180, tempRange: { min: 100, max: 250 } },
    { id: 'washer', name: 'Пералня', hasTemperature: false, on: false },
    { id: 'tv', name: 'Телевизор', hasTemperature: false, on: false },
  ]);

  // Управление на устройствата
  const toggleDevice = (id: string) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, on: !d.on } : d))
    );
  };

  const changeTemperature = (id: string, delta: number) => {
    setDevices((prev) =>
      prev.map((d) => {
        if (d.id === id && d.hasTemperature && d.temperature !== undefined && d.tempRange) {
          let newTemp = d.temperature + delta;
          if (newTemp < d.tempRange.min) newTemp = d.tempRange.min;
          if (newTemp > d.tempRange.max) newTemp = d.tempRange.max;
          return { ...d, temperature: newTemp };
        }
        return d;
      })
    );
  };

  // Рендиране на устройство
  const renderDevice = ({ item }: { item: Device }) => (
    <View style={styles.deviceContainer}>
      <Text style={styles.deviceName}>{item.name}</Text>
      <View style={styles.controlsRow}>
        <Text style={{ color: '#fff' }}>{item.on ? 'Включен' : 'Изключен'}</Text>
        <Switch
          value={item.on}
          onValueChange={() => toggleDevice(item.id)}
          thumbColor={item.on ? '#007AFF' : '#ccc'}
          trackColor={{ false: '#999', true: '#66aaff' }}
        />
      </View>
      {item.hasTemperature && item.on && (
        <View style={styles.temperatureControl}>
          <TouchableOpacity onPress={() => changeTemperature(item.id, -1)} style={styles.tempButton}>
            <Text style={styles.tempButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={[styles.temperatureText, { color: '#fff' }]}>{item.temperature}°C</Text>
          <TouchableOpacity onPress={() => changeTemperature(item.id, 1)} style={styles.tempButton}>
            <Text style={styles.tempButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (!started) {
    return (
      <Animated.View style={[styles.startContainer, animatedStyle]}>
        <Text style={styles.title}>Добре дошъл!</Text>
        <Text style={styles.subtitle}>Управлявай устройствата в дома си лесно и удобно.</Text>
        <TouchableOpacity style={styles.button} onPress={() => setStarted(true)}>
          <Text style={styles.buttonText}>Започни</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.title}>Устройства в дома</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={renderDevice}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 90,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#ddd',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  deviceContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#fff',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temperatureControl: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  tempButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  temperatureText: {
    fontSize: 20,
    fontWeight: '600',
  },
});
