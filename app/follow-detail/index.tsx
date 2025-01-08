import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FollowDetailHeader from '@/components/feed/DetailHeader';
import FollowDetailMediaPlatform from '@/components/feed/DetailMediaPlatform';
import WorkProgress from '@/components/feed/WorkProgress';
import AchievementAwards from '@/components/feed/AchievementAwards';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { get } from '@/api/api';
import { MusicianDetailInfo, MusicianDetailData } from '@/api/types';

export default function MusicianId() {
  const { id } = useLocalSearchParams();

  console.log(`id===${id}`);
  const {
    data: musicianDetailData,
    isLoading: isMusLoading,
    error: musicianDetailError,
  } = useQuery<MusicianDetailData>({
    queryKey: ['musicianDetailGet'],
    queryFn: () =>
      get<MusicianDetailData>(
        `/musician/get-musician-manage-detail/${id}`
      ).then(res => res.data),
  });

  const [musicianDetailContent, setMusicianDetailContent] =
    useState<MusicianDetailInfo>();

  useEffect(() => {
    if (
      musicianDetailData?.data &&
      musicianDetailData.data !== musicianDetailContent
    ) {
      setMusicianDetailContent(musicianDetailData.data);
    }
  }, [musicianDetailData]);

  const onBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/feed');
    }
  };

  const onCancelFollowClicl = () => {
    console.log('onCancelFollowClicl----');
  };

  const onInstagramClick = () => {
    console.log('onInstagramClick----');
  };

  const onFacebookClick = () => {
    console.log('onFacebookClick----');
  };

  const onSoundcloudClick = () => {
    console.log('onSoundcloudClick----');
  };

  const onYoutubeClick = () => {
    console.log('onYoutubeClick----');
  };

  if (isMusLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (musicianDetailError) {
    return (
      <Text> Server Exception Load Failure: {musicianDetailError.message}</Text>
    );
  }

  return (
    <View style={styles.container}>
      <FollowDetailHeader
        name={
          musicianDetailContent?.firstName +
          ' ' +
          musicianDetailContent?.lastName
        }
        role={musicianDetailContent?.role ?? ''}
        onBack={onBackPress}
        onCancelFollowClick={onCancelFollowClicl}
      ></FollowDetailHeader>
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        style={styles.scrollcontainer}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <FollowDetailMediaPlatform
            onInstagramClick={onInstagramClick}
            onFacebookClick={onFacebookClick}
            onSoundcloudClick={onSoundcloudClick}
            onYoutubeClick={onYoutubeClick}
          ></FollowDetailMediaPlatform>
          <Text style={styles.description}>
            {musicianDetailContent?.description}
          </Text>
          <WorkProgress dataList={musicianDetailContent?.works ?? []} />
          <AchievementAwards dataList={musicianDetailContent?.awards ?? []} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0E0E',
  },
  scrollcontainer: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  description: {
    paddingHorizontal: 16,
    color: '#7F7779',
    fontSize: 14,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E0E0E',
  },
});
