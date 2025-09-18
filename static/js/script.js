console.log('%cCopyright © 2024-2025 Caleb XXY', 'background-color: #a285e6; color: white; font-size: 24px; font-weight: bold; padding: 10px;');
console.log('%c   /\\_/\\', 'color: #f7b267; font-size: 20px;');
console.log('%c  ( o.o )', 'color: #f7b267; font-size: 20px;');
console.log(' %c  > ^ <', 'color: #f7b267; font-size: 20px;');
console.log('  %c /  ~ \\', 'color: #f7b267; font-size: 20px;');
console.log('  %c/______\\', 'color: #f7b267; font-size: 20px;');

// 创建简单的光晕球跟随效果
function initCursor() {
    const glowBall = document.createElement('div');
    glowBall.className = 'glow-ball';
    document.body.appendChild(glowBall);
    
    let mouseX = 0, mouseY = 0;
    let ballX = 0, ballY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateBall() {
        ballX += (mouseX - ballX) * 0.08;
        ballY += (mouseY - ballY) * 0.08;
        
        glowBall.style.left = ballX - 10 + 'px';
        glowBall.style.top = ballY - 10 + 'px';
        
        requestAnimationFrame(animateBall);
    }
    animateBall();
    
    // 悬停效果
    const hoverElements = document.querySelectorAll('a, button, .tab-button, .projectItem, .iconItem, .iconItemLong, .left-tag-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            glowBall.style.transform = 'scale(1.3)';
            glowBall.style.opacity = '0.8';
        });
        
        el.addEventListener('mouseleave', () => {
            glowBall.style.transform = 'scale(1)';
            glowBall.style.opacity = '0.4';
        });
    });
}

// 添加滚动动画效果
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // 为项目卡片添加动画
    document.querySelectorAll('.projectItem, .left-div, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// 添加粒子效果
function initParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(120, 119, 198, 0.3);
        border-radius: 50%;
        animation: float ${Math.random() * 10 + 10}s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    
    container.appendChild(particle);
    
    // 添加浮动动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}




document.addEventListener('contextmenu', function(event) {
  event.preventDefault(); // 阻止默认的上下文菜单行为
});


function openTab(tabName) {
    // Hide all tab content
    var tabContents = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('content-active');
    }
    
    // Remove active class from all buttons
    var tabButtons = document.getElementsByClassName('tab-button');
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('but-active');
    }
    
    // Show the selected tab content
    document.getElementById(tabName).classList.add('content-active');
    
    // Add active class to the clicked button
    event.target.classList.add('but-active');
}


function toggleClass(selector, className) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        element.classList.toggle(className);
    });
}

function PopUp(imageURL) {
    var popupMainElement = document.querySelector(".pop-up-img");
    if (imageURL) {
        popupMainElement.src = imageURL;
    }
    toggleClass(".pop-up-main", "active");
    toggleClass(".pop-up", "active");
    toggleClass(".pop-up-close", "active");
}

function playSound(soundUrl) {
  const audio = new Audio(soundUrl);
  audio.play().catch(e => console.error("Failed to play sound effect:", e));
}

function left() {
    toggleClass(".left-main", "left-main-open");
    toggleClass(".left", "left-open");

}


document.addEventListener('DOMContentLoaded', function () {
    // 初始化所有美化效果
    initCursor();
    initScrollAnimations();
    initParticles();

    var themeState = getCookie("themeState") || "Light";
    const htmlTag = document.querySelector('html');
    var svgItems = document.getElementsByTagName("svg");
    var tanChiShe = document.getElementById("tanChiShe");




    function changeSvg(color) {
        for (var i = 0; i < svgItems.length; i++) {
            var paths = svgItems[i].getElementsByTagName("path");
            for (var j = 0; j < paths.length; j++) {
                paths[j].setAttribute("fill", color);
            }
        }
    }



    function changeTheme(theme) {
        if (theme == "Dark") {
            themeState = "Dark";
            changeSvg("#ffffff");
            tanChiShe.src = "./static/svg/snake-Dark.svg";
            htmlTag.dataset.theme = 'dark';
        } else if (theme == "Light") {
            themeState = "Light";
            changeSvg("#000000");
            tanChiShe.src = "./static/svg/snake-Light.svg";
            htmlTag.dataset.theme = '';
        }
        setCookie("themeState", theme, 365);
    }




    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }


    function getCookie(name) {
        var nameEQ = name + "=";
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) == 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    }


    document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
            playSound('../static/soundeffects/click.mp3');
        });
    });

    const switchCheckbox = document.getElementById('myonoffswitch');
    /*夜间自动打开暗色主题*/
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 20 || currentHour < 6) {
        switchCheckbox.checked = false;
        changeTheme('Dark');
    }


    switchCheckbox.addEventListener('change', function () {

        if (themeState == "Dark") {

            playSound('../static/soundeffects/light-on.mp3')
            changeTheme("Light");

        } else if (themeState == "Light") {

            playSound('../static/soundeffects/light-off.mp3')
            changeTheme("Dark");
        }
    });

    if (themeState == "Dark") {
        switchCheckbox.checked = false;
    }
    changeTheme(themeState);




    /*加载效果*/
    // var pageLoading = document.querySelector("#PageLoading");
    // var center = document.getElementById("PageLoading-zyyo-center");
    // setTimeout(function () {
    //     pageLoading.style.opacity = '0';
    //     center.style.height = "500px";
    //     center.style.width = "500px";
    //     center.style.opacity = "0";
    //     pageLoading.style.backgroundSize = "200%";
    // }, 300);

    // 暂时强制深色模式
    // changeTheme("Dark")

    /*淡入效果*/
    var projectItems = document.querySelectorAll(".projectItem");
    function checkProjectItems() {
        for (var i = 0; i < projectItems.length; i++) {
            var projectItem = projectItems[i];
            var projectItemTop = projectItem.getBoundingClientRect().top;

            if (projectItemTop < window.innerHeight * 1.2) {
                // projectItem.classList.add("fade-in-visible");
            }
        }
    }

    window.addEventListener("scroll", checkProjectItems);
    window.addEventListener("resize", checkProjectItems);

});

// FAQ Toggle Function
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');

    playSound('../static/soundeffects/collapsible_open.mp3')
    
    // 添加点击动画效果
    element.style.transform = 'scale(0.98)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 100);
    
    // Close all other FAQ items
    // const allFaqItems = document.querySelectorAll('.faq-item');
    // allFaqItems.forEach(item => {
    //     item.classList.remove('active');
    // });

    // Collapse current FAQ item
    if (isActive) {
        faqItem.classList.remove('active');
    }
    
    // Toggle current FAQ item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}