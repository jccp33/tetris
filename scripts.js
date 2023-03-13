"use strict";

class TriminoI {
    constructor(){
        this.letter = "I";
        this.color = "blue";
        this.x = 2;
        this.y = 0;
        this.area = [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ];
    }
}

class TriminoL {
    constructor(){
        this.letter = "L";
        this.color = "green";
        this.x = 4;
        this.y = 0;
        this.area = [
            [1, 0, 0],
            [1, 0, 0],
            [1, 1, 0]
        ];
    }
}

class TriminoJ {
    constructor(){
        this.letter = "J";
        this.color = "purple";
        this.x = 4;
        this.y = 0;
        this.area = [
            [0, 0, 1],
            [0, 0, 1],
            [0, 1, 1]
        ];
    }
}

class TriminoO {
    constructor(){
        this.letter = "O";
        this.color = "red";
        this.x = 4;
        this.y = 0;
        this.area = [
            [1, 1],
            [1, 1]
        ];
    }
}

class TriminoS {
    constructor(){
        this.letter = "S";
        this.color = "brown";
        this.x = 4;
        this.y = 0;
        this.area = [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
        ];
    }
}

class TriminoT {
    constructor(){
        this.letter = "T";
        this.color = "gray";
        this.x = 4;
        this.y = 0;
        this.area = [
            [1, 1, 1],
            [0, 1, 0],
            [0, 0, 0],
        ];
    }
}

class TriminoZ {
    constructor(){
        this.letter = "Z";
        this.color = "yellow";
        this.x = 4;
        this.y = 0;
        this.area = [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0],
        ];
    }
}

const SET_CLASS_TRIMINO = () => {
    let chars = "ILJOSTZ";
    let char = chars.charAt(Math.floor(Math.random() * chars.length));
    if(char === 'I'){
        TRIMINO = new TriminoI;
    }else if(char === 'L'){
        TRIMINO = new TriminoL;
    }else if(char === 'J'){
        TRIMINO = new TriminoJ;
    }else if(char === 'O'){
        TRIMINO = new TriminoO;
    }else if(char === 'S'){
        TRIMINO = new TriminoS;
    }else if(char === 'T'){
        TRIMINO = new TriminoT;
    }else if(char === 'Z'){
        TRIMINO = new TriminoZ;
    }else{
        TRIMINO = new TriminoT;
    }
}

const DRAW_BOARD = () => {
    for(let r=0; r<ROWS; r++){
        for(let c=0; c<COLS; c++){
            let celdId = `celd-${c}-${r}`;
            let color = 'black';
            FULL_CELLS.forEach(cell => {
                let id = cell.split('-')[0] + '-' + cell.split('-')[1];
                if(celdId.includes(id)){
                    color = cell.split('-')[2];
                }
            });
            document.getElementById(celdId).style.backgroundColor = color;
            document.getElementById(celdId).style.color = 'white';
        }
    }
}

const CHECK_LINES = () => {
    FULL_CELLS.forEach(full => {
        let _y = parseInt(full.split('-')[1]);
        let count = FULL_CELLS.filter((o) => o.includes(`-${_y}-`)).length;
        if(count === 10){
            SCORE++;
            if(INTERVAL_TIME > 0) INTERVAL_TIME = INTERVAL_TIME - 100;
            console.log(SCORE, INTERVAL_TIME);
            let pGemeScore = document.getElementById('p-game-score');
            let labelGemeScore = document.getElementById('label-game-score');
            pGemeScore.innerHTML = "Score: " + SCORE;
            labelGemeScore.innerHTML = "Score: " + SCORE;
            
            let presents = FULL_CELLS.filter(f => f.includes(`-${_y}-`));
            presents.forEach(p => {
                FULL_CELLS.splice(FULL_CELLS.indexOf(p), 1);
            });
            for(let i=0; i<FULL_CELLS.length; i++){
                let full = FULL_CELLS[i];
                let x = full.split('-')[0];
                let y = parseInt(full.split('-')[1]);
                let c = full.split('-')[2];
                if(y < _y){
                    let str = x + '-' + (y+1) + '-' + c;
                    FULL_CELLS[i] = str;
                }
            }
        }
    });
}

const DRAW = (matrix, initX, initY, color) => {
    DRAW_BOARD();
    CHECK_LINES();
    for(let y=0; y<matrix.length; y++){
        for(let x=0; x<matrix[0].length; x++){
            let celdId = `celd-${initX+x}-${initY+y}`;
            let cell = document.getElementById(celdId)
            if(cell!=null && cell!=undefined){
                if(matrix[y][x]===1){
                    cell.style.backgroundColor = color;
                }
            }
        }
    }
}

