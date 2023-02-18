let fields = [];
let gameOver = false;
let currentShape = 'cross';

/* ================================================ SPIELER NAMEN LÖSCHEN ============================================== */
function deletePlayerNames() {
    document.getElementById('playerName1').value = '';
    document.getElementById('playerName2').value = '';
}

/* ========================================= SYMBOLE / AKTUELLER SPIELER ANZEIGEN ======================================= */
function fillShape(id) {
    if(!fields[id] && !gameOver){      // Doppelklick vermeiden > wenn array an der Stelle "id" kein Wert hat und gameOver true ist, dann wird das Symbol dem array hinzugefügt und es geht weiter
                                       // sonst passiert nichts.
    if(currentShape =='circle'){        //Wenn das aktuelle Symbol Kreuz ist, wird Spieler 2 aktiv gesetzt
        currentShape = 'cross';
        document.getElementById('player1').classList.remove('playerInactive');
        document.getElementById('player2').classList.add('playerInactive');
    } else {                           //Sonst wenn das aktuelle Symbol Kreis ist, wird Spieler 1 aktiv gesetzt
        currentShape = 'circle';
        document.getElementById('player1').classList.add('playerInactive');
        document.getElementById('player2').classList.remove('playerInactive');
    }
    fields[id] = currentShape;                        //Array wird an der genannten Stelle (id) mit dem String "Circle" oder "Cross" befüllt
    showShapes();                                     // Korrektes Symbole wird angezeigt
    checkForWin();                                    // Es wird geprüft ob jemand gewonnen hat oder es ein Unentschieden gibt
}
}

function showShapes(){                                    // Anzeig des korrekten Symols
    for (let i = 0; i < fields.length; i++) {             // For Schleife > alle Stellen des Arrays werden geprüft
        if(fields[i] == 'circle') {                       // Es wird der Wert an der genannten Stelle im Array geprüft.
            document.getElementById('circle-'+i).classList.remove('d-none'); //Wenn das aktuelle Symbol Kreis ist, dann wird es geändert zu Kreuz
        }

        if(fields[i] == 'cross') {
            document.getElementById('cross-'+i).classList.remove('d-none'); //Ansonsten wenn das aktuelle Symbol Kreuz ist, dann wird es geändert zu Kreis
        }
}
}

/* ======================================================== SPIEl NEU STARTEN ====================================================== */
function restart() {
    gameOver = false;
    fields = [];
    document.getElementById('gameOver').classList.add('d-none');
    document.getElementById('draw').classList.add('d-none');
    
    for(let i = 0; i < 8; i++){
        document.getElementById('line'+i).style.transform = "scaleX(0)";
    }
    for(let i=0; i < 9; i++){
        document.getElementById('circle-'+i).classList.add('d-none');
        document.getElementById('cross-'+i).classList.add('d-none');
    }
}

/* =================================================== GEWINNER / UNENTSCHIEDEN ERMITTELN ================================================= */
function checkForWin() {           // Es wird geprüft ob an den Stellen im array die gleichen Werte drin sind und zu gewinnen
    let winner;
    checkFieldsforWin(winner);
}

function checkFieldsforWin(winner) {
    if(fields[0] == fields[1] && fields[1] == fields[2] && fields[0]){
        winner = fields[0];
        document.getElementById('line0').style.transform = 'scaleX(1)';
        showEndScreen(winner);
    } else if(fields[3] == fields[4] && fields[4] == fields[5] && fields[3]){
        winner = fields[3];
        document.getElementById('line1').style.transform = 'scaleX(1)';
        showEndScreen(winner);
    } else if(fields[6] == fields[7] && fields[7] == fields[8] && fields[6]){
        winner = fields[6];
        document.getElementById('line2').style.transform = 'scaleX(1)';
        showEndScreen(winner);
    } else if(fields[0] == fields[3] && fields[3] == fields[6] && fields[0]){
        winner = fields[0];
        document.getElementById('line3').style.transform = 'scaleX(1)';
        showEndScreen(winner);
    } else if(fields[1] == fields[4] && fields[4] == fields[7] && fields[1]){
        winner = fields[1];
        document.getElementById('line4').style.transform = 'scaleX(1)';
        showEndScreen(winner);
    } else if(fields[2] == fields[5] && fields[5] == fields[8] && fields[2]){
        winner = fields[2];
        document.getElementById('line5').style.transform = 'scaleX(1)';
        showEndScreen(winner);
    } else if(fields[0] == fields[4] && fields[4] == fields[8] && fields[0]){
        winner = fields[0];
        document.getElementById('line6').style.transform = 'scaleX(1)';
        showEndScreen(winner);
    } else if(fields[2] == fields[4] && fields[4] == fields[6] && fields[2]){
        winner = fields[2];
        document.getElementById('line7').style.transform = 'scaleX(1)';
        showEndScreen(winner);
    }

    draw(winner);
}

function showEndScreen(winner) {
    if(winner) {                // Sollte eines der oben genannten Szenarien zutreffen, dann wird das Spiel beendet
        let playerWon = winner;
        if (playerWon == 'circle') {
            playerWon = document.getElementById('playerName1').value;
            } else {
            playerWon = document.getElementById('playerName2').value;
        }
        gameOver = true;  
        setTimeout(function(){
            document.getElementById('gameOver').classList.remove('d-none');
            if(playerWon == '') {
                if (winner == 'circle') {
                    document.getElementById('playerWon').innerHTML = 'Player 1';
                } else {
                    document.getElementById('playerWon').innerHTML = 'Player 2';
                }
            } else {
                document.getElementById('playerWon').innerHTML = playerWon;
            }
        }, 1000);
    }
}

function draw(winner) {
    if (fields.length === 9 && !fields.includes(undefined) && winner == null){        // Sollte keines der oben genannten Szenarien zutreffen, dann wird das Siel ebenfalls beendet
        gameOver = true;
        setTimeout(function(){
            document.getElementById('draw').classList.remove('d-none');
        }, 1000);
    }
}