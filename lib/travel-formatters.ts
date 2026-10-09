export function formatSGD(amount: number): string {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  try {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-SG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatDemoStatus(status: string): { label: string; tone: 'green' | 'amber' | 'slate' } {
  switch (status) {
    case 'sample_open':
      return { label: 'Sample: Available', tone: 'green' };
    case 'sample_limited':
      return { label: 'Sample: Limited Slots', tone: 'amber' };
    case 'sample_on_request':
      return { label: 'Sample: On Request', tone: 'slate' };
    default:
      return { label: 'Sample Date', tone: 'slate' };
  }
}

export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
