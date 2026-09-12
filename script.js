const teams = {
    7: [
        ["Meg神", "584490351"],
        ["даньён", "528554700"]
    ],
    8: [
        ["oopsĪKRAKEN", "5394036598"],
        ["oopsĪExtazy47", "5853720512"]
    ],
    9: [
        ["require", "5151155671"],
        ["pamiboy", "512038100"]
    ],
    10: [
        ["OFF SATURN", "51820970664"],
        ["Chifuyu", "5641119402"]
    ],
    11: [
        ["мамочек", "51554361168"],
        ["DimaKolyadenko", "5624868354"]
    ],
    12: [
        ["4RmskINOY", "51681028930"],
        ["4RmskGRKKO", "52097735266"]
    ],
    13: [
        ["GD³ Luna", "51748812036"],
        ["GD¹ MILFA", "52225566329"]
    ],
    14: [
        ["WhyAlwaywMe777", "5278941372"],
        ["STLēCandy", "51835322672"]
    ],
    15: [
        ["WNēlūflosex", "51425126649"],
        ["deloūvremeni", "51382437194"]
    ],
    16: [
        ["oops IRON", "5748094922"],
        ["ɢ²EM69", "5237671761"]
    ],
    17: [
        ["evoTENSHOOOOOO", "5375243289"],
        ["evoChiefCief", "51406547392"]
    ],
    18: [
        ["ES frizz404", "51323130709"],
        ["Lam Mad", "5265708626"]
    ],
    19: [
        ["Bad 스티치", "5665385032"],
        ["concentrate", "5581728996"]
    ],
    20: [
        ["VSQ DOM1NATOR", "51770964046"],
        ["Deidaraッ¹", "5872474240"]
    ],
    21: [
        ["tw1z666", "5359429915"],
        ["BAZAūFACHE", "5914921954"]
    ],
    22: [
        ["SOULPAUPAU", "5207392557"],
        ["GGOLEGARH", "51930208709"]
    ],
    23: [
        ["VRERIGANhae", "5598208338"],
        ["plBibizyan", "51433899596"]
    ],
    24: [
        ["oops Sobaka", "5903084104"],
        ["oops x ray", "5263605707"]
    ],
    25: [
        ["DARKēMIROSLAV", "51011480213"],
        ["DARKēBigByba", "51425072167"]
    ],
    26: [
        ["SHWT3N", "5253833134"],
        ["nervIEM", "51250268807"]
    ],
    27: [
        ["LM eniway", "5617267660"],
        ["p4pēINGUSH", "5412499445"]
    ],
    28: [
        ["oops 1", "52199128083"],
        ["oops2", "5487979553"]
    ],
    29: [
        ["GHMīBeavisYT", "52158254615"],
        ["rqCHLL404", "5174986925"]
    ],
    30: [
        ["NEX2 lvdboost", "5436743907"],
        ["user5191813756537409", "51918137565"]
    ],
    31: [
        ["Miracle", "51647808909"],
        ["msnViperr", "5158787550"]
    ],
    32: [
        ["iqFkorxx", "5366651176"],
        ["GTVـJ0SK1YY是", "5262171268"]
    ],
    33: [
        ["VREXMO炎", "5319151610"],
        ["VRFONIX", "51588467910"]
    ],
    34: [
        ["pG丶n3trryyy", "51696664904"],
        ["pG丶maple", "51442937869"]
    ],
    35: [
        ["dr 666", "5307849028"],
        ["plGAMOS1337", "5514130614"]
    ],
    36: [
        ["TolstiyBegemot", "5315164165"],
        ["R3STOR3", "5103167510"]
    ],
    37: [
        ["SharpbI4ēē67", "5345354520"],
        ["BIG・babySPRAY", "5377420304"]
    ],
    38: [
        ["dr'4EverYoung", "5246516071"],
        ["dr’Merko", "51211492451"]
    ],
    39: [
        ["LyapuhaSila", "51866646716"],
        ["VR666666666666", "5663978460"]
    ],
    40: [
        ["AnchorēBlue", "5281969153"],
        ["nghtēvlasik", "5712455956"]
    ],
    41: [
        ["pG丶nepolonia", "51794185086"],
        ["pG丶druam", "5841679517"]
    ],
    42: [
        ["yrodNaSaturNe", "5472888899"],
        ["amixDead", "5423035816"]
    ],
    43: [
        ["Assenii", "51390811229"],
        ["RRNEFFEX", "5544169844"]
    ],
    44: [
        ["wzēAugustin", "51540888072"],
        ["wzēVsind", "5417881428"]
    ],
    45: [
        ["pG丶m", "5838898280"],
        ["pG丶sayyy", "51910729283"]
    ],
    46: [
        ["404 takasuma", "5219649493"],
        ["404 ONYX", "51020656726"]
    ],
    47: [
        ["404 EKIMKA", "5819227706"],
        ["404 SYSTEM", "51578251736"]
    ],
    48: [
        ["CRASHēNÉVERq", "5343160068"],
        ["CRASHēARTHUR", "51300909480"]
    ],
    49: [
        ["CRASHēBAÚNTY", "51843815264"],
        ["CRASHērmq17", "51369160383"]
    ],
    50: [
        ["CRASHēMRAKヅ", "51477942698"],
        ["CRASHēFORZI", "51816909392"]
    ]
};


