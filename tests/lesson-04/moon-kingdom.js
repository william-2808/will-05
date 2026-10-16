const characters = [
        {name: "William", battleIQ: 85, strength: 98, fast: 98, defend: 90, special: 100, iq: 42},
        {name: "Odd", battleIQ: 89, strength: 86, fast: 84, defend: 95, special: 86, iq: 78},
        {name: "Yumi", battleIQ: 99, strength: 94, fast: 89, defend: 86, special: 100, iq: 92},
        {name: "Ulrich", battleIQ: 97, strength: 93, fast: 94, defend: 89, special: 98, iq: 88},
        {name: "Alita", battleIQ: 81, strength: 75, fast: 77, defend: 100, special: 100, iq: 100},
];

const averages = characters.map(character => {
    return {
        name: character.name,
        average:
            (character.battleIQ +
            character.strength +
            character.fast +
            character.defend +
            character.special +
            character.iq) / 6
    };
});

console.log(averages);
