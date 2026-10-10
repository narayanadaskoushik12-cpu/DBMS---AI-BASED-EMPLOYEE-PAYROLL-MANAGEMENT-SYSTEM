import numpy as np
from typing import List, Dict

# Pre-seeded HR policy and labour-code corpus (Dimension 15, 33, 37)
POLICY_CORPUS = [
    {
        "id": "POL-001",
        "title": "Maternity Leave & Pay Continuity (Dimension 22 & 30)",
        "content": "Female employees are entitled to 26 weeks of fully paid maternity leave under the Maternity Benefit Act. Phased return-to-work permits 50% working hours for 60 days with 100% salary continuation.",
        "category": "Leave & Inclusion"
    },
    {
        "id": "POL-002",
        "title": "Emergency Hospitalization & Cashless Advance (Dimension 3 & 4)",
        "content": "Emergency hospitalization triggers automatic cashless pre-approval up to ₹5,00,000 within 2 hours. Salary advance up to ₹1,00,000 can be disbursed immediately without manager intervention.",
        "category": "Health & Emergency"
    },
    {
        "id": "POL-003",
        "title": "Indian Labour Code Notice Period & Gratuity (Dimension 12 & 15)",
        "content": "Employees with 5 or more continuous years of service are legally entitled to statutory gratuity calculated as (15 * Last Drawn Basic * Tenure in Years) / 26. Notice period buyout cannot exceed 90 days basic pay.",
        "category": "Legal & Exit"
    },
    {
        "id": "POL-004",
        "title": "Tax Regime Comparison: New vs Old Slabs (Dimension 33)",
        "content": "Under Section 115BAC (New Tax Regime), income up to ₹7,00,000 is 100% rebate exempt with lower progressive tax slabs. Old regime allows deductions under Section 80C (₹1.5L), 80D (₹75k), and HRA exemptions.",
        "category": "Tax & Compliance"
    },
    {
        "id": "POL-005",
        "title": "Nomadic Workation & Multi-Country Tax Rules (Dimension 18 & 42)",
        "content": "Employees may work remotely overseas for up to 30 calendar days per fiscal year. Stays exceeding 183 days trigger host country tax residency liabilities and require payroll entity-of-record conversion.",
        "category": "Global Mobility"
    },
    {
        "id": "POL-006",
        "title": "AI Tooling Allowance & Human-AI Synergy (Dimension 41)",
        "content": "Every technical and product employee is allocated a monthly employer-funded $120 AI copilot credit directly through payroll for licensed access to Claude Opus, GPT-4o, and Cursor IDE tools.",
        "category": "AI Future of Work"
    }
]

# Simple lightweight TF-IDF / Cosine Similarity Semantic Vector Search Engine
class LightweightVectorDB:
    def __init__(self):
        self.documents = POLICY_CORPUS
        self.vocabulary = set()
        for doc in self.documents:
            words = self._tokenize(doc["title"] + " " + doc["content"])
            self.vocabulary.update(words)
        self.vocab_list = list(self.vocabulary)
        self.vocab_index = {w: i for i, w in enumerate(self.vocab_list)}
        self.doc_vectors = [self._vectorize(doc["title"] + " " + doc["content"]) for doc in self.documents]

    def _tokenize(self, text: str) -> List[str]:
        return [w.lower().strip(".,;:?!()") for w in text.split() if len(w) > 2]

    def _vectorize(self, text: str) -> np.ndarray:
        vec = np.zeros(len(self.vocab_list))
        words = self._tokenize(text)
        for w in words:
            if w in self.vocab_index:
                vec[self.vocab_index[w]] += 1
        norm = np.linalg.norm(vec)
        return vec / norm if norm > 0 else vec

    def search(self, query: str, top_k: int = 2) -> List[Dict]:
        query_vec = self._vectorize(query)
        scores = []
        for i, doc_vec in enumerate(self.doc_vectors):
            cos_sim = np.dot(query_vec, doc_vec)
            scores.append((cos_sim, self.documents[i]))
        scores.sort(key=lambda x: x[0], reverse=True)
        return [{"score": float(s), "doc": d} for s, d in scores[:top_k] if s > 0.05]

vector_db = LightweightVectorDB()

def rag_query_engine(query: str) -> Dict:
    results = vector_db.search(query, top_k=2)
    if not results:
        return {
            "query": query,
            "answer": "No specific policy clause found for your inquiry in the enterprise database. Please contact HR.",
            "citations": []
        }

    top_doc = results[0]["doc"]
    # Formulate contextual synthesized RAG response
    synthesized_answer = (
        f"Based on {top_doc['title']} ({top_doc['category']}): {top_doc['content']}"
    )

    return {
        "query": query,
        "answer": synthesized_answer,
        "similarity_score": round(results[0]["score"], 3),
        "citations": [r["doc"]["title"] for r in results]
    }
