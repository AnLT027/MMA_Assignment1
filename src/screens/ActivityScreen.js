import { useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { useApp } from '../AppContext';
import Page from '../components/Page';
import styles from '../styles';

export default function ActivityScreen() {
  const { theme, activities, toggleActivity, addActivity, deleteActivity, resetActivities } = useApp();
  const [newTitle, setNewTitle] = useState('');
  const [inputError, setInputError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showDone, setShowDone] = useState(false);

  const visibleActivities = showDone ? activities.filter((item) => item.done) : activities;
  const totalCount = activities.length;
  const doneCount = activities.filter((item) => item.done).length;

  function handleAddActivity() {
    const trimmed = newTitle.trim();
    if (!trimmed) {
      setInputError('Vui lòng nhập nội dung hoạt động.');
      return;
    }
    if (trimmed.length > 80) {
      setInputError('Nội dung hoạt động không được vượt quá 80 ký tự.');
      return;
    }

    const success = addActivity(trimmed);
    if (success) {
      setNewTitle('');
      setInputError('');
      setFeedback('Đã lưu hoạt động mới!');
      setTimeout(() => setFeedback(''), 2500);
    }
  }

  return (
    <Page style={styles.listPage}>
      <Text style={[styles.heading, { color: theme.text }]}>Hoạt động hôm nay</Text>

      {/* Form nhập và lưu hoạt động mới */}
      <View style={{ gap: 6 }}>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'stretch' }}>
          <TextInput
            accessibilityLabel="Nội dung hoạt động mới"
            value={newTitle}
            onChangeText={(value) => {
              setNewTitle(value);
              if (inputError) setInputError('');
            }}
            placeholder="Nhập hoạt động mới..."
            placeholderTextColor={theme.muted}
            style={[
              styles.input,
              {
                flex: 1,
                color: theme.text,
                borderColor: inputError ? '#c62828' : theme.border,
                backgroundColor: theme.surface,
              },
            ]}
          />
          <Pressable
            onPress={handleAddActivity}
            style={[
              styles.button,
              {
                backgroundColor: theme.primary,
                borderColor: theme.primary,
                paddingHorizontal: 20,
              },
            ]}
          >
            <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 15 }}>Lưu</Text>
          </Pressable>
        </View>
        {inputError ? <Text style={styles.error}>{inputError}</Text> : null}
        {feedback ? (
          <Text style={{ color: '#2e7d32', fontSize: 13, fontWeight: '500' }}>
            ✓ {feedback}
          </Text>
        ) : null}
      </View>

      {/* Bộ lọc và thống kê */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 4,
          marginBottom: 4,
        }}
      >
        <Pressable onPress={() => setShowDone((current) => !current)}>
          <Text style={[styles.filter, { color: theme.primary, marginBottom: 0 }]}>
            {showDone
              ? `Đang xem: Đã xong (${doneCount}/${totalCount}) · Chạm để xem tất cả`
              : `Đang xem: Tất cả (${totalCount}) · Chạm để lọc`}
          </Text>
        </Pressable>
        <Text style={{ fontSize: 12, color: theme.muted }}>
          Đã lưu tự động
        </Text>
      </View>

      {/* Danh sách hoạt động */}
      <FlatList
        data={visibleActivities}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          visibleActivities.length === 0 ? styles.emptyList : { paddingBottom: 24 }
        }
        ListEmptyComponent={
          <View style={{ alignItems: 'center', gap: 12, paddingVertical: 24 }}>
            <Text style={[styles.body, { color: theme.muted, textAlign: 'center' }]}>
              {showDone
                ? 'Chưa có hoạt động nào được hoàn thành.'
                : 'Chưa có hoạt động nào trong danh sách.\nHãy nhập nội dung và nhấn "Lưu" để thêm!'}
            </Text>
            {!showDone && (
              <Pressable
                onPress={resetActivities}
                style={{ paddingVertical: 8, paddingHorizontal: 14 }}
              >
                <Text style={{ color: theme.primary, fontSize: 14 }}>
                  Khôi phục hoạt động mẫu
                </Text>
              </Pressable>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.activity,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}
          >
            <Pressable
              onPress={() => toggleActivity(item.id)}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginRight: 8,
              }}
            >
              <Text style={{ fontSize: 18, color: item.done ? theme.primary : theme.muted }}>
                {item.done ? '☑' : '□'}
              </Text>
              <Text
                style={[
                  styles.activityText,
                  {
                    flex: 1,
                    color: item.done ? theme.muted : theme.text,
                    textDecorationLine: item.done ? 'line-through' : 'none',
                  },
                ]}
              >
                {item.title}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => deleteActivity(item.id)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={{ padding: 4 }}
            >
              <Text style={{ color: '#c62828', fontSize: 16, fontWeight: 'bold' }}>✕</Text>
            </Pressable>
          </View>
        )}
      />
    </Page>
  );
}
