// Frontend Error Handling Module - Needs Refactoring
// This component demonstrates poor error handling patterns that need improvement

import React, { useState, useEffect } from 'react';

// Shared error configuration (will cause merge conflict)
const ERROR_CONFIG = {
  retryAttempts: 3,
  timeout: 5000,
  logLevel: 'error'
};

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      error: null
    };
  }

  // Poor error handling - no error boundaries, unclear error states
  async componentDidMount() {
    try {
      const response = await fetch('/api/users');
      const users = await response.json();
      this.setState({ users, loading: false });
    } catch (error) {
      // Poor error handling: generic error, no retry logic, no user feedback
      console.log('Something went wrong');
      this.setState({ error: 'Error occurred', loading: false });
    }
  }

  // No error boundary for child component errors
  render() {
    const { users, loading, error } = this.state;
    
    if (loading) return <div>Loading...</div>;
    
    // Poor error display - not user-friendly, no recovery options
    if (error) return <div style={{color: 'red'}}>{error}</div>;

    return (
      <div>
        <h1>User Dashboard</h1>
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    );
  }
}

// Component that can throw errors with no error handling
function UserCard({ user }) {
  const [details, setDetails] = useState(null);
  
  useEffect(() => {
    // Potential null reference error - no guards
    if (user.profile.settings.notifications) {
      loadUserDetails();
    }
  }, [user]);

  const loadUserDetails = async () => {
    // No error handling, will crash the app if it fails
    const response = await fetch(`/api/users/${user.id}/details`);
    const data = await response.json();
    setDetails(data);
  };

  const handleDeleteUser = () => {
    // No confirmation, no error handling for delete failures
    fetch(`/api/users/${user.id}`, { method: 'DELETE' })
      .then(() => {
        // No user feedback, no state updates
        console.log('User deleted');
      });
  };

  // Potential runtime errors with no safeguards
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {/* Potential undefined access */}
      <p>Role: {user.profile.role}</p>
      <p>Department: {user.profile.department.name}</p>
      
      {details && (
        <div>
          <p>Last Login: {details.lastLogin}</p>
          <p>Status: {details.status}</p>
        </div>
      )}
      
      <button onClick={handleDeleteUser}>Delete User</button>
    </div>
  );
}

export { UserDashboard, ERROR_CONFIG };