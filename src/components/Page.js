import { View } from 'react-native';
import { useApp } from '../AppContext';
import styles from '../styles';

export default function Page({ children, style }) {
  const { theme } = useApp();
  return (
    <View style={[styles.page, { backgroundColor: theme.background }, style]}>
      {children}
    </View>
  );
}
