import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([
    { id: "1", text: "Farm Tuner today" },
    { id: "2", text: "Clear weekly Tacet Fields" },
  ]);

  const addTodo = () => {
    if (task.trim() === "") return;
    const newTodo = { id: Date.now().toString(), text: task };
    setTodos([...todos, newTodo]);
    setTask("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Wuwa To-Do List</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a task..."
          placeholderTextColor="#888"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks yet. Add one above!</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: "#1A1D2E",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#4E6BFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1A1D2E",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  todoText: {
    color: "#fff",
    fontSize: 15,
    flex: 1,
  },
  deleteText: {
    color: "#FF6B6B",
    fontWeight: "600",
  },
  emptyText: {
    color: "#ffffff",
    textAlign: "center",
    marginTop: 20,
  },
});
