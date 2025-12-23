// ==========================
// Hamburger Toggle
// ==========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if(hamburger && navLinks){
    hamburger.addEventListener('click', ()=>{ navLinks.classList.toggle('show'); });
}

// ==========================
// Animate on Scroll
// ==========================
const animateElements = document.querySelectorAll('.animate, .section, footer, .gallery-container img');
function animateOnScroll(){
    const triggerBottom = window.innerHeight * 0.85;
    animateElements.forEach(el=>{
        const boxTop = el.getBoundingClientRect().top;
        if(boxTop < triggerBottom) el.classList.add('show');
    });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ==========================
// Gallery Category + Year Filtering
// ==========================
const categoryButtons = document.querySelectorAll('.category-btn');
const yearButtonsContainer = document.getElementById('year-buttons');
const galleryImages = document.querySelectorAll('.gallery-container img');
let currentCategory = '';
let currentYear = '';

categoryButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        categoryButtons.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;

        // Generate unique years for selected category
        const yearsSet = new Set();
        galleryImages.forEach(img=>{
            if(img.dataset.category===currentCategory) yearsSet.add(img.dataset.year);
        });
        const years = Array.from(yearsSet).sort();

        // Populate year buttons
        yearButtonsContainer.innerHTML = '';
        years.forEach(y=>{
            const yearBtn = document.createElement('button');
            yearBtn.classList.add('tab-btn');
            yearBtn.dataset.year = y;
            yearBtn.textContent = y;
            yearButtonsContainer.appendChild(yearBtn);

            yearBtn.addEventListener('click', ()=>{
                yearButtonsContainer.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
                yearBtn.classList.add('active');
                currentYear = y;

                galleryImages.forEach(img=>{
                    const show = img.dataset.category===currentCategory && img.dataset.year===currentYear;
                    img.style.display = show ? 'block' : 'none';
                    img.classList.remove('show');
                    if(show) setTimeout(()=>img.classList.add('show'),50);
                });
            });
        });
        yearButtonsContainer.style.display = 'flex';
        galleryImages.forEach(img=>img.style.display='none');
    });
});

// ==========================
// Lightbox
// ==========================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');
let galleryImgs = Array.from(document.querySelectorAll('.gallery-container img'));
let currentIndex=0;

function openLightbox(index){ currentIndex=index; lightbox.style.display='flex'; lightboxImg.src=galleryImgs[currentIndex].src; }
function closeLightbox(){ lightbox.style.display='none'; }

galleryImgs.forEach((img,index)=>{ img.addEventListener('click', ()=>{ openLightbox(index); }); });
closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', ()=>{ currentIndex=(currentIndex-1+galleryImgs.length)%galleryImgs.length; lightboxImg.src=galleryImgs[currentIndex].src; });
nextBtn.addEventListener('click', ()=>{ currentIndex=(currentIndex+1)%galleryImgs.length; lightboxImg.src=galleryImgs[currentIndex].src; });
lightbox.addEventListener('click', e=>{ if(e.target===lightbox) closeLightbox(); });
document.addEventListener('keydown', e=>{
    if(lightbox.style.display==='flex'){
        if(e.key==='ArrowLeft') prevBtn.click();
        if(e.key==='ArrowRight') nextBtn.click();
        if(e.key==='Escape') closeLightbox();
    }
});

// ==========================
// Donation Page: Copy GCash Number
// ==========================
function copyGCash() {
    const gcashNumber = document.getElementById('gcash-number');
    if(gcashNumber){
        navigator.clipboard.writeText(gcashNumber.textContent.trim()).then(()=>{
            alert('GCash number copied!');
        }).catch(err=>{
            console.error('Could not copy text: ', err);
        });
    }
}
