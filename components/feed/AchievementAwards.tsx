import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AchievementAwardsItem from '@/components/feed/AchievementAwardsItem';
import { MusicianDetailInfoAward } from '@/api/types';

type AchievementAwardsProps = {
  dataList: MusicianDetailInfoAward[];
};
export default function AchievementAwards({
  dataList,
}: AchievementAwardsProps) {
  return (
    <View>
      {dataList.length === 0 ? (
        <Text></Text>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Achievement & Awards</Text>
          <FlatList
            data={dataList}
            renderItem={({ item }) => (
              <AchievementAwardsItem description={item.description} />
            )}
            keyExtractor={item => item.awardId}
            contentContainerStyle={styles.listcontainer}
            scrollEnabled={false} // 禁用 FlatList 的滚动
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
  },
  listcontainer: {
    marginBottom: 25,
  },
});
