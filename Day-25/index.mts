enum translate_snafu {'=' = -2, '-' = -1};
const data = (await (await import('fs/promises')).readFile('input.txt', {encoding: 'utf-8'})).split(/\r\n/); // input given by the elves
const decimal_result = data.map(val => {
    const result: number[] = [], reversed_val = val.split("").reverse(); // reversing the SNAFU-notation value
    for (const inx in reversed_val) result.push((!isNaN(Number(reversed_val[inx])) ? parseInt(reversed_val[inx]) : translate_snafu[reversed_val[inx] as keyof typeof translate_snafu]) * Math.pow(5, parseInt(inx))); // converting the SNAFU(a.k.a Base-5)-notation to Decimal(Base-10)-notation
    return result.reduce((acc, curr) => acc + curr);
}).reduce((acc, curr) => acc + curr); // returns all added Decimal-notation values in the "result" array

void function snafulize(decimal: number, remainder?: number, temp_store: string[] = []): void{
    remainder = decimal % 5;
    decimal = Math.round(decimal / 5);
    temp_store.unshift(/[^0-2]/g.test(remainder.toString()) ? translate_snafu[remainder - 5] : remainder.toString()); // checks if the current character of the string is not 0, 1 or 2 ? then convert it to SNAFU by deducting by 5 and retrieve the SNAFU character from the object : otherwise just return it as a string

    if (decimal <= 0) return console.debug(temp_store.join(""));

    snafulize(decimal, remainder, temp_store);
}(decimal_result);
