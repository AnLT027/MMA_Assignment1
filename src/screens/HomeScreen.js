import { Text } from 'react-native';
import { useApp } from '../AppContext';
import ActionButton from '../components/ActionButton';
import Page from '../components/Page';
import ProfileCard from '../components/ProfileCard';
import styles from '../styles';

export default function HomeScreen({ navigation }) {
  const { profile, theme } = useApp();
  return (
    <Page>
      <Text style={[styles.heading, { color: theme.text }]}>Xin chào, {profile.name}!</Text>
      <Text style={[styles.body, { color: theme.muted }]}>
        Quản lý hồ sơ và hoạt động của bạn.
      </Text>
      <ProfileCard name={profile.name} bio={profile.bio} age={profile.age} job={profile.job} />
      <ActionButton title="Xem hồ sơ" onPress={() => navigation.navigate('Profile')} />
      <ActionButton
        title="Xem hoạt động"
        onPress={() => navigation.navigate('Activity')}
        secondary
      />
      <ActionButton
        title="Cài đặt"
        onPress={() => navigation.navigate('Settings')}
        secondary
      />
    </Page>
  );
}
