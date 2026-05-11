import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AnswerOption,
  getLevelQuestions,
  LEVELS,
  Palette,
  Question,
} from '@/constants/data';
import { useAppState } from '@/constants/store';

/**
 * Screen 05 — Review Quiz
 * After completing a level, the user gets a randomized 5-question quiz
 * pulled from previous levels. Pass = 3/5 correct.
 */
export default function ReviewQuizScreen() {
  const { levelId } = useLocalSearchParams<{ levelId: string }>();
  const state = useAppState();

  const completedLevelId = Number(levelId) || 3;

  const pool: { fromLevel: number; q: Question }[] = useMemo(() => {
    const items: { fromLevel: number; q: Question }[] = [];
    LEVELS.filter((l) => l.id <= completedLevelId).forEach((l) => {
      const qs = getLevelQuestions(l, state.domain);
      qs.forEach((q) => items.push({ fromLevel: l.id, q }));
    });
    // Pseudo-shuffle deterministically for the presentation
    return items.sort((a, b) => (a.q.id > b.q.id ? 1 : -1));
  }, [completedLevelId, state.domain]);

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<AnswerOption | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);

  const totalQuestions = Math.min(5, pool.length);
  // Spread picks across all previous levels for variety
  const picks = useMemo(() => {
    const step = Math.max(1, Math.floor(pool.length / totalQuestions));
    const sample: typeof pool = [];
    for (let i = 0; i < totalQuestions; i++) {
      sample.push(pool[(i * step) % pool.length]);
    }
    return sample;
  }, [pool, totalQuestions]);

  const current = picks[idx];
  const needCorrect = 3;
  const remainingToPass = Math.max(0, needCorrect - correctCount);

  const handleAnswer = () => {
    if (!selected) return;
    setSubmitted(true);
    if (selected.id === current.q.correctId) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    setSubmitted(false);
    setSelected(null);
    if (idx + 1 >= picks.length) {
      setResultOpen(true);
    } else {
      setIdx((i) => i + 1);
    }
  };

  const passed = correctCount >= needCorrect;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* Top progress dots + label */}
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeIcon}>🧠</Text>
          <Text style={styles.badgeText}>REVIEW</Text>
        </View>

        <View style={styles.dots}>
          {picks.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i < idx && { backgroundColor: Palette.reviewAccent },
                i === idx && {
                  backgroundColor: Palette.accent,
                  transform: [{ scale: 1.2 }],
                },
              ]}
            />
          ))}
        </View>

        <Text style={styles.count}>
          {idx + 1}/{picks.length}
        </Text>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerIcon}>🧠</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>Retention Check!</Text>
          <Text style={styles.bannerSub}>
            Score {needCorrect} out of {picks.length} to unlock Level{' '}
            {completedLevelId + 1}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.fromLevel}>
          From Level {current.fromLevel} — {LEVELS[current.fromLevel - 1]?.title}
        </Text>

        <Text style={styles.prompt}>{current.q.prompt}</Text>

        <View style={styles.options}>
          {current.q.options.map((opt) => {
            const isSel = selected?.id === opt.id;
            const showCorrect = submitted && opt.id === current.q.correctId;
            const showWrong =
              submitted && isSel && opt.id !== current.q.correctId;
            return (
              <Pressable
                key={opt.id}
                disabled={submitted}
                onPress={() => setSelected(opt)}
                style={({ pressed }) => [
                  styles.option,
                  isSel && !submitted && styles.optionSelected,
                  showCorrect && styles.optionCorrect,
                  showWrong && styles.optionWrong,
                  pressed && !submitted && { transform: [{ scale: 0.99 }] },
                ]}>
                <View
                  style={[
                    styles.optionBadge,
                    isSel && !submitted && styles.optionBadgeOn,
                    showCorrect && {
                      backgroundColor: Palette.primary,
                      borderColor: Palette.primary,
                    },
                    showWrong && {
                      backgroundColor: Palette.danger,
                      borderColor: Palette.danger,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.optionBadgeText,
                      ((isSel && !submitted) || showCorrect || showWrong) && {
                        color: '#fff',
                      },
                    ]}>
                    {opt.id}
                  </Text>
                </View>
                <Text style={styles.optionText}>{opt.text}</Text>
              </Pressable>
            );
          })}
        </View>

        {submitted && (
          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackText}>{selected?.feedback}</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.statusFooter}>
        <View style={styles.statusBox}>
          <Text style={styles.statusIcon}>💜</Text>
          <Text style={styles.statusText}>
            {remainingToPass > 0
              ? `Need ${remainingToPass} more correct to pass!`
              : 'You passed the review!'}
          </Text>
        </View>

        <Pressable
          disabled={!selected}
          onPress={submitted ? handleNext : handleAnswer}
          style={({ pressed }) => [
            styles.cta,
            !selected && !submitted && styles.ctaDisabled,
            pressed && { opacity: 0.9 },
          ]}>
          <Text style={styles.ctaText}>
            {submitted
              ? idx + 1 >= picks.length
                ? 'VEZI REZULTATUL'
                : 'CONTINUĂ'
              : 'VERIFICĂ'}
          </Text>
        </Pressable>
      </View>

      {/* Result modal */}
      <Modal visible={resultOpen} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>{passed ? '🎉' : '🤔'}</Text>
            <Text style={styles.modalTitle}>
              {passed ? 'Felicitări!' : 'Aproape!'}
            </Text>
            <Text style={styles.modalBody}>
              {passed
                ? `Ai obținut ${correctCount}/${picks.length} corecte. Level ${
                    completedLevelId + 1
                  } deblocat.`
                : `Ai obținut doar ${correctCount}/${picks.length}. Mai încearcă cu un alt set de întrebări.`}
            </Text>
            <Pressable
              onPress={() => {
                setResultOpen(false);
                router.replace('/levels');
              }}
              style={[
                styles.modalBtn,
                { backgroundColor: passed ? Palette.primary : Palette.reviewAccent },
              ]}>
              <Text style={styles.modalBtnText}>
                {passed ? 'CONTINUĂ' : 'ÎNAPOI LA HARTĂ'}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 8,
    gap: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3ECFF',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 4,
    borderWidth: 1,
    borderColor: '#D9C7FA',
  },
  badgeIcon: { fontSize: 12 },
  badgeText: {
    color: Palette.reviewAccent,
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 0.7,
  },
  dots: { flex: 1, flexDirection: 'row', justifyContent: 'center', gap: 8 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E5E5',
  },
  count: { fontWeight: '800', color: Palette.textSecondary, fontSize: 13 },
  banner: {
    margin: 18,
    marginTop: 6,
    padding: 14,
    borderRadius: 14,
    backgroundColor: Palette.reviewAccent,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bannerIcon: { fontSize: 22 },
  bannerTitle: { color: '#fff', fontWeight: '800', fontSize: 16 },
  bannerSub: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    marginTop: 2,
  },
  scroll: { paddingHorizontal: 22, paddingBottom: 30 },
  fromLevel: {
    color: Palette.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  prompt: {
    fontSize: 19,
    fontWeight: '800',
    color: Palette.textPrimary,
    lineHeight: 26,
    marginBottom: 18,
  },
  options: { gap: 12 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  optionSelected: {
    borderColor: Palette.reviewAccent,
    backgroundColor: '#F3ECFF',
  },
  optionCorrect: {
    borderColor: Palette.primary,
    backgroundColor: '#F1FAEA',
  },
  optionWrong: {
    borderColor: Palette.danger,
    backgroundColor: '#FFEFEF',
  },
  optionBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionBadgeOn: {
    backgroundColor: Palette.reviewAccent,
    borderColor: Palette.reviewAccent,
  },
  optionBadgeText: {
    fontWeight: '800',
    color: Palette.textSecondary,
    fontSize: 13,
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    color: Palette.textPrimary,
    lineHeight: 20,
  },
  feedbackBox: {
    marginTop: 16,
    padding: 14,
    backgroundColor: '#FFF7E6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F2DDB0',
  },
  feedbackText: {
    color: '#7A5300',
    fontSize: 13,
    lineHeight: 19,
  },
  statusFooter: {
    paddingHorizontal: 18,
    paddingBottom: 22,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1',
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.reviewBg,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D9C7FA',
  },
  statusIcon: { fontSize: 16 },
  statusText: {
    color: Palette.reviewAccent,
    fontWeight: '700',
    fontSize: 13,
    flex: 1,
  },
  cta: {
    backgroundColor: Palette.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  ctaDisabled: { backgroundColor: '#D0D0D0' },
  ctaText: { color: '#fff', fontWeight: '800', fontSize: 15, letterSpacing: 0.4 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 26,
    alignItems: 'center',
    width: '100%',
  },
  modalEmoji: { fontSize: 60 },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Palette.textPrimary,
    marginTop: 8,
  },
  modalBody: {
    color: Palette.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  modalBtn: {
    marginTop: 22,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 0.4,
  },
});
