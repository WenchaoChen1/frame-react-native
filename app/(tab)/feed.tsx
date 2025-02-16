import { useQuery } from '@tanstack/react-query';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';

import { get } from '@/api/api';
import HeaderFeedFollow from '@/components/feed/HeaderFeedFollow';
import FollowCard from '@/components/feed/FollowCard';
import FollowCardItem from '@/components/feed/FollowCardItem';
import { MusicianList, MusicianPageListData } from '@/api/types';

export default function FeedScreen() {
  const [ShowDiscoverPage, setShowDiscoverPage] = useState(true);

  const {
    data: musicianData,
    isLoading: isMusLoading,
    error: musicianError,
  } = useQuery<MusicianPageListData>({
    queryKey: ['musicianGet'],
    queryFn: () =>
      get<MusicianPageListData>('/musician/get-musician-manage-page').then(
        res => res.data
      ),
  });

  const [musicianDataList, setMusicianDataList] = useState<MusicianList[]>([]);
  const [musicianDataListTotal, setMusicianDataListTotal] = useState(0);
  const [musicianDataListTotalPages, setMusicianDataListTotalPages] =
    useState(0);

  useEffect(() => {
    setMusicianDataList(musicianData?.data?.content ?? []);
    setMusicianDataListTotal(musicianData?.data?.totalElements ?? 0);
    setMusicianDataListTotalPages(musicianData?.data?.totalPages ?? 0);
  }, [musicianData]);

  console.log(musicianData, '...');
  const handleDiscoverPress = () => {
    setShowDiscoverPage(true);
    console.log('Discover button pressed!');
  };

  const handleFollowingPress = () => {
    setShowDiscoverPage(false);
    console.log('Following button pressed!');
  };

  const handleOnMoreClick = () => {
    console.log('Following OnMoreClick---');
  };

  const handleOnCancelClick = () => {
    console.log('OnCancelClick---');
  };

  const handleFollowItemClick = (id: string) => {
    router.push({ pathname: '/follow-detail', params: { id } });
  };

  if (isMusLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (musicianError) {
    return <Text> Server Exception Load Failure: {musicianError.message}</Text>;
  }

  // 渲染单个卡片
  const followItem = (data: any) => {
    console.log(data, 'data');
    return (
      <FollowCardItem
        id={data.item.musicianId}
        titleName={data.item.firstName + data.item.lastName}
        latestDraft={data.item.latestDraft}
        plays={data.item.playTimes}
        coins={data.item.tuneCoins}
        onCancelClick={handleOnCancelClick}
        onItemClick={() => handleFollowItemClick(data.item.musicianId)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <HeaderFeedFollow
        onDiscoverPress={handleDiscoverPress}
        onFollowingPress={handleFollowingPress}
      />

      {ShowDiscoverPage ? (
        <View>
          <Text>Discover Page</Text>
        </View>
      ) : (
        <View style={styles.followContainer}>
          <FollowCard onMoreClick={handleOnMoreClick}></FollowCard>

          <FlatList
            data={musicianDataList}
            renderItem={followItem}
            keyExtractor={item => item.musicianId}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    paddingHorizontal: 16,
    paddingTop: 62,
  },

  followContainer: {
    flex: 1, // 和权重类似， 占满剩余全部的空间或者 按比例平分空间。
  },

  listContainer: {
    marginTop: 10,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 300,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E0E0E',
  },
});
