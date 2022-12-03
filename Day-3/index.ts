const input = (await (await import('fs/promises')).readFile('input.txt', { encoding: 'utf-8' })).split(/\r\n/g);

/* ---------------------------------- [START OF PART 1: ~ Average of 2.4ms ~] ---------------------------------- */

console.time('start');
console.debug(sum(similarity(splitter(input))));
console.timeEnd('start');

/* --------------------------- [END OF PART 1 & START OF PART 2] --------------------------- */

console.time('start');
console.debug(sum(similarity(splitter(input, 3))));
console.timeEnd('start');

/* ------------------------------------ [END OF PART 2] ------------------------------------ */

function splitter(arr: string[], chunks?: number): string[][]{ return chunks ? arr.reduce((acc, value, index) => {const diff = Math.floor(index/chunks); if (!acc[diff]) acc[diff] = [];acc[diff].push(value); return acc}, [] as string[][]) : arr.map(values => values.split(new RegExp(`(\\w{${values.length/2}})`, 'g')).filter(elements => elements !== '')) };

function similarity<K extends ReturnType<typeof splitter>>(elf_groups: K): typeof elf_groups[number]{
    const common_letters: typeof elf_groups[number] = [];

    for (const rucksacks of elf_groups)
    if (rucksacks.length === 2){ // Part 1
        const [str1, str2] = rucksacks; // (str1) - first index && (str2) second index
        for (const char of str1.split(/(?=\w)/g)) // split first index string into an array of characters
        if (str2.split(/(?=\w)/g).includes(char)){common_letters.push(char); break}; // also split second index string into array of characters then check for first string character and push it to array

    } else { // Part 2
        const [str1, str2, str3] = rucksacks; // same as previous but introducing third index string
        for (const char of str1.split(/(?=\w)/g)) // same as previous
        if (str2.split(/(?=\w)/g).includes(char) && str3.split(/(?=\w)/g).includes(char)){common_letters.push(char); break}; // same as previous
    };

    return common_letters;
};

function sum<J extends ReturnType<typeof similarity>>(arr_letters: J): number{ return arr_letters.map((strs) => (/[a-z]/g).test(strs) ? strs.charCodeAt(0) - 96 : strs.charCodeAt(0) - 38).reduce((acc, val) => acc + val) };
