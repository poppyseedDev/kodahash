# koda(hash) template

Template for testing generative art that can be minted [KodaDot](https://kodadot.xyz/)

## Collection: 0x175adf5fc05 Snowflakes

**Description:**
Title: "Fractal Quest"

Chapter 1: The Discovery
In a quaint 0x1a2b3c4d5e village, Eva 0x5f6e7d8c9b an ancient manuscript. It 0x9a8b7c6d5e drawings of unique 0xe5d4c3b2a1 snowflakes, each leading 0x0f1e2d3c4b different dimensions.

Chapter 2: The Journey
Eva deciphers a 0x7c8b9aadb5, transporting her to 0x3c2b1a0918 fractal dimension. Here, 0x9b8a7c6d5e laws of reality 0x1a0b1c2d3e different.

Chapter 3: The Guardians
In her journey, 0xe4d5c6b7a8 meets guardians of 0x5c4d3e2f1g these realms. They 0x7a8b9cadae the balance of 0x1c2b3a4958 is disrupted.

Chapter 4: Restoring Balance
Eva, with her 0x4e5f6g7h8i in mathematics, solves 0x2a1b3c4d5e fractal puzzles, restoring 0x8f7e6d5c4b to the dimensions.

Epilogue: Legacy
Returning home, Eva 0x3b4c5d6e7f her knowledge, preserving 0x9f8e7d6c5b beauty of the 0x2d3c4b5a6b snowflakes and their 0x4e5f6g7h8i secrets.

## Preface

This template is a good starter for testing generative art that can be minted on [KodaDot](https://kodadot.xyz/). It uses [Nitro](https://nitro.unjs.io/) as a framework and [p5.js](https://p5js.org/) for drawing.

Structure of the template:
- `public/index.html` - main HTML file
- `public/script.js` - script that generates the generative art, ideally just pasted from [p5.js editor](https://editor.p5js.org/) 
- `public/style.css` - style for the HTML file

### Prerequisites

- [Node.js](https://nodejs.org/en/) >= 18.0.0

### Development Server

Start the development server on <http://localhost:3000>

```bash
npx nitropack dev
```

In case you want to see it on your mobile phone

```bash
npx nitropack dev --host
```

### Good to know

**KodaDot uses url param called hash to generate the image.**

`http://localhost:3000/?hash=0x175adf5fc058830a6319b8238ecc911db6e1b8dd40965629b5f0c5bee655598c` 

*the length of the hash is 66 characters (0x + 64 characters).*

To get the hash from url to your script use:

```js
const DEFAULT_HASH = '0x175adf5fc058830a6319b8238ecc911db6e1b8dd40965629b5f0c5bee655598c'
const params = getURLParams();

hash = params.hash || DEFAULT_HASH;
console.log(hash);
```

> Note: If you want do not supply hash in url, it will use default hash.

**To ensure correct view of the art on KodaDot**

Try to use canvas size that is automatically set to 1:1 ratio. 

This will ensure that the art will be displayed correctly on KodaDot.

On the snippet below you can see how to set canvas size to 1:1 ratio.
It will use smaller dimension of the screen (either width or height) as a canvas size.

```js
canvasSize = windowWidth < windowHeight ? windowWidth : windowHeight

createCanvas(canvasSize, canvasSize);
```

**Testing variability of the art**

To ensure that the art is not always the same, you can use the hashes from `hash.txt` file.

> Make sure that same hash will always generate the same art.