/* ================================
   ОСНОВНЫЕ ЭЛЕМЕНТЫ
================================ */

const slotsContainer = document.getElementById("slots");
const noResults = document.getElementById("noResults");
const teamCount = document.getElementById("teamCount");
const searchInput = document.getElementById("searchInput");

let currentFilter = "all";


/* ================================
   ЭКРАНИРОВАНИЕ HTML
================================ */

function escapeHTML(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ================================
   МОДАЛЬНОЕ ОКНО СКРИНШОТА
================================ */

const modal = document.createElement("div");

modal.id = "screenshotModal";

modal.innerHTML = `
    <div class="screenshot-overlay"></div>

    <div class="screenshot-window">

        <button
            class="screenshot-close"
            id="closeScreenshot"
            type="button"
        >
            ✕
        </button>

        <div
            class="screenshot-title"
            id="screenshotTitle"
        >
            Аккаунт
        </div>

        <img
            id="screenshotImage"
            src=""
            alt="Скриншот аккаунта"
        >

        <div
            class="screenshot-error"
            id="screenshotError"
        >
            Скриншот ещё не загружен
        </div>

    </div>
`;

document.body.appendChild(modal);


/* ================================
   СТИЛИ МОДАЛЬНОГО ОКНА
================================ */

const screenshotStyles = document.createElement("style");

screenshotStyles.textContent = `
#screenshotModal {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 99999;
}

#screenshotModal.active {
    display: flex;
    align-items: center;
    justify-content: center;
}

.screenshot-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.88);
}

.screenshot-window {
    position: relative;
    z-index: 2;

    width: min(95vw, 1100px);
    max-height: 95vh;

    padding: 20px;

    background: #10151e;

    border: 1px solid #303948;
    border-radius: 14px;

    display: flex;
    flex-direction: column;
    align-items: center;

    box-sizing: border-box;
}

.screenshot-window img {
    display: block;

    max-width: 100%;
    max-height: 78vh;

    object-fit: contain;

    border-radius: 8px;
}

.screenshot-title {
    width: 100%;

    margin-bottom: 15px;
    padding-right: 45px;

    color: #ffffff;

    font-size: 18px;
    font-weight: 800;

    text-align: center;

    box-sizing: border-box;
}

.screenshot-close {
    position: absolute;

    top: 10px;
    right: 10px;

    width: 38px;
    height: 38px;

    border: 1px solid #303948;
    border-radius: 8px;

    background: #111722;
    color: #ffffff;

    font-size: 18px;

    cursor: pointer;

    z-index: 5;
}

.screenshot-close:hover {
    background: #252e3b;
}

.screenshot-error {
    display: none;

    padding: 40px 20px;

    color: #7f8998;

    font-size: 15px;

    text-align: center;
}

.screenshot-button {
    width: 100%;

    margin-top: 6px;
    padding: 5px 7px;

    border: 1px solid #303948;
    border-radius: 6px;

    background: #111722;
    color: #8994a5;

    font-size: 10px;

    cursor: pointer;

    transition: 0.2s;
}

.screenshot-button:hover {
    background: #1b2330;
    color: #ffffff;
    border-color: #566273;
}

@media (max-width: 600px) {

    .screenshot-window {
        width: 96vw;
        padding: 12px;
    }

    .screenshot-window img {
        max-height: 75vh;
    }

    .screenshot-title {
        font-size: 15px;
    }

    .screenshot-close {
        width: 34px;
        height: 34px;
    }
}
`;

document.head.appendChild(screenshotStyles);


/* ================================
   СОЗДАНИЕ СЛОТОВ 1–50
================================ */

function createSlots() {

    slotsContainer.innerHTML = "";

    for (let slotNumber = 1; slotNumber <= 50; slotNumber++) {

        const slot = document.createElement("div");

        slot.className = "slot";

        slot.dataset.slot = slotNumber;


        /* ============================
           СЛОТЫ 1–6
        ============================ */

        if (slotNumber >= 1 && slotNumber <= 6) {

            slot.classList.add("buffer");

            slot.innerHTML = `
                <div class="slot-number">
                    SLOT ${slotNumber}
                </div>

                <div class="buffer-text">
                    Буферный слот
                </div>
            `;
        }


        /* ============================
           СЛОТЫ 7–50
        ============================ */

        else if (teams[slotNumber]) {

            slot.innerHTML = `
                <div class="slot-number">
                    SLOT ${slotNumber}
                </div>
            `;


            teams[slotNumber].forEach(
                (player, playerIndex) => {

                    const nickname = player[0];
                    const playerId = player[1];


                    /*
                       АВТОМАТИЧЕСКИЙ СКРИНШОТ

                       7-1.jpg = первый игрок SLOT 7
                       7-2.jpg = второй игрок SLOT 7

                       8-1.jpg = первый игрок SLOT 8
                       8-2.jpg = второй игрок SLOT 8

                       и т.д.
                    */

                    const imagePath =
                        `images/${slotNumber}-${playerIndex + 1}.jpg`;


                    const playerElement =
                        document.createElement("div");

                    playerElement.className = "player";


                    playerElement.innerHTML = `
                        <div class="nickname">
                            ${escapeHTML(nickname)}
                        </div>

                        <div class="player-id">
                            ID: ${escapeHTML(playerId)}
                        </div>

                        <button
                            class="screenshot-button"
                            type="button"
                            data-image="${imagePath}"
                            data-player="${escapeHTML(nickname)}"
                        >
                            📷 Скриншот
                        </button>
                    `;


                    slot.appendChild(playerElement);
                }
            );
        }


        /* ============================
           ЕСЛИ СЛОТ ПУСТОЙ
        ============================ */

        else {

            slot.classList.add("buffer");

            slot.innerHTML = `
                <div class="slot-number">
                    SLOT ${slotNumber}
                </div>

                <div class="buffer-text">
                    Свободный слот
                </div>
            `;
        }


        slotsContainer.appendChild(slot);
    }


    /* Количество команд */

    teamCount.textContent =
        Object.keys(teams).length;
}


/* ================================
   ОТКРЫТЬ СКРИНШОТ
================================ */

function openScreenshot(imagePath, playerName) {

    const image =
        document.getElementById("screenshotImage");

    const title =
        document.getElementById("screenshotTitle");

    const error =
        document.getElementById("screenshotError");


    title.textContent =
        `Аккаунт: ${playerName}`;


    image.style.display = "block";

    error.style.display = "none";


    image.onload = function () {

        image.style.display = "block";

        error.style.display = "none";
    };


    image.onerror = function () {

        image.style.display = "none";

        error.style.display = "block";
    };


    image.src = imagePath;


    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* ================================
   ЗАКРЫТЬ СКРИНШОТ
================================ */

function closeScreenshot() {

    modal.classList.remove("active");

    document.body.style.overflow = "";


    const image =
        document.getElementById("screenshotImage");

    image.src = "";
}


/* ================================
   КНОПКА X
================================ */

document
    .getElementById("closeScreenshot")
    .addEventListener(
        "click",
        closeScreenshot
    );


/* ================================
   КЛИК ПО ФОНУ
================================ */

document
    .querySelector(".screenshot-overlay")
    .addEventListener(
        "click",
        closeScreenshot
    );


/* ================================
   ESC
================================ */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {
            closeScreenshot();
        }

    }
);


