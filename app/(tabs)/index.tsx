import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import CounterButton from '../../components/CounterButton';

interface CounterDisplayProps {
  count: number;
  onAdd: () => void;
  onMinus: () => void;
  onReset: () => void;
  onAddPressIn: () => void;
  onAddPressOut: () => void;
  onMinusPressIn: () => void;
  onMinusPressOut: () => void;
}

function CounterDisplay({
  count,
  onAdd,
  onMinus,
  onReset,
  onAddPressIn,
  onAddPressOut,
  onMinusPressIn,
  onMinusPressOut
}: CounterDisplayProps) {
  const getBatteryMessage = (val: number) => {
    if (val < 0) return "Sagad na sagad na";
    if (val === 0) return "Patay na";
    if (val < 50) return "Pa charge po";
    if (val < 100) return "Konti nalang";
    if (val === 100) return "Yehey full na";
    return "BOOM! Nasabugan kana";
  };

  const getBatteryColor = (val: number) => {
    if (val < 20) return '#EF4444';
    if (val < 50) return '#F59E0B';
    if (val > 100) return '#8B5CF6';
    return '#10B981';
  };

  const chargeWidth = Math.min(Math.max(count, 0), 100);

  return (
    <View style={childStyles.container}>
      <View style={childStyles.content}>
        <Text style={childStyles.title}>{getBatteryMessage(count)}</Text>

        <View style={childStyles.batteryWrapper}>
          <View style={[childStyles.batteryOutline, count > 100 && { borderColor: '#EF4444' }]}>
            <View
              style={[
                childStyles.batteryFill,
                { width: `${chargeWidth}%`, backgroundColor: getBatteryColor(count) }
              ]}
            />
            <Text style={childStyles.batteryText}>{count}%</Text>
          </View>
          <View style={[childStyles.batteryNub, count > 100 && { backgroundColor: '#EF4444' }]} />
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

        <View style={{ width: '100%', marginTop: 24 }}>
          <CounterButton
            title="Reset"
            color="#475569"
            onPress={onReset}
          />
        </View>
      </View>
    </View>
  );
}

export default function App() {
  const [count, setCount] = useState(100);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAdd = () => setCount(prev => prev + 1);
  const handleMinus = () => setCount(prev => prev - 1);
  const handleReset = () => setCount(100);

  const startAdding = () => {
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => setCount(prev => prev + 1), 50);
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
      intervalRef.current = setInterval(() => setCount(prev => prev - 1), 50);
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
              <Text style={styles.stateLockerTitle}>STATE LOCKER</Text>
              <Text style={styles.stateLockerCount}>Count: {count}</Text>
            </View>

            <CounterDisplay
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
    backgroundColor: '#0F172A'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24
  },
  parentContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#334155'
  },
  parentBadge: {
    backgroundColor: '#3B82F6',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20
  },
  parentBadgeText: {
    color: '#EFF6FF',
    fontWeight: '700',
    fontSize: 10,
    letterSpacing: 1
  },
  parentContent: {
    padding: 0
  },
  stateLockerBox: {
    backgroundColor: '#0F172A',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155'
  },
  stateLockerTitle: {
    color: '#94A3B8',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 1.5,
    marginBottom: 8
  },
  stateLockerCount: {
    color: '#10B981',
    fontWeight: '900',
    fontSize: 32
  }
});

const childStyles = StyleSheet.create({
  container: {
    backgroundColor: '#334155',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5
  },
  headerBadge: {
    backgroundColor: '#475569',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16
  },
  headerBadgeText: {
    color: '#F8FAFC',
    fontWeight: '600',
    fontSize: 10,
    letterSpacing: 0.5
  },
  content: {
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    color: '#F8FAFC',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  batteryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  batteryOutline: {
    width: 220,
    height: 80,
    borderWidth: 5,
    borderColor: '#94A3B8',
    borderRadius: 16,
    padding: 4,
    justifyContent: 'center',
  },
  batteryFill: {
    height: '100%',
    borderRadius: 8,
  },
  batteryNub: {
    width: 12,
    height: 36,
    backgroundColor: '#94A3B8',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    marginLeft: 2,
  },
  batteryText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    left: 4, // offset the padding
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  spacer: {
    width: 40,
  }
});
