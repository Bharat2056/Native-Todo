import React, { useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const [todos, setTodos] = useState([
    { id: 4, title: "Todo 4", isDone: false },
    { id: 5, title: "Todo 5", isDone: false },
    { id: 6, title: "Todo 6", isDone: false },
    { id: 7, title: "Todo 7", isDone: false },
    { id: 8, title: "Todo 8", isDone: false },
  ]);

  const [newTodo, setNewTodo] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    const newItem = {
      id: Date.now(),
      title: newTodo.trim(),
      isDone: false,
    };
    setTodos([newItem, ...todos]);
    setNewTodo("");
    Keyboard.dismiss();
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => alert("Clicked")}>
              <Ionicons name="menu" size={28} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Image
                source={{
                  uri: "https://xsgames.co/randomusers/avatar.php?g=male",
                }}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Ionicons
              name="search"
              size={20}
              color="#333"
              style={{ marginRight: 10 }}
            />
            <TextInput
              placeholder="Search todos..."
              style={styles.searchInput}
              clearButtonMode="always"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* Todo List */}
          <FlatList
            data={filteredTodos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.todoItem}>
                <TouchableOpacity
                  onPress={() => toggleTodo(item.id)}
                  style={{ flex: 1 }}
                >
                  <Text
                    style={[
                      styles.todoText,
                      item.isDone && {
                        textDecorationLine: "line-through",
                        color: "#aaa",
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Ionicons name="trash" size={24} color={"red"} />
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          {/* Add New Todo */}
          <View style={styles.footer}>
            <TextInput
              placeholder="Add new todo"
              style={styles.newTodoInput}
              value={newTodo}
              onChangeText={setNewTodo}
              onSubmitEditing={handleAddTodo}
              returnKeyType="done"
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
              <Ionicons name="add" size={24} color={"#fff"} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  todoItem: {
    backgroundColor: "#fff",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    alignItems: "center",
  },
  todoText: {
    fontSize: 16,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  newTodoInput: {
    backgroundColor: "#fff",
    flex: 1,
    paddingVertical: Platform.OS === "android" ? 12 : 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#4630eb",
    padding: 12,
    borderRadius: 10,
    marginLeft: 10,
  },
});
