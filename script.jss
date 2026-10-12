/**
 * GRURU MUSEUM — Interactive Engine & Knowledge Graph Controller
 * Theme: "New Knowledge. New Storytelling. Built for Everyday Living."
 * Concept: Future Archaeology (Modern Art Gallery × Sci-Fi Lab)
 */

document.addEventListener('DOMContentLoaded', () => {
  initAudioEngine();
  initHeroConstellation();
  initDataBoomingLab();
  initKnowledgeGraph();
  initEverydayLab();
  initMobileMenu();
});

// ============================================================================
// 1. SCI-FI AUDIO ENGINE (Web Audio API Synthesizer)
// ============================================================================
let audioCtx = null;
let soundEnabled = true;

function initAudioEngine() {
  const soundBtn = document.getElementById('soundToggleBtn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundBtn.innerHTML = soundEnabled ? '🔊 SOUND: ON' : '🔇 SOUND: OFF';
      soundBtn.classList.toggle('text-[#D7FF3A]', soundEnabled);
      soundBtn.classList.toggle('text-[#8A8A9E]', !soundEnabled);
    });
  }
}

function playBeep(freq = 600, duration = 0.08, type = 'sine') {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio context not allowed until interaction
  }
}

function playBoomSound() {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.45);

    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
  } catch (e) {}
}

// ============================================================================
// 2. HERO CONSTELLATION CANVAS
// ============================================================================
function initHeroConstellation() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 120 };

  function resize() {
    width = canvas.parentElement.clientWidth;
    height = canvas.parentElement.clientHeight;
    canvas.width = width;
    canvas.height = height;
    initParticles();
  }

  function initParticles() {
    particles = [];
    const count = Math.floor((width * height) / 12000);
    const colors = ['#2EE6FF', '#8C6BFF', '#FF5A1F', '#D7FF3A'];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    } else {
      mouse.x = null;
      mouse.y = null;
    }
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse gentle interaction
      if (mouse.x !== null) {
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          p.x -= (dx / dist) * 0.8;
          p.y -= (dy / dist) * 0.8;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 90) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(44, 44, 58, ${1 - dist / 90})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(render);
  }
  render();
}

