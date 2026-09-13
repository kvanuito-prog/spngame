/* =========================================================
   SPN CUSTOM ROOM
   Supabase + Slots + Search + Filters + Screenshots
========================================================= */


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL =
    "https://dgtssaispbiqxeimidjl.supabase.co";


const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_T-1SkXGZ1cMu_lMq7nML1Q_faYsD9PZ";


let supabaseClient = null;


try {

    if (
        window.supabase &&
        SUPABASE_URL &&
        SUPABASE_PUBLISHABLE_KEY
    ) {

        supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_PUBLISHABLE_KEY
            );

    }

} catch (error) {

    console.error(
        "SPN: Supabase initialization error:",
        error
    );

}


/* =========================================================
   LOCAL TEAM DATA
   Используется как fallback, пока players
   ещё не заполнены в Supabase.
========================================================= */

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


/* =========================================================
   DOM
========================================================= */

const slotsContainer =
    document.getElementById("slots");

const noResults =
    document.getElementById("noResults");

const teamCount =
    document.getElementById("teamCount");

const slotCount =
    document.getElementById("slotCount");

const databaseStatus =
    document.getElementById("databaseStatus");

const databaseMessage =
    document.getElementById("databaseMessage");

const databaseMessageText =
    document.getElementById("databaseMessageText");

const searchInput =
    document.getElementById("searchInput");

const clearSearch =
    document.getElementById("clearSearch");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const screenshotModal =
    document.getElementById("screenshotModal");

const screenshotClose =
    document.getElementById("screenshotClose");

const screenshotImage =
    document.getElementById("screenshotImage");

const screenshotTitle =
    document.getElementById("screenshotTitle");

const screenshotError =
    document.getElementById("screenshotError");


let currentFilter = "all";

let databaseSlots = [];

let databasePlayers = [];


/* =========================================================
   AUDIO
========================================================= */

let audioContext = null;

let audioUnlocked = false;


function initAudio() {

    if (audioContext) {
        return;
    }

    try {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    } catch (error) {

        return;

    }

}


function unlockAudio() {

    initAudio();

    if (!audioContext) {
        return;
    }

    if (
        audioContext.state === "suspended"
    ) {

        audioContext.resume().catch(() => {});

    }

    audioUnlocked = true;

}


function playTone(
    frequency = 500,
    duration = 0.045,
    volume = 0.025,
    type = "sine"
) {

    if (!audioUnlocked || !audioContext) {
        return;
    }

    try {

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.type = type;

        oscillator.frequency.value =
            frequency;

        gain.gain.setValueAtTime(
            volume,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + duration
        );

        oscillator.connect(gain);

        gain.connect(audioContext.destination);

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + duration
        );

    } catch (error) {}

}


function playClick() {

    playTone(
        520,
        0.045,
        0.018,
        "sine"
    );

}


function playButtonSound() {

    playTone(
        650,
        0.055,
        0.018,
        "sine"
    );

}


function playScreenshotSound() {

    playTone(
        760,
        0.06,
        0.02,
        "triangle"
    );

}


function playCloseSound() {

    playTone(
        350,
        0.045,
        0.015,
        "sine"
    );

}


document.addEventListener(
    "pointerdown",
    unlockAudio,
    {
        once: true,
        passive: true
    }
);


/* =========================================================
   HELPERS
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function formatPrice(price) {

    const number =
        Number(price);

    if (
        !Number.isFinite(number)
    ) {

        return "100 ₽";

    }

    return (
        number.toLocaleString("ru-RU")
        + " ₽"
    );

}


function getLocalTeam(slotNumber) {

    return teams[slotNumber] || [];

}


function getPlayersForSlot(slotId) {

    return databasePlayers
        .filter(
            player =>
                player.slot_id === slotId
        )
        .sort(
            (a, b) =>
                Number(a.player_number) -
                Number(b.player_number)
        );

}


/* =========================================================
   DATABASE STATUS
========================================================= */

