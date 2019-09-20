<img alt="Logo" src="https://mentor.coderslab.pl/wp-content/uploads/2018/12/CL_IT_logo_ENG_1040x261_black_YELLOW-1.png" width="400">

# Game of Life

:seedling: :seedling: :seedling:

The aim of this exercise is to write a simple application in JavaScript that will display an interactive animation based on one of the first and best known examples of cellular automaton, created in 1970 by British mathematician John Conway. We will write in pure JavaScript, based on object oriented programming.

→ you can read about the Game Of Life here: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

→ watch a short film here: https://www.youtube.com/watch?v=C2vgICfQawE

## The basic assumptions of the game:
* The Game of Life is a so-called *zero-player game* that develops on the basis of its original state.
* Cells arise and die on a two-dimensional board, and their state depends on their environment (eight cells which are their neighbors):
    * every live cell with fewer than two live neighbors dies by underpopulation,
    * every live cell with two or three live neighbors lives on to the next generation,
    * every live cell with more than three live neighbors dies by overpopulation,
    * every dead cell with exactly three live neighbors becomes a live cell again.

The user should declare a board on which he wants to watch the animation (stating its width and height). The application should display a board with the start animation (e.g. a single glider), where the user can turn on and off individual fields with the click of a mouse. Below the board there should be PLAY and PAUSE buttons, which will start or stop the animation in a given state, so that at any time the user can stop the animation, change its state and turn it on again.

