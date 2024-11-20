
document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        {
            question: "<ruby>肺<rt> はい</rt></ruby>は左右に分かれ、さらに区域に分かれている。右<ruby>肺<rt> はい</rt></ruby>はいくつの区域に分かれているか？【02】",
            images: ["images/stomach.png"],
            options: ["１つ", "２つ", "３つ"],
            answer: "３つ",
            explanation: "<ruby>肺<rt> はい</rt></ruby>は左右二つに大きく分かれているが、それぞれの<ruby>肺<rt> はい</rt></ruby>はさらにいくつかの区域に分かれている。この区域を葉(よう)と呼んでいる。右の<ruby>肺<rt> はい</rt></ruby>は3葉、左の<ruby>肺<rt> はい</rt></ruby>は2葉に分けられる。",
        },
        {
            question: "空気の通り道である<ruby>気道<rt> きどう</rt></ruby>と、食事の通り道である<ruby>食道<rt> しょくどう</rt></ruby>はどちらが身体の前に位置するか？【11, 12】",
            images: ["images/stomach.png"],
            options: ["<ruby>食道<rt> しょくどう</rt></ruby>", "<ruby>気道<rt> きどう</rt></ruby>", "<ruby>公道<rt> こうどう</rt></ruby>"],
            answer: "気道 きどう",
            explanation: "空気の通り道である<ruby>気道<rt> きどう</rt></ruby>(気管支)が前面、食べ物の通り道である<ruby>食道<rt> しょくどう</rt></ruby>は<ruby>気道<rt> きどう</rt></ruby>よりも背面に位置し、気管支と接している。身体の中に「<ruby>公道<rt> こうどう</rt></ruby>」と呼ばれる臓器はない。",
        },
        {
            question: "<ruby>心臓<rt> しんぞう</rt></ruby>からは何本の血管が出ているか？【01】",
            images: ["images/stomach.png"],
            options: ["４本", "６本", "８本"],
            answer: "８本",
            explanation: "<ruby>心臓<rt> しんぞう</rt></ruby>からは酸素を多く含む動脈血が流れる大動脈と４本の<ruby>肺<rt> はい</rt></ruby>静脈、酸素が少ない静脈血が流れる上下２本の大静脈と<ruby>肺<rt> はい</rt></ruby>動脈(後で左右に分かれるが<ruby>心臓<rt> しんぞう</rt></ruby>から出ているのは一本)の合計８本の血管が出ている。",
        },
        {
            question: "<ruby>胃<rt> い</rt></ruby>は人の正面から見てどちら側に膨らんでいるか？【10, 11】",
            images: ["images/stomach.png"],
            options: ["右", "真ん中", "左"],
            answer: "左",
            explanation: "<ruby>胃<rt> い</rt></ruby>は左側に偏って大きく膨らんでいる。食べた後すぐに横になるのはお勧めしないが、もし横になるなら左側を下にして横になると、食べ物が<ruby>胃<rt> い</rt></ruby>の膨らんだところに貯まって楽なことが多い。",
        },
        {
            question: "<ruby>大腸<rt> だいちょう</rt></ruby>はお腹の中でぐるりと一周している。どちら向きで一周しているか？【05, 11】",
            images: ["images/stomach.png"],
            options: ["右回り", "左回り", "前回り"],
            answer: "右回り",
            explanation: "<ruby>大腸<rt> だいちょう</rt></ruby>は<ruby>小腸<rt> しょうちょう</rt></ruby>で吸収できなかったもの、腸や腸内細菌の死骸などが送られてくる。お腹の右下から脇腹を上がり、お腹の前を右から左に横切り、左脇腹を下がっていく。水分を抜いて便の硬さを調節している。",
        },
        {
            question: "飲食物から摂取した水分はどこでもっとも吸収されるか？【03, 04, 05】",
            images: ["images/stomach.png"],
            options: ["<ruby>胃<rt> い</rt></ruby>", "<ruby>小腸<rt> しょうちょう</rt></ruby>", "<ruby>大腸<rt> だいちょう</rt></ruby>"],
            answer: "小腸 しょうちょう",
            explanation: "身体に取りこまれた水分は約９０％が<ruby>小腸<rt> しょうちょう</rt></ruby>で吸収されます。また<ruby>小腸<rt> しょうちょう</rt></ruby>で水分が吸収されるとき、一緒に塩分や糖分があると吸収が促進されます。<ruby>小腸<rt> しょうちょう</rt></ruby>での水分吸収が不十分だと下痢をおこしやすくなります。",
        },
        {
            question: "尿をつくる<ruby>腎臓<rt> じんぞう</rt></ruby>はどんな形をしているか。【08】",
            images: ["images/stomach.png"],
            options: ["エダマメ", "ソラマメ", "イチゴ"],
            answer: "ソラマメ",
            explanation: "<ruby>腎臓<rt> じんぞう</rt></ruby>はソラマメ型をした臓器で身体の後方に位置し、左右二つ存在する。右の<ruby>腎臓<rt> じんぞう</rt></ruby>は少し<ruby>肝臓<rt> かんぞう</rt></ruby>に押されて左の<ruby>腎臓<rt> じんぞう</rt></ruby>の位置よりも低い位置にある。",
        },
        {
            question: "<ruby>膵臓<rt> すいぞう</rt></ruby>は<ruby>胃<rt> い</rt></ruby>の位置と比べてどこに位置するか？【03, 09, 11】",
            images: ["images/stomach.png"],
            options: ["前", "右", "後"],
            answer: "後",
            explanation: "<ruby>膵臓<rt> すいぞう</rt></ruby>はオタマジャクシにも似た形で身体の中心、<ruby>胃<rt> い</rt></ruby>後方に位置する。中心部分が膨らんでおり(頭部)、身体の左側へと伸びて徐々に細くなる(尾部)。消化液(膵液)やホルモン(インスリン・グルカゴン)を分泌する。",
        },
        {
            question: "<ruby>肝臓<rt> かんぞう</rt></ruby>と管で繋がっている臓器はどれか？【06, 11, ??】",
            images: ["images/stomach.png"],
            options: ["<ruby>膵臓<rt> すいぞう</rt></ruby>", "<ruby>胆嚢<rt> たんのう</rt></ruby>", "<ruby>小腸<rt> しょうちょう</rt></ruby>"],
            answer: "胆嚢 たんのう",
            explanation: "<ruby>肝臓<rt> かんぞう</rt></ruby>でつくられた胆汁酸液が総肝管を通って<ruby>胆嚢<rt> たんのう</rt></ruby>に移動し、胆汁として貯蔵される。胆汁はその後、総胆管を通って移動し、膵管と合流して十二指腸へと流れ込む。",
        },
        {
            question: "血液中の古くなった赤血球を破壊する臓器はどれか？【04, 06, 09】",
            images: ["images/stomach.png"],
            options: ["<ruby>肝臓<rt> かんぞう</rt></ruby>", "<ruby>小腸<rt> しょうちょう</rt></ruby>", "<ruby>脾臓<rt> ひぞう</rt></ruby>"],
            answer: "脾臓 ひぞう",
            explanation: "<ruby>脾臓<rt> ひぞう</rt></ruby>は血液を貯えたり、古くなった赤血球を破壊したりします。<ruby>脾臓<rt> ひぞう</rt></ruby>に流れ込んだ血液はその後、<ruby>胃<rt> い</rt></ruby>・<ruby>小腸<rt> しょうちょう</rt></ruby>・<ruby>膵臓<rt> すいぞう</rt></ruby>などから流れてきた血液と合流して(これを門脈と呼ぶ)、<ruby>肝臓<rt> かんぞう</rt></ruby>へ流れ込む。",
        },
        {
            question: "食べ物の通り道(消化管)に含まれない臓器はどれか？【03, 04, 09, 11】",
            images: ["images/stomach.png"],
            options: ["<ruby>胃<rt> い</rt></ruby>", "<ruby>脾臓<rt> ひぞう</rt></ruby>", "<ruby>小腸<rt> しょうちょう</rt></ruby>"],
            answer: "脾臓 ひぞう",
            explanation: "消化管は口から順に、口腔、<ruby>食道<rt> しょくどう</rt></ruby>、<ruby>胃<rt> い</rt></ruby>、<ruby>小腸<rt> しょうちょう</rt></ruby>(十二指腸、空腸、回腸)、<ruby>大腸<rt> だいちょう</rt></ruby>(盲腸、結腸、直腸)、肛門に分けられる。これに消化を助ける分泌液を出す<ruby>肝臓<rt> かんぞう</rt></ruby>、<ruby>胆嚢<rt> たんのう</rt></ruby>、<ruby>膵臓<rt> すいぞう</rt></ruby>の付属臓器が繋がる。",
        },
        {
            question: "世界には内臓が左右逆という人が存在するか？【??】",
            images: ["images/stomach.png"],
            options: ["する", "しない"],
            answer: "する",
            explanation: "内臓の位置が左右逆になる「内臓逆位」という先天性の奇形がある。全ての臓器が左右反転している場合を「完全内臓逆位」と呼ぶ。臓器の位置が逆転しているため、診察や手術の際にとても注意が必要となる。",
        }

    ];
    const chrsL = ["images/chr1.png", "images/chr2.png", "images/chr3.png", "images/chr4.png", "images/chr5.png", "images/chr6.png", "images/chr7.png", "images/chr8.png"];
    const chrsR = ["images/chr1.png", "images/chr2.png", "images/chr3.png", "images/chr4.png", "images/chr5.png", "images/chr6.png", "images/chr7.png", "images/chr8.png"];

    let countsPerQuestion = 60;
    const numOfQuiz = 5;

    let currentQuestionIndex = 0;
    let currentOptionName = "";
    let currentOptionButton = null;
    let score = 0;
    let isInit = true;
    let username = "名無し";
    let selectedOptions = [];
    let answerResults = [];

    const questionContainer = document.getElementById("questionContainer");
    const optionsContainer = document.getElementById("optionsContainer");
    const nextButton = document.getElementById("nextButton");
    const scoreDisplay = document.getElementById("score");
    const answersContainer = document.getElementById("answersContainer");
    const progressBar = document.getElementById("progress");
    // const imagesContainer = document.getElementById("imagesContainer");
    const okSound = new Audio("sound/ok.mp3");
    const ngSound = new Audio("sound/ng.mp3");
    const nameinputContainer = document.getElementById("nameinput-container");
    const quizContainer = document.getElementById("quiz-container");
    const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));//timeはミリ秒
    const answerOkContainer = document.getElementById("answerOkContainer");
    const answerNGContainer = document.getElementById("answerNGContainer");
    const timeoverContainer = document.getElementById("timeoverContainer");

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
        if (currentQuestionIndex == numOfQuiz) {
            progress = ((currentQuestionIndex + 1) / numOfQuiz) * 100;
        } else {
            progress = ((currentQuestionIndex) / numOfQuiz) * 100;
        }
        progressBar.style.width = `${progress}%`;
    }

    // クイズを表示する関数
    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.innerHTML = currentQuestion.question;
        // 左側に表示するキャラクターの定義
        document.getElementById("leftchr").innerHTML = "";
        const imgElementL = document.createElement("img");
        imgElementL.src = chrsL[currentQuestionIndex];
        imgElementL.classList.add("img-fluid", "mb-3");
        imgElementL.style.height = "160px";
        document.getElementById("leftchr").appendChild(imgElementL);
        // 右側に表示するキャラクターの定義
        document.getElementById("rightchr").innerHTML = "";
        const imgElementR = document.createElement("img");
        imgElementR.src = chrsR[currentQuestionIndex];
        imgElementR.classList.add("img-fluid", "mb-3");
        imgElementR.style.height = "160px";
        document.getElementById("rightchr").appendChild(imgElementR);

        // 画像一覧を生成
        // imagesContainer.innerHTML = "";
        // currentQuestion.images.forEach((image) => {
        //     const imageElement = document.createElement("img");
        //     imageElement.src = image;
        //     imageElement.classList.add("img-fluid", "mb-3");
        //     imageElement.style.width = "200px";
        //     imageElement.style.height = "200px";
        //     imagesContainer.appendChild(imageElement);
        // });

        // 選択肢のボタンを生成
        optionsContainer.innerHTML = "";
        i = 0;
        var numOption = currentQuestion.options.length;
        currentQuestion.options.forEach((option) => {
            const optionButton = document.createElement("button");
            optionButton.classList.add("btn", "btn-outline-primary", "option");
            optionButton.innerHTML = option;
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

        // 現在の問題番号をプログレスバーに反映
        updateProgressBar();
        nextButton.disabled = true;

        // 現在の問題番号を表示する
        document.getElementById("questionNumber").textContent = `問題 ${currentQuestionIndex + 1} / ${numOfQuiz}`;
        // 問題開始とともにカウントダウンを開始
        clearInterval(countdownInterval);
        setRedirectInfo("#", countsPerQuestion);
    }

    // 選択肢をクリックしたときの処理
    function selectOption(optionButton, selectedOption) {
        // 選択している選択肢の色を変更
        const optionButtons = document.querySelectorAll(".option");
        optionButtons.forEach((button) => {
            button.classList.remove("optionSelected");
            button.classList.add("btn", "btn-outline-primary", "option");
        });
        optionButton.classList.add("optionSelected");
        currentOptionName = optionButton.textContent;
        currentOptionButton = optionButton;
        nextButton.disabled = false;
    }

    // 次へボタンを押したときの処理
    nextButton.addEventListener("click", async () => {
        currentOptionButton.classList.remove("optionSelected","btn-outline-primary");
        nextButton.style.visibility = "hidden";
        selectedOptions.push(currentOptionName);
        if(document.getElementById("remainTime").innerText == 0) {
            // 時間切れのためスコア加算なし
            currentOptionButton.classList.add("optionNG");
            timeoverContainer.style.display = "block";
            await sleep(3000);
            timeoverContainer.style.display = "none";
            answerResults.push("時間切れ");
        }else if(currentOptionName === questions[currentQuestionIndex].answer) {
            okSound.currentTime = 0;
            okSound.play();
            score += 100 / numOfQuiz;
            currentOptionButton.classList.add("optionOK");
            answerOkContainer.style.display = "block";
            await sleep(3000);
            answerOkContainer.style.display = "none";
            answerResults.push("○");
        }else {
            ngSound.currentTime = 0;
            ngSound.play();
            currentOptionButton.classList.add("optionNG");
            answerNGContainer.style.display = "block";
            await sleep(3000);
            answerNGContainer.style.display = "none";
            answerResults.push("×");
        }
        scoreDisplay.textContent = `${username}さんのスコア: ${Math.round(score)}`;

        currentQuestionIndex++;
        if (currentQuestionIndex < numOfQuiz) {
            document.getElementById("countContainer").style.display = "block";
            nextButton.style.visibility = "visible";
            displayQuestion();
        } else {
            displayScore();
            displayAnswers();
            updateProgressBar();
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
        document.getElementById("countContainer").style.display = "none";
        // document.getElementById("imagesContainer").style.display = "none";
        document.getElementById("questionNumber").textContent = "";
        document.getElementById("qrContainer").style.display = "none";
        document.getElementById("leftchr").style.display = "none";
        document.getElementById("rightchr").style.display = "none";
    }

    // 解説を表示する
    function displayAnswers() {
        answersContainer.innerHTML = "<h4>解答と解説</h4>";
        var tempStr = "";
        var tempAns = "";
        var tempSel = "";
        questions.forEach((question, index) => {
            const answerDiv = document.createElement("div");
            answerDiv.classList.add("mb-2");
            tempAns = question.answer.split(" ")[0];
            tempSel = selectedOptions[index] + "";
            tempSel = tempSel.split(" ")[0];
            if(answerResults[index] == "○") {
                tempStr = "";
            }else {
                tempStr = `(正解は ${tempAns})`;
            }
            answerDiv.innerHTML = `<strong>質問 ${index + 1}:</strong> ${question.question}
                                   ≪
                                   <strong>選択:</strong> ${tempSel}
                                   <strong>[${answerResults[index]}]</strong>
                                   ${tempStr}
                                   ≫<br>
                                   <strong>解説:</strong> ${question.explanation}
                                   `;
            if(index < numOfQuiz) {
                answersContainer.appendChild(answerDiv);
            }
        });
        document.getElementById("questionNumber").innerHTML = `
                <img src="images/chr7.png" height="30px" />&nbsp;
                <img src="images/chr5.png" height="30px" />&nbsp;
                お疲れ様でした！
                &nbsp;<img src="images/chr3.png" height="30px" />
                &nbsp;<img src="images/chr1.png" height="30px" />
                `;
        document.getElementById("remainTime").textContent = "";
    }

    // 初回処理 (全体問題のシャッフルと最初の問題の表示)
    shuffle(questions);
    shuffle(chrsL);
    shuffle(chrsR);
    displayQuestion();
    answerOkContainer.style.display = "none";
    answerNGContainer.style.display = "none";
    timeoverContainer.style.display = "none";

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
        username = document.getElementById("username").value;
        clearInterval(countdownInterval);
        setRedirectInfo("#", countsPerQuestion);
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

            if (countdown <= 10 &&
                    document.getElementById("quiz-container").style.display != "none") {
                document.getElementById("remainTime").style.color = "red";
            }

            if (countdown <= 0) {
                clearInterval(countdownInterval);
                if (document.getElementById("countContainer").style.display != "none" &&
                        document.getElementById("quiz-container").style.display != "none") {
                    document.getElementById("messageContainer").innerHTML = "時間切れです。";
                }
            }
        }, 1000); // 1秒ごとにカウントダウン
    } else {
        alert("正しいURLと時間を入力してください");
    }
}
