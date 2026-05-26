import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DOMAIN_LABELS, LEVELS, Palette } from '@/constants/data';
import { useAppState } from '@/constants/store';

type LevelStatus = 'done' | 'inProgress' | 'locked' | 'available';

export default function LevelMapScreen() {
  const state = useAppState();
  const domainMeta = DOMAIN_LABELS[state.domain];

  const computeStatus = (id: number): LevelStatus => {
    const p = state.progress[id];
    if (!p) return 'locked';
    if (p.completed) return 'done';
    if (p.progressPct > 0) return 'inProgress';
    // First non-completed and non-locked
    const prev = state.progress[id - 1];
    if (id === 1 || prev?.completed) return 'available';
    return 'locked';
  };

  // Determine the "active" level the bottom CTA should jump into.
  const activeLevel =
    LEVELS.find((l) => {
      const p = state.progress[l.id];
      return p && !p.completed && p.progressPct > 0;
    }) ||
    LEVELS.find((l) => computeStatus(l.id) === 'available');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Top status bar — XP / streak / hearts */}
      <View style={styles.topBar}>
        <View style={styles.chip}>
          <Text style={styles.chipIcon}>⚡</Text>
          <Text style={styles.chipText}>{state.xp} XP</Text>
        </View>
        <View style={styles.chip}>
          <Text style={styles.chipIcon}>🔥</Text>
          <Text style={styles.chipText}>{state.streakDays} days</Text>
        </View>
        <View style={styles.hearts}>
          {[0, 1, 2].map((i) => (
            <Text
              key={i}
              style={[styles.heart, { opacity: i < state.hearts ? 1 : 0.25 }]}>
              ❤️
            </Text>
          ))}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        {/* Domain banner */}
        <View style={styles.domainCard}>
          <View>
            <Text style={styles.domainKicker}>YOUR DOMAIN</Text>
            <Text style={styles.domainTitle}>{domainMeta.title}</Text>
          </View>
          <Text style={styles.domainIcon}>{domainMeta.icon}</Text>
        </View>

        {/* Level cards */}
        <View style={styles.levels}>
          {LEVELS.map((level, idx) => {
            const status = computeStatus(level.id);
            const prog = state.progress[level.id];
            const isLast = idx === LEVELS.length - 1;
            return (
              <View key={level.id} style={styles.levelRow}>
                <LevelCard
                  number={level.id}
                  title={level.title}
                  icon={level.icon}
                  stars={prog?.stars ?? 0}
                  status={status}
                  progressPct={prog?.progressPct ?? 0}
                  onPress={() => {
                    if (status === 'locked') return;
                    if (level.id === 5) {
                      router.push('/level5');
                      return;
                    }
                    if (status === 'done') {
                      router.push({
                        pathname: '/question',
                        params: { levelId: String(level.id), replay: '1' },
                      });
                    } else {
                      router.push({
                        pathname: '/question',
                        params: { levelId: String(level.id) },
                      });
                    }
                  }}
                />
                {!isLast && (
                  <View
                    style={[
                      styles.connector,
                      status === 'done' && { backgroundColor: Palette.primary },
                    ]}
                  />
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer CTA */}
      {activeLevel && (
        <View style={styles.footer}>
          <Pressable
            style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}
            onPress={() => {
              if (activeLevel.id === 5) {
                router.push('/level5');
                return;
              }
              router.push({
                pathname: '/question',
                params: { levelId: String(activeLevel.id) },
              });
            }}>
            <Text style={styles.ctaIcon}>▶</Text>
            <Text style={styles.ctaText}>
              {state.progress[activeLevel.id]?.progressPct
                ? `CONTINUE LEVEL ${activeLevel.id}`
                : `START LEVEL ${activeLevel.id}`}
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

function LevelCard({
  number,
  title,
  icon,
  stars,
  status,
  progressPct,
  onPress,
}: {
  number: number;
  title: string;
  icon: string;
  stars: number;
  status: LevelStatus;
  progressPct: number;
  onPress: () => void;
}) {
  const borderColor =
    status === 'done'
      ? Palette.cardDoneBorder
      : status === 'inProgress'
      ? Palette.cardActiveBorder
      : '#E5E5E5';
  const bg =
    status === 'locked' ? Palette.cardLocked : '#FFFFFF';

  return (
    <Pressable
      onPress={onPress}
      disabled={status === 'locked'}
      style={({ pressed }) => [
        styles.card,
        { borderColor, backgroundColor: bg },
        pressed && status !== 'locked' && { transform: [{ scale: 0.99 }] },
      ]}>
      <View style={[
        styles.cardIcon,
        status === 'done' && { backgroundColor: '#EAF8DD' },
        status === 'inProgress' && { backgroundColor: '#FFF1DC' },
      ]}>
        <Text style={{ fontSize: 22 }}>
          {status === 'locked' ? '🔒' : icon}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.cardLabel,
            status === 'locked' && { color: Palette.textMuted },
          ]}>
          Level {number}
          {status === 'inProgress' ? ' · IN PROGRESS' : ''}
        </Text>
        <Text
          style={[
            styles.cardTitle,
            status === 'locked' && { color: Palette.textMuted },
          ]}>
          {title}
        </Text>
        {status === 'done' && (
          <View style={styles.stars}>
            {[1, 2, 3].map((s) => (
              <Text key={s} style={{ fontSize: 14, marginRight: 2 }}>
                {s <= stars ? '⭐' : '☆'}
              </Text>
            ))}
          </View>
        )}
        {status === 'inProgress' && (
          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${progressPct}%` }]}
            />
          </View>
        )}
      </View>

      {status === 'done' && <Text style={styles.cardCheck}>✅</Text>}
      {status === 'inProgress' && (
        <Text style={styles.cardPct}>{progressPct}%</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF6E1',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#FFD27A',
    gap: 4,
  },
  chipIcon: { fontSize: 13 },
  chipText: { fontWeight: '800', color: '#7A4B00', fontSize: 13 },
  hearts: { flexDirection: 'row', marginLeft: 'auto', gap: 2 },
  heart: { fontSize: 18 },
  scroll: { paddingBottom: 120, paddingHorizontal: 20, paddingTop: 6 },
  domainCard: {
    backgroundColor: '#0D5448',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  domainKicker: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  domainTitle: { color: '#fff', fontSize: 18, fontWeight: '800', marginTop: 3 },
  domainIcon: { fontSize: 30 },
  levels: { marginTop: 18 },
  levelRow: { alignItems: 'stretch' },
  connector: {
    width: 4,
    height: 22,
    backgroundColor: '#E5E5E5',
    marginLeft: 36,
    borderRadius: 2,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    borderWidth: 2,
    gap: 14,
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabel: {
    color: Palette.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  cardTitle: {
    color: Palette.textPrimary,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
  },
  stars: { flexDirection: 'row', marginTop: 4 },
  progressTrack: {
    height: 6,
    backgroundColor: '#F0EAE0',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Palette.accent,
  },
  cardCheck: { fontSize: 18 },
  cardPct: { color: Palette.accent, fontWeight: '800', fontSize: 13 },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  cta: {
    backgroundColor: Palette.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: Palette.primary,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  ctaIcon: { color: '#fff', fontSize: 14, fontWeight: '900' },
  ctaText: { color: '#fff', fontWeight: '800', fontSize: 15, letterSpacing: 0.4 },
});