## First, let's describe methods that our program must execute:
* A method that builds an appropriate board based on the given width and height (it limits the section's `width` and` height` with CSS, creates and adds the right number of divs to the DOM, saves them all in an array and adds an event that allows changing their state after the mouse click).
* A method that displays the initial state (e.g. with a single glider) - for this we will need a method to navigate the div sequence using the coordinates `x`, `y`, and `setCellState` method that takes three parameters: `x`, `y` and `state`.
* A `computeCellNextState` method that takes `x` and `y` as parameters and calculates whether this cell will survive, die or regenerate, based on the current state of this cell and the state of its neighbors.
* A `computeNextGeneration` method that, based on the current state of every cell, creates and writes the new state of the whole board in a `newGeneration` variable (using `computeCellNextState`).
* A `printNextGeneration` method that replaces the current state of all cells with the new state (stored in `tempGeneration`).
* A `start` method (that contains all previous steps), a `play` method (that reacts to the event of clicking the 'play' button by launching the animation), and `pause` method (that reacts to the event of clicking the 'pause' button by stopping the animation).


**And that's it! We will now move slowly through all the steps, but if you feel confident enough, you can try to write this application based only on the abbreviated description above.**



### 1. Preparing JavaScript file
* Create a directory named `js` in the main project directory. Inside this new directory create an `app.js` file and link it to the HTML document. Create event support for the `DOMContentLoaded` in the `app.js` file and check if it is working.

### 2. Creating a game management object
We will practice object-oriented programs, so we will write our entire game as the `GameOfLife()` object that will contain information about the board, and methods written to manage the game. To do this, in the `app.js` file:

* Create a constructor for `GameOfLife` objects, which should create our game taking `boardWidth` and `boardHeight` parameters. Define the following properties:
    * `width`: value of the `boardWidth` parameter,
    * `height`: value of the `boardHeight` parameter.
* To test if the constructor works properly, assign a new `GameOfLife` object with any parameters (e.g. 10, 10) to the `game` variable. Write the `game` variable in the console and check if this object is storing those given values.

**Remember to use the `this` keyword properly inside the object!**

### 3. Building a board
Take a look at the `index.html`. You will find there two sections and two buttons for managing the animation.
Also, look at the `style.css` file that is placed in the css catalog. There is a prototype of a stylesheet for our game – each cell will be a 10px wide and 10px high `<div>` located in the  `#board` section. Link the CSS file to HTML document.

We must fill our board with cells – an appropriate number of divs that we will create and add to the DOM using JavaScript. To do this:

* give the `GameOfLife` object a `board` attribute and store there the appropriate DOM element (section that will display our board). Use a method that finds an element by the `id`.
* Create a `createBoard()` method which:
    * will give the `#board` section an appropriate width and height (set CSS attributes `width` and `height` using JavaScript) – width / height of the board can be calculated by multiplying the attribute `boardWidth` / `borderHeight` by width / height of a single div representing a cell
    * will save the number of cells on the board (as the result of multiplying the height and width attributes of our object in a variable
    * will create the right number of divs using a loop, and add them to the `#board` section.

Due to the use of `float: left` and limiting the width of the `#board` section, our board looks like an actual, two-dimensional board (it has width and height), despite really being a chain of divs. To move easier through them, let's store all the divs in a variable:

* add a `this.cells` attribute to our object and define it as an empty array
* in the `createBoard()` method, after creating and adding all divs to the DOM, store them in the created variable.

Look at the `index.html` in your browser. If you did everything correctly, you should see a board (with dimensions that you defined) when passing a `GameOfLife()` object to the `game` variable.

### 4. Reviving and killing cells by mouse click

Clicking on a dead cell should revive it and vice versa. Look again at the `style.css` file – we've prepared a `live` class there which changes the color of the cell. We need to add an event to all DOM elements that are our cells. We will do it right after creating these elements:

* in the `createBoard()` method, iterate through all the elements saved in the `this.cells` attribute and add an event on mouse click to each of them.
* the click should switch (add or delete) the `live` class in the given div.

### 5. Pointing to a given cell with x- and y-coordinates

Right now, we can point to a specific cell only by using its index in the `this.cells` array. However, the cells are supposed to live or die depending on their neighbors that are best described as:

    for a cell with x- and y-coordinates:

    1. neighbor: x-1, y-1
    2. neighbor: x, y-1
    3. neighbor: x+1, y1
    4. neighbor: x-1, y
    5. neighbor: x+1, y
    6. neighbor: x-1, y+1
    7. neighbor: x, y+1
    8. neighbor: x+1, y+1

Add a method to the object that will convert the coordinates **x** and **y** to an array index using an appropriate pattern. The method should return a `<div>` with the chosen coordinates.

*Hint:*

`index = x + y * width`

### 6. Defining the initial state

To be able to easily check if we are programming our animation well, let's create a method that will display a [glider](https://en.wikipedia.org/wiki/Glider_(Conway%27s_Life)#/media/File:Animated_glider_emblem.gif) in the upper left corner of the board. To do that:

* we will need `setCellState(x, y, state)` method that will change the state of a cell with given x- and y-coordinates to the state that is passed in the parameter using a simple conditional expression and adding/deleting an appripriate class.
* create a `firstGlider()` method that will revive 5 cells of your choice (using the `setCellState(x, y, 'live')` method) and thus display a glider.

### 7. Stages of the program

Żeby poprawnie zastosować założenia Conwaya, musimy w tym samym momencie zmienić stan wszystkich komórek na nowy (błędem byłoby zmienianie każdej komórki po kolei, bo przed chwilą zmieniona wpływałaby na zmianę kolejnej, jako jej sąsiada). Zaplanujmy więc kroki, które musimy wykonywać, żeby animacja działała poprawnie:

In order to apply Conway's assumptions correctly, we have to change the state of all cells at the same time (it would be a mistake to change them one by one, because the changed cell would instantly affect the next one as its neighbor). So let's plan the steps we need to take to make the animation work properly:

* calculation of the future state of the cell with `x-` and `y-` coordinates based on its neighbors
* saving calculated future states of all cells in a variable (e.g. `nextGeneration`)
* setting the new appearance of all cells based on the data from the above variable

As you see, we need to create 3 methods:

    computeCellNextState(x, y)
    computeNextGeneration()
    printNextGeneration()

* **Generating future state of a cell**
    * this method should check all eight neighbors of a cell with given x- and y-coordinates and count how many of them are alive
    * depending on whether this cell is alive or not, and how many of its neighbors are alive, the method should determine the future state of the cell
    * our function should return `1` if the cell will be alive, `0` if dead.

* **Generating future appearance of our board**
    * we must create a variable that will store the entire state of the future board – which will be a collection of digits `0` and `1`, so the variable must be defined as an empty array
    * this method should iterate through all the cells and check their future state using `computeCellNextState(x, y)` – the returned result should be added to the table in the variable created above
    * because `computeCellNextState(x, y)` function needs x- and y-coordinates, remember to use a loop nested in a loop for moving along the board (be sure to move row by row, not column by column)
    * after executing this function in the variable defined at the beginning, we should have as many elements as we have cells on the board.

* **Displaying the new state of the board**
    * this method should iterate through all cells and set a new state for each one, based on the information stored in the variable from the previous step
    * as the information about the states to be set are stored in an one-dimensional array, it will be easier for us to move around our board if we turn it also into a one-dimensional array - which we already have in the `cells` attribute of this object
    * remember that cells are revived or killed by adding and deleting an appropriate class


**ATTENTION:** *to test if methods written in this step work properly, let's temporarily set an event on play button, which will show the next step of the animation after clicking the button (use `printNextGeneration();`).*

### 8. Starting the animation – *play* and *pause* buttons

The last step is starting the animation, which means setting an interval that will trigger a single step of the game every few milliseconds. Add an appropriate event to the *play* button. Save the interval into a variable to be able to clean it when clicking on *pause*.

**ATTENTION:** *So far, we have used properties and methods of the `GameOfLife()` object and we referred to them using the keyword `this`. In this case we cannot do this as inside the interval, the keyword this takes another value and does not point to the object anymore. To avoid this, set a variable - e.g. named `self` - as an object attribute, assign `this` to it, and use this `self` in the method that handles the interval.*

### 9. Finishing touches

If you have reached this point, it means that your game is working correctly. Good job!

Remember that the game should be created on the basis of width and height entered by the user. It is up to you how you will ask the user for these values. Save them in variables and use them as parameters when creating your game object.

Be sure to make your object go through all of the initial steps (for the sake of clarity, you can add them to a single `start()` method).

If you want, you can change the event that lets the user revive and kill cells - mouse click will be very accurate but difficult to use; instead, you can use the mouseover.

Got the power to do some more? You can improve your application e.g. by adding visual or audio effects.

**Congratulations!**

**Exercises will be deleted two weeks after the end of the course. This will result in the removal of all forks made from this repository.**
