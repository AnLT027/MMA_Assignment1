import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, TextInput } from 'react-native';
import { useApp, DEFAULT_PROFILE } from '../AppContext';
import ActionButton from '../components/ActionButton';
import Page from '../components/Page';
import styles from '../styles';

export default function EditProfileScreen({ navigation }) {
  const { profile, saveProfile, theme } = useApp();
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [age, setAge] = useState(String(profile.age));
  const [job, setJob] = useState(profile.job);
  const [error, setError] = useState('');

  useFocusEffect(
    useCallback(() => {
      setName(profile.name);
      setBio(profile.bio);
      setAge(String(profile.age));
      setJob(profile.job);
      setError('');
    }, [profile]),
  );

  function save() {
    if (!name.trim()) {
      setError('Vui lòng nhập tên.');
      return;
    }
    const parsedAge = parseInt(age, 10);
    saveProfile({
      name: name.trim(),
      bio: bio.trim(),
      age: isNaN(parsedAge) ? DEFAULT_PROFILE.age : parsedAge,
      job: job.trim(),
    });
    navigation.goBack();
  }

  return (
    <Page>
      <Text style={[styles.label, { color: theme.text }]}>Tên</Text>
      <TextInput
        accessibilityLabel="Tên"
        value={name}
        onChangeText={(value) => {
          setName(value);
          setError('');
        }}
        placeholder="Nhập tên"
        placeholderTextColor={theme.muted}
        style={[
          styles.input,
          { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface },
        ]}
      />
      <Text style={[styles.label, { color: theme.text }]}>Age</Text>
      <TextInput
        accessibilityLabel="Age"
        value={age}
        onChangeText={(value) => {
          setAge(value);
          setError('');
        }}
        placeholder="Age"
        placeholderTextColor={theme.muted}
        keyboardType="numeric"
        style={[
          styles.input,
          { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface },
        ]}
      />
      <Text style={[styles.label, { color: theme.text }]}>Job</Text>
      <TextInput
        accessibilityLabel="Job"
        value={job}
        onChangeText={(value) => {
          setJob(value);
          setError('');
        }}
        placeholder="Job"
        placeholderTextColor={theme.muted}
        style={[
          styles.input,
          { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface },
        ]}
      />
      <Text style={[styles.label, { color: theme.text }]}>Giới thiệu</Text>
      <TextInput
        accessibilityLabel="Giới thiệu"
        value={bio}
        onChangeText={setBio}
        placeholder="Viết vài dòng về bạn"
        placeholderTextColor={theme.muted}
        multiline
        style={[
          styles.input,
          styles.bioInput,
          { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface },
        ]}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <ActionButton title="Lưu" onPress={save} />
      <ActionButton title="Hủy" onPress={() => navigation.goBack()} secondary />
    </Page>
  );
}