const ROTATE = (matrix) => {
    for(let i=0; i<matrix.length; i++) {
        for(let j=i; j<matrix[0].length; j++) {
            let temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        matrix[i].reverse();
    }
}

const LEFT_COLLISION = (trimino) => {
    let area = trimino.area;
    for(let i=0; i<area.length; i++){
        for(let j=0; j<area[i].length; j++){
            let x = trimino.x + j;
            let y = trimino.y + i;
            if(area[i][j] === 1){
                let fullCeld = (x-1) + '-' + y;
                let filled = false;
                FULL_CELLS.forEach(item => {
                    let it = item.split('-')[0] + '-' + item.split('-')[1];
                    if(it === fullCeld){
                        filled = true;
                    }
                });
                if(x===0 || filled){
                    return false;
                }
            }
        }
    }
    return true;
}

const RIGHT_COLLISION = (trimino) => {
    let area = trimino.area;
    for(let i=0; i<area.length; i++){
        for(let j=0; j<area[i].length; j++){
            let x = trimino.x + j;
            let y = trimino.y + i;
            if(area[i][j] === 1){
                let fullCeld = (x+1) + '-' + y;
                let filled = false;
                FULL_CELLS.forEach(item => {
                    let it = item.split('-')[0] + '-' + item.split('-')[1];
                    if(it === fullCeld){
                        filled = true;
                    }
                });
                if(x===9 || filled){
                    return false;
                }
            }
        }
    }
    return true;
}

const BOTTOM_COLLISION = (trimino) =>{
    let area = trimino.area;
    for(let i=0; i<area.length; i++){
        let collision = false;
        for(let j=0; j<area[i].length; j++){
            let x = trimino.x + j;
            let y = trimino.y + i + 1;
            if(area[i][j] === 1){
                let fullCeld = x + '-' + (y+1);
                let filled = false;
                FULL_CELLS.forEach(item => {
                    let it = item.split('-')[0] + '-' + item.split('-')[1];
                    if(it === fullCeld){
                        filled = true;
                        return;
                    }
                });
                if(y+1===ROWS || filled){
                    collision = true;
                    for(let k=0; k<area.length; k++) {
                        for(let l=0; l<area[k].length; l++) {
                            if(area[k][l] === 1){
                                let _x = trimino.x + l;
                                let _y = trimino.y + k + 1;
                                fullCeld = _x + '-' + _y + '-' + trimino.color;
                                if(!FULL_CELLS.includes(fullCeld)){
                                    FULL_CELLS.push(fullCeld);
                                }
                            }
                        }
                    }
                    break;
                }
            }
        }
        if(collision){
            SET_CLASS_TRIMINO(TRIMINO);
            TRIMINO.y = -1;
        }
    }
}

const TOP_COLLISION = (trimino) => {
    FULL_CELLS.forEach(item => {
        let y = item.split('-')[1];
        if(y === '1'){
            clearInterval(INTERVAL_GAME);
            SHOW_RESULT();
        }
    });
}

const SHOW_RESULT = () => {
    document.getElementById('div-modal-result').style.display = 'block';
}

const BTN_UP = () => {
    if(LEFT_COLLISION(TRIMINO) && RIGHT_COLLISION(TRIMINO)){
        ROTATE(TRIMINO.area);
        DRAW(TRIMINO.area, TRIMINO.x, TRIMINO.y, TRIMINO.color);
    }
}

const BTN_DOWN = () => {
    BOTTOM_COLLISION(TRIMINO);
    TRIMINO.y++;
    DRAW(TRIMINO.area, TRIMINO.x, TRIMINO.y, TRIMINO.color);
}

const BTN_LEFT = () => {
    if(LEFT_COLLISION(TRIMINO)){
        TRIMINO.x--;
        DRAW(TRIMINO.area, TRIMINO.x, TRIMINO.y, TRIMINO.color);
    }
}

const BTN_RIGHT = () => {
    if(RIGHT_COLLISION(TRIMINO)){
        TRIMINO.x++;
        DRAW(TRIMINO.area, TRIMINO.x, TRIMINO.y, TRIMINO.color);
    }
}

const ROWS = 20;
const COLS = 10;
const BOARD = document.getElementById('board');
let INTERVAL_TIME = 1000;
let INTERVAL_GAME;

let FULL_CELLS = [];
let TRIMINO;
let SCORE = 0;

function StartGame(){
    SET_CLASS_TRIMINO(TRIMINO);
    DRAW(TRIMINO.area, TRIMINO.x, TRIMINO.y, TRIMINO.color);

    document.body.addEventListener('keydown', (event)=>{
        if (event.code === 'ArrowUp') {
            event.preventDefault();
            if(LEFT_COLLISION(TRIMINO) && RIGHT_COLLISION(TRIMINO)){
                ROTATE(TRIMINO.area);
                DRAW(TRIMINO.area, TRIMINO.x, TRIMINO.y, TRIMINO.color);
            }
        }else if (event.code === 'ArrowDown') {
            event.preventDefault();
            BOTTOM_COLLISION(TRIMINO);
            TRIMINO.y++;
            DRAW(TRIMINO.area, TRIMINO.x, TRIMINO.y, TRIMINO.color);
        }else if (event.code === 'ArrowLeft') {
            event.preventDefault();
            if(LEFT_COLLISION(TRIMINO)){
                TRIMINO.x--;
                DRAW(TRIMINO.area, TRIMINO.x, TRIMINO.y, TRIMINO.color);
            }
        }else if (event.code === 'ArrowRight') {
            event.preventDefault();
            if(RIGHT_COLLISION(TRIMINO)){
                TRIMINO.x++;
                DRAW(TRIMINO.area, TRIMINO.x, TRIMINO.y, TRIMINO.color);
            }
        }
    });

    INTERVAL_GAME = setInterval(() => {
        TOP_COLLISION(TRIMINO);
        BOTTOM_COLLISION(TRIMINO);
        TRIMINO.y++;
        DRAW(TRIMINO.area, TRIMINO.x, TRIMINO.y, TRIMINO.color);
    }, INTERVAL_TIME);
}

window.addEventListener('load', ()=>{
    for(let r=0; r<ROWS; r++){
        let row = document.createElement('div');
        row.classList.add('row');
        for(let c=0; c<COLS; c++){
            let celd = document.createElement('div');
            celd.classList.add('celd');
            celd.id = `celd-${c}-${r}`;
            //celd.innerText = `${c}-${r}`;
            celd.style.backgroundColor = 'black';
            celd.style.color = 'black';
            row.appendChild(celd);
        }
        BOARD.appendChild(row);
    }

    document.getElementById('btn-start-pause').addEventListener('click', ()=>{
        document.getElementById('btn-start-pause').disabled = true;
        StartGame();
    });
});
