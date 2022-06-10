// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
    const password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
}

function generatePassword() {
    const criteria = generatePrompt();
    const pool = checkCriteria(criteria);
    const pwd = generateRandomPassword(pool, "");
    return shufflePassword(pwd.split("")).join("");
}

// Displaying prompts for a safe password creteria to user
function generatePrompt() {
    const pwdLength = prompt(
        "Password should be atleast 8 characters and no longer than 128 characters.    Press Ok to Confirm "
    );
    const pwdCase = prompt(
        "Password should contain a combination uppercase and lowercase letters.    Press Ok to Confirm"
    );
    const pwdNumber = prompt("Password should contain atleast 1 number.  Press Ok to Confirm");
    const pwdspecialChar = prompt(
        "Password should contain atleast 1 special characters.   Press Ok to Confirm"
    );
    return {
        length: pwdLength,
        case: pwdCase,
        number: pwdNumber,
        specialChar: pwdspecialChar,
    };
}
// Function to create a password pool 
function checkCriteria(criteria) {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const number = "0123456789";
    const special = "!@#$%^&*()";
    //creating an array of characters for password depending on the prompt selection by user
    /* The pool contains lower case alphabets , in case the user
     does not select any other type, the password will be generated 
     from lower case */ 
    let pwdPool = [lower];
    if (criteria.case) pwdPool.push(upper);
    if (criteria.number) pwdPool.push(number);
    if (criteria.specialChar) pwdPool.push(special);
    return { pool: pwdPool, length: criteria.length };
}

//function to generate a rmndom password from pool
function generateRandomPassword(pool, pwd) {
    const minLength = pool.length ? 8 : 1;

    pool.pool.forEach((element) => {
        const start = Math.floor(Math.random() * element.length);
        const end = Math.floor(Math.random() * (element.length - start));
        pwd += element.substring(start, end);
    });
    while (pwd.length < minLength) generateRandomPassword(pool, pwd);
    return pwd;
}

function prompt(text) {
    return confirm(text);
}

// shuffle selected characters for the password generation
function shufflePassword(value) {
    for (var i = value.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = value[i];
        value[i] = value[j];
        value[j] = temp;
    }
    return value;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
