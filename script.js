```javascript
// ============================================================
// SPN CUSTOM ROOM
// script.js
// ============================================================


// ============================================================
// SUPABASE
// ============================================================

const SUPABASE_URL =
    "https://dgtssaispbiqxeimidjl.supabase.co";

// ВСТАВЬ СЮДА СВОЙ PUBLISHABLE KEY
const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_T-1SkXGZ1cMu_lMq7nML1Q_faYsD9PZ";

let supabaseClient = null;

try {
    if (
        window.supabase &&
        SUPABASE_PUBLISHABLE_KEY &&
        SUPABASE_PUBLISHABLE_KEY !== "ТВОЙ_PUBLISHABLE_KEY"
    ) {
        supabaseClient = window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY
        );
    }
} catch (error) {
    console.error("SPN: ошибка создания Supabase:", error);
}


// ============================================================
// КОМАНДЫ 7–50
// ============================================================

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


// ============================================================
// DOM
// ============================================================

const slotsContainer =
    document.getElementById("slots");

const noResults =
    document.getElementById("noResults");

const teamCount =
    document.getElementById("teamCount");

const searchInput =
    document.getElementById("searchInput");

let currentFilter = "all";


// ============================================================
// DEBUG PANEL
// ============================================================

function createDebugPanel() {

    const oldPanel =
        document.getElementById("spnDebug");

    if (oldPanel) {
        oldPanel.remove();
    }

    const panel =
        document.createElement("div");

    panel.id = "spnDebug";

    panel.innerHTML = `
        <div class="spn-debug-title">
            SPN DEBUG
        </div>

        <div class="spn-debug-row">
            <span>Supabase</span>
            <strong id="debugSupabase">Проверка...</strong>
        </div>

        <div class="spn-debug-row">
            <span>Slots</span>
            <strong id="debugSlots">—</strong>
        </div>

        <div class="spn-debug-row">
            <span>Players</span>
            <strong id="debugPlayers">—</strong>
        </div>

        <div class="spn-debug-row">
            <span>Ошибка</span>
            <strong id="debugError">Нет</strong>
        </div>

        <div class="spn-debug-log" id="debugLog">
            Запуск проверки...
        </div>
    `;

    document.body.appendChild(panel);


    const style =
        document.createElement("style");

    style.id = "spnDebugStyle";

    style.textContent = `

        #spnDebug {
            position: fixed;
            left: 12px;
            right: 12px;
            bottom: 12px;
            z-index: 999999;

            background:
                rgba(8, 10, 16, 0.97);

            border:
                1px solid rgba(0, 255, 170, 0.35);

            border-radius:
                14px;

            padding:
                14px;

            color:
                #ffffff;

            font-family:
                Arial, sans-serif;

            box-shadow:
                0 10px 40px rgba(0,0,0,0.5);

            backdrop-filter:
                blur(12px);

            font-size:
                13px;
        }

        .spn-debug-title {
            font-size:
                15px;

            font-weight:
                900;

            letter-spacing:
                1.5px;

            margin-bottom:
                10px;
        }

        .spn-debug-row {
            display:
                flex;

            justify-content:
                space-between;

            gap:
                15px;

            padding:
                4px 0;

            border-bottom:
                1px solid rgba(255,255,255,0.06);
        }

        .spn-debug-row strong {
            font-weight:
                800;
        }

        .spn-debug-log {
            margin-top:
                10px;

            padding:
                8px;

            border-radius:
                8px;

            background:
                rgba(255,255,255,0.05);

            color:
                rgba(255,255,255,0.75);

            word-break:
                break-word;

            line-height:
                1.4;
        }

    `;

    document.head.appendChild(style);
}


function debugSet(id, text, status) {

    const element =
        document.getElementById(id);

    if (!element) return;

    element.textContent = text;

    if (status === "ok") {
        element.style.color = "#00ff9d";
    }

    if (status === "error") {
        element.style.color = "#ff4d67";
    }

    if (status === "warning") {
        element.style.color = "#ffd166";
    }
}


function debugLog(text) {

    const element =
        document.getElementById("debugLog");

    if (!element) return;

    element.textContent = text;
}


// ============================================================
// AUDIO
// ============================================================

let audioContext = null;

let soundEnabled = true;


function initAudio() {

    try {

        if (!audioContext) {

            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

        }

        if (
            audioContext.state ===
            "suspended"
        ) {
            audioContext.resume();
        }

    } catch (error) {

        console.warn(
            "SPN AUDIO ERROR:",
            error
        );

    }

}


function playTone(
    frequency = 600,
    duration = 0.05,
    volume = 0.025
) {

    if (!soundEnabled) return;

    try {

        initAudio();

        if (!audioContext) return;

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.type = "sine";

        oscillator.frequency.value =
            frequency;

        gain.gain.setValueAtTime(
            volume,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime +
            duration
        );

        oscillator.connect(gain);

        gain.connect(
            audioContext.destination
        );

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime +
            duration
        );

    } catch (error) {

        console.warn(
            "SPN SOUND ERROR:",
            error
        );

    }

}


function playClick() {
    playTone(700, 0.045, 0.025);
}


function playButtonSound() {
    playTone(850, 0.055, 0.03);
}


function playHoverSound() {
    playTone(500, 0.025, 0.012);
}


function playScreenshotSound() {
    playTone(1000, 0.08, 0.035);
}


function playCloseSound() {
    playTone(350, 0.05, 0.02);
}


// ============================================================
// HTML SECURITY
// ============================================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ============================================================
// SCREENSHOT MODAL
// ============================================================

function createScreenshotModal() {

    if (
        document.getElementById(
            "screenshotModal"
        )
    ) {
        return;
    }

    const modal =
        document.createElement("div");

    modal.id =
        "screenshotModal";

    modal.innerHTML = `

        <div class="screenshot-backdrop"></div>

        <div class="screenshot-window">

            <button
                class="screenshot-close"
                type="button"
                aria-label="Закрыть"
            >
                ×
            </button>

            <div
                class="screenshot-title"
                id="screenshotTitle"
            ></div>

            <div class="screenshot-image-wrap">

                <img
                    id="screenshotImage"
                    alt=""
                >

                <div
                    id="screenshotError"
                    class="screenshot-error"
                >
                    Скриншот не найден
                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    const style =
        document.createElement("style");

    style.textContent = `

        #screenshotModal {
            position: fixed;
            inset: 0;
            z-index: 999998;

            display: none;
            align-items: center;
            justify-content: center;

            padding: 20px;
        }

        #screenshotModal.active {
            display: flex;
        }

        .screenshot-backdrop {
            position: absolute;
            inset: 0;

            background:
                rgba(0,0,0,0.88);
        }

        .screenshot-window {
            position: relative;
            z-index: 2;

            width: min(900px, 100%);
            max-height: 90vh;

            background:
                #10131b;

            border:
                1px solid rgba(255,255,255,0.12);

            border-radius:
                18px;

            padding:
                16px;

            overflow: hidden;

            box-shadow:
                0 30px 80px rgba(0,0,0,0.65);
        }

        .screenshot-title {
            font-size:
                16px;

            font-weight:
                800;

            margin-bottom:
                12px;

            padding-right:
                40px;
        }

        .screenshot-image-wrap {
            position: relative;

            display: flex;

            align-items: center;
            justify-content: center;

            min-height:
                150px;

            background:
                #080a0f;

            border-radius:
                12px;

            overflow: hidden;
        }

        #screenshotImage {
            display: block;

            max-width:
                100%;

            max-height:
                75vh;

            object-fit:
                contain;
        }

        .screenshot-error {
            display: none;

            padding:
                30px;

            color:
                rgba(255,255,255,0.65);
        }

        .screenshot-close {
            position: absolute;

            top: 10px;
            right: 10px;

            z-index: 5;

            width: 36px;
            height: 36px;

            border: none;
            border-radius: 50%;

            background:
                rgba(255,255,255,0.1);

            color:
                white;

            font-size:
                24px;

            cursor:
                pointer;
        }

    `;

    document.head.appendChild(style);


    modal
        .querySelector(".screenshot-backdrop")
        .addEventListener(
            "click",
            closeScreenshot
        );

    modal
        .querySelector(".screenshot-close")
        .addEventListener(
            "click",
            closeScreenshot
        );

}


