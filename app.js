
    // Create Dino Constructor
   function Animals(species, weight, height, diet, where, when, fact){
       this.species = species;
       this.weight = weight;
       this.height = height;
       this.diet = diet;
       this.where = where;
       this.when = when;
       this.fact = fact;
       this.image = `images/${species.toLowerCase()}.png`;
   }
    // Create Dino Objects
   
    let dinoArray = [];
    function Dinosaur(species, weight, height, diet, where, when, fact) {
        Animals.call(this, species, weight, height, diet, where, when, fact); // Calls Animal function with current this value i.e Dinosaur here 
    }
    Dinosaur.prototype = Object.create(Animals.prototype); // creates a new Animals object and copies the prototype to Dinosaur Prototype
    Dinosaur.prototype.constructor = Dinosaur;
    
    fetch('dino.json')
    .then( res => res.json())
    .then( res => dinoArray = res.Dinos.map( d => new Dinosaur(d.species,d.weight,d.height,d.diet, d.where, d.when, d.fact)));


    // Create Human Object

    function Human(name, height, weight, diet){
        Animals.call(this,"human",weight,height,diet,'earth',new Date().getDay,`Hello There, I am human, known as ${name}`);
        this.name = name;
    }
    Human.prototype = Object.create(Animals.prototype); // creates a new Animals object and copies the prototype to Dinosaur Prototype
    Human.prototype.constructor = Human;

    // Use IIFE to get human data from form
    // On button click, prepare and display infographic
    document.getElementById('btn').addEventListener( 'click', () => {
        const newHuman = (function(){
            let name = document.getElementById('name').value;
            let feet = document.getElementById('feet').value;
            let inches = document.getElementById('inches').value;
            let weight = document.getElementById('weight').value;
            let diet = document.getElementById('diet').value;

            return new Human(name, feet * 12 + inches, weight, diet);
        })();
        console.log(newHuman);
        // Remove form from screen
    
        document.getElementById('dino-compare').style.display = 'none';

       /* dinoArray.forEach(dino => {
            compareHeight(dino,human.height);
            dino.compareName(human.name);
            dino.compareWeight(human.weight);
        }); */

    })

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    const compareHeight = () => {

    }
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM


