import { useState } from 'react';
import { FlatList, Pressable, Text } from 'react-native';
import { useApp } from '../AppContext';
import Page from '../components/Page';
import styles from '../styles';

const INITIAL_ACTIVITIES = [
  { id: '1', title: 'Đọc sách 20 phút', done: false },
  { id: '2', title: 'Đi bộ ngoài trời', done: false },
  { id: '3', title: 'Học một điều mới', done: false },
];

export default function ActivityScreen() {
  const { theme } = useApp();
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [showDone, setShowDone] = useState(false);
  const visibleActivities = showDone ? activities.filter((item) => item.done) : activities;

  function toggleActivity(id) {
    setActivities((items) =>
      items.map((item) => (item.id === id ? { ...item, done: !item.done } : item)),
    );
  }

  return (
    <Page style={styles.listPage}>
      <Text style={[styles.heading, { color: theme.text }]}>Hoạt động hôm nay</Text>
      <Pressable onPress={() => setShowDone((current) => !current)}>
        <Text style={[styles.filter, { color: theme.primary }]}>
          {showDone
            ? 'Đang xem: Đã hoàn thành · Nhấn để xem tất cả'
            : 'Đang xem: Tất cả · Nhấn để lọc'}
        </Text>
      </Pressable>
      <FlatList
        data={visibleActivities}
        keyExtractor={(item) => item.id}
        contentContainerStyle={visibleActivities.length === 0 ? styles.emptyList : undefined}
        ListEmptyComponent={
          <Text style={[styles.body, { color: theme.muted }]}>
            Chưa có hoạt động hoàn thành.
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => toggleActivity(item.id)}
            style={[
              styles.activity,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.activityText, { color: theme.text }]}>
              {item.done ? '☑' : '□'} {item.title}
            </Text>
          </Pressable>
        )}
      />
    </Page>
  );
}
