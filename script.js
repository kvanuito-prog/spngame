/* =========================================================
   SPN CUSTOM ROOM
   SUPABASE
========================================================= */

const SUPABASE_URL =
    "https://dgtssaispbiqxeimidjl.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_T-1SkXGZ1cMu_lMq7nML1Q_faYsD9PZ";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


/* =========================================================
   TEAM DATA
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
   ELEMENTS
========================================================= */

const slotsContainer =
    document.getElementById("slots");

const noResults =
    document.getElementById("noResults");

const teamCount =
    document.getElementById("teamCount");

const searchInput =
    document.getElementById("searchInput");

let currentFilter = "all";


/* =========================================================
   SOUND SYSTEM
========================================================= */

let audioContext = null;

let soundEnabled = true;


function initAudio() {

    if (!audioContext) {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) {
            return;
        }

        audioContext =
            new AudioContext();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
}


function playClick(
    frequency = 520,
    duration = 0.045,
    volume = 0.035
) {

    if (!soundEnabled) {
        return;
    }

    initAudio();

    if (!audioContext) {
        return;
    }

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
        frequency,
        audioContext.currentTime
    );

    gain.gain.setValueAtTime(
        volume,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + duration
    );

    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + duration
    );
}


function playButtonSound() {

    playClick(
        520,
        0.045,
        0.035
    );

}


function playHoverSound() {

    playClick(
        720,
        0.025,
        0.012
    );

}


function playScreenshotSound() {

    if (!soundEnabled) {
        return;
    }

    initAudio();

    if (!audioContext) {
        return;
    }

    const now =
        audioContext.currentTime;

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
        650,
        now
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        950,
        now + 0.08
    );

    gain.gain.setValueAtTime(
        0.001,
        now
    );

    gain.gain.linearRampToValueAtTime(
        0.035,
        now + 0.01
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.12
    );

    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );

    oscillator.start(now);

    oscillator.stop(
        now + 0.13
    );
}


function playCloseSound() {

    playClick(
        330,
        0.06,
        0.025
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   SCREENSHOT MODAL
========================================================= */

const screenshotModal =
    document.createElement("div");

screenshotModal.id =
    "screenshotModal";

screenshotModal.innerHTML = `

    <div class="screenshot-overlay"></div>

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

        <img
            id="screenshotImage"
            src=""
            alt="Скриншот игрока"
        >

        <div
            class="screenshot-error"
            id="screenshotError"
        >
            Скриншот ещё не загружен
        </div>

    </div>

`;

document.body.appendChild(
    screenshotModal
);


/* =========================================================
   MODAL CSS
========================================================= */

const screenshotStyles =
    document.createElement("style");

screenshotStyles.textContent = `

    #screenshotModal {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 99999;
        align-items: center;
        justify-content: center;
    }

    #screenshotModal.active {
        display: flex;
    }

`;

document.head.appendChild(
    screenshotStyles
);


/* =========================================================
   OPEN SCREENSHOT
========================================================= */

function openScreenshot(
    imagePath,
    playerName
) {

    playScreenshotSound();

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
        `СКРИНШОТ • ${playerName}`;

    error.style.display =
        "none";

    image.style.display =
        "block";

    image.src =
        imagePath;

    image.onerror =
        function () {

            image.style.display =
                "none";

            error.style.display =
                "block";

        };

    screenshotModal.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";
}


/* =========================================================
   CLOSE SCREENSHOT
========================================================= */

function closeScreenshot() {

    playCloseSound();

    screenshotModal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

    const image =
        document.getElementById(
            "screenshotImage"
        );

    image.src = "";
}


/* =========================================================
   MODAL EVENTS
========================================================= */

const screenshotClose =
    screenshotModal.querySelector(
        ".screenshot-close"
    );

const screenshotOverlay =
    screenshotModal.querySelector(
        ".screenshot-overlay"
    );

screenshotClose.addEventListener(
    "click",
    closeScreenshot
);

screenshotOverlay.addEventListener(
    "click",
    closeScreenshot
);

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            screenshotModal.classList.contains(
                "active"
            )
        ) {

            closeScreenshot();

        }

    }
);


/* =========================================================
   CREATE SLOTS
========================================================= */

