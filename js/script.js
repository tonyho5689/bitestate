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
        
        // Create chart container
        const chartWrapper = document.createElement('div');
        chartWrapper.className = 'chart-wrapper';
        chartWrapper.style.position = 'relative';
        chartWrapper.style.height = '220px';
        chartWrapper.style.padding = '20px 10px 10px';
        chartWrapper.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        chartWrapper.style.border = '1px solid rgba(0, 243, 255, 0.3)';
        chartWrapper.style.marginBottom = '15px';
        
        // Chart title
        const chartTitle = document.createElement('div');
        chartTitle.className = 'chart-title';
        chartTitle.innerHTML = 'HPLT TOKEN - 30 DAYS';
        chartTitle.style.position = 'absolute';
        chartTitle.style.top = '5px';
        chartTitle.style.left = '10px';
        chartTitle.style.fontSize = '0.8rem';
        chartTitle.style.color = 'var(--primary-color)';
        chartTitle.style.fontFamily = 'Orbitron, sans-serif';
        
        chartWrapper.appendChild(chartTitle);
        
        // Create chart grid
        const gridContainer = document.createElement('div');
        gridContainer.style.position = 'absolute';
        gridContainer.style.top = '30px';
        gridContainer.style.left = '0';
        gridContainer.style.right = '0';
        gridContainer.style.bottom = '0';
        gridContainer.style.backgroundImage = `
            repeating-linear-gradient(to right, rgba(0, 243, 255, 0.1), rgba(0, 243, 255, 0.1) 1px, transparent 1px, transparent 20%),
            repeating-linear-gradient(to bottom, rgba(0, 243, 255, 0.1), rgba(0, 243, 255, 0.1) 1px, transparent 1px, transparent 25%)
        `;
        
        chartWrapper.appendChild(gridContainer);
        
        // Sample data - Token price over last 30 days with more volatility
        const basePrice = 1000;
        const data = [
            1000, 1005, 1012, 1008, 1015, 1022, 1019, 1025, 
            1032, 1041, 1035, 1045, 1055, 1047, 1060, 1070, 
            1065, 1078, 1085, 1080, 1095, 1105, 1098, 1108,
            1112, 1105, 1115, 1118, 1120, 1125
        ];
        
        // Container for the line chart
        const chartContainer = document.createElement('div');
        chartContainer.style.position = 'relative';
        chartContainer.style.height = '180px';
        chartContainer.style.marginTop = '10px';
        
        // Create SVG for the line chart
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.overflow = 'visible';
        
        // Min and max values for scaling
        const minValue = Math.min(...data) * 0.995; // Add some padding
        const maxValue = Math.max(...data) * 1.005;
        const range = maxValue - minValue;
        
        // Create the line path
        let pathD = '';
        const pointsX = [];
        const pointsY = [];
        
        data.forEach((value, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (((value - minValue) / range) * 100);
            
            if (index === 0) {
                pathD += `M ${x} ${y}`;
            } else {
                pathD += ` L ${x} ${y}`;
            }
            
            pointsX.push(x);
            pointsY.push(y);
        });
        
        // Create the area fill path
        let areaD = pathD + ` L ${pointsX[pointsX.length - 1]} 100 L 0 100 Z`;
        
        // Create area fill
        const areaPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        areaPath.setAttribute('d', areaD);
        areaPath.setAttribute('fill', 'url(#chartGradient)');
        areaPath.setAttribute('opacity', '0.3');
        
        // Create chart line
        const linePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        linePath.setAttribute('d', pathD);
        linePath.setAttribute('fill', 'none');
        linePath.setAttribute('stroke', 'var(--primary-color)');
        linePath.setAttribute('stroke-width', '2');
        linePath.setAttribute('stroke-linecap', 'round');
        linePath.setAttribute('stroke-linejoin', 'round');
        
        // Create gradient for area fill
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'chartGradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '0%');
        gradient.setAttribute('y2', '100%');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', 'var(--primary-color)');
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', 'transparent');
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        
        // Add circles at data points
        const dataPoints = document.createDocumentFragment();
        pointsX.forEach((x, i) => {
            if (i % 5 === 0 || i === pointsX.length - 1) { // Add points every 5 days and the last point
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', x);
                circle.setAttribute('cy', pointsY[i]);
                circle.setAttribute('r', '3');
                circle.setAttribute('fill', 'var(--primary-color)');
                circle.setAttribute('stroke', '#000');
                circle.setAttribute('stroke-width', '1');
                
                const glowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
                glowFilter.setAttribute('id', `glow-${i}`);
                
                const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
                feGaussianBlur.setAttribute('stdDeviation', '2');
                feGaussianBlur.setAttribute('result', 'blur');
                
                const feComposite = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
                feComposite.setAttribute('in', 'SourceGraphic');
                feComposite.setAttribute('in2', 'blur');
                feComposite.setAttribute('operator', 'atop');
                
                glowFilter.appendChild(feGaussianBlur);
                glowFilter.appendChild(feComposite);
                
                circle.setAttribute('filter', `url(#glow-${i})`);
                dataPoints.appendChild(glowFilter);
                dataPoints.appendChild(circle);
            }
        });
        
        // Assemble the SVG
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.appendChild(gradient);
        
        svg.appendChild(defs);
        svg.appendChild(areaPath);
        svg.appendChild(linePath);
        svg.appendChild(dataPoints);
        
        chartContainer.appendChild(svg);
        chartWrapper.appendChild(chartContainer);
        
        // Price info
        const priceInfo = document.createElement('div');
        priceInfo.className = 'price-info';
        priceInfo.style.marginTop = '15px';
        priceInfo.style.display = 'flex';
        priceInfo.style.justifyContent = 'space-between';
        priceInfo.style.alignItems = 'center';
        priceInfo.style.padding = '10px';
        priceInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        priceInfo.style.border = '1px solid rgba(0, 243, 255, 0.2)';
        
        const currentPrice = document.createElement('div');
        currentPrice.className = 'current-price';
        currentPrice.innerHTML = `<span style="color:#e0e0e0;font-family:'Orbitron',sans-serif;font-size:0.8rem;">CURRENT:</span> <span style="color:var(--primary-color);font-weight:bold;font-family:'Orbitron',sans-serif;text-shadow:var(--neon-shadow);">HK$${data[data.length-1].toLocaleString()}</span>`;
        
        const priceChange = document.createElement('div');
        priceChange.className = 'price-change';
        const changeAmount = data[data.length-1] - data[0];
        const changePercent = ((changeAmount / data[0]) * 100).toFixed(1);
        priceChange.innerHTML = `<span style="color:#e0e0e0;font-family:'Orbitron',sans-serif;font-size:0.8rem;">30D CHANGE:</span> <span style="color:var(--primary-color);font-weight:bold;font-family:'Orbitron',sans-serif;text-shadow:var(--neon-shadow);">+${changePercent}%</span>`;
        
        priceInfo.appendChild(currentPrice);
        priceInfo.appendChild(priceChange);
        
        // Add all elements to chart
        marketChartEl.appendChild(chartWrapper);
        marketChartEl.appendChild(priceInfo);
    };
    
    // Create and display the chart
    createMarketChart();
    
    // Portfolio chart placeholder (would use a real chart library in production)
    document.querySelectorAll('.chart-placeholder').forEach(placeholder => {
        if (placeholder.parentElement.classList.contains('portfolio-chart')) {
            placeholder.textContent = 'Portfolio Growth Chart (Visualization would be here)';
        } else if (placeholder.parentElement.classList.contains('history-chart')) {
            // Create a rental income chart
            placeholder.innerHTML = '';
            
            // Create chart container
            const chartWrapper = document.createElement('div');
            chartWrapper.className = 'rental-chart-wrapper';
            chartWrapper.style.position = 'relative';
            chartWrapper.style.height = '180px';
            chartWrapper.style.padding = '20px 10px 10px';
            
            // Chart title
            const chartTitle = document.createElement('div');
            chartTitle.className = 'chart-title';
            chartTitle.innerHTML = 'MONTHLY RENTAL INCOME - 12 MONTHS';
            chartTitle.style.position = 'absolute';
            chartTitle.style.top = '5px';
            chartTitle.style.left = '10px';
            chartTitle.style.fontSize = '0.8rem';
            chartTitle.style.color = 'var(--primary-color)';
            chartTitle.style.fontFamily = 'Orbitron, sans-serif';
            
            chartWrapper.appendChild(chartTitle);
            
            // Create chart grid
            const gridContainer = document.createElement('div');
            gridContainer.style.position = 'absolute';
            gridContainer.style.top = '30px';
            gridContainer.style.left = '0';
            gridContainer.style.right = '0';
            gridContainer.style.bottom = '0';
            gridContainer.style.backgroundImage = `
                repeating-linear-gradient(to right, rgba(0, 243, 255, 0.1), rgba(0, 243, 255, 0.1) 1px, transparent 1px, transparent 8.33%),
                repeating-linear-gradient(to bottom, rgba(0, 243, 255, 0.1), rgba(0, 243, 255, 0.1) 1px, transparent 1px, transparent 25%)
            `;
            
            chartWrapper.appendChild(gridContainer);
            
            // Sample data - Monthly rental income
            const data = [
                284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284
            ];
            
            // Container for the bar chart
            const chartContainer = document.createElement('div');
            chartContainer.style.position = 'relative';
            chartContainer.style.height = '140px';
            chartContainer.style.marginTop = '30px';
            chartContainer.style.display = 'flex';
            chartContainer.style.alignItems = 'flex-end';
            chartContainer.style.justifyContent = 'space-around';
            
            // Create months labels
            const months = [
                'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'
            ];
            
            // Create bars
            months.forEach((month, index) => {
                // Bar container
                const barContainer = document.createElement('div');
                barContainer.style.display = 'flex';
                barContainer.style.flexDirection = 'column';
                barContainer.style.alignItems = 'center';
                barContainer.style.width = '8%';
                
                // Bar
                const bar = document.createElement('div');
                bar.style.width = '100%';
                bar.style.height = '100px';
                bar.style.backgroundColor = 'var(--primary-color)';
                bar.style.boxShadow = 'var(--neon-shadow)';
                bar.style.position = 'relative';
                bar.style.marginBottom = '5px';
                
                // Value label
                const valueLabel = document.createElement('div');
                valueLabel.textContent = `HK$${data[index]}`;
                valueLabel.style.color = 'var(--primary-color)';
                valueLabel.style.fontSize = '0.7rem';
                valueLabel.style.fontFamily = 'Orbitron, sans-serif';
                valueLabel.style.position = 'absolute';
                valueLabel.style.top = '-20px';
                valueLabel.style.left = '50%';
                valueLabel.style.transform = 'translateX(-50%)';
                valueLabel.style.whiteSpace = 'nowrap';
                
                // Month label
                const monthLabel = document.createElement('div');
                monthLabel.textContent = month;
                monthLabel.style.color = '#e0e0e0';
                monthLabel.style.fontSize = '0.7rem';
                monthLabel.style.marginTop = '5px';
                
                bar.appendChild(valueLabel);
                barContainer.appendChild(bar);
                barContainer.appendChild(monthLabel);
                chartContainer.appendChild(barContainer);
            });
            
            // Add the chart to the wrapper
            chartWrapper.appendChild(chartContainer);
            
            // Add to placeholder
            placeholder.appendChild(chartWrapper);
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