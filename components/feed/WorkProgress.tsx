import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import WorkProgressItem from '@/components/feed/WorkProgressItem';
import { MusicianDateilInfoWork } from '@/api/types';

type WorkProgressProps = {
  dataList: MusicianDateilInfoWork[];
};

export default function WorkProgress({ dataList }: WorkProgressProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Work in Progress </Text>
      {dataList.length === 0 ? (
        <Text style={styles.emptyText}>No work in progress for now</Text>
      ) : (
        <FlatList
          data={dataList}
          renderItem={({ item }) => (
            <WorkProgressItem
              titleName={item.workName}
              plays={item.playTimes}
              coins={item.tuneCoins}
              onCancelClick={() => {}}
              onItemClick={() => {}}
            />
          )}
          keyExtractor={item => item.workId}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
