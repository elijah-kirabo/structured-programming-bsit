// ============================================
// Student Grade Analyzer
// Name: Bukenya Elijah KIrabo
// Access Number: B33770
// Registration Number: M25B13/057
// ============================================

/*
PROBLEM:
In educational environments, teachers and students need a quick way to evaluate academic performance.
Manually calculating averages and determining grades is time-consuming and error-prone.
This program automates grade analysis by:
- Accepting multiple subject grades
- Calculating average marks
- Assigning a letter grade based on a grading scale
- Providing feedback to encourage improvement

WHY CONDITIONS, LOOPS, AND FUNCTIONS?
- Conditions: Used to decide letter grades and feedback based on score ranges.
- Loops: Used to iterate through subjects for input and calculations.
- Functions: Modularize code for input, calculation, grading, and output for reusability and clarity.
*/

// Function to get grades from user (simulated here with predefined values for demonstration)
function getGrades() {
    // In a real scenario, we could use prompt() or inputs; here we simulate with an array
    const grades = [85, 72, 90, 65, 78];
    console.log("Grades entered:", grades);
    return grades;
}

// Function to calculate average grade
function calculateAverage(grades) {
    let total = 0;
    // Loop through grades to compute total
    for (let i = 0; i < grades.length; i++) {
        total += grades[i];
    }
    return total / grades.length;
}

// Function to determine letter grade using conditions
function getLetterGrade(average) {
    if (average >= 90) {
        return 'A';
    } else if (average >= 80) {
        return 'B';
    } else if (average >= 70) {
        return 'C';
    } else if (average >= 60) {
        return 'D';
    } else {
        return 'F';
    }
}

// Function to provide feedback based on letter grade
function getFeedback(letterGrade) {
    switch (letterGrade) {
        case 'A':
            return "Excellent! Keep up the great work.";
        case 'B':
            return "Good job! There's still room to improve.";
        case 'C':
            return "You're doing okay, but aim higher.";
        case 'D':
            return "Need to put in more effort.";
        case 'F':
            return "Please seek academic help immediately.";
        default:
            return "Invalid grade.";
    }
}

// Main function to run the grade analysis
function analyzeGrades() {
    const grades = getGrades();
    const average = calculateAverage(grades);
    const letterGrade = getLetterGrade(average);
    const feedback = getFeedback(letterGrade);

    console.log(`Average Grade: ${average.toFixed(2)}`);
    console.log(`Letter Grade: ${letterGrade}`);
    console.log(`Feedback: ${feedback}`);
}

// Execute the program
analyzeGrades();

console.log("The End");