function openScreenshot(
    imagePath,
    playerName
) {

    createScreenshotModal();

    const modal =
        document.getElementById(
            "screenshotModal"
        );

    const image =
        document.getElementById(
            "screenshotImage"
        );

    const title =
        document.getElementById(
            "screenshotTitle"
        );

    const error =
        document.getElementById(
            "screenshotError"
        );

    title.textContent =
        `Скриншот — ${playerName}`;

    image.style.display = "block";

    error.style.display = "none";

    image.src = imagePath;

    image.onerror = function () {

        image.style.display =
            "none";

        error.style.display =
            "block";

    };

    modal.classList.add("active");

    playScreenshotSound();

}


function closeScreenshot() {

    const modal =
        document.getElementById(
            "screenshotModal"
        );

    if (!modal) return;

    modal.classList.remove("active");

    playCloseSound();

}


// ============================================================
// СОЗДАНИЕ СЛОТОВ
// ============================================================

function createSlots() {

    if (!slotsContainer) {
        console.error(
            "SPN: контейнер #slots не найден"
        );
        return;
    }

    slotsContainer.innerHTML = "";


    // --------------------------------------------------------
    // ОБЩИЙ БУФЕР 1–6
    // --------------------------------------------------------

    const bufferCard =
        document.createElement("article");

    bufferCard.className =
        "slot-card buffer-card";

    bufferCard.dataset.type =
        "buffer";

    bufferCard.dataset.search =
        "слоты 1 2 3 4 5 6 буфер буферные";

    bufferCard.innerHTML = `

        <div class="slot-header">

            <div>
                <span class="slot-number">
                    01–06
                </span>

                <span class="slot-status">
                    БУФЕР
                </span>
            </div>

        </div>

        <div class="buffer-content">

            <div class="buffer-icon">
                ⛨
            </div>

            <div>
                <div class="buffer-title">
                    БУФЕРНЫЕ СЛОТЫ
                </div>

                <div class="buffer-text">
                    Слоты 1–6 зарезервированы
                    под буфер.
                </div>
            </div>

        </div>
    `;

    slotsContainer.appendChild(
        bufferCard
    );


    // --------------------------------------------------------
    // КОМАНДЫ 7–50
    // --------------------------------------------------------

    for (
        let slotNumber = 7;
        slotNumber <= 50;
        slotNumber++
    ) {

        const team =
            teams[slotNumber];

        const card =
            document.createElement("article");

        card.className =
            "slot-card team-card";

        card.dataset.type =
            "team";

        let searchText =
            `слот ${slotNumber} команда ${slotNumber}`;

        let playersHTML = "";


        if (
            team &&
            Array.isArray(team)
        ) {

            team.forEach(
                (
                    player,
                    playerIndex
                ) => {

                    const nickname =
                        player[0];

                    const playerId =
                        player[1];

                    searchText +=
                        ` ${nickname} ${playerId}`;

                    const imagePath =
                        `images/${slotNumber}-${playerIndex + 1}.jpg`;

                    playersHTML += `

                        <div class="player">

                            <div class="player-info">

                                <div class="player-number">
                                    ${playerIndex + 1}
                                </div>

                                <div class="player-main">

                                    <div class="player-name">
                                        ${escapeHTML(nickname)}
                                    </div>

                                    <div class="player-id">
                                        ID:
                                        ${escapeHTML(playerId)}
                                    </div>

                                </div>

                            </div>

                            <button
                                class="screenshot-btn"
                                type="button"
                                data-image="${escapeHTML(imagePath)}"
                                data-player="${escapeHTML(nickname)}"
                            >
                                СКРИН
                            </button>

                        </div>
                    `;
                }
            );

        } else {

            playersHTML = `

                <div class="player empty-player">

                    <div class="player-info">

                        <div class="player-number">
                            —
                        </div>

                        <div class="player-main">

                            <div class="player-name">
                                СВОБОДНО
                            </div>

                            <div class="player-id">
                                Место свободно
                            </div>

                        </div>

                    </div>

                </div>
            `;

        }


        card.dataset.search =
            searchText.toLowerCase();


        card.innerHTML = `

            <div class="slot-header">

                <div class="slot-header-left">

                    <span class="slot-number">
                        ${String(slotNumber).padStart(2, "0")}
                    </span>

                    <span class="slot-status">
                        КОМАНДА
                    </span>

                </div>

            </div>


            <div class="players">
                ${playersHTML}
            </div>

        `;


        slotsContainer.appendChild(card);

    }


    if (teamCount) {

        teamCount.textContent =
            Object.keys(teams).length;

    }

}


