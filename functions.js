export function p(s, k) {
    const body = document.body;
    body.innerText += "\n" + s + (k && "\n" + k.repeat(10) || "");
}

export function howMuchLetter(astr, what) {
    let count = 0;
    astr = astr.toUpperCase();
    what = what.toUpperCase();
    for (const pos in astr) {
        //if (astr.toUpperCase().charAt(pos) === what.toUpperCase()) count++;
        if (astr.charAt(pos) === what) count++;
    }
    return count;
}

export function howMuchWords(str) {
    if (!str) throw "howMuchWords error: Nie podano stringa!";
    str = deleteDoubleLetter(str, "!!", "!");
    const temp = str.split("!");
    return temp.length;
}

export function deleteDoubleLetter(str, del, ch) {
    while (str.indexOf(del) > -1) str = str.replaceAll(del, ch);
    return str;
}