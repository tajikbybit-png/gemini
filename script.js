const files = {
    "main.cpp": `#include <iostream>
using namespace std;

int main() {
    cout << "Салом, Тоҷикистон! Хуш омадед ба C++ IDE." << endl;
    return 0;
}`,
    "utils.h": `#ifndef UTILS_H
#define UTILS_H

inline void salom() {
    // Функсияи ёрирасон
}

#endif`
};

const lessons = {
    "1": `#include <iostream>
using namespace std;

// Дарси 1: Салому алайк
int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    "2": `#include <iostream>
using namespace std;

// Дарси 2: Тағйирёбандаҳо
int main() {
    int سن = 20; // синну сол
    cout Синну сол: " << سن << endl;
    return 0;
}`,
    "3": `#include <iostream>
using namespace std;

// Дарси 3: Шартҳо
int main() {
    int ball = 85;
    if (ball >= 50) {
        cout << "Шумо имтиҳонро гузаштет!" << endl;
    } else {
        cout << "Нагузаштет." << endl;
    }
    return 0;
}`
};

let currentFile = "main.cpp";

const codeEditor = document.getElementById("code-editor");
const lineNumbers = document.getElementById("line-numbers");
const currentFileLabel = document.getElementById("current-file-label");
const stdoutOutput = document.getElementById("stdout-output");
const stdinInput = document.getElementById("stdin-input");

// Навсозии рақами сатрҳо
function updateLineNumbers() {
    const lines = codeEditor.value.split("\n").length;
    let numbersText = "";
    for (let i = 1; i <= lines; i++) {
        numbersText += i + "\n";
    }
    lineNumbers.textContent = numbersText;
}

codeEditor.addEventListener("input", () => {
    files[currentFile] = codeEditor.value;
    updateLineNumbers();
});

codeEditor.addEventListener("scroll", () => {
    lineNumbers.scrollTop = codeEditor.scrollTop;
});

// Идоракунии файлҳо
document.querySelectorAll(".file-item").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".file-item").forEach(f => f.classList.remove("active"));
        item.classList.add("active");
        
        currentFile = item.getAttribute("data-file");
        codeEditor.value = files[currentFile] || "";
        currentFileLabel.textContent = currentFile;
        updateLineNumbers();
    });
});

// Идоракунии дарсҳо
document.querySelectorAll(".lesson-item").forEach(item => {
    item.addEventListener("click", () => {
        const lessonId = item.getAttribute("data-lesson");
        if (lessons[lessonId]) {
            codeEditor.value = lessons[lessonId];
            files[currentFile] = codeEditor.value;
            updateLineNumbers();
        }
    });
});

// Тугмаи Иҷро (Simulation/Run)
document.getElementById("run-btn").addEventListener("click", () => {
    stdoutOutput.textContent = "Компилятсия шуда истодааст...\n";
    
    setTimeout(() => {
        const code = codeEditor.value;
        if (code.includes("cout")) {
            // Намунаи оддии таҳлил ва баровардани матнинутри cout
            const match = code.match(/cout\s*<<\s*"(.*?)"/);
            if (match) {
                stdoutOutput.textContent = match[1] + "\n\n[Иҷро бо муваффақият анҷом ёфт]";
            } else {
                stdoutOutput.textContent = "Барнома бомуваффақият иҷро шуд (бе натиҷаи матнӣ).";
            }
        } else {
            stdoutOutput.textContent = "Хатогӣ: Функцияи асосии cout ёфт нашуд.";
        }
    }, 500);
});

// Тугмаи Аз нав
document.getElementById("reset-btn").addEventListener("click", () => {
    codeEditor.value = files[currentFile];
    updateLineNumbers();
    stdoutOutput.textContent = "Барнома омода аст...";
});

// Сари кор даровардани аввала
codeEditor.value = files[currentFile];
updateLineNumbers();
