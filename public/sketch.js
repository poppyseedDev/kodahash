const DEFAULT_HASH_1 = '0x175adf5fc058830a6319b8238ecc911db6e1b8dd40965629b5f0c5bee655598c'
const DEFAULT_HASH_2 = '0xa3b47cf8e159640f2b8acd89ef4c2d1a7b9e5d2c40172638c9d0e1fab1234567';
const DEFAULT_HASH = '0x1c2d3a4b5e6f79808765c4b3a29180e2d3c4b5a6e7f890121314151617181920';
const DEFAULT_HASH_4 = '0xffeeddccbbaa99887766554433221100aabbccddeeff00112233445566778899';
const DEFAULT_HASH_5 = '0x123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01';
const DEFAULT_HASH_6 = '0xdeadbeefcafebabe0123456789abcdef0123456789abcdef0123456789abcdef';

function getValueFromHash(hash, index, range) {
  return Math.floor(hashRandom(hash, index) * range);
}

function getThetaFromHash(hash) {
 const predefinedValues = [TWO_PI / 6, TWO_PI / 8, TWO_PI / 10];
 return predefinedValues[getValueFromHash(hash, 6, predefinedValues.length)];
}

function getGenerationsFromHash(hash) {
 // Get a value between 3 and 6
 return getValueFromHash(hash, 4, 4) + 2;
}

function getStrokeColorFromHash(hash) {
 // Generate RGB values based on different parts of the hash
 const r = Math.floor(hashRandom(hash, 4) * 150) + 100;
 const g = Math.floor(hashRandom(hash, 6) * 150) + 100;
 const b = Math.floor(hashRandom(hash, 8) * 150) + 100;
 return [r, g, b];
}

function hashRandom(hash, index) {
  // Simple hash-based pseudo-random number generator
  // 'index' ensures different values for different calls
  if (index < 0) {
    index = 0;
  }
  const char = hash.charCodeAt(index % hash.length);
  const seed = (char * (index + 1)) % 256;
  return seed / 255;
}


function windowResized() {
  canvasSize = windowWidth < windowHeight ? windowWidth : windowHeight

  resizeCanvas(canvasSize, canvasSize);
}


let ds;

function setup() {
  canvasSize = windowWidth < windowHeight ? windowWidth : windowHeight

  createCanvas(canvasSize, canvasSize);

  const params = getURLParams();

  hash = params.hash || DEFAULT_HASH;
  console.log(hashRandom(hash, 2));

  // Parameters that the user can modify
  let startLength = 460.0;
  let theta = getThetaFromHash(hash); // 6, 8, 10 
  let generations = getGenerationsFromHash(hash);
  let rules = {
    W: "YF++ZF----XF[-YF----WF]++",
    X: "+YF--ZF[---WF--XF]+",
    Y: "-WF++XF[+++YF++ZF]-",
    Z: "--YF++++WF[+ZF++++XF]--XF"
  };

  let newRules = randomizeRules(rules, hash);
  console.log(newRules);
  let repeats = 1; // Control for repeats in render()
  let bgColor = (0, 22, 21); // Background color
  let strokeColor = getStrokeColorFromHash(hash);

  ds = new PenroseLSystem(startLength, theta, generations, newRules, repeats, bgColor, strokeColor);
  ds.simulate(generations);
}

function draw() {
  background(ds.bgColor);
  ds.render();
}

function randomizeRules(rules, hash) {
  let symbols = ['F', '+', '-', 'X', 'Y', 'Z', 'W'];
  let modifiedRules = {};

  for (let key in rules) {
    let rule = rules[key];
    let newRule = '';

    for (let i = 0; i < rule.length; i++) {
      let currentChar = rule[i];
      
      // Use hash-based randomness
      if (currentChar !== '[' && currentChar !== ']') {
        if (hashRandom(hash, i) < 0.1) {
          newRule += symbols[Math.floor(hashRandom(hash, i + 1) * symbols.length)];
        } else {
          newRule += currentChar;
        }
      } else {
        newRule += currentChar;
      }
    }

    modifiedRules[key] = newRule;
  }

  return modifiedRules;
}


function PenroseLSystem(startLength, theta, generations, rules, repeats, bgColor, strokeColor) {
    this.steps = 0;
    this.axiom = "[X]++[X]++[X]++[X]++[X]";
    this.ruleW = rules.W;
    this.ruleX = rules.X;
    this.ruleY = rules.Y;
    this.ruleZ = rules.Z;
    this.startLength = startLength;
    this.theta = theta;
    this.generations = generations;
    this.repeats = repeats;
    this.bgColor = bgColor;
    this.strokeColor = strokeColor;
    this.reset();
}

PenroseLSystem.prototype.simulate = function (gen) {
  while (this.getAge() < gen) {
    this.iterate(this.production);
  }
}

PenroseLSystem.prototype.reset = function () {
    this.production = this.axiom;
    this.drawLength = this.startLength;
    this.generations = 0;
  }

PenroseLSystem.prototype.getAge = function () {
    return this.generations;
  }

//apply substitution rules to create new iteration of production string
PenroseLSystem.prototype.iterate = function() {
    let newProduction = "";

    for(let i=0; i < this.production.length; ++i) {
      let step = this.production.charAt(i);
      //if current character is 'W', replace current character
      //by corresponding rule
      if (step == 'W') {
        newProduction = newProduction + this.ruleW;
      }
      else if (step == 'X') {
        newProduction = newProduction + this.ruleX;
      }
      else if (step == 'Y') {
        newProduction = newProduction + this.ruleY;
      }
      else if (step == 'Z') {
        newProduction = newProduction + this.ruleZ;
      }
      else {
        //drop all 'F' characters, don't touch other
        //characters (i.e. '+', '-', '[', ']'
        if (step != 'F') {
          newProduction = newProduction + step;
        }
      }
    }

    this.drawLength = this.drawLength * 0.5;
    this.generations++;
    this.production = newProduction;
}

//convert production string to a turtle graphic
PenroseLSystem.prototype.render = function () {
    translate(width / 2, height / 2);
    this.steps += 200;
    if(this.steps > this.production.length) {
      this.steps = this.production.length;
    }

    for(let i = 0; i < this.steps; ++i) {
      let step = this.production.charAt(i);
      if( step == 'F') {
        stroke(this.strokeColor[0], this.strokeColor[1], this.strokeColor[2]);
        for(let j = 0; j < this.repeats; j++) {
          line(0, 0, 0, -this.drawLength);
          noFill();
          translate(0, -this.drawLength);
        }
        this.repeats = 1;
      }
      else if (step == '+') {
        rotate(this.theta);
      }
      else if (step == '-') {
        rotate(-this.theta);
      }
      else if (step == '[') {
        push();
      }
      else if (step == ']') {
        pop();
      }
    }
  }