// ============================================================
// ФИЛЬТРЫ
// ============================================================

function applyFilters() {

    const cards =
        document.querySelectorAll(
            ".slot-card"
        );

    const query =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";

    let visibleCount = 0;


    cards.forEach(card => {

        const type =
            card.dataset.type || "";

        const text =
            card.dataset.search || "";

        let visible = true;


        // FILTER

        if (
            currentFilter ===
            "buffer"
        ) {

            visible =
                type === "buffer";

        }

        if (
            currentFilter ===
            "teams"
        ) {

            visible =
                type === "team";

        }


        // SEARCH

        if (
            visible &&
            query &&
            !text.includes(query)
        ) {

            visible = false;

        }


        card.style.display =
            visible
                ? ""
                : "block";

        if (!visible) {

            card.style.display =
                "none";

        } else {

            visibleCount++;

        }

    });


    if (noResults) {

        noResults.style.display =
            visibleCount === 0
                ? "flex"
                : "none";

    }

}


// ============================================================
// FILTER BUTTONS
// ============================================================

document
    .querySelectorAll(".filter-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                currentFilter =
                    button.dataset.filter;

                document
                    .querySelectorAll(
                        ".filter-btn"
                    )
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });

                button.classList.add(
                    "active"
                );

                playButtonSound();

                applyFilters();

            }
        );

    });


