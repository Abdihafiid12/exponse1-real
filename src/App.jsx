import { useState, useEffect } from 'react';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import TransactionsTable from './components/TransactionsTable';
import { supabase } from './Lib/Supacbase'; // Hubi in path-kani sax yahay (../Lib ama ./Lib)

const App = () => {
  const [transactions, setTransactions] = useState([]);

  // Shaqadan waxay xogta ka soo qaadaysaa Supabase
  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false }); // Xogta ugu dambeysay hore

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setTransactions(data);
    }
  };

  // useEffect wuxuu shaqeeyaa marka App-ku ugu horeyn soo baxo
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <Header />
        
        <SummaryCards transactions={transactions} />
        
        {/* WAXAAN U BEDDELNAY onAddTransaction OO NOQDAY onTransactionAdded */}
        <TransactionForm onTransactionAdded={fetchTransactions} />
        
        <TransactionsTable transactions={transactions} />
      </div>
    </main>
  )
}

export default App;