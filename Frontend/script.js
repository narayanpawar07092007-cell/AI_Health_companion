<script src="https://cdn.jsdelivr.net/npm/hashconnect/dist/browser/hashconnect.js"></script>
<script>
    // 1. Setup Hedera Variables
    const accountId = "0.0.YOUR_TESTNET_ID"; // Replace with your Testnet ID for demo
    const mirrorNodeUrl = "https://testnet.mirrornode.hedera.com/api/v1";

    // 2. Fetch Real HBAR Balance
    async function updateBalance() {
        try {
            const response = await fetch(`${mirrorNodeUrl}/accounts/${accountId}`);
            const data = await response.json();
            const hbarBalance = data.balance.balance / 100000000; // Convert tinybars to HBAR
            
            // Update the UI
            document.querySelector('h2.text-3xl.font-bold').innerHTML = 
                `${hbarBalance.toFixed(2)} <span class="text-sm font-normal text-indigo-300">HBAR</span>`;
            console.log("Balance Updated:", hbarBalance);
        } catch (error) {
            console.error("Error fetching Hedera data:", error);
        }
    }

    // 3. Fetch Recent Transactions (The "Ledger" section)
    async function updateTransactionHistory() {
        try {
            const response = await fetch(`${mirrorNodeUrl}/transactions?account.id=${accountId}&limit=5`);
            const data = await response.json();
            const listContainer = document.querySelector('.glass.p-6.rounded-3xl.h-\\[400px\\] .space-y-4');
            
            // Clear mock data and show real ones
            listContainer.innerHTML = ''; 

            data.transactions.forEach(tx => {
                const isCredit = tx.transfers.some(t => t.account === accountId && t.amount > 0);
                const amount = (Math.abs(tx.transfers[0].amount) / 100000000).toFixed(2);
                
                const txRow = `
                    <div class="flex justify-between items-center p-3 hover:bg-white/5 rounded-xl transition-all">
                        <div class="flex gap-3 items-center">
                            <div class="w-10 h-10 rounded-full ${isCredit ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'} flex items-center justify-center">
                                <i class="fas ${isCredit ? 'fa-arrow-down' : 'fa-arrow-up'}"></i>
                            </div>
                            <div>
                                <p class="text-sm font-semibold">${tx.name === "CRYPTO_TRANSFER" ? "Health Reward" : tx.name}</p>
                                <p class="text-[10px] text-slate-500">TX: ${tx.transaction_id.substring(0, 15)}...</p>
                            </div>
                        </div>
                        <span class="${isCredit ? 'text-green-400' : 'text-red-400'} font-mono text-sm">
                            ${isCredit ? '+' : '-'}${amount} HBAR
                        </span>
                    </div>`;
                listContainer.innerHTML += txRow;
            });
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }

    // 4. Simple AI Interaction (Mock Response)
    const chatInput = document.querySelector('input[type="text"]');
    const chatContainer = document.querySelector('.overflow-y-auto');

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim() !== "") {
            const userMsg = chatInput.value;
            
            // Add User Message
            chatContainer.innerHTML += `
                <div class="bg-indigo-600/20 p-4 rounded-2xl rounded-tr-none border border-indigo-500/30 ml-8 text-right">
                    <p class="text-sm">${userMsg}</p>
                </div>`;
            
            chatInput.value = "";

            // Simulate AI "Thinking"
            setTimeout(() => {
                chatContainer.innerHTML += `
                    <div class="bg-slate-800/50 p-4 rounded-2xl rounded-tl-none border border-slate-700">
                        <p class="text-sm italic">"Analyzing your request... I've logged that data to the Hedera network. Your health score is looking great today!"</p>
                    </div>`;
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 1000);
        }
    });

    // Initial Load
    updateBalance();
    updateTransactionHistory();
    // Refresh every 30 seconds
    setInterval(() => {
        updateBalance();
        updateTransactionHistory();
    }, 30000);

</script>
// १. तुमचा Hedera Testnet ID इथे टाका
const accountId = "0.0.YOUR_TESTNET_ID"; 
const mirrorNodeUrl = "https://testnet.mirrornode.hedera.com/api/v1";

async function fetchRealData() {
    try {
        // २. बॅलन्स अपडेट करा
        const res = await fetch(`${mirrorNodeUrl}/accounts/${accountId}`);
        const data = await res.json();
        const hbar = (data.balance.balance / 100000000).toFixed(2);
        
        document.getElementById('hbar-balance').innerText = `${hbar} HBAR`;
        
        // ३. ट्रांजॅक्शन अपडेट करा
        const txRes = await fetch(`${mirrorNodeUrl}/transactions?account.id=${accountId}&limit=5`);
        const txData = await txRes.json();
        const list = document.getElementById('transaction-list');
        
        list.innerHTML = ''; // Loading मेसेज काढून टाका

        txData.transactions.forEach(tx => {
            const isCredit = tx.transfers.some(t => t.account === accountId && t.amount > 0);
            const amount = (Math.abs(tx.transfers[0].amount) / 100000000).toFixed(2);
            
            list.innerHTML += `
                <div class="flex justify-between items-center p-3 border-b border-white/5">
                    <div class="text-left">
                        <p class="text-sm font-bold text-white">${tx.name}</p>
                        <p class="text-[10px] text-slate-500">${tx.transaction_id.substring(0,15)}</p>
                    </div>
                    <span class="${isCredit ? 'text-green-400' : 'text-red-400'} font-mono">
                        ${isCredit ? '+' : '-'}${amount}
                    </span>
                </div>`;
        });

        // ४. डमी स्टेप्सला 'खऱ्या' प्रमाणे अपडेट करा (Demo साठी)
        document.getElementById('step-count').innerText = "0"; // सुरुवातीला 0
        document.getElementById('step-count').classList.remove('text-slate-500');
        document.getElementById('step-count').classList.add('text-white');

    } catch (err) {
        console.error("Data Fetch Error:", err);
        document.getElementById('hbar-balance').innerText = "Error Loading";
    }
}

// पेज लोड झाल्यावर डेटा आणा
fetchRealData();