// ============================================================
// SEARCH
// ============================================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            applyFilters();

        }
    );

}


// ============================================================
// SCREENSHOT BUTTONS
// ============================================================

if (slotsContainer) {

    slotsContainer.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".screenshot-btn"
                );

            if (!button) return;

            const image =
                button.dataset.image;

            const player =
                button.dataset.player;

            openScreenshot(
                image,
                player
            );

        }
    );


    slotsContainer.addEventListener(
        "mouseover",
        event => {

            const button =
                event.target.closest(
                    "button"
                );

            if (!button) return;

            playHoverSound();

        }
    );

}


// ============================================================
// ОБЩИЕ КНОПКИ
// ============================================================

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "button"
            );

        if (!button) return;

        playClick();

    }
);


// ============================================================
// РАЗБЛОКИРОВКА AUDIO НА ANDROID
// ============================================================

document.addEventListener(
    "pointerdown",
    () => {

        initAudio();

    },
    {
        once: true
    }
);


// ============================================================
// SUPABASE DEBUG
// ============================================================

async function testSupabaseConnection() {

    debugSet(
        "debugSupabase",
        "Проверка...",
        "warning"
    );

    debugLog(
        "Подключаемся к Supabase..."
    );


    if (!window.supabase) {

        debugSet(
            "debugSupabase",
            "Ошибка",
            "error"
        );

        debugSet(
            "debugError",
            "Supabase JS не загружен",
            "error"
        );

        debugLog(
            "Не найден window.supabase. Проверь интернет и подключение CDN."
        );

        return;

    }


    if (!supabaseClient) {

        debugSet(
            "debugSupabase",
            "Нет ключа",
            "error"
        );

        debugSet(
            "debugError",
            "Publishable key не указан",
            "error"
        );

        debugLog(
            "В script.js нужно вставить свой publishable key."
        );

        return;

    }


    try {

        debugLog(
            "Отправляем запрос в таблицу slots..."
        );


        const {
            data: slots,
            error: slotsError
        } = await supabaseClient
            .from("slots")
            .select(
                "slot_number, status, price"
            )
            .order(
                "slot_number",
                {
                    ascending: true
                }
            );


        if (slotsError) {

            console.error(
                "SPN SUPABASE SLOTS ERROR:",
                slotsError
            );

            debugSet(
                "debugSupabase",
                "Ошибка",
                "error"
            );

            debugSet(
                "debugError",
                slotsError.message ||
                "Ошибка запроса slots",
                "error"
            );

            debugLog(
                `Supabase error: ${slotsError.message}`
            );

            return;

        }


        debugSet(
            "debugSupabase",
            "Подключено ✓",
            "ok"
        );


        debugSet(
            "debugSlots",
            String(
                slots
                    ? slots.length
                    : 0
            ),
            "ok"
        );


        debugLog(
            `Успешно получено ${slots.length} слотов из Supabase.`
        );


        // ----------------------------------------------------
        // PLAYERS
        // ----------------------------------------------------

        const {
            data: players,
            error: playersError
        } = await supabaseClient
            .from("players")
            .select(
                "id, slot_id, player_number, nickname, player_id"
            );


        if (playersError) {

            console.error(
                "SPN SUPABASE PLAYERS ERROR:",
                playersError
            );

            debugSet(
                "debugPlayers",
                "Ошибка",
                "error"
            );

            debugSet(
                "debugError",
                playersError.message ||
                "Ошибка players",
                "error"
            );

            debugLog(
                `Slots работают, но players вернул ошибку: ${playersError.message}`
            );

            return;

        }


        debugSet(
            "debugPlayers",
            String(
                players
                    ? players.length
                    : 0
            ),
            "ok"
        );


        debugSet(
            "debugError",
            "Нет",
            "ok"
        );


        debugLog(
            `Готово: slots = ${slots.length}, players = ${players.length}.`
        );


        console.log(
            "SPN SUPABASE OK:",
            {
                slots,
                players
            }
        );


    } catch (error) {

        console.error(
            "SPN SUPABASE CONNECTION ERROR:",
            error
        );


        debugSet(
            "debugSupabase",
            "Ошибка",
            "error"
        );


        debugSet(
            "debugError",
            error.message ||
            "Неизвестная ошибка",
            "error"
        );


        debugLog(
            `Ошибка JavaScript: ${error.message}`
        );

    }

}


// ============================================================
// START
// ============================================================

createDebugPanel();

createSlots();

applyFilters();

testSupabaseConnection();


// ============================================================
// КЛАВИША ESC — ЗАКРЫТЬ СКРИНШОТ
// ============================================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeScreenshot();

        }

    }
);
```
