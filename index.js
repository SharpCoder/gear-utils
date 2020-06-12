/* Math modules */
/* *********************** */
const in_to_mm = 25.4;
const calc_module = (P) => in_to_mm / P;
const calc_addendum = (P) => (1 / P) * in_to_mm;
const calc_dedendum = (P) => (1.25 / P) * in_to_mm;
const calc_dp = (N, P, extra_padding = 0) => extra_padding + (N / P) * in_to_mm;
const calc_db = (N, P, pa, extra_padding = 0) => calc_dp(N, P, extra_padding) * Math.cos(pa);
const calc_dr = (N, P) => calc_dp(N, P) - 2 * calc_dedendum(P);
const calc_circular_pitch = (P) => (PI / P) * in_to_mm;
const calc_thickness = (P) => (1.5708 / P) * in_to_mm;
const calc_alpha = (dp, db, pa) => ((sqrt(pow(dp, 2) - pow(db, 2)) / db) * rad_to_deg - pa);
const calc_beta = (N, alpha) => ((360 / (4 * N)) - alpha) * 2;
const calc_clearance = (P) => calc_dedendum(P) - calc_addendum(P);
const calc_center_distance = (N1, N2, P) => in_to_mm * (N1 + N2) / (2 * P);
const calc_internal_center_distance = (N1, N2, P) => in_to_mm * (N2 - N1) / (2 * P);
/* *********************** */

function round(number) {
    return Math.round(number * 100) / 100;
}

function onLoad() {
    const extraPadding = 0.3;

    const $output = document.querySelector('#output');
    const $P = document.querySelector('#P');
    const $pa = document.querySelector('#pa');
    const $N1 = document.querySelector('#N1');
    const $N2 = document.querySelector('#N2');
    const $submit = document.querySelector('#submit');

    $submit.onclick = () => {
        const n1 = parseFloat($N1.value);
        const n2 = parseFloat($N2.value);
        const P = parseFloat($P.value);
        const pa = parseFloat($pa.value);

        const n1_dp = calc_dp(n1, P, extraPadding);
        const n1_a = calc_addendum(P);
        const n2_dp = calc_dp(n2, P, extraPadding);
        const n2_a = calc_addendum(P);

        const n1_size = n1_dp + 2 * n1_a;
        const n2_size = n2_dp + 2 * n2_a;

        let text = `
            <div class='result-line'>Diametral Pitch: <b>${P}</b></div>
            <div class='result-line'>Pressure Angle: <b>${pa}&deg;</b></div>
            <div class='result-line'>N1: <b>${n1} @ <${round(n1_size)}mm></b></div>
            <div class='result-line'>N2: <b>${n2} @ <${round(n2_size)}mm></b></div>
            <div id='calcs'>
            dist: <b>${round(calc_center_distance(n1, n2, P))}mm</b><br/>
            </div>
        `;

        $output.innerHTML = text;
    }
}