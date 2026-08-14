const playerName = "Mario";
const currentLives = 3;

function tinhCoin(lv1, lv2, lv3) {
    const tongCoin = lv1 + lv2 + lv3;
    const tbCoin = tongCoin / 3;
    const coinDu = tongCoin % 3;
    

    console.log(`Tong coin cua 3 level ${lv1} + ${lv2} + ${lv3} la: ${tongCoin}`);
    console.log(`Trung binh coin la: ${tbCoin}`);
    console.log(`So coin du la: ${coinDu}`);

}

tinhCoin(25, 30, 45);