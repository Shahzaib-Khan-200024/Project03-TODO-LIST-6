#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
const mainMenu = async () => {
    while (condition) {
        const action = await inquirer.prompt([
            {
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "Add a new task 🎯",
                    "View all tasks 👀",
                    "Remove a task ❌",
                    "Mark a task as complete ✔️",
                    "Exit ❗",
                ],
            },
        ]);
        switch (action.action) {
            case "Add a new task 🎯":
                await addTask();
                break;
            case "View all tasks 👀":
                viewTasks();
                break;
            case "Remove a task ❌":
                await removeTask();
                break;
            case "Mark a task as complete ✔️":
                await markTaskComplete();
                break;
            case "Exit ❗":
                condition = false;
                break;
        }
    }
};
const addTask = async () => {
    const addTask = await inquirer.prompt([
        {
            name: "todo",
            type: "input",
            message: "What you want to add in your Todos?",
        },
        {
            name: "addMore",
            type: "confirm",
            message: "Do you want to add more todos?",
            default: false,
        },
    ]);
    todos.push({ task: addTask.todo, completed: false });
    condition = addTask.addMore;
    console.log("Task added successfully!");
};
const viewTasks = () => {
    if (todos.length === 0) {
        console.log("No tasks to display.");
    }
    else {
        todos.forEach((todo, index) => {
            console.log(`${index + 1}. ${todo.task} - ${todo.completed ? "Completed" : "Incomplete"}`);
        });
    }
};
const removeTask = async () => {
    if (todos.length === 0) {
        console.log("No tasks to remove.");
        return;
    }
    const removeTask = await inquirer.prompt([
        {
            name: "taskIndex",
            type: "input",
            message: "Enter the task number you want to remove:",
            validate: (value) => {
                const valid = !isNaN(parseInt(value)) && parseInt(value) > 0 && parseInt(value) <= todos.length;
                return valid || "Please enter a valid task number.";
            },
        },
    ]);
    todos.splice(parseInt(removeTask.taskIndex) - 1, 1);
    console.log("Task removed successfully!");
};
const markTaskComplete = async () => {
    if (todos.length === 0) {
        console.log("No tasks to mark as complete.");
        return;
    }
    const completeTask = await inquirer.prompt([
        {
            name: "taskIndex",
            type: "input",
            message: "Enter the task number you want to mark as complete:",
            validate: (value) => {
                const valid = !isNaN(parseInt(value)) && parseInt(value) > 0 && parseInt(value) <= todos.length;
                return valid || "Please enter a valid task number.";
            },
        },
    ]);
    todos[parseInt(completeTask.taskIndex) - 1].completed = true;
    console.log("Task marked as complete!");
};
// Start the main menu
mainMenu();
// Explanation:
// 1: Todo Interface: Defines the shape of a to-do item.
// 2: Type Annotations: Adds type annotations to variables and function parameters/returns.
// 3: Validation in Prompts: Uses TypeScript's type-checking to ensure prompt inputs are valid.
// 4: Parse Int: Ensures that numeric values from user inputs are correctly parsed and validated.
