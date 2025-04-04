# Browser Quiz Game

## Overview

A browser quiz game that displays a question to the user and four subsequent answers that they can choose from.

If the user clicks on the correct answer, their score will increase. Once the user has answered the question, they will be prompted by a button that will display the next question.

Once all the questions are answered, the player will be shown their total score alongside a congratulatory message that depends on what score they obtained. They will then be allowed to click a button to play again, resetting the quiz.

## Project Breakdown

### HTML

-   Question title (e.g. `Question 1`)
-   Question section => 1 div (flex display)
    -   Question => 1 div
    -   Answers => 1 div, 4 buttons
        -   Each button has their own ID, so TS can assign the correct answer
    -   Score => 1 div
        -   Default value will be set to 0
-   Congratulatory message
    -   Only displays once an answer has been clicked on
-   Next question/play again button => 1 button
    -   Only displays once an answer has been clicked on

### SCSS

-   The buttons will have rounding to make them appear smoother
    -   On mobile, buttons are stacked on top of one another
    -   On desktop (/tablet), buttons are displayed in a 2x2 grid
-   The message and `next question` button will appear underneath the question div

### TypeScript

-   When the page loads, the question div should update to display the first question
-   Event listeners that watch for button clicks
    -   When an answer button is clicked, it will check if the answer is correct
    -   If correct:
        -   The answer button colour will turn green
        -   The user's score will update
        -   A congratulatory message will display (e.g. `Correct! Great job`)
    -   If incorrect:
        -   The answer button colour will turn red
        -   An encouraging message will display (e.g. `Better luck next time`)
    -   The `next question` button will then display. When clicked on:
        -   The current question div display will update, showing the next question and answers
        -   Any previous colour modification will be reset
        -   The `next question` button will be hidden again
        -   The question title will be updated (e.g. going from `Question 1` to `Question 2`)
-   A flag will be set to track how many questions have been answered. When all questions have been answered:
    -   The `next question` button will change to `show results`
    -   The user's total score will be displayed
    -   A message will display based on how many questions they got correct
    -   A button will display prompting them to `play again`, resetting the flag and the questions to the beginning

### Edge cases

-   If the user clicks an answer button twice for the same question, then there should be no response from the buttons
    -   The score should only update once

## Extra

### Hint button

Possibility of a hint button:

-   Displays on the left side of the question div
-   If clicked, it will display a small hint
-   If correct answers increase score by 5, then using a hint will decrease score by 2
