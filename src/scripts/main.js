console.log('%cCopyright © 2024-2025 Caleb XXY', 'background-color: #a285e6; color: white; font-size: 24px; font-weight: bold; padding: 10px;');
console.log('%c   /\\_/\\', 'color: #f7b267; font-size: 20px;');
console.log('%c  ( o.o )', 'color: #f7b267; font-size: 20px;');
console.log(' %c  > ^ <', 'color: #f7b267; font-size: 20px;');
console.log('  %c /  ~ \\', 'color: #f7b267; font-size: 20px;');
console.log('  %c/______\\', 'color: #f7b267; font-size: 20px;');

// 创建简单的光晕球跟随效果（仅在非触屏设备上启用）
function initCursor() {
    // 检测是否为触屏设备
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // 触屏设备不需要自定义光标效果
    if (isTouchDevice) {
        // 恢复默认光标
        document.body.style.cursor = 'auto';
        return;
    }

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

// 添加滚动动画效果（移动端简化）
function initScrollAnimations() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

    // 移动端简化动画
    if (isMobile) {
        // 直接显示所有元素，不使用滚动动画
        document.querySelectorAll('.projectItem, .left-div, .faq-item').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        return;
    }

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

// 添加粒子效果（移动端优化）
function initParticles() {
    // 检测是否为移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

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

    // 移动端减少粒子数量，提升性能
    const particleCount = isMobile ? 8 : 20;
    for (let i = 0; i < particleCount; i++) {
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




document.addEventListener('contextmenu', function (event) {
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
    // 检测设备性能并初始化相应效果
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    const isLowPerformance = isMobile || navigator.hardwareConcurrency <= 2;

    // 初始化基础功能
    initCursor();
    initScrollAnimations();

    // 根据设备性能决定是否启用粒子效果
    if (!isLowPerformance) {
        initParticles();
    }

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
            tanChiShe.src = "/svg/snake-Dark.svg";
            htmlTag.dataset.theme = 'dark';
        } else if (theme == "Light") {
            themeState = "Light";
            changeSvg("#000000");
            tanChiShe.src = "/svg/snake-Light.svg";
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

// 复制QQ号功能
function copyQQ() {
    const qqNumber = '2066047450';

    // 创建临时文本区域
    const textArea = document.createElement('textarea');
    textArea.value = qqNumber;
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        document.body.removeChild(textArea);

        // 显示复制成功提示
        showNotification('QQ号已复制：' + qqNumber + '\n请前往QQ添加好友！', 'success');

        // 播放点击音效
        playSound('../static/soundeffects/click.mp3');

    } catch (err) {
        document.body.removeChild(textArea);
        showNotification('复制失败，请手动复制：' + qqNumber, 'error');
    }
}

// 显示通知功能
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message.replace(/\n/g, '<br>');

    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-size: 14px;
        font-weight: 500;
        max-width: 300px;
        animation: slideInNotification 0.3s ease-out;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;

    document.body.appendChild(notification);

    // 3秒后自动移除
    setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.3s ease-in forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 添加通知动画样式
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInNotification {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutNotification {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);