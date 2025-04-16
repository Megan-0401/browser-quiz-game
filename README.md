# Browser Quiz Game

## Overview

A browser quiz game that displays a question to the user and four subsequent answers that they can choose from.

If the user clicks on the correct answer, their score will increase. Once the user has answered the question, they will be prompted by a button that will display the next question.

The user will also be presented with a few lifeline buttons. Each button can only be used once per game.

-   `50/50` -- two incorrect answers will be removed
-   `Ask COM` -- the computer will tell the user what it thinks the answer is. It has a 75% chance of being correct

Once all the questions are answered, the player will be shown their total score alongside a congratulatory message that depends on what score they obtained. They will then be allowed to click a button to play again, resetting the quiz.

## Project Breakdown

### HTML

-   Menu screen => 1 div
    -   Title (`Welcome to the quiz!`)
    -   Instructions => para
    -   Copy of non-interactable lifeline buttons (for display purposes)
    -   `Start quiz` => 1 button
-   Question title (e.g. `Question 1`)
-   Question section => 1 div (flex display)
    -   Question => 1 div
    -   Answers => 1 div, 4 buttons
    -   Help/Lifeline buttons => 1 div
        -   `50/50` Option => 1 button
        -   `Ask Com` Option => 1 button
    -   Score => 1 div
        -   Default value will be set to 0
-   Congratulatory message
    -   Only displays once an answer has been clicked on
-   Next question/play again button => 1 button
    -   Only displays once an answer has been clicked on

### SCSS

-   The buttons will have rounding to make them appear smoother
    -   Answer buttons and `next question` button will have some rounding
    -   Help buttons will be fully circular
-   The answer buttons and the help buttons will be displayed on the same row in a flex container
    -   On mobile, answer buttons are stacked on top of one another
    -   On desktop (/tablet), answer buttons are displayed in a 2x2 grid
    -   The help buttons will be displayed on top of one another
-   The message and `next question` button will appear underneath the question div

### TypeScript

-   When the page loads, the menu should display
-   When the user clicks the `Start quiz` button:
    -   The menu will hide and the questions section will display
    -   The question div should update to display the first question
-   Event listeners that watch for button clicks
    -   When an answer button is clicked, it will check if the answer is correct
    -   If correct:
        -   The answer button colour will turn green
        -   The user's score will update, adding 5 to their total score
        -   A congratulatory message will display (e.g. `Correct! Great job`)
    -   If incorrect:
        -   The answer button colour will turn red
        -   An encouraging message will display (e.g. `Better luck next time`)
    -   All other buttons will be greyed out
    -   When the `50/50` button is clicked:
        -   Two randomly chosen incorrect answers will be removed, and they will not be able to be clicked on
        -   The button will be greyed out, and no longer be able to be clicked on
    -   When the `Ask Com` button is clicked:
        -   A probability is generated whether the computer will suggest the correct answer or not
        -   Depending on the probability, it will either grab the correct answer or randomly choose an incorrect answer
        -   A message will display from the computer telling the user what it thinks the answer is
        -   The button will be greyed out, and no longer be able to be clicked on
    -   The `next question` button will then display. When clicked on:
        -   The current question div display will update, showing the next question and answers
        -   Any previous modification to the buttons will be reset
        -   The `next question` button and message will be hidden
        -   The question title will be updated (e.g. going from `Question 1` to `Question 2`)
-   A flag will be set to track how many questions have been answered. When all questions have been answered:
    -   The `next question` button will change to `show results`
    -   The user's total score will be displayed
    -   A message will display based their score
    -   The `show results` button will change to `play again`, resetting the flag and the questions to the beginning

### Edge cases

-   If the user clicks an answer button twice for the same question, then there should be no response from the buttons
    -   The score should only update once
    -   Other buttons should not change colour
-   The `50/50` button should not respond if the user has already clicked on an answer
-   If the user uses the `50/50` button and `Ask COM` button on the same question:
    -   `50/50` then `Ask COM` -> The computer will only choose between the two answers present
    -   `Ask COM` then `50/50` -> If the computer suggested an incorrect answer, then the two other incorrect answers will be removed, leaving the correct answer and the suggested incorrect answer
