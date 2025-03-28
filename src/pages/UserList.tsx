import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getUsers, deleteUser } from '../services/api';
import { 
  Search, Edit2, Trash2, LogOut, ChevronLeft, ChevronRight, 
  User as UserIcon, MoreVertical, Filter, X
} from 'lucide-react';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    const filtered = users.filter(user => 
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getUsers(currentPage);
      setUsers(response.data);
      setTotalPages(response.total_pages);
    } catch (error) {
      toast.error('Failed to fetch users', {
        description: 'Please check your network connection',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    
    try {
      await deleteUser(selectedUser.id);
      setUsers(users.filter(user => user.id !== selectedUser.id));
      toast.success('User deleted successfully', {
        description: `${selectedUser.first_name} ${selectedUser.last_name} has been removed.`,
      });
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error('Failed to delete user', {
        description: 'Please try again later',
      });
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/users/${id}/edit`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully', {
      description: 'You have been signed out of your account.',
    });
    navigate('/login');
  };

  const confirmDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <UserIcon className="text-indigo-600" size={28} />
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>
      </nav>

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && selectedUser && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Delete User</h2>
                <button 
                  onClick={() => setIsDeleteDialogOpen(false)}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete {selectedUser.first_name} {selectedUser.last_name}?
                This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteDialogOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
            <Filter size={18} className="mr-2" />
            Filters
          </button>
        </div>

        {/* User Grid or Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map(user => (
              <div 
                key={user.id} 
                className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="p-6 relative">
                  <button 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    onClick={() => {
                      // You could add a dropdown menu here for more actions
                    }}
                  >
                    <MoreVertical size={20} />
                  </button>
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="w-20 h-20 rounded-full object-cover border-4 border-indigo-100 shadow-md"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {user.first_name} {user.last_name}
                      </h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      <Edit2 size={16} className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(user)}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && filteredUsers.length > 0 && (
          <div className="flex justify-center mt-10 space-x-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors cursor-pointer"
            >
              <ChevronLeft size={20} className="mr-2" />
              Previous
            </button>
            <div className="flex items-center space-x-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full transition-colors cursor-pointer ${
                    currentPage === i + 1 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors cursor-pointer"
            >
              Next
              <ChevronRight size={20} className="ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;