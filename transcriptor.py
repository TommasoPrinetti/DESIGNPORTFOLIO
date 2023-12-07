import os
import whisper
import warnings
from docx import Document
from tqdm.auto import tqdm

# Define the source and target folders
source_folder = '/path/to/source/folder'  # Replace with your source folder path
target_folder = '/path/to/target/folder'  # Replace with your target folder path

def find_audio_files(folder):
    audio_files = []
    for filename in os.listdir(folder):
        if filename.endswith('.mp3') or filename.endswith('.wav'):
            audio_files.append(os.path.join(folder, filename))
    return audio_files

def transcribe_audio(audio_path, model_type="large-v3"):
    model = whisper.load_model(model_type)
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        result = model.transcribe(audio_path, language="it", verbose=True)  # Setting language to Italian
    return result["text"]

def main():
    audio_files = find_audio_files(source_folder)
    document = Document()
    
    with tqdm(total=len(audio_files), desc="Transcription Progress") as pbar:
        for audio_file in audio_files:
            transcription = transcribe_audio(audio_file)
            document.add_paragraph(f"File: {os.path.basename(audio_file)}\nTranscription:\n{transcription}\n")
            pbar.update(1)

    # Save the document
    docx_path = os.path.join(target_folder, "transcriptions.docx")
    document.save(docx_path)
    print(f"Transcriptions saved to {docx_path}")

if __name__ == "__main__":
    main()
