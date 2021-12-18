import './index.css';
import Block from './Block';
import {useState, useEffect} from 'react'
import cloneDeep from 'lodash.clonedeep'
import { useEvent} from "./util";

function App() {

  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

  const [gameOver, setGameOver] = useState(false);
  const [data, setData] = useState([
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ])

  const initializeGrid = () =>
  {
    let newGrid = cloneDeep(data)

    addNumber(newGrid)
    addNumber(newGrid)
    setData(newGrid)
  }

  const addNumber = (newGrid) => 
  {
    let added = false
    let gridFull = false
    while(!added)
    {
      if(gridFull)
          break

      let rand1 = Math.floor(Math.random() * 4)
      let rand2 = Math.floor(Math.random() * 4)     

      if(newGrid[rand1][rand2] === 0)
      {
        newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4
        added = true
      }
    }   
  }
// Swipe Left
const swipeLeft = (dummy) => {
  console.log("swipe left");
  let oldGrid = data;
  let newArray = cloneDeep(data);

  for (let i = 0; i < 4; i++) {
    let b = newArray[i];
    let slow = 0;
    let fast = 1;
    while (slow < 4) {
      if (fast === 4) {
        fast = slow + 1;
        slow++;
        continue;
      }
      if (b[slow] === 0 && b[fast] === 0) {
        fast++;
      } else if (b[slow] === 0 && b[fast] !== 0) {
        b[slow] = b[fast];
        b[fast] = 0;
        fast++;
      } else if (b[slow] !== 0 && b[fast] === 0) {
        fast++;
      } else if (b[slow] !== 0 && b[fast] !== 0) {
        if (b[slow] === b[fast]) {
          b[slow] = b[slow] + b[fast];
          b[fast] = 0;
          fast = slow + 1;
          slow++;
        } else {
          slow++;
          fast = slow + 1;
        }
      }
    }
  }
  if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
    addNumber(newArray);
  }
  if (dummy) {
    return newArray;
  } else {
    setData(newArray);
  }
};


const swipeRight = (dummy) => {
  console.log("swipe right");
  let oldData = data;
  let newArray = cloneDeep(data);

  for (let i = 3; i >= 0; i--) {
    let b = newArray[i];
    let slow = b.length - 1;
    let fast = slow - 1;
    while (slow > 0) {
      if (fast === -1) {
        fast = slow - 1;
        slow--;
        continue;
      }
      if (b[slow] === 0 && b[fast] === 0) {
        fast--;
      } else if (b[slow] === 0 && b[fast] !== 0) {
        b[slow] = b[fast];
        b[fast] = 0;
        fast--;
      } else if (b[slow] !== 0 && b[fast] === 0) {
        fast--;
      } else if (b[slow] !== 0 && b[fast] !== 0) {
        if (b[slow] === b[fast]) {
          b[slow] = b[slow] + b[fast];
          b[fast] = 0;
          fast = slow - 1;
          slow--;
        } else {
          slow--;
          fast = slow - 1;
        }
      }
    }
  }
  if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
    addNumber(newArray);
  }
  if (dummy) {
    return newArray;
  } else {
    setData(newArray);
  }
};

const swipeDown = (dummy) => {
  console.log("swipe down");
  console.log(data);
  let b = cloneDeep(data);
  let oldData = JSON.parse(JSON.stringify(data));
  for (let i = 3; i >= 0; i--) {
    let slow = b.length - 1;
    let fast = slow - 1;
    while (slow > 0) {
      if (fast === -1) {
        fast = slow - 1;
        slow--;
        continue;
      }
      if (b[slow][i] === 0 && b[fast][i] === 0) {
        fast--;
      } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
        b[slow][i] = b[fast][i];
        b[fast][i] = 0;
        fast--;
      } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
        fast--;
      } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
        if (b[slow][i] === b[fast][i]) {
          b[slow][i] = b[slow][i] + b[fast][i];
          b[fast][i] = 0;
          fast = slow - 1;
          slow--;
        } else {
          slow--;
          fast = slow - 1;
        }
      }
    }
  }
  if (JSON.stringify(b) !== JSON.stringify(oldData)) {
    addNumber(b);
  }
  if (dummy) {
    return b;
  } else {
    setData(b);
  }
};

const swipeUp = (dummy) => {
  console.log("swipe up");
  let b = cloneDeep(data);
  let oldData = JSON.parse(JSON.stringify(data));
  for (let i = 0; i < 4; i++) {
    let slow = 0;
    let fast = 1;
    while (slow < 4) {
      if (fast === 4) {
        fast = slow + 1;
        slow++;
        continue;
      }
      if (b[slow][i] === 0 && b[fast][i] === 0) {
        fast++;
      } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
        b[slow][i] = b[fast][i];
        b[fast][i] = 0;
        fast++;
      } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
        fast++;
      } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
        if (b[slow][i] === b[fast][i]) {
          b[slow][i] = b[slow][i] + b[fast][i];
          b[fast][i] = 0;
          fast = slow + 1;
          slow++;
        } else {
          slow++;
          fast = slow + 1;
        }
      }
    }
  }
  if (JSON.stringify(oldData) !== JSON.stringify(b)) {
    addNumber(b);
  }
  if (dummy) {
    return b;
  } else {
    setData(b);
  }
};


  // Check Gameover
  const checkIfGameOver = () => {
    let checker = swipeLeft(true);

    if (JSON.stringify(data) !== JSON.stringify(checker)) {
      return false;
    }

    let checker2 = swipeDown(true);
    if (JSON.stringify(data) !== JSON.stringify(checker2)) {
      return false;
    }

    let checker3 = swipeRight(true);

    if (JSON.stringify(data) !== JSON.stringify(checker3)) {
      return false;
    }

    let checker4 = swipeUp(true);

    if (JSON.stringify(data) !== JSON.stringify(checker4)) {
      return false;
    }

    return true;
  };
  // Reset
  const resetGame = () => {
    setGameOver(false);
    const emptyGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    addNumber(emptyGrid);
    addNumber(emptyGrid);
    setData(emptyGrid);
  };

  const handleKeyDown = (event) => {
    if (gameOver) {
      return;
    }
    switch (event.keyCode) {
      case UP_ARROW:
        swipeUp();
        break;
      case DOWN_ARROW:
        swipeDown();
        break;
      case LEFT_ARROW:
        swipeLeft();
        break;
      case RIGHT_ARROW:
        swipeRight();
        break;
      default:
        break;
    }  
    
    let gameOverr = checkIfGameOver();
    if (gameOverr) {
      setGameOver(true);      
      alert("Game Over")
      resetGame()
    }
  };

  useEffect(() => {
    initializeGrid()
  }, []);

  useEvent('keydown',handleKeyDown)

  return(
    <div className='data'>
      {data.map((row, rowIndex) =>{
        return(
          <div className='row' key={rowIndex}>
            {row.map((digit, index)=>
            (
              <Block digit={digit} key={index}/>
            ))}
          </div>
        )
      })}
    </div>
  ) 
}

export default App;
