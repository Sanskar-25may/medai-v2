import os
import asyncio
import base64
import traceback
import whisper
import edge_tts
import google.generativeai as genai
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter()

# --- CONFIGURATION ---
API_KEY = "AIzaSyCDU29wP4IA_f9CziBwphUlGfDTCmmRuS0"

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

print("Loading Whisper Model...")
whisper_model = whisper.load_model("base")
print("Whisper Model Loaded!")

@router.websocket("/ws/voice")
async def voice_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("\n✅ Phone connected!")

    try:
        while True:
            print("\nWaiting for audio...")
            data = await websocket.receive_bytes()
            print(f"Received {len(data)} bytes of audio")

            # ── Per-request error handling: never kill the connection ──
            try:
                # 1. Save Input
                input_file = "input.wav"
                with open(input_file, "wb") as f:
                    f.write(data)

                # 2. Transcribe with Whisper
                print("Transcribing...")
                result = whisper_model.transcribe(input_file)
                user_text = result["text"].strip()
                print(f"User Said: '{user_text}'")

                if not user_text:
                    await websocket.send_json({"type": "error", "message": "Could not understand audio, please try again."})
                    continue

                # 3. Generate AI response
                prompt = (
                    f"You are the voice agent for 'MedAI', a healthcare platform. "
                    f"User Query: '{user_text}'. "
                    f"Instructions: "
                    f"1. If the query is NOT health-related, politely refuse. "
                    f"2. If it IS health-related, give a helpful, colloquial answer in 2 short sentences. "
                    f"3. After the advice say: 'For more info, visit our MedAI app.'"
                )

                print("Thinking...")
                response = model.generate_content(prompt)
                clean_text = response.text.replace("*", "").replace("#", "")
                print(f"AI Says: {clean_text}")

                # 4. Convert to speech
                output_file = "response.mp3"
                communicate = edge_tts.Communicate(clean_text, "en-IN-NeerjaNeural")
                await communicate.save(output_file)

                # 5. Send audio back to phone
                if os.path.exists(output_file) and os.path.getsize(output_file) > 0:
                    with open(output_file, "rb") as audio_file:
                        audio_bytes = audio_file.read()
                        base64_audio = base64.b64encode(audio_bytes).decode("utf-8")

                    await websocket.send_json({
                        "type": "audio",
                        "data": base64_audio
                    })
                    print("✅ Sent audio response to phone")
                else:
                    await websocket.send_json({"type": "error", "message": "TTS failed, no audio generated."})

            except Exception as processing_error:
                # This catches whisper/gemini/tts errors WITHOUT closing the WebSocket
                error_msg = str(processing_error)
                print(f"❌ Processing Error: {error_msg}")
                traceback.print_exc()
                try:
                    await websocket.send_json({"type": "error", "message": f"Processing error: {error_msg}"})
                except Exception:
                    pass  # WebSocket might already be gone

    except WebSocketDisconnect:
        print("📵 Phone disconnected normally")
    except Exception as e:
        print(f"❌ WebSocket Error: {e}")
        traceback.print_exc()