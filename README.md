# Browser Quiz Game

## Overview

A browser quiz game that displays a question to the user and four subsequent answers that they can choose from.

If the user clicks on the correct answer, their score will increase. Once the user has answered the question, they will be prompted by a button that will display the next question.

The user will also be presented with a few lifeline buttons. Each button can only be used once per game.

-   `50/50` -- two incorrect answers will be removed
-   `Ask COM` -- the computer will tell the user what it thinks the answer is. It has a 75% chance of being correct

Once all the questions are answered, the player will be shown their total score alongside a congratulatory message that depends on what score they obtained. They will then be allowed to click a button to play again, resetting the quiz.

## Project Breakdown

### Features

1. Question and answers
2. Score counter
3. Results
4. `Play again` option
5. Lifeline buttons (`50/50` & `Ask COM`)
6. Menu screen
7. SFX and Music

---

### HTML

-   Menu screen => div
    -   Title (_Welcome to the quiz!_)
    -   Instructions => para
    -   Copy of non-interactable lifeline buttons (for display purposes)
    -   `Start quiz` => button
-   Question title (e.g. _Question 1_)
-   Question section => div
    -   Question
    -   Answers => div, 4 buttons
    -   Help/Lifeline buttons => div, 2 buttons
        -   `50/50`
        -   `Ask Com`
    -   Score => div
        -   Default value will be set to 0
-   Congratulatory message
    -   Only displays once an answer has been clicked on
-   `Next question`/`Play again` => button
    -   Only displays once an answer has been clicked on
-   Toggle music on/off => button

---

### SCSS

-   All elements will be displayed in the center of the webpage
    -   Exception: the music toggle button will have a fixed position
        -   Desktop: bottom right corner
        -   Mobile: top right corner
-   The buttons will have rounding to make them appear smoother
    -   Answer buttons and `next question` button will have some rounding
    -   Lifeline buttons and music toggle button will be fully circular
-   The answer buttons and the help buttons will be displayed on the same row in a flex container
    -   On mobile, answer buttons are stacked on top of one another
    -   On desktop, answer buttons are displayed in a 2x2 grid
    -   The help buttons will be displayed on top of one another
-   The message and `next question` button will appear underneath the question div
-   On the menu screen, there will be a seperate div that contains each lifeline button and it's explanation

---

### TypeScript

1. Menu Screen

    - When the page loads, the menu should display
    - When the user clicks the `Start quiz` button:
        - The menu screen will be replaced with the questions section
        - The question div should update to display the first question

2. Question & Answers

    - When a new question is displayed, the answer order will be randomised
    - When an answer button is clicked, it will check if the answer is correct
    - If correct:
        - The answer button colour will turn green
        - The user's score will update, adding 5 to their total score
        - A congratulatory message will display (e.g. _Correct! Great job_)
    - If incorrect:
        - The answer button colour will turn red
        - An encouraging message will display (e.g. _Better luck next time_)
    - All other buttons will be greyed out
    - The `next question` button will then display. When clicked on:
        - The current question div display will update, showing the next question and answers
        - Any previous modification to the buttons will be reset
        - The `next question` button and message will be hidden
        - The question title will be updated (e.g. going from `Question 1` to `Question 2`)

3. Results

    - A flag will be set to track how many questions have been answered. Once the user has answered the final question:
        - The `next question` button will change to `show results`
        - The user's total score will be displayed
        - A message will display based their score
        - The `show results` button will change to `play again`, resetting the flag and the questions to the beginning

4. Lifeline buttons

    - When the `50/50` button is clicked:
        - Two randomly chosen incorrect answers will be removed, and they will not be able to be clicked on
        - The button will be greyed out, and no longer be able to be clicked on
    - When the `Ask Com` button is clicked:
        - A probability is generated whether the computer will suggest the correct answer or not
        - Depending on the probability, it will either grab the correct answer or randomly choose an incorrect answer
        - A message will display from the computer telling the user what it thinks the answer is
        - The button will be greyed out, and no longer be able to be clicked on

5. SFX and Music
    - Sound effects
        - Play when the user clicks on an answer (seperate sounds for correct and incorrect answers)
    - Music
        - Music automatically plays when the page loads
        - The user can toggle the music on and off with a button

---

### Edge cases

-   If the user has already clicked on an answer once for a single question, there should be no response from any of the buttons on subsequent clicks
    -   This accounts for any answer button and the lifeline buttons
-   If the user has already used a lifeline, they should not be allowed to use it again for the rest of the quiz
    -   Once a new game has begun, all lifeline buttons will become avaliable to use
-   If the user uses the `50/50` button and `Ask COM` button on the same question:
    -   `50/50` then `Ask COM` -> The computer will only choose between the two answers present
    -   `Ask COM` then `50/50` -> If the computer suggested an incorrect answer, then the two other incorrect answers will be removed, leaving the correct answer and the suggested incorrect answer
