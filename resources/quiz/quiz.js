document.addEventListener("DOMContentLoaded", function () {
    // クイズの問題と選択肢 (Excelで作成し, Python自動生成)
    const questions = [
        {
            question: "次の４つの中で一番大きな臓器はどれ？",
            images: ["images/total.png"],
            options: ["肺", "心臓", "肝臓", "膵臓"],
            answer: "肝臓",
            explanation:
                "これらの4つの臓器の中で最も大きいのは「肝臓」です。\n成人の肝臓は、体重の約2〜3%を占め、1.2〜1.5 kgほどの重さがあります。\n肺も大きい臓器ですが、肝臓の方が重さや体積の点で大きいとされています。",
        },
        {
            question: "膵臓の前にある臓器はどれですか？",
            images: ["images/stomach.png", "images/heart.png", "images/liver.png", "images/lung.png"],
            options: ["胃", "心臓", "肝臓", "肺"],
            answer: "胃",
            explanation:
                "膵臓（すいぞう）の前に位置する主な臓器は「胃」です。膵臓は、腹部の深部にあり、胃の後ろに位置しています。\nまた、膵臓の前には「小腸」や「大腸」の一部も存在しますが、直接的に膵臓の前にある主要な臓器は胃です。",
        },
        {
            question: "次のうち、消化器官でないものはどれ？",
            images: ["images/pancreas.png", "images/liver.png", "images/heart.png", "images/lung.png"],
            options: ["膵臓", "肝臓", "心臓", "肺"],
            answer: "心臓",
            explanation:
                "消化器官とは、食べ物を消化し、栄養を吸収するための器官のことです。\n心臓は、体内の血液を送り出すための器官であり、消化器官ではありません。\n膵臓、肝臓、肺は、それぞれ消化器官の一部です。",
        },
        {
            question: "次のうち、呼吸器官でないものはどれ？",
            images: ["images/lung.png", "images/heart.png"],
            options: ["肺", "心臓"],
            answer: "心臓",
            explanation:
                "呼吸器官とは、酸素を取り入れ、二酸化炭素を排出するための器官のことです。\n心臓は、体内の血液を送り出すための器官であり、呼吸器官ではありません。\n肺は、呼吸器官の一部であり、酸素を取り入れるための重要な器官です。",
        },
        {
            question: "次のうち、循環器官でないものはどれ？",
            images: ["images/heart.png", "images/liver.png"],
            options: ["心臓", "肝臓"],
            answer: "肝臓",
            explanation:
                "循環器官とは、体内の血液を送り出すための器官のことです。\n心臓は、体内の血液を送り出すための重要な器官であり、循環器官の一部です。\n肝臓は、体内の代謝を調節する臓器であり、循環器官ではありません。",
        },
        {
            question: "次のうち、内分泌器官でないものはどれ？",
            images: ["images/pancreas.png", "images/liver.png"],
            options: ["膵臓", "肝臓"],
            answer: "肝臓",
            explanation:
                "内分泌器官とは、ホルモンを分泌するための器官のことです。\n膵臓は、インスリンやグルカゴンなどのホルモンを分泌する内分泌器官です。\n肝臓は、体内の代謝を調節する臓器であり、内分泌器官ではありません。",
        },
        {
            question: "次のうち、免疫器官でないものはどれ？",
            images: ["images/spleen.png", "images/liver.png"],
            options: ["脾臓", "肝臓"],
            answer: "肝臓",
            explanation:
                "免疫器官とは、体内の免疫反応を調節するための器官のことです。\n脾臓は、体内の免疫反応を調節する重要な器官であり、免疫器官の一部です。\n肝臓は、体内の代謝を調節する臓器であり、免疫器官ではありません。",
        },
        {
            question: "次のうち、排泄器官でないものはどれ？",
            images: ["images/kidney.png", "images/liver.png"],
            options: ["腎臓", "肝臓"],
            answer: "肝臓",
            explanation:
                "排泄器官とは、体内の老廃物を排出するための器官のことです。\n腎臓は、体内の老廃物を尿として排出する排泄器官であり、重要な器官です。\n肝臓は、体内の代謝を調節する臓器であり、排泄器官ではありません。",
        },
        {
            question: "次の4つの臓器の中で、もっとも上にある臓器はどれ？",
            images: ["images/total.png"],
            options: ["肺", "心臓", "肝臓", "膵臓"],
            answer: "肺",
            explanation:
                "これらの4つの臓器の中で、もっとも上にあるのは「肺」です。\n肺は、呼吸器官の一部であり、胸腔の上部に位置しています。\n心臓や肝臓、膵臓は、肺よりも下に位置している臓器です。",
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const questionContainer = document.getElementById("questionContainer");
    const optionsContainer = document.getElementById("optionsContainer");
    const nextButton = document.getElementById("nextButton");
    const scoreDisplay = document.getElementById("score");
    const answersContainer = document.getElementById("answersContainer");
    const progressBar = document.getElementById("progress");
    const imagesContainer = document.getElementById("imagesContainer");

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
                score += 100 / questions.length;
                // mod
                optionButton.classList.remove("btn-outline-primary");
                optionButton.classList.add("btn-success");
            }
        } else {
            optionButton.classList.remove("btn-outline-primary");
            optionButton.classList.add("btn-danger");
        }
        scoreDisplay.textContent = `現在のスコア: ${Math.round(score)}`;
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
        scoreDisplay.textContent = `あなたのスコアは ${Math.round(score)} / 100 です。`;
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
