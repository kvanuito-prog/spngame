/* =========================================================
   SPN CUSTOM ROOM — ADMIN PANEL
========================================================= */


/* =========================================================
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
   DOM
========================================================= */

const loginSection =
    document.getElementById("loginSection");

const panelSection =
    document.getElementById("panelSection");

const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("emailInput");

const passwordInput =
    document.getElementById("passwordInput");

const loginMessage =
    document.getElementById("loginMessage");

const logoutButton =
    document.getElementById("logoutButton");

const slotsList =
    document.getElementById("slotsList");

const databaseMessage =
    document.getElementById("databaseMessage");

const userEmail =
    document.getElementById("userEmail");


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


function formatPrice(value) {

    return Number(value || 0)
        .toLocaleString("ru-RU") + " ₽";

}


/* =========================================================
   LOGIN
========================================================= */

async function checkSession() {

    const {
        data,
        error
    } = await supabaseClient.auth.getSession();


    if (error) {

        console.error(error);

        showLogin();

        return;

    }


    if (data.session) {

        showPanel(
            data.session.user
        );

    } else {

        showLogin();

    }

}


function showLogin() {

    loginSection.hidden = false;

    panelSection.hidden = true;

    logoutButton.style.display = "none";

}


async function showPanel(user) {

    loginSection.hidden = true;

    panelSection.hidden = false;

    logoutButton.style.display = "block";

    userEmail.textContent =
        user?.email || "";

    await loadAdminData();

}


loginForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        loginMessage.textContent =
            "Выполняется вход...";


        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        const {
            data,
            error
        } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });


        if (error) {

            console.error(error);

            loginMessage.textContent =
                "Неверный email или пароль.";

            return;

        }


        loginMessage.textContent =
            "";

        passwordInput.value = "";


        await showPanel(
            data.user
        );

    }
);


/* =========================================================
   LOGOUT
========================================================= */

logoutButton.addEventListener(
    "click",
    async () => {

        await supabaseClient.auth.signOut();

        slotsList.innerHTML = "";

        showLogin();

    }
);


/* =========================================================
   LOAD DATABASE
========================================================= */

async function loadAdminData() {

    databaseMessage.textContent =
        "Загрузка базы...";


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


        const {
            data: players,
            error: playersError
        } = await supabaseClient
            .from("players")
            .select(
                "id, slot_id, player_number, nickname, player_id, screenshot_path"
            );


        if (playersError) {

            throw playersError;

        }


        renderSlots(
            slots || [],
            players || []
        );


        databaseMessage.textContent =
            `База подключена • ${slots.length} слотов • ${players.length} игроков`;

    } catch (error) {

        console.error(
            "Admin database error:",
            error
        );

        databaseMessage.textContent =
            "Ошибка загрузки базы.";

    }

}


/* =========================================================
   RENDER
========================================================= */

