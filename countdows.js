// 🔧 กำหนดวันปลายทางที่ต้องการ (รูปแบบ: "YYYY-MM-DDTHH:MM:SS")
const targetDate = new Date("2025-10-28T09:00:00+07:00").getTime();

const countdown = () => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    document.getElementById("countdown").classList.add("hidden");
    document.getElementById("done-message").classList.remove("hidden");
    clearInterval(interval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, '0');
  document.getElementById("hours").textContent = String(hours).padStart(2, '0');
  document.getElementById("mins").textContent = String(minutes).padStart(2, '0');
  document.getElementById("secs").textContent = String(seconds).padStart(2, '0');
};

const interval = setInterval(countdown, 1000);
countdown();
