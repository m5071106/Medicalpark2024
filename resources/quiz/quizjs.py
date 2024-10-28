# quiz.js を生成するための Python スクリプト
import os
import csv
import openpyxl

debug_mode = False

# 古い資産を削除
js_path = os.path.dirname(__file__) + '/quiz_test.js'

if os.path.exists(js_path):
    os.remove(js_path) 

# quizjs.xlsx から問題を読み込む
wb = openpyxl.load_workbook(os.path.dirname(__file__) + '/quizjs.xlsx', data_only=True)
# シートを取得
sheet = wb["質問リスト"]
# シート内のセルを取得
rows = sheet.iter_rows(min_row=1, max_row=sheet.max_row, min_col=1, max_col=6, values_only=True)
# データをリストに格納
data = []
for row in rows:
    data.append(row)
# excelを閉じる
wb.close()

# data を更にカンマ区切りでリスト化する
data = [list(d) for d in data]

scripts = '''
document.addEventListener("DOMContentLoaded", function () {
    // クイズの問題と選択肢 (Excelで作成し, Python自動生成)
    const questions = [
'''
# Excel から取得したデータを整形して scripts に追加
row_num = 0
index_array = ['question: ', 'images: ', 'options: ', 'answer: ', 'explanation: ']
question_data = ""
for d in data:
    if row_num == 0:
        question_data += "        {\n"

    if d[2] is not None:
        question_data += "            " + index_array[row_num] + d[2] + ",\n"

    if row_num == 4:
        question_data += "        },\n"
        row_num = 0
    else:
        row_num += 1

# 最後の1文字を削除
if question_data.endswith(",\n"):
    question_data = question_data[:-2] + "\n"

scripts += question_data