function getPlayers(
    players,
    slotId
) {

    return players
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


function renderSlots(
    slots,
    players
) {

    slotsList.innerHTML = "";


    slots.forEach(
        slot => {

            if (
                Number(slot.slot_number) < 7
            ) {

                return;

            }


            const slotPlayers =
                getPlayers(
                    players,
                    slot.id
                );


            const player1 =
                slotPlayers.find(
                    player =>
                        Number(player.player_number) === 1
                ) || null;


            const player2 =
                slotPlayers.find(
                    player =>
                        Number(player.player_number) === 2
                ) || null;


            const card =
                document.createElement("article");


            card.className =
                "admin-slot";


            card.dataset.slotId =
                slot.id;


            card.innerHTML = `

                <div class="slot-top">

                    <div class="slot-title">

                        <span class="slot-label">
                            SLOT
                        </span>

                        <span class="slot-number">
                            ${slot.slot_number}
                        </span>

                    </div>

                    <span class="slot-price">
                        ${formatPrice(slot.price)}
                    </span>

                </div>


                <div class="team-name-wrap">

                    <label class="field-label">
                        НАЗВАНИЕ КОМАНДЫ
                    </label>

                    <input
                        class="team-name-input"
                        data-field="team-name"
                        value="${escapeHTML(slot.team_name || "")}"
                        placeholder="Название команды"
                    >

                </div>


                <div class="players-edit">

                    ${createPlayerEditor(
                        1,
                        player1
                    )}

                    ${createPlayerEditor(
                        2,
                        player2
                    )}

                </div>


                <div class="save-row">

                    <button
                        type="button"
                        class="save-button"
                        data-action="save"
                    >
                        СОХРАНИТЬ
                    </button>

                </div>

            `;


            slotsList.appendChild(card);

        }
    );

}


function createPlayerEditor(
    number,
    player
) {

    return `

        <div class="player-editor">

            <div class="player-editor-title">
                ИГРОК ${number}
            </div>


            <label>

                НИК

                <input
                    type="text"
                    data-player-number="${number}"
                    data-field="nickname"
                    value="${escapeHTML(player?.nickname || "")}"
                    placeholder="Ник игрока"
                >

            </label>


            <label>

                PUBG ID

                <input
                    type="text"
                    data-player-number="${number}"
                    data-field="player_id"
                    value="${escapeHTML(player?.player_id || "")}"
                    placeholder="PUBG ID"
                >

            </label>

        </div>

    `;

}


/* =========================================================
   SAVE SLOT
========================================================= */

slotsList.addEventListener(
    "click",
    async event => {

        const button =
            event.target.closest(
                '[data-action="save"]'
            );


        if (!button) {
            return;
        }


        const card =
            button.closest(
                ".admin-slot"
            );


        if (!card) {
            return;
        }


        await saveSlot(
            card,
            button
        );

    }
);


async function saveSlot(
    card,
    button
) {

    const slotId =
        card.dataset.slotId;


    const teamNameInput =
        card.querySelector(
            '[data-field="team-name"]'
        );


    const teamName =
        teamNameInput.value.trim();


    button.disabled = true;

    button.textContent =
        "СОХРАНЕНИЕ...";


    try {

        /* -----------------------------------------
           UPDATE SLOT
        ----------------------------------------- */

        const {
            error: slotError
        } = await supabaseClient
            .from("slots")
            .update({
                team_name: teamName,
                updated_at: new Date().toISOString()
            })
            .eq(
                "id",
                slotId
            );


        if (slotError) {

            throw slotError;

        }


        /* -----------------------------------------
           UPDATE PLAYERS
        ----------------------------------------- */

        const playerInputs =
            card.querySelectorAll(
                "[data-player-number]"
            );


        for (
            const input
            of playerInputs
        ) {

            if (
                input.dataset.field !==
                "nickname" &&
                input.dataset.field !==
                "player_id"
            ) {

                continue;

            }


            const playerNumber =
                Number(
                    input.dataset.playerNumber
                );


            const field =
                input.dataset.field;


            const value =
                input.value.trim();


            const playerInputsForNumber =
                card.querySelectorAll(
                    `[data-player-number="${playerNumber}"]`
                );


            let nickname = "";
            let playerId = "";


            playerInputsForNumber.forEach(
                item => {

                    if (
                        item.dataset.field ===
                        "nickname"
                    ) {

                        nickname =
                            item.value.trim();

                    }

                    if (
                        item.dataset.field ===
                        "player_id"
                    ) {

                        playerId =
                            item.value.trim();

                    }

                }
            );


            const {
                error: playerError
            } = await supabaseClient
                .from("players")
                .update({
                    nickname,
                    player_id: playerId
                })
                .eq(
                    "slot_id",
                    slotId
                )
                .eq(
                    "player_number",
                    playerNumber
                );


            if (playerError) {

                throw playerError;

            }

        }


        button.textContent =
            "СОХРАНЕНО ✓";


        button.classList.add(
            "saved"
        );


        setTimeout(
            () => {

                button.textContent =
                    "СОХРАНИТЬ";

                button.classList.remove(
                    "saved"
                );

            },
            1800
        );


    } catch (error) {

        console.error(
            "Save error:",
            error
        );


        button.textContent =
            "ОШИБКА";


        button.classList.add(
            "error"
        );


        setTimeout(
            () => {

                button.textContent =
                    "СОХРАНИТЬ";

                button.classList.remove(
                    "error"
                );

            },
            2200
        );

    } finally {

        button.disabled = false;

    }

}


/* =========================================================
   AUTH STATE
========================================================= */

supabaseClient.auth.onAuthStateChange(
    (
        event,
        session
    ) => {

        if (session) {

            showPanel(
                session.user
            );

        } else {

            showLogin();

        }

    }
);


/* =========================================================
   START
========================================================= */

checkSession();
