// ===================================
// $CROC PROTOCOL - CHART INTEGRATION
// Load chart iframe from Dexscreener or Birdeye
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const chartContainer = document.getElementById('chartContainer');
    
    if (!chartContainer) return;
    
    // Token contract address
    const tokenAddress = 'Ev1ZTKVxKoVxnJGHcskowVHXezpe8aoVgvLJqwELpump';
    
    // Function to load Dexscreener chart
    function loadDexscreenerChart() {
        const iframe = document.createElement('iframe');
        iframe.src = `https://dexscreener.com/solana/${tokenAddress}?embed=1&theme=dark`;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '12px';
        
        chartContainer.innerHTML = '';
        chartContainer.appendChild(iframe);
    }
    
    // Function to load Birdeye chart
    function loadBirdeyeChart() {
        const iframe = document.createElement('iframe');
        iframe.src = `https://birdeye.so/token/${tokenAddress}?chain=solana&embed=true`;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '12px';
        
        chartContainer.innerHTML = '';
        chartContainer.appendChild(iframe);
    }
    
    // Function to show placeholder
    function showPlaceholder() {
        chartContainer.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 64px; margin-bottom: 24px;">📊</div>
                <h3 class="gradient-text" style="margin-bottom: 16px;">Chart Coming Soon</h3>
                <p style="color: var(--color-text-secondary); margin-bottom: 32px;">
                    Live price chart will be available after listing
                </p>
                <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
                    <a href="https://dexscreener.com" target="_blank" class="btn btn-secondary">
                        <i class="fas fa-chart-line"></i> Dexscreener
                    </a>
                    <a href="https://birdeye.so" target="_blank" class="btn btn-secondary">
                        <i class="fas fa-chart-area"></i> Birdeye
                    </a>
                </div>
            </div>
        `;
    }
    
    // Try to load chart, fallback to placeholder if not available
    function initChart() {
        // For now, show placeholder
        // Uncomment below to load actual chart when token is listed
        // loadDexscreenerChart();
        showPlaceholder();
    }
    
    initChart();
    
    // Expose functions globally for manual chart loading
    window.loadDexscreenerChart = loadDexscreenerChart;
    window.loadBirdeyeChart = loadBirdeyeChart;
});