/* ================================
   КНОПКИ СКРИНШОТОВ
================================ */

slotsContainer.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                ".screenshot-button"
            );


        if (!button) {
            return;
        }


        const imagePath =
            button.dataset.image;

        const playerName =
            button.dataset.player;


        openScreenshot(
            imagePath,
            playerName
        );
    }
);


/* ================================
   ФИЛЬТРЫ
================================ */

function applyFilters() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const slots =
        document.querySelectorAll(".slot");


    let visibleCount = 0;


    slots.forEach(function(slot) {

        const slotNumber =
            Number(slot.dataset.slot);


        let filterMatch = true;


        if (currentFilter === "buffer") {

            filterMatch =
                slotNumber >= 1 &&
                slotNumber <= 6;
        }


        if (currentFilter === "teams") {

            filterMatch =
                slotNumber >= 7 &&
                slotNumber <= 50;
        }


        const slotText =
            slot.textContent.toLowerCase();


        const searchMatch =
            searchText === "" ||
            slotText.includes(searchText);


        if (filterMatch && searchMatch) {

            slot.style.display = "";

            visibleCount++;

        } else {

            slot.style.display = "none";
        }

    });


    if (visibleCount === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";
    }
}


/* ================================
   КНОПКИ ФИЛЬТРОВ
================================ */

document
    .querySelectorAll(".filter-btn")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                document
                    .querySelectorAll(".filter-btn")
                    .forEach(function(btn) {

                        btn.classList.remove("active");

                    });


                button.classList.add("active");


                currentFilter =
                    button.dataset.filter;


                applyFilters();
            }
        );

    });


/* ================================
   ПОИСК
================================ */

searchInput.addEventListener(
    "input",
    applyFilters
);


/* ================================
   ЗАПУСК САЙТА
================================ */

createSlots();

applyFilters();
