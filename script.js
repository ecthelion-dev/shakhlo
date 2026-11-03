/**
 * SHAHLO Boutique - Rasmiy Link-in-Bio sozlamalari
 */
const BOUTIQUE_CONFIG = {
  brandName: "SHAHLO Boutique",
  slogan: "Nafis va bejirim ayollar liboslari to'plami ✨",
  phone: "+998 93 634 00 07",
  phoneRaw: "+998936340007",
  telegramChannel: "https://t.me/shahlo_boutique",
  telegramAdmin: "https://t.me/shahlo_boutique",
  instagramUrl: "https://www.instagram.com/_shahlo_boutique_?psln=OWtmaXk2ZG16MjFj",
  instagramHandle: "@_shahlo_boutique_",
  address: "Центр бозори: 3-сектор, 8-дўкон",
  mapsUrl: "https://yandex.uz/maps/?text=Центр+бозори",
  workHours: {
    start: 9, // 09:00
    end: 19   // 19:00
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Real-time Shop Open/Closed Status
  updateStoreStatus();
  setInterval(updateStoreStatus, 60000);

  // 3. Share Functionality
  setupShare();

  // 4. QR Code Scroll Button
  const qrToggleBtn = document.getElementById("qrToggleBtn");
  if (qrToggleBtn) {
    qrToggleBtn.addEventListener("click", () => {
      const qrSection = document.querySelector("section:has(img[alt='Instagram QR'])") || document.querySelectorAll("section")[1];
      if (qrSection) {
        qrSection.scrollIntoView({ behavior: "smooth", block: "center" });
        qrSection.classList.add("ring-2", "ring-boutique-500", "transition-all");
        setTimeout(() => {
          qrSection.classList.remove("ring-2", "ring-boutique-500");
        }, 1500);
      }
    });
  }
});

/**
 * Do'kon ish vaqtini avtomatik tekshirish
 */
function updateStoreStatus() {
  const badge = document.getElementById("statusBadge");
  const text = document.getElementById("statusText");
  if (!badge || !text) return;

  const now = new Date();
  const currentHour = now.getHours();

  const isOpen = currentHour >= BOUTIQUE_CONFIG.workHours.start && currentHour < BOUTIQUE_CONFIG.workHours.end;

  if (isOpen) {
    badge.className = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50/90 backdrop-blur-md border border-emerald-200 text-[11px] font-medium text-emerald-800 shadow-sm";
    badge.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      <span>Do'kon ochiq • ${BOUTIQUE_CONFIG.workHours.start}:00 - ${BOUTIQUE_CONFIG.workHours.end}:00</span>
    `;
  } else {
    badge.className = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50/90 backdrop-blur-md border border-amber-200 text-[11px] font-medium text-amber-800 shadow-sm";
    badge.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-amber-400"></span>
      <span>Hozir yopiq • Ertaga 09:00 da ochiladi</span>
    `;
  }
}

/**
 * Sahifani ulashish (Web Share API yoki Dialog oynasi)
 */
function setupShare() {
  const shareBtn = document.getElementById("shareBtn");
  const shareModal = document.getElementById("shareModal");
  const modalBox = document.getElementById("modalBox");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const copyBtn = document.getElementById("copyBtn");
  const shareUrlInput = document.getElementById("shareUrlInput");

  if (shareUrlInput) {
    shareUrlInput.value = window.location.href;
  }

  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: BOUTIQUE_CONFIG.brandName,
            text: BOUTIQUE_CONFIG.slogan,
            url: window.location.href
          });
        } catch (err) {
          console.log("Share bekor qilindi yoki brauzerda cheklangan");
        }
      } else {
        openModal();
      }
    });
  }

  function openModal() {
    if (!shareModal || !modalBox) return;
    shareModal.classList.remove("opacity-0", "pointer-events-none");
    shareModal.classList.add("opacity-100");
    modalBox.classList.remove("scale-95");
    modalBox.classList.add("scale-100");
  }

  function closeModal() {
    if (!shareModal || !modalBox) return;
    shareModal.classList.add("opacity-0", "pointer-events-none");
    shareModal.classList.remove("opacity-100");
    modalBox.classList.add("scale-95");
    modalBox.classList.remove("scale-100");
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  if (shareModal) {
    shareModal.addEventListener("click", (e) => {
      if (e.target === shareModal) closeModal();
    });
  }

  if (copyBtn && shareUrlInput) {
    copyBtn.addEventListener("click", () => {
      shareUrlInput.select();
      navigator.clipboard.writeText(shareUrlInput.value).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "Nusxalandi! ✓";
        copyBtn.classList.add("bg-emerald-600");
        copyBtn.classList.remove("bg-boutique-600");
        setTimeout(() => {
          copyBtn.innerText = originalText;
          copyBtn.classList.remove("bg-emerald-600");
          copyBtn.classList.add("bg-boutique-600");
        }, 2000);
      });
    });
  }
}
