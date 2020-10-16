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
	
	let output = '';
	for (var i = 0; i < rankList.length; i++) {
		output += rankList[i].playerName + " " 
    }
	if(rankList.length>0){
		console.log(`\nCurrent ranking board \n ${output}`);
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

async function main() {
	
    let N = await ask("\nEnter the number of players? ", "^[0-9]");
    let M = await ask("\nEnter the total points to win? ", "^[0-9]");
    const max = 6;
    const min = 1;
	let rank = 1;
    let playerList = [];
	let rankList = [];
    

    for (var i = 0; i < N; i++) {
	    let player = { playerName : "", score : 0, previousScore : 0, rank: N+1, playTurn: true,  };
		player.playerName = "Player-"+ (i + 1);
        playerList.push(player);
		
    }

	

    while (rankList.length < N) {
        shuffle(playerList);

        for (var i = 0; i < playerList.length; i++) {

            if (playerList[i].playTurn) {

                await ask("\n" + playerList[i].playerName + " its your turn(Press r to roll the dice)", "^[r]")


                score = Math.floor(Math.random() * Math.floor(max) + min);
				console.log(`${playerList[i].playerName} scored ${score} point(s)`)
                playerList[i].score += score;

                playerList[i].playTurn = !(score == 1 && playerList[i].previousScore == 1)

                if (!playerList[i].playTurn) {
					                    
                    console.log(`${playerList[i].playerName} have rolled 1s consecutively twice and will skip the next turn as penality`)
                }

                if (score == 6 && playerList[i].score < M) {
                    
					await ask("\n" + playerList[i].playerName + " have rolled a 6 point/s and gets one more chance(press r to roll the dice)", "^[r]")
                    score = Math.floor(Math.random() * Math.floor(max) + min);
					console.log(`${playerList[i].playerName} scored ${score} point(s)`)
                    playerList[i].score += score;
					
                }

                playerList[i].previousScore = score;
                if (playerList[i].score >= M) {

                    playerList[i].rank = rank;
					playerList[i].playTurn = false;
                    rank = rank+1;
                    rankList.push(playerList[i]);
					
                }
            } else if(playerList[i].rank == N+1){
                playerList[i].playTurn = true;
                previousScoreList[playerList[i] - 1] = 0;
            }
        }
		printScoreBoard(playerList);
		printRankBoard(rankList);
    }

    process.exit();
}

main();
