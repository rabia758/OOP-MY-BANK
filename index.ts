#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

//welcome message
console.log(chalk.bold.magenta("\n\t\t >>>>>> ---------------------------------- <<<<<<< \t\t\n"))

console.log(chalk.bold.rgb(255, 192, 203)("\n\t\t >>>>>> WELCOME TO MY BANK <<<<<<<<< \t\t\n"))

console.log(chalk.bold.magenta("\n\t\t >>>>>> ------------------------------------ <<<<<<< \t\t\n"))

console.log(chalk.bold.green("\n\t\t please enter some data about you to  generate your account."))

//creat customer class
class Customer{
    firstName: string;
    lastName: string;
    age: number;
    gender:string;
    mobileNumber: number;
    pinCode:number;
 

    constructor(){
        this.firstName = "",
        this.lastName = "",
        this.age= 0,
        this.gender= "",
        this.mobileNumber= 0,
        this.pinCode = this.pingenerater()
    }

    pingenerater(): any{
        return Math.floor(Math.random() * 10000)
    }
    getcustomerinfo(){
        return `
               First Name: ${chalk.rgb(123,254,185).italic(this.firstName)} -
               Last Name: ${chalk.rgb(123,  254, 185).italic(this.lastName)} - 
               Age: ${chalk.rgb(123,  254, 185).italic(this.age)} - 
               Gender: ${chalk.rgb(123,  254, 185).italic(this.gender)} - 
               Mobile Number: ${chalk.rgb(123,  254, 185).italic(this.mobileNumber)} - 

        `
    }
}

// creat bank account class
class BankAccount{
    credit : string;
    debit : string;
    protected accountBalance: number;

    constructor(){
        this.credit = "",
        this.debit = "",
        this.accountBalance= 0
    }

    bankaccount(code : number){
        let check = user.pinCode  == code
        if(!check){
            console.log(chalk.bgCyanBright.magentaBright("\n\t Invalid PINCODE!! \n"));
            
        }else{
            return this.accountBalance
        }
    }

    Debit(code : number , amount : number){
        let check = user.pinCode  == code
        if(!check){
            console.log(chalk.bgCyanBright.magentaBright("\n\t Invalid PINCODE!! \n"));
            
        }else{
              let statment = ""
              if (amount > 0){
                if (this.accountBalance >= amount) {
                    this.accountBalance -= amount
                    console.log(chalk.rgb(255, 105, 180).italic.bold(`\n\tYour remaining balance is ${chalk.yellow.bold(this.accountBalance)} $`));
                    statment = `  Transaction succesfull!`   
                }else{
                    statment = chalk.redBright.bold("\nYou dont have enough amount to this transaction!!")
                    console.log(chalk.rgb(255, 105, 180).italic.bold(`\n\tYour account balance is ${chalk.yellow.bold(this.accountBalance)} $`));
                 }
                   console.log(chalk.bgWhiteBright.rgb(123,0,0).italic.bold(`\n\t ${statment}\n`));
                
              }
    }

    
    }
    Credit(code : number , amount : number){
        let check = user.pinCode  == code
        if(!check){
            console.log(chalk.bgCyanBright.magentaBright("\n\t Invalid PINCODE!! \n"));
            
        }else{
            let message: string = "Transaction failed!"
            if (amount > 0){
                this.accountBalance += amount
                if (amount > 100){
                    this.accountBalance -= 1
                } message = "Your account has been credited succeefull!!"
            }
                     console.log(chalk.rgb(224, 176, 255).italic.bold(`\n\t${message}`));
         console.log(chalk.rgb(255, 105, 180).italic(`\n\t   Your New Account balance is ${chalk.yellow.bold(this.accountBalance)}$\n `));
        }
        }

}

let user = new Customer()

