import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
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
import { store, useAppState } from '@/constants/store';

/**
 * Screen 03 — Question
 * Progress bar, hearts, situation card, prompt and multiple-choice answers.
 * Shows feedback pop-up after an answer is submitted.
 */
export default function QuestionScreen() {
  const { levelId } = useLocalSearchParams<{ levelId: string }>();
  const state = useAppState();
  const startTimeRef = useRef<number>(Date.now());

  const level = useMemo(
    () => LEVELS.find((l) => String(l.id) === String(levelId)) ?? LEVELS[0],
    [levelId],
  );
  const questions = useMemo(
    () => getLevelQuestions(level, state.domain),
    [level, state.domain],
  );

  const currentRun = state.currentRun?.levelId === level.id ? state.currentRun : undefined;
  const [idx, setIdx] = useState(currentRun?.idx ?? 0);
  const [selected, setSelected] = useState<AnswerOption | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [correctCount, setCorrectCount] = useState(currentRun?.correctCount ?? 0);
  const [mistakeCount, setMistakeCount] = useState(currentRun?.mistakeCount ?? 0);

  // Reset hearts only when starting a fresh run.
  useEffect(() => {
    if (state.currentRun?.levelId !== level.id) {
      store.resetHearts();
    }
    startTimeRef.current = Date.now();
  }, [levelId]);

  useEffect(() => {
    if (currentRun) {
      setIdx(currentRun.idx);
      setCorrectCount(currentRun.correctCount);
      setMistakeCount(currentRun.mistakeCount);
    }
  }, [currentRun]);

  if (!questions.length) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>📨</Text>
          <Text style={styles.emptyTitle}>În curând</Text>
          <Text style={styles.emptySubtitle}>
            Acest nivel este încă în lucru. Revino curând!
          </Text>
          <Pressable
            style={styles.emptyBtn}
            onPress={() => router.back()}>
            <Text style={styles.emptyBtnText}>Înapoi</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const q: Question = questions[idx];
  const total = questions.length;
  const progress = ((idx) / total) * 100;
  const isCorrect = selected?.id === q.correctId;

  const handleCheck = () => {
    if (!selected) return;

    const isCorrect = selected.id === q.correctId;
    const nextCorrect = isCorrect ? correctCount + 1 : correctCount;
    const nextMistakes = isCorrect ? mistakeCount : mistakeCount + 1;
    const nextIdx = idx + 1;

    if (!isCorrect) {
      store.decrementHeart();
    }

    if (nextIdx < total) {
      store.setCurrentRun({
        levelId: level.id,
        idx: nextIdx,
        correctCount: nextCorrect,
        mistakeCount: nextMistakes,
      });
      store.setLevelProgress(level.id, Math.round((nextIdx / total) * 100));
    }

    if (isCorrect) {
      setCorrectCount(nextCorrect);
    } else {
      setMistakeCount(nextMistakes);
    }
    setFeedbackOpen(true);
  };

  const handleNext = () => {
    setFeedbackOpen(false);
    setSelected(null);

    // Out of hearts → fail
    if (store.getState().hearts <= 0) {
      finalizeRun(0); // still record run
      router.replace({
        pathname: '/levels',
      });
      return;
    }

    if (idx + 1 >= total) {
      finalizeRun(correctCount);
      router.replace({
        pathname: '/complete',
        params: { levelId: String(level.id) },
      });
    } else {
      setIdx((i) => i + 1);
    }
  };

  const finalizeRun = (extra: number) => {
    const elapsedSeconds = Math.max(
      1,
      Math.floor((Date.now() - startTimeRef.current) / 1000),
    );
    const correct = correctCount + extra; // extra for last question handled inside flow
    const stars: 0 | 1 | 2 | 3 =
      mistakeCount === 0 ? 3 : mistakeCount <= 1 ? 3 : mistakeCount <= 2 ? 2 : 1;
    const xpEarned = stars * 40;
    store.completeLevel(level.id, stars, xpEarned);
    store.setLastRun({
      levelId: level.id,
      correct,
      total,
      mistakes: mistakeCount,
      elapsedSeconds,
      xpEarned,
      stars,
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          hitSlop={10}
          onPress={() => router.back()}
          style={styles.close}>
          <Text style={styles.closeText}>✕</Text>
        </Pressable>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <View style={styles.heartsRow}>
          {[0, 1, 2].map((i) => (
            <Text
              key={i}
              style={[styles.heart, { opacity: i < state.hearts ? 1 : 0.2 }]}>
              ❤️
            </Text>
          ))}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.kicker}>
          Level {level.id} · {q.pageTitle} · Întrebarea {idx + 1} din {total}
        </Text>

        {q.scenario && (
          <View style={styles.scenarioCard}>
            <Text style={styles.scenarioIcon}>📩</Text>
            <Text style={styles.scenarioText}>{q.scenario}</Text>
          </View>
        )}

        <Text style={styles.prompt}>{q.prompt}</Text>

        <View style={styles.options}>
          {q.options.map((opt) => {
            const isSel = selected?.id === opt.id;
            return (
              <Pressable
                key={opt.id}
                onPress={() => setSelected(opt)}
                style={({ pressed }) => [
                  styles.option,
                  isSel && styles.optionSelected,
                  pressed && { transform: [{ scale: 0.99 }] },
                ]}>
                <View style={[styles.optionBadge, isSel && styles.optionBadgeOn]}>
                  <Text
                    style={[
                      styles.optionBadgeText,
                      isSel && { color: '#fff' },
                    ]}>
                    {opt.id}
                  </Text>
                </View>
                <Text style={styles.optionText}>{opt.text}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          disabled={!selected}
          onPress={handleCheck}
          style={({ pressed }) => [
            styles.cta,
            !selected && styles.ctaDisabled,
            pressed && selected && { opacity: 0.9 },
          ]}>
          <Text style={styles.ctaText}>
            {selected ? 'VERIFICĂ' : 'ALEGE O OPȚIUNE'}
          </Text>
        </Pressable>
      </View>

      {/* Feedback POP-UP */}
      <Modal
        visible={feedbackOpen}
        transparent
        animationType="fade"
        onRequestClose={handleNext}>
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.modalCard,
              isCorrect ? styles.modalCardCorrect : styles.modalCardWrong,
            ]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalIcon}>{isCorrect ? '🎉' : '💡'}</Text>
              <Text
                style={[
                  styles.modalTitle,
                  { color: isCorrect ? Palette.primary : Palette.danger },
                ]}>
                {isCorrect ? 'Bravo!' : 'Recomandare'}
              </Text>
            </View>
            <Text style={styles.modalBody}>{selected?.feedback}</Text>
            {!isCorrect && (
              <View style={styles.modalCorrectBox}>
                <Text style={styles.modalCorrectLabel}>Răspunsul corect</Text>
                <Text style={styles.modalCorrectText}>
                  {q.options.find((o) => o.id === q.correctId)?.text}
                </Text>
              </View>
            )}
            <Pressable
              onPress={handleNext}
              style={({ pressed }) => [
                styles.modalBtn,
                {
                  backgroundColor: isCorrect ? Palette.primary : Palette.danger,
                },
                pressed && { opacity: 0.9 },
              ]}>
              <Text style={styles.modalBtnText}>
                {idx + 1 >= total ? 'TERMINĂ NIVELUL' : 'CONTINUĂ'}
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
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
  },
  close: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: { fontSize: 20, color: Palette.textSecondary },
  progressTrack: {
    flex: 1,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#EFEFEF',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Palette.primary,
    borderRadius: 7,
  },
  heartsRow: { flexDirection: 'row', gap: 2 },
  heart: { fontSize: 18 },
  scroll: { paddingHorizontal: 22, paddingTop: 4, paddingBottom: 130 },
  kicker: {
    color: Palette.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 12,
  },
  scenarioCard: {
    backgroundColor: '#E9F4FF',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    borderColor: '#CFE5F8',
    marginBottom: 18,
  },
  scenarioIcon: { fontSize: 18 },
  scenarioText: {
    flex: 1,
    fontSize: 14,
    color: '#1B3B5F',
    lineHeight: 20,
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
    borderColor: Palette.primary,
    backgroundColor: '#F1FAEA',
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
    backgroundColor: Palette.primary,
    borderColor: Palette.primary,
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 18,
    paddingBottom: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1',
  },
  cta: {
    backgroundColor: Palette.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  ctaDisabled: { backgroundColor: '#D0D0D0' },
  ctaText: { color: '#fff', fontWeight: '800', fontSize: 15, letterSpacing: 0.5 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 22,
    paddingBottom: 32,
    borderTopWidth: 4,
  },
  modalCardCorrect: { borderTopColor: Palette.primary },
  modalCardWrong: { borderTopColor: Palette.danger },
  modalHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  modalIcon: { fontSize: 26 },
  modalTitle: { fontSize: 20, fontWeight: '800' },
  modalBody: {
    fontSize: 14,
    color: Palette.textPrimary,
    marginTop: 12,
    lineHeight: 20,
  },
  modalCorrectBox: {
    marginTop: 14,
    backgroundColor: '#F1FAEA',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#CDE9B0',
  },
  modalCorrectLabel: {
    color: Palette.primaryDark,
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  modalCorrectText: {
    color: Palette.textPrimary,
    fontSize: 14,
    lineHeight: 20,
  },
  modalBtn: {
    marginTop: 18,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  modalBtnText: { color: '#fff', fontWeight: '800', fontSize: 14, letterSpacing: 0.4 },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyEmoji: { fontSize: 56 },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Palette.textPrimary,
    marginTop: 10,
  },
  emptySubtitle: {
    color: Palette.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  emptyBtn: {
    marginTop: 22,
    backgroundColor: Palette.primary,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 14,
  },
  emptyBtnText: { color: '#fff', fontWeight: '800' },
});
