import asyncio
import datetime
from typing import Dict, List, Callable
from collections import defaultdict

# Asynchronous in-memory event bus simulating Apache Kafka's partitioned topic & consumer-group architecture
class KafkaNotificationBus:
    def __init__(self):
        # Topics dictionary holding in-memory published events
        self.topics: Dict[str, List[Dict]] = defaultdict(list)
        # Subscribers listening to topics
        self.subscribers: Dict[str, List[Callable]] = defaultdict(list)
        # Stored notification log (mirrors MongoDB notifications collection)
        self.stored_notifications: List[Dict] = []

    def publish(self, topic: str, event_type: str, payload: Dict):
        """Produces and publishes an event to a Kafka topic."""
        event = {
            "topic": topic,
            "event_type": event_type,
            "payload": payload,
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "offset": len(self.topics[topic]) + 1
        }
        self.topics[topic].append(event)
        
        # Save to notification inbox log (simulates Notification Service consuming from Kafka)
        notification_entry = {
            "id": f"NOTIF-{len(self.stored_notifications) + 1:04d}",
            "topic": topic,
            "title": f"Event: {event_type}",
            "message": f"Processed event on {topic}: {payload.get('detail', str(payload))}",
            "severity": payload.get("severity", "info"),
            "timestamp": event["timestamp"],
            "read": False
        }
        self.stored_notifications.insert(0, notification_entry)
        return event

    def get_notifications(self, limit: int = 15) -> List[Dict]:
        """Returns the consumed notification stream."""
        return self.stored_notifications[:limit]

kafka_bus = KafkaNotificationBus()

# Pre-populate with typical startup events
kafka_bus.publish(
    topic="payroll-events",
    event_type="payroll.batch_verified",
    payload={"detail": "Monthly payroll run batch verified with SHA-256 digital signatures", "severity": "success"}
)
kafka_bus.publish(
    topic="alert-events",
    event_type="overtime.fatigue_guard",
    payload={"detail": "Fatigue guard evaluated 5 departments: all within safe 92/100 bounds", "severity": "info"}
)
kafka_bus.publish(
    topic="leave-events",
    event_type="leave.smart_sync",
    payload={"detail": "Optimal holiday bridges calculated for Q4 calendar", "severity": "info"}
)
