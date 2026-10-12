import { Text } from 'react-native';
import { useApp } from '../AppContext';
import ActionButton from '../components/ActionButton';
import Page from '../components/Page';
import styles from '../styles';

export default function SettingsScreen() {
  const { dark, toggleTheme, theme } = useApp();
  return (
    <Page>
      <Text style={[styles.heading, { color: theme.text }]}>Giao diện</Text>
      <Text style={[styles.body, { color: theme.muted }]}>
        Chế độ hiện tại: {dark ? 'Tối' : 'Sáng'}
      </Text>
      <ActionButton
        title={`Bật giao diện ${dark ? 'sáng' : 'tối'}`}
        onPress={toggleTheme}
      />
    </Page>
  );
}
