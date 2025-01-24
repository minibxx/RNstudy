import { Image, StyleSheet, Platform, TextInput, Touchable, TouchableOpacity, View, Text, Button, FlatList, RefreshControl } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useCallback } from 'react';

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [listTask, setListTask] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  function addToTask() {
    setListTask([...listTask, task]);
    setTask('');
  }

  function removeFromTask(indexToRemove: number) {
    setListTask(prevTasks => prevTasks.filter((_, index) => index !== indexToRemove));
  }
  
  
  console.log(task)
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FDC315', dark: '#FFFFF7' }}
      headerImage={
        <Image
          source={require('@/assets/images/BIZ.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">TODO TODO TODO</ThemedText>
        {/* <HelloWave /> */}
      </ThemedView>
      <Text>Task To Do</Text>

      <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
        <TextInput
          style={styles.contentAdd}
          onChangeText={setTask}
          value={task}
          placeholder='할 일을 입력하세요'
          placeholderTextColor="#d5d5d5"
        >
        </TextInput>
        <TouchableOpacity 
          style={styles.addBtn}
          onPress={addToTask}
        >
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
        data={listTask}
        renderItem={({item, index})=>
          <View style={styles.contentList}>
            <Text style={{ width: 300 }}>{item} </Text>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity>
                <Text>🤍</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>removeFromTask(index)}>
                <Text>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
      }/>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  contentAdd: {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'orange',
    width: '90%',
    height: 40,
    paddingLeft: 15
  },
  contentList: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFF6DC',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 2,
    height: 50,
    gap: 20
  },
  addBtn: {
    backgroundColor: 'orange',
    borderRadius: 50,
    width: 40,
    paddingLeft: 11,
  },
  addBtnText: {
    color: 'white',
    fontSize: 25,
  }
});
