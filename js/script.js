document.addEventListener('DOMContentLoaded', function() {
    // Roadmap navigation
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    roadmapItems.forEach(item => {
        item.addEventListener('click', function() {
            // Could add animation or expand functionality
            console.log(`Roadmap item ${this.id} clicked`);
        });
    });

    // Demo tabs functionality
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoPanels = document.querySelectorAll('.demo-panel');
    
    demoTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and panels
            demoTabs.forEach(t => t.classList.remove('active'));
            demoPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding panel
            const panelId = `${this.dataset.tab}-panel`;
            document.getElementById(panelId).classList.add('active');
        });
    });

    // Investment simulator functionality
    const investmentSlider = document.getElementById('investment-amount');
    const investmentValue = document.getElementById('investment-value');
    const tokenPrice = document.getElementById('token-price');
    const tokensReceived = document.getElementById('tokens-received');
    const estimatedRoi = document.getElementById('estimated-roi');
    const estimatedIncome = document.getElementById('estimated-income');
    const propertySelect = document.getElementById('property-select');
    
    // Property data (would be fetched from API in a real implementation)
    const properties = {
        property1: { tokenPrice: 1000, roi: 8.5, currency: 'HK$' }
    };
    
    // Update investment calculator
    function updateCalculator() {
        if (!investmentSlider || !propertySelect) return;
        
        const amount = parseInt(investmentSlider.value);
        const property = properties[propertySelect.value];
        
        investmentValue.textContent = `${property.currency}${amount.toLocaleString()}`;
        tokenPrice.textContent = `${property.currency}${property.tokenPrice.toLocaleString()}`;
        
        const tokens = Math.floor(amount / property.tokenPrice);
        tokensReceived.textContent = tokens.toLocaleString();
        
        estimatedRoi.textContent = `${property.roi}%`;
        
        const income = (amount * property.roi / 100).toFixed(2);
        estimatedIncome.textContent = `${property.currency}${income}`;
    }
    
    // Add event listeners
    if (investmentSlider && propertySelect) {
        investmentSlider.addEventListener('input', updateCalculator);
        propertySelect.addEventListener('change', updateCalculator);
        
        // Initialize calculator
        updateCalculator();
    }
    
    // Auto Market Maker functionality
    const tokenActionTabs = document.querySelectorAll('.token-action');
    const ammActionButton = document.querySelector('.amm-action-button');
    const tokenAmount = document.getElementById('token-amount');
    const tokenTotal = document.getElementById('token-total');
    
    // Format currency for display
    function formatCurrency(amount, currency = 'HK$') {
        return `${currency}${amount.toLocaleString()}`;
    }
    
    // Token transaction calculation
    function updateTokenTransaction() {
        if (!tokenAmount || !tokenTotal) return;
        
        const amount = parseInt(tokenAmount.value) || 0;
        const price = 1125; // Current token price in HKD (based on 12.5% appreciation from 1,000)
        const total = amount * price;
        
        tokenTotal.value = formatCurrency(total, '').replace('HK$', '');
    }
    
    // Add event listeners for AMM
    if (tokenAmount) {
        tokenAmount.addEventListener('input', updateTokenTransaction);
        
        // Initialize token transaction
        updateTokenTransaction();
    }
    
    // Handle token action tab changes (buy/sell)
    if (tokenActionTabs.length > 0) {
        tokenActionTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                tokenActionTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Update button text
                if (ammActionButton) {
                    ammActionButton.textContent = this.dataset.action === 'buy' ? 'Buy Tokens' : 'Sell Tokens';
                }
            });
        });
    }
    
    // AMM button functionality
    if (ammActionButton) {
        ammActionButton.addEventListener('click', function() {
            const action = document.querySelector('.token-action.active').dataset.action;
            const amount = parseInt(tokenAmount.value) || 0;
            const total = parseFloat(tokenTotal.value.replace(/,/g, '')) || 0;
            
            // In a real implementation, this would connect to a wallet or payment system
            alert(`In a real implementation, this would ${action} ${amount} tokens for ${formatCurrency(total)} through the Auto Market Maker.`);
        });
    }
    
    // Create a sample price chart for the marketplace
    const createMarketChart = function() {
        const marketChartEl = document.querySelector('.market-activity-chart');
        if (!marketChartEl) return;
        
        // Clear placeholder
        marketChartEl.innerHTML = '';
        
        // Create canvas for chart
        const canvas = document.createElement('canvas');
        canvas.id = 'priceHistoryChart';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        marketChartEl.appendChild(canvas);
        
        // Sample data - Token price over last 30 days
        const basePrice = 1000;
        const labels = Array.from({length: 30}, (_, i) => `Day ${30-i}`);
        const data = [
            1000, 1002, 1005, 1008, 1006, 1007, 1014, 1019, 
            1024, 1030, 1026, 1032, 1040, 1048, 1054, 1062, 
            1065, 1068, 1074, 1082, 1085, 1092, 1096, 1100,
            1104, 1108, 1112, 1116, 1120, 1125
        ];
        
        // Simulating chart with divs since we can't use real chart libraries here
        const chartContainer = document.createElement('div');
        chartContainer.className = 'simulated-chart';
        chartContainer.style.height = '200px';
        chartContainer.style.display = 'flex';
        chartContainer.style.alignItems = 'flex-end';
        chartContainer.style.justifyContent = 'space-between';
        chartContainer.style.padding = '10px';
        chartContainer.style.background = '#f8f9fa';
        chartContainer.style.borderRadius = '8px';
        
        // Min and max values for scaling
        const minValue = Math.min(...data);
        const maxValue = Math.max(...data);
        const range = maxValue - minValue;
        
        // Create bars
        data.forEach((value, index) => {
            const normalizedHeight = ((value - minValue) / range) * 150 + 20; // 20px minimum height
            
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.width = '3px';
            bar.style.height = `${normalizedHeight}px`;
            bar.style.backgroundColor = value > data[index-1] || index === 0 ? '#28a745' : '#dc3545';
            bar.style.borderRadius = '2px';
            bar.style.position = 'relative';
            
            // Tooltip on hover
            bar.title = `Day ${30-index}: HK$${value.toLocaleString()}`;
            
            chartContainer.appendChild(bar);
        });
        
        // Price info
        const priceInfo = document.createElement('div');
        priceInfo.className = 'price-info';
        priceInfo.style.marginTop = '15px';
        priceInfo.style.textAlign = 'center';
        
        const currentPrice = document.createElement('div');
        currentPrice.className = 'current-price';
        currentPrice.innerHTML = `<strong>Current Price:</strong> <span style="color:#28a745;font-weight:bold;">HK$${data[data.length-1].toLocaleString()}</span>`;
        
        const priceChange = document.createElement('div');
        priceChange.className = 'price-change';
        const changeAmount = data[data.length-1] - data[0];
        const changePercent = ((changeAmount / data[0]) * 100).toFixed(1);
        priceChange.innerHTML = `<strong>30-Day Change:</strong> <span style="color:#28a745;font-weight:bold;">+${changePercent}% (HK$${changeAmount.toLocaleString()})</span>`;
        
        priceInfo.appendChild(currentPrice);
        priceInfo.appendChild(priceChange);
        
        // Add all elements to chart
        marketChartEl.appendChild(chartContainer);
        marketChartEl.appendChild(priceInfo);
    };
    
    // Create and display the chart
    createMarketChart();
    
    // Portfolio chart placeholder (would use a real chart library in production)
    document.querySelectorAll('.chart-placeholder').forEach(placeholder => {
        if (placeholder.parentElement.classList.contains('portfolio-chart')) {
            placeholder.textContent = 'Portfolio Growth Chart (Visualization would be here)';
        } else if (placeholder.parentElement.classList.contains('history-chart')) {
            placeholder.textContent = 'Monthly Rental Income Chart (Last 12 Months)';
        }
    });
    
    // Property image gallery thumbnails
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Update main image source
                mainImage.src = this.src;
                mainImage.alt = this.alt;
                
                // Highlight active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = {};
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Simulate form submission
            console.log('Form submitted with values:', formValues);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate subscription
            const email = this.querySelector('input[type="email"]').value;
            console.log('Newsletter subscription:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            
            // Reset form
            this.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Invest button functionality
    const investButton = document.getElementById('invest-button');
    if (investButton) {
        investButton.addEventListener('click', function() {
            // In a real implementation, this would open a payment gateway or connect to a wallet
            alert('In a real implementation, this would connect to your crypto wallet to complete the investment transaction.');
        });
    }

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .property-card, .roadmap-item, .stat-box');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
});