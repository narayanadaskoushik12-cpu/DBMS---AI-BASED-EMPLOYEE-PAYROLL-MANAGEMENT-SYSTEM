import os
import sys
import math
import numpy as np
import cv2
from PIL import Image, ImageDraw, ImageFont
import win32com.client
import imageio_ffmpeg

ROOT_DIR = r"C:\Users\naray\employee-payroll-system"
ASSETS_DIR = os.path.join(ROOT_DIR, "ai_video_assets")
os.makedirs(ASSETS_DIR, exist_ok=True)
OUTPUT_VIDEO = os.path.join(ROOT_DIR, "verdant_payroll_video.mp4")
BRAIN_DIR = r"C:\Users\naray\.gemini\antigravity\brain\31a9b43a-8ba7-4a2b-99c0-bb04936a6ae6"

# Load Fonts
FONT_TITLE = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 36)
FONT_SUB = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 20)
FONT_CARD_TITLE = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 22)
FONT_CARD_TEXT = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 16)
FONT_MONO = ImageFont.truetype(r"C:\Windows\Fonts\consola.ttf", 18)
FONT_SUBTITLE = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 22)

# Load Presenter Image
PRESENTER_IMG_PATH = os.path.join(ROOT_DIR, "images", "employee_hero.jpg")
presenter_base = Image.open(PRESENTER_IMG_PATH).convert("RGB")

# 1. Voiceover script for each scene
scenes_data = [
    {
        "id": 1,
        "title": "VERDANT PAYROLL OS",
        "category": "PROJECT OVERVIEW",
        "audio_text": "Welcome to Verdant Payroll OS, an intelligent employee payroll and workforce management system featuring real-time compensation streaming.",
        "subtitle": "Welcome to Verdant Payroll OS: real-time streaming, semantic RAG, and polyglot architecture.",
        "duration_sec": 13.0
    },
    {
        "id": 2,
        "title": "Real-Time Streaming & Auth",
        "category": "CORE COMPENSATION",
        "audio_text": "Wages accrue continuously per second worked. Employees can withdraw instant advances via UPI, while Bcrypt and JWT enforce strict role-based access control.",
        "subtitle": "Wages accrue per second; Bcrypt and JWT enforce role-based access control.",
        "duration_sec": 14.0
    },
    {
        "id": 3,
        "title": "Semantic Vector RAG AI",
        "category": "COGNITIVE POLICY ENGINE",
        "audio_text": "Our local vector RAG engine resolves statutory labor laws and company leave policies in milliseconds, while immutable audit trails are logged to MongoDB.",
        "subtitle": "Our local vector RAG engine resolves policy questions with sub-25ms precision.",
        "duration_sec": 14.0
    },
    {
        "id": 4,
        "title": "System Architecture & Stack",
        "category": "ENTERPRISE TOPOLOGY",
        "audio_text": "PostgreSQL 18.4 guarantees atomic financial ledgers, while MongoDB and Apache Kafka process high-throughput audit telemetry and live events.",
        "subtitle": "PostgreSQL secures relational data while Kafka processes real-time events.",
        "duration_sec": 14.0
    },
    {
        "id": 5,
        "title": "Current vs. Planned Enhancements",
        "category": "ROADMAP & VALUE",
        "audio_text": "Employees gain instant liquidity and financial freedom, while enterprises maintain total compliance. Verdant Payroll OS: nurture capital, empower humans.",
        "subtitle": "Employees gain instant liquidity, while enterprises maintain total compliance.",
        "duration_sec": 14.0
    }
]

print("Script data ready. Generating audio tracks...")
# Generate Voiceover audio using Windows SAPI
voice = win32com.client.Dispatch("SAPI.SpVoice")
voice.Rate = 0 # Normal speaking rate
audio_files = []

for sc in scenes_data:
    wav_path = os.path.join(ASSETS_DIR, f"scene_{sc['id']}.wav")
    stream = win32com.client.Dispatch("SAPI.SpFileStream")
    stream.Open(wav_path, 3) # SSFMCreateForWrite
    voice.AudioOutputStream = stream
    voice.Speak(sc['audio_text'])
    stream.Close()
    audio_files.append(wav_path)
    print(f"Generated audio: {wav_path}")

print("Audio generation complete.")
