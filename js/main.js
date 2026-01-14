// User Setup
document.addEventListener('DOMContentLoaded', () => {
    

    // ==========================================
    // 1. INJECT MODALS
    // ==========================================
    const modalWrapperClass = "fixed inset-0 z-[9999] hidden";
    const backdropClass = "fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity opacity-0 modal-backdrop";
    const containerClass = "fixed inset-0 z-10 w-screen overflow-y-auto";
    const flexCenterClass = "flex min-h-full items-center justify-center p-4 text-center sm:p-0";
    const panelClass = "relative transform overflow-hidden rounded-2xl bg-white dark:bg-[#1e1e2d] text-left shadow-2xl transition-all w-[95%] max-w-md mx-auto border border-slate-200 dark:border-white/10 opacity-0 scale-95 my-8";

    // --- LOGIN MODAL ---
    const loginHTML = `
    <div id="loginModal" class="${modalWrapperClass}">
        <div class="${backdropClass}" onclick="closeAllModals()"></div>
        <div class="${containerClass}">
            <div class="${flexCenterClass}">
                <div class="${panelClass}">
                    <button type="button" onclick="closeAllModals()" class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition z-20">
                        <span class="material-symbols-rounded text-xl">close</span>
                    </button>
                    <div class="p-6 sm:p-8">
                        <div class="text-center mb-6">
                            <h1 class="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Welcome Back</h1>
                            <p class="text-sm text-slate-500 dark:text-slate-400">Login to your AI Voice Console</p>
                        </div>
                        <div id="loginError" class="hidden mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center font-bold">Please fill in all fields</div>
                        <div class="space-y-4">
                            <input type="email" id="loginEmail" class="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#111118] border border-slate-200 dark:border-[#292839] text-slate-900 dark:text-white outline-none focus:border-primary text-base" placeholder="Email Address *" />
                            <input type="password" id="loginPass" class="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#111118] border border-slate-200 dark:border-[#292839] text-slate-900 dark:text-white outline-none focus:border-primary text-base" placeholder="Password *" />
                            <div class="text-right"><button type="button" onclick="openForgotPassword()" class="text-xs font-bold text-primary hover:underline py-2">Forgot Password?</button></div>
                            <button type="button" onclick="executeLogin()" id="btnLoginBtn" class="w-full py-3.5 rounded-xl bg-primary text-white font-bold shadow-glow hover:scale-95 transition text-base">Login</button>
                        </div>
                        <p class="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">Don’t have an account? <button type="button" onclick="openSignup()" class="text-primary font-bold hover:underline p-2">Sign up</button></p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    // --- SIGNUP MODAL ---
    const signupHTML = `
    <div id="signupModal" class="${modalWrapperClass}">
        <div class="${backdropClass}" onclick="closeAllModals()"></div>
        <div class="${containerClass}">
            <div class="${flexCenterClass}">
                <div class="${panelClass}">
                    <button type="button" onclick="closeAllModals()" class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition z-20">
                        <span class="material-symbols-rounded text-xl">close</span>
                    </button>
                    <div class="p-6 sm:p-8">
                        <div class="text-center mb-6"><h1 class="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Create Account</h1></div>
                        <div id="signupError" class="hidden mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center font-bold">Please fill in all fields</div>
                        <div class="space-y-4">
                            <input type="text" id="signupName" class="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#111118] border border-slate-200 dark:border-[#292839] text-slate-900 dark:text-white outline-none focus:border-primary text-base" placeholder="Full Name *" />
                            <input type="email" id="signupEmail" class="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#111118] border border-slate-200 dark:border-[#292839] text-slate-900 dark:text-white outline-none focus:border-primary text-base" placeholder="Email Address *" />
                            <input type="password" id="signupPass" class="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#111118] border border-slate-200 dark:border-[#292839] text-slate-900 dark:text-white outline-none focus:border-primary text-base" placeholder="Password *" />
                            <button type="button" onclick="executeSignup()" id="btnSignupBtn" class="w-full py-3.5 rounded-xl bg-primary text-white font-bold shadow-glow hover:scale-95 transition mt-2 text-base">Sign Up</button>
                        </div>
                        <p class="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">Already have an account? <button type="button" onclick="openLogin()" class="text-primary font-bold hover:underline p-2">Login</button></p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    // --- PROFILE MODAL ---
    const profileHTML = `
    <div id="profileModal" class="${modalWrapperClass}">
        <div class="${backdropClass}" onclick="closeAllModals()"></div>
        <div class="${containerClass}">
            <div class="${flexCenterClass}">
                <div class="${panelClass}">
                    <button type="button" onclick="closeAllModals()" class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition z-20">
                        <span class="material-symbols-rounded text-xl">close</span>
                    </button>
                    <div class="p-8 text-center">
                        <div class="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-6"><span id="profileAvatarLetter">U</span></div>
                        
                        <div id="profileViewMode">
                            <h2 id="profileName" class="text-2xl font-bold text-slate-900 dark:text-white mb-1">User Name</h2>
                            <p id="profileEmail" class="text-sm text-slate-500 dark:text-slate-400 mb-8 break-all">user@example.com</p>
                            <div class="space-y-3">
                                <button onclick="enableEditMode()" class="w-full py-3.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition">Edit Profile</button>
                                <button onclick="executeLogout()" class="w-full py-3.5 rounded-xl bg-red-500/10 text-red-500 font-bold hover:bg-red-500/20 transition flex items-center justify-center gap-2"><span class="material-symbols-rounded">logout</span> Log Out</button>
                            </div>
                        </div>

                        <div id="profileEditMode" class="hidden text-left">
                            <div class="space-y-4 mb-6">
                                <div><label class="text-xs font-bold text-slate-500 uppercase">Full Name</label><input type="text" id="editProfileName" class="w-full mt-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#111118] border border-slate-200 dark:border-[#292839] text-slate-900 dark:text-white outline-none focus:border-primary" /></div>
                                <div><label class="text-xs font-bold text-slate-500 uppercase">Email</label><input type="email" id="editProfileEmail" class="w-full mt-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#111118] border border-slate-200 dark:border-[#292839] text-slate-900 dark:text-white outline-none focus:border-primary" /></div>
                                <div class="pt-2 border-t border-slate-200 dark:border-white/10"><button onclick="triggerChangePasswordFromProfile()" class="text-sm font-bold text-primary hover:underline flex items-center gap-1 py-2"><span class="material-symbols-rounded text-base">lock</span> Change Password</button></div>
                            </div>
                            <div class="grid grid-cols-2 gap-3">
                                <button onclick="cancelEditMode()" class="py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-white/5">Cancel</button>
                                <button onclick="saveProfile()" class="py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    // --- FORGOT PASSWORD MODAL ---
    const forgotHTML = `
    <div id="forgotModal" class="${modalWrapperClass}">
        <div class="${backdropClass}" onclick="closeAllModals()"></div>
        <div class="${containerClass}">
            <div class="${flexCenterClass}">
                <div class="${panelClass}">
                    <button type="button" onclick="closeAllModals()" class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition z-20">
                        <span class="material-symbols-rounded text-xl">close</span>
                    </button>
                    <div class="p-8">
                        <div class="text-center mb-6"><h1 class="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Security Check</h1><p class="text-sm text-slate-500 dark:text-slate-400">Verify your identity</p></div>
                        <div id="otpStage1" class="space-y-4">
                            <div class="bg-blue-50 dark:bg-blue-500/10 p-4 rounded-xl text-sm text-blue-600 dark:text-blue-400 mb-4">We will send a One Time Password (OTP) to your email.</div>
                            <input type="email" id="otpEmail" class="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#111118] border border-slate-200 dark:border-[#292839] text-slate-900 dark:text-white outline-none focus:border-primary" placeholder="Enter your email" />
                            <button onclick="sendOTP()" id="btnSendOTP" class="w-full py-3.5 rounded-xl bg-primary text-white font-bold shadow-glow hover:scale-95 transition">Send OTP</button>
                        </div>
                        <div id="otpStage2" class="hidden space-y-4">
                            <div class="bg-green-50 dark:bg-green-500/10 p-4 rounded-xl text-sm text-green-600 dark:text-green-400 mb-4 text-center">OTP Sent! (Simulated: <strong>1234</strong>)</div>
                            <input type="text" id="otpInput" class="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#111118] border border-slate-200 dark:border-[#292839] text-slate-900 dark:text-white outline-none focus:border-primary tracking-widest text-center font-bold text-xl" placeholder="Enter OTP" maxlength="4" />
                            <input type="password" id="newPassword" class="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#111118] border border-slate-200 dark:border-[#292839] text-slate-900 dark:text-white outline-none focus:border-primary" placeholder="New Password" />
                            <button onclick="verifyAndReset()" id="btnVerifyOTP" class="w-full py-3.5 rounded-xl bg-primary text-white font-bold shadow-glow hover:scale-95 transition">Verify & Change</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    // Inject
    if (!document.getElementById('loginModal')) document.body.insertAdjacentHTML('beforeend', loginHTML);
    if (!document.getElementById('signupModal')) document.body.insertAdjacentHTML('beforeend', signupHTML);
    if (!document.getElementById('profileModal')) document.body.insertAdjacentHTML('beforeend', profileHTML);
    if (!document.getElementById('forgotModal')) document.body.insertAdjacentHTML('beforeend', forgotHTML);

    checkLoginState();
    setTimeout(checkLoginState, 100);

    // ==========================================
    // 5. MOBILE MENU LOGIC (WITH ICON TOGGLE)
    // ==========================================
    const mobileBtn = document.getElementById('btn-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu-dropdown');

    if (mobileBtn && mobileMenu) {
        const iconSpan = mobileBtn.querySelector('span');

        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = mobileMenu.classList.contains('hidden');
            
            // Toggle Menu
            mobileMenu.classList.toggle('hidden');
            
            // Toggle Icon: If we just showed the menu (was hidden), show 'close', else 'menu'
            if(iconSpan) iconSpan.innerText = isHidden ? 'close' : 'menu';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                if(iconSpan) iconSpan.innerText = 'menu'; // Reset icon
            }
        });
    }
});


