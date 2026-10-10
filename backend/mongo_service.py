from pymongo import MongoClient
import datetime

# Connect to local running MongoDB service on port 27017
MONGO_URI = "mongodb://localhost:27017"
mongo_client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=2000)

db_mongo = mongo_client["payroll_nosql_db"]

# Collections matching Section 5.3 of your Tech Stack Spec:
# 1. audit_logs: "Who viewed or changed what", consent ledger
# 2. chat_history: Conversational RAG queries and responses
# 3. grievances: Flexible complaint tickets and whistleblowing reports
# 4. notifications: Persistent notification documents
audit_collection = db_mongo["audit_logs"]
chat_history_collection = db_mongo["chat_history"]
grievances_collection = db_mongo["grievances"]
notifications_collection = db_mongo["notifications"]

def log_audit_event(actor_email: str, action: str, resource: str, metadata: dict = None):
    """Stores high-volume unstructured audit and consent trail documents in MongoDB."""
    entry = {
        "actor": actor_email,
        "action": action,
        "resource": resource,
        "metadata": metadata or {},
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "hash_type": "SHA-256"
    }
    try:
        audit_collection.insert_one(entry)
    except Exception as e:
        print("MongoDB audit write error:", e)

def log_chat_interaction(user_query: str, ai_response: str, citations: list, score: float):
    """Stores full conversational dialogue history in MongoDB."""
    entry = {
        "query": user_query,
        "response": ai_response,
        "citations": citations,
        "similarity_score": score,
        "timestamp": datetime.datetime.utcnow().isoformat()
    }
    try:
        chat_history_collection.insert_one(entry)
    except Exception as e:
        print("MongoDB chat history write error:", e)

def get_recent_audit_logs(limit: int = 15):
    """Retrieves recent audit logs from MongoDB."""
    try:
        logs = list(audit_collection.find({}, {"_id": 0}).sort("timestamp", -1).limit(limit))
        return logs
    except Exception:
        return []

def get_recent_chat_history(limit: int = 15):
    """Retrieves conversation history from MongoDB."""
    try:
        chats = list(chat_history_collection.find({}, {"_id": 0}).sort("timestamp", -1).limit(limit))
        return chats
    except Exception:
        return []
