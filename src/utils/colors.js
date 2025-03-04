export const getStatusColor = (status) => {
  const statusMap = {
    // Background colors
    'active': 'bg-brand-success/20 text-brand-success',
    'pending': 'bg-brand-warning/20 text-brand-warning',
    'completed': 'bg-brand-info/20 text-brand-info',
    'cancelled': 'bg-brand-error/20 text-brand-error',
    'draft': 'bg-gray-200 text-gray-700',
    
    // For buttons
    'primary-action': 'bg-primary text-primary-foreground hover:bg-primary/90',
    'secondary-action': 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    'danger-action': 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    
    // Default
    'default': 'bg-gray-100 text-gray-800'
  };
  
  return statusMap[status] || statusMap.default;
};

export const getBadgeVariant = (variant) => {
  const variantMap = {
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    default: 'bg-gray-100 text-gray-800 border-gray-200',
  };
  
  return variantMap[variant] || variantMap.default;
}; 