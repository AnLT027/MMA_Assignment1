import { Pressable, Text } from 'react-native';
import { useApp } from '../AppContext';
import styles from '../styles';

export default function ActionButton({ title, onPress, secondary = false }) {
  const { theme } = useApp();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: secondary ? theme.surface : theme.primary,
          borderColor: theme.border,
          opacity: pressed ? 0.75 : 1,
        },
      ]}
    >
      <Text style={{ color: secondary ? theme.text : '#ffffff', fontWeight: '600' }}>
        {title}
      </Text>
    </Pressable>
  );
}
