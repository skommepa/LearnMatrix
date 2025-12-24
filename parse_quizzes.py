import json
import re

def parse_txt(filename, subject):
    with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    content = content.replace('\u2028', '\n')
    
    units = {}
    current_unit = "Unit 1" # Default
    current_batch = []
    
    lines = content.split('\n')
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        # Check for Unit header e.g. "Unit-1" or "Unit 1"
        unit_match = re.match(r'(?i)Unit[- ](\d+)', line)
        if unit_match:
            # If we had questions in the current batch without an answer key,
            # this shouldn't happen with the current files, but we'll reset.
            current_unit = f"Unit {unit_match.group(1)}"
            if current_unit not in units:
                units[current_unit] = []
            i += 1
            continue

        # Check if line starts a question
        q_match = re.match(r'^(?:•|\d+\.)\s+(.*)', line)
        if q_match:
            q_text = q_match.group(1)
            opts = []
            i += 1
            while i < len(lines):
                next_line = lines[i].strip()
                opt_match = re.match(r'^([A-D|a-d])[\.\)]\s*(.*)', next_line)
                if opt_match:
                    opts.append(opt_match.group(2).strip())
                    i += 1
                elif not next_line:
                    i += 1
                else:
                    break
            if len(opts) >= 2:
                current_batch.append({"question": q_text, "options": opts})
            continue
            
        # Check if Answer Key
        if re.search(r'(?i)Answer Key|ANSWERS', line):
            i += 1
            ans_letters = []
            while i < len(lines):
                ans_line = lines[i].strip()
                if not ans_line: 
                    i += 1
                    continue
                ans_match = re.match(r'^(?:•|\d+\.)?\s*([A-D|a-d])\s*$', ans_line)
                if ans_match:
                    ans_letters.append(ans_match.group(1).upper())
                    i += 1
                else:
                    break
            
            # Map answers to current batch and add to current_unit
            if current_unit not in units:
                units[current_unit] = []
                
            for j, q in enumerate(current_batch):
                if j < len(ans_letters):
                    q['answer'] = ord(ans_letters[j]) - ord('A')
                    q['id'] = len(units[current_unit]) + 1
                    units[current_unit].append(q)
            current_batch = []
            continue
            
        i += 1

    # Remove empty units
    units = {k: v for k, v in units.items() if v}
    print(f"Parsed {sum(len(v) for v in units.values())} questions across {len(units)} units from {filename}")
    return units

all_quizzes = {}
subjects = {
    "AP Micro": "micro.txt",
    "AP Macro": "macro.txt",
    "AP Statistics": "stats.txt",
    "AP Euro": "euro.txt"
}

# Ensure TXT files are available
import subprocess
for name, file_name in subjects.items():
    docx_name = file_name.replace(".txt", "")
    # Map back to original DOCX names
    actual_docx = {
        "micro.txt": "Quiz Recources/Ap Micro Quiz Questions.docx",
        "macro.txt": "Quiz Recources/AP Macro Quiz Questions.docx",
        "stats.txt": "Quiz Recources/Ap Stats Quiz Questions.docx",
        "euro.txt": "Quiz Recources/AP Euro Quiz Questions_.docx"
    }
    subprocess.run(["textutil", "-convert", "txt", actual_docx[file_name], "-output", file_name])

for name, file in subjects.items():
    all_quizzes[name] = parse_txt(file, name)

with open('src/assets/data/quizzes.json', 'w') as f:
    json.dump(all_quizzes, f, indent=2)

print("Parsed quizzes saved to src/assets/data/quizzes.json")
