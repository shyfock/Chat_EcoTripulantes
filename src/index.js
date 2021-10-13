import { ManageAccount } from "./common.js";

document.getElementById("btn-signIn").addEventListener("click", (_) => {
        const email = document.getElementById("email-address").value;
        const pass = document.getElementById("password").value;
        const account = new ManageAccount();
        account.authenticate(email, pass);
    },
    false
);