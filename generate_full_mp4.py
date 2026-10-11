import os
import subprocess
import wave
import math
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg
import shutil

ROOT_DIR = r"C:\Users\naray\employee-payroll-system"
ASSETS_DIR = os.path.join(ROOT_DIR, "ai_video_assets")
TEMP_VIDEO = os.path.join(ASSETS_DIR, "temp_video.mp4")
MASTER_AUDIO = os.path.join(ASSETS_DIR, "master_audio.wav")
FINAL_MP4 = os.path.join(ROOT_DIR, "verdant_payroll_video.mp4")
BRAIN_DIR = r"C:\Users\naray\.gemini\antigravity\brain\31a9b43a-8ba7-4a2b-99c0-bb04936a6ae6"

FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()
W, H = 1280, 720
FPS = 25

# Import scene builders from build_video_step2
from build_video_step2 import (
    build_scene_1, build_scene_2, build_scene_3, build_scene_4, build_scene_5,
    draw_subtitles, draw_rounded_rect, FONT_SUBTITLE
)

# 1. Prepare Master Audio with smooth scene pauses
# Audio durations
scene_audios = [os.path.join(ASSETS_DIR, f"scene_{i}.wav") for i in range(1, 6)]
scene_durations = []

# Read sample parameters from scene_1.wav
with wave.open(scene_audios[0], 'rb') as w:
    params = w.getparams()
    nchannels, sampwidth, framerate = params[0], params[1], params[2]

master_frames = bytearray()
scene_exact_seconds = []

for idx, wav_file in enumerate(scene_audios):
    with wave.open(wav_file, 'rb') as w:
        frames = w.readframes(w.getnframes())
        sec = w.getnframes() / float(framerate)
        master_frames.extend(frames)
        
        # Add pause buffer (2.5s for scenes 1-4, 3.5s for scene 5)
        pause_sec = 3.5 if idx == 4 else 2.5
        pause_frames_count = int(pause_sec * framerate)
        pause_bytes = b'\x00' * (pause_frames_count * nchannels * sampwidth)
        master_frames.extend(pause_bytes)
        
        scene_total_sec = sec + pause_sec
        scene_exact_seconds.append(scene_total_sec)
        print(f"Scene {idx+1}: audio={sec:.2f}s, pause={pause_sec:.2f}s -> Total={scene_total_sec:.2f}s")

with wave.open(MASTER_AUDIO, 'wb') as w_out:
    w_out.setparams(params)
    w_out.writeframes(master_frames)

total_video_seconds = sum(scene_exact_seconds)
total_frames = int(total_video_seconds * FPS)
print(f"Total Video Duration: {total_video_seconds:.2f}s ({total_frames} frames)")

# Scene subtitle configs
scenes_config = [
    {
        "builder": build_scene_1,
        "seconds": scene_exact_seconds[0],
        "sub_before": "Welcome to",
        "sub_highlight": "Verdant Payroll OS:",
        "sub_after": "real-time streaming & AI architecture."
    },
    {
        "builder": build_scene_2,
        "seconds": scene_exact_seconds[1],
        "sub_before": "Wages accrue per second;",
        "sub_highlight": "Bcrypt & JWT",
        "sub_after": "enforce role access."
    },
    {
        "builder": build_scene_3,
        "seconds": scene_exact_seconds[2],
        "sub_before": "Our local vector RAG resolves",
        "sub_highlight": "policy queries",
        "sub_after": "in under 25ms."
    },
    {
        "builder": build_scene_4,
        "seconds": scene_exact_seconds[3],
        "sub_before": "PostgreSQL secures ledgers while",
        "sub_highlight": "Kafka",
        "sub_after": "processes real-time events."
    },
    {
        "builder": build_scene_5,
        "seconds": scene_exact_seconds[4],
        "sub_before": "Employees gain liquidity:",
        "sub_highlight": "Nurture Capital,",
        "sub_after": "Empower Humans."
    }
]

# 2. Render Frames directly to VideoWriter
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out_writer = cv2.VideoWriter(TEMP_VIDEO, fourcc, float(FPS), (W, H))

global_frame = 0
for sc_idx, sc in enumerate(scenes_config):
    sc_frames = int(sc["seconds"] * FPS)
    print(f"Rendering Scene {sc_idx+1} ({sc_frames} frames)...")
    
    for f in range(sc_frames):
        # Subtle presenter breathing animation
        scale_offset = 0.015 * math.sin(global_frame * 0.08)
        
        # Build base scene frame
        if sc_idx == 1:
            counter_val = 3412.50 + f * 0.06
            pil_img = build_scene_2(scale_offset=scale_offset, counter_val=counter_val)
        else:
            pil_img = sc["builder"](scale_offset=scale_offset)
            
        draw = ImageDraw.Draw(pil_img)
        draw_subtitles(draw, sc["sub_before"], sc["sub_highlight"], sc["sub_after"])
        
        # Convert PIL (RGB) to OpenCV (BGR)
        cv_frame = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)
        out_writer.write(cv_frame)
        global_frame += 1

out_writer.release()
print(f"Video stream rendered to {TEMP_VIDEO} ({global_frame} frames)")

# 3. Multiplex Video + Audio using FFmpeg
print("Multiplexing video and audio with FFmpeg...")
cmd = [
    FFMPEG_EXE,
    "-y",
    "-i", TEMP_VIDEO,
    "-i", MASTER_AUDIO,
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    FINAL_MP4
]

res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
if res.returncode == 0:
    print(f"Final MP4 Video created successfully at: {FINAL_MP4}")
    print(f"File size: {os.path.getsize(FINAL_MP4) / (1024*1024):.2f} MB")
    # Copy to brain artifact
    shutil.copyfile(FINAL_MP4, os.path.join(BRAIN_DIR, "verdant_payroll_video.mp4"))
    print("Copied to brain directory successfully!")
else:
    print("FFmpeg error:", res.stderr.decode('utf-8', errors='ignore'))
