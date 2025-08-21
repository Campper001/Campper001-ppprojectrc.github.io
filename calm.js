let weights = {};

document.addEventListener("DOMContentLoaded", function () {
    console.log('DOM fully loaded');

    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            console.log('Search input changed:', this.value);
            let filter = this.value.toLowerCase();
            let list = document.querySelectorAll('#facultyList li');
            list.forEach(item => {
                item.style.display = item.textContent.toLowerCase().includes(filter) ? "" : "none";
            });
        });
    } else {
        console.error('Search input not found');
    }
    
    /////small
    const toggleText = document.querySelector(".small p");
    const content = document.getElementById("calContent");
    if (toggleText && content) {
        toggleText.addEventListener("click", function () {
            console.log('Toggle clicked, current display:', content.style.display);
            if (content.style.display === "none") {
                content.style.display = "block";
                toggleText.textContent = "ย่อหน้าต่าง 🠕";
            } else {
                content.style.display = "none";
                toggleText.textContent = "ขยายหน้าต่าง 🠗";
            }
        });
    } else {
        console.error('Toggle text or calContent not found');
    }

    const TgMS = document.querySelector(".CLS");
    const MSS = document.getElementById("min");
    const icon = document.getElementById("iconToggle");

    if (TgMS && MSS) {
        TgMS.addEventListener("click", function () {
            const isHidden = MSS.style.display === "none";
            MSS.style.display = isHidden ? "block" : "none";
            icon.src = isHidden ? "img/ARDW.svg" : "img/ARUP.svg";
        });
    } else {
        console.error("ไม่พบ CLS หรือ min");
    }

    const unSelect = document.querySelector('select[name="UN"]');
    if (unSelect) {
        unSelect.addEventListener('change', function () {
            console.log('University changed:', this.value);
            document.getElementById("facultyButton").textContent = "เลือกคณะ";
            document.getElementById("selectedFA").value = "";
            document.getElementById("FAsel").textContent = "";
            document.getElementById('mi1').innerText = 'N/A';
            document.getElementById('mx1').innerText = 'N/A';
            document.getElementById('mi2').innerText = 'N/A';
            document.getElementById('mx2').innerText = 'N/A';
            document.getElementById('rec').innerText = 'N/A';
            const ggElement = document.getElementById('GG');
            if (ggElement) {
                ggElement.classList.add('hidden');
                ggElement.classList.remove('block');
            }
            const scoreDivs = document.querySelectorAll('[id^="MSG"]');
            scoreDivs.forEach(div => {
                console.log(`Resetting ${div.id} to hidden`);
                div.classList.add('hidden');
                div.classList.remove('block');
            });
        });
    } else {
        console.error('University select not found');
    }

    const form = document.getElementById('UNform');
    const nameEl = document.getElementById('UNname');
    const logoEl = document.getElementById('UNLogo');
    const faselEl = document.getElementById('FAsel');

    const universityData = {
        NU: { name: 'มหาวิทยาลัยนเรศวร', logo: 'imgu/Nu.png' },
        CU: { name: 'จุฬาลงกรณ์มหาวิทยาลัย', logo: 'imgu/chula2.png' },
        KKU: { name: 'มหาวิทยาลัยขอนแก่น', logo: 'imgu/KKU.png' },
        KMUTNB: { name: 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ', logo: 'imgu/KMUTNB.png' }
    };

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log('Form submitted');
            const selectedUniversity = unSelect.value;
            const selectedFaculty = document.getElementById("selectedFA").value;

            if (!selectedUniversity) {
                alert('กรุณาเลือกมหาวิทยาลัยก่อน');
                console.log('No university selected');
                return;
            }

            if (!selectedFaculty) {
                alert('กรุณาเลือกคณะก่อน');
                console.log('No faculty selected');
                return;
            }

            updateCoreInfo(selectedFaculty);

            const university = universityData[selectedUniversity];
            if (university) {
                console.log('Updating university info:', university);
                nameEl.textContent = university.name;
                logoEl.src = university.logo;
                logoEl.alt = university.name;
            } else {
                console.log('University not found in universityData');
                nameEl.textContent = 'ไม่พบข้อมูลมหาวิทยาลัย';
                logoEl.src = '';
                logoEl.alt = '';
            }

            faselEl.textContent = selectedFaculty || 'ยังไม่ได้เลือกคณะ';
            showResult();

            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        });
    } else {
        console.error('Form not found');
    }
});

