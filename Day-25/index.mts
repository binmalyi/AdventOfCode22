enum translate_snafu {'=' = -2, '-' = -1};
const data = (await (await import('fs/promises')).readFile('input.txt', {encoding: 'utf-8'})).split(/\r\n/);
const decimal_result = data.map(val => {
    const result: number[] = [], reversed_val = val.split("").reverse();
    for (const inx in reversed_val) result.push((!isNaN(Number(reversed_val[inx])) ? parseInt(reversed_val[inx]) : translate_snafu[reversed_val[inx] as keyof typeof translate_snafu]) * Math.pow(5, parseInt(inx)));
    return result.reduce((acc, curr) => acc + curr);
}).reduce((acc, curr) => acc + curr);

void function snafulize(decimal: number, remainder?: number, temp_store: string[] = []): void{
    remainder = decimal % 5;
    decimal = Math.round(decimal / 5);
    temp_store.unshift(/[^0-2]/g.test(remainder.toString()) ? translate_snafu[remainder - 5] : remainder.toString());

    if (decimal <= 0) return console.debug(temp_store.join(""));

    snafulize(decimal, remainder, temp_store);
}(decimal_result);
