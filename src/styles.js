import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  page: { flex: 1, padding: 20, gap: 14 },
  listPage: { paddingBottom: 0 },
  heading: { fontSize: 24, fontWeight: '700', marginTop: 8 },
  body: { fontSize: 16, lineHeight: 23 },
  label: { fontSize: 16, fontWeight: '600', marginTop: 4 },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, fontSize: 16 },
  bioInput: { minHeight: 110, textAlignVertical: 'top' },
  button: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    padding: 20,
    gap: 8,
    marginVertical: 8,
  },
  avatar: { fontSize: 42 },
  name: { fontSize: 20, fontWeight: '700' },
  error: { color: '#c62828', fontSize: 14 },
  filter: { fontSize: 14, marginBottom: 8 },
  activity: { borderWidth: 1, borderRadius: 10, padding: 16, marginBottom: 10 },
  activityText: { fontSize: 16 },
  emptyList: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
});
