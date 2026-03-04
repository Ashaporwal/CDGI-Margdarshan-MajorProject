function  Dashboard ()  {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-violet-600 mb-4">
        Welcome to Dashboard 👋
      </h2>

      <p className="text-gray-500 mb-10">
        Select any menu item from the sidebar to navigate.
      </p>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-violet-600">
            Total Users
          </h3>
          <p className="text-3xl font-bold mt-2">124</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-violet-600">
            Active Sessions
          </h3>
          <p className="text-3xl font-bold mt-2">18</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-violet-600">
            Notifications
          </h3>
          <p className="text-3xl font-bold mt-2">5</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;