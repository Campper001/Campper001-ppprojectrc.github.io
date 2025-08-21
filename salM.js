        // โหลดข้อมูลจาก localStorage
document.getElementById("ingpx").value = localStorage.getItem("gpx") || "";
document.getElementById("inTgat1").value = localStorage.getItem("Tgat1") || "";
document.getElementById("inTgat2").value = localStorage.getItem("Tgat2") || "";
document.getElementById("inTgat3").value = localStorage.getItem("Tgat3") || "";
document.getElementById("inTpat1").value = localStorage.getItem("Tpat1") || "";
document.getElementById("inTpat12").value = localStorage.getItem("Tpat12") || "";
document.getElementById("inTpat13").value = localStorage.getItem("Tpat13") || "";
document.getElementById("inTpat21").value = localStorage.getItem("Tpat21") || "";
document.getElementById("inTpat22").value = localStorage.getItem("Tpat22") || "";
document.getElementById("inTpat23").value = localStorage.getItem("Tpat23") || "";
document.getElementById("inTpat3").value = localStorage.getItem("Tpat3") || "";
document.getElementById("inTpat4").value = localStorage.getItem("Tpat4") || "";
document.getElementById("inTpat5").value = localStorage.getItem("Tpat5") || "";
document.getElementById("inAL1").value = localStorage.getItem("AL1") || "";
document.getElementById("inAL2").value = localStorage.getItem("AL2") || "";
document.getElementById("inALsci").value = localStorage.getItem("ALsci") || "";
document.getElementById("inALphy").value = localStorage.getItem("ALphy") || "";
document.getElementById("inALchm").value = localStorage.getItem("ALchm") || "";
document.getElementById("inALbio").value = localStorage.getItem("ALbio") || "";
document.getElementById("inALscd").value = localStorage.getItem("ALscd") || "";
document.getElementById("inALthi").value = localStorage.getItem("ALthi") || "";
document.getElementById("inALeng").value = localStorage.getItem("ALeng") || "";
document.getElementById("inALfan").value = localStorage.getItem("ALfan") || "";
document.getElementById("inALger").value = localStorage.getItem("ALger") || "";
document.getElementById("inALjap").value = localStorage.getItem("ALjap") || "";
document.getElementById("inALkor").value = localStorage.getItem("ALkor") || "";
document.getElementById("inALchi").value = localStorage.getItem("ALchi") || "";
document.getElementById("inALbai").value = localStorage.getItem("ALbai") || "";
document.getElementById("inALsph").value = localStorage.getItem("ALsph") || "";


function savedata() {
  let allValid = true;

  // GPAX
    const gpxInput = document.getElementById('ingpx').value;
    if (gpxInput !== "") {
      const gpx = parseFloat(gpxInput);
      if (!isNaN(gpx) && gpx <= 4.00 && gpx >= 0) {
        localStorage.setItem('gpx', gpx);
      } else {
        allValid = false;
      }
    }


  // TGAT
  const tgatKeys = ['Tgat1', 'Tgat2', 'Tgat3'];
  tgatKeys.forEach(key => {
    const val = parseFloat(document.getElementById('in' + key).value || "0");
    if (val > 100 || val < 0 || isNaN(val)) {
      allValid = false;
    }
  });

  if (allValid) {
    tgatKeys.forEach(key => {
      const val = document.getElementById('in' + key).value || "";
      localStorage.setItem(key, val);
    });
  }

  // TPAT
  const tpatKeys = ['Tpat1', 'Tpat12', 'Tpat13', 'Tpat21', 'Tpat22', 'Tpat23', 'Tpat3', 'Tpat4', 'Tpat5'];
  tpatKeys.forEach(key => {
    const val = parseFloat(document.getElementById('in' + key)?.value || "0");
    if (val > 100 || val < 0 || isNaN(val)) {
      allValid = false;
    }
  });

  if (allValid) {
    tpatKeys.forEach(key => {
      const val = document.getElementById('in' + key)?.value || "";
      localStorage.setItem(key, val);
    });
  }

  // A-Level
  const alevelKeys = ['AL1', 'AL2', 'ALsci', 'ALphy', 'ALchm', 'ALbio', 'ALscd', 'ALthi',
                      'ALeng', 'ALfan', 'ALger', 'ALjap', 'ALkor', 'ALchi', 'ALbai', 'ALsph'];
  alevelKeys.forEach(key => {
    const val = parseFloat(document.getElementById('in' + key)?.value || "0");
    if (val > 100 || val < 0 || isNaN(val)) {
      allValid = false;
    }
  });

  if (allValid) {
    alevelKeys.forEach(key => {
      const val = document.getElementById('in' + key)?.value || "";
      localStorage.setItem(key, val);
    });
  }

  // แจ้งผลสุดท้าย
  if (allValid) {
    alert("บันทึกข้อมูลทั้งหมดสำเร็จแล้ว!");
    location.reload();
  } else {
    alert("❌ บันทึกไม่สำเร็จ: กรุณาตรวจสอบว่าค่าทั้งหมดถูกต้อง (GPAX ≤ 4.00, คะแนนอื่นๆ อยู่ในช่วง 0 - 100)");
    location.reload();
  }
}

function setdata(){
const keysToRemove = ['gpx', 'Tgat1', 'Tgat2', 'Tgat3', 'Tpat1', 'Tpat12', 'Tpat13', 'Tpat21', 'Tpat22', 'Tpat23', 'Tpat3', 'Tpat4', 'Tpat5',
                      'AL1', 'AL2', 'ALsci', 'ALphy', 'ALchm', 'ALbio', 'ALscd', 'ALthi', 'ALeng', 'ALfan', 'ALger', 'ALjap', 'ALkor', 'ALchi', 'ALbai', 'ALsph'];

keysToRemove.forEach(key => localStorage.removeItem(key));
alert("ข้อมูลทั้งหมดถูกลบเรียบร้อยแล้ว!");
location.reload();

}