// ==========================================
// 2. MODAL LOGIC
// ==========================================

function showModal(modal) {
    if(!modal) return;
    document.body.classList.add('overflow-hidden');
    modal.classList.remove('hidden');
    modal.querySelectorAll('[id$="Error"]').forEach(e => e.classList.add('hidden'));
    modal.querySelectorAll('input').forEach(i => i.classList.remove('border-red-500'));
    
    // Force Close Menu & Reset Icon
    document.getElementById('mobile-menu-dropdown')?.classList.add('hidden');
    const btnSpan = document.querySelector('#btn-mobile-menu span');
    if(btnSpan) btnSpan.innerText = 'menu';

    setTimeout(() => {
        const backdrop = modal.querySelector('.modal-backdrop');
        const panel = modal.querySelector('div[class*="relative transform"]');
        if(backdrop) backdrop.classList.remove('opacity-0');
        if(panel) { panel.classList.remove('opacity-0', 'scale-95'); panel.classList.add('opacity-100', 'scale-100'); }
    }, 10);
}

window.closeAllModals = function() {
    ['loginModal', 'signupModal', 'profileModal', 'forgotModal'].forEach(id => {
        const modal = document.getElementById(id);
        if(modal && !modal.classList.contains('hidden')) {
            const backdrop = modal.querySelector('.modal-backdrop');
            const panel = modal.querySelector('div[class*="relative transform"]');
            if(backdrop) backdrop.classList.add('opacity-0');
            if(panel) { panel.classList.remove('opacity-100', 'scale-100'); panel.classList.add('opacity-0', 'scale-95'); }
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    });
    document.body.classList.remove('overflow-hidden');
};

// ==========================================
// 3. AUTH LOGIC (MENU & ICON RESET)
// ==========================================

window.checkLoginState = function() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    const desktopGuest = document.getElementById('desktop-guest');
    const globalUser = document.getElementById('global-user');
    const mobileGuest = document.getElementById('mobile-guest');
    const mobileUser = document.getElementById('mobile-user');
    const mobileOnlyProfile = document.getElementById('mobile-only-profile');
    
    const nameDisplay = document.getElementById('user-name-display');
    const avatarLetter = document.getElementById('headerAvatarLetter');
    const mobileAvatarLetter = document.getElementById('mobileAvatarLetter');

    if (user && user.isLoggedIn) {
        // --- LOGGED IN ---
        if(desktopGuest) desktopGuest.style.setProperty('display', 'none', 'important');
        if(mobileGuest) mobileGuest.style.setProperty('display', 'none', 'important');

        if(globalUser) globalUser.style.removeProperty('display');
        if(mobileUser) {
            mobileUser.style.removeProperty('display');
            mobileUser.classList.remove('hidden');
            mobileUser.style.display = 'flex';
        }
        if(mobileOnlyProfile) mobileOnlyProfile.style.removeProperty('display');

        const firstLetter = user.name.charAt(0).toUpperCase();
        if(nameDisplay) nameDisplay.innerText = user.name;
        if(avatarLetter) avatarLetter.innerText = firstLetter;
        if(mobileAvatarLetter) mobileAvatarLetter.innerText = firstLetter;

    } else {
        // --- LOGGED OUT ---
        if(desktopGuest) desktopGuest.style.removeProperty('display');
        
        if(mobileGuest) {
            mobileGuest.classList.remove('hidden');
            mobileGuest.style.display = 'grid'; 
            mobileGuest.style.removeProperty('display');
        }

        if(globalUser) globalUser.style.display = 'none';
        if(mobileUser) { mobileUser.style.display = 'none'; mobileUser.classList.add('hidden'); }
        if(mobileOnlyProfile) mobileOnlyProfile.style.display = 'none';
    }
};