function createSlots() {

    slotsContainer.innerHTML = "";


    /* -----------------------------------------------------
       BUFFER 1–6
    ----------------------------------------------------- */

    const bufferSlot =
        document.createElement("div");

    bufferSlot.className =
        "slot buffer";

    bufferSlot.dataset.slot =
        "buffer";

    bufferSlot.innerHTML = `

        <div class="slot-number">
            СЛОТЫ 1–6
        </div>

        <div class="buffer-text">
            БУФЕРНЫЕ СЛОТЫ
        </div>

    `;

    slotsContainer.appendChild(
        bufferSlot
    );


    /* -----------------------------------------------------
       TEAM SLOTS 7–50
    ----------------------------------------------------- */

    for (
        let slotNumber = 7;
        slotNumber <= 50;
        slotNumber++
    ) {

        const slot =
            document.createElement("div");

        slot.className =
            "slot";

        slot.dataset.slot =
            String(slotNumber);

        const players =
            teams[slotNumber];


        if (players) {

            let playersHTML = "";

            players.forEach(
                (player, playerIndex) => {

                    const playerName =
                        escapeHTML(
                            player[0]
                        );

                    const playerId =
                        escapeHTML(
                            player[1]
                        );

                    const imagePath =
                        `images/${slotNumber}-${playerIndex + 1}.jpg`;

                    playersHTML += `

                        <div class="player">

                            <span class="nickname">
                                ${playerName}
                            </span>

                            <div class="player-id">
                                ID: ${playerId}
                            </div>

                            <button
                                class="screenshot-button"
                                type="button"
                                data-image="${imagePath}"
                                data-player="${playerName}"
                            >
                                СКРИНШОТ
                            </button>

                        </div>

                    `;

                }
            );


            slot.innerHTML = `

                <div class="slot-number">
                    СЛОТ ${slotNumber}
                </div>

                ${playersHTML}

            `;

        } else {

            slot.classList.add(
                "buffer"
            );

            slot.innerHTML = `

                <div class="slot-number">
                    СЛОТ ${slotNumber}
                </div>

                <div class="buffer-text">
                    СВОБОДЕН
                </div>

            `;

        }

        slotsContainer.appendChild(
            slot
        );

    }


    teamCount.textContent =
        Object.keys(teams).length;
}


/* =========================================================
   FILTER + SEARCH
========================================================= */

function applyFilters() {

    const query =
        searchInput.value
            .trim()
            .toLowerCase();

    const slots =
        Array.from(
            slotsContainer.querySelectorAll(
                ".slot"
            )
        );

    let visibleCount = 0;


    slots.forEach(slot => {

        const slotNumber =
            slot.dataset.slot;

        let matchesFilter = true;


        if (
            currentFilter === "all"
        ) {

            matchesFilter = true;

        }

        else if (
            currentFilter === "buffer"
        ) {

            matchesFilter =
                slotNumber === "buffer";

        }

        else if (
            currentFilter === "teams"
        ) {

            const number =
                Number(slotNumber);

            matchesFilter =
                number >= 7 &&
                number <= 50;

        }


        const matchesSearch =
            slot.textContent
                .toLowerCase()
                .includes(query);


        const visible =
            matchesFilter &&
            matchesSearch;


        slot.style.display =
            visible ? "" : "none";


        if (visible) {
            visibleCount++;
        }

    });


    noResults.style.display =
        visibleCount === 0
            ? "block"
            : "none";
}


/* =========================================================
   FILTER BUTTONS
========================================================= */

const filterButtons =
    document.querySelectorAll(
        ".filter-btn"
    );

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            initAudio();

            playButtonSound();

            filterButtons.forEach(
                btn => {

                    btn.classList.remove(
                        "active"
                    );

                }
            );

            this.classList.add(
                "active"
            );

            currentFilter =
                this.dataset.filter;

            applyFilters();

        }
    );

});


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
    "input",
    function () {

        initAudio();

        applyFilters();

    }
);


/* =========================================================
   SCREENSHOT BUTTON
========================================================= */

slotsContainer.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                ".screenshot-button"
            );

        if (!button) {
            return;
        }

        openScreenshot(
            button.dataset.image,
            button.dataset.player
        );

    }
);


/* =========================================================
   HOVER SOUNDS
========================================================= */

let lastHoverTime = 0;

document.addEventListener(
    "mouseover",
    function (event) {

        const button =
            event.target.closest(
                ".filter-btn, .screenshot-button, .screenshot-close"
            );

        if (!button) {
            return;
        }

        const now =
            Date.now();

        if (
            now - lastHoverTime < 80
        ) {
            return;
        }

        lastHoverTime = now;

        playHoverSound();

    }
);


/* =========================================================
   GENERAL BUTTON SOUND
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "button"
            );

        if (!button) {
            return;
        }

        if (
            button.classList.contains(
                "filter-btn"
            ) ||
            button.classList.contains(
                "screenshot-button"
            ) ||
            button.classList.contains(
                "screenshot-close"
            )
        ) {
            return;
        }

        playButtonSound();

    }
);


/* =========================================================
   FIRST USER INTERACTION
========================================================= */

document.addEventListener(
    "pointerdown",
    function () {

        initAudio();

    },
    {
        once: true
    }
);


/* =========================================================
   SUPABASE CONNECTION TEST
========================================================= */

async function testSupabaseConnection() {

    console.log(
        "SPN: проверяем подключение к Supabase..."
    );

    const {
        data,
        error
    } = await supabaseClient
        .from("slots")
        .select(
            "slot_number, status, price"
        )
        .order(
            "slot_number"
        );


    if (error) {

        console.error(
            "SPN SUPABASE ERROR:",
            error
        );

        return;

    }


    console.log(
        "SPN SUPABASE OK:",
        data
    );

    console.log(
        `SPN: получено слотов: ${data.length}`
    );

}


/* =========================================================
   START
========================================================= */

createSlots();

applyFilters();

testSupabaseConnection();