function setDatabaseStatus(
    state,
    text
) {

    databaseMessage.classList.remove(
        "connected",
        "error"
    );

    if (state === "connected") {

        databaseMessage.classList.add(
            "connected"
        );

        databaseStatus.textContent =
            "OK";

    } else if (state === "error") {

        databaseMessage.classList.add(
            "error"
        );

        databaseStatus.textContent =
            "!";

    } else {

        databaseStatus.textContent =
            "…";

    }

    databaseMessageText.textContent =
        text;

}


/* =========================================================
   GET SLOTS FROM SUPABASE
========================================================= */

async function loadDatabase() {

    if (!supabaseClient) {

        setDatabaseStatus(
            "error",
            "Supabase не инициализирован"
        );

        createSlots([]);

        return;

    }


    setDatabaseStatus(
        "loading",
        "Загрузка данных..."
    );


    try {

        const {
            data: slots,
            error: slotsError
        } = await supabaseClient
            .from("slots")
            .select(
                "id, slot_number, status, team_name, price, buyout_count"
            )
            .order(
                "slot_number",
                {
                    ascending: true
                }
            );


        if (slotsError) {

            throw slotsError;

        }


        databaseSlots =
            Array.isArray(slots)
                ? slots
                : [];


        const {
            data: players,
            error: playersError
        } = await supabaseClient
            .from("players")
            .select(
                "id, slot_id, player_number, nickname, player_id, screenshot_path"
            );


        if (playersError) {

            console.warn(
                "Players error:",
                playersError
            );

            databasePlayers = [];

        } else {

            databasePlayers =
                Array.isArray(players)
                    ? players
                    : [];

        }


        setDatabaseStatus(
            "connected",
            `Supabase подключен • ${databaseSlots.length} слотов • ${databasePlayers.length} игроков`
        );


        createSlots(
            databaseSlots
        );


    } catch (error) {

        console.error(
            "SPN database error:",
            error
        );


        setDatabaseStatus(
            "error",
            "Не удалось загрузить Supabase • используются данные сайта"
        );


        databaseSlots = [];

        databasePlayers = [];

        createSlots([]);

    }

}


/* =========================================================
   FIND SLOT DATA
========================================================= */

function getSlotData(slotNumber) {

    return databaseSlots.find(
        slot =>
            Number(slot.slot_number) ===
            Number(slotNumber)
    ) || null;

}


/* =========================================================
   PLAYER HTML
========================================================= */

function createPlayerHTML(
    player,
    playerNumber,
    slotNumber
) {

    if (!player) {

        return `
            <div class="player">

                <div class="player-number">
                    ${playerNumber}
                </div>

                <div class="player-info">

                    <span class="player-empty">
                        СВОБОДНО
                    </span>

                </div>

            </div>
        `;

    }


    const nickname =
        player.nickname || "Без ника";

    const playerId =
        player.player_id || "—";


    let screenshotPath =
        player.screenshot_path;


    if (!screenshotPath) {

        screenshotPath =
            `images/${slotNumber}-${playerNumber}.jpg`;

    }


    return `
        <div class="player">

            <div class="player-number">
                ${playerNumber}
            </div>

            <div class="player-info">

                <div class="player-main">

                    <span class="player-name">
                        ${escapeHTML(nickname)}
                    </span>

                    <span class="player-id">
                        ID: ${escapeHTML(playerId)}
                    </span>

                </div>

            </div>

            <button
                type="button"
                class="screenshot-btn"
                data-image="${escapeHTML(screenshotPath)}"
                data-player="${escapeHTML(nickname)}"
                title="Открыть скриншот"
            >
                IMG
            </button>

        </div>
    `;

}


/* =========================================================
   CREATE BUFFER
========================================================= */

function createBufferCard() {

    return `
        <article
            class="slot-card buffer-card"
            data-type="buffer"
            data-search="буфер buffer 1 2 3 4 5 6"
        >

            <div class="slot-header">

                <div class="slot-number-wrap">

                    <span class="slot-label">
                        BUFFER
                    </span>

                    <span class="slot-number">
                        1–6
                    </span>

                </div>

                <span class="slot-status">
                    BUFFER
                </span>

            </div>


            <div class="buffer-content">

                <div class="buffer-icon">
                    ◈
                </div>

                <div class="buffer-title">
                    БУФЕРНЫЕ СЛОТЫ
                </div>

                <div class="buffer-subtitle">
                    Резервные позиции 1–6
                    для организации кастомной комнаты
                </div>

            </div>

        </article>
    `;

}