window.executeLogin = function() {
    const emailEl = document.getElementById('loginEmail');
    const passEl = document.getElementById('loginPass');
    if (!emailEl.value.trim() || !passEl.value.trim()) { document.getElementById('loginError').classList.remove('hidden'); return; }
    const btn = document.getElementById('btnLoginBtn');
    btn.innerText = "Logging in...";
    setTimeout(() => {
        const name = emailEl.value.split('@')[0];
        localStorage.setItem('currentUser', JSON.stringify({ name: name, email: emailEl.value, isLoggedIn: true }));
        btn.innerText = "Login";
        window.closeAllModals();
        window.checkLoginState();
        
        // --- FORCE CLOSE & RESET ICON ---
        document.getElementById('mobile-menu-dropdown')?.classList.add('hidden');
        const btnSpan = document.querySelector('#btn-mobile-menu span');
        if(btnSpan) btnSpan.innerText = 'menu';
        
        emailEl.value = ''; passEl.value = '';
    }, 800);
};

window.executeSignup = function() {
    const nameEl = document.getElementById('signupName');
    const emailEl = document.getElementById('signupEmail');
    const passEl = document.getElementById('signupPass');
    if (!nameEl.value.trim() || !emailEl.value.trim() || !passEl.value.trim()) { document.getElementById('signupError').classList.remove('hidden'); return; }
    const btn = document.getElementById('btnSignupBtn');
    btn.innerText = "Creating...";
    setTimeout(() => {
        localStorage.setItem('currentUser', JSON.stringify({ name: nameEl.value, email: emailEl.value, isLoggedIn: true }));
        btn.innerText = "Sign Up";
        window.closeAllModals();
        window.checkLoginState();
        
        // --- FORCE CLOSE & RESET ICON ---
        document.getElementById('mobile-menu-dropdown')?.classList.add('hidden');
        const btnSpan = document.querySelector('#btn-mobile-menu span');
        if(btnSpan) btnSpan.innerText = 'menu';
        
        nameEl.value = ''; emailEl.value = ''; passEl.value = '';
    }, 800);
};

