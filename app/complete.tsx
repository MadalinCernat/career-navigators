import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LEVELS, Palette } from '@/constants/data';
import { useAppState } from '@/constants/store';

export default function LevelCompleteScreen() {
  const { levelId } = useLocalSearchParams<{ levelId: string }>();
  const state = useAppState();
  const level = LEVELS.find((l) => String(l.id) === String(levelId)) ?? LEVELS[0];

  const run = state.lastRun ?? {
    levelId: level.id,
    correct: 7,
    total: 8,
    mistakes: 1,
    elapsedSeconds: 161,
    xpEarned: 120,
    stars: 3 as const,
  };

  const minutes = Math.floor(run.elapsedSeconds / 60);
  const seconds = run.elapsedSeconds % 60;
  const timeText = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.bg} />
      <Confetti />

      <View style={styles.content}>
        <Text style={styles.trophy}>🏆</Text>
        <Text style={styles.title}>Level {level.id} Complete!</Text>
        <Text style={styles.subtitle}>You crushed the {level.title} 🎯</Text>

        <View style={styles.stars}>
          {[1, 2, 3].map((s) => (
            <Text
              key={s}
              style={[
                styles.starIcon,
                s <= run.stars ? styles.starFilled : styles.starEmpty,
              ]}>
              ★
            </Text>
          ))}
        </View>

        <View style={styles.xpCard}>
          <Text style={styles.xpLabel}>XP EARNED</Text>
          <View style={styles.xpRow}>
            <Text style={styles.xpBolt}>⚡</Text>
            <Text style={styles.xpValue}>+{run.xpEarned}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <Stat label="Correct" value={`${run.correct}/${run.total}`} />
          <Stat label="Mistake" value={String(run.mistakes)} />
          <Stat label="Time" value={timeText} />
        </View>

        <View style={{ flex: 1 }} />

        <Pressable
          style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}
          onPress={() =>
            router.replace({
              pathname: '/review',
              params: { levelId: String(level.id) },
            })
          }>
          <Text style={styles.ctaText}>Continue to Review Quiz →</Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace('/levels')}
          style={styles.skip}>
          <Text style={styles.skipText}>Sari peste — revino la harta nivelelor</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Confetti() {
  // Decorative emojis around the trophy area
  const items = [
    { left: '8%', top: 60, rotate: '-12deg', emoji: '🎉', size: 22 },
    { left: '15%', top: 120, rotate: '10deg', emoji: '✨', size: 18 },
    { right: '10%', top: 80, rotate: '14deg', emoji: '🎊', size: 22 },
    { right: '18%', top: 140, rotate: '-8deg', emoji: '⭐', size: 18 },
    { left: '50%', top: 30, rotate: '0deg', emoji: '🌟', size: 16 },
  ];
  return (
    <>
      {items.map((it, idx) => (
        <Text
          key={idx}
          style={[
            styles.confetti,
            it as object,
            { fontSize: it.size, transform: [{ rotate: it.rotate }] },
          ]}>
          {it.emoji}
        </Text>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F2A44' },
  bg: { ...StyleSheet.absoluteFillObject, backgroundColor: '#0F2A44' },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 30,
    alignItems: 'center',
  },
  trophy: { fontSize: 90, marginTop: 10 },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 6,
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
  stars: { flexDirection: 'row', marginTop: 22, gap: 6 },
  starIcon: { fontSize: 46 },
  starFilled: { color: Palette.star },
  starEmpty: { color: 'rgba(255,255,255,0.2)' },
  xpCard: {
    marginTop: 22,
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Palette.accent,
    backgroundColor: 'rgba(255, 159, 28, 0.12)',
    alignItems: 'center',
  },
  xpLabel: {
    color: Palette.accent,
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 1,
  },
  xpRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  xpBolt: { fontSize: 18 },
  xpValue: { color: Palette.accent, fontWeight: '800', fontSize: 26 },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 22,
    width: '100%',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  statValue: { color: '#fff', fontWeight: '800', fontSize: 18 },
  statLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 2,
  },
  cta: {
    width: '100%',
    backgroundColor: Palette.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: Palette.primary,
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 8,
  },
  ctaText: { color: '#fff', fontWeight: '800', fontSize: 15, letterSpacing: 0.4 },
  skip: { marginTop: 12, padding: 10 },
  skipText: { color: 'rgba(255,255,255,0.55)', fontSize: 12 },
  confetti: { position: 'absolute' },
});