/* =========================================================
   CREATE TEAM CARD
========================================================= */

function createTeamCard(
    slotNumber
) {

    const dbSlot =
        getSlotData(slotNumber);


    const localTeam =
        getLocalTeam(slotNumber);


    const dbPlayers =
        dbSlot
            ? getPlayersForSlot(dbSlot.id)
            : [];


    let players;


    if (dbPlayers.length > 0) {

        players = [
            dbPlayers[0] || null,
            dbPlayers[1] || null
        ];

    } else {

        players = [
            localTeam[0]
                ? {
                    nickname: localTeam[0][0],
                    player_id: localTeam[0][1]
                }
                : null,

            localTeam[1]
                ? {
                    nickname: localTeam[1][0],
                    player_id: localTeam[1][1]
                }
                : null
        ];

    }


    const price =
        dbSlot?.price ?? 100;


    const buyoutCount =
        dbSlot?.buyout_count ?? 0;


    const teamName =
        dbSlot?.team_name ||
        "";


    const playerSearch =
        players
            .filter(Boolean)
            .map(
                player =>
                    `${player.nickname || ""} ${player.player_id || ""}`
            )
            .join(" ");


    const searchText =
        `
        ${slotNumber}
        ${teamName}
        ${playerSearch}
        `.toLowerCase();


    return `
        <article
            class="slot-card team-card"
            data-type="team"
            data-slot="${slotNumber}"
            data-search="${escapeHTML(searchText)}"
        >

            <div class="slot-header">

                <div class="slot-number-wrap">

                    <span class="slot-label">
                        SLOT
                    </span>

                    <span class="slot-number">
                        ${slotNumber}
                    </span>

                </div>


                <div class="team-price">

                    <span class="price-value">
                        ${formatPrice(price)}
                    </span>

                    <span class="price-label">
                        KICK
                    </span>

                </div>

            </div>


            <div class="players">

                ${createPlayerHTML(
                    players[0],
                    1,
                    slotNumber
                )}

                ${createPlayerHTML(
                    players[1],
                    2,
                    slotNumber
                )}

            </div>


            <div class="team-actions">

                <button
                    type="button"
                    class="kick-button"
                    data-slot="${slotNumber}"
                    data-price="${price}"
                    data-buyouts="${buyoutCount}"
                >
                    KICK • ${formatPrice(price)}
                </button>

            </div>

        </article>
    `;

}


/* =========================================================
   CREATE ALL SLOTS
========================================================= */

function createSlots(
    slotsFromDatabase = []
) {

    slotsContainer.innerHTML = "";


    const fragment =
        document.createDocumentFragment();


    const temporary =
        document.createElement("div");


    temporary.innerHTML =
        createBufferCard();


    while (
        temporary.firstElementChild
    ) {

        fragment.appendChild(
            temporary.firstElementChild
        );

    }


    for (
        let slotNumber = 7;
        slotNumber <= 50;
        slotNumber++
    ) {

        temporary.innerHTML =
            createTeamCard(slotNumber);


        while (
            temporary.firstElementChild
        ) {

            fragment.appendChild(
                temporary.firstElementChild
            );

        }

    }


    slotsContainer.appendChild(
        fragment
    );


    const count =
        Object.keys(teams).length;


    teamCount.textContent =
        count;


    slotCount.textContent =
        slotsFromDatabase.length ||
        50;


    applyFilters();

}


/* =========================================================
   FILTERING
========================================================= */

function applyFilters() {

    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    const cards =
        slotsContainer.querySelectorAll(
            ".slot-card"
        );


    let visibleCount = 0;


    cards.forEach(card => {

        const type =
            card.dataset.type;


        const searchText =
            (
                card.dataset.search ||
                ""
            ).toLowerCase();


        let typeMatch = true;


        if (
            currentFilter === "buffer"
        ) {

            typeMatch =
                type === "buffer";

        } else if (
            currentFilter === "teams"
        ) {

            typeMatch =
                type === "team";

        }


        const searchMatch =
            !query ||
            searchText.includes(query);


        const visible =
            typeMatch &&
            searchMatch;


        card.style.display =
            visible
                ? ""
                : "none";


        if (visible) {

            visibleCount++;

        }

    });


    noResults.classList.toggle(
        "visible",
        visibleCount === 0
    );


    clearSearch.classList.toggle(
        "visible",
        Boolean(query)
    );

}


