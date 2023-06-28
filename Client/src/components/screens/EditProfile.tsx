import { StyleSheet, Text, View } from 'react-native';

export default function EditProfile() {
  return (
    <View style={styles.container}>
      <Text>Hello, Edit!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
