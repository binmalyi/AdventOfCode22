const input = (await import('fs')).readFileSync('input.txt', {encoding: 'utf-8'}).replace(/\s/g, '')) // Input from the elves :)

function Day1Pt1(strategy: string){
    const overall_score: number[] = [];
    const rps = {
        A: 1,
        B: 2,
        C: 3,
        X: 1,
        Y: 2,
        Z: 3
    } as const;
    
    for (const [opp, user] of (strategy.split(/(\w{2})/g).filter(str => str !== '').map(values => values.split(/(\w)/g).filter(str => str !== '')) as unknown) as `${keyof typeof rps}`[][]) overall_score.push(rps[user] + rps[opp] === rps[user] ? 3 : (rps[opp] === 2 || rps[user] === 2 ? (rps[opp] > rps[user] ? 0 : 6) : (rps[opp] > rps[user] ? 6 : 0)));
    return overall_score.reduce((acc, value) => acc + value);
};

// Day1Pt1(input)
