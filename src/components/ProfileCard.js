import { Text, View } from 'react-native';
import { useApp } from '../AppContext';
import styles from '../styles';

export default function ProfileCard({ name, bio, age, job }) {
    const { theme } = useApp();
    return (
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
            <Text style={[styles.body, { color: theme.muted }]}>{bio}</Text>
            <Text style={[styles.body, { color: theme.muted }]}>Age: {age}</Text>
            <Text style={[styles.body, { color: theme.muted }]}>Job: {job}</Text>
        </View>
    );
}
