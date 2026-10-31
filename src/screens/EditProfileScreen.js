import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { useApp } from '../AppContext';
import ActionButton from '../components/ActionButton';
import Page from '../components/Page';
import styles from '../styles';

export default function EditProfileScreen({ navigation }) {
  const { profile, saveProfile, theme } = useApp();
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [age, setAge] = useState(String(profile.age));
  const [job, setJob] = useState(profile.job);
  const [errors, setErrors] = useState({});

  useFocusEffect(
    useCallback(() => {
      setName(profile.name);
      setBio(profile.bio);
      setAge(String(profile.age));
      setJob(profile.job);
      setErrors({});
    }, [profile]),
  );

  function validate() {
    const nextErrors = {};
    const trimmedName = name.trim();
    const trimmedAge = age.trim();
    const trimmedJob = job.trim();
    const trimmedBio = bio.trim();

    // Kiểm tra tên
    if (!trimmedName) {
      nextErrors.name = 'Vui lòng nhập tên.';
    } else if (trimmedName.length < 2) {
      nextErrors.name = 'Tên phải có ít nhất 2 ký tự.';
    } else if (trimmedName.length > 50) {
      nextErrors.name = 'Tên không được vượt quá 50 ký tự.';
    }

    // Kiểm tra tuổi
    if (!trimmedAge) {
      nextErrors.age = 'Vui lòng nhập tuổi.';
    } else if (!/^\d+$/.test(trimmedAge)) {
      nextErrors.age = 'Tuổi phải là số nguyên dương hợp lệ.';
    } else {
      const parsedAge = parseInt(trimmedAge, 10);
      if (parsedAge < 1 || parsedAge > 120) {
        nextErrors.age = 'Tuổi phải nằm trong khoảng từ 1 đến 120.';
      }
    }

    // Kiểm tra nghề nghiệp
    if (!trimmedJob) {
      nextErrors.job = 'Vui lòng nhập nghề nghiệp.';
    } else if (trimmedJob.length < 2) {
      nextErrors.job = 'Nghề nghiệp phải có ít nhất 2 ký tự.';
    } else if (trimmedJob.length > 50) {
      nextErrors.job = 'Nghề nghiệp không được vượt quá 50 ký tự.';
    }

    // Kiểm tra giới thiệu / tiểu sử
    if (!trimmedBio) {
      nextErrors.bio = 'Vui lòng nhập lời giới thiệu bản thân.';
    } else if (trimmedBio.length > 300) {
      nextErrors.bio = 'Giới thiệu không được vượt quá 300 ký tự.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function save() {
    if (!validate()) {
      return;
    }

    const parsedAge = parseInt(age.trim(), 10);
    saveProfile({
      name: name.trim(),
      bio: bio.trim(),
      age: parsedAge,
      job: job.trim(),
    });
    navigation.goBack();
  }

  return (
    <Page>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 14, paddingBottom: 24 }}
      >
        <View style={{ gap: 6 }}>
          <Text style={[styles.label, { color: theme.text }]}>Tên</Text>
          <TextInput
            accessibilityLabel="Tên"
            value={name}
            onChangeText={(value) => {
              setName(value);
              if (errors.name) {
                setErrors((prev) => ({ ...prev, name: '' }));
              }
            }}
            placeholder="Nhập họ và tên"
            placeholderTextColor={theme.muted}
            style={[
              styles.input,
              {
                color: theme.text,
                borderColor: errors.name ? '#c62828' : theme.border,
                backgroundColor: theme.surface,
              },
            ]}
          />
          {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
        </View>

        <View style={{ gap: 6 }}>
          <Text style={[styles.label, { color: theme.text }]}>Tuổi</Text>
          <TextInput
            accessibilityLabel="Tuổi"
            value={age}
            onChangeText={(value) => {
              setAge(value);
              if (errors.age) {
                setErrors((prev) => ({ ...prev, age: '' }));
              }
            }}
            placeholder="Nhập tuổi"
            placeholderTextColor={theme.muted}
            keyboardType="numeric"
            style={[
              styles.input,
              {
                color: theme.text,
                borderColor: errors.age ? '#c62828' : theme.border,
                backgroundColor: theme.surface,
              },
            ]}
          />
          {errors.age ? <Text style={styles.error}>{errors.age}</Text> : null}
        </View>

        <View style={{ gap: 6 }}>
          <Text style={[styles.label, { color: theme.text }]}>Nghề nghiệp</Text>
          <TextInput
            accessibilityLabel="Nghề nghiệp"
            value={job}
            onChangeText={(value) => {
              setJob(value);
              if (errors.job) {
                setErrors((prev) => ({ ...prev, job: '' }));
              }
            }}
            placeholder="Nhập nghề nghiệp"
            placeholderTextColor={theme.muted}
            style={[
              styles.input,
              {
                color: theme.text,
                borderColor: errors.job ? '#c62828' : theme.border,
                backgroundColor: theme.surface,
              },
            ]}
          />
          {errors.job ? <Text style={styles.error}>{errors.job}</Text> : null}
        </View>

        <View style={{ gap: 6 }}>
          <Text style={[styles.label, { color: theme.text }]}>Giới thiệu</Text>
          <TextInput
            accessibilityLabel="Giới thiệu"
            value={bio}
            onChangeText={(value) => {
              setBio(value);
              if (errors.bio) {
                setErrors((prev) => ({ ...prev, bio: '' }));
              }
            }}
            placeholder="Viết vài dòng về bạn"
            placeholderTextColor={theme.muted}
            multiline
            style={[
              styles.input,
              styles.bioInput,
              {
                color: theme.text,
                borderColor: errors.bio ? '#c62828' : theme.border,
                backgroundColor: theme.surface,
              },
            ]}
          />
          {errors.bio ? <Text style={styles.error}>{errors.bio}</Text> : null}
        </View>

        <View style={{ gap: 10, marginTop: 10 }}>
          <ActionButton title="Lưu" onPress={save} />
          <ActionButton title="Hủy" onPress={() => navigation.goBack()} secondary />
        </View>
      </ScrollView>
    </Page>
  );
}
