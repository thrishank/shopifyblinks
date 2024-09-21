import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  clusterApiUrl,
  Connection,
  ParsedInstruction,
  PublicKey,
} from "@solana/web3.js";

export async function verifyTx(
  signature: string,
  from_addr: string,
  to_addr: string,
  price: string
): Promise<{ success: boolean; error?: string }> {
  const connection = new Connection(clusterApiUrl("mainnet-beta"), {
    commitment: "confirmed",
  });

  // wait 3 seconds to make sure the transaction is confirmed
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const tx = await connection.getParsedTransaction(signature, {
      commitment: "confirmed",
    });

    if (!tx) {
      return {
        success: false,
        error: "Unable to confirm the provided signature",
      };
    }

    // Check if the transaction is recent
    if (!tx.blockTime) {
      return { success: false, error: "Transaction has no timestamp" };
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const transactionAge = currentTimestamp - tx.blockTime;
    const max_transaction_time = 600; // 10 minutes

    if (transactionAge > max_transaction_time) {
      return {
        success: false,
        error:
          "Transaction is too old. If the transaction is valid please contact support",
      };
    }

    // getting the token transfer instruction
    const tokenTransferInstruction = tx.transaction.message.instructions.find(
      (ix) => ix.programId.equals(TOKEN_PROGRAM_ID)
    ) as ParsedInstruction;

    if (
      !tokenTransferInstruction ||
      tokenTransferInstruction.program !== "spl-token"
    ) {
      return {
        success: false,
        error: "spl Token transfer instruction not found",
      };
    }

    const preBalances = tx.meta?.preTokenBalances || [];
    const postBalances = tx.meta?.postTokenBalances || [];

    const sourceAccount = preBalances.find(
      (balance) =>
        balance.uiTokenAmount.uiAmount! >
        postBalances.find((pb) => pb.accountIndex === balance.accountIndex)!
          .uiTokenAmount.uiAmount!
    );

    const destinationAccount = postBalances.find(
      (balance) =>
        balance.uiTokenAmount.uiAmount! >
        preBalances.find((pb) => pb.accountIndex === balance.accountIndex)!
          .uiTokenAmount.uiAmount!
    );

    if (sourceAccount?.owner !== from_addr) {
      return { success: false, error: "Invalid payer wallet address" };
    }

    if (destinationAccount?.owner !== to_addr) {
      return { success: false, error: "Invalid destination wallet address" };
    }

    const { info } = tokenTransferInstruction.parsed;
    const amount = (info.amount / 1_000_000).toFixed(2);
    if (amount !== price) {
      return { success: false, error: "Invalid transaction amount" };
    }

    const usdcMint = new PublicKey(
      "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
      // "9jyEAn15hMY7f5iKdUTPE5ZGaxD4BfsbHggwHFYvgF61"
    );
    const isUSDCTransfer = tx.meta?.preTokenBalances?.some(
      (balance) => balance.mint === usdcMint.toBase58()
    );

    if (!isUSDCTransfer) {
      return { success: false, error: "Not a USDC transfer" };
    }

    return { success: true };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: "Unable to confirm the provided signature",
    };
  }
}
