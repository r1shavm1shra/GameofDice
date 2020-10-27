function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function askOnce(question) {
    var stdin = process.stdin,
        stdout = process.stdout;

    stdin.resume();
    stdout.write(question + ": ");

    return new Promise(res => {
        stdin.once('data', function(data) {
            res(data.toString().trim());
        });
    });
}

async function ask(question, format) {
    let answer;
    let regex;
    do {
        answer = await askOnce(question);
        regex = RegExp(format);
    } while (!regex.test(answer));

    return answer;
}

function printRankBoard(rankList){
	
    
    
    if(rankList.length>0){
    console.log('Current Ranking Board');
    console.log('Player Rank Score');
	for (var i = 0; i < rankList.length; i++) {
        
            console.log(`\n${rankList[i].playerName} ${rankList[i].rank} ${rankList[i].score}`);
        
    }
    		
	}
}

function printScoreBoard(playerList){
	
	let output = 'Player : Current Score\n';
	for (var i = 0; i < playerList.length; i++) {
		output += "\t"+playerList[i].playerName + ": " + playerList[i].score+ " point(s) \n";
    }
	if(playerList.length>0){
	console.log(`\nCurrent score board \n ${output}`);
	}
	
}

let rank = 1;

async function main() {
	
    let N = await ask("\nEnter the number of players?(more than 1 player) ", "^[2-9]");
    let M = await ask("\nEnter the total points to win? ", "^[0-9]");
    
    const max = 6;
    const min = 1;
    let playerList = [];
	let rankList = [];
    

    for (var i = 0; i < N; i++) {
        let player = { playerName : "", score : 0, previousScore : 0, rank: 0, playTurn: true, playerIndex :0 };
        player.playerIndex = i;
		player.playerName = "Player-"+ (i + 1);
        playerList.push(player);
		
    }

    
    shuffle(playerList);
    let turn =0;
    while (rank <= playerList.length) {
        turn = turn+1;
        for (var i = 0; i < playerList.length; i++) {

            rank = UpdatePlayerScore(playerList[i], N, M , rank, rankList, turn);
            
        }
		printScoreBoard(playerList);
		printRankBoard( rankList);
    }
    
    process.exit();
}

function UpdatePlayerScore(player, N, M , rank, rankList, turn){
    
    if(rank > N)
    {
        return rank;
    }

    

if (player.playTurn) {

    //await ask("\n" + player.playerName + " its your turn(Press r to roll the dice)", "^[r]")
    
    //Generate
    score = Math.floor(Math.random() * Math.floor(6) + 1);
    //store in tbl_game_turn

    // Retreive
    //get score from tbl_game_turn

    console.log(`${player.playerName} scored ${score} point(s)`)
    player.score += score;

    player.playTurn = !(score == 1 && player.previousScore == 1)
    
    if (!player.playTurn && player.score < M) {
                            
        console.log(`${player.playerName} have rolled 1s consecutively twice and will skip the next turn as penality`)
    }

    if (score == 6 && player.score < M) {
        
        //ask("\n" + player.playerName + " have rolled a 6 point/s and gets one more chance(press r to roll the dice)", "^[r]")
        console.log(player.playerName + " have rolled a 6 point/s and gets one more chance(press r to roll the dice)");
        rank = UpdatePlayerScore(player, N, M, rank, rankList, turn)
        
    }

    player.previousScore = score;
    if (player.score >= M && player.rank == 0) {

        player.rank = rank;
        player.playTurn = false;
        rankList.push(player);
        rank = rank+1;
    }

    
} else if(player.rank == 0){
    player.playTurn = true;
    player.previousScore = 0;
}

return rank;
}

main();
