import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface DeviceCardProps {
  name: string;
  status: boolean;
  onToggle: () => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ name, status, onToggle }) => {
  const getIconName = () => {
    switch (name.toLowerCase()) {
      case 'климатик':
        return 'air-conditioner';
      case 'пералня':
        return 'washing-machine';
      case 'бойлер':
        return 'water-boiler';
      default:
        return 'power-plug';
    }
  };

  return (
    <View style={styles.card}>
      <MaterialCommunityIcons name={getIconName()} size={40} color="#333" />
      <Text style={styles.title}>{name}</Text>
      <Switch value={status} onValueChange={onToggle} />
      <Text style={styles.status}>
        Статус: {status ? 'Включено' : 'Изключено'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: '#f1f1f1',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3,
  },
  title: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: '600',
  },
  status: {
    marginTop: 10,
    fontSize: 14,
    color: '#777',
  },
});

export default DeviceCard;
