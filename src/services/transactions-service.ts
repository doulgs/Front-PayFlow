import { ResponseDTO } from "@/dtos/shared";
import { TransactionInputDTO, TransactionOutputDTO, TransactionSummaryDTO } from "@/dtos/transaction";
import { supabase } from "@/lib/supabase";

const TransactionsService = {
  async newTransaction(input: TransactionInputDTO, user_id: string): Promise<ResponseDTO<null>> {
    const { error } = await supabase.from("transactions").insert({
      ...input,
      user_id,
    });

    if (error) return { isValid: false, msg: error.message, data: null };
    return { isValid: true, msg: "Transaction created successfully", data: null };
  },

  async updateTransaction(id: string, updates: Partial<TransactionInputDTO>): Promise<ResponseDTO<null>> {
    const { error } = await supabase.from("transactions").update(updates).eq("id", id);

    if (error) return { isValid: false, msg: error.message, data: null };
    return { isValid: true, msg: "Transaction updated successfully", data: null };
  },

  async deleteTransaction(id: string): Promise<ResponseDTO<null>> {
    const { error } = await supabase.from("transactions").delete().eq("id", id);

    if (error) return { isValid: false, msg: error.message, data: null };
    return { isValid: true, msg: "Transaction deleted successfully", data: null };
  },

  async getDetailsTransaction(id: string): Promise<ResponseDTO<TransactionOutputDTO>> {
    const { data, error } = await supabase.from("transactions").select("*").eq("id", id).single();

    if (error) return { isValid: false, msg: error.message, data: null };
    return { isValid: true, msg: "Transaction details fetched successfully", data: data as TransactionOutputDTO };
  },

  async getAllTransactions(
    user_id: string,
    page: number = 1,
    perPage: number = 13
  ): Promise<ResponseDTO<TransactionOutputDTO[]>> {
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    if (from < 0 || to < 0) {
      return { isValid: false, msg: "Invalid pagination range", data: null };
    }

    if (from > 1000 || to > 1000) {
      return { isValid: false, msg: "Pagination range exceeds limit", data: null };
    }

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user_id)
      .range(from, to)
      .order("due_date", { ascending: false });

    if (error) return { isValid: false, msg: error.message, data: null };

    return { isValid: true, msg: "Transactions fetched successfully", data: data as TransactionOutputDTO[] };
  },

  async getSummary(
    user_id: string,
    page: number = 1,
    perPage: number = 13
  ): Promise<ResponseDTO<{ transactions: TransactionOutputDTO[]; summary: TransactionSummaryDTO }>> {
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    if (from < 0 || to < 0) {
      return { isValid: false, msg: "Invalid pagination range", data: null };
    }

    if (from > 1000 || to > 1000) {
      return { isValid: false, msg: "Pagination range exceeds limit", data: null };
    }

    const { data: transactions, error: txError } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user_id)
      .range(from, to)
      .order("due_date", { ascending: false });

    if (txError) return { isValid: false, msg: txError.message, data: null };

    const { data: summary, error: sumError } = await supabase.rpc("get_transaction_summary", { user_id });

    if (sumError) return { isValid: false, msg: sumError.message, data: null };

    return {
      isValid: true,
      msg: "Summary fetched successfully",
      data: {
        transactions: transactions as TransactionOutputDTO[],
        summary,
      },
    };
  },
};

export const transactionService = TransactionsService;