// ============================================================================
// 3. INTERACTIVE DATA BOOMING LAB (Signature Feature)
// ============================================================================
const boomingDatasets = {
  lotus: {
    core: {
      id: "BOOM-01",
      title_th: "บัวหลวง (Sacred Lotus)",
      title_en: "Nelumbo nucifera",
      category: "Culture & Nature",
      era: "สุโขทัย – ปัจจุบัน",
      year: "1238–2026",
      summary: "พืชศักดิ์สิทธิ์ในพุทธศิลป์และวิถีชีวิตไทย โครงสร้างนาโนของผิวใบบัวสร้างปรากฏการณ์ Lotus Effect นำสู่การพัฒนานาโนเทคโนโลยีป้องกันน้ำและสีทาบ้านทำความสะอาดตัวเอง",
      takeaway: "การเรียนรู้สัจธรรมจากธรรมชาติ: บัวไม่เปียกน้ำ สะท้อนถึงการนำนวัตกรรมชีวภาพมาแก้ปัญหาเคมีภัณฑ์สังเคราะห์ในชีวิตประจำวัน",
      source: "จดหมายเหตุสุโขทัย & Journal of Bionic Engineering 2024"
    },
    branches: [
      { name: "ปรากฏการณ์ Lotus Effect", cat: "วิทยาศาสตร์", color: "#2EE6FF", shape: "circle", desc: "พื้นผิวจุลภาคไฮโดรโฟบิก (Hydrophobic nanostructure)" },
      { name: "พุทธศิลป์ลวดลายบัวบาน", cat: "ศิลปะ/วัฒนธรรม", color: "#FF5FA2", shape: "ring", desc: "ฐานชุกชีและบัวคว่ำบัวหงายในสถาปัตยกรรมไทย" },
      { name: "ตำรับยาเกสรทั้งห้า", cat: "ภูมิปัญญา/สุขภาพ", color: "#34E89E", shape: "diamond", desc: "เกสรบัวหลวงบำรุงหัวใจและระบบประสาท" },
      { name: "เส้นใยบัวทอผ้าธรรมชาติ", cat: "เทคโนโลยีสิ่งทอ", color: "#8C6BFF", shape: "square", desc: "นวัตกรรมเส้นใยย่อยสลายได้ทางชีวภาพแทนโพลีเอสเตอร์" },
      { name: "การบำบัดน้ำเสียชีวภาพ", cat: "ธรรมชาติ/นิเวศ", color: "#34E89E", shape: "diamond", desc: "การดูดซับโลหะหนักในระบบนิเวศพื้นที่ชุ่มน้ำ" },
      { name: "สารสกัดแอนตี้ออกซิแดนท์", cat: "วิทยาศาสตร์อาหาร", color: "#2EE6FF", shape: "circle", desc: "ฟลาโวนอยด์และอัลคาลอยด์ในเม็ดบัวเสริมภูมิคุ้มกัน" },
      { name: "สัญลักษณ์จิตวิญญาณแห่งปัญญา", cat: "ประวัติศาสตร์", color: "#FF5A1F", shape: "hexagon", desc: "ความหมายของดอกบัว 4 เหล่าในศิลาจารึกโบราณ" },
      { name: "วัสดุอวกาศกันคราบ", cat: "เทคโนโลยีแห่งอนาคต", color: "#8C6BFF", shape: "square", desc: "การจำลองสารเคลือบกระจกโซลาร์เซลล์บนดาวอังคาร" }
    ]
  },
  narai: {
    core: {
      id: "BOOM-02",
      title_th: "ตำรับยาโอสถพระนารายณ์",
      title_en: "King Narai Pharmacopoeia",
      category: "History & Science",
      era: "อยุธยา (สมเด็จพระนารายณ์)",
      year: "1656–1688",
      summary: "สมุดข่อยการแพทย์ที่บันทึกการสังเคราะห์สมุนไพรไทย จีน เปอร์เซีย และการแพทย์ยุโรป เป็นจุดบรรจบของการทูต วิทยาศาสตร์ และภูมิปัญญาการรักษาโรค",
      takeaway: "การบูรณาการความรู้ข้ามวัฒนธรรม: การเปิดรับวิทยาการใหม่ควบคู่กับการอนุรักษ์สมุนไพรพื้นถิ่น ทำให้เกิดภูมิคุ้มกันทางสาธารณสุขที่ยั่งยืน",
      source: "คลังสมุดไทย หอสมุดแห่งชาติ & กรมการแพทย์แผนไทยและการแพทย์ทางเลือก"
    },
    branches: [
      { name: "น้ำมันมหาจักร", cat: "ภูมิปัญญาแพทย์", color: "#FFC233", shape: "triangle", desc: "ตำรับน้ำมันทาถอนพิษอักเสบและคลายกล้ามเนื้อ" },
      { name: "พิกัดโกฐและเทียน", cat: "ประวัติศาสตร์การค้า", color: "#FF5A1F", shape: "hexagon", desc: "เครื่องเทศจากเส้นทางสายไหมทางทะเลและเปอร์เซีย" },
      { name: "AI ถอดรหัสสารพฤกษเคมี", cat: "เทคโนโลยี AI", color: "#8C6BFF", shape: "square", desc: "การใช้ Machine Learning คัดกรองตัวยาในสมุนไพร 81 ชนิด" },
      { name: "ยาหอมนวโกฐ", cat: "ธรรมชาติ/สุขภาพ", color: "#34E89E", shape: "diamond", desc: "กระตุ้นการไหลเวียนเลือดและบำรุงประสาทส่วนปลาย" },
      { name: "หมอหลวงเยซูอิต (De Bourges)", cat: "ประวัติศาสตร์", color: "#FF5A1F", shape: "hexagon", desc: "การแลกเปลี่ยนความรู้ระหว่างแพทย์ฝรั่งเศสและแพทย์หลวง" },
      { name: "มาตรฐานโอสถกรรมสากล", cat: "วิทยาศาสตร์", color: "#2EE6FF", shape: "circle", desc: "การทดสอบระดับโมเลกุลตามมาตรฐาน WHO & FDA" },
      { name: "โภชนาการปรับธาตุตามฤดูกาล", cat: "วิถีชีวิตประจำวัน", color: "#34E89E", shape: "diamond", desc: "การบริโภคอาหารตามธาตุเจ้าเรือนเพื่อป้องกัน NCDs" },
      { name: "สารสกัดไพลต้านการอักเสบ", cat: "ชีวเภสัชกรรม", color: "#2EE6FF", shape: "circle", desc: "สาร Curcuminoids และ DMPBD ในการรักษาข้อเสื่อม" }
    ]
  },
  sridphongs: {
    core: {
      id: "BOOM-03",
      title_th: "ทำนบพระร่วงและสรีดภงส์",
      title_en: "Sukhothai Ancient Hydraulic System",
      category: "Tech & History",
      era: "สุโขทัย",
      year: "1238–1438",
      summary: "ระบบวิศวกรรมชลประทานโบราณ กักเก็บน้ำจากเทือกเขาหลวงผ่านทำนบดิน ระบายเข้าสู่คูเมืองและตระพังพระอาราม เพื่อการเกษตรและอุปโภคบริโภคตลอดทั้งปี",
      takeaway: "การออกแบบเมืองยืดหยุ่น (Resilient City): การใช้แรงโน้มถ่วงและบึงหน่วงน้ำธรรมชาติ ดีกว่าการสร้างสิ่งปลูกสร้างขวางทางน้ำ",
      source: "กรมศิลปากร และ สถาบันวิจัยดาราศาสตร์และภูมิสารสนเทศ"
    },
    branches: [
      { name: "หลักชลศาสตร์แรงโน้มถ่วง", cat: "วิทยาศาสตร์", color: "#2EE6FF", shape: "circle", desc: "การคำนวณระดับความชันเพื่อให้น้ำไหลสม่ำเสมอไม่กัดเซาะ" },
      { name: "ตระพังเก็บน้ำในเมือง", cat: "ผังเมืองโบราณ", color: "#FF5A1F", shape: "hexagon", desc: "อ่างเก็บน้ำกระจายตัวทำหน้าที่เป็นแก้มลิงและลดเกาะความร้อน" },
      { name: "IoT เซนเซอร์จัดการน้ำยุคใหม่", cat: "เทคโนโลยีอัจฉริยะ", color: "#8C6BFF", shape: "square", desc: "การถอดแบบโครงสร้างโบราณสู่ Smart Water Grid เมืองอัจฉริยะ" },
      { name: "คันดินซับแรงกระแทก", cat: "วิศวกรรมปฐพี", color: "#8C6BFF", shape: "square", desc: "โครงสร้างดินบดอัดโบราณที่ทนต่อน้ำหลากกว่า 700 ปี" },
      { name: "ศิลาจารึกพ่อขุนรามคำแหง", cat: "จดหมายเหตุ", color: "#FF5A1F", shape: "hexagon", desc: "หลักฐานบันทึก 'เบื้องหัวนอนเมืองสุโขทัยนี้ มีกุฎีพิหารปู่ครู...'" },
      { name: "ระบบนิเวศพืชกรองน้ำ", cat: "ธรรมชาติ/บำบัด", color: "#34E89E", shape: "diamond", desc: "การใช้กกและบัวกรองตะกอนธรรมชาติก่อนน้ำเข้าสู่เมือง" },
      { name: "การรับมือภัยแล้งเอลนีโญ", cat: "วิถีชีวิตประจำวัน", color: "#34E89E", shape: "diamond", desc: "โมเดลเก็บน้ำชุมชนขนาดเล็กเพื่อรับมือวิกฤตสภาพภูมิอากาศ" },
      { name: "การจำลอง 3D GIS ภูมิประเทศ", cat: "เทคโนโลยีดิจิทัล", color: "#2EE6FF", shape: "circle", desc: "การใช้ LiDAR สแกนแนวคันดินโบราณใต้ผืนป่าสุโขทัย" }
    ]
  }
};

