import { useState, useEffect } from 'react';
import { supabase } from '../Lib/Supacbase';

const TransactionsTable = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError("");

      try {
        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setTransactions(data || []);
        console.log("transactions:", data);
      } catch (err) {
        setError(
          err.message || "Failed to fetch transactions."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View and manage your transactions.
          </p>
        </div>

        <span className="w-fit rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600">
          All Transactions
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <p className="p-6 text-center text-slate-500">
          Loading transactions...
        </p>
      )}

      {/* Error */}
      {error && (
        <div className="m-6 rounded-lg bg-rose-100 p-4 text-rose-700">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && transactions.length === 0 && (
        <div className="mx-auto flex max-w-md flex-col items-center p-10 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
            📄
          </div>

          <h3 className="text-base font-semibold text-slate-800">
            No transactions yet
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Your transactions will appear here after you add
            your first income or expense.
          </p>
        </div>
      )}

      {/* Transactions Table */}
      {!loading && !error && transactions.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">

            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">
                  Description
                </th>

                <th className="px-6 py-4 font-semibold">
                  Type
                </th>

                <th className="px-6 py-4 font-semibold">
                  Date
                </th>

                <th className="px-6 py-4 text-right font-semibold">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-slate-200 transition hover:bg-slate-50"
                >

                  {/* Description */}
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {transaction.description}
                  </td>

                  {/* Type */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        transaction.type === "income"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                    {transaction.created_at
                      ? new Date(
                          transaction.created_at
                        ).toLocaleString()
                      : "N/A"}
                  </td>

                  {/* Amount */}
                  <td
                    className={`whitespace-nowrap px-6 py-4 text-right font-semibold ${
                      transaction.type === "income"
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {Number(transaction.amount).toFixed(2)}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-slate-200 bg-slate-50/70 px-6 py-4">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-medium text-slate-700">
            {transactions.length}
          </span>{" "}
          transactions
        </p>
      </div>

    </section>
  );
};

export default TransactionsTable;