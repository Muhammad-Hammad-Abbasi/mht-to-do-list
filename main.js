#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
let toDoList = [];
let loop = true;
//****************use while loop (select Options) *******************//
while (loop === true) {
    let Option = await inquirer.prompt([
        {
            type: "list",
            name: "userOption",
            message: chalk.yellowBright("select an option"),
            choices: ["Add", "Remove", "Update"],
        }
    ]);
    //**************** Add ********************//
    if (Option.userOption === "Add") {
        let answers = await inquirer.prompt([
            {
                name: "userAnswers",
                type: "input",
                message: chalk.greenBright("Add your Todo in the list"),
            },
        ]);
        if (answers.userAnswers !== "") {
            toDoList.push(answers.userAnswers);
            console.log(chalk.blueBright.bold("\nTask added."));
            console.log(chalk.bold("\n\tUpdated list :"));
            toDoList.forEach((item) => {
                console.log(chalk.greenBright(`\t-${item}`));
            });
            console.log("\n");
        }
        else {
            console.log(chalk.bgRedBright.bold("Kindly add something in toDo list!"));
        }
        //********************* Remove ***********************//
    }
    else if (Option.userOption === "Remove") {
        if (toDoList.length > 0) {
            let removeChoice = await inquirer.prompt([
                {
                    name: "removeTodoItem",
                    type: "list",
                    message: chalk.cyanBright("\nselect item to remove."),
                    choices: toDoList,
                },
            ]);
            let idexItemToRemove = toDoList.indexOf(removeChoice.removeTodoItem);
            if (idexItemToRemove >= 0) {
                toDoList.splice(idexItemToRemove, 1);
                console.log(chalk.bgRedBright.bold("you remove : ", removeChoice.removeTodoItem));
                console.log(chalk.bold("\n\tUpdated List:"));
                toDoList.forEach((item) => {
                    console.log(chalk.greenBright(`\t- ${item}`));
                });
                console.log("\n");
            }
        }
        else {
            console.log(chalk.yellowBright("\n\tyour To-Dos list is Empty .Add To-Dos before removing.\n "));
        }
        //************************** update ********************************//
    }
    else if (Option.userOption === "Update") {
        if (toDoList.length > 0) {
            let showUpdate = await inquirer.prompt([
                {
                    name: " list",
                    type: "UpdateItem",
                    message: "\nselect an to updated ToDo :",
                    choices: toDoList,
                },
            ]);
            let index = toDoList.indexOf(showUpdate.UpdateItem);
            let editTodoVal = await inquirer.prompt([
                {
                    name: "editItem",
                    type: "input",
                    message: "\nEnter the updated ToDos:",
                },
            ]);
            if (editTodoVal.editItem !== "") {
                toDoList[index] = editTodoVal.editItem;
                console.log(chalk.green.italic("\nToDos updated successfully."));
                console.log(chalk.bold("\n\tUpdated ToDo list:"));
                toDoList.forEach((item) => {
                    console.log(chalk.greenBright(`\t- ${item}`));
                });
                console.log("\n");
            }
            else {
                console.log(chalk.red.bold("\nyou cannot update to an empty item!.\n"));
            }
        }
        else {
            console.log(chalk.yellow("\n\tThe To-Do list is Empty please add tasks before updating.\n"));
        }
    }
    // *********************** confirmation **************************//
    let userAnswers = await inquirer.prompt([
        {
            name: "selection",
            type: "confirm",
            message: "Do you want to continue?",
            default: true,
        },
    ]);
    if (userAnswers.selection === false) {
        loop = false;
    }
}
console.log(chalk.yellow.bold("\n\tThank you for try this To-Do list."));
