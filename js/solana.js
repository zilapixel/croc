// ===================================
// $CROC PROTOCOL - SOLANA INTEGRATION
// Phantom Wallet Connection
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const walletStatus = document.getElementById('walletStatus');
    const walletAddress = document.getElementById('walletAddress');
    
    if (!connectWalletBtn) return;
    
    // Check if Phantom is installed
    const getProvider = () => {
        if ('phantom' in window) {
            const provider = window.phantom?.solana;
            if (provider?.isPhantom) {
                return provider;
            }
        }
        window.open('https://phantom.app/', '_blank');
        return null;
    };
    
    // Connect wallet function
    async function connectWallet() {
        try {
            const provider = getProvider();
            if (!provider) {
                alert('Please install Phantom wallet from phantom.app');
                return;
            }
            
            // Show loading state
            connectWalletBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
            connectWalletBtn.disabled = true;
            
            // Request connection
            const resp = await provider.connect();
            const publicKey = resp.publicKey.toString();
            
            // Update UI
            walletStatus.style.display = 'block';
            walletAddress.textContent = `Address: ${publicKey.slice(0, 8)}...${publicKey.slice(-8)}`;
            connectWalletBtn.innerHTML = '<i class="fas fa-check-circle"></i> Connected';
            connectWalletBtn.style.background = 'var(--color-accent-primary)';
            
            console.log('Connected to wallet:', publicKey);
            
            // Listen for disconnect
            provider.on('disconnect', () => {
                walletStatus.style.display = 'none';
                connectWalletBtn.innerHTML = '<i class="fas fa-wallet"></i> Connect Phantom Wallet';
                connectWalletBtn.disabled = false;
                connectWalletBtn.style.background = '';
            });
            
        } catch (err) {
            console.error('Error connecting to wallet:', err);
            connectWalletBtn.innerHTML = '<i class="fas fa-wallet"></i> Connect Phantom Wallet';
            connectWalletBtn.disabled = false;
            
            if (err.code === 4001) {
                alert('Connection request rejected. Please try again.');
            } else {
                alert('Failed to connect wallet. Please try again.');
            }
        }
    }
    
    // Check if already connected
    async function checkConnection() {
        try {
            const provider = getProvider();
            if (provider && provider.isConnected) {
                const publicKey = provider.publicKey.toString();
                walletStatus.style.display = 'block';
                walletAddress.textContent = `Address: ${publicKey.slice(0, 8)}...${publicKey.slice(-8)}`;
                connectWalletBtn.innerHTML = '<i class="fas fa-check-circle"></i> Connected';
                connectWalletBtn.style.background = 'var(--color-accent-primary)';
            }
        } catch (err) {
            console.error('Error checking connection:', err);
        }
    }
    
    // Event listeners
    connectWalletBtn.addEventListener('click', connectWallet);
    
    // Check connection on load
    checkConnection();
});
