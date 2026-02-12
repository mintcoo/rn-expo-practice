import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./colors";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ITodo {
  [key: string]: { text: string; working: boolean };
}

const STORAGE_KEY = "@todos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<ITodo>({});

  const onPressTravel = () => {
    setWorking(false);
  };

  const onPressWork = () => {
    setWorking(true);
  };

  const onChangeText = (text: string) => {
    setText(text);
  };

  // 할일 폰에 데이터 저장
  const saveTodos = async (todos: ITodo) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos)); // value는 무조건 string 형식으로 저장
    } catch (error) {
      console.error(error);
    }
  };
  // 할일 폰에서 데이터 불러오기
  const loadTodos = async () => {
    try {
      const todos = await AsyncStorage.getItem(STORAGE_KEY);
      console.log("todos", todos);
      if (todos) {
        setTodos(JSON.parse(todos));
      }
    } catch (error) {
      console.error(error);
    }
  };
  // 할일 추가
  const addTodo = async () => {
    if (text === "") {
      return;
    }

    setTodos((prev) => ({
      ...prev,
      [Date.now()]: { text, working },
    }));
    const newTodo = {
      ...todos,
      [Date.now()]: { text, working },
    };
    await saveTodos(newTodo);
    setText("");
  };

  useEffect(() => {
    loadTodos();
  }, []);

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
      <ScrollView style={styles.todosContainer}>
        {Object.keys(todos).map((todo) =>
          todos[todo].working === working ? (
            <View key={todo} style={styles.todo}>
              <Text style={styles.todoText}>{todos[todo].text}</Text>
            </View>
          ) : null,
        )}
      </ScrollView>
      <View style={styles.footer}></View>
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
    flex: 0.2,
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
    marginVertical: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 16,
  },
  todosContainer: {
    flex: 1,
  },
  todo: {
    backgroundColor: theme.todoBg,
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 20,
    marginBottom: 10,
  },
  todoText: {
    color: theme.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flex: 0.1,
    backgroundColor: "teal",
  },
});
