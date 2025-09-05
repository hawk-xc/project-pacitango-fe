type TabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const tabs = ['All', 'Pending', 'Diproses', 'Diselesaikan'];

export function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="bg-white p-2 sticky top-0 z-10 shadow-sm">
      <div className="flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
              activeTab === tab
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
