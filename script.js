// File: topup.js

function processTopUp() {
  const username = document.getElementById("username").value;
  const amount = document.getElementById("amount").value;
  const messageElement = document.getElementById("message");

  if (!username || amount <= 0) {
    messageElement.style.color = "red";
    messageElement.textContent = "Harap masukkan data yang benar.";
    return;
  }

  // Simulasi proses top-up
  messageElement.style.color = "green";
  messageElement.textContent = `Top-up berhasil! ${username} menerima top-up sebesar Rp${amount}.`;

  // Reset form
  document.getElementById("username").value = "";
  document.getElementById("amount").value = "";
}
