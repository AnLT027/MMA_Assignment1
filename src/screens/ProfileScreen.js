import ActionButton from '../components/ActionButton';
import Page from '../components/Page';
import ProfileCard from '../components/ProfileCard';
import { useApp } from '../AppContext';

export default function ProfileScreen({ navigation }) {
  const { profile } = useApp();
  return (
    <Page>
      <ProfileCard name={profile.name} bio={profile.bio} />
      <ActionButton
        title="Sửa hồ sơ"
        onPress={() => navigation.navigate('EditProfile')}
      />
    </Page>
  );
}