window.executeLogout = function() {
    localStorage.removeItem('currentUser');
    window.closeAllModals();
    
    // --- FORCE CLOSE & RESET ICON ---
    document.getElementById('mobile-menu-dropdown')?.classList.add('hidden');
    const btnSpan = document.querySelector('#btn-mobile-menu span');
    if(btnSpan) btnSpan.innerText = 'menu';
    
    window.checkLoginState();
};

// ==========================================
// 4. HELPERS
// ==========================================

window.openLogin = function() { window.closeAllModals(); showModal(document.getElementById('loginModal')); };
window.openSignup = function() { window.closeAllModals(); showModal(document.getElementById('signupModal')); };

window.openProfile = function() {
    window.closeAllModals();
    const modal = document.getElementById('profileModal');
    document.getElementById('profileViewMode').classList.remove('hidden');
    document.getElementById('profileEditMode').classList.add('hidden');
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        document.getElementById('profileName').innerText = user.name;
        document.getElementById('profileEmail').innerText = user.email;
        document.getElementById('profileAvatarLetter').innerText = user.name.charAt(0).toUpperCase();
    }
    showModal(modal);
};

window.enableEditMode = function() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    document.getElementById('editProfileName').value = user.name;
    document.getElementById('editProfileEmail').value = user.email;
    document.getElementById('profileViewMode').classList.add('hidden');
    document.getElementById('profileEditMode').classList.remove('hidden');
};

