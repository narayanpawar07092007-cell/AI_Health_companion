
const express = require("express");
const { Client, TransferTransaction, Hbar } = require("@hashgraph/sdk");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Hedera Configuration
const accountId = process.env.HEDERA_ACCOUNT_ID;
const privateKey = process.env.HEDERA_PRIVATE_KEY;

// Initialize Hedera Client
const client = Client.forTestnet();
client.setOperator(accountId, privateKey);

// Route: Health Check
app.get("/", (req, res) => {
    res.send("AI Health Companion Backend is Online");
});

// Route: Process HBAR Reward
app.post("/api/reward", async (req, res) => {
    const { receiverId, amount, reason } = req.body;

    try {
        console.log(`Processing reward: ${amount} HBAR for ${reason} to ${receiverId}`);

        // Create the transaction
        const transaction = new TransferTransaction()
            .addHbarTransfer(accountId, new Hbar(-amount)) // From Admin
            .addHbarTransfer(receiverId, new Hbar(amount)) // To User
            .setTransactionMemo(`AI Health Reward: ${reason}`);

        // Execute and get receipt
        const response = await transaction.execute(client);
        const receipt = await response.getReceipt(client);

        console.log("Transaction Success! Status:", receipt.status.toString());

        res.json({
            success: true,
            txId: response.transactionId.toString(),
            status: receipt.status.toString()
        });
    } catch (error) {
        console.error("Transaction Failed:", error.message);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`>>> Backend Server running on http://localhost:${PORT}`);
});
