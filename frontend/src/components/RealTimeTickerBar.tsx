import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Radio,
  Wifi,
  WifiOff,
  Bell,
  Coins,
  ShieldCheck,
  Zap,
  TrendingUp,
  X
} from 'lucide-react';

interface ToastProps {
  event: any;
  onDismiss: () => void;
}

function LiveEventToast({ event, onDismiss }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className="p-3.5 rounded-2xl cyber-glass neon-border-emerald shadow-2xl flex items-center justify-between gap-3 text-xs min-w-[320px] max-w-md"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
          <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">{event.title || 'Live Kafka Event'}</span>
            <span className="text-[9px] font-mono px-1.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              {event.topic}
            </span>
          </div>
          <p className="text-[11px] text-emerald-300/80 mt-0.5 line-clamp-1">{event.message}</p>
        </div>
      </div>

      <button
        onClick={onDismiss}
        className="text-emerald-500 hover:text-emerald-300 p-1 cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

export default function RealTimeTickerBar() {
  const [isConnected, setIsConnected] = useState(false);
  const [streamingRate, setStreamingRate] = useState(1.85); // ₹/min
  const [accumulatedToday, setAccumulatedToday] = useState(3412.50);
  const [activeToast, setActiveToast] = useState<any>(null);

  useEffect(() => {
    // 1. Establish WebSocket connection to backend
    let ws: WebSocket;
    const connect = () => {
      try {
        ws = new WebSocket('ws://127.0.0.1:8000/ws/live');
        ws.onopen = () => setIsConnected(true);
        ws.onclose = () => {
          setIsConnected(false);
          setTimeout(connect, 3000); // reconnect attempt
        };
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.kafka_latest_event && (!activeToast || activeToast.id !== data.kafka_latest_event.id)) {
              setActiveToast(data.kafka_latest_event);
              setTimeout(() => setActiveToast(null), 6000);
            }
          } catch (e) {
            console.error(e);
          }
        };
      } catch (err) {
        setIsConnected(false);
      }
    };

    connect();

    // 2. Real-time streaming money ticker ticking up every second
    const interval = setInterval(() => {
      setAccumulatedToday((prev) => prev + (1.85 / 60)); // +₹0.0308 per second
    }, 1000);

    return () => {
      clearInterval(interval);
      if (ws) ws.close();
    };
  }, []);

  return (
    <>
      {/* Toast Notification Container in Top-Right */}
      <div className="fixed top-20 right-6 z-50 pointer-events-auto">
        <AnimatePresence>
          {activeToast && (
            <LiveEventToast
              event={activeToast}
              onDismiss={() => setActiveToast(null)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Real-Time Telemetry Bar right below top nav */}
      <div className="bg-[#011409]/90 border-b border-emerald-500/20 px-4 md:px-8 py-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {isConnected ? (
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <Wifi className="w-3.5 h-3.5" />
                <span>WS LIVE</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-400">
                <WifiOff className="w-3.5 h-3.5" />
                <span>OFFLINE (RETRYING)</span>
              </span>
            )}
          </div>

          <div className="w-px h-3.5 bg-emerald-900" />

          {/* Real-time money streaming ticker */}
          <div className="flex items-center gap-1.5 text-emerald-200">
            <Coins className="w-3.5 h-3.5 text-emerald-400" />
            <span>REAL-TIME STREAMING:</span>
            <span className="font-bold text-white text-xs font-mono">
              ₹{accumulatedToday.toFixed(2)}
            </span>
            <span className="text-[10px] text-emerald-400/80">(+₹1.85/min)</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-emerald-400/80">
          <span className="hidden sm:inline">
            POSTGRESQL 18.4 &bull; MONGODB v8.3 &bull; KAFKA BUS ONLINE
          </span>
          <span className="text-white font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            AUTONOMOUS PULSE
          </span>
        </div>
      </div>
    </>
  );
}
