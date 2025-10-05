import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Signup() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirm,setConfirm] = useState('');

  const handleSignup = () => {
    console.log("Sign Up button pressed");
    Alert.alert("Sign Up Clicked", `Email: ${email}`);
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup Screen</Text>

      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" value={confirm} onChangeText={setConfirm} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/")}>
        <Text style={styles.link}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20, backgroundColor:'#fff' },
  title:{ fontSize:24, fontWeight:'bold', marginBottom:20, textAlign:'center' },
  input:{ borderWidth:1, borderColor:'#ccc', borderRadius:10, padding:12, marginBottom:15 },
  button:{ backgroundColor:'#28a745', padding:14, borderRadius:10, alignItems:'center', marginBottom:10 },
  buttonText:{ color:'#fff', fontWeight:'bold' },
  link:{ color:'#007bff', textAlign:'center', fontWeight:'600' },
});
