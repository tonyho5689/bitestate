document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    // ======== TAB SYSTEM INITIALIZATION ========
    function setupTabSystem() {
        console.log("Setting up tab system...");
        const tabs = document.querySelectorAll('.demo-tab');
        const panels = document.querySelectorAll('.demo-panel');
        
        console.log(`Found ${tabs.length} tabs and ${panels.length} panels`);
        
        if (!tabs.length || !panels.length) {
            console.error("Tabs or panels not found");
            return;
        }
        
        // First, hide all panels
        panels.forEach(panel => {
            panel.style.display = 'none';
        });
        
        // Then, show only the active panel
        const activeTab = document.querySelector('.demo-tab.active') || tabs[0];
        if (activeTab) {
            activeTab.classList.add('active');
            const activeTabName = activeTab.getAttribute('data-tab');
            const activePanelId = `${activeTabName}-panel`;
            const activePanel = document.getElementById(activePanelId);
            
            if (activePanel) {
                activePanel.style.display = 'block';
                console.log(`Activated panel: ${activePanelId}`);
            } else {
                console.error(`Panel not found: ${activePanelId}`);
            }
        }
        
        // Set up click handlers for all tabs
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                console.log(`Tab clicked: ${tabName}`);
                
                // Remove active class from all tabs and hide all panels
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.style.display = 'none');
                
                // Activate clicked tab
                this.classList.add('active');
                
                // Show corresponding panel
                const panelId = `${tabName}-panel`;
                const panel = document.getElementById(panelId);
                
                if (panel) {
                    panel.style.display = 'block';
                    console.log(`Showing panel: ${panelId}`);
                    
                    // Special handling for different tabs
                    if (tabName === 'marketplace') {
                        console.log('Refreshing marketplace charts');
                        initMarketplaceChart();
                    } else if (tabName === 'portfolio') {
                        console.log('Refreshing portfolio data');
                        updatePortfolioView();
                    } else if (tabName === 'governance') {
                        console.log('Refreshing rental income data');
                        refreshRentalData();
                    } else if (tabName === 'invest') {
                        console.log('Updating investment calculator');
                        updateCalculator();
                    }
                } else {
                    console.error(`Panel not found: ${panelId}`);
                }
            });
        });
    }

    // ======== INVESTMENT SIMULATOR ========
    const investmentSlider = document.getElementById('investment-amount');
    const investmentValue = document.getElementById('investment-value');
    const tokenPrice = document.getElementById('token-price');
    const tokensReceived = document.getElementById('tokens-received');
    const estimatedRoi = document.getElementById('estimated-roi');
    const estimatedIncome = document.getElementById('estimated-income');
    const propertySelect = document.getElementById('property-select');
    
    // Property data
    const properties = {
        property1: { tokenPrice: 6900, roi: 8.5, currency: 'HK$' }
    };
    
    // Update investment calculator
    function updateCalculator() {
        if (!investmentSlider || !propertySelect) {
            console.error("Investment slider or property select not found");
            return;
        }
        
        const amount = parseInt(investmentSlider.value);
        const property = properties[propertySelect.value];
        
        console.log(`Updating calculator with amount: ${amount}`);
        
        // Update investment value display
        if (investmentValue) {
            investmentValue.textContent = `${property.currency}${amount.toLocaleString()}`;
        }
        
        // Update token price display
        if (tokenPrice) {
            tokenPrice.textContent = `${property.currency}6,900`;
        }
        
        // Calculate tokens received
        const tokens = Math.floor(amount / 6900);
        if (tokensReceived) {
            tokensReceived.textContent = tokens.toLocaleString();
        }
        
        // Update ROI display
        if (estimatedRoi) {
            estimatedRoi.textContent = `${property.roi}%`;
        }
        
        // Calculate annual income
        const income = (tokens * 587).toFixed(0);
        if (estimatedIncome) {
            estimatedIncome.textContent = `${property.currency}${income}`;
        }
    }
    
    // Set up investment slider event listener
    if (investmentSlider) {
        investmentSlider.addEventListener('input', updateCalculator);
    }
    
    // Initialize calculator on load
    updateCalculator();
    
    // ======== MARKETPLACE FUNCTIONS ========
    // Token transaction functionality
    const tokenAmount = document.getElementById('token-amount');
    const tokenTotal = document.getElementById('token-total');
    const ammTokenPrice = document.getElementById('amm-token-price');
    const ammPriceChange = document.getElementById('amm-price-change');
    
    function updateTokenTransaction() {
        if (!tokenAmount || !tokenTotal) return;
        
        const amount = parseInt(tokenAmount.value) || 0;
        const price = 7763; // Current token price (after 12.5% appreciation)
        const total = amount * price;
        
        tokenTotal.value = formatCurrency(total, '').replace('HK$', '');
    }
    
    // Format currency for display
    function formatCurrency(amount, currency = 'HK$') {
        return `${currency}${amount.toLocaleString()}`;
    }
    
    if (tokenAmount) {
        tokenAmount.addEventListener('input', updateTokenTransaction);
    }
    
    // Buy/Sell button functionality
    const tokenActionTabs = document.querySelectorAll('.token-action');
    const ammActionButton = document.querySelector('.amm-action-button');
    
    if (tokenActionTabs.length && ammActionButton) {
        tokenActionTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                tokenActionTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Update button text
                ammActionButton.textContent = this.dataset.action === 'buy' ? 'Buy Tokens' : 'Sell Tokens';
            });
        });
        
        ammActionButton.addEventListener('click', function() {
            const action = document.querySelector('.token-action.active').dataset.action;
            const amount = parseInt(tokenAmount.value) || 0;
            const total = parseFloat(tokenTotal.value.replace(/,/g, '')) || 0;
            
            alert(`In a real implementation, this would ${action} ${amount} tokens for ${formatCurrency(total)} through the Auto Market Maker.`);
        });
    }
    
    // Marketplace chart
    function initMarketplaceChart() {
        console.log("Initializing marketplace chart");
        
        // The chart is already in the HTML, so no need to create it
        // We just need to make sure it's displayed correctly
        
        const marketplacePanel = document.getElementById('marketplace-panel');
        if (marketplacePanel) {
            marketplacePanel.style.display = 'block';
            
            // Make sure all SVG elements in the chart are visible
            const svgElements = marketplacePanel.querySelectorAll('svg');
            svgElements.forEach(svg => {
                svg.style.display = 'block';
                svg.style.visibility = 'visible';
            });
            
            // Make sure chart container is visible
            const chartContainer = marketplacePanel.querySelector('.market-activity-chart');
            if (chartContainer) {
                chartContainer.style.display = 'block';
                chartContainer.style.visibility = 'visible';
                console.log("Market chart container displayed");
            } else {
                console.error("Market chart container not found");
            }
        } else {
            console.error("Marketplace panel not found");
        }
    }
    
    // ======== PORTFOLIO FUNCTIONS ========
    function updatePortfolioView() {
        console.log("Updating portfolio view");
        
        // Make sure the portfolio panel is visible with all its contents
        const portfolioPanel = document.getElementById('portfolio-panel');
        if (portfolioPanel) {
            portfolioPanel.style.display = 'block';
            
            // Make sure SVG chart is visible
            const chartElement = portfolioPanel.querySelector('.portfolio-growth-chart');
            if (chartElement) {
                chartElement.style.display = 'block';
                chartElement.style.visibility = 'visible';
                console.log("Portfolio chart displayed");
            } else {
                console.error("Portfolio chart not found");
            }
            
            // Make sure other elements are visible
            const summaryElement = portfolioPanel.querySelector('.portfolio-summary');
            if (summaryElement) {
                summaryElement.style.display = 'flex';
                console.log("Portfolio summary displayed");
            }
            
            const assetsElement = portfolioPanel.querySelector('.portfolio-assets');
            if (assetsElement) {
                assetsElement.style.display = 'block';
                console.log("Portfolio assets displayed");
            }
        } else {
            console.error("Portfolio panel not found");
        }
    }
    
    // ======== RENTAL INCOME FUNCTIONS ========
    function refreshRentalData() {
        console.log("Refreshing rental income data");
        
        // Make sure the rental income panel is visible with all its contents
        const governancePanel = document.getElementById('governance-panel');
        if (governancePanel) {
            governancePanel.style.display = 'block';
            
            // Make sure SVG chart is visible
            const chartElement = governancePanel.querySelector('.rental-chart');
            if (chartElement) {
                chartElement.style.display = 'block';
                chartElement.style.visibility = 'visible';
                console.log("Rental chart displayed");
            } else {
                console.error("Rental chart not found");
            }
            
            // Make sure other elements are visible
            const holdingsTable = governancePanel.querySelector('.holdings-table');
            if (holdingsTable) {
                holdingsTable.style.display = 'block';
                console.log("Holdings table displayed");
            }
            
            const distributionCard = governancePanel.querySelector('.month-distribution-card');
            if (distributionCard) {
                distributionCard.style.display = 'block';
                console.log("Distribution card displayed");
            }
            
            const historyList = governancePanel.querySelector('.distribution-list');
            if (historyList) {
                historyList.style.display = 'block';
                console.log("Distribution history displayed");
            }
        } else {
            console.error("Governance panel not found");
        }
    }
    
    // ======== INVEST BUTTON ========
    const investButton = document.getElementById('invest-button');
    if (investButton) {
        investButton.addEventListener('click', function() {
            alert('In a real implementation, this would connect to your crypto wallet to complete the investment transaction.');
        });
    }
    
    // ======== SETUP SCROLL ANIMATIONS ========
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .property-card, .roadmap-item, .stat-box');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initialize scroll animations
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // ======== INITIALIZE EVERYTHING ========
    // This is the main function that sets up everything
    function initializeAll() {
        console.log("Initializing all systems...");
        
        // Set up the tab system
        setupTabSystem();
        
        // Initialize calculations
        updateCalculator();
        updateTokenTransaction();
        
        // Set default active tab to Invest
        document.querySelector('.demo-tab[data-tab="invest"]').click();
        
        // Pre-initialize all panels to ensure they're ready
        // This helps avoid display issues when switching tabs
        setTimeout(() => {
            console.log("Pre-initializing all panels...");
            initMarketplaceChart();
            updatePortfolioView();
            refreshRentalData();
        }, 500);
    }
    
    // Run the initialization
    initializeAll();
});