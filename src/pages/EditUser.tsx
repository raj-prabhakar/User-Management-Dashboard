import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getUser, updateUser } from '../services/api';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

const EditUser = () => {
  const [user, setUser] = useState<User>({ first_name: '', last_name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    if (!id) return;
    try {
      const response = await getUser(parseInt(id));
      setUser(response.data);
    } catch (error) {
      toast.error('Failed to fetch user details');
      navigate('/users');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setIsLoading(true);
    try {
      await updateUser(parseInt(id), user);
      toast.success('User updated successfully');
      navigate('/users');
    } catch (error) {
      toast.error('Failed to update user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <button
          onClick={() => navigate('/users')}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition duration-200 cursor-pointer"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Users
        </button>
        
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Edit User</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {['first_name', 'last_name', 'email'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                {field.replace('_', ' ')}
              </label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                id={field}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={user[field as keyof User]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/users')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-lg hover:bg-gray-300 transition duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center justify-center transition duration-200 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin mr-2" />
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;