window.cancelEditMode = function() {
    document.getElementById('profileViewMode').classList.remove('hidden');
    document.getElementById('profileEditMode').classList.add('hidden');
};

window.saveProfile = function() {
    const newName = document.getElementById('editProfileName').value.trim();
    const newEmail = document.getElementById('editProfileEmail').value.trim();
    if (!newName || !newEmail) { alert("Fields required"); return; }
    const user = JSON.parse(localStorage.getItem('currentUser'));
    user.name = newName;
    user.email = newEmail;
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.checkLoginState();
    document.getElementById('profileName').innerText = newName;
    document.getElementById('profileEmail').innerText = newEmail;
    document.getElementById('profileAvatarLetter').innerText = newName.charAt(0).toUpperCase();
    window.cancelEditMode();
};

window.openForgotPassword = function() {
    window.closeAllModals();
    const modal = document.getElementById('forgotModal');
    document.getElementById('otpStage1').classList.remove('hidden');
    document.getElementById('otpStage2').classList.add('hidden');
    showModal(modal);
};

window.triggerChangePasswordFromProfile = function() {
    window.closeAllModals();
    const modal = document.getElementById('forgotModal');
    const user = JSON.parse(localStorage.getItem('currentUser'));
    document.getElementById('otpEmail').value = user ? user.email : '';
    document.getElementById('otpStage1').classList.remove('hidden');
    document.getElementById('otpStage2').classList.add('hidden');
    showModal(modal);
};

window.sendOTP = function() {
    if(!document.getElementById('otpEmail').value) { alert("Enter Email"); return; }
    document.getElementById('otpStage1').classList.add('hidden');
    document.getElementById('otpStage2').classList.remove('hidden');
    alert("SIMULATION: OTP is 1234");
};

