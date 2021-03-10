const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let isOver = false;
let win = false;
let isFellOut = false;
let hitHole = false;

class Field {
  constructor(field) {
    this.field = field;
  };
  print() {
    for(let i = 0; i < this.field.length; i++) {
        console.log(this.field[i].join(''));
    }
  };

  startGame() {
      console.log("Hat seeking game will start soon!\n^ stands for hat that required to be found\n* represents for your\nO is the hole that could swallow you!\nPlease enter W,A,S,D to move");
  };

  endGame() {
      if(win) {
          console.log("You obtained the hat successfully");
      } else {
          console.log("You hit the hole or fell out!");
      }
  }

 
  playGame() {
      this.startGame();
      let i = 0;
      let j = 0;

      while(!isOver) {
        this.print();
        const dir = prompt('which way? ');
        switch (dir) {
            case 'w':
                if(this.field[i-1][j] === fieldCharacter){
                    i--;
                    this.field[i][j] = pathCharacter;
                    break;                    
                } else {
                    i--;
                    isOver = true;
                    break;
                }
                

            case 's':
                if(this.field[i+1][j] === fieldCharacter){
                    i++
                    this.field[i][j] = pathCharacter;
                    break;
                } else {
                    i++
                    isOver = true;
                    break;
                }

            case 'a':
                if(this.field[i][j-1] === fieldCharacter) {
                    j--;
                    this.field[i][j] = pathCharacter;
                    break;
                } else {
                    j--;
                    isOver = true;
                    break;
                }

            case 'd':
                if(this.field[i][j+1] === fieldCharacter) {
                    j++
                    this.field[i][j] = pathCharacter;
                    break;
                } else {
                    j++;
                    isOver = true;
                    break;
                }

            default:
                console.log("please input w s a d to move");
        }

        if (this.field[i][j] === hat ) {
            isOver = true;
            win = true;
        }
      }

      this.endGame();

      
  }


  static generateField(size = 6,holesPercentage = 0.3) {
      var field = new Array(size);
      for(let i = 0; i< size; i++) {
          field[i] = new Array(size);
      };
      let holesNumber = Math.floor(size*size*holesPercentage);
      let fieldsNumber = size*size-1;
    //   console.log(fieldsNumber)
      field[0][0] = pathCharacter;
    //   console.log(field);
    //   console.log(holesNumber);
      
    //fill the fieldCharacter
      while (fieldsNumber > 0) {
        let i = Math.floor(fieldsNumber/(size));
        // console.log(i);
        let j = fieldsNumber % size;
        // console.log(j);
        // console.log(field);
        field[i][j] = fieldCharacter;
        // console.log(field);
       
        fieldsNumber--;
      };      
      
      //start filling holes
      while (holesNumber) {
        let random = Math.floor(Math.random()*size*size);
        let i = Math.floor(random/(size));
        let j = random % size;
        if (field[i][j] === fieldCharacter) {
            field[i][j] = hole;
            holesNumber--;
        } 
      };
    
      // choose the hat point 
      let hasHat = false;
      
      while (!hasHat){
        const hatIndex = Math.floor(Math.random()*size*size);
        const i = Math.floor(hatIndex/(size));
        const j = hatIndex % size;
        if (field[i][j] === fieldCharacter) {
            field[i][j] = hat;
            hasHat = true;
        };        
      };
    //   console.log(field);
      return field;

  }
  
}
// const myField = new Field([
//   ['*', '░', 'O'],
//   ['░', 'O', '░'],
//   ['░', '^', '░'],
// ]);
// console.log(myField.field);
// myField.print();
// myField.startGame();
const myField = Field.generateField();
// console.log(myField);
const gameField = new Field(myField);

gameField.playGame();


