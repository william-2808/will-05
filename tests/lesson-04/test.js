let health = 65;
let lives = 3;
let status = "";

if (health > 80) {
    status = "Mario is strong!";
} else if (health >= 50) {
    status = "Mario is okay!";
} else if (health >= 20) {
    status = "Mario is weak!";
} else if (health > 0) {
    status = "Mario is in danger!";
} else if (health <= 0 && lives > 0) {
    status = "Mario lost a life!";
} else {
    status = "Game Over!";
}

console.log(status);