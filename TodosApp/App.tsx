import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./colors";
import { useState } from "react";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<{
    [key: string]: { text: string; work: boolean };
  }>({});

  const onPressTravel = () => {
    setWorking(false);
  };

  const onPressWork = () => {
    setWorking(true);
  };

  const onChangeText = (text: string) => {
    setText(text);
  };

  const addTodo = () => {
    if (text === "") {
      return;
    }
    // const newTodo = {
    //   id: Date.now(),
    //   text,
    //   working,
    // };

    setTodos((prev) => ({
      ...prev,
      [Date.now()]: { text, work: working },
    }));
    setText("");
  };
  console.log(todos);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onPressWork}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? theme.white : theme.grey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressTravel}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? theme.grey : theme.white,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        value={text}
        onSubmitEditing={addTodo}
        onChangeText={onChangeText}
        returnKeyType="done"
        keyboardType="email-address"
        style={styles.input}
        placeholder={working ? "할일을 입력하세요" : "여행 계획을 입력하세요"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {
    flex: 0.15,
    // backgroundColor: "darkgray",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  btnText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: theme.white,
    color: "black",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 16,
  },
});
