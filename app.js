// ✅ Replace with your Firebase project config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUTyTw6TBkZBuZe7prlD_HJUZfr5ANnaY",
  authDomain: "my-share-41d8b.firebaseapp.com",
  projectId: "my-share-41d8b",
  storageBucket: "my-share-41d8b.firebasestorage.app",
  messagingSenderId: "242207170452",
  appId: "1:242207170452:web:0345d1865c849640143981",
  measurementId: "G-WF7NZF7QS0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Save text to Firestore
function saveText() {
  const content = document.getElementById("editor").value;
  db.collection("documents").doc("publicTextFile").set({
    content: content,
    updatedAt: new Date()
  })
  .then(() => showStatus("✅ Text saved successfully!"))
  .catch((error) => {
    console.error("Save error:", error);
    showStatus("❌ Error saving text!");
  });
}

// Load text from Firestore
function loadText() {
  db.collection("documents").doc("publicTextFile").get()
    .then((doc) => {
      if (doc.exists) {
        document.getElementById("editor").value = doc.data().content;
        showStatus("📥 Text loaded successfully!");
      } else {
        alert("No saved text found!");
      }
    })
    .catch((error) => {
      console.error("Load error:", error);
      showStatus("❌ Error loading text!");
    });
}

// Show feedback message
function showStatus(message) {
  const statusDiv = document.getElementById("statusMessage");
  statusDiv.textContent = message;
  setTimeout(() => statusDiv.textContent = "", 2000);
}

function downloadText() {
  const content = document.getElementById("editor").value;

  // Create a Blob (file-like object)
  const blob = new Blob([content], { type: 'text/plain' });

  // Create a temporary link to trigger download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "my_text_file.txt";

  // Trigger the download
  link.click();

  // Cleanup
  URL.revokeObjectURL(link.href);
  showStatus("📤 File downloaded!");
}

