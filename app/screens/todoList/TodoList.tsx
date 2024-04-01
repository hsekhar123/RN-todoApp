import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import { TodoListType } from '../userData/UserManagement';
import FontAwesome from "react-native-vector-icons/FontAwesome"
interface IProps {
  task: string;
  todoList: TodoListType[];
  handleEdit:any;
  handleDelete:any
}
const TodoList = ({todoList,handleEdit,handleDelete}: IProps) => {
    const EditTodo=(id:number)=>{
        handleEdit(id)
    }
    const DeleteTodo=(id:number)=>{
        handleDelete(id)
    }
  return (
    <View style={style.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={todoList}
        renderItem={(item) => {
          const {task,id} = item.item;
          return (
            <View style={style.list}>
              <View style={style.textSection}>
              <Text style={style.taskText}>{task}</Text>
              </View>
              <View style={style.actionBtn}>
                <TouchableOpacity style={style.editBtn}
                onPress={()=>EditTodo(id)}>
                 <FontAwesome name='edit' color={"#c78c00"}size={18} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>DeleteTodo(id)}
                style={style.deleteBtn}>
                   <FontAwesome name='trash-o' color={"#ff6f61"}size={18} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default TodoList;
const style = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal:15,
    marginVertical:5,
    backgroundColor:"#ecf8f8",
    paddingVertical:7,
    borderRadius:8,
    width:"100%"
  },
  textSection:{
    width:"75%"
  },

  taskText:{
    fontSize:15,
    fontWeight:"500",
    color:"#008793"
  },
  actionBtn:{
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row"
  },
  editBtn:{
   alignItems:'center',
   justifyContent:"center",
   width:30,
   marginHorizontal:5
  },
  deleteBtn:{
   alignItems:'center',
   justifyContent:"center",
   width:30
  }
});