scripts += '''
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let isInit = true;
    let username = "名無し";

    const questionContainer = document.getElementById("questionContainer");
    const optionsContainer = document.getElementById("optionsContainer");
    const nextButton = document.getElementById("nextButton");
    const scoreDisplay = document.getElementById("score");
    const answersContainer = document.getElementById("answersContainer");
    const progressBar = document.getElementById("progress");
    const imagesContainer = document.getElementById("imagesContainer");
    const okSound = new Audio("sound/ok.mp3");
    const ngSound = new Audio("sound/ng.mp3");
    const nameinputContainer = document.getElementById("nameinput-container");
    const quizContainer = document.getElementById("quiz-container");

    // 問題順をシャッフルするための関数
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // クイズの進捗具合をプログレスバーで表示するための関数
    function updateProgressBar() {
        var progress;
        if (currentQuestionIndex == questions.length) {
            progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        } else {
            progress = ((currentQuestionIndex) / questions.length) * 100;
        }
        progressBar.style.width = `${progress}%`;
    }

    // クイズを表示する関数
    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.textContent = currentQuestion.question;

        // 選択肢シャッフルは行わない(画像と位置を合わせるため)
        // del
        // shuffle(currentQuestion.options);
        // del

        // 選択肢のボタンを生成
        optionsContainer.innerHTML = "";
        i = 0;
        numOption = currentQuestion.options.length;
        currentQuestion.options.forEach((option) => {
            const optionButton = document.createElement("button");
            optionButton.classList.add("btn", "btn-outline-primary", "option");
            optionButton.textContent = option;
            optionButton.addEventListener("click", () =>
                selectOption(optionButton, option)
            );
            optionsContainer.appendChild(optionButton);
            if(i < numOption - 1) {
                const spacer = document.createElement("span");
                spacer.style.height = "10px";
                spacer.style.width = "10px";
                spacer.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                optionsContainer.appendChild(spacer);
            }
            i++;
        });

        // add
        // 画像一覧を生成
        imagesContainer.innerHTML = "";
        currentQuestion.images.forEach((image) => {
            const imageElement = document.createElement("img");
            imageElement.src = image;
            imageElement.classList.add("img-fluid", "mb-3");
            imageElement.style.width = "200px";
            imageElement.style.height = "200px";
            imagesContainer.appendChild(imageElement);
        });
        // add

        // 現在の問題番号をプログレスバーに反映
        updateProgressBar();
        nextButton.disabled = true;

        // add
        // 現在の問題番号を表示する
        document.getElementById("questionNumber").textContent = `問題 ${currentQuestionIndex + 1} / ${questions.length}`;
        // 問題開始とともにカウントダウンを開始
        clearInterval(countdownInterval);
        setRedirectInfo("#", 30);
        // add

    }

    // 選択肢をクリックしたときの処理
    function selectOption(optionButton, selectedOption) {
        const currentQuestion = questions[currentQuestionIndex];
        
        // add
        // 選択肢クリック時、カウントダウンを停止
        document.getElementById("countContainer").style.display = "none";

        // 時間切れとなった時はアラートを表示し、点数も加算しない
        if (document.getElementById("remainTime").innerText == 0) {
            optionButton.classList.remove("btn-outline-primary");
            optionButton.classList.add("btn-danger");
        }
        else 
        // add
        if (selectedOption === currentQuestion.answer) {
            // mod
            // score += 4;
            if (document.getElementById("remainTime").innerText > 0) {
                okSound.currentTime = 0;
                okSound.play();
                score += 100 / questions.length;
                // mod
                optionButton.classList.remove("btn-outline-primary");
                optionButton.classList.add("btn-success");
            }
        } else {
            ngSound.currentTime = 0;
            ngSound.play();
            optionButton.classList.remove("btn-outline-primary");
            optionButton.classList.add("btn-danger");
        }
        scoreDisplay.textContent = `${username}さんのスコア: ${Math.round(score)}`;
        disableOptions();
        nextButton.disabled = false;
    }

    // 選択肢クリック後、押せなくする処理
    function disableOptions() {
        const buttons = document.querySelectorAll(".option");
        buttons.forEach((button) => {
            button.disabled = true;
        });
    }

    // 次へボタンを押したときの処理
    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            document.getElementById("countContainer").style.display = "block";
            displayQuestion();
        } else {
            displayScore();
            displayAnswers();
            // add
            updateProgressBar();
            // add
        }
        document.getElementById("messageContainer").innerHTML = "";
        document.getElementById("remainTime").style.color = "black";
    });

    // 成績を表示する
    function displayScore() {
        questionContainer.textContent = "";
        optionsContainer.innerHTML = "";
        nextButton.style.display = "none";
        scoreDisplay.textContent = `${username}さんのスコアは ${Math.round(score)} / 100 です。`;
        // add
        document.getElementById("countContainer").style.display = "none";
        document.getElementById("imagesContainer").style.display = "none";
        document.getElementById("questionNumber").textContent = "";
        document.getElementById("qrContainer").style.display = "none";
        // add
    }

    // 解説を表示する
    function displayAnswers() {
        answersContainer.innerHTML = "<h2>回答と解説</h2>";
        questions.forEach((question, index) => {
            const answerDiv = document.createElement("div");
            answerDiv.classList.add("mb-2");
            answerDiv.innerHTML = `<strong>質問 ${index + 1}:</strong> ${question.question}
                                   <strong>正解:</strong> ${question.answer}<br>
                                   <strong>解説:</strong> ${question.explanation}`;
            answersContainer.appendChild(answerDiv);
        });
        // add
        document.getElementById("questionNumber").textContent = `お疲れ様でした！`;
        document.getElementById("remainTime").textContent = "";
        // add
    }

    // 初回処理 (全体問題のシャッフルと最初の問題の表示)
    shuffle(questions);
    displayQuestion();

    if(isInit) {
        document.getElementById("startQuizButton").addEventListener("click", () =>
            startQuiz()
        );
        quizContainer.style.display = "none";
        nameinputContainer.style.display = "block";
    }else {
        quizContainer.style.display = "block";
        nameinputContainer.style.display = "none";
    }    

    // クイズをはじめるボタンクリック時の処理
    function startQuiz() {
        if (document.getElementById("username").value == "") {
            alert("名前を入力してください");
            return;
        }
        isInit = false;
        quizContainer.style.display = "block";
        nameinputContainer.style.display = "none";
        if (document.getElementById("username").value != "") {
            username = document.getElementById("username").value;
        }
    }
});

// カウントダウン関数はグローバル領域に定義する
let countdownInterval;

function setRedirectInfo(url, time) {
    if (url && time) {
        var countdown = time;
        document.getElementById("remainTime").innerText = countdown;

        countdownInterval = setInterval(function() {
            countdown--;
            document.getElementById("remainTime").innerText = countdown;

            if (countdown <= 10) {
                document.getElementById("remainTime").style.color = "red";
            }

            if (countdown <= 0) {
                clearInterval(countdownInterval);
                if (document.getElementById("countContainer").style.display != "none") {
                    document.getElementById("messageContainer").innerHTML = "時間切れです。";
                }
            }
        }, 1000); // 1秒ごとにカウントダウン
    } else {
        alert("正しいURLと時間を入力してください");
    }
}
'''

with open(js_path, 'a', encoding='utf-8') as f:
    f.write(scripts)
