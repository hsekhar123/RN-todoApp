import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import TodoList from '../todoList/TodoList';
import LinearGradient from 'react-native-linear-gradient';

export interface TodoListType {
  id: number;
  task: string;
}
const UserManagement: React.FC = () => {
  const [task, setTask] = useState<string | any>('');
  const [todoList, setTodoList] = useState<TodoListType[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<null | number>(null);
  const handleAdd = () => {
    if (task !== '' && task?.trim().length !== 0) {
      const obj = {
        id: Date.now(),
        task,
      };
      setTodoList([...todoList, obj]);
      setTask('');
    } else {
      Alert.alert('Please add task');
    }
  };
  const handleEdit = (id: number) => {
    const existTodo = todoList;
    const result = existTodo.find((todo: TodoListType) => todo.id === id);
    setTask(result?.task);
    setIsEdit(prev => !prev);
    setUpdateId(id);
  };
  const handleDelete = (id: number) => {
    const result = todoList.filter((todo: TodoListType) => todo.id !== id);
    setTodoList(result);
    setTask('');
    setIsEdit(false);
  };
  const handleUpdate = (newtask: string) => {
    if (newtask !== '' && newtask.trim() !== '') {
      setTask(newtask);
      const updatedTodo = todoList.map((todo: TodoListType) => {
        if (todo.id == updateId) {
          todo.task = newtask;
        }
        return todo;
      });
      setTodoList(updatedTodo);
      setIsEdit(prev => !prev);
      setTask('');
    } else {
      Alert.alert('Please add task');
    }
  };
  return (
    <LinearGradient
      colors={['#051937', '#004d7a', '#008793', '#00bf72', '#a8eb12']}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      style={{flex: 1}}>
      <View style={style.container}>
        <Text style={style.headingText}>Todo App</Text>
        <View style={style.section}>
          <View style={style.headerSect}>
            <TextInput
              value={task}
              onChangeText={task => setTask(task)}
              style={style.TextInput}
              placeholder="Add something here..."
              placeholderTextColor={'#26603a'}
            />
            <TouchableOpacity
              onPress={isEdit ? () => handleUpdate(task) : handleAdd}
              style={[style.addBtn, isEdit ? style.updateText : style.addText]}>
              <Text style={[style.actionText]}>
                {isEdit ? 'Update' : 'Add'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={style.todoList}>
            <TodoList
              task={task}
              todoList={todoList}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};
export default UserManagement;
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  headingText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
    color: '#004d7a',
  },
  section: {
    marginVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  headerSect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TextInput: {
    borderWidth: 1,
    borderColor: '#008793',
    paddingVertical: '1.5%',
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 5,
    color: '#ecf8f8',
    fontSize: 14,
    fontWeight: '500',
    height:35
  },
  addBtn: {
    width: '20%',
    paddingVertical: '2%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    height:35
  },
  addText: {
    backgroundColor: '#004d7a',
  },
  updateText: {
    backgroundColor: '#0380aa',
  },
  actionText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#fbfcff',
  },
  todoList: {
    height: '87%',
    marginVertical: 10,
  },
});
