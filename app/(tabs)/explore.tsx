import React, { useEffect } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolateColor,
  Easing,
  FadeInUp,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const tips = [
  {
    id: '1',
    title: 'Пестене на енергия',
    description: 'Изключвайте уредите, когато не ги използвате, за да спестите ток и пари. Използвайте енергоспестяващи крушки и уреди с висока енергийна ефективност.',
  },
  {
    id: '2',
    title: 'Правилна поддръжка на пералнята',
    description: 'Почиствайте филтрите редовно и използвайте подходящи програми за пране, за да удължите живота на пералнята и да спестите вода и електроенергия.',
  },
  {
    id: '3',
    title: 'Оптимална температура на хладилника',
    description: 'Поддържайте температура около 4°C в основната част на хладилника и -18°C в камерата за замразяване, за да запазите храната свежа и да пестите енергия.',
  },
  {
    id: '4',
    title: 'Климатик и здраве',
    description: 'Почиствайте филтрите на климатика поне веднъж месечно и поддържайте температура около 22°C за комфорт и по-малко натоварване на уреда.',
  },
  {
    id: '5',
    title: 'Телевизор – режим на готовност',
    description: 'Изключвайте телевизора от контакта, когато не го използвате, за да намалите енергопотреблението. Използвайте таймери и режими за пестене на енергия.',
  },
  {
    id: '6',
    title: 'Печка и готвене',
    description: 'Използвайте подходящи съдове за готвене, които пасват на котлоните, и покривайте съдовете, за да намалите времето и енергията за готвене.',
  },
  {
    id: '7',
    title: 'Осветление в дома',
    description: 'Използвайте LED осветление, което е по-икономично и издържа по-дълго време. Освен това, максимизирайте естествената светлина през деня.',
  },
  {
    id: '8',
    title: 'Уредите в режим на готовност',
    description: 'Изключвайте напълно уредите, когато не ги използвате, вместо да ги оставяте на режим на готовност, за да намалите ненужното енергопотребление.',
  },
  {
    id: '9',
    title: 'Планиране на прането',
    description: 'Пълнете пералнята докрай, за да пестите вода и енергия, и използвайте програми за икономично пране, когато е възможно.',
  },
  {
    id: '10',
    title: 'Поддръжка на уредите',
    description: 'Редовната поддръжка и почистване на всички уреди увеличава тяхната ефективност и намалява риска от скъпи ремонти.',
  },
];

export default function ExploreScreen() {
  const router = useRouter();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 10000, easing: Easing.linear }),
      -1,
      true
    );
  }, []);

  const animatedBackground = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 0.5, 1],
      ['#2c3e50', '#3498db', '#2c3e50']
    );
    return {
      backgroundColor,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedBackground]}>
      <View style={styles.header}>
        <Text style={styles.title}>Съвети за дома</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
          <Text style={styles.backText}>← Назад</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tips}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 150)} style={styles.tipContainer}>
            <Text style={styles.tipTitle}>{item.title}</Text>
            <Text style={styles.tipDescription}>{item.description}</Text>
          </Animated.View>
        )}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 30,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 40,
  },
  tipContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 13,
    color: '#ddd',
    lineHeight: 20,
  },
});
