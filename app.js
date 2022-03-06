// Create Dino Constructor
function Animals(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = [fact];
    this.image = `images/${species.toLowerCase().replace(/ /g, "")}.png`;
}

Animals.prototype.addFact = function (fact) {
    this.fact.push(fact);
}

// Create Dino Objects

let dinoArray = [];

function Dinosaur(species, weight, height, diet, where, when, fact) {
    Animals.call(this, species, weight, height, diet, where, when, fact); // Calls Animal function with current this value i.e Dinosaur here 
}
Dinosaur.prototype = Object.create(Animals.prototype); // creates a new Animals object and copies the prototype to Dinosaur Prototype
Dinosaur.prototype.constructor = Dinosaur;

fetch('dino.json')
    .then(res => res.json())
    .then(res => dinoArray = res.Dinos.map(d => new Dinosaur(d.species, d.weight, d.height, d.diet, d.where, d.when, d.fact)));


// Create Human Object

function Human(name, height, weight, diet,fact) {
    Animals.call(this, "human", weight, height, diet, 'earth', new Date().getDay, `Hello There, I am human, known as ${name}`);
    this.name = name;
}
Human.prototype = Object.create(Animals.prototype); // creates a new Animals object and copies the prototype to Dinosaur Prototype
Human.prototype.constructor = Human;

// Use IIFE to get human data from form
// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click', () => {
    const newHuman = (function () {
        let name = document.getElementById('name').value;
        let feet = document.getElementById('feet').value;
        let inches = document.getElementById('inches').value;
        let weight = document.getElementById('weight').value;
        let diet = document.getElementById('diet').value;
        let fact = document.getElementById('fact').value;

        return new Human(name, feet * 12 + inches, weight, diet,fact);
    })();
    console.log(newHuman);

    // Remove form from screen
    document.getElementById('dino-compare').style.display = 'none';

    dinoArray.forEach(dino => {
        compareHeight(dino, newHuman.height);
        compareDiet(dino, newHuman.diet);
        compareWeight(dino, newHuman.weight);
        console.log(dino.fact.map( x => x));
    });

    //Creating Dino Tiles
    let Dom = dinoTiles(dinoArray);

    //Creating Human Tile
    let humanTile = `<div class="grid-item">
                        <h3>${newHuman.name}</h3>
                        <img src=${newHuman.image} alt=${newHuman.species}/>
                    <p class="fact">${newHuman.fact[0]}</fact>
                    </div>`;
    Dom.splice(4,0, humanTile);
    console.log(Dom);

    // Add tiles to DOM
    document.getElementById('grid').innerHTML = Dom.join('\n');
})

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
function compareHeight(dino, height) {
    let fact = `I am ${parseInt(dino.height/12)}'${dino.height%12} `;
    dino.addFact(fact);
    if(dino.height ===  height){
        fact = "We are the same height Bruh! 😎";
    } else if (dino.height < height) {
        fact = "Hooman, You're taller than me 😳";
    } else if (dino.height > height) {
        fact = "You're so tiny, Hooman 🙊";
    }
    dino.addFact(fact);
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareWeight(dino, weight) {
    let fact = `I weigh ${dino.weight} lbs.🙈`;
    dino.addFact(fact)
    if(dino.weight === weight){
        fact = "We weigh same Bruh! 🙌🏼";
    } else if (dino.weight < weight) {
        fact = "Hooman, You're heavier than me";
    } else if (dino.weight > weight) {
        fact = "I think I should go on diet🙁.";
    }
    dino.addFact(fact);
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareDiet(dino, diet){
    let fact = `I am ${dino.diet}, Hooman. What about you?`;
    dino.addFact(fact);
    if(dino.diet === diet){
        fact = `We both are ${diet} Buddy, Let's go for dinner sometimes😄`;
        dino.addFact(fact);
    } else if(diet === 'herbavor' && dino.diet === 'carnivor'){
        fact = `I don't eat Leaves, Mate. Sorry 🙁`
        dino.addFact(fact);
    }
}

// Generate Tiles for each Dino in Array
function dinoTile(dino){
    
    const randomIndex = dino.species === 'Pigeon' ? 0 : Math.floor(Math.random() * dino.fact.length);
    let fact = dino.fact[randomIndex];
    return`<div class="grid-item" id=${dino.species.toLowerCase().replace(/ /g, "")}>
                <h3>${dino.species}</h3>
                <img src=${dino.image} alt=${dino.species}/>
                <p class="fact">${fact}</fact>
         </div>`;
}

function dinoTiles(dinoArray){
    return dinoArray.map( dino => dinoTile(dino));
}

