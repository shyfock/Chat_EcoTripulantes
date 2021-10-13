import { ManageAccount } from "./common.js";
import { 
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { 
    getAuth, 
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

const db = getFirestore();
let currentUser = undefined;
const messagesQuery = query(
    collection(db, "messages"),
    where("roomid", "==", "chat1"),  
    orderBy("date", "desc") /* Ordena por fecha en orden descendente*/
);

onAuthStateChanged(getAuth(), (user) => {
    if(user){
        currentUser = user;
        document.getElementById("userName").innerHTML = `Hola ${user.email}`;
    }
})

document.getElementById("btn-signOut").addEventListener(
    "click", (_) => {
        const account = new ManageAccount();
        account.signOut();   
    },
    false
);

document.getElementById("btn-sendMessage").addEventListener(
    "click", (_) => {
        const message = document.getElementById("message").value;
        document.getElementById("message").value = "";
        addDoc(collection(db, "messages"), {
            user: currentUser.email,
            roomid: "chat1",
            message,
            date: serverTimestamp(),
        });
    },
    false
);

document.getElementById("message").addEventListener(
    "keyup", (event) => {
        if(event.code === "Enter"){
            event.preventDefault();
            const message = document.getElementById("message").value;
            document.getElementById("message").value = "";
            addDoc(collection(db, "messages"), {
                user: currentUser.email,
                roomid: "chat1",
                message,
                date: serverTimestamp(),
            });
        }
    },
    false
);

onSnapshot(messagesQuery, (querySnapshot) => {
    let chatHtml = "";
    querySnapshot.forEach((doc) => {
        const message = doc.data();
        if(message.user === currentUser.email){
            chatHtml += //html 
            `<div
            class="
            other
            break-all
            mt-2
            ml-5
            rounded-bl-none
            float-none
            bg-gray-300
            mr-auto
            rounded-2xl
            p-2"
            >${message.message}
            </div>`;
        }else{
            chatHtml += //html 
            `<div
            class="
            w-max
            ml-auto
            break-all
            mt-2
            mb-1
            p-2
            rounded-br-none
            bg-purple-600
            mr-5
            rounded-2xl
            text-white
            text-left"
            >${message.message}
            </div>`;
        }
        document.getElementById("chat").innerHTML = chatHtml;
    });
});