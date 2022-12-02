const input = (await(await import('fs/promises')).readFile('input.txt', {encoding: 'utf-8'})).replace(/\s/g, ''); // Input from the elves :)
const rps = {
    A: 1, // Rock
    B: 2, // Paper
    C: 3, // Scissors
    X: 1, // Rock
    Y: 2, // Paper
    Z: 3 // Scissors
} as const; // A - C are opponent's values && X - Z are user's values

/* --------------------------------------------- [START OF PART 1] --------------------------------------------- */

function decrypt(elfText: string){
    const overall_score: number[] = [];
    for (const [opponent, user] of (elfText.split(/(\w{2})/g).filter(str => str !== '').map(values => values.split(/(\w)/g).filter(str => str !== '')) as unknown) as `${keyof typeof rps}`[][]) overall_score.push(rps[user] + rps[opponent] === rps[user] ? 3 : (rps[opponent] === 2 || rps[user] === 2 ? (rps[opponent] > rps[user] ? 0 : 6) : (rps[opponent] > rps[user] ? 6 : 0)));
    return overall_score.reduce((acc, value) => acc + value); // Add the values (numbers) in array to get the overall total score
};

const startTime = performance.now();
console.debug(`Total: ${decrypt(input)}`);
const endTime = performance.now();
console.debug(`Execution Time: ${Math.floor(endTime - startTime)}ms`);

/* --------------------------------------------- [END OF PART 1 && START OF PART 2] --------------------------------------------- */