/* =========================================================
   FILTER BUTTONS
========================================================= */

filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                unlockAudio();

                playButtonSound();


                filterButtons.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                button.classList.add(
                    "active"
                );


                currentFilter =
                    button.dataset.filter;


                applyFilters();

            }
        );

    }
);


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
    "input",
    () => {

        applyFilters();

    }
);


clearSearch.addEventListener(
    "click",
    () => {

        unlockAudio();

        playClick();

        searchInput.value = "";

        searchInput.focus();

        applyFilters();

    }
);


/* =========================================================
   SCREENSHOT
========================================================= */

function openScreenshot(
    imagePath,
    playerName
) {

    unlockAudio();

    playScreenshotSound();


    screenshotTitle.textContent =
        playerName ||
        "Скриншот игрока";


    screenshotError.classList.remove(
        "visible"
    );


    screenshotImage.style.display =
        "block";


    screenshotImage.src =
        imagePath;


    screenshotModal.classList.add(
        "open"
    );


    screenshotModal.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeScreenshot() {

    playCloseSound();


    screenshotModal.classList.remove(
        "open"
    );


    screenshotModal.setAttribute(
        "aria-hidden",
        "true"
    );


    screenshotImage.src = "";

}


/* Image error */

screenshotImage.addEventListener(
    "error",
    () => {

        screenshotImage.style.display =
            "none";

        screenshotError.classList.add(
            "visible"
        );

    }
);


/* Image loaded */

screenshotImage.addEventListener(
    "load",
    () => {

        screenshotImage.style.display =
            "block";

        screenshotError.classList.remove(
            "visible"
        );

    }
);


/* Close button */

screenshotClose.addEventListener(
    "click",
    closeScreenshot
);


/* Click outside */

screenshotModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            screenshotModal
        ) {

            closeScreenshot();

        }

    }
);


/* =========================================================
   KICK
========================================================= */

function openKickInfo(
    slotNumber,
    price,
    buyoutCount
) {

    unlockAudio();

    playClick();


    const formattedPrice =
        formatPrice(price);


    const nextPrice =
        formatPrice(
            Number(price) * 2
        );


    const message =
        `Хотите кикнуть команду и занять слот №${slotNumber}?\n\n` +
        `Цена слота: ${formattedPrice}\n` +
        `После покупки следующая цена: ${nextPrice}\n\n` +
        `Для покупки обращайтесь в Telegram:\n` +
        `@VankKingX`;


    alert(message);

}


/* =========================================================
   DELEGATED CLICK EVENTS
========================================================= */

slotsContainer.addEventListener(
    "click",
    event => {

        const screenshotButton =
            event.target.closest(
                ".screenshot-btn"
            );


        if (screenshotButton) {

            openScreenshot(
                screenshotButton.dataset.image,
                screenshotButton.dataset.player
            );

            return;

        }


        const kickButton =
            event.target.closest(
                ".kick-button"
            );


        if (kickButton) {

            openKickInfo(
                Number(
                    kickButton.dataset.slot
                ),

                Number(
                    kickButton.dataset.price
                ),

                Number(
                    kickButton.dataset.buyouts
                )
            );

        }

    }
);


/* =========================================================
   BUTTON HOVER SOUND
========================================================= */

let lastHoverButton = null;


slotsContainer.addEventListener(
    "mouseover",
    event => {

        const button =
            event.target.closest(
                "button"
            );


        if (!button) {
            return;
        }


        if (
            lastHoverButton === button
        ) {

            return;

        }


        lastHoverButton =
            button;


        unlockAudio();

        playTone(
            720,
            0.025,
            0.008,
            "sine"
        );

    }
);


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            if (
                screenshotModal.classList.contains(
                    "open"
                )
            ) {

                closeScreenshot();

            }

        }

    }
);


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        createSlots([]);

        loadDatabase();

    }
);
