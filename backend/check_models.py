import google.generativeai as genai

# PASTE YOUR KEY HERE
api_key = "AIzaSyCDU29wP4IA_f9CziBwphUlGfDTCmmRuS0"

genai.configure(api_key=api_key)

print("Checking available models...")
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"- {m.name}")
except Exception as e:
    print(f"Error: {e}")