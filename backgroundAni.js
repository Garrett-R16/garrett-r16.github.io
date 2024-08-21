//This code is a website implementation of a marching squares algorithim made by @TheCodingTrain, with a few minor tweaks (tutorial: https://thecodingtrain.com/challenges/c5-marching-squares)
//Thank you for the great guide on what this algorithim is!

let rez;
let field = [];
let cols, rows;
let increment= .1;
let noise;
let zoff = 0;
let w;
let h;

function setup() {
    setResolution();
    createCanvas(w, h, P2D);
    createField();
    noise = new OpenSimplexNoise();
    frameRate(15);
}

function setResolution() {
    w = document.documentElement.clientWidth;
    h = document.documentElement.clientHeight*0.7;
    if (w > 1200) {
        rez = 20;
    } else if (w > 400) {
        rez = w/60
    } else {
        rez=8;
    }
}

function createField() {
    cols = 1 + width/rez;
    rows = 1 + height/rez;
    for (let i = 0; i < cols; i++) {
        let column = [];
        for(let j = 0; j < rows; j++) {
            column.push(0);
        }
        field.push(column);
    }
}

function drawLine(v1, v2) {
    line(v1.x, v1.y, v2.x, v2.y);
}

window.onresize = () => {
    setResolution();
    resizeCanvas(w, h, P2D);
    createField();
}

function draw() {
    background('#0E110F');
    strokeWeight(2);
    stroke('#5F5F5F');
    let xoff = 0;
    for (let i = 0; i < cols; i++) {
        xoff+=increment;
        let yoff = 0;
        for(let j = 0; j < rows; j++) {
            field[i][j] = float(noise.noise3D(xoff, yoff, zoff))
            yoff+=increment;
        }
    }

    zoff += .0015;
    
    for (let i = 0; i < cols-1; i++) {
        for(let j = 0; j < rows-1; j++) {
        let x = i*rez;
        let y = j*rez;

        let state = getState(ceil(field[i][j]), ceil(field[i+1][j]), ceil(field[i+1][j+1]), ceil(field[i][j+1]));

        let a_val = field[i][j] + 1;
        let b_val = field[i+1][j] + 1;
        let c_val = field[i+1][j+1] + 1;
        let d_val = field[i][j+1] + 1;
        
        let a = createVector();
        let amt = (1 - a_val) / (b_val - a_val);
        a.x = lerp(x, x + rez, amt);
        a.y = y;

        let b = createVector();
        amt = (1 - b_val) / (c_val - b_val);
        b.x = x + rez;
        b.y = lerp(y, y + rez, amt);

        let c = createVector();
        amt = (1 - d_val) / (c_val - d_val);
        c.x = lerp(x, x + rez, amt);
        c.y = y + rez;

        let d = createVector();
        amt = (1 - a_val) / (d_val - a_val);
        d.x = x;
        d.y = lerp(y, y + rez, amt);
        //opt 2: 909090
        
        switch (state) {
            case 1:
                drawLine(c, d);
                break;
            case 2:
                drawLine(b, c);
                break;
            case 3:
                drawLine(b, d);
                break;
            case 4:
                drawLine(a, b);
                break;
            case 5:
                drawLine(a, d);
                drawLine(b, c);
                break;
            case 6:
                drawLine(a, c);
                break;
            case 7:
                drawLine(a, d);
                break;
            case 8:
                drawLine(a, d);
                break;
            case 9:
                drawLine(a, c);
                break;
            case 10:
                drawLine(a, b);
                drawLine(c, d);
                break;
            case 11:
                drawLine(a, b);
                break;
            case 12:
                drawLine(b, d);
                break;
            case 13:
                drawLine(b, c);
                break;
            case 14:
                drawLine(c, d);
                break;
            }
        }
    }
}

function getState(a, b, c, d) {
    return a*8+b*4+c*2+d*1;
}