let currentBoomKey = 'lotus';
let boomNodes = [];
let boomLinks = [];
let boomRings = [];
let boomLevel = 0;
let isBooming = false;

function initDataBoomingLab() {
  const canvas = document.getElementById('labBoomCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;

  function resizeCanvas() {
    width = canvas.parentElement.clientWidth;
    height = canvas.parentElement.clientHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Topic selector buttons
  const topicButtons = document.querySelectorAll('.boom-topic-btn');
  topicButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      topicButtons.forEach(b => b.classList.remove('border-[#D7FF3A]', 'text-[#D7FF3A]', 'bg-[#17171F]'));
      btn.classList.add('border-[#D7FF3A]', 'text-[#D7FF3A]', 'bg-[#17171F]');
      currentBoomKey = btn.getAttribute('data-topic');
      resetBoomingLab();
    });
  });

  const boomTriggerBtn = document.getElementById('triggerBoomBtn');
  if (boomTriggerBtn) {
    boomTriggerBtn.addEventListener('click', triggerBoomBurst);
  }

  const resetBtn = document.getElementById('resetBoomBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetBoomingLab);
  }

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Check click on nodes
    for (let node of boomNodes) {
      const dx = clickX - node.x;
      const dy = clickY - node.y;
      if (Math.sqrt(dx * dx + dy * dy) <= node.radius + 6) {
        playBeep(880, 0.1);
        if (node.level === 0) {
          triggerBoomBurst();
        } else {
          openSpecimenModal(node);
        }
        return;
      }
    }
  });

  function resetBoomingLab() {
    resizeCanvas();
    const data = boomingDatasets[currentBoomKey];
    const cx = width / 2;
    const cy = height / 2;

    boomNodes = [{
      x: cx,
      y: cy,
      radius: 26,
      color: "#D7FF3A",
      label: data.core.title_th,
      subtext: "คลิกเพื่อ BOOM",
      level: 0,
      data: data.core
    }];
    boomLinks = [];
    boomRings = [];
    boomLevel = 0;
    isBooming = false;

    updateBoomLabHUD();
    playBeep(440, 0.05);
  }

  function triggerBoomBurst() {
    if (isBooming) return;
    const data = boomingDatasets[currentBoomKey];
    if (boomLevel >= 3) {
      resetBoomingLab();
      return;
    }

    boomLevel++;
    isBooming = true;
    playBoomSound();

    const cx = width / 2;
    const cy = height / 2;
    const branches = data.branches;
    const count = branches.length;
    const baseRadius = 110 * boomLevel;

    // Add glowing shockwave ring
    boomRings.push({
      x: cx, y: cy,
      radius: 15,
      maxRadius: baseRadius + 30,
      alpha: 1.0,
      color: "#D7FF3A"
    });

    // 40ms stagger per brief!
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const angle = (i / count) * Math.PI * 2 + (boomLevel * 0.35);
        const targetX = cx + Math.cos(angle) * (baseRadius + (i % 2 === 0 ? 15 : -15));
        const targetY = cy + Math.sin(angle) * (baseRadius + (i % 2 === 0 ? 15 : -15));
        const b = branches[i];

        const newNode = {
          x: targetX,
          y: targetY,
          radius: 14,
          color: b.color,
          label: b.name,
          level: boomLevel,
          category: b.cat,
          shape: b.shape,
          desc: b.desc,
          parent: boomNodes[0]
        };

        boomNodes.push(newNode);
        boomLinks.push({
          source: boomNodes[0],
          target: newNode,
          color: b.color
        });

        playBeep(520 + i * 40, 0.04);
        updateBoomLabHUD();

        if (i === count - 1) {
          isBooming = false;
        }
      }, i * 40);
    }
  }

  function updateBoomLabHUD() {
    const activeNodesEl = document.getElementById('boomActiveNodes');
    const edgesEl = document.getElementById('boomEdges');
    const depthEl = document.getElementById('boomDepth');
    const statusEl = document.getElementById('boomStatusText');

    if (activeNodesEl) activeNodesEl.innerText = boomNodes.length;
    if (edgesEl) edgesEl.innerText = boomLinks.length;
    if (depthEl) depthEl.innerText = `LEVEL 0${boomLevel}`;
    if (statusEl) {
      statusEl.innerText = boomLevel === 0 ? 'READY TO EXPLODE' : `EXPANDED (L${boomLevel})`;
      statusEl.className = boomLevel === 0 ? 'text-[#D7FF3A]' : 'text-[#2EE6FF]';
    }
  }

  // Animation render loop
  function render() {
    ctx.clearRect(0, 0, width, height);

    // Specimen grid background
    ctx.strokeStyle = "rgba(44, 44, 58, 0.3)";
    ctx.lineWidth = 1;
    const gs = 36;
    for (let x = 0; x < width; x += gs) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gs) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Expanding shockwaves
    for (let r of boomRings) {
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(215, 255, 58, ${r.alpha})`;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      r.radius += (r.maxRadius - r.radius) * 0.12;
      r.alpha -= 0.02;
    }
    boomRings = boomRings.filter(r => r.alpha > 0);

    // Links
    for (let link of boomLinks) {
      ctx.beginPath();
      ctx.moveTo(link.source.x, link.source.y);
      ctx.lineTo(link.target.x, link.target.y);
      ctx.strokeStyle = link.color || "rgba(215, 255, 58, 0.4)";
      ctx.lineWidth = 1.6;
      ctx.setLineDash([5, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Nodes
    for (let node of boomNodes) {
      // Glow
      ctx.shadowBlur = node.level === 0 ? 25 : 12;
      ctx.shadowColor = node.color;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();

      ctx.strokeStyle = "#0B0B0F";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.shadowBlur = 0; // reset

      // Node label
      ctx.font = node.level === 0 ? "bold 13px 'Chakra Petch'" : "11px 'IBM Plex Sans Thai'";
      ctx.fillStyle = "#F2EDE3";
      ctx.textAlign = "center";
      ctx.fillText(node.label, node.x, node.y + node.radius + 16);

      if (node.subtext && node.level === 0 && boomLevel === 0) {
        ctx.font = "10px 'IBM Plex Mono'";
        ctx.fillStyle = "#D7FF3A";
        ctx.fillText(`[ ${node.subtext} ]`, node.x, node.y + node.radius + 30);
      }
    }

    requestAnimationFrame(render);
  }

  resetBoomingLab();
  render();
}

// ============================================================================
// 4. FULL KNOWLEDGE GRAPH CANVAS (Hall 02)
// ============================================================================
const sampleGraphData = [
  { id: "G01", name: "ตำรับยาโอสถพระนารายณ์", cat: "history", era: 1680, summary: "สมุดข่อยการแพทย์แผนไทยโบราณ ผสานสมุนไพรตะวันออก-ตะวันตก" },
  { id: "G02", name: "การกลั่นน้ำมันไพล", cat: "science", era: 1750, summary: "ภูมิปัญญาการสกัดสารออกฤทธิ์ทางชีวภาพต้านการอักเสบ" },
  { id: "G03", name: "ทำนบพระร่วง สรีดภงส์", cat: "tech", era: 1280, summary: "ระบบชลประทานดินบดอัดโบราณจัดการน้ำหลาก" },
  { id: "G04", name: "ดาราศาสตร์สุริยุปราคาหว้ากอ", cat: "science", era: 1868, summary: "การคำนวณตำแหน่งดวงดาวและคณิตศาสตร์ระดับชาติ" },
  { id: "G05", name: "ลายกนกและบัวคว่ำบัวหงาย", cat: "art", era: 1350, summary: "สุนทรียศาสตร์เรขาคณิตศักดิ์สิทธิ์ในพุทธศิลป์ไทย" },
  { id: "G06", name: "บัวหลวง นาโนไฮโดรโฟบิก", cat: "nature", era: 2026, summary: "การเลียนแบบโครงสร้างใบบัวสู่เทคโนโลยีกันน้ำระดับโมเลกุล" },
  { id: "G07", name: "สมุนไพรฟ้าทะลายโจร", cat: "nature", era: 1800, summary: "สารแอนโดรกราโฟไลด์กับการยับยั้งไวรัสทางเดินหายใจ" },
  { id: "G08", name: "ศิลาจารึกหลักที่ 1", cat: "culture", era: 1292, summary: "บันทึกเศรษฐกิจ การค้าเสรี และภาษาไทยยุคแรก" },
  { id: "G09", name: "การต่อเรือสำเภาสยาม", cat: "tech", era: 1550, summary: "วิศวกรรมการเดินเรือสมุทรและการพาณิชย์ทางทะเลข้ามทวีป" },
  { id: "G10", name: "AI Semantic Knowledge Graph", cat: "tech", era: 2026, summary: "การเชื่อมโยงคลังข้อมูลภูมิปัญญาไทยสู่ระบบประมวลผล AI" },
  { id: "G11", name: "ภูมิปัญญาเกลือสินเธาว์อีสาน", cat: "culture", era: 1100, summary: "อุตสาหกรรมเกลือโบราณรากฐานอารยธรรมแอ่งโคราช" },
  { id: "G12", name: "การถลุงโลหะสัมฤทธิ์บ้านเชียง", cat: "history", era: 1000, summary: "เทคโนโลยีโลหกรรมยุคก่อนประวัติศาสตร์ 4,000 ปี" }
];

const categoryColors = {
  science: "#2EE6FF",
  history: "#FF5A1F",
  tech: "#8C6BFF",
  culture: "#FFC233",
  nature: "#34E89E",
  art: "#FF5FA2"
};

function initKnowledgeGraph() {
  const canvas = document.getElementById('kgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let nodes = [];
  let links = [];
  let filterCat = 'all';
  let searchQuery = '';

  function resize() {
    width = canvas.parentElement.clientWidth;
    height = canvas.parentElement.clientHeight;
    canvas.width = width;
    canvas.height = height;
    setupNodes();
  }

  function setupNodes() {
    nodes = [];
    links = [];
    const count = sampleGraphData.length;
    for (let i = 0; i < count; i++) {
      const item = sampleGraphData[i];
      const angle = (i / count) * Math.PI * 2;
      const radius = 120 + (i % 3) * 60;
      nodes.push({
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        radius: 12,
        color: categoryColors[item.cat] || '#D7FF3A',
        data: item
      });
    }

    // Connect some links
    for (let i = 0; i < nodes.length; i++) {
      const targetIdx = (i + 2) % nodes.length;
      links.push({
        source: nodes[i],
        target: nodes[targetIdx]
      });
    }
  }

  window.addEventListener('resize', resize);
  resize();

  // Search filter
  const searchInput = document.getElementById('kgSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase();
    });
  }

  // Category filter buttons
  const catButtons = document.querySelectorAll('.kg-cat-btn');
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('border-[#D7FF3A]', 'text-[#D7FF3A]'));
      btn.classList.add('border-[#D7FF3A]', 'text-[#D7FF3A]');
      filterCat = btn.getAttribute('data-cat');
      playBeep(640, 0.05);
    });
  });

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    for (let node of nodes) {
      const dx = clickX - node.x;
      const dy = clickY - node.y;
      if (Math.sqrt(dx * dx + dy * dy) <= node.radius + 6) {
        playBeep(920, 0.08);
        openSpecimenModal({
          label: node.data.name,
          category: node.data.cat.toUpperCase(),
          desc: node.data.summary,
          data: node.data
        });
        return;
      }
    }
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Links
    for (let link of links) {
      ctx.beginPath();
      ctx.moveTo(link.source.x, link.source.y);
      ctx.lineTo(link.target.x, link.target.y);
      ctx.strokeStyle = "rgba(44, 44, 58, 0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Nodes
    for (let node of nodes) {
      const matchesCat = filterCat === 'all' || node.data.cat === filterCat;
      const matchesSearch = !searchQuery || node.data.name.toLowerCase().includes(searchQuery);

      const isVisible = matchesCat && matchesSearch;

      ctx.beginPath();
      ctx.arc(node.x, node.y, isVisible ? node.radius : 6, 0, Math.PI * 2);
      ctx.fillStyle = isVisible ? node.color : "rgba(44, 44, 58, 0.3)";
      ctx.fill();

      if (isVisible) {
        ctx.strokeStyle = "#0B0B0F";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = "11px 'IBM Plex Sans Thai'";
        ctx.fillStyle = "#F2EDE3";
        ctx.textAlign = "center";
        ctx.fillText(node.data.name, node.x, node.y + node.radius + 14);
      }
    }

    requestAnimationFrame(render);
  }
  render();
}

// ============================================================================
// 5. EVERYDAY LAB & SPECIMEN MODAL INSPECTOR
// ============================================================================
function initEverydayLab() {
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBackdrop = document.getElementById('specimenModal');

  if (modalCloseBtn && modalBackdrop) {
    modalCloseBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
      }
    });
  }
}

function openSpecimenModal(node) {
  const modalBackdrop = document.getElementById('specimenModal');
  if (!modalBackdrop) return;

  const titleEl = document.getElementById('modalTitle');
  const catEl = document.getElementById('modalCategory');
  const codeEl = document.getElementById('modalCode');
  const descEl = document.getElementById('modalDesc');
  const takeawayEl = document.getElementById('modalTakeaway');
  const sourceEl = document.getElementById('modalSource');

  const title = node.data?.title_th || node.label || "วัตถุจัดแสดงความรู้";
  const cat = node.category || node.data?.category || "ทั่วไป";
  const code = node.data?.id || "GRM-2026-SPEC";
  const desc = node.desc || node.data?.summary || "ข้อมูลความรู้ที่ผ่านการขุดค้นและถอดรหัสจากคลังประวัติศาสตร์";
  const takeaway = node.data?.takeaway || "การนำภูมิปัญญาโบราณมาปรับใช้ในการดูแลตนเองและการทำงานในชีวิตประจำวัน";
  const source = node.data?.source || "หอจดหมายเหตุแห่งชาติ และ ฐานข้อมูลวิจัยกระทรวงดิจิทัลฯ";

  if (titleEl) titleEl.innerText = title;
  if (catEl) catEl.innerText = cat;
  if (codeEl) codeEl.innerText = code;
  if (descEl) descEl.innerText = desc;
  if (takeawayEl) takeawayEl.innerText = takeaway;
  if (sourceEl) sourceEl.innerText = source;

  modalBackdrop.classList.add('active');
}

// ============================================================================
// 6. MOBILE MENU & UTILITIES
// ============================================================================
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNavDrawer');
  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });
  }
}
