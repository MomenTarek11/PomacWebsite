export function hexToRgb(hexCode: any, opacity: number) {
    let h = hexCode.replace('#', '');
    h =  h.match(new RegExp('(.{' + h.length / 3 + '})', 'g'));
    for (let i = 0;  i < h.length; i++) {
        h[i] = parseInt(h[i].length === 1 ? h[i] + h[i] : h[i], 16);
    }
    if (typeof opacity !== 'undefined') { h.push(opacity); }
    return 'rgba(' + h.join(',') + ')';
}