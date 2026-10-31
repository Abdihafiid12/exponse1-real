
const Header = () => {
  return (
  <header class="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <h1 class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
      Expense Tracker
    </h1>
    <p class="mt-1 text-sm text-slate-500">
      Manage your income and expenses in one place.
    </p>
  </div>

  <div class="flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-3 py-2">
    <span class="h-2 w-2 rounded-full bg-blue-600"></span>
    <span class="text-sm font-medium text-slate-600">Personal Finance</span>
  </div>
</header>

  );
};

export default Header;