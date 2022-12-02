const input = (await import('fs')).readFileSync('input.txt', {encoding: 'utf-8'}).replace(/\s/g, '')); // Input from the elves :)

/* --------------------------------------------- [START OF PART 1] --------------------------------------------- */
function decrypt(elfText: string){
    const overall_score: number[] = [];
    const rps = {
        A: 1, // Rock
        B: 2, // Paper
        C: 3, // Scissors
        X: 1, // Rock
        Y: 2, // Paper
        Z: 3 // Scissors
    } as const; // A - C are opponent's values && X - Z are user's values
    
    /*
    opp - Opponent
    user - Me ;)
    */
    for (const [opp, user] of (elfText.split(/(\w{2})/g).filter(str => str !== '').map(values => values.split(/(\w)/g).filter(str => str !== '')) as unknown) as `${keyof typeof rps}`[][]) overall_score.push(rps[user] + rps[opp] === rps[user] ? 3 : (rps[opp] === 2 || rps[user] === 2 ? (rps[opp] > rps[user] ? 0 : 6) : (rps[opp] > rps[user] ? 6 : 0)));
    return overall_score.reduce((acc, value) => acc + value); // Add the values (numbers) in array to get the overall total score
};

console.log(decrypt(input));
/* --------------------------------------------- [END OF PART 1] --------------------------------------------- */