window.verifyAndReset = function() {
    const otp = document.getElementById('otpInput').value;
    const pass = document.getElementById('newPassword').value;
    if(!otp || !pass) return;
    if(otp === "1234") {
        alert("Password Changed Successfully");
        window.closeAllModals();
        window.openLogin();
    } else {
        alert("Invalid OTP");
    }
};








//  ===========================  //

// common functionss on all pagess

(function() {
    
    // ===========================
    // 1. MASTER MIC CONTROLLER (GLOBAL)
    // ===========================
    window.toggleMasterMic = function() {
        // 1. Get current state
        const settings = JSON.parse(localStorage.getItem('novaSettings') || '{}');
        const currentState = settings.mic === true; // Default to false if missing
        
        // 2. Flip State
        const newState = !currentState;
        settings.mic = newState;
        localStorage.setItem('novaSettings', JSON.stringify(settings));

        // 3. Global Toast Notification
        if (newState) {
            showGlobalToast("Microphone Activated", "graphic_eq");
        } else {
            showGlobalToast("Microphone Muted", "mic_off");
            // Stop any active listening on Home Page
            const homeMic = document.getElementById('micBtn');
            if(homeMic && homeMic.classList.contains('listening')) {
                // We simulate a click to stop it, or just reload logic
                // For now, let's just let voice.js handle the stop if it polls
            }
        }

        // 4. Update Settings UI (If we are on the Settings Page)
        if (typeof window.updateMicUI === 'function') {
            window.updateMicUI(newState);
        }
    };

    // ===========================
    // 2. HEADER & LOADER LOGIC
    // ===========================
    function initHeaderLogic() {
        const btnMenu = document.getElementById('btn-mobile-menu');
        const menuDropdown = document.getElementById('mobile-menu-dropdown');
        if(btnMenu && menuDropdown) {
            const newBtn = btnMenu.cloneNode(true);
            btnMenu.parentNode.replaceChild(newBtn, btnMenu);
            newBtn.addEventListener('click', () => {
                menuDropdown.classList.toggle('hidden');
                const icon = newBtn.querySelector('span');
                icon.innerText = menuDropdown.classList.contains('hidden') ? 'menu' : 'close';
            });
        }
        const highlight = (selector) => {
            const currentFile = window.location.pathname.split('/').pop() || 'index.html'; 
            document.querySelectorAll(selector).forEach(link => {
                const linkFile = (link.getAttribute('href') || '').split('/').pop() || 'index.html';
                if (linkFile === currentFile) {
                    link.classList.remove('text-slate-500', 'dark:text-slate-400');
                    link.classList.add('text-primary', 'bg-primary/10', 'font-bold');
                }
            });
        };
        highlight('.nav-link');     
        highlight('.mobile-link');  
    }

    function loadSkeleton() {
        const isPagesFolder = window.location.pathname.includes('/pages/');
        const basePath = isPagesFolder ? '../' : './';
        const headerContainer = document.getElementById('global-header');
        if (headerContainer) {
            fetch(basePath + 'components/header.html').then(res => res.text()).then(html => {
                    let processedHtml = html;
                    if (isPagesFolder) {
                        processedHtml = processedHtml.replace(/src="assets\//g, 'src="../assets/').replace(/href="index.html"/g, 'href="../index.html"').replace(/href="pages\//g, 'href="');
                    }
                    headerContainer.innerHTML = processedHtml;
                    if(typeof initThemeToggle === 'function') initThemeToggle();
                    initHeaderLogic(); 
            });
        }
        const footerContainer = document.getElementById('global-footer');
        if (footerContainer) {
            fetch(basePath + 'components/footer.html').then(res => res.text()).then(html => {
                     let processedHtml = html;
                     if (isPagesFolder) processedHtml = processedHtml.replace(/src="assets\//g, 'src="../assets/');
                     footerContainer.innerHTML = processedHtml;
            });
        }
    }

    // ===========================
    // 3. THEME TOGGLE
    // ===========================
    function initTheme() {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage))) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
    initTheme(); 

    function initThemeToggle() {
        const btnTheme = document.getElementById('btn-theme-toggle');
        if (btnTheme) {
            const newBtn = btnTheme.cloneNode(true);
            btnTheme.parentNode.replaceChild(newBtn, btnTheme);
            newBtn.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                const isDark = document.documentElement.classList.contains('dark');
                localStorage.theme = isDark ? 'dark' : 'light';
                showGlobalToast(isDark ? 'Dark Mode' : 'Light Mode', isDark ? 'dark_mode' : 'light_mode');
            });
        }
    }

    // ===========================
    // 4. SHARED TOAST
    // ===========================
    window.showGlobalToast = function(msg, icon = 'check') {
        const existing = document.getElementById('global-toast');
        if(existing) existing.remove();
        const t = document.createElement('div');
        t.id = 'global-toast';
        t.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 bg-white dark:bg-[#1a1825] border border-slate-200 dark:border-[#8b5cf6]/30 pl-4 pr-6 py-3 rounded-full shadow-xl backdrop-blur-md transition-all duration-300 translate-y-24 opacity-0 text-slate-800 dark:text-white font-sans';
        t.innerHTML = `<div class="w-6 h-6 rounded-full bg-violet-100 dark:bg-[#8b5cf6]/20 flex items-center justify-center text-violet-600 dark:text-[#8b5cf6]"><span class="material-symbols-rounded text-sm">${icon}</span></div><p class="text-sm font-medium">${msg}</p>`;
        document.body.appendChild(t);
        requestAnimationFrame(() => t.classList.remove('translate-y-24', 'opacity-0'));
        setTimeout(() => { t.classList.add('translate-y-24', 'opacity-0'); setTimeout(() => t.remove(), 300); }, 3000);
    };

    // ===========================
    // 5. GLOBAL SHORTCUTS LISTENER
    // ===========================
function initShortcuts() {
        document.addEventListener('keydown', (e) => {
            // 1. Ignore typing in inputs
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

            // 2. Get Settings
            const settings = JSON.parse(localStorage.getItem('novaSettings') || '{}');
            // Force defaults if missing
            const toggleKey = (settings.scTog || 'Alt + V').toUpperCase(); 
            const muteKey = (settings.scMute || 'Alt + M').toUpperCase();

            // 3. Build Pressed Key String (Always UpperCase for comparison)
            let keyName = e.key.toUpperCase();
            if (e.code === 'Space') keyName = 'SPACE'; 

            const pressedParts = [
                e.ctrlKey ? 'CTRL' : '',
                e.altKey ? 'ALT' : '',
                e.shiftKey ? 'SHIFT' : '',
                e.metaKey ? 'CMD' : '',
                keyName
            ].filter(Boolean).join(' + ');

            console.log("Pressed:", pressedParts); // Debugging help

            // --- SCENARIO A: TOGGLE LISTENING (Alt + V) ---
            if (pressedParts === toggleKey) {
                e.preventDefault();
                
                // Check if globally muted first
                if (settings.mic === false) {
                    showGlobalToast("Microphone is Muted/Denied", "mic_off");
                    return;
                }

                const micBtn = document.getElementById('micBtn');
                if (micBtn) {
                    // Visual Press Effect
                    micBtn.classList.add('scale-90', 'ring-4', 'ring-primary/50'); 
                    setTimeout(() => micBtn.classList.remove('scale-90', 'ring-4', 'ring-primary/50'), 150);
                    
                    // ACTUALLY CLICK IT
                    micBtn.click();
                } else {
                    console.log("Mic button not found on this page.");
                }
            }

            // --- SCENARIO B: MUTE MASTER SWITCH (Alt + M) ---
            if (pressedParts === muteKey) {
                e.preventDefault();
                window.toggleMasterMic();
            }
        });
    }
    document.addEventListener('DOMContentLoaded', () => {
        loadSkeleton(); 
        initShortcuts(); 
    });
})();



