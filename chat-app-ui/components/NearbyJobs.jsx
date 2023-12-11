import { COLORS, FONT, SIZES } from '../constants';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFetch } from '../hook/useFetch';
import NearbyJobCard from './NearbyJobCard';

const NearbyJobs = () => {
  const router = useRouter();
  const { isLoading, isError, data, refetch } = useFetch('search', {
    query: 'React Developer',
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>show all</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size='large' color={COLORS.primary} />
      ) : isError ? (
        <Text>Something went wrong</Text>
      ) : (
        <View style={styles.cardsContainer}>
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : isError ? (
            <Text>Something went wrong</Text>
          ) : (
            data?.map((job) => {
              return (
                <NearbyJobCard
                  job={job}
                  key={`nearby-job-${job?.job_id}`}
                  handleNavigate={() =>
                    router.push(`/job-details/${job.job_id}`)
                  }
                />
              );
            })
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },
});
export default NearbyJobs;
