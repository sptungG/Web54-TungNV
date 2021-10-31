const prompt = require("prompt-sync")();
const method = require("./main");

function showMenu() {
  return console.log(
    `
======MENU======
1. Show all users.
2. Show user with ID.
3. Add new user.
4. Update user.
5. Delete user.
0. Exit.`
  );
}
async function handleMenu() {
  let running = 1;
  while (running == 1) {
    showMenu();
    let choice = Number(prompt("=>> Your choice: ").trim());
    switch (choice) {
      case 1:{
        console.log(`[ReadAll]`);
        let users = await method.readUsers();
        console.log(`id - username - password`);
        users.forEach((user) => {
          console.log(`${user.id} - ${user.username} - ${user.password}`);
        });
        break;
      }
      case 2: {
        console.log(`[Read by ID]`);
        let id = Number(prompt("=>> Enter userID: ").trim());
        let user = await method.readUser(id);
        console.log(`id - username - password`);
        console.log(`${user.id} - ${user.username} - ${user.password}`);
        break;
      }
      case 3: {
        console.log(`[Create]`);
        let newUsername = prompt("=>> Enter username: ").trim();
        let newPassword = prompt("=>> Enter password: ").trim();
        await method.addUser({ username: newUsername, password: newPassword });
        console.log(`Added Successful`);
        break;
      }
      case 4: {
        console.log(`[Update by ID]`);
        let id = Number(prompt("=>> Enter userID: ").trim());
        let newUsername = prompt("=>> Enter username: ").trim();
        let newPassword = prompt("=>> Enter password: ").trim();
        await method.updateUser(id, newUsername, newPassword);
        console.log(`Updated Successful`);
        break;
      }
      case 5: {
        console.log(`[Delete by ID]`);
        let id = Number(prompt("=>> Enter userID: ").trim());
        method.deleteUser(id);
        console.log(`Deleted Successful`);
        break;
      }
      case 0:
        console.log("Exit");
        running = 0;
        break;

      default:
        console.log("Invalid Input");
        break;
    }
  }
}
handleMenu();