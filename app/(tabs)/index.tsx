import React, { useState, useRef, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import CounterButton from "../../components/CounterButton";
import { FontAwesome5 } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  runOnJS,
  Easing,
} from "react-native-reanimated";

function FallingCoin({ id, onComplete }: { id: number; onComplete: (id: number) => void }) {
  const translateY = useSharedValue(-60);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    scale.value = withSpring(1);
    translateY.value = withTiming(
      100,
      { duration: 400, easing: Easing.in(Easing.quad) },
      (finished) => {
        if (finished) {
          opacity.value = withTiming(0, { duration: 100 }, (opacityFinished) => {
            if (opacityFinished) {
              runOnJS(onComplete)(id);
            }
          });
        }
      }
    );
  }, [id, onComplete, opacity, scale, translateY]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
    opacity: opacity.value,
    position: "absolute",
    top: -60,
    zIndex: 4,
  }));

  return (
    <Animated.View style={style}>
      <View style={childStyles.coin}>
        <Text style={childStyles.coinText}>$</Text>
      </View>
    </Animated.View>
  );
}

interface PiggyBankDisplayProps {
  count: number;
  onAdd: () => void;
  onMinus: () => void;
  onReset: () => void;
  onAddPressIn: () => void;
  onAddPressOut: () => void;
  onMinusPressIn: () => void;
  onMinusPressOut: () => void;
}

function PiggyBankDisplay({
  count,
  onAdd,
  onMinus,
  onReset,
  onAddPressIn,
  onAddPressOut,
  onMinusPressIn,
  onMinusPressOut,
}: PiggyBankDisplayProps) {
  const [fallingCoins, setFallingCoins] = useState<{ id: number }[]>([]);
  const nextCoinId = useRef(0);
  const prevCountRef = useRef(count);
  const piggyScale = useSharedValue(1);
  const lastCoinSpawnTime = useRef(0);

  const removeCoin = useCallback((id: number) => {
    setFallingCoins((prev) => prev.filter((coin) => coin.id !== id));
  }, []);

  useEffect(() => {
    if (count > prevCountRef.current) {
      const now = Date.now();
      if (now - lastCoinSpawnTime.current > 100) {
        setFallingCoins((prev) => [...prev, { id: nextCoinId.current++ }]);
        lastCoinSpawnTime.current = now;
      }
      piggyScale.value = withSequence(
        withTiming(1.15, { duration: 80 }),
        withSpring(1, { damping: 4, stiffness: 200 })
      );
    } else if (count < prevCountRef.current) {
      piggyScale.value = withSequence(
        withTiming(0.85, { duration: 80 }),
        withSpring(1, { damping: 4, stiffness: 200 })
      );
    }
    prevCountRef.current = count;
  }, [count, piggyScale]);

  const piggyStyle = useAnimatedStyle(() => ({
    transform: [{ scale: piggyScale.value }],
  }));

  const getMessage = (val: number) => {
    if (val < 0) return "In Debt! 💸";
    if (val === 0) return "Broke! 😭";
    if (val < 50) return "Saving up... 🪙";
    if (val < 100) return "Getting richer! 💰";
    if (val === 100) return "Goal reached! 🎉";
    return "Overflowing! 🤑";
  };

  return (
    <View style={childStyles.container}>
      <View style={childStyles.content}>
        <Text style={childStyles.title}>{getMessage(count)}</Text>

        <View style={childStyles.piggyWrapper}>
          {fallingCoins.map((coin) => (
            <FallingCoin key={coin.id} id={coin.id} onComplete={removeCoin} />
          ))}

          <Animated.View style={[childStyles.piggyContainer, piggyStyle]}>
            <FontAwesome5 name="piggy-bank" size={110} color="#F472B6" />
          </Animated.View>

          <View style={childStyles.countBadge}>
            <Text style={childStyles.countBadgeText}>${count}</Text>
          </View>
        </View>

        <View style={childStyles.counterRow}>
          <CounterButton
            title="-"
            color="#F43F5E"
            onPress={onMinus}
            onPressIn={onMinusPressIn}
            onPressOut={onMinusPressOut}
            isCircular={true}
          />
          <View style={childStyles.spacer} />
          <CounterButton
            title="+"
            color="#10B981"
            onPress={onAdd}
            onPressIn={onAddPressIn}
            onPressOut={onAddPressOut}
            isCircular={true}
          />
        </View>

        <View style={{ width: "100%", marginTop: 24 }}>
          <CounterButton title="Smash Piggy Bank" color="#8B5CF6" onPress={onReset} />
        </View>
      </View>
    </View>
  );
}

export default function App() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAdd = () => setCount((prev) => prev + 1);
  const handleMinus = () => setCount((prev) => prev - 1);
  const handleReset = () => setCount(0);

  const startAdding = () => {
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => setCount((prev) => prev + 1), 50);
    }, 300);
  };

  const stopAdding = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutRef.current = null;
    intervalRef.current = null;
  };

  const startMinus = () => {
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => setCount((prev) => prev - 1), 50);
    }, 300);
  };

  const stopMinus = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutRef.current = null;
    intervalRef.current = null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.parentContainer}>
          <View style={styles.parentContent}>
            <View style={styles.stateLockerBox}>
              <Text style={styles.stateLockerTitle}>SAVINGS LOCKER</Text>
              <Text style={styles.stateLockerCount}>Current: ${count}</Text>
            </View>

            <PiggyBankDisplay
              count={count}
              onAdd={handleAdd}
              onMinus={handleMinus}
              onReset={handleReset}
              onAddPressIn={startAdding}
              onAddPressOut={stopAdding}
              onMinusPressIn={startMinus}
              onMinusPressOut={stopMinus}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B0F19",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  parentContainer: {
    backgroundColor: "#131C2D",
    borderRadius: 40,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  parentContent: {
    padding: 16,
  },
  stateLockerBox: {
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  stateLockerTitle: {
    color: "#64748B",
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 4,
  },
  stateLockerCount: {
    color: "#38BDF8",
    fontWeight: "900",
    fontSize: 28,
  },
});

const childStyles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(30, 41, 59, 0.7)",
    borderRadius: 32,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    color: "#F8FAFC",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  piggyWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 220,
    width: 220,
    marginVertical: 20,
    backgroundColor: "rgba(244, 114, 182, 0.1)",
    borderRadius: 110,
    borderWidth: 2,
    borderColor: "rgba(244, 114, 182, 0.3)",
  },
  piggyContainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  countBadge: {
    position: "absolute",
    bottom: -15,
    backgroundColor: "#10B981",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "#0F172A",
    zIndex: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  countBadgeText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 24,
  },
  coin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FBBF24",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#F59E0B",
    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  coinText: {
    color: "#B45309",
    fontWeight: "900",
    fontSize: 20,
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 32,
    marginBottom: 10,
  },
  spacer: {
    width: 40,
  },
});