function openModal() {
    const selectedUniversity = document.querySelector('select[name="UN"]').value;
    console.log('Opening modal for university:', selectedUniversity);

    if (!selectedUniversity) {
        alert("กรุณาเลือกมหาวิทยาลัยก่อน");
        return;
    }

    // จำลองข้อมูลคณะ
    const facultyData = {
        NU: ['หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์ (แบบที่ 1)', 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์ (แบบที่ 2)'],
    };

    const faculties = facultyData[selectedUniversity] || [];
    const facultyList = document.getElementById("facultyList");
    facultyList.innerHTML = faculties.map(faculty => `<li class="cursor-pointer p-2 hover:bg-gray-100" onclick="selectFA('${faculty}')">${faculty}</li>`).join('');
    document.getElementById("modal").classList.remove("hidden");
    console.log('Modal opened, faculty list updated');
}

function closeModal() {
    console.log('Closing modal');
    document.getElementById("modal").classList.add("hidden");
}

function selectFA(faculty) {
    console.log('Faculty selected:', faculty);
    document.getElementById('facultyButton').innerText = faculty;
    document.getElementById('selectedFA').value = faculty;
    document.getElementById('FAsel').innerText = faculty;
    closeModal();

    updateCoreInfo(faculty);

    // รีเซ็ต div ทั้งหมดก่อน
    const scoreDivs = document.querySelectorAll('[id^="MSG"]');
    scoreDivs.forEach(div => {
        const key = div.id.replace('MSG', '');
        div.innerText = div.getAttribute('data-original-text') || div.innerText;
        div.classList.add('hidden');
        div.classList.remove('block');
        console.log(`Reset ${div.id} to original state`);
    });

    // จำลองข้อมูลคะแนนและน้ำหนัก
    const facultyData = {
        'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์ (แบบที่ 1)': {
            PointMin1: 44.148,
            PointMax1: 52.705,
            PointMin2: 44.066,
            PointMax2: 52.705,
            quantity: 60,
            PointMin1_68:43.908,
            PointMax1_68: 53.766,
            PointMin2_68: 42.863,
            PointMax2_68: 53.766,
            quantity_68 : 45,
            minimum_scores: {
                GPAX: 2.75,
                CDM: 12,
                CDS: 6,
                CDE: 6,
            },
            weights: {
                gpx: 20.00,
                Tgat: 30.00,
                AL1: 20.00,
                ALphy: 10.00,
                ALchm: 10.00,
                ALbio: 10.00
            }
         },
        'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์ (แบบที่ 2)': {
            PointMin1: 52.173,
            PointMax1: 56.023,
            PointMin2: 52.173,
            PointMax2: 56.023,
            quantity: 5,
            PointMin1_68: 52.943,
            PointMax1_68: 59.261,
            PointMin2_68: 52.388,
            PointMax2_68: 59.261,
            quantity_68 : 5,
            minimum_scores: {
                GPAX: 2.75,
                CDM: 12,
                CDS: 6,
                CDE: 6,
            },
            weights: {
                gpx: 20.00,
                Tpat3: 30.00,
                AL1: 20.00,
                ALsci: 30.00,
            }
        }
        
    };

    const data = facultyData[faculty] || {};
    document.getElementById('mi1').innerText = data.PointMin1 || 'N/A';
    document.getElementById('mx1').innerText = data.PointMax1 || 'N/A';
    document.getElementById('mi2').innerText = data.PointMin2 || 'N/A';
    document.getElementById('mx2').innerText = data.PointMax2 || 'N/A';
    document.getElementById('rec').innerText = data.quantity || 'N/A';
    document.getElementById('mi1_68').innerText = data.PointMin1_68 || 'N/A';
    document.getElementById('mx1_68').innerText = data.PointMax1_68  || 'N/A';
    document.getElementById('mi2_68').innerText = data.PointMin2_68  || 'N/A';
    document.getElementById('mx2_68').innerText = data.PointMax2_68  || 'N/A';
    document.getElementById('rec_68').innerText = data.quantity_68  || 'N/A';

    const minimumScores = data.minimum_scores || {};
    console.log('Minimum scores:', minimumScores);

    const scoreMessages = {
        'CDM': 'จน.หน่วยกิตต่ำสุดกลุ่มสาระฯ คณิตศาสตร์ ขั้นต่ำ {CDM}',
        'CDS': 'จน.หน่วยกิตต่ำสุดกลุ่มสาระฯ วิทยาศาสตร์และเทคโนโลยี {CDS}',
        'CDE': 'จน.หน่วยกิตต่ำสุดกลุ่มสาระฯ ภาษาต่างประเทศ {CDE}',
        'GPAX': 'คะแนนผลการเรียนขั้นต่ำ {GPAX}',
        'MSTG1': 'TGAT1-อังกฤษ ขั้นต่ำ {MSTG1}',
        'MSTG2': 'TGAT2-คิดเหตุผล ขั้นต่ำ {MSTG2}',
        'MSTG3': 'TGAT3-สมรรถนะ ขั้นต่ำ {MSTG3}',
        'MSTG': 'TGAT ขั้นต่ำ {MSTG}',
        'MSTP1': 'TPAT1-เชาว์ ขั้นต่ำ {MSTP1}',
        'MSTP2': 'TPAT2-ความถนัดศิลปกรรมศาสตร์ ขั้นต่ำ {MSTP2}',
        'MSTP3': 'TPAT3-ความถนัดด้านวิทยาศาสตร์ เทคโนโลยีฯ ขั้นต่ำ {MSTP3}',
        'MSTP4': 'TPAT4-สถาปัตย์ ขั้นต่ำ {MSTP4}',
        'MSTP5': 'TPAT5-ครู ขั้นต่ำ {MSTP5}',
        'MSAMath1': 'A-Level-คณิต1 ขั้นต่ำ {MSAMath1}',
        'MSAMath2': 'A-Level-คณิต2 ขั้นต่ำ {MSAMath2}',
        'MSASci': 'A-Level-วิทย์ประยุกต์ ขั้นต่ำ {MSASci}',
        'MSAPhy': 'A-Level-ฟิสิกส์ ขั้นต่ำ {MSAPhy}',
        'MSAChe': 'A-Level-เคมี ขั้นต่ำ {MSAChe}',
        'MSABio': 'A-Level-ชีววิทยา ขั้นต่ำ {MSABio}',
        'MSASoci': 'A-Level-สังคมศึกษา ขั้นต่ำ {MSASoci}',
        'MSAThai': 'A-Level-ภาษาไทย ขั้นต่ำ {MSAThai}',
        'MSAEnglish': 'A-Level-อังกฤษ ขั้นต่ำ {MSAEnglish}',
        'MSAFrench': 'A-Level-ฝรั่งเศส ขั้นต่ำ {MSAFrench}',
        'MSAGerman': 'A-Level-เยอรมัน ขั้นต่ำ {MSAGerman}',
        'MSAJapan': 'A-Level-ญี่ปุ่น ขั้นต่ำ {MSAJapan}',
        'MSAKorean': 'A-Level-เกาหลี ขั้นต่ำ {MSAKorean}',
        'MSAchinese': 'A-Level-จีน ขั้นต่ำ {MSAchinese}',
        'MSASpanish': 'A-Level-สเปน ขั้นต่ำ {MSASpanish}',
        'MSABali': 'A-Level-บาลี ขั้นต่ำ {MSABali}',
        'MSIELTS': 'IELTS ขั้นต่ำ {MSIELTS}',
        'MSTOEFLIBT': 'TOEFL iBT ขั้นต่ำ {MSTOEFLIBT}',
        'MSTOEFLPBT': 'TOEFL PBT ขั้นต่ำ {MSTOEFLPBT}',
        'MSTOEFLCBT': 'TOEFL CBT ขั้นต่ำ {MSTOEFLCBT}',
        'MSSEC': 'ผลรวม A-Level-ฟิสิกส์ เคมี ชีวะ ขั้นต่ำ {MSSEC}',
        'MS1PCBE': 'ผลรวม A-Level-คณิต 1 ฟิสิกส์ เคมี ชีววิทยา ภาษาอังกฤษ ขั้นต่ำ {MS1PCBE}',
    };

    for (const [key, value] of Object.entries(minimumScores)) {
        const divId = `MSG${key}`;
        const divElement = document.getElementById(divId);
        if (divElement) {
            console.log(`Processing ${divId} with key ${key}, value: ${value}`);
            if (value > 0) {
                const originalText = scoreMessages[key] || divElement.innerText;
                divElement.setAttribute('data-original-text', originalText);
                divElement.innerText = originalText.replace(`{${key}}`, value.toFixed(2));
                divElement.classList.remove('hidden');
                divElement.classList.add('block');
                console.log(`Updated ${divId} to: ${divElement.innerText}`);
            } else {
                divElement.classList.add('hidden');
                divElement.classList.remove('block');
                console.log(`Hid ${divId}, value <= 0`);
            }
        } else {
            console.error(`Div ${divId} not found`);
        }
    }

    // รีเซ็ต div สูตรการคำนวณ
    const weightDivs = document.querySelectorAll('[id="gpx_weg"], [id^="Tgat"], [id^="Tpat"], [id^="AL"]');
    weightDivs.forEach(div => {
        div.innerText = div.getAttribute('data-original-text') || div.innerText;
        div.classList.add('hidden');
        div.classList.remove('block');
        console.log(`Reset ${div.id} to original state`);
    });

    // ตั้งค่าน้ำหนัก
    weights = data.weights || {};
    calculateScore();

    const weightDivsList = [
        { id: 'gpx_weg', label: 'คะแนนผลการเรียน', key: 'gpx' },
        { id: 'Tgat_weg', label: 'TGAT', key: 'Tgat' },
        { id: 'Tgat1_weg', label: 'TGAT1-อังกฤษ', key: 'Tgat1' },
        { id: 'Tgat2_weg', label: 'TGAT2-คิดเหตุผล', key: 'Tgat2' },
        { id: 'Tgat3_weg', label: 'TGAT3-สมรรถนะ', key: 'Tgat3' },
        { id: 'Tpat1_weg', label: 'TPAT1-เชาว์', key: 'Tpat1' },
        { id: 'Tpat2_weg', label: 'TPAT2-ความถนัดศิลปกรรมศาสตร์', key: 'Tpat2' },
        { id: 'Tpat3_weg', label: 'TPAT3-ความถนัดด้านวิทยาศาสตร์ เทคโนโลยีฯ', key: 'Tpat3' },
        { id: 'Tpat4_weg', label: 'TPAT4-สถาปัตย์', key: 'Tpat4' },
        { id: 'Tpat5_weg', label: 'TPAT5-ครู', key: 'Tpat5' },
        { id: 'AL1_weg', label: 'A-Level-คณิต1', key: 'AL1' },
        { id: 'AL2_weg', label: 'A-Level-คณิต2', key: 'AL2' },
        { id: 'ALsci_weg', label: 'A-Level-วิทย์ประยุกต์', key: 'ALsci' },
        { id: 'ALphy_weg', label: 'A-Level-ฟิสิกส์', key: 'ALphy' },
        { id: 'ALchm_weg', label: 'A-Level-เคมี', key: 'ALchm' },
        { id: 'ALbio_weg', label: 'A-Level-ชีววิทยา', key: 'ALbio' },
        { id: 'ALscd_weg', label: 'A-Level-สังคมศึกษา', key: 'ALscd' },
        { id: 'ALthi_weg', label: 'A-Level-ภาษาไทย', key: 'ALthi' },
        { id: 'ALeng_weg', label: 'A-Level-อังกฤษ', key: 'ALeng' },
        { id: 'ALfan_weg', label: 'A-Level-ฝรั่งเศส', key: 'ALfan' },
        { id: 'ALger_weg', label: 'A-Level-เยอรมัน', key: 'ALger' },
        { id: 'ALjap_weg', label: 'A-Level-ญี่ปุ่น', key: 'ALjap' },
        { id: 'ALkor_weg', label: 'A-Level-เกาหลี', key: 'ALkor' },
        { id: 'ALchi_weg', label: 'A-Level-จีน', key: 'ALchi' },
        { id: 'ALsph_weg', label: 'A-Level-สเปน', key: 'ALsph' },
        { id: 'ALbai_weg', label: 'A-Level-บาลี', key: 'ALbai' },
        { id: 'SEC_weg', label: 'ผลรวม A-Level-ฟิสิกส์ เคมี ชีวะ', key: 'SEC' },
        { id: 'PCBE1_weg', label: 'ผลรวม A-Level-คณิต 1 ฟิสิกส์ เคมี ชีววิทยา ภาษาอังกฤษ', key: 'PCBE1' }
    ];

    weightDivsList.forEach(div => {
        const divElement = document.getElementById(div.id);
        if (divElement) {
            const originalText = `${div.label} {${div.key}}`;
            divElement.setAttribute('data-original-text', originalText);
            const weight = weights[div.key] || 0;
            console.log(`Processing ${div.id} with key ${div.key}, weight: ${weight}`);
            if (weight > 0) {
                divElement.innerText = originalText.replace(`{${div.key}}`, weight.toFixed(2) + " %");
                divElement.classList.remove('hidden');
                divElement.classList.add('block');
                console.log(`Updated ${div.id} to: ${divElement.innerText}`);
            } else {
                divElement.classList.add('hidden');
                divElement.classList.remove('block');
                console.log(`Hid ${div.id}, weight <= 0`);
            }
        } else {
            console.error(`Div ${div.id} not found`);
        }
    });
}

function showResult() {
    const ggElement = document.getElementById('GG');
    if (ggElement) {
        ggElement.classList.remove('hidden');
        ggElement.classList.add('block');
        console.log('Result section shown');
    }
}

function updateCoreInfo(faculty) {
    const coreInfo = {
        core: { img: 'img/check.png', text: 'ผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง' },
        international: { img: 'img/No.png', text: 'ผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ' },
        vocation: { img: 'img/No.png', text: 'ผู้สมัครที่จบจาก รร. หลักสูตรอาชีวศึกษา' },
        nfe: { img: 'img/No.png', text: 'ผู้สมัครที่จบจาก รร. หลักสูตรตามอัธยาศัย (กศน.)' },
        ged: { img: 'img/No.png', text: 'ผู้สมัครที่จบหลักสูตร GED' }
    };

    console.log('Core Info received:', coreInfo);
    for (const key in coreInfo) {
        const el = document.getElementById(key);
        if (!el) {
            console.warn(`Element with id "${key}" not found.`);
            continue;
        }

        const img = el.querySelector('img');
        const textDiv = el.querySelector('div');

        if (img) img.src = coreInfo[key].img;
        if (textDiv) textDiv.textContent = coreInfo[key].text;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const keys = [
        "gpx", "Tgat1", "Tgat2", "Tgat3",
        "Tpat1", "Tpat12", "Tpat13", "Tpat21", "Tpat22", "Tpat23",
        "Tpat3", "Tpat4", "Tpat5",
        "AL1", "AL2", "ALsci", "ALphy", "ALchm", "ALbio", "ALscd", "ALthi", "ALeng",
        "ALfan", "ALger", "ALjap", "ALkor", "ALchi", "ALbai", "ALsph"
    ];

    keys.forEach(key => {
        const el = document.getElementById("in" + key);
        if (el) el.value = localStorage.getItem(key) || "";
    });

    document.querySelectorAll("input[id^='in']").forEach(input => {
        input.addEventListener("input", calculateScore);
    });
});

function calculateScore() {
    const getVal = id => parseFloat(document.getElementById(id)?.value || 0);
    const getWeight = id => weights[id] || 0;

    // ข้อมูลคะแนน
    const gpx = getVal("ingpx");
    const Tgat1 = getVal("inTgat1");
    const Tgat2 = getVal("inTgat2");
    const Tgat3 = getVal("inTgat3");
    const Tgat = (Tgat1 + Tgat2 + Tgat3) / 3;

    const Tpat1 = getVal("inTpat1");
    const Tpat12 = getVal("inTpat12");
    const Tpat13 = getVal("inTpat13");
    const Tpat21 = getVal("inTpat21");
    const Tpat22 = getVal("inTpat22");
    const Tpat23 = getVal("inTpat23");
    const Tpat3 = getVal("inTpat3");
    const Tpat4 = getVal("inTpat4");
    const Tpat5 = getVal("inTpat5");

    const AL1 = getVal("inAL1");
    const AL2 = getVal("inAL2");
    const ALsci = getVal("inALsci");
    const ALphy = getVal("inALphy");
    const ALchm = getVal("inALchm");
    const ALbio = getVal("inALbio");
    const ALscd = getVal("inALscd");
    const ALthi = getVal("inALthi");
    const ALeng = getVal("inALeng");
    const ALfan = getVal("inALfan");
    const ALger = getVal("inALger");
    const ALjap = getVal("inALjap");
    const ALkor = getVal("inALkor");
    const ALchi = getVal("inALchi");
    const ALbai = getVal("inALbai");
    const ALsph = getVal("inALsph");

    let total = 0;
    const items = [
        { key: "gpx", score: gpx / 4, weight: getWeight("gpx") },
        { key: "Tgat", score: Tgat / 100, weight: getWeight("Tgat") },
        { key: "Tgat1", score: Tgat1 / 100, weight: getWeight("Tgat1") },
        { key: "Tgat2", score: Tgat2 / 100, weight: getWeight("Tgat2") },
        { key: "Tgat3", score: Tgat3 / 100, weight: getWeight("Tgat3") },
        { key: "Tpat1", score: (Tpat1 + Tpat12 + Tpat13) / 300, weight: getWeight("Tpat1") },
        { key: "Tpat2", score: (Tpat21 + Tpat22 + Tpat23) / 300, weight: getWeight("Tpat2") },
        { key: "Tpat3", score: Tpat3 / 100, weight: getWeight("Tpat3") },
        { key: "Tpat4", score: Tpat4 / 100, weight: getWeight("Tpat4") },
        { key: "Tpat5", score: Tpat5 / 100, weight: getWeight("Tpat5") },
        { key: "AL1", score: AL1 / 100, weight: getWeight("AL1") },
        { key: "AL2", score: AL2 / 100, weight: getWeight("AL2") },
        { key: "ALsci", score: ALsci / 100, weight: getWeight("ALsci") },
        { key: "ALphy", score: ALphy / 100, weight: getWeight("ALphy") },
        { key: "ALchm", score: ALchm / 100, weight: getWeight("ALchm") },
        { key: "ALbio", score: ALbio / 100, weight: getWeight("ALbio") },
        { key: "ALscd", score: ALscd / 100, weight: getWeight("ALscd") },
        { key: "ALthi", score: ALthi / 100, weight: getWeight("ALthi") },
        { key: "ALeng", score: ALeng / 100, weight: getWeight("ALeng") },
        { key: "ALfan", score: ALfan / 100, weight: getWeight("ALfan") },
        { key: "ALger", score: ALger / 100, weight: getWeight("ALger") },
        { key: "ALjap", score: ALjap / 100, weight: getWeight("ALjap") },
        { key: "ALkor", score: ALkor / 100, weight: getWeight("ALkor") },
        { key: "ALchi", score: ALchi / 100, weight: getWeight("ALchi") },
        { key: "ALbai", score: ALbai / 100, weight: getWeight("ALbai") },
        { key: "ALsph", score: ALsph / 100, weight: getWeight("ALsph") },
        { key: "SEC", score: (ALphy + ALchm + ALbio) / 300, weight: getWeight("SEC") },
        { key: "PCBE1", score: (AL1 + ALphy + ALchm + ALbio + ALeng) / 500, weight: getWeight("PCBE1") }
    ];

    console.log("=========== รายการคำนวณคะแนน ==========");
    items.forEach(({ key, score, weight }) => {
        const part = score * weight;
        console.log(`${key}: (${score.toFixed(4)} × ${weight.toFixed(2)}) = ${part.toFixed(2)}`);
        total += part;
    });

    const resultBox = document.getElementById("SCX");
    if (resultBox) {
        resultBox.innerText = total.toFixed(2);
        console.log("💯 คะแนนรวมทั้งหมด:", total.toFixed(2));
    }
}

function savedata() {
    const keys = ["gpx", "Tgat1", "AL1", "ALsci", "ALeng"];
    keys.forEach(key => {
        const el = document.getElementById("in" + key);
        if (el) localStorage.setItem(key, el.value);
    });
    alert('บันทึกข้อมูลเรียบร้อย');
}

function setdata() {
    const keys = ["gpx", "Tgat1", "AL1", "ALsci", "ALeng"];
    keys.forEach(key => {
        const el = document.getElementById("in" + key);
        if (el) {
            el.value = "";
            localStorage.removeItem(key);
        }
    });
    calculateScore();
    alert('รีเซ็ทข้อมูลเรียบร้อย');
}