import { useState } from 'react';
import { supabase } from '../Lib/Supacbase';

// Halkan waxaan ku darnay onTransactionAdded
const TransactionForm = ({ onTransactionAdded }) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!amount || Number(amount) <= 0 || !type || !description.trim()) {
      setError("Please fill all fields correctly.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("transactions")
        .insert({
          amount: Number(amount),
          type: type,
          description: description.trim(),
        });

      if (error) {
        throw error;
      }

      setSuccess("Data saved successfully!");

      setAmount("");
      setType("");
      setDescription("");

      // TAN AYAA MUHIIM AH: Marka xogta gasho, u sheeg App.jsx inuu xogta cusub soo qaato
      if (onTransactionAdded) {
        onTransactionAdded();
      }

    } catch (err) {
      setError(err.message || "Failed to save transaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Add Transaction
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Enter the details of your transaction below.
        </p>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-rose-100 p-3 text-rose-700">
          {error}
        </p>
      )}

      {success && (
        <p className="mb-4 rounded-lg bg-green-100 p-3 text-green-700">
          {success}
        </p>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Amount ($)
          </label>

          <input
            id="amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={amount}
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-slate-700">
            Transaction Type
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 transition hover:bg-emerald-50">
              <input
                type="radio"
                name="type"
                value="income"
                className="h-4 w-4 accent-emerald-600"
                checked={type === "income"}
                onChange={(e) => setType(e.target.value)}
                required
              />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Income
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Money received
                </p>
              </div>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-rose-200 bg-rose-50/50 p-4 transition hover:bg-rose-50">
              <input
                type="radio"
                name="type"
                value="expense"
                className="h-4 w-4 accent-rose-600"
                checked={type === "expense"}
                onChange={(e) => setType(e.target.value)}
                required
              />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Expense
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Money spent
                </p>
              </div>
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Description
          </label>

          <input
            id="description"
            type="text"
            placeholder="e.g. Salary, Food, Transport"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          />
        </div>

        <div className="border-t border-slate-100 pt-5">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <span className="text-lg leading-none">+</span>
            {loading ? "Saving..." : "Save Transaction"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default TransactionForm;