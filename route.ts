import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  clusterApiUrl,
  Connection,
  ParsedInstruction,
  PublicKey,
} from "@solana/web3.js";

const to_addr = "372sKPyyiwU5zYASHzqvYY48Sv4ihEujfN5rGFKhVQ9j";
const from_addr = "EXBdeRCdiNChKyD7akt64n9HgSXEpUtpPEhmbnm4L6iH";
const signature =
  "yvgm5tb9FgUQDeDRdaqYYz7Fnu8zk7b2S2fXeP4a8R5jMGwZMVbg9BGuH4E4uRtom2JCDDct6oGK3v2xbmPz25s";
const usdcMint = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
const connection = new Connection(clusterApiUrl("mainnet-beta"), {
  commitment: "confirmed",
});
const transaction_time = 600; // 10 minutes
const price = "2";

async function main() {
  try {
    const tx = await connection.getParsedTransaction(signature, {
      commitment: "confirmed",
    });
    if (!tx) {
      throw new Error("Unable to confirm the provided signature");
    }

    // Check if the transaction is recent
    if (!tx.blockTime) {
      throw new Error("Transaction has no timestamp");
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const transactionAge = currentTimestamp - tx.blockTime;

    // if (transactionAge > transaction_time) {
    //   throw new Error(
    //     "Transaction is too old. If the transaction is valid please contact support"
    //   );
    // }

    // getting the token transfer instruction
    const tokenTransferInstruction = tx.transaction.message.instructions.find(
      (ix) => ix.programId.equals(TOKEN_PROGRAM_ID)
    ) as ParsedInstruction;

    // console.log(tokenTransferInstruction);
    if (
      !tokenTransferInstruction ||
      tokenTransferInstruction.program !== "spl-token"
    ) {
      throw new Error("spl Token transfer instruction not found");
    }

    const { info } = tokenTransferInstruction.parsed;
    const amount = info.tokenAmount.uiAmountString;
    console.log(info);

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
      throw new Error("Invalid source address");
    }

    if (destinationAccount?.owner !== to_addr) {
      throw new Error(
        "you have sent the token to wrong address. Please contact support if you have done a valid transaction"
      );
    }

    if (price !== amount) {
      throw new Error("Invalid amount sent");
    }

    const isUSDCTransfer = tx.meta?.preTokenBalances?.some(
      (balance) => balance.mint === usdcMint.toBase58()
    );

    if (!isUSDCTransfer) {
      throw new Error("Not a USDC transfer");
    }
  } catch (err) {
    console.log(err);
    if (typeof err == "string") throw err;
    throw "Unable to confirm the provided signature";
  }
}

main();

export async function GET() {
  return Response.json("Hello World");
}
