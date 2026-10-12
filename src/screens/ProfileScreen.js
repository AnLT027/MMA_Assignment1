import { Text } from 'react-native';
import ActionButton from '../components/ActionButton';
import Page from '../components/Page';
import ProfileCard from '../components/ProfileCard';
import { useApp } from '../AppContext';

export default function ProfileScreen({ navigation }) {
  const { profile } = useApp();
  return (
    <Page>
      <ProfileCard name={profile.name} bio={profile.bio} age={profile.age} job={profile.job} />
      <ActionButton
        title="Edit Profile"
        onPress={() => navigation.navigate('EditProfile')}
      />
    </Page>
  );
}
