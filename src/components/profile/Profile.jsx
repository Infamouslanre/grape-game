import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { updateProfile } from 'firebase/auth';

const Profile = ({ onClose }) => {
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set initial display name from current user
    if (auth.currentUser) {
      setDisplayName(auth.currentUser.displayName || '');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!displayName.trim()) {
        throw new Error('Display name cannot be empty');
      }

      await updateProfile(auth.currentUser, {
        displayName: displayName.trim()
      });
      
      setSuccess('Display name updated successfully!');
    } catch (error) {
      console.error('Profile update error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-container">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile Settings</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="auth-input"
              placeholder="Enter your display name"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              This name will be used for high scores
            </p>
          </div>

          <button
            type="submit"
            className="auth-button bg-purple-600 hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={onClose}
            className="auth-button bg-gray-600 hover:bg-gray-700 w-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile; 