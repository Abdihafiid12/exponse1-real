import { useEffect, useState } from "react";
import { supabase } from "../Lib/Supacbase";

const SummaryCards = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setError("");

      try {
        const { data, error } = await supabase
          .from("transactions")
          .select("amount, type");

        if (error) throw error;

        const totalIncome = (data || [])
          .filter((item) => item.type === "income")
          .reduce((sum, item) => sum + Number(item.amount || 0), 0);

        const totalExpense = (data || [])
          .filter((item) => item.type === "expense")
          .reduce((sum, item) => sum + Number(item.amount || 0), 0);

        setIncome(totalIncome);
        setExpense(totalExpense);
      } catch (err) {
        setError(err.message || "Failed to load summary.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const balance = income - expense;

  const formatMoney = (amount) =>
    amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const cards = [
    {
      title: "Total Income",
      amount: income,
      subtitle: "Money received",
      color: "emerald",
      icon: "+",
    },
    {
      title: "Total Expense",
      amount: expense,
      subtitle: "Money spent",
      color: "rose",
      icon: "−",
    },
    {
      title: "Current Balance",
      amount: balance,
      subtitle: "Income minus expenses",
      color: "blue",
      icon: "▣",
    },
  ];

  return (
    <section className="mb-8">
      {error && (
        <p className="mb-4 rounded-lg bg-rose-100 p-3 text-rose-700">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                  {loading ? "Loading..." : formatMoney(card.amount)}
                </h2>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${card.color}-50 text-${card.color}-600 text-xl`}
              >
                {card.icon}
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              {card.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SummaryCards;