async function getuserInfo() {
        let details = await inquirer.prompt (
            [
                {
                    name : "name",
                    type: "input",
                    message: chalk.rgb(255,185,145)("\n\tplease enter your First Name:"),
                    validate : (input)=> /^[A-Za-z]+$/.test(input) ? true : "Please Enter only alphabatical character"
                    
                },{
                    name : "lname",
                    type: "input",
                    message: chalk.rgb(255, 185,145)("\n\tplease enter your Lirst Name:"),
                    validate : (input)=> /^[A-Za-z]+$/.test(input) ? true : "Please Enter only alphabatical character"
                    
                },{
                    name : "age",
                    type: "input",
                    message: chalk.rgb(255, 185,145)("\n\tplease enter your Age:"),
                    validate : (input: string) => {
                        if (input.trim() === '') {
                            return "Age cannot be empty";
                        }
                        const number = parseInt(input);
                        if (isNaN(number)) {
                            return "Please enter a numerical value";
                        } else if (!/^\d+$/.test(input)) {
                            return "Please enter a valid number";
                        } else if (input.length !== 2 ) {
                            return "You are not be able to create an account";
                        }
                        return true; // Input is valid
                    }
                    
                },{
                    name : "gender",
                    type: "input",
                    message: chalk.rgb(255, 185,145)("\n\tplease enter your Gender:"),
                    validate : (input)=> /^[A-Za-z]+$/.test(input) ? true : "Please Enter only alphabatical character"
                    
                },{
                    name : "mobileNo",
                    type: "input",
                    message: chalk.rgb(255, 185,145)("\n\tplease enter your Mobile Number:"),
                    validate :async(input :string) =>{
                        if (input.trim() ===''){
                            return "Mobile number can not be empty!!"
                        }
                        const number = parseInt(input);
                        if(isNaN(number)){
                            return " Please enter a Numerical value!!"
                        }else if (!/^\d+$/.test(input)){
                            return "Please enter a valid number!!"
                        }else if (input.length !== 11) {
                            return "Please enter exactly 11 digits!!"
                        } 
                        return true //thput is valid
                    }
                    
                }
            ]
        )
        user.firstName = details.name
        user.lastName = details.lname
        user.age = details.age
        user.gender = details.gender
        user.mobileNumber = details.mobileNo
        console.log(chalk.rgb(123,0,0)(user.getcustomerinfo()));
        console.log(chalk.rgb(123,0,0)(`
                 "Your account has been successfully created"
                     ${chalk.magentaBright(user.firstName)}  your pin code is: ${chalk.magenta(user.pinCode)}\n`));
               
}

let Account = new BankAccount ()

async function transactions() {
    await getuserInfo()
    let condition = true
    while (condition){
           let trans = await inquirer.prompt(
            [
                {
                    name : "select",
                    type : "list",
                    message: chalk.bold.green("\n\twhat kind of Action you wanna perform?"),
                    choices: ["Credit","Debit","Check Balance","Exit"]
                }
            ]
           );
           if (trans.select === "Debit"){
            let check = await inquirer.prompt ([
                {
                    name : "code",
                    type: "input",
                    message: chalk.rgb(255, 108, 180)("\n\tplease enter Pin Code:"),
                    validate : (input: string) => {
                        if (input.trim() === '') {
                            return "Pin cannot be empty";
                        }
                        const number = parseInt(input);
                        if (isNaN(number)) {
                            return "Please enter a numerical value";
                        } else if (!/^\d+$/.test(input)) {
                            return "Please enter a valid number";
                        } 
                        return true; // Input is valid
                    } 
                }
            ])
            let debits = await inquirer.prompt(
                [
                    {
                        name : "deb",
                        type : "input",
                        message: chalk.rgb(255, 108, 180)("\n\thow much money you want to Debit?"),
                        validate: (number) => /^\d+$/.test(number)? true: "Please enter only numerical value!!"
                    }
                ]
            )
            Account.Debit(check.code , debits.deb)

           } else if (trans.select === "Credit"){
            let check = await inquirer.prompt ([
                {
                    name : "code",
                    type: "input",
                    message: chalk.rgb(255, 108, 180)("\n\tplease enter Pin Code:"),
                    validate : (input: string) => {
                        if (input.trim() === '') {
                            return "Pin cannot be empty";
                        }
                        const number = parseInt(input);
                        if (isNaN(number)) {
                            return "Please enter a numerical value";
                        } else if (!/^\d+$/.test(input)) {
                            return "Please enter a valid number";
                        } 
                        return true; // Input is valid
                    } 
                }
            ])
            let credit = await inquirer.prompt(
                [
                    {
                        name : "cred",
                        type: "input",
                        message: chalk.rgb(255, 185,145)("\n\thow much money you want to credit?"),
                        validate: (number) => /^\d+$/.test(number)? true: "Please enter only numerical value!!"
                    }
                ]
            )
            Account.Credit(check.code , credit.cred)

           }  else if (trans.select === "Check Balance"){
            let check = await inquirer.prompt ([
                {
                    name : "code",
                    type: "input",
                    message: chalk.rgb(255, 108, 180)("\n\tplease enter Pin Code:"),
                    validate : (input: string) => {
                        if (input.trim() === '') {
                            return "Pin cannot be empty";
                        }
                        const number = parseInt(input);
                        if (isNaN(number)) {
                            return "Please enter a numerical value";
                        } else if (!/^\d+$/.test(input)) {
                            return "Please enter a valid number";
                        } 
                        return true; // Input is valid
                    } 
                }
            ])
           let balance = Account.bankaccount(check.code)
           console.log(chalk.bold.rgb(100, 67, 87)(`\n\tYour Current Balance is: $${chalk.yellow(balance)}\n`));
           
           } else if (trans.select === "Exit"){
            console.log(chalk.bold.magenta("\n\t\t >>>>>> ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ <<<<<<< \t\t\t\n"))
            console.log(chalk.bold.rgb(255, 192, 203)("\n\t\t\t\t >>>>> Thank You For Using Bank APP <<<<<<< \t\t\t\n"))
            console.log(chalk.bold.magenta("\n\t\t >>>>>> ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ <<<<<<< \t\t\t\n"))

            break
           } else{
            console.log("invalid Action");
            
           }
           
    }
    
}

transactions()